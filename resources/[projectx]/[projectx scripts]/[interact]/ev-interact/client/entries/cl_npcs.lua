local Entries = {}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isRecycleExchange' },
    data = {
        {
            id = "recycle_exchange",
            label = "Exchange recyclables",
            icon = "circle",
            event = "ev-npcs:ped:exchangeRecycleMaterial",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 2.5 }
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isBankAccountManager' },
    data = {
        {
            id = "bank_paycheck_collect",
            label = "Collect paycheck",
            icon = "circle",
            event = "ev-npcs:ped:paycheckCollect",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 2.5 }
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isBankAccountManager' },
    data = {
        {
            id = "bank_receipt_collect",
            label = "trade in receipts",
            icon = "money-bill-wave",
            event = "ev-npcs:ped:receiptTradeIn",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 2.5 },
        isEnabled = function()
            local isEmployedAtBurgerShot = exports["ev-business"]:IsEmployedAt("burger_shot")
            local isEmployedAtRoosters = exports["ev-business"]:IsEmployedAt("rooster")
            local isEmployedAtMaldinis = exports["ev-business"]:IsEmployedAt("maldinis")
            local isEmployedAtUwu = exports["ev-business"]:IsEmployedAt("snr_buns")
            local isEmployedAtLL = exports["ev-business"]:IsEmployedAt("tavern")
            local isEmployedAtJeweledDragon = exports["ev-business"]:IsEmployedAt("jeweled_dragon")
            local isEmployedAtWuChang = exports["ev-business"]:IsEmployedAt("wuchang")
            local publicTradeIn = exports["ev-config"]:GetMiscConfig("jobs.receipts.public")

            return isEmployedAtWuChang or isEmployedAtJeweledDragon or isEmployedAtLL or isEmployedAtUwu or isEmployedAtMaldinis or isEmployedAtBurgerShot or isEmployedAtRoosters or isMechanic() or publicTradeIn
        end
    }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isBankAccountManager' },
  data = {
      {
          id = "bank_receipt_m_collect",
          label = "Trade in Market Receipts",
          icon = "money-bill-wave",
          event = "ev-npcs:ped:receiptTradeInMarket",
          parameters = {}
      }
  },
  options = {
      distance = { radius = 2.5 },
      isEnabled = function()
          return exports["ev-inventory"]:getQuantity("farmersmarketreceipt", true) > 0
      end
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isBankAccountManager' },
    data = {
        {
            id = "bank_envelope_deposit",
            label = "deposit cash envelope",
            icon = "money-bill-wave",
            event = "ev-restaurants:tradeInCash",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 2.5 },
        isEnabled = function()
            local hasAccess = exports['ev-inventory']:hasEnoughOfItem('envelope', 1, false, true, {
                cashEnvelope = true
            })
            return hasAccess
        end
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isCommonJobProvider' },
    data = {
        {
            id = "common_job_signIn",
            label = "Sign in",
            icon = "circle",
            event = "ev-npcs:ped:signInJob",
            parameters = {}
        },
        {
            id = "common_job_signOut",
            label = "Sign out",
            icon = "circle",
            event = "ev-npcs:ped:signInJob",
            parameters = { "unemployed" }
        }
    },
    options = {
        distance = { radius = 2.5 }
    }
}

Entries[#Entries + 1] = { -- added by mikey
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            event = "ev-chopchop:signIn",
            id = "darkmarket_chop_location_clock_in",
            icon = "circle",
            label = "Looking for a Job?",
            parameters = {},
        }
    },
    options = {
        distance = { radius = 3.0 },
        npcIds = {"chopguy"}
    }
}

Entries[#Entries + 1] = { -- added by mikey
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            event = "BeginDivingjob", 
            id = "diving_clock_in",
            icon = "circle",
            label = "Lets go swimming!", 
            parameters = {},
        }
    },
    options = {
        distance = { radius = 3.0 },
        npcIds = {"divingguy"}
    }
}

-- Entries[#Entries + 1] = {
--     type = 'flag',
--     group = { 'isJobEmployer' },
--     data = {
--         {
--             id = "fishing_borrow_boat",
--             label = "Borrow Fishing Boat",
--             icon = "circle",
--             event = "ev-fishing:rentBoat",
--             parameters = {}
--         }
--     },
--     options = {
--         distance = { radius = 2.5 },
--         isEnabled = function(pEntity, pContext)
--             return pContext.job.id == CurrentJob and not IsDisabled() and not IsPedInAnyVehicle(PlayerPedId()) and (pEntity and pContext.flags['isBoatRenter']) and (currentlyRentedBoat == nil or not DoesEntityExist(currentlyRentedBoat))
--         end
--     }
-- }

-- Entries[#Entries + 1] = {
--     type = 'flag',
--     group = { 'isJobEmployer' },
--     data = {
--         {
--             id = "fishing_return_boat",
--             label = "Return Fishing Boat",
--             icon = "circle",
--             event = "ev-fishing:returnBoat",
--             parameters = {}
--         }
--     },
--     options = {
--         distance = { radius = 2.5 },
--         isEnabled = function(pEntity, pContext)
--             return pContext.job.id == CurrentJob and not IsDisabled() and not IsPedInAnyVehicle(PlayerPedId()) and (pEntity and pContext.flags['isBoatRenter']) and (currentlyRentedBoat ~= nil and DoesEntityExist(currentlyRentedBoat))
--         end
--     }
-- }

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isJobEmployer' },
    data = {
        {
            id = "jobs_employer_checkIn",
            label = "Sign in",
            icon = "circle",
            event = "jobs:checkIn",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 2.5 },
        isEnabled = function()
            return CurrentJob == 'unemployed'
        end
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isJobEmployer' },
    data = {
        {
            id = "jobs_employer_paycheck",
            label = "Get paycheck",
            icon = "circle",
            event = "jobs:getPaycheck",
            parameters = {}
        },
        {
            id = "jobs_employer_checkOut",
            label = "Sign out",
            icon = "circle",
            event = "jobs:checkOut",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 2.5 },
        isEnabled = function(pEntity, pContext)
            return pContext.job.id == CurrentJob
        end
    }
}

