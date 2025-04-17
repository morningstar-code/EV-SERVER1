local businessSpawn = {
    ["burger_shot"] = {
        ["coords"] = {
            ["x"] = -1203.259,
            ["y"] = -901.804,
            ["z"] = 13.229285,
        },
    },
    ["red_circle"] = {
        ["coords"] = {
            ["x"] = -302.4384,
            ["y"] = 206.64297,
            ["z"] = 87.874656,
        },
    },
    ["snr_buns"] = {
        ["coords"] = {
            ["x"] = -488.82,
            ["y"] = -734.2,
            ["z"] = 33.21,
        },  
    }, 
    ["cosmic_cannabis"] = {
        ["coords"] = {
            ["x"] = 200.66581,
            ["y"] = -235.7529,
            ["z"] = 54.001239,
        },
    },
    ["casino"] = {
        ["coords"] = {
            ["x"] = 921.31774,
            ["y"] = 41.55706,
            ["z"] = 81.095993,
        },
    },
    ["bennys"] = {
        ["coords"] = {
            ["x"] = -195.0385,
            ["y"] = -1335.782,
            ["z"] = 30.890464,
        },
    },
    ["gallery"] = {
        ["coords"] = {
            ["x"] = -422.8975,
            ["y"] = 22.26308,
            ["z"] = 46.274803,
        },
    },
    ["hayes_autos"] = {
        ["coords"] = {
            ["x"] = -1431.557,
            ["y"] = -445.8069,
            ["z"] = 35.673744,
        },
    },
    ["tuner_shop"] = {
        ["coords"] = {
            ["x"] = 155.94581,
            ["y"] = -3019.192,
            ["z"] = 7.0392956,
        },
    },
    ["car_shop"] = {
        ["coords"] = {
            ["x"] = -48.98409,
            ["y"] = -1103.954,
            ["z"] = 27.263118,
        },
    },
    ["hydra_incorporation"] = {
        ["coords"] = {
            ["x"] = -1016.329,
            ["y"] = -426.3395,
            ["z"] = 39.627841,
        },
    },
    ["doc"] = {
        ["coords"] = {
            ["x"] = 1843.3168,
            ["y"] = 2579.0214,
            ["z"] = 46.01427,
        },
    },
    ["maldinis"] = {
        ["coords"] = {
            ["x"] = 801.76818,
            ["y"] = -767.8231,
            ["z"] = 31.26589,
        },
    },
    ["warriors_table"] = {
        ["coords"] = {
            ["x"] = -173.1338,
            ["y"] = 311.49865,
            ["z"] = 97.990974,
        },
    },
    ["police"] = {
        ["coords"] = {
            ["x"] = 435.78945,
            ["y"] = -976.236,
            ["z"] = 30.719455,
        },
    },
    ["skybar"] = {
        ["coords"] = {
            ["x"] = 317.37091,
            ["y"] = -934.6244,
            ["z"] = 29.470876,
        },
    },
    ["mandem"] = {
        ["coords"] = {
            ["x"] = -1563.151,
            ["y"] = -271.7146,
            ["z"] = 48.274333,
        },
    },
    ["tavern"] = {
        ["coords"] = {
            ["x"] = 1216.256,
            ["y"] = -418.813,
            ["z"] = 67.68633,
        },
    },
    ["recycle_center"] = {
        ["coords"] = {
            ["x"] = 746.65258,
            ["y"] = -1400.118,
            ["z"] = 26.569583,
        },
    },
    ["high_table"] = {
        ["coords"] = {
            ["x"] = 413.644,
            ["y"] = -22.55745,
            ["z"] = 90.94238,
        },
    },
}

