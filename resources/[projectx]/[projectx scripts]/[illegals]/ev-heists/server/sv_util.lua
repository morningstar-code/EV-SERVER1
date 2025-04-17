CONFIG = {}

CONFIG.Bobcat = {
	lastrobbedbobcat = 0, 
    startRob = false,
	minCop = 6,
	cooldown = 1800,
	securityDoor = {276,277},
	createBox = {
		{
			type = "smgs",
			isLooted = false,
			objHash = `ex_prop_crate_ammo_bc`, --Weapon Smg Create
			objCoord = vector3(882.07, -2282.89, 32.44)
		},
		{
			type = "explosives",
			isLooted = false,
			objHash = `ex_prop_crate_expl_sc`, --Explosion Create
			objCoord = vector3(882.58, -2285.71, 30.47)
		},
		{
			type = "rifles",
			isLooted = false,
			objHash = `gr_prop_gr_crates_weapon_mix_01a`, --Rifle Create
			objCoord = vector3(886.47, -2286.88, 30.47)
		},
	},
	securityNpc = {
		{ x = 889.2, y = -2277.64, z = 32.45, h =46.95}, -- Name :  secuped1 
		{ x = 887.28, y = -2275.18, z = 32.45, h =114.97}, -- Name :  secuped2 
		{ x = 894.04, y = -2275.5, z = 32.45, h =95.46}, -- Name :  secuped3 
		{ x = 891.42, y = -2286.67, z = 32.45, h =304.73}, -- Name :  secuped4 
		{ x = 896.1, y = -2284.8, z = 32.45, h =23.59}, -- Name :  secuped5 
		{ x = 893.78, y = -2289.89, z = 32.45, h =353.01}, -- Name :  secuped6 
		{ x = 872.44, y = -2295.16, z = 32.45, h =278.5}, -- Name :  secuped7 
		{ x = 878.77, y = -2295.16, z = 32.45, h =85.02}, -- Name :  secuped8 
		{ x = 877.34, y = -2291.61, z = 32.45, h =257.76}, -- Name :  secuped9 
	},
	hostageNpc = { x = 870.23, y = -2287.63, z = 32.45, h = 176.14}, -- Name :  hostagenpc 
	iplState = {
		["np_prolog_clean"] = true,
		["np_prolog_broken"] = false
	},
}

CONFIG.Register = {
	minCop = 2,
}

CONFIG.Safe = {
	minCop = 3,
}

CONFIG.Jewelry = {
    startRob = false,
	cooldown = 1800, --30min
	lastrobbed = 0,
	minCop = 6,
	jewelryBox = {
		[1] = true,
		[2] = true,
		[3] = true,
		[4] = true,
		[5] = true,
		[6] = true,
		[7] = true,
		[8] = true,
		[9] = true,
		[10] = true,
		[11] = true,
		[12] = true,
		[13] = true,
	}
}

CONFIG.CityPower = {
    blackout = false,
}

CONFIG.Cocaine = {
	dropOff = 100000
}

