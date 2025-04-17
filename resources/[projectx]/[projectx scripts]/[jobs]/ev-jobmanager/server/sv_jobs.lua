
RegisterNetEvent("SpawnEventsServer")
AddEventHandler("SpawnEventsServer", function()
    local src = source

    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local job = user:getVar("job")
    if not job then return end

    TriggerClientEvent("ev-jobs:jobChanged", src, job)
    TriggerEvent("ev-chat:buildCommands", src)
end)

RPC.register("ev-financials:giveJobPay", function(src, ptype, TotalCash)
    local user = exports["ev-base"]:getModule("Player"):GetUser(src) 
    local tax = exports["ev-financials"]:PriceWithTaxString(TotalCash, "Personal Income")
    local accountId = exports["ev-financials"]:getAccountId(src)
    local finalAmount = tax.total - TotalCash

    if ptype == "hunting_sales" then
        local s = exports["ev-financials"]:adjustAccountBalance(accountId, "add", (TotalCash - finalAmount))
        if not s then 
            return print("paycheck | Something went wrong")
        end
    elseif ptype == "fishing_sales" then
        local s = exports["ev-financials"]:adjustAccountBalance(accountId, "add", (TotalCash - finalAmount))
        if not s then 
            return print("paycheck | Something went wrong")
        end
    else
        return
    end
end)