function createBusiness(data)
    local name = data.name
    local typeId = data.business_type_id
    local owner_id = data.owner_id

    print("createBusiness", name, typeId, owner_id)

    local code = string.lower(name)
    code = string.gsub(code, " ", "_")

    print("code", code)

    local businessExists = Await(SQL.execute("SELECT * FROM _business WHERE code = @code", {
        ["code"] = code
    }))

    if businessExists[1] then return false, "Business already exists" end

    print("business doesn't exist")

    local account = exports["ev-financials"]:BankAccountCreation(owner_id, name, 4, 0, 31, false, false, true, true)
    if not account then return false, "Failed to create bank account" end

    print("account", account)

    local business = Await(SQL.execute("INSERT INTO _business (code, name, type_id, account_id) VALUES (@code, @name, @type_id, @account_id)", {
        ["code"] = code,
        ["name"] = name,
        ["type_id"] = typeId,
        ["account_id"] = account
    }))

    if not business then return false, "Failed to create business" end

    print("business created")

    local owner = Await(SQL.execute("SELECT * FROM characters WHERE id = @id", {
        ["id"] = owner_id
    }))

    if not owner[1] then return false, "Failed to get owner" end

    print("got owner")

    -- local role = Await(SQL.execute("SELECT * FROM _business_role WHERE name = @name", {
    --     ["name"] = "Owner"
    -- }))
    -- if not role[1] then return false, "Failed to get role" end

    -- create owner role
    local ownerRole = Await(SQL.execute("INSERT INTO _business_role (code, name, permissions) VALUES (@code, @name, @permissions)", {
        ["code"] = code,
        ["name"] = "Owner",
        ["permissions"] = json.encode({
            "hire",
            "fire",
            "change_role",
            "pay_employee",
            "pay_external",
            "charge_external",
            "property_keys",
            "view_logs",
            "stash_access",
            "craft_access",
        })
    }))

    if not ownerRole then return false, "Failed to create owner role" end

    print("owner role created")

    -- create employee role
    local employeeRole = Await(SQL.execute("INSERT INTO _business_role (code, name, permissions) VALUES (@code, @name, @permissions)", {
        ["code"] = code,
        ["name"] = "Employee",
        ["permissions"] = json.encode({
            "charge_external",
            "property_keys",
            "stash_access",
            "craft_access"
        })
    }))

    if not employeeRole then return false, "Failed to create employee role" end

    local employee = Await(SQL.execute("INSERT INTO _business_employee (code, cid, role_id, access_level) VALUES (@code, @cid, @role_id, @access_level)", {
        ["code"] = code,
        ["cid"] = owner_id,
        ["role_id"] = ownerRole.insertId,
        ["access_level"] = -1
    }))

    if not employee then return false, "Failed to create employee" end

    return true, "Business created"
end

exports("CreateBusiness", createBusiness)

function getBusinessTypes()
    local business_types = Await(SQL.execute("SELECT * FROM _business_type", {}))

    if not business_types then return false, "No business types found" end

    return true, business_types
end

function getBusinesses()
    local businesses = Await(SQL.execute("SELECT * FROM _business", {}))
    if not businesses then return false, {} end
    return true, businesses
end

function getEmploymentInformation(data)
    local businesses = Await(SQL.execute("SELECT * FROM _business", {}))

    if not businesses then return false, "No businesses found" end

    local employment = {}

    for id,business in pairs(businesses) do
        local employees = Await(SQL.execute([[
            SELECT
                be.*,
                br.name as role,
                br.permissions
            FROM
                _business_employee be
                LEFT JOIN _business_role br ON br.id = be.role_id
            WHERE
                be.code = @code
        ]], {
            ["code"] = business.code
        }))

        if not employees[1] then return false, "No employees found" end

        local business_type = Await(SQL.execute("SELECT * FROM _business_type WHERE id = @id", {
            ["id"] = business.type_id
        }))
        
        if not business_type[1] then return false, "No business type found" end

        for k,employee in pairs(employees) do
            if tonumber(employee.cid) == tonumber(data.character.id) then
                employment[#employment+1] = {
                    id = business.id,
                    access_level = employee.access_level,
                    code = business.code,
                    name = business.name,
                    role = employee.role,
                    permissions = json.decode(employee.permissions or {}),
                    business_type = business_type[1].name,
                    account_id = business.account_id
                }
            end
        end
    end
    
    return true, employment
end

