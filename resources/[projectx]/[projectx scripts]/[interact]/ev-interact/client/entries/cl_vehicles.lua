local Entries = {}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_flip",
            label = "Flip Vehicle",
            icon = "car-crash",
            event = "FlipVehicle",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 3.0 },
        isEnabled = function(pEntity, pContext)
            return not IsVehicleOnAllWheels(pEntity)
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "carry_bike",
            label = "Carry Bike",
            icon = "spinner",
            event = "carryEntity",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 3.0 },
        isEnabled = function(pEntity, pContext)
            return IsThisModelABicycle(pContext.model) and not IsEntityAttachedToAnyPed(pEntity) and not IsEntityAttachedToAnyPed(PlayerPedId())
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_getintrunk",
            label = "Enter trunk",
            icon = "user-secret",
            event = "ev-police:vehicle:getInTrunk",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 4.0 },
        isEnabled = function(pEntity, pContext)
            local lockStatus = GetVehicleDoorLockStatus(pEntity)
            return DoesVehicleHaveDoor(pEntity, 5) and isCloseToBoot(pEntity, PlayerPedId(), 2.0, pContext.model) and (lockStatus == 1 or lockStatus == 0 or lockStatus == 4)
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_putintrunk",
            label = "Put in trunk",
            icon = "user-secret",
            event = "ev-police:vehicle:forceTrunkCheck",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 4.0 },
        isEnabled = function(pEntity, pContext)
            local lockStatus = GetVehicleDoorLockStatus(pEntity)
            return DoesVehicleHaveDoor(pEntity, 5) and isCloseToBoot(pEntity, PlayerPedId(), 2.0, pContext.model) and (lockStatus == 1 or lockStatus == 0 or lockStatus == 4) and isEscorting
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_runplate",
            label = "Run Plate",
            icon = "money-check",
            event = "clientcheckLicensePlate",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 7.0 },
        isEnabled = function(pEntity, pContext)
            return isPolice and (isCloseToHood(pEntity, PlayerPedId(), 2.0) or isCloseToBoot(pEntity, PlayerPedId(), 2.0, pContext.model)) and not IsPedInAnyVehicle(PlayerPedId(), false)
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_inspectvin",
            label = "Check VIN",
            icon = "sim-card",
            event = "vehicle:checkVIN",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 3.0 },
        isEnabled = function(pEntity, pContext)
            return isCloseToHood(pEntity, PlayerPedId(), 2.0) and (isPolice or isMedic) and not IsPedInAnyVehicle(PlayerPedId(), false)
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_add_fakeplate",
            label = "Add Fakeplate",
            icon = "screwdriver",
            event = "vehicle:addFakePlate",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 3.0 },
        isEnabled = function(pEntity, pContext)
            return (isCloseToHood(pEntity, PlayerPedId(), 2.0) or isCloseToBoot(pEntity, PlayerPedId(), 2.0, pContext.model)) and not IsPedInAnyVehicle(PlayerPedId(), false)
            and exports["ev-vehicles"]:HasVehicleKey(pEntity) and exports["ev-inventory"]:hasEnoughOfItem("fakeplate", 1, false, true)
            and not exports["ev-vehicles"]:GetVehicleMetadata(pEntity, 'fakePlate')
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "inventory_open_hidden",
            label = "Open Compartment",
            icon = "screwdriver",
            event = "inventory:open_hidden",
            parameters = {
            }
        }
    },
    options = {
        distance = { radius = 3.0 },
        isEnabled = function(pEntity, pContext)
            return (not IsPedInAnyVehicle(PlayerPedId(), false) and GetBoneDistance(pEntity, 2, 'wheel_rf') <= 1.7 and pContext.model == GetHashKey("mule") and exports["ev-inventory"]:hasEnoughOfItem("homemadekey", 1, false)  )
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "inventory_hidden_scratches",
            label = "Loose Bolt",
            icon = "screwdriver",
            event = "inventory:open_hidden_fail",
            parameters = {
            }
        }
    },
    options = {
        distance = { radius = 3.0 },
        isEnabled = function(pEntity, pContext)
            return (not IsPedInAnyVehicle(PlayerPedId(), false) and GetBoneDistance(pEntity, 2, 'wheel_rf') <= 1.7 and pContext.model == GetHashKey("mule") and not exports["ev-inventory"]:hasEnoughOfItem("homemadekey", 1, false)  )
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_remove_fakeplate",
            label = "Remove Fakeplate",
            icon = "ban",
            event = "vehicle:removeFakePlate",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 3.0 },
        isEnabled = function(pEntity, pContext)
            return (isCloseToBoot(pEntity, PlayerPedId(), 1.8, pContext.model) or pContext.model == `esv`) and not IsPedInAnyVehicle(PlayerPedId(), false)
            and exports["ev-vehicles"]:HasVehicleKey(pEntity) and exports["ev-vehicles"]:GetVehicleMetadata(pEntity, 'fakePlate')
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_examine",
            label = "Examine Vehicle",
            icon = "wrench",
            event = "ev:vehicles:examineVehicle",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 3.0, boneId = "engine" },
        isEnabled = function(pEntity, pContext)
            return isCloseToEngine(pEntity, PlayerPedId(), 3.0, pContext.model) and not bypassedNetVehicles[VehToNet(pEntity)]
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_refuel_station",
            label = "Refuel Vehicle",
            icon = "fas fa-gas-pump",
            event = "ev-fuel:RefillVehicle",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.2, boneId = 'wheel_lr' },
        isEnabled = function(pEntity, pContext)
            return exports['ev-fuel']:hasNozle()
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_refuel_station_plane",
            label = "Refuel Vehicle",
            icon = "gas-pump",
            event = "vehicle:refuel:showMenu",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 2.0 },
        isEnabled = function(pEntity, pContext)
            local vehicleClass = GetVehicleClass(pEntity)
            if vehicleClass ~= 16 then return false end
            return polyChecks.gasStation.isInside
        end
    }
  }

  Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_refuel_station_boat",
            label = "Refuel Vehicle",
            icon = "gas-pump",
            event = "vehicle:refuel:showMenu",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 5.0 },
        isEnabled = function(pEntity, pContext)
            local vehicleClass = GetVehicleClass(pEntity)
            if vehicleClass ~= 14 then return false end
            return polyChecks.gasStation.isInside
        end
    }
}


Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_refuel_station_chopter",
            label = "Refuel Vehicle",
            icon = "gas-pump",
            event = "vehicle:refuel:showMenu",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 5.0 },
        isEnabled = function(pEntity, pContext)
            local vehicleClass = GetVehicleClass(pEntity)
            if vehicleClass ~= 15 then return false end
            return polyChecks.gasStation.isInside
        end
    }
  }
  
Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_refuel_jerrycan",
            label = "Refuel Vehicle",
            icon = "gas-pump",
            event = "ev-ui:jerry_can:refuel",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.2, boneId = 'wheel_lr' },
        isEnabled = function(pEntity, pContext)
            return HasWeaponEquipped(883325847) -- WEAPON_PetrolCan
        end
    }
}

