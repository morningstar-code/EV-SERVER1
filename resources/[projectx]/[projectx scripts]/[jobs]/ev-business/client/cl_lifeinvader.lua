Citizen.CreateThread(function()
  exports["ev-polytarget"]:AddBoxZone("ev-business:lifeinvader:manageListings", vector3(-1053.24, -230.85, 44.32), 1.8, 0.9, { heading = 301, minZ = 43.82, maxZ = 44.82 })
  exports["ev-polytarget"]:AddBoxZone("ev-business:lifeinvader:frontDesk", vector3(-1082.36, -247.24, 38.07), 1.3, 3.4, { heading = 207, minZ = 37.52, maxZ = 38.62 })

  exports["ev-polytarget"]:AddBoxZone("ev-business:lifeinvader:dd_basement", vector3(1129.59, -468.32, 62.81), 2.2, 0.9, { heading = 346, minZ = 62.31, maxZ = 63.31 })

  exports["ev-interact"]:AddPeekEntryByPolyTarget("ev-business:lifeinvader:manageListings", {
    {
      id = "ev-business:lifeinvader:manageListings",
      event = "ev-business:lifeinvader:manageListings",
      icon = "list-alt",
      label = "Manage Ad Listings",
    },
  }, {
    distance = { radius = 2.5 },
    isEnabled = function()
      return HasPermission("lifeinvader", "craft_access")
    end,
  })

  exports["ev-interact"]:AddPeekEntryByPolyTarget("ev-business:lifeinvader:dd_basement", {
    {
      id = "ev-business:lifeinvader:sendSystemMail",
      event = "ev-business:lifeinvader:sendSystemMail",
      icon = "envelope-open",
      label = "Send SYS Mail",
    },
  }, {
    distance = { radius = 2.5 },
    isEnabled = function()
      return HasPermission("digital_den", "hire")
    end,
  })

  exports["ev-interact"]:AddPeekEntryByPolyTarget("ev-business:lifeinvader:frontDesk", {
    {
      id = "ev-business:lifeinvader:frontDesk",
      event = "ev-business:lifeinvader:frontDesk",
      icon = "envelope-open-text",
      label = "sign up for lifeinvader mail",
    },
    {
      id = "ev-business:lifeinvader:changeEmail",
      event = "ev-business:lifeinvader:changeEmail",
      icon = "envelope-open-text",
      label = "change email address ($5000)",
    },
  }, {
    distance = { radius = 2.5 },
    isEnabled = function()
      return true
    end,
  })
end)

local function convertTime(pMinutes)
  local hours = math.floor(pMinutes / 3600)
  local minutes = math.floor((pMinutes - (hours * 3600)) / 60)
  local seconds = pMinutes - (hours * 3600) - (minutes * 60)
  return string.format("%02d:%02d:%02d", hours, minutes, seconds)
end

AddEventHandler("ev-business:lifeinvader:manageListings", function()
  local hasPermission = HasPermission("lifeinvader", "craft_access")
  if not hasPermission then
    return
  end

  local ads = RPC.execute("phone:li:getAdListings")
  local context = { { title = "Ad Listings" }, { title = "Create Add Listing", icon = "plus", action = "ev-ui:li:createAdListing" } }

  for i, ad in ipairs(ads) do
    local now = GetCloudTimeAsInt()
    local timeDifference = ad.expiresAt - now
    context[#context + 1] = {
      title = ad.url,
      description = "Expires in " .. convertTime(timeDifference),
      icon = "ad",
      image = ad.url,
      children = {
        { title = "Total Hits: " .. ad.hits, icon = "users" },
        { title = "Remove", icon = "trash", action = "ev-ui:li:removeAdListing", key = ad.id },
      },
    }
  end

  exports["ev-ui"]:showContextMenu(context)
end)

RegisterUICallback("ev-ui:li:createAdListing", function(data, cb)
  Wait(0)
  local prompt = exports["ev-ui"]:OpenInputMenu({
    { label = "URL (i.imgur.com)", name = "url", icon = "image" },
    {
      label = "Duration",
      name = "duration",
      _type = "select",
      options = {
        { id = 3 * 24 * 60 * 60, name = "3 Days" },
        { id = 7 * 24 * 60 * 60, name = "7 Days" },
        { id = 14 * 24 * 60 * 60, name = "14 Days" },
        { id = 30 * 24 * 60 * 60, name = "30 Days" },
      },
    },
  }, function(values)
    if not values.url or not values.duration then
      return false
    end
    local checkImgur = values.url:match("i%.imgur%.com/(.*)$")
    return checkImgur
  end)
  if not prompt then
    return
  end
  local data = { url = prompt.url, duration = prompt.duration }
  local success, message = RPC.execute("phone:li:createAdListing", data)
  TriggerEvent("DoLongHudText", success and "Ad Listing Created" or message, success and 1 or 2)
  cb({ data = message, meta = { ok = success, message = (not success and message or "done") } })
end)

