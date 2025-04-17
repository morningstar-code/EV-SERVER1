RegisterNUICallback('callback', function(data, cb)
	SetNuiFocus(false, false)
    Callbackk(data.success)
    cb('ok')
end)

function OpenDevice(callback, target, time)
  Callbackk = callback
	SetNuiFocus(true, true)
	SendNUIMessage({type = "open", target = target, time = time})
end
