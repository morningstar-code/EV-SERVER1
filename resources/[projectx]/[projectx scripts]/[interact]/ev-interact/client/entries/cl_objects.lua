local Entries = {}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isTrash' },
    data = {
        {
            id = 'trash',
            label = "Pickup trash",
            icon = "circle",
            event = "ev-jobs:sanitationWorker:pickupTrash",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.7 },
        job = { 'sanitation_worker' }
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isYogaMat' },
    data = {
        {
            id = 'yoga',
            label = "Yoga",
            icon = "circle",
            event = "ev-healthcare:yoga",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.5 },
        isEnabled = function(pEntity, pContext)
            return IsEntityTouchingEntity(PlayerPedId(), pEntity)
        end
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isExercise' },
    data = {
        {
            id = 'weights',
            label = "Weights",
            icon = "circle",
            event = "ev-healthcare:exercise",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.2 },
    }
}

-- Entries[#Entries + 1] = {
--     type = 'flag',
--     group = { 'isSmokeMachineTrigger' },
--     data = {
--         {
--             id = 'smoke_machine',
--             label = "Smoke Machine",
--             icon = "circle",
--             event = "ev-stripclub:smokemachine",
--             parameters = {}
--         }
--     },
--     options = {
--         distance = { radius = 1.2 },
--     }
-- }

--[[ Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isFuelPump' },
    data = {
        {
            id = 'jerrycan_refill',
            label = "Refill Can",
            icon = "circle",
            event = "vehicle:refuel:showMenu",
            parameters = { isJerryCan = true }
        }
    },
    options = {
        distance = { radius = 1.5 },
        isEnabled = function(pEntity, pContext)
            return HasWeaponEquipped(GetHashKey('WEAPON_PetrolCan'))
        end
    }
} ]]

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isFuelPump' },
    data = {
        {
            id = 'use_gas',
            label = " Use Gas Pump",
            icon = "gas-pump",
            event = "ev-fuel:SelectFuel",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.7 },
        isEnabled = function(pEntity, pContext)
            return not exports['ev-fuel']:hasNozle()
        end
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isFuelPump' },
    data = {
        {
            id = 'return_hose',
            label = "Return Hose",
            icon = "hand-holding",
            event = "ev-fuel:ReturnNozel",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.7 },
        isEnabled = function(pEntity, pContext)
            return exports['ev-fuel']:hasNozle()
        end
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isFuelPump' },
    data = {
        {
            id = 'gas_station',
            label = "Purchase Jerry Can",
            icon = "gas-pump",
            event = "ev-gas:buy_can",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.5 },
        isEnabled = function(pEntity, pContext)
            return true
        end
    }
}

RegisterNetEvent('ev-gas:buy_can')
AddEventHandler('ev-gas:buy_can', function()
    TriggerServerEvent('ev-ui:buy_can') 
end)

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isVendingMachine' },
    data = {
        {
            id = 'vending_machine',
            label = "Browse",
            icon = "shopping-basket",
            event = "shops:vendingMachine",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.5 }
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isChair' },
    data = {
        {
            id = 'sit_on_chair',
            label = "Sit",
            icon = "chair",
            event = "ev-emotes:sitOnChair",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.5 }
    }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isChair' },
  data = {
      {
          id = 'sit_on_vr_gopro_chair_pd',
          label = "Enable GoProblem VR",
          icon = "chair",
          event = "ev-gopro:activateVRChair",
          parameters = { type = "pd" }
      },
  },
  options = {
      distance = { radius = 1.5 },
      isEnabled = function(pEntity, pContext)
          local coords = GetEntityCoords(PlayerPedId())
          if #(coords - vector3(444.6,-997.42,34.98)) > 5.0 then
            return false
          end
          local model = GetEntityModel(pEntity)
          return model == 538002882
      end
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isATM' },
    data = {
        {
            id = 'use_atm',
            label = "Use ATM",
            icon = "credit-card",
            event = "financial:openUI",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.5 }
    }
}

Entries[#Entries + 1] = {
    type = 'model',
    group = { GetHashKey('trash2') },
    data = {
        {
            id = "sanitation_worker_throwaway_trash",
            label = "throw in trash",
            icon = "trash-restore-alt",
            event = "ev-jobs:sanitationWorker:vehicleTrash",
            parameters = {}
        }
    },
    options = {
        job = { 'sanitation_worker' },
        distance = { radius = 3.8, boneId = 'wheel_lr' },
        isEnabled = function (pEntity, pContext)
            return isCloseToTrunk(pEntity, PlayerPedId(), 1.1, true)
        end
    }
}

Entries[#Entries + 1] = {
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
        job = { 'store_deliveries' }, -- 247_deliveries
        distance = { radius = 2.0, boneId = 'boot' },
        isEnabled = function (pEntity, pContext)
            return isCloseToTrunk(pEntity, PlayerPedId())
        end
    }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isGoProVRChair' },
  data = {
      {
          id = 'sit_on_vr_gopro_chair',
          label = "Enable GoProblem VR",
          icon = "chair",
          event = "ev-gopro:activateVRChair",
          parameters = {}
      }
  },
  options = {
      distance = { radius = 1.5 }
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isWeedPlant' },
    data = {
        {
            id = 'weed',
            label =  "Check",
            icon = "cannabis",
            event = "ev-weed:checkPlant",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 7.0 }
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isLrgWeedPlant' },
    data = {
        {
            id = 'weed2',
            label = "Harvest",
            icon = "hand-paper",
            event = "ev-weed:pickPlant",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 7.0 }
    }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isBeehive' },
  data = {
      {
          id = 'beehive1',
          label = "Check",
          icon = "archive",
          event = "ev-beekeeping:checkBeehive",
          parameters = {}
      }
  },
  options = {
      distance = { radius = 7.0 }
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isBeehive' },
  data = {
      {
          id = 'beehive2',
          label = "Harvest",
          icon = "hand-holding-water",
          event = "ev-beekeeping:harvestHive",
          parameters = {}
      }
  },
  options = {
      distance = { radius = 7.0 }
  }
}

Entries[#Entries + 1] = {
    type = 'model',
    group = { `np_prop_ch_cash_trolly_01c` },
    data = {
        {
            id = 'trolleygrab',
            label = "Grab it!",
            icon = "hand-holding",
            event = "ev-heists:grabFromTrolley",
            parameters = { type = "cash" }
        }
    },
        options = {
        distance = { radius = 1.5 }
  }
}

Entries[#Entries + 1] = {
    type = 'model',
    group = { `V_Club_Roc_MicStd` },
    data = {
        {
            id = 'microcboost',
            label = "Use Microphone",
            icon = "circle",
            event = "ev-audio:useMicrophone",
            parameters = {},
        }
    },
    options = {
        distance = { radius = 1.5 }
    }
}

Entries[#Entries + 1] = {
  type = 'model',
  group = { `np_prop_gold_trolly_01c` },
  data = {
      {
          id = 'trolleygrabgold',
          label = "Grab it!",
          icon = "hand-holding",
          event = "ev-heists:grabFromTrolley",
          parameters = { type = "gold" }
      }
  },
  options = {
      distance = { radius = 1.5 }
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isTrash' },
    data = {
        {
            id = 'search',
            label = "Search Trash",
            icon = "circle",
            event = "ev-dumpster:SearchDumpster",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.7 },
    }
}

local benchCids = {
    [70] = true,
}

Entries[#Entries + 1] = {
    type = 'model',
    group = {
        `prop_bench_01a`,
        `prop_bench_01b`,
        `prop_bench_01c`,
        `prop_bench_02`,
        `prop_bench_03`,
        `prop_bench_04`,
        `prop_bench_05`,
        `prop_bench_06`,
        `prop_bench_07`,
        `prop_bench_08`,
        `prop_bench_09`,
        `prop_bench_10`,
        `prop_bench_11`,
    },
    data = {
        {
            id = 'benchdismantle',
            label = "Dismantle bench!",
            icon = "circle",
            event = "ev-business:bench:dismantle",
            parameters = {},
        }
    },
    options = {
        distance = { radius = 1.5 },
        isEnabled = function()
            local cid = exports["isPed"]:isPed('cid')
            return benchCids[cid]
        end,
    }
}

Entries[#Entries + 1] = {
    type = 'model',
    group = {
        666561306,
        218085040,
        -58485588,
        682791951,
        -206690185,
        364445978,
        143369,
    },
    data = {
        {
            id = 'opendumpster',
            label = "Open Stash",
            icon = "box",
            event = "ev-inventory:openDumpster",
            parameters = {},
        }
    },
    options = {
        distance = { radius = 1.5 },
        isEnabled = function()
            return true
        end,
    }
}

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