-- Entries[#Entries + 1] = {
--     type = 'flag',
--     group = { 'isJobEmployer' },
--     data = {
--         {
--             id = "jobs_employer_paycheck",
--             label = "Tournament Status",
--             icon = "circle",
--             event = "ev-fishing:client:getTournamentStatus",
--             parameters = {}
--         },
--     },
--     options = {
--         distance = { radius = 2.5 },
--         isEnabled = function(pEntity, pContext)
--             return exports["ev-fishing"]:IsNearFisherGuy()
--         end
--     }
-- }

-- Entries[#Entries + 1] = {
--     type = 'flag',
--     group = { 'isJobEmployer' },
--     data = {
--         {
--             id = "fishing_join_tournament",
--             label = "Join Active Tournament",
--             icon = "fish",
--             event = "ev-fishing:client:joinTournament",
--             parameters = {}
--         },
--     },
--     options = {
--         distance = { radius = 2.5 },
--         isEnabled = function(pEntity, pContext)
--             return pContext.job.id == "fishing" and not exports["ev-fishing"]:IsPlayerInTournament() and exports["ev-fishing"]:IsNearFisherGuy()
--         end
--     }
-- }

-- Entries[#Entries + 1] = {
--     type = 'flag',
--     group = { 'isJobEmployer' },
--     data = {
--         {
--             id = "fishing_leave_tournament",
--             label = "Leave Active Tournament",
--             icon = "fish",
--             event = "ev-fishing:client:leaveTournament",
--             parameters = {}
--         },
--     },
--     options = {
--         distance = { radius = 2.5 },
--         isEnabled = function(pEntity, pContext)
--             return pContext.job.id == "fishing" and exports["ev-fishing"]:IsPlayerInTournament() and exports["ev-fishing"]:IsNearFisherGuy()
--         end
--     }
-- }

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isJobEmployer' },
    data = {
        {
            id = "dodologistics_getpackage",
            label = "Get Packaging",
            icon = "circle",
            event = "ev-business:dodoLogisticsDisplayPackaging",
            parameters = {}
        },
    },
    options = {
        distance = { radius = 2.5 },
        isEnabled = function(pEntity, pContext)
            local isEmployedAtDodoLogistics = exports["ev-business"]:IsEmployedAt("dodologistics")
            local hasCraftAccess = exports["ev-business"]:HasPermission("dodologistics", "craft_access")
            local pedCoords = GetEntityCoords(PlayerPedId())
            local guyCoords = vector3(-432.95, -2786.08, 6.01)
            return isEmployedAtDodoLogistics and hasCraftAccess and #(pedCoords - guyCoords) < 3.0
        end
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isShopKeeper' },
    data = {
        {
            id = "shopkeeper",
            label = "Purchase goods",
            icon = "circle",
            event = "ev-npcs:ped:keeper",
            parameters = { "2" }
        }
    },
    options = {
        distance = { radius = 2.5 }
    }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "liqourkeeper",
          label = "Purchase alcohol",
          icon = "circle",
          event = "ev-npcs:ped:keeperLiqour",
          parameters = { "42076" }
      }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"liqourkeeper_1", "liqourkeeper_2", "liqourkeeper_3", "liqourkeeper_4", "liqourkeeper_5", "liqourkeeper_6","liqourkeeper_7", "liqourkeeper_8", "liqourkeeper_9", "liqourkeeper_10", "liqourkeeper_11"}
  }
}

