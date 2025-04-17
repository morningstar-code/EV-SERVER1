RegisterNUICallback('callback', function(data, cb)
	SetNuiFocus(false, false)
  Callbackk(data.success)
  cb('ok')
end)

function OpenThermiteGame(callback, size, coloredSquares, endtime, url)
  Callbackk = callback
	SetNuiFocus(true, true)
	SendNUIMessage({type = "open", size = size, Squares = coloredSquares, endtime = endtime, submiturl = url})
end

exports("OpenThermiteGame", OpenThermiteGame)