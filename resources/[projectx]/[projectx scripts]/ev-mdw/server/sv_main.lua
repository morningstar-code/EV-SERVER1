Citizen.CreateThread(function()
  print("[MDW] - Initiate MDW")
  print("[MDW] - Check expired warrants")
  local warrants = Await(SQL.executedynamicparam("SELECT * FROM mdw_warrants", {}))
  local curUnix = (os.time() * 1000)
  for k, v in pairs(warrants) do
    if v.expiry ~= nil then
      if tonumber(curUnix) > tonumber(v.expiry) then
        local msg = "[MDW] - Warrant Expired | ID: " .. v.id .. " | CID: " .. v.cid .. " | Incident ID: " .. v.incidentid .. " | Expiry: " .. v.expiry
        print(msg)
        local delete = MySQL.update.await([[
              DELETE FROM mdw_warrants
              WHERE id = ?
              ]],
          { v.id })
        print("[MDW] - Warrant deleted from database")
      end
    end
  end
end)

RPC.register("searchProfiles", function(pSource, pValue)
  local queryData = string.lower("%" .. pValue .. "%")
  local search = MySQL.query.await([[
        SELECT *
        FROM characters c
        WHERE LOWER(c.first_name) LIKE @query OR LOWER(c.id) LIKE @query OR LOWER(c.last_name) LIKE @query OR CONCAT(LOWER(c.first_name), " ", LOWER(c.last_name), " ", LOWER(c.id)) LIKE @query
        ORDER BY c.first_name DESC
    ]], { ['query'] = queryData })

  return search
end)

RPC.register("searchVehicles", function(pSource, pValue)
  local plate = string.lower("%" .. pValue .. "%")
  local search = MySQL.query.await([[
        SELECT v.vin, v.cid, v.plate, v.model, v.vehiclepic, v.information, CONCAT(c.first_name," ",c.last_name) AS owner
        FROM _vehicle v
        LEFT JOIN characters c ON c.id = v.cid
        WHERE LOWER(v.plate) LIKE ?
    ]], { plate })

  return search
end)

RPC.register("loadProfile", function(pSource, pCid)
  local profiledata = MySQL.query.await([[
        SELECT *
        FROM characters
        WHERE id = ?
    ]], { pCid })


  local vehicledata = MySQL.query.await([[
        SELECT *
        FROM _vehicle
        WHERE cid = ?
    ]], { pCid })

  local propertydata = Await(SQL.executedynamicparam("SELECT * FROM housing WHERE cid = @cid", {
    --AND propertycategory = @propertycategory
    ["cid"] = pCid,
    --["propertycategory"] = "housing"
  }))

  --[[     local storagedata = Await(SQL.executedynamicparam("SELECT * FROM business_storage WHERE storage_tenants = @storage_tenants",{
    ["storage_tenants"] = pValue
    })) ]]
  local priordata = MySQL.query.await([[
        SELECT *
        FROM user_priors
        WHERE cid = ?
    ]], { pCid })

  licenses = {}
  local licensedata = exports["ev-gov"]:getLicenses(pSource, pCid)
  for k, v in pairs(licensedata) do
    local licensestatus = false
    if tonumber(v) == 1 then
      licenses[#licenses + 1] = {
        type = k,
        id = v
      }
    end
  end

  vehicles = {}
  for i = 1, #vehicledata do
    vehicles[#vehicles + 1] = {
      ["id"] = vehicledata[tonumber(i)].id,
      ["model"] = vehicledata[tonumber(i)].model,
      ["model"] = vehicledata[tonumber(i)].name, -- change later
      ["plate"] = vehicledata[tonumber(i)].plate
    }
  end

  properties = {}
  for i = 1, #propertydata do
    properties[#properties + 1] = {
      ["property_id"] = propertydata[tonumber(i)].hid,
      ["property_name"] = propertydata[tonumber(i)].street,
      ["property_category"] = propertydata[tonumber(i)].category
    }
  end

  storages = {}
  --[[for i = 1, #storagedata do
        storages[#storages + 1] = {
          ["id"] = storagedata[tonumber(i)].id,
          ["storage_id"] = storagedata[tonumber(i)].storage_id,
          ["storage_size"] = storagedata[tonumber(i)].storage_size
    }
    end ]]
  priors = {}
  for i = 1, #priordata do
    priors[#priors + 1] = {
      ["id"] = priordata[tonumber(i)].id,
      ["charge"] = priordata[tonumber(i)].charge,
      ["times"] = priordata[tonumber(i)].times
    }
  end

  local data = Await(SQL.executedynamicparam("SELECT * FROM _business", {}))
  local employment = {}
  for k, v in pairs(data) do
    local employees = json.decode(data[k].employees) or {}
    for i, u in pairs(employees) do
      if tonumber(u.cid) == tonumber(pValue) then
        local business_id = data[k].business_id
        local business_name = data[k].business_name

        local bankAccess
        local roles = json.decode(data[k].roles) or {}
        for l, p in pairs(roles) do
          if tostring(p.name) == tostring(u.role) then
            bankAccess = p.bank_access
          end
        end

        employment[#employment + 1] = {
          id = tonumber(i),
          business_id = business_id,
          business_name = business_name,
          business_role = u.role,
          businessicon = "fa-business-time",
          bankAccess = bankAccess,
          rank = u.rank
        }
      end
    end
  end

  return profiledata[1], licenses, vehicles, properties, storages, employment, priors
end)

