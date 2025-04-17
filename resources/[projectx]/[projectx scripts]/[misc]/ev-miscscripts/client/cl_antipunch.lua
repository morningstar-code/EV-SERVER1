Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        DisableControlAction(1, 140, true)
        if not IsControlPressed(1, 25, true) then  
            DisableControlAction(1, 141, true)
            DisableControlAction(1, 142, true) 
        end
    end
  end)