CONFIG.Fleeca = {
    ["fleeca_pinkcage_inner_door"] = {
		lastrobbed = 0,
		temps = 0,
		canUsePanel = true,
		isRobbed = false,
		minCop = 6,
		vaultname = "fleeca_pinkcage_inner_door",
		panelCoords = vector3(310.92, -284.21, 53.17),
		panelHeading = 250.26,
		cashCoords =  vector3(311.27, -287.58, 53.15),
		cashHeading = 307.98,
		canGrabCash = true,
		goldCoords = vector3(0,0,0),
		goldHeading = 0,
		canGrabGold = true,
		doorId = 512,
	},
	["fleeca_legion_inner_door"] = {
		lastrobbed = 0,
		temps = 0,
		canUsePanel = true,
		isRobbed = false,
		minCop = 6,
		vaultname = "fleeca_legion_inner_door",
		panelCoords = vector3(146.62, -1045.82, 29.37),
		panelHeading = 231.32,
		cashCoords =  vector3(147.01, -1049.28, 29.35),
		cashHeading = 314.38,
		canGrabCash = true,
		goldCoords = vector3(149.17, -1051.05, 29.35),
		goldHeading = 348.75,
		canGrabGold = true,
		doorId = 89,
	},
	["fleeca_lifeinvader_inner_door"] = {
		lastrobbed = 0,
		temps = 0,
		canUsePanel = true,
		isRobbed = false,
		minCop = 6,
		vaultname = "fleeca_lifeinvader_inner_door",  
		panelCoords = vector3(-1211.007, -336.70, 37.78),
		panelHeading = 297.64,
		cashCoords =  vector3(-1208.53, -338.42, 37.76),
		cashHeading = 340.93,
		canGrabCash = true,
		goldCoords = vector3(-1205.9, -338.16, 37.76),
		goldHeading = 68.76,
		canGrabGold = true,
		doorId = 514,
	},
	["fleeca_greatocean_inner_door"] = {
		lastrobbed = 0,
		temps = 0,
		canUsePanel = true,
		isRobbed = false,
		minCop = 6,
		vaultname = "fleeca_greatocean_inner_door",  
		panelCoords = vector3(-2956.603, 481.50, 15.69),
		panelHeading = 355.93,
		cashCoords =  vector3(-2953.98, 482.86, 15.68),
		cashHeading = 41.64,
		canGrabCash = true,
		goldCoords = vector3(-2952.76, 485.25, 15.68),
		goldHeading = 131.84,
		canGrabGold = true,
		doorId = 515,
	},
	["fleeca_harwick_inner_door"] = {
		lastrobbed = 0,
		temps = 0,
		canUsePanel = true,
		isRobbed = false,
		minCop = 6,
		vaultname = "fleeca_harwick_inner_door",  
		panelCoords = vector3(-354.12, -55.17, 49.03),
		panelHeading = 251.42,
		cashCoords =  vector3(-353.49, -58.04, 49.02),
		cashHeading = 291.64,
		canGrabCash = true,
		goldCoords = vector3(-351.83, -59.95,  49.02),
		goldHeading = 19.69,
		canGrabGold = true,
		doorId = 513,
	},
	["fleeca_harmony_inner_door"] = {
		lastrobbed = 0,
		temps = 0,
		canUsePanel = true,
		isRobbed = false,
		minCop = 6,
		vaultname = "fleeca_harmony_inner_door",  
		panelCoords = vector3(1176.31, 2712.87, 38.08),
		panelHeading = 93.45,
		cashCoords =  vector3(1174.78, 2715.3, 38.07),
		cashHeading = 121.61,
		canGrabCash = true,
		goldCoords = vector3(1172.32, 2716.56, 38.07),
		goldHeading = 216.19,
		canGrabGold = true,
		doorId = 516,
	},
}

CONFIG.Paleto = {
	canUsePanel = true,
	panelCoords = vector3(-105.06, 6471.51, 31.62),
	panelHeading = 49.48,
	minCop = 8,
	lastRob = 0,
	chanceGoldSpawn = 0.5,
	canGrabCash = true,
	canGrabGold = true,
	doorId = 517,
}

CONFIG.VaultDoor = { --Fleeca vault Door
    ["fleeca_pinkcage_inner_door"] = {
		open = false,
		minCop = 10,
		coords = vector3(310.93,-284.44,54.16),
		hash = 2121050683,
		headingOpen = 160.91,
		headingClosed = -110.00,
        action = false,
	},
	["fleeca_legion_inner_door"] = {
		open = false,
		coords = vector3(146.61,-1046.02,29.37),
		hash = 2121050683,
		headingOpen = 158.54,
		headingClosed = 250.20,
        action = false,
	},
	["fleeca_lifeinvader_inner_door"] = {
		open = false,
		coords = vector3(-1211.07, -336.68, 37.78),
		hash = 2121050683,
		headingOpen = 213.67,
		headingClosed = 296.76,
        action = false,
	},
	["fleeca_greatocean_inner_door"] = {
		open = false,
		coords = vector3(-2956.68, 481.34, 15.70),
		hash = 2121050683,
		headingOpen = 267.73,
		headingClosed = 353.97,
        action = false,
	},
	["fleeca_harwick_inner_door"] = {
		open = false,
		coords = vector3(-354.15, -55.11, 49.04),
		hash = 2121050683,
		headingOpen = 159.79,
		headingClosed = 251.05,
        action = false,
	},
	["fleeca_harmony_inner_door"] = {
		open = false,
		coords = vector3(1176.40, 2712.75, 38.09),
		hash = 2121050683,
		headingOpen = 359.05,
		headingClosed = 90.83,
        action = false,
	},
	["paleto"] = {
		open = false,
		coords = vector3(-104.6049,6473.44,31.79532),
		hash = -1185205679,
		headingOpen = 150.000,
		headingClosed = 45.00,
        action = false,
	},
	["vault_door"] = { --Pacifict Heist
		open = false,
		coords = vector3(253.92, 224.56, 101.88),
		hash = 961976194,
		headingOpen = 20.00,
		headingClosed = 160.000,
        action = false,
	}
}