Entries[#Entries + 1] = {
  type = 'entity',
  group = { 2 },
  data = {
      {
          id = "vehicle_refuel_station_plane",
          label = "Refuel Vehicle",
          icon = "gas-pump",
          event = "vehicle:refuel:showMenu",
          parameters = {}
      }
  },
  options = {
      distance = { radius = 2.0 },
      isEnabled = function(pEntity, pContext)
          local vehicleClass = GetVehicleClass(pEntity)
          if vehicleClass ~= 16 then return false end
          return polyChecks.gasStation.isInside
      end
  }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_refuel_station_boat",
            label = "Refuel Vehicle",
            icon = "gas-pump",
            event = "vehicle:refuel:showMenu",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 5.0 },
        isEnabled = function(pEntity, pContext)
            local vehicleClass = GetVehicleClass(pEntity)
            if vehicleClass ~= 14 then return false end
            return polyChecks.gasStation.isInside
        end
    }
}

Entries[#Entries + 1] = {
  type = 'entity',
  group = { 2 },
  data = {
      {
          id = "vehicle_refuel_station_chopter",
          label = "Refuel Vehicle",
          icon = "gas-pump",
          event = "vehicle:refuel:showMenu",
          parameters = {}
      }
  },
  options = {
      distance = { radius = 5.0 },
      isEnabled = function(pEntity, pContext)
          local vehicleClass = GetVehicleClass(pEntity)
          if vehicleClass ~= 15 then return false end
          return polyChecks.gasStation.isInside
      end
  }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "handoff_package",
            label = "Handoff Package",
            icon = "hand-holding",    
            event = "handoff-package",
            parameters = {}
        } 
    },
    options = {
        distance = { radius = 1.8 },
        isEnabled = function(pEntity, pContext)
            return exports['ev-activities']:canHandOffPackages() and exports['ev-inventory']:hasEnoughOfItem('darkmarketpackage', 1)
        end
    }
}

