
local hasPdAuthCode = nil
RegisterUICallback("ev-editor:stash:enteredAuthCode", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = "done" } })
  exports["ev-ui"]:closeApplication("textbox")
  hasPdAuthCode = true
end)

AddEventHandler("ev-ui:application-closed", function(name)
  if name ~= "textbox" then return end
  hasPdAuthCode = false
end)

function getPDAuthCode()
  hasPdAuthCode = nil
  exports["ev-ui"]:openApplication("textbox", {
    callbackUrl = "ev-editor:stash:enteredAuthCode",
    inputKey = "",
    items = {
      { label = "Auth Code", name = "password", type = "password" },
    },
    show = true,
  })
  while hasPdAuthCode == nil do
    Wait(1000)
  end
  return hasPdAuthCode
end

function isPD()
  local job = exports["ev-base"]:getModule("LocalPlayer"):getVar("job")

  return isCop or isJudge or job == "district attorney"
end
