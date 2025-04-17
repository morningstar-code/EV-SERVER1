function locationInit(location)
    local locationConfig = getConfigFor(location)

    if not locationConfig then return end

    return locationConfig.carSpawns, locationConfig.testDriveSpawnPoint
end

function locationRemove(location)
    return true
end