CONFIG.VaultUpperDoor = {
	minCop = 10,
	vault_upper_first_door = {46},
	vault_upper_inner_door_1 = {49},
	vault_upper_inner_door_2 = {50},
	bobcat_security_entry = {273,274},
	bobcat_security_inner_1 = {275}
}

CONFIG.LowerVaultHeist = {
	canRob = true,
	minCop = 12,
	lastrobbery = 0,
	canUsePanel = true,
	lasersActive = true,
	cityPowerState = true,
	lowerDoorOpen = false,
	doorState = {
		["np_vault_broken"] = false,
        ["np_vault_clean"] = true,
	},
	upperVaultEntityState = {
		["hei_hw1_02_interior_2_heist_ornate_bank_milo_"] = false,
		["np_int_placement_ch_interior_6_dlc_casino_vault_milo_"] = true
	},
	trolley = {
		vault_lower_cash_1 = {
			canGrabCash = true,
			canGrabGold = true
		},
		vault_lower_cash_2 = {
			canGrabCash = true,
			canGrabGold = true
		},
		vault_lower_cash_3 = {
			canGrabCash = true,
			canGrabGold = true
		},
		vault_lower_cash_4 = {
			canGrabCash = true,
			canGrabGold = true
		},
	}
}

CONFIG.UpperVaultHeist = {
	cooldown = 3200, --1 hour
	canUsePanel = true,
	minCop = 10,
	lastrobbed = 0,
	robberyprogression = false,
	doors = {
		vault_upper_first_door = {
			doorId = 46,
			locked = true,
		},
		vault_upper_inner_door_1 = {
			doorId = 49,
			locked = true,
		},
		vault_upper_inner_door_2 = {
			doorId = 50,
			locked = true,
		},
		first_door = {
			doorId = 48,
			locked = true,
		},
		vault_door = {
			doorId = nil,
			locked = true,
		}
	},
	trolley = {
		vault_upper_cash_1 = {
			canGrabCash = true,
			canGrabGold = true
		},
		vault_upper_cash_2 = {
			canGrabCash = true,
			canGrabGold = true
		},
		vault_upper_cash_3 = {
			canGrabCash = true,
			canGrabGold = true
		}
	}
}

