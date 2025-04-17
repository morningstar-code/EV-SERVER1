RegisterUICallback("ev-ui:heists:getQueue", function(data, cb)
  local results = RPC.execute("ev-heists:queue:getQueue")
  cb({ data = results, meta = { ok = true, message = "done" } })
end)

RegisterUICallback("ev-ui:heists:getGangs", function(data, cb)
  local results = RPC.execute("ev-heists:queue:getGangs")
  cb({ data = results, meta = { ok = true, message = "done" } })
end)

RegisterUICallback("ev-ui:heists:queue:alterWeight", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "done" } })
  RPC.execute("ev-heists:queue:alterWeight", data)
end)

RegisterUICallback("ev-ui:heists:queue:claimHeist", function(data, cb)
  local results = RPC.execute("ev-heists:queue:claimHeist", data.id)
  cb({ data = results, meta = { ok = true, message = "done" } })
end)
