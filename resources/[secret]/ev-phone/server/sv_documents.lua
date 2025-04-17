local documentLockState = {}

function getLicenses(pCharacterId)
end

function getDocuments(pCharacterId, pDocumentTypeId)
    if not pCharacterId then return false, "No Character Id specified." end
    if not pDocumentTypeId then return false, "No Document Type Id specified" end

    local query = [[
        SELECT 
            d.`id`, 
            d.`editable`, 
            `title`, 
            t.`name` as 'type', 
            type_id, 
            a.`can_sign`, 
            a.`signed` 
        FROM 
            _document d 
            INNER JOIN _document_type t on t.id = d.type_id 
            INNER JOIN _document_access a ON a.`document_id` = d.`id` 
            AND a.`character_id` = @characterId 
        WHERE 
            d.type_id = @typeId 
            AND a.is_deleted = 0
    ]]

    local pResult = Await(SQL.execute(query, {
        characterId = pCharacterId,
        typeId = pDocumentTypeId
    }))

    return pResult and true or false, pResult and pResult or "Could not get documents"
end

function getLicenseContent(pDocumentId)
end

function getDocumentContent(pDocumentId)
    if not pDocumentId then return false, "No document Id specified." end

    local query = [[
        SELECT 
            id, 
            title, 
            content, 
            type_id, 
            editable 
        FROM 
            _document d 
        WHERE 
            d.`id` = @documentId
    ]]
    
    local pResult = Await(SQL.execute(query, {
        documentId = pDocumentId
    }))

    --pResult[1].unlocked = true -- TODO: Check if the is not being edited by someone else

    return pResult[1] and true or false, pResult[1] and pResult[1] or "Could not get document"
end

function getDocumentTypes()
    local query = [[
        SELECT 
            `id`, 
            `name`, 
            `editable`, 
            `shareable`, 
            `require_signature` as can_sign, 
            `max_signature` as max_signatures 
        FROM 
            _document_type
    ]]

    local pResult = Await(SQL.execute(query))

    return pResult and true or false, pResult and pResult or "Could not get document types"
end

function editDocument(pDocumentId, pDocumentContent, pDocumentTitle)
    local query = [[
        UPDATE 
            _document 
        SET 
            title = @title, 
            content = @content 
        WHERE 
            id = @id
    ]]

    local pResult = Await(SQL.execute(query, {
        id = pDocumentId,
        title = pDocumentTitle,
        content = pDocumentContent
    }))

    local success = pResult and pResult.affectedRows > 0

    documentLockState[pDocumentId] = false

    return success, success and "done" or "Could not edit document"
end

function createDocument(pCharacterId, pDocumentContent, pDocumentTitle, pDocumentTypeId)
    local documentType = Await(SQL.execute("SELECT * FROM _document_type WHERE id = @id", {
        id = pDocumentTypeId
    }))

    if not documentType then return false, "Invalid document type" end

    local documentInsert = Await(SQL.execute("INSERT INTO _document (title, content, type_id, editable) VALUES (@title, @content, @type_id, @editable)", {
        title = pDocumentTitle,
        content = pDocumentContent,
        type_id = pDocumentTypeId,
        editable = documentType[1].editable
    }))

    local documentId = documentInsert.insertId

    local documentAccessInsert = Await(SQL.execute("INSERT INTO _document_access (document_id, character_id, can_sign) VALUES (@document_id, @character_id, @can_sign)", {
        document_id = documentInsert.insertId,
        character_id = pCharacterId,
        can_sign = documentType[1].can_sign
    }))

    local success = documentInsert and documentInsert.affectedRows > 0 and documentAccessInsert and documentAccessInsert.affectedRows > 0

    return success, success and documentId or "Could not create document"
end

exports("CreateDocument", createDocument)

function deleteDocument(pDocumentId, pCharacterId)
    local query = [[
        UPDATE 
            _document_access 
        SET 
            is_deleted = 1 
        WHERE 
            document_id = @id 
            AND character_id = @characterId
    ]]

    local pResult = Await(SQL.execute(query, {
        id = pDocumentId,
        characterId = pCharacterId
    }))

    local success = pResult and pResult.affectedRows > 0

    return success, success and "done" or "Could not delete document"
end