-- local vaultDoorCids = {
--     [70] = true,
--     [3503] = true,
-- }
-- Entries[#Entries + 1] = {
--     type = 'flag',
--     group = { 'isNPC' },
--     data = {
--         {
--             id = "vdpaleto",
--             label = "Open door",
--             icon = "circle",
--             event = "ev-heists:doors:vaultDoor",
--             parameters = { action = "open", door = "paleto" },
--         },
--     },
--     options = {
--         distance = { radius = 2.5 },
--         npcIds = {"vd_closer_paleto"},
--         isEnabled = function()
--             local cid = exports["isPed"]:isPed("cid")
--             return vaultDoorCids[cid]
--         end,
--     }
-- }
-- Entries[#Entries + 1] = {
--     type = 'flag',
--     group = { 'isNPC' },
--     data = {
--         {
--             id = "vdpaletoclose",
--             label = "Close door",
--             icon = "circle",
--             event = "ev-heists:doors:vaultDoor",
--             parameters = { action = "close", door = "paleto" },
--         },
--     },
--     options = {
--         distance = { radius = 2.5 },
--         npcIds = {"vd_closer_paleto"},
--         isEnabled = function()
--             local cid = exports["isPed"]:isPed("cid")
--             return vaultDoorCids[cid] or myJob == "police"
--         end,
--     }
-- }

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "getpaintballgun",
          label = "Pickup Paintball Gun",
          icon = "circle",
          event = "ev-paintball:getPaintballGun",
          parameters = {},
      },
      {
          id = "getpaintballsmoke",
          label = "Pickup Smoke Grenade",
          icon = "circle",
          event = "ev-paintball:getPaintballSmoke",
          parameters = {},
      },
      {
          id = "getpaintballammo",
          label = "Pickup Paintball Ammo",
          icon = "circle",
          event = "ev-paintball:getPaintballAmmo",
          parameters = {},
      },
      {
          id = "getpaintballmegaphone",
          label = "Pickup Megaphone",
          icon = "circle",
          event = "ev-paintball:getMegaphone",
          parameters = {},
      },
      {
          id = "getpaintballcaddy",
          label = "Pickup Caddy",
          icon = "circle",
          event = "ev-paintball:getCaddy",
          parameters = {},
      },
      {
          id = "getpaintballcart",
          label = "Pickup Go Kart",
          icon = "circle",
          event = "ev-paintball:getGoKart",
          parameters = {},
      },
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"paintball_vendor"}
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
    {
        id = "arenawasteland",
        label = "Enable 'Wasteland'",
        icon = "circle",
        event = "ev-paintball:setArenaType",
        parameters = { "wasteland" },
    },
    {
        id = "arenagokarts",
        label = "Enable 'Concrete Jungle'",
        icon = "circle",
        event = "ev-paintball:setArenaType",
        parameters = { "gokarts" },
    },
    {
        id = "arenagokarts2",
        label = "Enable 'Concrete Maze'",
        icon = "circle",
        event = "ev-paintball:setArenaType",
        parameters = { "gokarts2" },
    },
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"paintball_arena_map"}
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "arenagotomain",
            label = "Take me to The Arena!",
            icon = "circle",
            event = "ev-paintball:swapLocations",
            parameters = {},
        },
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"paintball_arena_grass_swapper_1", "paintball_arena_grass_swapper_2"}
    }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
        {
            id = "casinoswapinterior",
            label = "Enable Betting Stations",
            icon = "circle",
            event = "ev-casino:betting:interiorSwap",
            parameters = { "bets" },
        },
        {
            id = "casinoswapinteriorpoker",
            label = "Enable Poker Tables",
            icon = "circle",
            event = "ev-casino:betting:interiorSwap",
            parameters = { "poker" },
        },
        {
            id = "casinoswapinteriorroulette",
            label = "Enable Roulette Tables",
            icon = "circle",
            event = "ev-casino:betting:interiorSwap",
            parameters = { "roulette" },
        },
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"casino_interior_swap"}
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "sionisgetaclass",
            label = "Collect A Class Receipt (5 materials)",
            icon = "circle",
            event = "ev-inventory:sionisReceipt",
            parameters = { "a" },
        },
        {
            id = "sionisgetsclass",
            label = "Collect S Class Receipt (15 materials)",
            icon = "circle",
            event = "ev-inventory:sionisReceipt",
            parameters = { "s" },
        },
        {
            id = "sionistradereceipt",
            label = "Trade in Material Receipt",
            icon = "circle",
            event = "ev-inventory:sionisReceiptTradeIn",
        },
        {
            id = "sioniscollectlogs",
            label = "Collect Logs",
            icon = "circle",
            event = "ev-inventory:sionisCollectTaxes",
        },
        {
            id = "sionisgoldrush",
            label = "Gold Rush",
            icon = "circle",
            event = "ev-inventory:openGoldRush",
        },
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"sionis_material_worker"}
    }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "galleryinteriorcars",
          label = "Enable Auction Stand",
          icon = "circle",
          event = "ev-gallery:interiorSwap",
          parameters = { "cars" },
      },
      {
          id = "galleryinteriorfights",
          label = "Enable Fight Ring",
          icon = "circle",
          event = "ev-gallery:interiorSwap",
          parameters = { "fights" },
      },
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"gallery_interior_swap"}
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "paintballjoineastteam",
          label = "Join East Team",
          icon = "circle",
          event = "ev-paintball:game:interact",
          parameters = { "join", "east" },
      },
      {
          id = "paintballjoinwestteam",
          label = "Join West Team",
          icon = "circle",
          event = "ev-paintball:game:interact",
          parameters = { "join", "west" },
      },
      {
          id = "paintballjoinleaveteam",
          label = "Leave Team",
          icon = "circle",
          event = "ev-paintball:game:interact",
          parameters = { "leave" },
      },
      {
          id = "paintballjoinstartgame",
          label = "Start Game",
          icon = "circle",
          event = "ev-paintball:game:interact",
          parameters = { "start" },
      },
      {
          id = "paintballjoinsendgame",
          label = "End Game",
          icon = "circle",
          event = "ev-paintball:game:interact",
          parameters = { "end" },
      },
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"paintball_signup"}
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
        id = "getminingprobe",
        label = "Get Probe",
        icon = "circle",
        event = "ev-mining:client:collectItem",
        parameters = {
            itemId = "miningprobe"
        }
    },
    {
        id = "getminingpickaxe",
        label = "Get Pickaxe",
        icon = "circle",
        event = "ev-mining:client:collectItem",
        parameters = {
            itemId = "miningpickaxe"
        }
    }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"mining_vendor"}
  }
}

Entries[#Entries + 1] = {
	type = 'flag',
	group = { 'isNPC' },
	data = {
		{
			id = "hoimports_pickup_sticks_deposit_stick",
			label = "Open Storage",
			icon = "box-open",
			CPXEvent = "ev-hoimports:client:OpenDepositInventory",
			parameters = {
				id = "hoimports_pickup_sticks_deposit_stick"
			}
		},
		{
			id = "hoimports_pickup_sticks_confirm_delivery",
			label = "Deliver Sticks",
			icon = "check",
			CPXEvent = "ev-hoimports:client:DepositSticks",
			parameters = {
				id = "hoimports_pickup_sticks_confirm_delivery"
			}
		},
		{
			id = "hoimports_pickup_sticks_claim_tax",
			label = "Claim Profits",
			icon = "horse-head",
			CPXEvent = "ev-hoimports:client:ClaimTax",
			parameters = {
				id = "hoimports_pickup_sticks_claim_tax"
			}
		},
	},
	options = {
		distance = { radius = 2.5 },
		npcIds = {"hoimport_vendor"},
		isEnabled = function()
			local isEmployedAtHOImports = exports["ev-business"]:IsEmployedAt("hno_imports")
			local hasCraftAccess = exports["ev-business"]:HasPermission("hno_imports", "craft_access")
			return isEmployedAtHOImports and hasCraftAccess
		end,
	}
}

Entries[#Entries + 1] = {
	type = 'flag',
	group = { 'isNPC' },
	data = {
		{
			id = "hoimports_pickup_sticks_pickup_goods",
			label = "Pickup Goods",
			icon = "hand-spock",
			CPXEvent = "ev-hoimports:client:PickupOrder",
			parameters = {
				id = "hoimports_pickup_sticks_pickup_goods"
			}
		},
	},
	options = {
		distance = { radius = 2.5 },
		npcIds = {"hoimport_vendor"},
		isEnabled = function()
			return true
		end,
	}
}