function getBusinessEmployees(data)
    local id = data.id
    
    local business = Await(SQL.execute("SELECT * FROM _business WHERE id = @id", {
        ["id"] = id
    }))

    if not business[1] then return false, "No business found" end

    local employees = {}

    local business_employees = Await(SQL.execute([[
        SELECT
            be.*,
            br.name as role,
            br.permissions,
            c.first_name,
            c.last_name
        FROM
            _business_employee be
            LEFT JOIN _business_role br ON br.id = be.role_id
            LEFT JOIN characters c ON c.id = be.cid
        WHERE
            be.code = @code
    ]], {
        ["code"] = business[1].code
    }))

    if not business_employees[1] then return false, {} end

    for k,employee in pairs(business_employees) do
        employees[#employees+1] = {
            id = employee.cid,
            first_name = employee.first_name,
            last_name = employee.last_name,
            role = employee.role,
            permissions = json.decode(employee.permissions or {}),
        }
    end

    return true, employees
end

function getBusinessRoles(data)
    local id = data.id

    local business = Await(SQL.execute("SELECT * FROM _business WHERE id = @id", {
        ["id"] = id
    }))

    if not business[1] then return false, "No business found" end

    local roles = {}

    local business_roles = Await(SQL.execute("SELECT * FROM _business_role WHERE code = @code", {
        ["code"] = business[1].code
    }))

    if not business_roles[1] then return false, {} end

    for k,role in pairs(business_roles) do
        roles[#roles+1] = {
            id = role.id,
            name = role.name,
            permissions = json.decode(role.permissions or {}),
        }
    end

    return true, roles
end

function createBusinessRole(data)
    local permissions = data.permissions
    local name = data.name
    local business = data.business

    local business_roles = Await(SQL.execute("SELECT COUNT(*) AS total FROM _business_role WHERE code = @code AND name = @name", {
        ["code"] = business.code,
        ["name"] = name
    }))

    if business_roles[1].total > 0 then return false, "Role with that name already exists" end

    local role = Await(SQL.execute("INSERT INTO _business_role (code, name, permissions) VALUES (@code, @name, @permissions)", {
        ["code"] = business.code,
        ["name"] = name,
        ["permissions"] = json.encode(permissions)
    }))

    if not role then return false, "Failed to create role" end

    local log = addLog(business.code, "create_role", data.character.id, nil, role.insertId, nil, name)
    if not log then return false, "Failed to add log" end

    return true, "Role created"
end

function changeBusinessRole(data)
    local role_id = data.role_id
    local employee = data.employee
    local business = data.business

    local employed = Await(SQL.execute("SELECT COUNT(*) AS total FROM _business_employee WHERE id = @id", {
        ["id"] = employee.id
    }))

    if employed[1].total == 0 then return false, "Employee doesn't exist" end

    local role = Await(SQL.execute("SELECT * FROM _business_role WHERE id = @id", {
        ["id"] = role_id
    }))

    if not role[1] then return false, "Role doesn't exist" end

    local employee = Await(SQL.execute("UPDATE _business_employee SET role_id = @role_id WHERE id = @id AND code = @code", {
        ["role_id"] = role_id,
        ["id"] = employee.id,
        ["code"] = business.code
    }))

    if not employee then return false, "Failed to change role" end
    return true, "Role changed"
end

function hireBusinessEmployee(data)
    local role_id = data.role_id
    local state_id = data.state_id
    local business = data.business

    local employeesQuery = [[
        SELECT COUNT(*) AS employee_count
        FROM _business_employee
        WHERE code = @code AND cid = @cid
    ]]

    local employees = Await(SQL.execute(employeesQuery, {
        ["code"] = business.code,
        ["cid"] = state_id
    }))

    if employees[1].employee_count > 0 then
        return false, "This employee is already hired!"
    end

    local hireQuery = [[
        INSERT INTO _business_employee (code, cid, role_id, access_level)
        VALUES (@code, @cid, @role_id, @access_level)
    ]]

    local employee = Await(SQL.execute(hireQuery, {
        ["code"] = business.code,
        ["cid"] = state_id,
        ["role_id"] = role_id,
        ["access_level"] = 0
    }))

    if not employee then
        return false, "Failed to hire employee"
    end

    local log = addLog(business.code, "hire", data.character.id, state_id, role_id, nil)
    if not log then return false, "Failed to add log" end

    return true, "Employee hired"