-- Entries[#Entries + 1] = {
--     type = 'entity',
--     group = { 2 },
--     data = {
--         {
--             id = "vehicle_refuel_jerrycan",
--             label = "Refuel Vehicle",
--             icon = "gas-pump",
--             event = "vehicle:refuel:jerryCan",
--             parameters = {}
--         }
--     },
--     options = {
--         distance = { radius = 1.2, boneId = 'wheel_lr' },
--         isEnabled = function(pEntity, pContext)
--             return HasWeaponEquipped(883325847) -- WEAPON_PetrolCan
--         end
--     }
-- }

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = { 
        {
            id = "vehicle_outfit_system",
            label = "Change Outfit",
            icon = "fas fa-chevron-circle-right",
            event = "raid_clothes:outfitsVeh",
            parameters = {} 
        }
    },
    options = {
        distance = { radius = 4.0 },
        isEnabled = function(pEntity, pContext)
            local lockStatus = GetVehicleDoorLockStatus(pEntity)
            return DoesVehicleHaveDoor(pEntity, 5) and isCloseToBoot(pEntity, PlayerPedId(), 2.0, pContext.model) and (lockStatus == 1 or lockStatus == 0 or lockStatus == 4) 
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_putinvehicle",
            label = "seat in vehicle",
            icon = "chevron-circle-left",
            event = "ev-police:vehicle:seat",
            parameters = {}
        },
        {
            id = "vehicle_unseatnearest",
            label = "unseat from vehicle",
            icon = "chevron-circle-right",
            event = "ev-police:vehicle:unseat",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 4.0 },
        isEnabled = function(pEntity, pContext)
            return (not (isCloseToHood(pEntity, PlayerPedId()) or isCloseToBoot(pEntity, PlayerPedId(), 2.0, pContext.model))
              or pContext.model == GetHashKey("emsnspeedo"))
              and not IsPedInAnyVehicle(PlayerPedId(), false)
              and NetworkGetEntityIsNetworked(pEntity)
              and not bypassedNetVehicles[VehToNet(pEntity)]
              and not pContext.flags["isCarShopVehicle"]
        end
    }
}

--[[ Entries[#Entries + 1] = {
    type = 'model',
    group = { GetHashKey('benson') },
    data = {
        {
            id = "247_deliveries_take_goods",
            label = "Grab goods",
            icon = "box",
            event = "ev-jobs:247delivery:takeGoods",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 2.0, boneId = 'boot' },
        isEnabled = function (pEntity, pContext)
            return isCloseToTrunk(pEntity, PlayerPedId())
        end
    }
}
 ]]
Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_keysgive",
            label = "give key",
            icon = "key",
            event = "vehicle:giveKey",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.8 },
        isEnabled = function(pEntity, pContext)
            return hasKeys(pEntity) and not bypassedNetVehicles[VehToNet(pEntity)]
        end
    }
}