RPC.register("loadVehicle", function(pSource, pVin)
  local vehicledata = MySQL.query.await([[
        SELECT *
        FROM _vehicle
        WHERE vin = ?
    ]], { pVin })

  return vehicledata[1]
end)

RPC.register("editProfile", function(pSource, pId, pName, pImage, pInfo)
  if pImage ~= nil then
    MySQL.update.await([[
            UPDATE characters
            SET profilepic = ?
            WHERE id = ?
        ]],
      { pImage, pId })
  end

  if pInfo ~= nil then
    MySQL.update.await([[
            UPDATE characters
            SET information = ?
            WHERE id = ?
        ]],
      { pInfo, pId })
  end

  return true, ""
end)

RPC.register("editVehicle", function(pSource, pId, pImage, pInfo)
  MySQL.update.await([[
        UPDATE characters_cars
        SET vehiclepic = ? AND information = ?
        WHERE id = ?
    ]],
    { tostring(pImage), pInfo, pId })

  return true, ""
end)

RPC.register("fetchBusinesses", function(pSource)
  local data = MySQL.query.await([[
        SELECT *
        FROM businesses
        ORDER BY id DESC
    ]], {})

  return data
end)

RPC.register("loadBusiness", function(pSource, pId)
  local data = MySQL.query.await([[
        SELECT *
        FROM businesses
        WHERE business_id = ?
    ]],
    { pId })

  if not data then return {} end

  local employees = json.decode(data[1].employees) or {}

  local employment = {}

  local count = 0

  for k, v in pairs(employees) do
    count = count + 1

    local userInfo = MySQL.query.await([[
            SELECT first_name, last_name
            FROM characters
            WHERE id = ?
        ]],
      { v.cid })

    local name

    if userInfo[1] ~= nil then
      name = userInfo[1].first_name .. " " .. userInfo[1].last_name
    else
      name = "Invalid Employee"
    end

    employment[#employment + 1] = {
      ["employee_cid"] = v.cid,
      ["employee_name"] = name,
      ["employee_role"] = v.role,
      ["rank"] = v.rank
    }
  end

  return employment, count
end)

RPC.register("fetchProperties", function(pSource)
  local data = MySQL.query.await([[
        SELECT *
        FROM housing
        ORDER BY id ASC
    ]], {})

  return data
end)

RPC.register("fetchCharges", function(pSource)
  local chargedata = MySQL.query.await([[
        SELECT *
        FROM mdw_charges
    ]], {})

  charges = {}
  for i = 1, #chargedata do
    charges[#charges + 1] = {
      id = chargedata[tonumber(i)].id,
      category = chargedata[tonumber(i)].category,
      color = chargedata[tonumber(i)].color,
      charges = json.decode(chargedata[tonumber(i)].charges)
    }
  end

  return charges
end)