end

function editBusinessRole(data) -- Doesn't account for role name change
    local role_id = data.role_id
    local permissions = data.permissions
    local business = data.business

    local role = Await(SQL.execute("SELECT * FROM _business_role WHERE id = @id", {
        ["id"] = role_id
    }))

    local roleQuery = [[
        SELECT COUNT(*) AS role_count
        FROM _business_role
        WHERE code = @code AND id = @id
    ]]

    local roleData = Await(SQL.execute(roleQuery, {
        ["code"] = business.code,
        ["id"] = role_id
    }))

    if not roleData[1].role_count == 0 then
        return false, "Role doesn't exist"
    end

    local role = Await(SQL.execute("UPDATE _business_role SET permissions = @permissions WHERE id = @id AND code = @code", {
        ["permissions"] = json.encode(permissions),
        ["id"] = role_id,
        ["code"] = business.code
    }))

    if not role then return false, "Failed to edit role" end

    local log = addLog(business.code, "edit_role", data.character.id, nil, role_id, nil, roleData[1].name)
    if not log then return false, "Failed to add log" end

    TriggerClientEvent("ev-business:bustPermissionCache", -1, business.code)

    return true, "Role edited"
end

function deleteBusinessRole(data)    
    local role_id = data.role_id
    local business = data.business

    local query = [[
        DELETE FROM
            _business_role
        WHERE
            id = @id
            AND code = @code
            AND LOWER(name) <> "owner"
            RETURNING *
    ]]
    
    local roleData = Await(SQL.execute(query, {
        ["id"] = role_id,
        ["code"] = business.code
    }))

    if not roleData[1] then
        return false, "Role doesn't exist"
    end

    local log = addLog(business.code, "delete_role", data.character.id, nil, role_id, nil, roleData[1].name)
    if not log then return false, "Failed to add log" end

    return true, "Role deleted"
end

function removeBusinessEmployee(data)
    local employee = data.employee
    local business = data.business

    local query = [[
        DELETE FROM
            _business_employee
        WHERE
            cid = @cid
            AND code = @code
            RETURNING *
    ]]

    local employeeData = Await(SQL.execute(query, {
        ["cid"] = employee.id,
        ["code"] = business.code
    }))

    if not employeeData[1] then
        return false, "Employee doesn't exist"
    end

    local log = addLog(business.code, "fire", data.character.id, employee.id, employeeData[1].role_id, nil)
    if not log then return false, "Failed to add log" end

    return true, "Employee removed"
end

function businessPayEmployee(data)
    local employeeId = data.employee_id
    local business = data.business
    local amount = data.amount
    local comment = data.comment
    local businessAccountId = business.account_id

    local employee = Await(SQL.execute("SELECT * FROM _business_employee WHERE cid = @cid AND code = @code", {
        ["cid"] = employeeId,
        ["code"] = business.code
    }))
    if not employee[1] then return false, "Employee not found" end

    local accountResult, employeeAccountId = exports["ev-financials"]:getDefaultBankAccount(employeeId, false, false)
    if not accountResult then return false, employeeAccountId end

    local balance = exports["ev-financials"]:getAccountBalance(businessAccountId)
    if balance < amount then return false, "Not enough money in the business account." end

    local transactionResult = exports["ev-financials"]:DoBusinessTransaction(-1, businessAccountId, employeeAccountId, tonumber(amount), 2, comment, data.character.id, tonumber(amount), "transfer")
    if not transactionResult then return false, "Failed to complete transaction" end

    local log = addLog(business.code, "pay_employee", data.character.id, employeeId, employee[1].role_id, amount)
    if not log then return false, "Failed to add log" end

    return true, "Employee paid"
end