--[[ Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_vinscratch",
            label = "scratch vin",
            icon = "eye-slash",
            event = "ev-boosting:scratchVehicleVin",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 4 },
        isEnabled = function(pEntity, pContext)
            return pContext.meta ~= nil and pContext.meta.boostingInfo ~= nil and pContext.meta.boostingInfo.vinScratch
        end
    }
} ]]

--[[ Entries[#Entries + 1] = {
    type = 'polytarget',
    group = { 'boosting_prepscratch' },
    data = {
        {
            id = "boosting_prepscratch",
            label = "Prepare Vin Scratch",
            icon = "laptop",
            event = "ev-boosting:client:UseComputer",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.0 },
        isEnabled = function(entity)
            return exports['ev-boosting']:pCanUseLaptop() 
        end
    }
} ]]

--[[ Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vinscratch_car",
            label = "Scratch Vin",
            icon = "eye-slash",
            event = "ev-boosting:finish_scratch",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 4.0 },
        isEnabled = function(pEntity, pContext)
            return (not (isCloseToHood(pEntity, PlayerPedId()) or isCloseToBoot(pEntity, PlayerPedId(), 2.0, pContext.model)))
              and not IsPedInAnyVehicle(PlayerPedId(), false)
              and NetworkGetEntityIsNetworked(pEntity) and exports['ev-boosting']:pCanFinishScratch() 
        end
    }
} ]]

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_methdisturbdrop",
            label = "Intercept goods",
            icon = "eye-slash",
            event = "ev-meth:dropoff:cancelDropOff",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 4 },
        isEnabled = function(pEntity, pContext)
            return isCloseToTrunk(pEntity, PlayerPedId(), 1.1, false) and pContext.meta ~= nil and pContext.meta.dropoffInfo and pContext.meta.dropoffInfo.uuid and isPolice
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_methdrop",
            label = "Drop off goods",
            icon = "cubes",
            event = "ev-meth:dropoff:doDropoff",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 4 },
        isEnabled = function(pEntity, pContext)
            return isCloseToTrunk(pEntity, PlayerPedId(), 1.1, false) and pContext.meta ~= nil and pContext.meta.dropoffInfo and pContext.meta.dropoffInfo.uuid
        end
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isWheelchair' },
    data = {
        {
            id = "wheelchair",
            label = "toggle wheelchair",
            icon = "wheelchair",
            event = "ev:vehicle:wheelchair:control",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 0.9, boneId = 'misc_a' }
    }
}


Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isTowTruck' },
    data = {
        {
            id = "towtruck_tow",
            label = "tow vehicle",
            icon = "trailer",
            event = "jobs:towVehicle",
            parameters = {}
        }
    },
    options = {
        job = { 'impound', 'pd_impound', 'police', 'unemployed' },
        distance = { radius = 2.5, boneId = 'wheel_lr' },
        isEnabled = function (pEntity, pContext)
            return not pContext.flags['isTowingVehicle']
        end
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isTowTruck' },
    data = {
        {
            id = "towtruck_untow",
            label = "untow vehicle",
            icon = "trailer",
            event = "jobs:untowVehicle",
            parameters = {}
        }
    },
    options = {
        job = { 'impound', 'pd_impound', 'police', 'unemployed' },
        distance = { radius = 2.5, boneId = 'wheel_lr' },
        isEnabled = function (pEntity, pContext)
            return pContext.flags['isTowingVehicle']
        end
    }
}

Entries[#Entries + 1] = {
    type = 'model',
    group = { GetHashKey('trash2') },
    data = {
        {
            id = "sanitation_worker_throw_trash",
            label = "throw in trash",
            icon = "trash-restore-alt",
            event = "ev-jobs:sanitationWorker:vehicleTrash",
            parameters = {}
        }
    },
    options = {
        job = { 'garbage' },
        distance = { radius = 3.8, boneId = 'wheel_lr' },
        isEnabled = function (pEntity, pContext)
            return isCloseToTrunk(pEntity, PlayerPedId(), 1.1, true)
        end
    }
}

