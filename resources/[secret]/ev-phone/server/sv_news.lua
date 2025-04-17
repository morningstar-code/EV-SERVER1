local articleLockState = {}

function getArticles(pArticleTypeId)
    if not pArticleTypeId then
        return false, "No article Type Id specified"
    end

    local query = [[
        SELECT
            a.`id` as id,
            a.`title` as title,
            a.`type_id` as type_id,
            a.`images` as images,
            a.`created_at` as created,
            a.`modified_at` as modified_at,
            CONCAT(c.first_name, ' ', c.last_name) as `author`
        FROM
            _article a
            INNER JOIN _article_authors auth ON auth.`article_id` = a.`id`
            LEFT JOIN characters c ON auth.`author` = c.id
        WHERE a.`type_id` = @typeId AND auth.`is_deleted` = 0
        ORDER BY a.id DESC
    ]]

    local pResult = Await(SQL.execute(query, {
        typeId = pArticleTypeId
    }))

    for _,article in ipairs(pResult) do
        local imageData = json.decode(article.images)
        article.images = imageData and imageData or {}
        article.header_image = imageData and imageData[1] or ''
    end

    return true, pResult
end

function getMusicCharts()
    local query = [[
        select (count(*) * 555) as plays, mp.song_id, r.artist, r.title
        from _music_plays mp
        inner join _music_record r on r.id = mp.song_id
        where timestamp > UNIX_TIMESTAMP() - 604800
        group by song_id
        having plays > 554
        order by plays desc
    ]]

    local pResult = Await(SQL.execute(query))

    return true, pResult
end

function getArticleContent(pArticleId)
    if not pArticleId then
        return false, "No article Id specified."
    end

    local query = [[
        SELECT
            id,
            title,
            content,
            type_id,
            images,
            created_at
        FROM
            _article a
        WHERE a.`id` = @id
    ]]
    local pResult = Await(SQL.execute(query, {
        id = pArticleId
    }))

    if pResult[1] == nil then
        return false, "Article not found"
    end
    
    local imageData = json.decode(pResult[1].images)
    pResult[1].images = imageData and imageData or {}
    pResult[1].header_image = imageData and imageData[1]

    return true, pResult[1]
end

function editArticle(pArticleId, pArticleContent, pArticleTitle, pArticleImages)
    local query = [[
        UPDATE
            _article
        SET
            title = @title,
            content = @content,
            images = @images,
            modified_at = @modified_at
        WHERE
            id = @id
    ]]

    local pResult = Await(SQL.execute(query, {
        id = pArticleId,
        title = pArticleTitle,
        content = pArticleContent,
        images = json.encode(pArticleImages),
        modified_at = os.time()
    }))

    -- TODO: If the author isn't the same, update the author in the _article_authors table

    local success = pResult and pResult.affectedRows > 0

    articleLockState[pArticleId] = false

    return success, success and "done" or "Could not edit document"
end

function createArticle(pCharacterId, pArticleContent, pArticleTitle, pArticleTypeId, pArticleImages)
    local timestamp = os.time()

    local articleQuery = [[
        INSERT INTO _article (title, content, images, type_id, created_at, modified_at) VALUES (@title, @content, @images, @type_id, @created_at, @modified_at)
    ]]

    local articleInsert = Await(SQL.execute(articleQuery, {
        title = pArticleTitle,
        content = pArticleContent,
        images = json.encode(pArticleImages),
        type_id = pArticleTypeId,
        created_at = timestamp,
        modified_at = timestamp
    }))
    
    if not articleInsert then return false, false end

    local articleId = articleInsert.insertId

    local articleAuthorsQuery = [[
        INSERT INTO _article_authors (article_id, author, is_deleted) VALUES (@article_id, @author, @is_deleted)
    ]]

    local articleAuthorsInsert = Await(SQL.execute(articleAuthorsQuery, {
        article_id = articleId,
        author = pCharacterId,
        is_deleted = false
    }))

    if not articleAuthorsInsert then return false, false end

    local success = articleInsert and articleInsert.affectedRows > 0 and articleAuthorsInsert and articleAuthorsInsert.affectedRows > 0

    return success, success and articleId or "Could not create document"
end

function deleteArticle(pArticleId, pCharacterId)
    local query = [[
        UPDATE
            _article_authors
        SET
            is_deleted = 1
        WHERE
            article_id = @article_id AND author = @author
    ]]

    local pResult = Await(SQL.execute(query, {
        article_id = pArticleId,
        author = pCharacterId
    }))

    local success = pResult and pResult.affectedRows > 0

    return success, success and "done" or "Could not delete article"
end

function updateArticleState(pArticleId, pState)
    local query = [[
        UPDATE
            _article
        SET
            type_id = @type_id
        WHERE
            id = @id
    ]]

    local pResult = Await(SQL.execute(query, {
        id = pArticleId,
        type_id = pState
    }))

    local success = pResult and pResult.affectedRows > 0

    return success, success and "done" or "Could not update article state"
end

function articleUnlock(pArticle, pLockState)
    if articleLockState[pArticle.id] then return false, "Article is already locked" end

    articleLockState[pArticle.id] = pLockState

    return true, pArticle
end