function finalizeDocument(pDocumentId)
    local query = [[
        UPDATE _document SET editable = 0 WHERE id = @id
    ]]

    local pResult = Await(SQL.execute(query, {
        id = pDocumentId
    }))

    local success = pResult and pResult.affectedRows > 0

    return success, success and "done" or "Could not finalize document"
end

function dropDocument(pData, pLocation)
    TriggerClientEvent("client:updateNotesAdd", -1, {
        x = pLocation.x,
        y = pLocation.y,
        z = pLocation.z,
        id = pData.document.id,
        type_id = pData.document.type_id
    })

    return true
end

function documentUnlock(pDocument, pLockState)
    if documentLockState[pDocument.id] then return false, "Document is locked" end

    documentLockState[pDocument.id] = pLockState

    return true, pDocument
end

function getDocumentSignatures(pDocumentId)
    local query = [[
        SELECT
            c.`first_name`,
            c.`last_name`,
            a.`signed` as timestamp,
            a.`character_id` as id
        FROM 
            _document_access a
            INNER JOIN _document d ON d.`id` = a.`document_id`
            INNER JOIN characters c ON c.`id` = a.`character_id`
        WHERE
            d.`id` = @id
            AND a.`can_sign` = 1
            AND a.`is_deleted` = 0
    ]]

    local pResult = Await(SQL.execute(query, {
        id = pDocumentId
    }))

    return pResult and true or false, pResult and pResult or "Could not get document signatures"
end

function signDocument(pData)
    local query = [[
        UPDATE 
            _document_access 
        SET 
            signed = @signed 
        WHERE 
            document_id = @documentId 
            AND character_id = @characterId 
            AND can_sign = 1
    ]]

    local pResult = Await(SQL.execute(query, {
        signed = os.time(),
        documentId = pData.document.id,
        characterId = pData.character.id
    }))

    local success = pResult and pResult.affectedRows > 0

    return success, success and "done" or "Could not sign document"
end

function requestDocumentSignature(pData)
    local query = [[
        UPDATE
            _document_access 
        SET 
            can_sign = 1 
        WHERE 
            document_id = @documentId 
            AND character_id = @signeeId
    ]]

    local pResult = Await(SQL.execute(query, {
        documentId = pData.document.id,
        signeeId = pData.signee_id
    }))

    local success = pResult and pResult.affectedRows > 0

    return success, success and "done" or "Could not request document signature"
end

function shareDocumentLocal(pSource, pDocumentId, pDocumentTypeId)
    local coords = GetEntityCoords(GetPlayerPed(pSource))
    if not coords then return false end

    local players = exports["ev-infinity"]:GetNearbyPlayers(coords, 5.0)
    
    if not players then return false end
    for _, serverId in ipairs(players) do
        TriggerClientEvent("ev-phone:showDocumentLocal", serverId, pSource, pDocumentId, pDocumentTypeId)
    end
    
    return true
end

function shareDocumentPermanent(pData)
    local insertedData = Await(SQL.dynamicInsert('_document_access', {
        document_id = pData.document.id,
        character_id = pData.sharee_id,
    }))

    return insertedData and true or false, insertedData and "done" or "Could not share document"
end

function getVehicleIds(pCharacterId)
    local query = [[
        SELECT 
            d.`id`, 
            d.`editable`, 
            `title`, 
            t.`name` as 'type', 
            type_id, 
            a.`can_sign`, 
            a.`signed` 
        FROM 
            _document d 
            INNER JOIN _document_type t on t.id = d.type_id 
            INNER JOIN _document_access a ON a.`document_id` = d.`id` 
            AND a.`character_id` = @characterId 
        WHERE 
            d.type_id = @typeId 
            AND a.is_deleted = 0
    ]]

    local pResult = Await(SQL.execute(query, {
        characterId = pCharacterId,
        typeId = 4
    }))

    return pResult and true or false, pResult or "Could not get vehicle ids"
end

function getRegistrationDocument(pDocumentId)
    -- TODO; Make a seperate table for vehicle registrations (_vehicle_registration)
    local query = [[
        SELECT 
            id, 
            title, 
            content, 
            type_id, 
            editable 
        FROM 
            _document d 
        WHERE 
            d.`id` = @documentId
    ]]

    local pResult = Await(SQL.execute(query, {
        documentId = pDocumentId
    }))

    return pResult and true or false, pResult[1] or "Could not get vehicle registration document"
end