Entries[#Entries + 1] = {
    type = 'model',
    group = { GetHashKey('boxville7'), GetHashKey('pounder') },
    data = {
        {
            id = "dodo_deliveries_take_goods",
            label = "Grab goods",
            icon = "box",
            event = "ev-jobs:dodo:takeGoods",
            parameters = {}
        }
    },
    options = {
        job = { 'dodo_deliveries' },
        distance = { radius = 5.0, boneId = 'wheel_lr' },
        isEnabled = function (pEntity, pContext)
            return isCloseToTrunk(pEntity, PlayerPedId())
        end
    }
}

Entries[#Entries + 1] = {
  type = 'entity',
  group = { 2 },
  data = {
      {
          id = "vehicle_buy_vehicle",
          label = "sell vehicle",
          icon = "money-check-alt",
          CPXEvent = "ev-ottosauto:vehicle:transaction",
          parameters = {
            action = "sell"
          }
      }
  },
  options = {
      distance = { radius = 1.8 },
      isEnabled = function(pEntity, pContext)
          return polyChecks.ottosAuto.isInside and hasJobPermission("ottos_auto") and CanSellOrBuyCar(pEntity, true)
      end
  }
}

Entries[#Entries + 1] = {
  type = 'entity',
  group = { 2 },
  data = {
      {
          id = "vehicle_sell_vehicle",
          label = "buy vehicle",
          icon = "shopping-cart",
          CPXEvent = "ev-ottosauto:vehicle:transaction",
          parameters = {
            action = "buy"
          }
      }
  },
  options = {
      distance = { radius = 1.8 },
      isEnabled = function(pEntity, pContext)
          return polyChecks.ottosAuto.isInside and hasJobPermission("ottos_auto", "buy_car") and CanSellOrBuyCar(pEntity, false)
      end
  }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_tamperedwith",
            label = "check for tampering signs",
            icon = "unlink",
            event = "ev-vehicles:checkTampering",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.8 },
        job = { 'police' },
        isEnabled = function(pEntity, pContext)
            return isCloseToDriverDoor(pEntity, PlayerPedId(), 1.5)
        end
    }
}

Entries[#Entries + 1] = {
    type = 'model',
    group = { GetHashKey('bcat') },
    data = {
        {
            id = "rhino-open-armory",
            label = "open armory",
            icon = "shopping-cart",
            event = "ev-police:client:openRhinoArmoy",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 7.0 },
        isEnabled = function (pEntity, pContext)
            return isPolice and (isCloseToHood(pEntity, PlayerPedId(), 2.0) or isCloseToBoot(pEntity, PlayerPedId(), 2.0, pContext.model)) and not IsPedInAnyVehicle(PlayerPedId(), false)
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_defusebomb",
            label = "Defuse Car Bomb",
            icon = "cut",
            event = "ev-miscscripts:carBombs:removeBomb",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.8 },
        isEnabled = function(pEntity, pContext)
            return 
            pContext.meta ~= nil and 
            pContext.meta.carBombData ~= nil and 
            pContext.meta.carBombData.found
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_pickup_rc",
            label = "pickup",
            icon = "people-carry",
            event = "ev-rcvehicles:pickupCar",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.8 },
        isEnabled = function(pEntity, pContext)
            return pContext.model == `rcbandito` and #GetEntityVelocity(pEntity) < 0.2 and bypassedNetVehicles[VehToNet(pEntity)]
        end
    }
}