RPC.register("fetchOfficers", function(pSource)
  -- local officerdata = Await(SQL.executedynamicparam("SELECT * FROM jobs_whitelist WHERE job = @job OR job = @job1", {
  --     ["job"] = "police",
  --     ["job1"] = "state"
  -- }))

  local officerdata = MySQL.query.await([[
        SELECT *
        FROM jobs_whitelist
        WHERE job = ?
    ]], { "police" })

  officers = {}
  for i = 1, #officerdata do
    local userInfo = MySQL.query.await([[
            SELECT first_name, last_name
            FROM characters
            WHERE id = ?
        ]], { officerdata[tonumber(i)].cid })

    local name = ""
    if userInfo[1] ~= nil then
      name = userInfo[1].first_name .. " " .. userInfo[1].last_name
    else
      name = "Unknown Officer"
    end

    officers[#officers + 1] = {
      cid = officerdata[tonumber(i)].cid,
      name = name,
      callsign = officerdata[tonumber(i)].callsign
    }
  end

  return officers
end)

RPC.register("fetchStaff", function(pSource)
  local staffdata = MySQL.query.await([[
        SELECT *
        FROM jobs_whitelist
        WHERE job = ?
    ]], { "police" })

  staff = {}
  for i = 1, #staffdata do
    local userInfo = MySQL.query.await([[
            SELECT first_name, last_name
            FROM characters
            WHERE id = ?
        ]], { staffdata[tonumber(i)].cid })

    local name = ""
    if userInfo[1] ~= nil then
      name = userInfo[1].first_name .. " " .. userInfo[1].last_name
    else
      name = "Unknown Officer"
    end

    staff[#staff + 1] = {
      id = i,
      cid = staffdata[tonumber(i)].cid,
      name = name,
      callsign = staffdata[tonumber(i)].callsign
    }
  end

  return staff
end)

RPC.register("fetchEms", function(pSource)
  local emsdata = MySQL.query.await([[
        SELECT *
        FROM jobs_whitelist
        WHERE job = ?
    ]], { "ems" })

  ems = {}
  for i = 1, #emsdata do
    local userInfo = MySQL.query.await([[
            SELECT first_name, last_name
            FROM characters
            WHERE id = ?
        ]], { emsdata[tonumber(i)].cid })

    local name = ""
    if userInfo[1] ~= nil then
      name = userInfo[1].first_name .. " " .. userInfo[1].last_name
    else
      name = "Unknown EMS"
    end

    ems[#ems + 1] = {
      cid = emsdata[tonumber(i)].cid,
      name = name,
      callsign = emsdata[tonumber(i)].callsign
    }
  end

  return ems
end)

RPC.register("fetchIncidents", function(pSource)
  local data = MySQL.query.await([[
        SELECT *
        FROM mdw_incidents
        ORDER BY id DESC
    ]], {})

  return data
end)

RPC.register("fetchIncidentsEms", function(pSource)
  local data = MySQL.query.await([[
        SELECT *
        FROM mdw_incidents_ems
        ORDER BY id DESC
    ]], {})

  return data
end)

RPC.register("fetchEvidence", function(pSource)
  local data = MySQL.query.await([[
        SELECT *
        FROM mdw_evidence
        ORDER BY id DESC
    ]], {})

  return data
end)

RPC.register("fetchIncident", function(pSource, pId)
  local data = MySQL.query.await([[
        SELECT *
        FROM mdw_incidents
        WHERE id = ?
    ]],
    { pId })

  return data, data[1].id, data[1].title, data[1].info, json.decode(data[1].evidence), json.decode(data[1].officers), json.decode(data[1].persons),
      json.decode(data[1].criminals)
end)

RPC.register("fetchIncidentEms", function(pSource, pId)
  local data = MySQL.query.await([[
        SELECT *
        FROM mdw_incidents_ems
        WHERE id = ?
    ]],
    { pId })

  return data, data[1].id, data[1].title, data[1].info, json.decode(data[1].ems), json.decode(data[1].persons)
end)

