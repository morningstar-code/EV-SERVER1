RPC.register("showroom:locationInit", function(pSource, pLocation)
    return locationInit(pLocation.param)
end)

RPC.register("showroom:locationRemove", function(pSource, pLocation)
    return locationRemove(pLocation.param)
end)

RPC.register("showroom:getCarConfig", function(pSource, pShop)
    return getCarConfig(pShop and pShop.param or nil)
end)

RPC.register("showroom:getCarPresets", function(pSource) -- TODO;
    return getCarPresets()
end)

RPC.register("showroom:changeSpawnedCar", function(pSource, pLocation, pIndex, pModel)
    return changeSpawnedCar(pLocation.param, pIndex.param, pModel.param)
end)

RPC.register("showroom:offerVehicle", function(pSource, pData)
    return offerVehicle(pData.param)
end)

RPC.register("showroom:purchaseVehicle", function(pSource, pModel, pData, pLocation, pIsFromCatalog)
    return purchaseVehicle(pSource, pModel.param, pData.param, pLocation.param, pIsFromCatalog.param)
end)

RPC.register("showroom:purchaseCatalogPrompt", function(pSource, pData)
    return purchaseCatalogPrompt(pData.param)
end)

RPC.register("showroom:hasStock", function(pSource, pModel)
    return hasStock(pModel.param)
end)

RPC.register("showroom:stockIncrease", function(pSource, pModel)
    return stockIncrease(pModel.param)
end)

RPC.register("showroom:stockDecrease", function(pSource, pModel)
    return stockDecrease(pModel.param)
end)

RPC.register("showroom:testDriveVehicle", function(pSource, pModel, pTestDriveSpawnPoint, pZoneName)
    return testDriveVehicle(pSource, pModel.param, pTestDriveSpawnPoint.param, pZoneName.param)
end)

RPC.register("showroom:isTestDriveVehicle", function(pSource, pNetId)
    return isTestDriveVehicle(pNetId.param)
end)

RPC.register("showroom:getTestDriveVehicleModelName", function(pSource, pNetId)
    return getTestDriveVehicleModelName(pNetId.param)
end)

RPC.register("showroom:saveTestDrivePreset", function(pSource, pNetId, pFitment)
    return saveTestDrivePreset(pNetId.param, pFitment.param)
end)

RPC.register("showroom:returnCurrentVehicle", function(pSource, pNetId)
    return returnCurrentVehicle(pNetId.param)
end)

RPC.register("ev-showrooms:purchaseJobVehicle", function(pSource, pData)
    return purchaseJobVehicle(pData.param)
end)