Entries[#Entries + 1] = {
	type = 'flag',
	group = { 'isNPC' },
	data = {
		{
			id = "hoimports_start_drifting",
			label = "Grab Entrance Ticket",
			icon = "hand-spock",
			event = "StartDriftPad",
			parameters = {
				id = "hoimports_start_drifting"
			}
		},
	},
	options = {
		distance = { radius = 2.5 },
		npcIds = {"hoimport_drift_vendor"},
		isEnabled = function()
			return true
		end,
	}
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "golfclubseller",
          label = "Browse Goods",
          icon = "circle",
          event = "ev-inventory:openGolfStore",
          parameters = {},
      },
      {
          id = "golfclubcaddyseller",
          label = "Get Caddy",
          icon = "circle",
          event = "ev-golf:spawnCaddy",
          parameters = {},
      },
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"golfclubseller"}
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "casinovendorman",
            label = "Purchase tools",
            icon = "circle",
            event = "ev-casino:openMegaMallStore",
            parameters = {},
        },
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"casinovendor_1"}
    }
}



Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "licensekeeper_bank",
          label = "Purchase Drivers License ($500.00) (Bank)",
          icon = "id-card-alt",
          event = "ev-npcs:ped:licenseKeeper",
          parameters = { type = "bank" },
      },
      {
        id = "licensekeeper_cash",
        label = "Purchase Drivers License ($1000.00) (Cash)", 
        icon = "id-card-alt",
        event = "ev-npcs:ped:licenseKeeper",
        parameters = { type = "cash" },
    }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"npc_license_keeper_1", "npc_license_keeper_2"}
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "vendorlicensekeeper",
          label = "Get Vendor License",
          icon = "id-card-alt",
          event = "ev-gov:townhall:LicenseVendor",
      }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"npc_license_keeper_1"},
      isEnabled = function()
        return myJob == "judge" or myJob == "mayor" or myJob == "deputy_mayor" or myJob == "county_clerk"
      end,
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "vendorlicensekeeper2",
            label = "Get Market License",
            icon = "id-card-alt",
            event = "ev-farmersmarket:generateVendorLicense",
        }
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"npc_license_keeper_1"},
        isEnabled = function()
          return myJob == "judge" or myJob == "mayor" or myJob == "deputy_mayor" or myJob == "county_clerk"
        end,
    }
  }

--[[ Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "craftitemvendor",
          label = "Get Vendor Licence",
          icon = "hand-holding",
          event = "ev-farmersmarket:generateVendorLicense",
      }  
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"farmersmarketcraftlocations"}
  }
} ]]

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "fmregisterbanner",
          label = "Register Farmers Market Banner",
          icon = "image",
          event = "ev-farmersmarket:registerBanner",
      }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"farmersmarketcraftlocations"}  
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "factoryshopopen",
            label = "Shop",
            icon = "shopping-cart",
            event = "ev-shops:openFactoryShop",
        }
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"factory_craft_shop"}
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "factoryshopbp",
            label = "Create Blueprint",
            icon = "newspaper",
            event = "ev-shops:createBlueprint",
        },
        {
            id = "factoryshopuseitem",
            label = "Create Useable",
            icon = "spray-can",
            event = "ev-shops:createUseable",
        },
        {
            id = "factoryshoprandomitem",
            label = "Create Randomizer",
            icon = "spray-can",
            event = "ev-shops:createRandom",
        },
        {
            id = "factoryshoploto",
            label = 'Create Lotto Ticket',
            icon = "spray-can",
            event = "ev-shops:createLotto",
        },
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"factory_craft_worker"},
        isEnabled = function()
            return exports['ev-business']:IsEmployedAt('the_factory')
        end,
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "",
            label = "Shop",
            icon = "shopping-cart",
            event = "ev-shops:openParsonsShop",
        }
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"parsons_food_vendor"} 
    }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "dwfindloststuff",
          label = "Find Lost Stuff",
          icon = "search",
          event = "ev-deanworld:findLostStuff",
      }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"dw_drop_1"}
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "dwbuyshitfood",
          label = "Purchase Food",
          icon = "hamburger",
          event = "ev-deanworld:buyShitFood",
      }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"dw_food_1"}
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "dwbuybumperupgrades",
          label = "Purchase Upgrades",
          icon = "circle",
          event = "ev-deanworld:purchaseRLUpgrades",
      }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"dw_bumper_1"}
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "dwdropoffstuff",
          label = "Drop Off",
          icon = "handshake",
          event = "ev-deanworld:dropOffCases",
      }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"dw_drop_1"}
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "dwadminentrance",
          label = "Buy Entrance Ticket",
          icon = "times-circle",
          event = "ev-deanworld:buyAdministrationTicket",
      }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"dw_admin_1"}
  }
}

