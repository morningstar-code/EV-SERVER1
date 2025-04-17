RegisterUICallback("ev-ui:getDOJData", function(data, cb)
    local results = RPC.execute("ev-gov:getDOJData")
    cb({ data = results, meta = { ok = true, message = "done" } })
end)

RegisterUICallback("ev-ui:setDOJStatus", function (data, cb)
    RPC.execute("ev-gov:dojApp:setStatus", exports["isPed"]:isPed("myjob"), data.status)
    cb({ data = {}, meta = { ok = true, message = "done" } })
end)