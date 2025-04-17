local currentWeather = ""
RegisterUICallback("ev-ui:getCharacterDetails", function(data, cb)
  local character_id, bank_account_id = data.character.id, data.character.bank_account_id
  local success, message = RPC.execute("GetLicenses", character_id) -- gov rpc
  local gotBank, bankBalance = RPC.execute("GetCurrentBank", bank_account_id) -- financials rpc
  local casinoBalance = 0 --RPC.execute("GetCurrentCasino", character_id) -- casino rpc

  local details = {}
  --TODO: Fix this! Allow empty.
  details.licenses = success and message or {{ name = "drivers", status = false}}
  details.cash = RPC.execute("GetCurrentCash") -- financials rpc
  details.bank = bankBalance
  details.casino = casinoBalance
  details.jobs = {
      ['primary'] = exports["isPed"]:isPed("myjob"),
      ['secondary'] = exports["isPed"]:isPed("secondaryjob")
  }
  details.pagerStatus = exports["isPed"]:isPed("pagerstatus")

  cb({ data = details, meta = { ok = true, message = message or {{ name = "drivers", status = false}} } })
end)