RPC.register("fetchEvidenceByID", function(pSource, pId)
  local data = MySQL.query.await([[
        SELECT *
        FROM mdw_evidence
        WHERE id = ?
    ]],
    { pId })

  if not data then return end

  return data, data[1].id, data[1].type, data[1].identifier, data[1].description, data[1].cid, data[1].incidentId, data[1].tags
end)

RPC.register("fetchWarrants", function(pSource)
  local warrantsdata = MySQL.query.await([[SELECT * FROM mdw_warrants ]])

  if not warrantsdata then return {} end

  warrants = {}
  for i = 1, #warrantsdata do
    local fetchName = MySQL.query.await([[
            SELECT first_name, last_name, profilepic
            FROM characters
            WHERE id = ?
        ]],
      { warrantsdata[tonumber(i)].cid })

    local fetchIncident = MySQL.query.await([[
            SELECT title
            FROM mdw_incidents
            WHERE id = ?
        ]],
      { warrantsdata[tonumber(i)].incidentid })

    local name = "Profile Not Found"
    local image = "https://i.imgur.com/wxNT3y2.jpg"
    if fetchName[1] ~= nil then
      name = fetchName[1].first_name .. " " .. fetchName[1].last_name
      if fetchName[1].profilepic ~= nil then
        image = fetchName[1].profilepic
      end
    end

    local incident = "Incident Not Found"
    if fetchIncident[1] ~= nil then
      incident = fetchIncident[1].title
    end

    warrants[#warrants + 1] = {
      id = warrantsdata[tonumber(i)].id,
      name = name,
      image = image,
      incident = incident,
      expiry = warrantsdata[tonumber(i)].expiry,
    }
  end

  return warrants
end)

RPC.register("updateIncident", function(pSource, pId, pType, pData, pData2, pAdd)
  local type = pType
  local id = pId

  if tostring(type) == "evidence" then
    local data = MySQL.update.await([[
            UPDATE mdw_incidents
            SET evidence = ?
            WHERE id = ?
        ]],
      { json.encode(pData), pId })

    if pAdd == true then
      local evidenceData = pData2

      local data2 = MySQL.insert.await([[
                INSERT INTO mdw_evidence (type, identifier, description, cid, incidentId)
                VALUES (?, ?, ?, ?, ?)
            ]],
        { evidenceData.type, evidenceData.identifier, evidenceData.description, pevidenceData.cid, pId, pId })
    end

    return true
  elseif tostring(type) == "officers" then
    local data = MySQL.update.await([[
            UPDATE mdw_incidents
            SET officers = ?
            WHERE id = ?
        ]],
      { json.encode(pData), pId })

    return true
  elseif tostring(type) == "persons" then
    local data = MySQL.update.await([[
            UPDATE mdw_incidents
            SET persons = ?
            WHERE id = ?
        ]],
      { json.encode(pData), pId })

    return true
  elseif tostring(type) == "criminals" then
    local data = MySQL.update.await([[
            UPDATE mdw_incidents
            SET criminals = ?
            WHERE id = ?
        ]],
      { json.encode(pData), pId })

    -- loop thru criminals, check if proocessed is ticked and if it is add charges
    -- somehow keep track of if charges has been added from the incident?
    --wtf am i saying

    return true
  end
end)

RPC.register("updateIncidentEms", function(pSource, pId, pType, pData, pData2, pAdd)
  local type = pType
  local id = pId

  if tostring(type) == "ems" then
    local data = MySQL.update.await([[
            UPDATE mdw_incidents_ems
            SET ems = ?
            WHERE id = ?
        ]],
      { json.encode(pData), pId })

    return true
  elseif tostring(type) == "persons" then
    local data = MySQL.update.await([[
            UPDATE mdw_incidents_ems
            SET persons = ?
            WHERE id = ?
        ]],
      { json.encode(pData), pId })
    return true
  end
end)