--[[ Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "fmregisteritem",
          label = "Register Farmers Market Item",
          icon = "hamburger",
          event = "ev-farmersmarket:registerItem",
      }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"farmersmarketcraftlocations"}
  }
} ]]

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "pcagrader",
          label = "Grade Items",
          icon = "circle",
          event = "ev-business:pcaGradeItems",
      }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"dw_pca_grader_1"}
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "airxvendor",
          label = "Collect Parachute",
          icon = "parachute-box",
          event = "ev-business:collectAirXParachute",
      }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"airx_1"}
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
        id = "laptopvendor1",
        label = "Purchase Equipment",
        icon = "laptop-code",
        event = "ev-heists:laptopPurchase",
      },
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"laptop_1"},
      isEnabled = function()
        return myJob ~= "police"
      end,
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
        id = "laptopvendor3",
        label = "Check Reputation",
        icon = "circle-info",
        parameters = "hackexp",
        event = "ev-progression:checkRep",
      }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"laptop_1"},
      isEnabled = function()
        return myJob ~= "police"
      end,
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "laptopvendor2",
          label = "Check Availability",
          icon = "clock",
          event = "ev-heists:banks:bankCheck",
      }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"laptop_1"},
      isEnabled = function()
        return myJob ~= "police"
      end,
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isWeaponShopKeeper' },
    data = {
        {
            id = "weaponshop_keeper",
            label = "Purchase weapons",
            icon = "circle",
            event = "ev-npcs:ped:keeper",
            parameters = { "5" }
        }
    },
    options = {
        distance = { radius = 2.5 }
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isToolShopKeeper' },
    data = {
        {
            id = "toolshop_keeper",
            label = "Purchase tools",
            icon = "circle",
            event = "ev-npcs:ped:keeper",
            parameters = { "4" }
        }
    },
    options = {
        distance = { radius = 2.5 }
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isSportShopKeeper' },
    data = {
        {
            id = "sportshop_keeper",
            label = "Purchase gear",
            icon = "circle",
            event = "ev-npcs:ped:keeper",
            parameters = { "34" }
        }
    },
    options = {
        distance = { radius = 2.5 }
    }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isWeedShopKeeper' },
  data = {
      {
          id = "weedshop_keeper",
          label = "Purchase Weed",
          icon = "cannabis",
          event = "ev-npcs:ped:weedSales",
          parameters = {}
      }
  },
  options = {
      distance = { radius = 2.5 }
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isJobVehShopKeeper' },
  data = {
      {
          id = "jobveh_keeper",
          label = "Purchase Job Vehicle",
          icon = "car",
          event = "ev-showrooms:buyJobVehicles",
          parameters = {}
      }
  },
  options = {
      distance = { radius = 2.5 }
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isWineryShopKeeper' },
    data = {
        {
            id = "winery_keeper_harvest",
            label = "Start Harvesting",
            icon = "shopping-basket",
            event = "ev-vineyard:npcManager",
            parameters = { id = "start_harvest" },
        },
        {
            id = "winery_keeper_atv",
            label = "Rent ATV",
            icon = "motorcycle",
            event = "ev-vineyard:npcManager",
            parameters = { id = "rent_atv" },
        },
    },
    options = {
        distance = { radius = 2.5 },
        isEnabled = function()
            local coords = GetEntityCoords(PlayerPedId())
            return #(vector3(-1928.02, 2060.22, 139.85) - coords) < 5.0
        end
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isWineryShopKeeper' },
    data = {
        {
            id = "winery_keeper_store",
            label = "Buy Equipment",
            icon = "hand-holding-usd",
            event = "ev-vineyard:npcManager",
            parameters = { id = "buy_equipment" },
        },
    },
    options = {
        distance = { radius = 2.5 }
    },
}

-- Entries[#Entries + 1] = {
--   type = 'flag',
--   group = { 'isWineryShopKeeper' },
--   data = {
--       {
--           id = "winery_keeper_goods",
--           label = "Purchase Goods",
--           icon = "wine-glass-alt",
--           event = "ev-business:buyWineryGoods",
--           parameters = {}
--       }
--   },
--   options = {
--       distance = { radius = 2.5 }
--   }
-- }

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isCasinoChipSeller' },
    data = {
      {
          id = "casino_purchase_chips",
          label = "Purchase Chips",
          icon = "circle",
          event = "ev-casino:purchaseChipsAction",
          parameters = { "purchase" }
      },
      {
          id = "casino_withdraw_cash",
          label = "Cashout (Cash)",
          icon = "wallet",
          event = "ev-casino:purchaseChipsAction",
          parameters = { "withdraw:cash" }
      },
      {
          id = "casino_withdraw_bank",
          label = "Cashout (Bank)",
          icon = "university",
          event = "ev-casino:purchaseChipsAction",
          parameters = { "withdraw:bank" }
      },
      {
          id = "casino_transfer_chips",
          label = "Transfer Chips",
          icon = "circle",
          event = "ev-casino:purchaseChipsAction",
          parameters = { "transfer" }
      },
    },
    options = {
        npcIds = { "casino_chip_seller", "casino_chip_seller_rr" },
        distance = { radius = 2.5 }
    }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
    {
        id = "casino_wheel_spin_npc_toggle",
        label = "Toggle Wheel Enabled",
        icon = "circle",
        event = "ev-casino:wheel:toggleEnable",
    },
    {
        id = "casino_wheel_spin_npc_spin",
        label = "Spin Wheel! ($500)",
        icon = "dollar-sign",
        event = "ev-casino:wheel:spinWheel",
    },
    {
        id = "casino_wheel_spin_npc_turbo",
        label = "Turbo Spin! ($5,000)",
        icon = "dollar-sign",
        event = "ev-casino:wheel:spinWheelTurbo",
    },
    {
        id = "casino_wheel_spin_npc_omega",
        label = "Omega Spin! ($20,000)",
        icon = "dollar-sign",
        event = "ev-casino:wheel:spinWheelOmega",
    },
    {
        id = "casino_wheel_spin_npc_insane",
        label = "Insane Spin! ($100,000)",
        icon = "dollar-sign",
        event = "ev-casino:wheel:spinWheelInsane",
    },
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"casino_wheel_spin_npc"}
  }
}

local wheelCid = 0
Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "casino_wheel_spin_npc_check",
            label = "Check Spent Amount",
            icon = "dollar-sign",
            event = "ev-casino:wheel:checkSpentAmount",
        },
        {
            id = "casino_wheel_spin_pickup_cash",
            label = "Pickup Wheel Cash",
            icon = "dollar-sign",
            event = "ev-casino:wheel:pickupWheelCash",
        },
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"casino_wheel_spin_npc"},
        isEnabled = function()
            if wheelCid == 0 then
                wheelCid = exports["ev-config"]:GetMiscConfig("casino.wheel.cash.pickup.cid")
            end
            return wheelCid == exports["isPed"]:isPed("cid")
        end,
    }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
    {
        id = "cgchaincraft",
        label = "Craft Chainz",
        icon = "circle",
        event = "ev-clothing:openCGChainCrafting",
    },
    {
        id = "cgchaininfuse",
        label = "Infuse Chain",
        icon = "gem",
        event = "ev-clothing:infuseChainWithGems",
    },
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"cgjvendor"}
  }
}


-- Entries[#Entries + 1] = {
--   type = 'flag',
--   group = { 'isCasinoChipSeller' },
--   data = {
--       {
--           id = "casino_purchase_chips_bands",
--           label = "Purchase Chips (Dirty)",
--           icon = "circle",
--           event = "ev-casino:purchaseChipsAction",
--           parameters = { "purchase:dirty" }
--       },
--   },
--   options = {
--       distance = { radius = 2.5 },
--       isEnabled = function()
--           return myJob == 'unemployed'
--             and (exports['ev-inventory']:hasEnoughOfItem("markedbills", 20, false, true)
--             or exports['ev-inventory']:hasEnoughOfItem("rollcash", 5, false, true)
--             or exports['ev-inventory']:hasEnoughOfItem("band", 5, false, true))
--       end
--   }
-- }

-- Entries[#Entries + 1] = {
--   type = 'flag',
--   group = { 'isCasinoMembershipGiver' },
--   data = {
--     {
--         id = "casino_membership_giver",
--         label = "Get Membership",
--         icon = "circle",
--         event = "ev-casino:purchaseMembership",
--         parameters = {}
--     },
--   },
--   options = {
--       distance = { radius = 2.5 }
--   }
-- }

