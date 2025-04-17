CodeStudio = {}
--[[ 
CodeStudio.ServerType = 'QB'  ---Your Server Type QB/ESX

 ]]
---LEAVE THIS IF YOU ARE NOT USING QB/ESX---

--[[ -- If you are using QB.
CodeStudio.QBCoreGetCoreObject = 'qb-core' --ONLY EDIT IF YOU ARE USING QB IF NOT LEAVE THIS
-- If you are using ESX.
CodeStudio.ESXGetSharedObject = 'es_extended' --ONLY EDIT IF YOU ARE USING ESX IF NOT LEAVE THIS

 ]]

CodeStudio.Minimum = -10            --Minimum Level of Height 
CodeStudio.Maximum = 10              --Maximum Level of Height 
CodeStudio.ChangePerLevel = 0.01    --Change og Height Per Level (Keep Value in Decimals)

CodeStudio.SaveAfterRestart = true  --Enable if you want to save suspension height even after restart ('No Database Required')

--If not working edit item.lua according to your server--
CodeStudio.useItem = false          
CodeStudio.ItemName = 'airsuspension'



CodeStudio.Language = {
    not_veh = 'Not In a Vehicle',
    only_driver = 'Only Driver can use this',
    max = 'Maximum',
    min = 'Minimum',
}


-------Notifications Customization-------




function Notify(msg, state)
    if CodeStudio.ServerType == "QB" then 
        --QBCore.Functions.Notify(msg, state)
    elseif CodeStudio.ServerType == "ESX" then 
        --ESX.ShowNotification(msg, false, true, nil)
    else
        --ADD YOUR NOTIFICATION
    end
end