function businessPayExternal(data)
    local business = data.business
    local amount = data.amount
    local comment = data.comment
    local targetAccountId = data.target_account_id
    local businessAccountId = business.account_id
    
    local query = [[
        SELECT
            c.id,
            c.first_name,
            c.last_name
        FROM
            _account_access AS aa
            LEFT JOIN characters AS c ON aa.character_id = c.id
        WHERE
            aa.account_id = @account_id
    ]]

    local targetCharacter = Await(SQL.execute(query, {
        ["account_id"] = targetAccountId
    }))

    local balance = exports["ev-financials"]:getAccountBalance(businessAccountId)
    if balance < amount then return false, "Not enough money in the business account." end

    local transactionResult = exports["ev-financials"]:DoBusinessTransaction(-1, businessAccountId, targetAccountId, tonumber(amount), 2, comment, data.character.id, tonumber(amount), "transfer")
    if type(transactionResult) == "string" then return false, transactionResult end

    local log = addLog(business.code, "pay_external", data.character.id, targetCharacter[1].id, nil, amount)
    if not log then return false, "Failed to add log" end

    return true, "Paid external account"
end

function chargeExternal(data)
    local state_id = data.state_id
    local amount = data.amount
    local comment = data.comment
    local business = data.business
    local character = data.character

    local target = FindPlayerIdById(state_id)

    if not target then return false, "Target not found" end

    local targetCharacter = Await(SQL.execute("SELECT * FROM characters WHERE id = @id", {
        ["id"] = state_id
    }))

    if not targetCharacter[1] then return false, "Target not found" end

    TriggerClientEvent("business:chargeAcceptPrompt", target, {
        amount = amount,
        comment = comment,
        business = business,
        character = character,
        tax = 0
    })

    local log = addLog(business.code, "charge_external", data.character.id, targetCharacter[1].id, nil, amount)
    if not log then return false, "Failed to add log" end

    return true, "Charge sent"
end

function businessChargeAccept(data, reject)
    local target = FindPlayerIdById(data.character.id)

    if not target then return false, "Target not found" end

    if not reject then
        TriggerClientEvent("ev-ui:server-relay", target, {
            source = "ev-nui",
            app = "phone",
            data = {
                action = "notification",
                target_app = "home-screen",
                title = "Business Charge",
                body = "Payment Successful!",
                show_even_if_app_active = true -- true | false, show this notification even if the app is active
            }
        })
    else
        TriggerClientEvent("ev-ui:server-relay", target, {
            source = "ev-nui",
            app = "phone",
            data = {
                action = "notification",
                target_app = "home-screen",
                title = "Business Charge",
                body = "Payment Rejected!",
                show_even_if_app_active = true -- true | false, show this notification even if the app is active
            }
        })
    end

    return true, "Charge accepted"
end

function getBusinessSpawnByCode(businessId)
    local business_id = tostring(businessId)
    return true, businessSpawn[business_id]
end

function getBusinessIdByCode(pCode)
    local business = Await(SQL.execute("SELECT * FROM _business WHERE code = @code", {
        ["code"] = pCode
    }))

    if not business[1] then return false, "Business not found" end

    return true, business[1].id
end

function isEmployedAtBusiness(data)
    local character = data.character
    local business = data.business

    local employee = Await(SQL.execute("SELECT * FROM _business_employee WHERE cid = @cid AND code = @code", {
        ["cid"] = character.id,
        ["code"] = business.id
    }))

    if not employee[1] then return false, "Not employed at business" end

    return true, "Employed at business"
end

exports("IsEmployedAtBusiness", isEmployedAtBusiness)

function isEmployedAtBusinessById(pSource, businessId)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return false end

    local employee = Await(SQL.execute("SELECT * FROM _business_employee WHERE cid = @cid AND id = @id", {
        ["cid"] = user.character.id,
        ["id"] = businessId
    }))

    if not employee[1] then return false, "Not employed at business" end

    return true, "Employed at business"
end

exports("IsEmployedAtBusinessById", isEmployedAtBusinessById)