-- Entries[#Entries + 1] = {
--   type = 'flag',
--   group = { 'isCasinoMembershipGiver' },
--   data = {
--     {
--         id = "casino_vip_membership_giver",
--         label = "Get VIP Membership",
--         icon = "circle",
--         event = "ev-casino:purchaseVipMembership",
--         parameters = {}
--     },
--   },
--   options = {
--       distance = { radius = 2.5 }
--   }
-- }

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isCasinoMembershipGiver' },
  data = {
    {
        id = "casino_membership_giver",
        label = "Purchase Membership ($250)",
        icon = "circle",
        event = "ev-casino:purchaseMembershipCard",
        parameters = {}
    },
    {
        id = "casino_membership_giver_emp",
        label =  "Get Membership Card",
        icon = "circle",
        event = "ev-casino:purchaseMembership",
        parameters = {}
    },
    {
        id = "casino_membership_loyalty",
        label = "Get Loyalty Card",
        icon = "circle",
        event = "ev-casino:getLoyaltyCard",
        parameters = {}
    },
    {
        id = "casino_membership_hotel_vip",
        label = "Get Hotel VIP Card",
        icon = "circle",
        event = "ev-casino:getHotelVIPCard",
        parameters = {}
    },
  },
  options = {
      distance = { radius = 2.5 }
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isCasinoDrinkGiver' },
  data = {
    {
        id = "casino_drink_giver",
        label = "Purchase Drinks",
        icon = "circle",
        event = "ev-casino:purchaseDrinks",
        parameters = {}
    },
  },
  options = {
      distance = { radius = 2.5 }
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isPawnBuyer' },
    data = {
        {
            id = "pawn_give_items",
            label = "Give stolen items",
            icon = "circle",
            event = "ev-npcs:ped:giveStolenItems",
            parameters = {}
        },
        {
            id = "pawn_sell_items",
            label = "Sell given items",
            icon = "circle",
            event = "ev-npcs:ped:sellStolenItems",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 2.5 }
    }
}

-- Pawnhub Buyer
Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "pawnhub_give_items",
            label = "Hand Goods...",
            icon = "circle",
            event = "ev-business:client:pawnhub:giveStolenItems",
            parameters = {}
        },
        {
            id = "pawnhub_sell_items",
            label = "Sell given goods...",
            icon = "circle",
            event = "ev-business:client:pawnhub:sellStolenItems",
            parameters = {}
        },
        {
            id = "pawnhub_start_run",
            label = "Start a run...",
            icon = "circle",
            event = "ev-business:client:pawnhub:startRun",
            parameters = {}
        },
        {
            id = "pawnhub_get_balance",
            label = "Get current balance...",
            icon = "circle",
            event = "ev-business:client:pawnhub:getBalance",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"pawnhub_buyer"}
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isScrapStart' },
    data = {
        {
            id = "start_scrap",
            label = "Sign In/Out",
            icon = "fas fa-circle",
            event = "ev-chopshop:clock-in",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 5.5 }
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "vehicleshopkeeper",
            label = "Purchase vehicle",
            icon = "circle",
            event = "ev-npcs:ped:vehiclekeeper",
        }
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"npc_bike_shop", "npc_boat_shop", "npc_air_shop"}
    }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "vehiclerentalkeeper",
          label = "Rent vehicle",
          icon = "circle",
          event = "ev-npcs:ped:vehiclekeeperrent",
      }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"npc_air_shop"}
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "vehicleshoprenter",
            label = "Rent vehicle",
            icon = "circle",
            event = "ev-npcs:ped:vehiclekeeper",
        }
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"npc_veh_rental"}
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "vehicleshoprenter2",
            label = "Rent vehicle",
            icon = "circle",
            event = "ev-npcs:ped:vehiclekeeper",
        }
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"npc_veh_rental2"}
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "fish_market",
            label = "Sell fish",
            icon = "dollar-sign",
            event = "ev-npcs:ped:sellFish",
        },
        --[[ {
            id = "fish_market_buy_net",
            label = "Purchase Gill Net ($300)",
            icon = "fish",
            event = "ev-fishing:client:purchaseNet",
        }, ]]
        --[[ {
            id = "fish_market_buy_bucket",
            label = "Purchase Fishing Bucket ($300)",
            icon = "fish",
            event = "ev-fishing:client:purchaseBucket", 
        } ]]
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"fish_market"}
    }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "hunting_market",
          label = "Sell Pelts",
          icon = "dollar-sign",
          event = "ev-hunting:makeSales",
      }
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"hunting_market"}
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "digital_den_npc",
            label = "Open Shop",
            icon = "circle",
            event = "ev-npcs:ped:openDigitalDenShop",
        }
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"digital_den_npc"}
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "cocaine_start",
            label = "Pay me $100,000 :)",
            icon = "circle",
            event = "heists:cocaine_payment",
        }, 
        {
            id = "cocaine_body",
            label = "Secret Sauce",
            icon = "circle",
            event = "ev-weapons:talkToDealer",
        }
        
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"cocaine_start"}
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isMethDude' },
    data = {
        {
            id = "purchasemethkey",
            label = "Purchase Information",
            icon = "key",
            event = "ev-meth:purchaseMethInformation",
            parameters = {}
        },
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"purchasemethkey"}
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isMethDude' },
    data = {
        {
            id = "purchasemethkey2",
            label = "Check Reputation",
            icon = "circle-info",
            parameters = "craftingrep",
            event = "ev-progression:checkRep",
        },
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"purchasemethkey"}
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "bennysnpc",
            label = "Check Reputation",
            icon = "circle-info",
            parameters = "streetrep",
            event = "ev-progression:checkRep",
        },
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"bennysnpc"}
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isMethDude' },
    data = {
        {
            id = "meth-pickup-items",
            label = "Pickup items",
            icon = "key",
            event = "ev-meth:pickupItems",
            parameters = {}
        },
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"purchasemethkey"},
        isEnabled = function ()
            return exports["ev-meth"]:hasUnpickedItems()
        end
    }
}

