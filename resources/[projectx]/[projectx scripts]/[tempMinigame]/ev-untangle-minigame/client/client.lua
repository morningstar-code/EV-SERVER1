local function OpenUntangleGame(callback, points)
  Callback = callback
  SetNuiFocus(true, true)

  SendReactMessage('uiMessage', {
    show = true,
    points = points,
    app = 'minigame-untangle'
  })
end

RegisterNUICallback('uiMessage', function(data, cb)
  SetNuiFocus(false)
  TriggerEvent(data.event, data.args)
  cb('ok')
end)

RegisterNUICallback('minigame-untangle', function(data, cb)
	  SetNuiFocus(false, false)
    Callback(data.action)
end)

exports("OpenUntangleGame", OpenUntangleGame)
