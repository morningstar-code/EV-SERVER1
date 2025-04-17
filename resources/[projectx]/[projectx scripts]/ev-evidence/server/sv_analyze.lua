RegisterNetEvent("ev-evidence:analyze:s", function()
    local src = source

    

    local inventory = exports["ev-inventory"]:getInventory("analyze_evidence")
    local item = inventory[1]

    print(json.encode(item))
    print(json.encode(item.information))

    if item and (string.find(item.item_id, "evidence") or item.item_id == "dnaswab") then
        print("1")
        local metadata = json.decode(item.information)

        if metadata.identifier == "FADED" or metadata.identifier == "Scratched off data" then
            print("2")
            TriggerClientEvent("DoLongHudText", src, "It was not possible to analyze this evidence.", 2)
            return
        end

        local updated = false

        if metadata["Result"] then
            if metadata["Result"] == "Not Analyzed" then
                if math.random(100) <= 70 then
                    metadata["Result"] = metadata.identifier
                else
                    metadata["Result"] = "Inconclusive"
                end

                updated = true
            else
                TriggerClientEvent("DoLongHudText", src, "This Evidence Has Already Been Analyzed.", 2)
            end
        elseif metadata["DNA"] then
            if metadata["DNA"] == "Not Analyzed" then
                if math.random(100) <= 80 or item.item_id == "dnaswab" then
                    metadata["DNA"] = metadata.identifier
                else
                    metadata["DNA"] = "Inconclusive"
                end

                updated = true
            else
                TriggerClientEvent("DoLongHudText", src, "This evidence has already been analyzed.", 2)
            end
        end

        if updated then
            MySQL.update.await([[
                UPDATE inventory
                SET information = ?
                WHERE id = ?
            ]],
            { json.encode(metadata), item.id })
        end
    else
        TriggerClientEvent("DoLongHudText", src, "No Evidence To Analyze.", 2)
    end
end)

RegisterNetEvent("ev-evidence:dnaSwab", function(pTarget)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pTarget) 
    local cid = user:getCurrentCharacter().id
    if not cid then return end

    local dna = MySQL.scalar.await([[
        SELECT dna
        FROM characters
        WHERE id = ?
    ]],
    { cid })

    local data = {
        ["identifier"] = dna,
        ["DNA"] = "not analyzed",
        ["_hideKeys"] = { "identifier" },
    }

    TriggerClientEvent("player:receiveItem", src, "dnaswab", 1, true, data)
    TriggerClientEvent("DoLongHudText", pTarget, "A DNA sample was collected!")
end)