local validPracCids = {
  [70] = true, -- Rhodinium
}
Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isMethDude' },
  data = {
      {
          id = "purchasepraclaptop",
          label = "Purchase Practice Laptop",
          icon = "laptop",
          event = "ev-heists:purchasePracticeLaptop",
          parameters = {}
      },
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"purchasemethkey"},
      isEnabled = function()
        local cid = exports["isPed"]:isPed("cid")
        local pracWhitelist = exports['ev-config']:GetMiscConfig("heists.prac.whitelist")
        return (pracWhitelist and validPracCids[cid]) or not pracWhitelist
      end,
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "sellgallerygem",
          label = "Sell Gems",
          icon = "gem",
          event = "ev-gallery:sellGems",
          parameters = {}
      },
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"gemshop_1"}
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "nikezrollercoasterspawnride",
          label = "Summon roller coaster",
          icon = "child",
          event = "nikez-rollercoaster:canSpawnCoaster",
          parameters = {}
      },
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"nikez_rollercoaster_worker"}
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "nikezfreefalltowerspawnride",
          label = "Summon ride",
          icon = "space-shuttle",
          event = "nikez-freefalltower:canSpawnRide",
          parameters = {}
      },
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"nikez_freefalltower_worker"}
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "pubtownhallbuylicense",
            label = "purchase licenses",
            icon = "id-card-alt",
            event = "ev-gov:purchaseLicenses",
            parameters = {}
        },
    },
    options = {
        distance = { radius = 3.5 },
        npcIds = {"npc_pub_townhall"}
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "pubbusinessbuylicense",
            label = "purchase business license",
            icon = "business-time",
            event = "ev-gov:purchaseBusiness",
            parameters = {}
        },
    },
    options = {
        distance = { radius = 3.5 },
        npcIds = {"npc_pub_business"}
    }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "fruitstandvendor",
          label = "Buy fruits & veggies",
          icon = "lemon",
          event = "ev-distillery:fruitShop",
          parameters = {}
      },
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"fruitstand_vendor_1", "fruitstand_vendor_2", "fruitstand_vendor_3", "fruitstand_vendor_4", "fruitstand_vendor_5", "fruitstand_vendor_6", "fruitstand_vendor_7", "fruitstand_vendor_8", "fruitstand_vendor_9", "fruitstand_vendor_10", "fruitstand_vendor_11"}
  }
}

Entries[#Entries + 1] = {
  type = 'flag',
  group = { 'isNPC' },
  data = {
      {
          id = "vehicledepo",
          label = "Vehicle Depo",
          icon = "car",
          event = "ev-vehicles:VehicleDepo",
          parameters = {}
      },
  },
  options = {
      distance = { radius = 2.5 },
      npcIds = {"vehicle_depo"}
  }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "xcoinvendor",
            label = "Stacks on Stacks",
            icon = "circle",
            event = "ev-phone:getXCoin",
            parameters = {}
        },
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"xcoinredeem_1"}
    }
}

--impound
Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "car_impound",
            label = "View personal impounded vehicles",
            icon = "car",
            event = "ev-jobs:impound",
            parameters = ""
        }
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"car_impound"}
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "purchase_gang_spray",
            label = "Purchase Gang Spray",
            icon = "spray-can",
            PCPXEvent = "ev-gangsystem:purchaseGangSpray",
            parameters = {}
        },
        {
            id = "purchase_normal_spray",
            label = "Purchase Normal Sprays ($5k)",
            icon = "spray-can",
            event = "ev-graffiti:openSprayMenu",
            parameters = {}
        },
        {
            id = "pruchase_scrubbing_cloth",
            label = "Purchase Scrubbing Cloth ($50k)",
            icon = "broom",
            PCPXEvent = "ev-gangsystem:purchaseScrubbingCloth",
            parameters = {}
        },
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"gangspray_1"}
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "hno_collect_rental",
            label = "Collect Rental Vehicle",
            icon = "car",
            CPXEvent = "ev-hoimports:collectRental",
            parameters = {}
        },
        {
            id = "hno_return_rental",
            label = "Return Rental Vehicle",
            icon = "car",
            event = "ev-hoimports:returnRental",
            parameters = {}
        },
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"hno_rental_1"}
    }
}

function getHotelWorkerConfig(npcId, businessId, includeDiscount) 
  local hotelWorkerData = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "hotel_list_tenants_" .. businessId,
            label = "List tenants",
            icon = "laptop-house",
            event = "ev-business:hotel:listTenantsPrompt",
            parameters = {
              biz = businessId
            }
        },
        {
            id = "hotel_add_tenant_" .. businessId,
            label = "Add tenant",
            icon = "house-user",
            event = "ev-business:hotel:addTenantPrompt",
            parameters = {
              biz = businessId
            }
        },
        {
            id = "hotel_remove_tenant_" .. businessId,
            label = "Remove tenant",
            icon = "house-damage",
            event = "ev-business:hotel:removeTenantPrompt",
            parameters = {
              biz = businessId
            }
        },
        {
            id = "hotel_clear_tenants_" .. businessId,
            label = "Clear tenants",
            icon = "home",
            event = "ev-business:hotel:clearTenantsPrompt",
            parameters = {
              biz = businessId
            }
        }
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = { npcId }
    }
  }
  if includeDiscount then
    hotelWorkerData["data"][#hotelWorkerData["data"] + 1] = {
        id = "hotel_discount_card" .. businessId,
        label = "Get discount card",
        icon = "circle",
        event = "ev-casino:hotel:getDiscountCard",
        parameters = {
          biz = businessId
        }
    }
    hotelWorkerData["data"][#hotelWorkerData["data"] + 1] = {
        id = "hotel_soap" .. businessId,
        label = "Get Lucky Soap",
        icon = "circle",
        event = "ev-casino:getSoap",
        parameters = {
          biz = businessId
        }
    }
    hotelWorkerData["data"][#hotelWorkerData["data"] + 1] = {
        id = "casino_bag" .. businessId,
        label = "Get Casino Bag",
        icon = "circle",
        event = "ev-casino:getCasinoBag",
        parameters = {
          biz = businessId
        }
    }
    hotelWorkerData["data"][#hotelWorkerData["data"] + 1] = {
        id = "casino_coin_" .. businessId,
        label = "Diamond Hotel Krugerrand",
        icon = "coins",
        event = "ev-casino:getCasinoCoin",
        parameters = {
          biz = businessId
        }
    }
  end
  return hotelWorkerData
end