RegisterUICallback("ev-ui:li:removeAdListing", function(data, cb)
  local success, message = RPC.execute("phone:li:removeAdListing", data.key)
  TriggerEvent("DoLongHudText", success and "Ad Listing Removed" or message, success and 1 or 2)
  cb({ data = message, meta = { ok = success, message = (not success and message or "done") } })
end)

AddEventHandler("ev-business:lifeinvader:sendSystemMail", function()
  local hasPermission = HasPermission("digital_den", "hire")
  if not hasPermission then
    return
  end

  local prompt = exports["ev-ui"]:OpenInputMenu({
    { label = "Title", name = "title", icon = "envelope-open" },
    { label = "Body", name = "body", _type = "textarea" },
  }, function(values)
    print(json.encode(values))
    if not values.title or not values.body then
      return false
    end
    local length = string.len(values.title)
    local length2 = string.len(values.body)
    return length > 0 and length < 255 and length2 > 0
  end)

  if not prompt then
    return false
  end

  local result, message = RPC.execute("phone:li:sendSystemMail", prompt.title, prompt.body)

  TriggerEvent("DoLongHudText", message, result and 1 or 2)
end)

local reservedEmails = {
  ["devs"] = true,
  ["ethereal"] = true,
  ["etherealvisions"] = true,
  ["developers"] = true,
  ["developer"] = true,
  ["admin"] = true,
  ["admins"] = true,
  ["administrator"] = true,
  ["administrators"] = true,
  ["mod"] = true,
  ["mods"] = true,
  ["moderator"] = true,
  ["moderators"] = true,
  ["staff"] = true,
  ["system"] = true,
  ["support"] = true,
}

local function trim(str)
  return str:gsub("^%s+", ""):gsub("%s+$", "")
end

local function showEmailPrompt(pFromUpdate)
  local domainOptions = { { id = "lifeinvader.com", name = "lifeinvader.com" }, { id = "invader.net", name = "invader.net" } }

  local cid = exports["isPed"]:isPed("cid")
  local myjob = exports["isPed"]:isPed("myjob")

  if cid == 709 then -- cool
    domainOptions[#domainOptions + 1] = { id = "cool.dev", name = "cool.dev" }
  end

  if myjob == "judge" or myjob == "county_clerk" or myjob == "mayor" or myjob == "deputy_mayor" or myjob == "district attorney" then
    domainOptions[#domainOptions + 1] = { id = "doj.gov", name = "doj.gov" }
    domainOptions[#domainOptions + 1] = { id = "ls.gov", name = "ls.gov" }
  end

  if myjob == "police" or myjob == "doc" then
    domainOptions[#domainOptions + 1] = { id = "upd.gov", name = "upd.gov" }
    domainOptions[#domainOptions + 1] = { id = "ls.gov", name = "ls.gov" }
  end

  if myjob == "ems" or myjob == "doctor" or myjob == "therapist" then
    domainOptions[#domainOptions + 1] = { id = "lsmg.gov", name = "lsmg.gov" }
    domainOptions[#domainOptions + 1] = { id = "lsfd.gov", name = "lsfd.gov" }
    domainOptions[#domainOptions + 1] = { id = "ls.gov", name = "ls.gov" }
  end

  local prompt = exports["ev-ui"]:OpenInputMenu({
    { label = "Prefix (4-20 characters)", name = "email", icon = "envelope-open" },
    { label = "Domain", name = "domain", _type = "select", options = domainOptions },
  }, function(values)
    if not values.email then
      return false
    end
    local length = string.len(values.email)
    local checkEmail = values.email:match("(.*)@(.*)$")
    return not checkEmail and length > 3 and length < 20
  end)

  if not prompt then
    return false
  end

  local prefix = trim(prompt.email)

  if reservedEmails[prefix] then
    TriggerEvent("DoLongHudText", "That email is unavailable", 2)
    return false
  end

  local email = prefix .. "@" .. prompt.domain
  local success, message = RPC.execute("ev-phone:setEmailAddress", email, pFromUpdate)
  if not success then
    TriggerEvent("DoLongHudText", message, 2)
    return false
  end

  TriggerEvent("ev-ui:updateCharacterData")
  TriggerEvent("DoLongHudText", "Your email address is now " .. email, 1)
  return true
end

RegisterNetEvent("ev-business:lifeinvader:frontDesk")
AddEventHandler("ev-business:lifeinvader:frontDesk", function()
  local hasEmail = RPC.execute("ev-phone:getEmailAddress")
  if hasEmail then
    TriggerEvent("DoLongHudText", "You already have a free email address", 2)
    return
  end
  showEmailPrompt(false)
end)

AddEventHandler("ev-business:lifeinvader:changeEmail", function()
  local hasEmail = RPC.execute("ev-phone:getEmailAddress")
  if not hasEmail then
    TriggerEvent("DoLongHudText", "You do not have an email address", 2)
    return
  end
  showEmailPrompt(true)
end)