RPC.register("saveIncident", function(pSource, pId, pCreate, pTitle, pInfo, pEvidence, pOfficers, pPersons)
  local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
  local id = pId
  local shouldCreate = pCreate
  if shouldCreate then
    local name = user:getCurrentCharacter().first_name .. " " .. user:getCurrentCharacter().last_name
    local unix = (os.time() * 1000)
    local insert = MySQL.insert.await([[
            INSERT INTO mdw_incidents (title, author, unix, info, officers)
            VALUES (?, ?, ?, ?, ?)
        ]],
      { pTitle, name, unix, pInfo, json.encode(pOfficers) })

    local getInsertId = MySQL.query.await([[
            SELECT id
            FROM mdw_incidents
            WHERE title = ? AND author = ? AND unix = ?
        ]],
      { pTitle, name, unix })

    return getInsertId[1].id or 0
  else
    local update = MySQL.update.await([[
            UPDATE mdw_incidents
            SET title = ?, info = ? , evidence = ?, officers = ?, persons = ?
            WHERE id = ?
        ]],
      { pTitle, pInfo, json.encode(pEvidence), json.encode(pOfficers), json.encode(pPersons), id })

    return id
  end
end)

RPC.register("saveIncidentEms", function(pSource, pId, pCreate, pTitle, pInfo, pEms, pPersons)
  local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
  local id = pId
  local shouldCreate = pCreate
  if shouldCreate then
    local name = user:getCurrentCharacter().first_name .. " " .. user:getCurrentCharacter().last_name
    local unix = (os.time() * 1000)
    local insert = MySQL.insert.await([[
            INSERT INTO mdw_incidents_ems (title, author, unix, info, ems)
            VALUES (?, ?, ?, ?, ?)
        ]],
      { pTitle, name, unix, pInfo, json.encode(pEms) })

    local getInsertId = MySQL.query.await([[
            SELECT id
            FROM mdw_incidents_ems
            WHERE title = ? AND author = ? AND unix = ?
        ]],
      { pTitle, name, unix })


    return getInsertId[1].id or 0
  else
    local update = MySQL.update.await([[
            UPDATE mdw_incidents_ems
            SET title = ?, info = ? , evidence = ?, officers = ?, persons = ?
            WHERE id = ?
        ]],
      { pTitle, pInfo, son.encode(pEvidence), son.encode(pEms), son.encode(pPersons), id })

    return id
  end
end)

RPC.register("saveCriminal", function(pSource, pId, pCid, pValue)
  -- update incident with new criminals array
  -- then check if they have warrant and add warrant
  -- make sure they dont have one
  -- then add charges if processed is ticked
  -- and matches cid provided
  for k, v in pairs(pValue) do
    if tonumber(pCid) == tonumber(v.cid) then
      if v.warrant == true then
        local hasWarrant = MySQL.query.await([[
                SELECT COUNT(*) AS total
                FROM mdw_warrants
                WHERE cid = ?
            ]],
          { cid })

        if tonumber(hasWarrant[1].total) == 0 then
          local insert = MySQL.insert.await([[
                    INSERT INTO mdw_warrants (cid, incidentid, expiry)
                    VALUES (?, ?, ?)
                ]],
            { pCid, pId, v.warrantdate })
        end
      end

      if v.processed == true then
        local c = v.charges

        for _, p in pairs(c) do
          local count = MySQL.query.await([[
                    SELECT COUNT(*) AS total
                    FROM user_priors
                    WHERE cid = ? AND charge = ?
                ]],
            { cid, p.title })

          if count[1].total > 0 then
            -- had charge, increase times
            local update = MySQL.update.await([[
                        UPDATE user_priors
                        SET times = times + @amount
                        WHERE cid = ? AND charge = ?
                    ]],
              { 1, pCid, p.title })
          else
            -- never had charge insert it
            local insert = MySQL.insert.await([[
                        INSERT INTO user_priors (cid, times, charge)
                        VALUES (?, ?, ?)
                    ]],
              { 1, pCid, p.title })
          end
        end
      end
    end
  end

  local update = MySQL.update.await([[
        UPDATE mdw_incidents
        SET criminals = ?
        WHERE id = ?
    ]],
    { json.encode(pValue), pId })

  return true
end)