Entries[#Entries + 1] = getHotelWorkerConfig("rr_hotel_worker", "rr_hotel")
Entries[#Entries + 1] = getHotelWorkerConfig("casino_hotel_worker", "casino_hotel", true)
Entries[#Entries + 1] = getHotelWorkerConfig("rtreat_hotel_worker", "roosterretreat")

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "icu_list_patients",
            label = "List Patients",
            icon = "laptop-house",
            event = "ev-healthcare:icu:listPatientsPrompt",
            parameters = {}
        },
        {
            id = "icu_add_patient",
            label = "Add Patient",
            icon = "house-user",
            event = "ev-healthcare:icu:addPatientPrompt",
            parameters = {}
        },
        {
            id = "icu_remove_patient",
            label = "Remove Patient",
            icon = "house-damage",
            event = "ev-healthcare:icu:removePatientPrompt",
            parameters = {}
        },
        {
            id = "icu_clear_patients",
            label = "Clear Patients",
            icon = "home",
            event = "ev-healthcare:icu:clearPatientsPrompt",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = { "pillbox_icu_worker" }
    }
}

local validAnimalModels = {
  [`a_c_chop`] = true,
  [`a_c_husky`] = true,
  [`a_c_husky_np`] = true,
  [`a_c_panther`] = true,
  [`a_c_cat_01`] = true,
  [`a_c_poodle`] = true,
  [`a_c_pug`] = true,
  [`a_c_retriever`] = true,
  [`a_c_retriever_np`] = true,
  [`a_c_shepherd`] = true,
  [`a_c_shepherd_np`] = true,
  [`a_c_pit_np`] = true,
  [`a_c_coyote`] = true,
  [`a_c_rottweiler`] = true,
  [`a_c_westy`] = true,
}
Entries[#Entries + 1] = {
  type = 'entity',
  group = { 1 },
  data = {
      {
          id = "petthebaby",
          label = "Pet",
          icon = "circle",
          event = "ev-interact:doPettingAnimal",
          parameters = "petting",
      },
  },
  options = {
      distance = { radius = 2.5 },
      isEnabled = function(pEntity, pContext)
        -- -- Don't show options if this entity is dead 
        if pContext.isDead then
            return
        end

        return validAnimalModels[pContext.model]
      end,
  }
}
local lastStressTime = 0
AddEventHandler("ev-interact:doPettingAnimal", function()
  ClearPedTasksImmediately(PlayerPedId())
  TriggerEvent("animation:runtextanim", "petting")
  if lastStressTime == 0 or lastStressTime + (60000 * 15) < GetGameTimer() then
    lastStressTime = GetGameTimer()
    TriggerEvent("client:newStress", false, 250)
  end
end)

Entries[#Entries + 1] = {
  type = 'entity',
  group = { 1 },
  data = {
      {
          id = "bobcatblowc4",
          label = "Blow the Door!",
          icon = "circle",
          event = "ev-heists:interactBobcatC4Npc",
          parameters = {},
      },
  },
  options = {
      distance = { radius = 2.5 },
      isEnabled = function(pEntity)
        return DecorGetBool(pEntity, "BobcatC4Ped")
      end,
  }
}

Entries[#Entries + 1] = {
    type = 'entity',
    group = { 1 },
    data = {
        {
            id = "bettalifenpc",
            label = "Get Items",
            icon = "circle",
            event = "ev-business:interactBettaLifeNpc",
            parameters = {},
        },
    },
    options = {
        distance = { radius = 2.5 },
        npcIds = {"betta_life_craft"},
    }
}

Entries[#Entries + 1] = {
    type = 'flag',
    group = { 'isNPC' },
    data = {
        {
            id = "comicstore-recycle-give",
            label = "Give toys and cards to recycle",
            icon = "box",
            event = "ev-business:ped:comicRecycleGive",
            parameters = {}
        },
        {
            id = "comicstore-recycle-recycle",
            label = "Recycle given items",
            icon = "recycle",
            event = "ev-business:ped:comicRecycle",
            parameters = {}
        }
    },
    options = {
        distance = { radius = 1.5 },
        npcIds = { "guild-toycrush" }
    }
}

function isCompanionOrPlayerAnimal(pEntity)
  local animalHash = GetEntityModel(pEntity)
  return (DecorGetInt(pEntity, "COMPANION_ID") ~= 0 or IsPedAPlayer(pEntity)) and (
    animalHash == `a_c_cow` or
    animalHash == `a_c_boar` or
    animalHash == `a_c_horse` or
    animalHash == `a_c_deer` or
    animalHash == `BrnBear` or
    (GetEntityModel(PlayerPedId()) == `ratboy` and animalHash == `a_c_mtlion`)
  )
end

Entries[#Entries + 1] = {
  type = 'entity',
  group = { 1 },
  data = {
      {
        id = "companion_mount",
        label = "Mount",
        icon = "circle",
        event = "ev-companions:client:mountCompanion",
        parameters = {},
      },
  },
  options = {
      distance = { radius = 2.5 },
      isEnabled = function(pEntity)
        if IsEntityAttachedToEntity(PlayerPedId(), pEntity) then
          return false
        end
        local nearbyPlayers = GetActivePlayers()
        for k, v in pairs(nearbyPlayers) do
          local playerPed = GetPlayerPed(v)
          if IsEntityAttachedToEntity(playerPed, pEntity) then
            return false
          end
        end
        return isCompanionOrPlayerAnimal(pEntity)
      end,
  }
}

Entries[#Entries + 1] = {
  type = 'entity',
  group = { 1 },
  data = {
      {
          id = "companion_unmount",
          label = "Unmount",
          icon = "circle",
          event = "ev-companions:client:unmountCompanion",
          parameters = {},
      },
  },
  options = {
      distance = { radius = 2.5 },
      isEnabled = function(pEntity)
        return isCompanionOrPlayerAnimal(pEntity) and IsEntityAttachedToEntity(PlayerPedId(), pEntity)
      end,
  }
}

function isMechanic()
    local mechanic = false
    local mechanicShops = { "harmony_repairs", "ottos_auto", "hayes_autos", "tuner", "iron_hog" }

    for _, shop in ipairs(mechanicShops) do
        if exports["ev-business"]:IsEmployedAt(shop) then
            mechanic = true
            break
        end
    end

    return mechanic
end


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