-- custom car clothing
local inClothingShop = false
AddEventHandler("ev-polyzone:enter", function(pName)
  if pName ~= "custom_car_clothing" then return end
  inClothingShop = true
end)
AddEventHandler("ev-polyzone:exit", function(pName)
  if pName ~= "custom_car_clothing" then return end
  inClothingShop = false
end)
Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_clothing_save",
            label = "Save Current Outfit",
            icon = "plus",
            event = "ev-car-clothing:saveCurrentOutfit",
            parameters = {},
        },
        {
            id = "vehicle_clothing_swap",
            label = "Swap Current Outfit",
            icon = "redo",
            event = "ev-car-clothing:swapCurrentOutfit",
            parameters = {},
        },
    },
    options = {
        distance = { radius = 2.5 },
        isEnabled = function(pEntity, pContext)
            return inClothingShop
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_heroindisturbdrop",
            label = "Intercept goods",
            icon = "eye-slash",
            event = "ev-heroin:seeds:cancelSeeds",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 4 },
        isEnabled = function(pEntity, pContext)
            return isCloseToTrunk(pEntity, PlayerPedId(), 1.1, false) and pContext.meta ~= nil and pContext.meta.seedsInfo and pContext.meta.seedsInfo.uuid and isPolice
        end
    }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 2 },
    data = {
        {
            id = "vehicle_heroindrop",
            label = "drop off goods",
            icon = "cubes",
            event = "ev-heroin:seeds:doDropoff",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 4 },
        isEnabled = function(pEntity, pContext)
            return isCloseToTrunk(pEntity, PlayerPedId(), 1.1, false) and pContext.meta ~= nil and pContext.meta.seedsInfo and pContext.meta.seedsInfo.uuid
        end
    }
}






-- local stockadeHash = `STOCKADE`
-- Entries[#Entries + 1] = {
--   type = 'entity',
--   group = { 2 },
--   data = {
--       {
--           id = "moneytruckthermite",
--           label = "Use Thermite",
--           icon = "circle",
--           event = "ev-heists:bobcatThermiteMoneyTruckDoor",
--           parameters = {}
--       }
--   },
--   options = {
--       distance = { radius = 8.0 },
--       isEnabled = function(pEntity, pContext)
--           return pContext.model == stockadeHash
--             and isCloseToBoot(pEntity, PlayerPedId(), 2.0, pContext.model)
--             and not DecorGetBool(pEntity, "BobcatMoneyTruck")
--             and exports["ev-inventory"]:hasEnoughOfItem("thermitecharge", 1, false, true)
--       end
--   }
-- }

-- Entries[#Entries + 1] = {
--   type = 'entity',
--   group = { 2 },
--   data = {
--       {
--           id = "moneytruckloot",
--           label = "Take Goods",
--           icon = "circle",
--           event = "ev-heists:bobcatMoneyTruckTakeGoods",
--           parameters = {}
--       }
--   },
--   options = {
--       distance = { radius = 8.0 },
--       isEnabled = function(pEntity, pContext)
--           return pContext.model == stockadeHash
--             and isCloseToBoot(pEntity, PlayerPedId(), 2.0, pContext.model)
--             and DecorGetBool(pEntity, "BobcatMoneyTruck")
--       end
--   }
-- }

Citizen.CreateThread(function()
    for _, entry in ipairs(Entries) do
        if entry.type == 'flag' then
            AddPeekEntryByFlag(entry.group, entry.data, entry.options)
        elseif entry.type == 'model' then
            AddPeekEntryByModel(entry.group, entry.data, entry.options)
        elseif entry.type == 'entity' then
            AddPeekEntryByEntityType(entry.group, entry.data, entry.options)
        elseif entry.type == 'polytarget' then
            AddPeekEntryByPolyTarget(entry.group, entry.data, entry.options)
        end
    end
end)

---exports["ev-polytarget"]:AddBoxZone("boosting_prepscratch", vector3(471.6, -1311.0, 29.22), 0.5, 0.5, {-- Guerro Stash
---    heading=25,
---    --debugPoly=false,
---    minZ=25.62,
---    maxZ=29.62
---})