function addLog(code, event, invoker_id, target_id, role_id, amount, old_role)
    local log = Await(SQL.execute("INSERT INTO _business_log (code, event, invoker_id, target_id, role_id, old_role, amount, event_time) VALUES (@code, @event, @invoker_id, @target_id, @role_id, @old_role, @amount, @event_time)", {
        ["code"] = code,
        ["event"] = event,
        ["invoker_id"] = invoker_id,
        ["target_id"] = target_id,
        ["role_id"] = role_id,
        ["old_role"] = old_role or nil,
        ["amount"] = amount or 0,
        ["event_time"] = os.time()
    }))

    if not log then return false, "Failed to add log" end

    return true, "Log added"
end

function getLogs(data, bool)
    local businessId = data.businessId

    local query = [[
        SELECT
            bl.id,
            bl.code,
            bl.event,
            bl.invoker_id,
            bl.target_id,
            bl.role_id,
            bl.amount,
            bl.event_time,
            COALESCE(r.name, bl.old_role, 'Undefined') AS role,
            CONCAT(c.first_name, ' ', c.last_name) AS invoker,
            CONCAT(t.first_name, ' ', t.last_name) AS target
        FROM
            _business_log bl
            LEFT JOIN characters c ON c.id = bl.invoker_id
            LEFT JOIN characters t ON t.id = bl.target_id
            LEFT JOIN _business_role r ON r.id = bl.role_id
        WHERE
            bl.code = @code
        ORDER BY
            bl.id DESC
    ]]

    local logs = Await(SQL.execute(query, {
        ["code"] = businessId
    }))

    if not logs[1] then return false, "No logs found" end

    return true, logs
end

function hasPermission(code, perm, cid)
    if not cid then
        local user = exports["ev-base"]:getModule("Player"):GetUser(src)
        if not user then return false end

        cid = user.character.id
    end
    
    local employee = Await(SQL.execute("SELECT * FROM _business_employee WHERE code = @code AND cid = @cid", {
        ["code"] = code,
        ["cid"] = cid
    }))

    if not employee[1] then return false, "Employee not found" end
    
    local role = Await(SQL.execute("SELECT * FROM _business_role WHERE code = @code AND id = @id", {
        ["id"] = employee[1].role_id,
        ["code"] = code
    }))

    if not role[1] then return false, "Role not found" end

    local permissions = json.decode(role[1].permissions)

    local hasPermission = false
    for k, v in pairs(permissions) do
        if v == perm then
            hasPermission = true
            break
        end
    end
     
    return hasPermission
end

function purchaseHandler(price, itemId, amount)
    -- TODO;
end

function getEmployeeRole(pBusinessId, pCid)
    local employment = getEmploymentInformation2(pCid)
    local jobCode = json.encode(employment[1].code)
    local bizCode = json.encode(pBusinessId)
    if jobCode == bizCode then
        return employment[1].role
    else 

    end 
end
exports("getEmployeeRole", getEmployeeRole)

--[[ local employee = Await(SQL.execute("SELECT * FROM _business_employee WHERE cid = @cid AND code = @code", {
    ["cid"] = pCid,
    ["code"] = pBusinessId
})) ]]

function getEmploymentInformation2(pCid)
    local businesses = Await(SQL.execute("SELECT * FROM _business", {}))

    if not businesses then return false, "No businesses found" end

    local employment = {}

    for id,business in pairs(businesses) do
        local employees = Await(SQL.execute([[
            SELECT
                be.*,
                br.name as role,
                br.permissions
            FROM
                _business_employee be
                LEFT JOIN _business_role br ON br.id = be.role_id
            WHERE
                be.code = @code
        ]], {
            ["code"] = business.code
        }))

        if not employees[1] then return false, "No employees found" end

        local business_type = Await(SQL.execute("SELECT * FROM _business_type WHERE id = @id", {
            ["id"] = business.type_id
        }))
        
        if not business_type[1] then return false, "No business type found" end

        for k,employee in pairs(employees) do
            if tonumber(employee.cid) == tonumber(pCid) then
                employment[#employment+1] = {
                    id = business.id,
                    access_level = employee.access_level,
                    code = business.code,
                    name = business.name,
                    role = employee.role,
                    permissions = json.decode(employee.permissions or {}),
                    business_type = business_type[1].name,
                    account_id = business.account_id
                }
            end
        end
    end
    
    return employment
end