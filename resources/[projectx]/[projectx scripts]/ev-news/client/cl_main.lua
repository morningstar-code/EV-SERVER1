RegisterUICallback("ev-ui:getNewspaperContent", function(data, cb)
    --local upcomingElections, recentElections = GetElectionsData()

    cb({
        data = {
            drugs = GetDrugsNews(),
            stonks = RPC.execute("GetStocksData"),
            recentElections = {},
            upcomingElections = {},
            lockups = RPC.execute("GetConvictionList"),
            taxes = GetTaxLevels(),
        },
        meta = { ok = true, message = 'done' }
    })
end)

function GetTaxLevels()
    local taxes = {}

    local validTaxes, taxList = RPC.execute('GetTaxLevels')

    if validTaxes then
        for _, tax in ipairs(taxList) do
            taxes[#taxes + 1] = { type = tax.name, level = tax.level }
        end
    end

    return taxes
end

function GetElectionsData()
    local upcoming, recent = {}, {}

    local success, electionsData = RPC.execute('GetElectionsData')

    if success then
        for _, ballot in pairs (electionsData.upcoming) do
            upcoming[#upcoming + 1] = {date = ballot.start_date, title = ballot.name, description = ballot.description or description}
        end

        for _, ballot in pairs (electionsData.recent) do
            recent[#recent + 1] = {date = ballot.end_date, title = ballot.name, description = ballot.description or description}
        end
    end

    return upcoming, recent
end

function GetDrugsNews()
    local results = RPC.execute("GetDrugNews")

    local str = "Drug Epidemic spotted around "

    for idx, hot in ipairs(results.hot) do
        local separator = GetTextSeparator(idx, #results.hot, ", ", " and ")
        str = str .. ("%s%s"):format(hot, separator)
    end

    str = str .. ", according to recent statistics "

    for idx, drug in ipairs(results.drugs) do
        local separator = GetTextSeparator(idx, #results.drugs, ", ", " and ")
        str = str .. ("%s%s"):format(drug, separator)
    end

    if #results.drugs > 1 then
        str = str .. " are the most sought after drugs around "
    else
        str = str .. " is the most sought after drug around "
    end

    for idx, drug in ipairs(results.sought) do
        local separator = GetTextSeparator(idx, #results.sought, ", ", " and ")
        str = str .. ("%s%s"):format(drug, separator)
    end

    str = str .. " according to LSPD investigations."

    return str
end

RegisterNetEvent("ev-ui:displayNews")
AddEventHandler("ev-ui:displayNews", function()
    exports["ev-ui"]:openApplication("newspaper")
end)

Citizen.CreateThread(function()
    exports["ev-interact"]:AddPeekEntryByModel({ 1211559620, -1186769817, -756152956, 720581693, -838860344}, {
        {
            id = "newspaper",
            event = "ev-ui:displayNews",
            icon = "newspaper",
            label = "Read Newspaper",
        },
    }, { distance = { radius = 1.5 } })
end)