CONFIG.TrolleyConfig = {
	["fleeca_pinkcage_inner_door"] = {
		cashCoords = vector3(311.27, -287.58, 53.15),
		cashHeading = 0,
		goldCoords = vector3(0,0,0),
		goldHeading = 0,
		cashEvent = "heists:fleecaTrolleyGrab",
	},
	["fleeca_legion_inner_door"] = {
		cashCoords = vector3(147.01, -1049.28, 29.35),
		goldCoords = vector3(149.17, -1051.05, 29.35),
		cashEvent = "heists:fleecaTrolleyGrab",
	},
	["fleeca_lifeinvader_inner_door"] = {
		cashCoords = vector3(-1208.53, -338.42, 37.76),
		goldCoords = vector3(-1205.9, -338.16, 37.76),
		cashEvent = "heists:fleecaTrolleyGrab",
	},
	["fleeca_greatocean_inner_door"] = {
		cashCoords = vector3(-2953.98, 482.86, 15.68),
		goldCoords = vector3(-2952.76, 485.25, 15.68),
		cashEvent = "heists:fleecaTrolleyGrab",
	},
	["fleeca_harwick_inner_door"] = {
		cashCoords = vector3(-353.49, -58.04, 49.02),
		goldCoords = vector3(-351.83, -59.95,  49.02),
		cashEvent = "heists:fleecaTrolleyGrab",
	},
	["fleeca_harmony_inner_door"] = {
		cashCoords = vector3(1174.78, 2715.3, 38.07),
		goldCoords = vector3(1172.32, 2716.56, 38.07),
		cashEvent = "heists:fleecaTrolleyGrab",
	},
	["paleto"] = {
		cashCoords = vector3(-102.97, 6477.24, 31.63),
		goldCoords = vector3(-104.95, 6478.69, 31.66),
		cashEvent = "heists:paletoTrolleyGrab",
	},
	["vault_upper_cash_1"] = { -- Upper
		cashCoords = vector3(260.18, 214.32, 101.69),
		cashHeading = 64.5,
		goldCoords = vector3(0,0,0),
		goldHeading = 0,
		cashEvent = "heists:vaultUpperTrolleyGrab",
	},
	["vault_upper_cash_2"] = { -- Upper
		cashCoords = vector3(264.29, 215.88, 101.69),
		cashHeading = 109.1,
		goldCoords = vector3(0,0,0),
		goldHeading = 0,
		cashEvent = "heists:vaultUpperTrolleyGrab",
	},
	["vault_upper_cash_3"] = { -- Upper
		cashCoords = vector3(263.61267089844, 215.49844360352, 101.68371582031),
		cashHeading = 342.93856811523,
		goldCoords = vector3(0,0,0),
		goldHeading = 0,
		cashEvent = "heists:vaultUpperTrolleyGrab",
	},

	["vault_lower_cash_1"] = { -- Lower
		cashCoords = vector3(309.38265991211, 223.83973693848, 97.688110351563),
		cashHeading = 25.628381729126,
		goldCoords = vector3(0,0,0),
		goldHeading = 0,
		cashEvent = "heists:vaultLowerTrolleyGrab",
	},
	["vault_lower_cash_2"] = { -- Lower
		cashCoords = vector3(300.15112304688, 213.33305358887, 97.688102722168),
		cashHeading = 74.92945098877,
		goldCoords = vector3(0,0,0),
		goldHeading = 0,
		cashEvent = "heists:vaultLowerTrolleyGrab",
	},
	["vault_lower_cash_3"] = { -- Lower
		cashCoords = vector3(296.42065429688, 224.80334472656, 97.688079833984),
		cashHeading = 316.88562011719,
		goldCoords = vector3(0,0,0),
		goldHeading = 0,
		cashEvent = "heists:vaultLowerTrolleyGrab",
	},
	["vault_lower_cash_4"] = { -- Lower
		cashCoords = vector3(306.27496337891, 220.62243652344, 97.688079833984),
		cashHeading = 198.34222412109,
		goldCoords = vector3(0,0,0),
		goldHeading = 0,
		cashEvent = "heists:vaultLowerTrolleyGrab",
	}
}

RPC.register("heists:getTrolleySpawnConfig", function(src)
    return CONFIG.TrolleyConfig
end)

RPC.register("heists:getVaultDoorConfig", function(src)
    return CONFIG.VaultDoor
end)

RPC.register("heists:getDoorHeading", function(src, pName)
    return CONFIG.VaultDoor[pName].headingClosed
end)

RPC.register("heists:vault:changeDoorState", function(src, pdoor, pAction)
    CONFIG.VaultDoor[pdoor].action = pAction
end)

RPC.register("ev-heists:payoutTrolleyGrab", function(src, loc, type)
    if loc == "fleeca" then
		exports["ev-lootsystem"]:DrawFromLootTable(src, "event_fleeca_cash", 1)
		exports["ev-lootsystem"]:DrawFromLootTable(src, "event_fleeca_cash", 2)
	elseif loc == "paleto" then
		exports["ev-lootsystem"]:DrawFromLootTable(src, "event_paleto_cash", math.random(1, 3))
	elseif loc == "vault_upper_cash_1" or loc == "vault_upper_cash_2" or loc == "vault_upper_cash_3" then
		exports["ev-lootsystem"]:DrawFromLootTable(src, "event_vault_upper_cash", math.random(1, 3))
	elseif loc == "vault_lower_cash_1" or loc == "vault_lower_cash_2" or loc == "vault_lower_cash_3" or loc == "vault_lower_cash_4" then
		exports["ev-lootsystem"]:DrawFromLootTable(src, "event_vault_lower_cash", math.random(1, 3))
	end
end)