RPC.register("fetchMdwInfo", function(src, pCid, pJob)
  local user = exports["ev-base"]:getModule("Player"):GetUser(src)
  local char = user:getCurrentCharacter()
  local data = MySQL.query.await([[
        SELECT *
        FROM jobs_whitelist
        WHERE cid = ? AND job = ?
    ]],
    { pCid, pJob })

  if not data then return 0 end

  local label = ""
  --!Some dumb fuck used an invalid rank
  if pJob == "police" then
    joblabel = {}
    joblabel[1] = "Cadet"
    joblabel[2] = "Trooper"
    joblabel[3] = "Corporal"
    joblabel[4] = "Sergeant"
    joblabel[5] = "Staff Sergeant"
    joblabel[6] = "Inspector"
    joblabel[7] = "Lieutenant"
    joblabel[8] = "Captain"
    joblabel[9] = "Major"
    joblabel[10] = "Commander"
    joblabel[11] = "Lieutenant Colonel"
    joblabel[12] = "Assistant Chief"
    joblabel[13] = "Chief of Police"
    label = joblabel[tonumber(data[1].job_rank)]
  end

  if pJob == "state" then
    joblabel = {}
    joblabel[1] = "Trooper"
    joblabel[2] = "Senior Trooper"
    joblabel[3] = "Assistant Major"
    joblabel[4] = "Major"
    label = joblabel[tonumber(data[1].job_rank)]
  end

  if pJob == "ranger" then
    joblabel = {}
    joblabel[1] = "Ranger"
    joblabel[2] = "Senior Ranger"
    joblabel[3] = "Sergeant"
    joblabel[4] = "Lieutenant"
    joblabel[5] = "Captain"
    joblabel[6] = "Head Ranger"
    label = joblabel[tonumber(data[1].job_rank)]
  end

  if pJob == "judge" then
    label = "Judge"
  end

  if pJob == "ems" then
    joblabel = {}
    joblabel[1] = "EMT"
    joblabel[2] = "Paramedic"
    joblabel[3] = "Lieutenant of EMS"
    joblabel[4] = "Assistant Chief"
    joblabel[5] = "Chief of EMS"
    label = joblabel[tonumber(data[1].job_rank)]
  end

  return char.first_name, char.last_name, data[1].job_rank, label, data[1].callsign
end)

RPC.register("createWarrant", function(pSource, pCid, pIncidentId, pExpiry)
  -- maybe a check for if they have a warrant already bozo
  local insert = MySQL.insert.await([[
        INSERT INTO mdw_warrants (cid, incidentid, expiry)
        VALUES (?, ?, ?)
    ]],
    { pCid, pIncidentId, pExpiry })

  if not insert then return false end

  return true
end)

RPC.register("deleteWarrant", function(pSource, pId)
  local delete = MySQL.update.await([[
        DELETE FROM mdw_warrants
        WHERE id = ?
    ]],
    { pId })

  if not delete then return false end

  return true
end)

-- RegisterCommand("addcharge", function(source, args, raw)
--     local user = exports["ev-base"]:getModule("Player"):GetUser(source)
--     local rank = user:getRank()
--     if rank ~= "dev" then return end
--     if not args then return end

--     -- args 1
--     -- category
--     -- args 2
--     -- title
--     -- args 3
--     -- months
--     -- args 4
--     -- fine
--     -- args 5
--     -- points

--     local charges = {}

--     local fetch = Await(SQL.executedynamicparam("SELECT charges FROM mdw_charges WHERE category = @category", {
--         ["category"] = args[1]
--     }))

--     if fetch[1] ~= nil then
--         if fetch[1].charges ~= nil then
--             charges = json.decode(fetch[1].charges)
--         end
--     end

--     tbl = {
--         title = args[2],
--         months = args[3],
--         fine = args[4],
--         points = args[5]
--     }

--     table.insert(charges, tbl)

--     local data = Await(SQL.executedynamicparam("UPDATE mdw_charges SET charges = @charges WHERE category = @category", {
--         ["charges"] = json.encode(charges),
--         ["category"] = args[1]
--     }))

-- end)
