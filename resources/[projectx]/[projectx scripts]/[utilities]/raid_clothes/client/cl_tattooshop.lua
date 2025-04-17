tattoosShops = {
	-- {1322.645, -1651.976, 52.275},
	-- {-1153.676, -1425.68, 4.954},
	{322.139, 180.467, 103.587},
	-- {-3170.071, 1075.059, 20.829},
}

Citizen.CreateThread(function()

	-- exports["ev-polyzone"]:AddBoxZone("tattoo_shop", vector3(1323.0, -1652.8, 52.28), 4.2, 6.8, {
	-- 	heading=40,
	-- 	minZ=51.95,
	-- 	maxZ=53.95
	-- })
	
	-- exports["ev-polyzone"]:AddBoxZone("tattoo_shop", vector3(-1154.29, -1426.76, 4.95), 4.8, 7.2, {
	-- 	heading=32,
	-- 	minZ=3.95,
	-- 	maxZ=7.95
	-- })
	
	-- exports["ev-polyzone"]:AddBoxZone("tattoo_shop", vector3(-3170.18, 1076.27, 20.83), 7.0, 4.8, {
	-- 	heading=335,
	-- 	minZ=19.83,
	-- 	maxZ=24.03
	-- })
	
	exports["ev-polyzone"]:AddBoxZone("tattoo_shop", vector3(323.34, 180.65, 103.59), 5.2, 6.4, {
		heading=337,
		minZ=102.24,
		maxZ=106.64
	})

	exports["ev-polyzone"]:AddBoxZone("tattoo_shop", vector3(1769.51, 2513.36, 45.83), 2, 1, {
		heading=30,
		minZ=44.83,
		maxZ=47.43,
		data = { 
			isFree = true -- Prison
		}
	})
end)
  

tattoosList = {
  [1] = {
    collection = "mpbusiness_overlays",
    tattoos = {
      "MP_Buis_M_Neck_000",
      "MP_Buis_M_Neck_001",
      "MP_Buis_M_Neck_002",
      "MP_Buis_M_Neck_003",
      "MP_Buis_M_LeftArm_000",
      "MP_Buis_M_LeftArm_001",
      "MP_Buis_M_RightArm_000",
      "MP_Buis_M_RightArm_001",
      "MP_Buis_M_Stomach_000",
      "MP_Buis_M_Chest_000",
      "MP_Buis_M_Chest_001",
      "MP_Buis_M_Back_000",
      "MP_Buis_F_Chest_000",
      "MP_Buis_F_Chest_001",
      "MP_Buis_F_Chest_002",
      "MP_Buis_F_Stom_000",
      "MP_Buis_F_Stom_001",
      "MP_Buis_F_Stom_002",
      "MP_Buis_F_Back_000",
      "MP_Buis_F_Back_001",
      "MP_Buis_F_Neck_000",
      "MP_Buis_F_Neck_001",
      "MP_Buis_F_RArm_000",
      "MP_Buis_F_LArm_000",
      "MP_Buis_F_LLeg_000",
      "MP_Buis_F_RLeg_000",
    },
  },

  [2] = {
    collection = "mphipster_overlays",
    tattoos = {
      "FM_Hip_M_Tat_000",
      "FM_Hip_M_Tat_001",
      "FM_Hip_M_Tat_002",
      "FM_Hip_M_Tat_003",
      "FM_Hip_M_Tat_004",
      "FM_Hip_M_Tat_005",
      "FM_Hip_M_Tat_006",
      "FM_Hip_M_Tat_007",
      "FM_Hip_M_Tat_008",
      "FM_Hip_M_Tat_009",
      "FM_Hip_M_Tat_010",
      "FM_Hip_M_Tat_011",
      "FM_Hip_M_Tat_012",
      "FM_Hip_M_Tat_013",
      "FM_Hip_M_Tat_014",
      "FM_Hip_M_Tat_015",
      "FM_Hip_M_Tat_016",
      "FM_Hip_M_Tat_017",
      "FM_Hip_M_Tat_018",
      "FM_Hip_M_Tat_019",
      "FM_Hip_M_Tat_020",
      "FM_Hip_M_Tat_021",
      "FM_Hip_M_Tat_022",
      "FM_Hip_M_Tat_023",
      "FM_Hip_M_Tat_024",
      "FM_Hip_M_Tat_025",
      "FM_Hip_M_Tat_026",
      "FM_Hip_M_Tat_027",
      "FM_Hip_M_Tat_028",
      "FM_Hip_M_Tat_029",
      "FM_Hip_M_Tat_030",
      "FM_Hip_M_Tat_031",
      "FM_Hip_M_Tat_032",
      "FM_Hip_M_Tat_033",
      "FM_Hip_M_Tat_034",
      "FM_Hip_M_Tat_035",
      "FM_Hip_M_Tat_036",
      "FM_Hip_M_Tat_037",
      "FM_Hip_M_Tat_038",
      "FM_Hip_M_Tat_039",
      "FM_Hip_M_Tat_040",
      "FM_Hip_M_Tat_041",
      "FM_Hip_M_Tat_042",
      "FM_Hip_M_Tat_043",
      "FM_Hip_M_Tat_044",
      "FM_Hip_M_Tat_045",
      "FM_Hip_M_Tat_046",
      "FM_Hip_M_Tat_047",
      "FM_Hip_M_Tat_048",
    },
  },

  [3] = {
    collection = "mpbiker_overlays",
    tattoos = {
      "MP_MP_Biker_Tat_000_M",
      "MP_MP_Biker_Tat_001_M",
      "MP_MP_Biker_Tat_002_M",
      "MP_MP_Biker_Tat_003_M",
      "MP_MP_Biker_Tat_004_M",
      "MP_MP_Biker_Tat_005_M",
      "MP_MP_Biker_Tat_006_M",
      "MP_MP_Biker_Tat_007_M",
      "MP_MP_Biker_Tat_008_M",
      "MP_MP_Biker_Tat_009_M",
      "MP_MP_Biker_Tat_010_M",
      "MP_MP_Biker_Tat_011_M",
      "MP_MP_Biker_Tat_012_M",
      "MP_MP_Biker_Tat_013_M",
      "MP_MP_Biker_Tat_014_M",
      "MP_MP_Biker_Tat_015_M",
      "MP_MP_Biker_Tat_016_M",
      "MP_MP_Biker_Tat_017_M",
      "MP_MP_Biker_Tat_018_M",
      "MP_MP_Biker_Tat_019_M",
      "MP_MP_Biker_Tat_020_M",
      "MP_MP_Biker_Tat_021_M",
      "MP_MP_Biker_Tat_022_M",
      "MP_MP_Biker_Tat_023_M",
      "MP_MP_Biker_Tat_024_M",
      "MP_MP_Biker_Tat_025_M",
      "MP_MP_Biker_Tat_026_M",
      "MP_MP_Biker_Tat_027_M",
      "MP_MP_Biker_Tat_028_M",
      "MP_MP_Biker_Tat_029_M",
      "MP_MP_Biker_Tat_030_M",
      "MP_MP_Biker_Tat_031_M",
      "MP_MP_Biker_Tat_032_M",
      "MP_MP_Biker_Tat_033_M",
      "MP_MP_Biker_Tat_034_M",
      "MP_MP_Biker_Tat_035_M",
      "MP_MP_Biker_Tat_036_M",
      "MP_MP_Biker_Tat_037_M",
      "MP_MP_Biker_Tat_038_M",
      "MP_MP_Biker_Tat_039_M",
      "MP_MP_Biker_Tat_040_M",
      "MP_MP_Biker_Tat_041_M",
      "MP_MP_Biker_Tat_042_M",
      "MP_MP_Biker_Tat_043_M",
      "MP_MP_Biker_Tat_044_M",
      "MP_MP_Biker_Tat_045_M",
      "MP_MP_Biker_Tat_046_M",
      "MP_MP_Biker_Tat_047_M",
      "MP_MP_Biker_Tat_048_M",
      "MP_MP_Biker_Tat_049_M",
      "MP_MP_Biker_Tat_050_M",
      "MP_MP_Biker_Tat_051_M",
      "MP_MP_Biker_Tat_052_M",
      "MP_MP_Biker_Tat_053_M",
      "MP_MP_Biker_Tat_054_M",
      "MP_MP_Biker_Tat_055_M",
      "MP_MP_Biker_Tat_056_M",
      "MP_MP_Biker_Tat_057_M",
      "MP_MP_Biker_Tat_058_M",
      "MP_MP_Biker_Tat_059_M",
      "MP_MP_Biker_Tat_060_M",
    },
  },

  [4] = {
    collection = "mpairraces_overlays",
    tattoos = {
      "MP_Airraces_Tattoo_000_M",
      "MP_Airraces_Tattoo_001_M",
      "MP_Airraces_Tattoo_002_M",
      "MP_Airraces_Tattoo_003_M",
      "MP_Airraces_Tattoo_004_M",
      "MP_Airraces_Tattoo_005_M",
      "MP_Airraces_Tattoo_006_M",
      "MP_Airraces_Tattoo_007_M",
    }
  },

  [5] = {
    collection = "mpbeach_overlays",
    tattoos = {
      "MP_Bea_M_Back_000",
      "MP_Bea_M_Chest_000",
      "MP_Bea_M_Chest_001",
      "MP_Bea_M_Head_000",
      "MP_Bea_M_Head_001",
      "MP_Bea_M_Head_002",
      "MP_Bea_M_Lleg_000",
      "MP_Bea_M_Rleg_000",
      "MP_Bea_M_RArm_000",
      "MP_Bea_M_Head_000",
      "MP_Bea_M_LArm_000",
      "MP_Bea_M_LArm_001",
      "MP_Bea_M_Neck_000",
      "MP_Bea_M_Neck_001",
      "MP_Bea_M_RArm_001",
      "MP_Bea_M_Stom_000",
      "MP_Bea_M_Stom_001",
    }
  },

  [6] = {
    collection = "mpchristmas2_overlays",
    tattoos = {
      "MP_Xmas2_M_Tat_000",
      "MP_Xmas2_M_Tat_001",
      "MP_Xmas2_M_Tat_003",
      "MP_Xmas2_M_Tat_004",
      "MP_Xmas2_M_Tat_005",
      "MP_Xmas2_M_Tat_006",
      "MP_Xmas2_M_Tat_007",
      "MP_Xmas2_M_Tat_008",
      "MP_Xmas2_M_Tat_009",
      "MP_Xmas2_M_Tat_010",
      "MP_Xmas2_M_Tat_011",
      "MP_Xmas2_M_Tat_012",
      "MP_Xmas2_M_Tat_013",
      "MP_Xmas2_M_Tat_014",
      "MP_Xmas2_M_Tat_015",
      "MP_Xmas2_M_Tat_016",
      "MP_Xmas2_M_Tat_017",
      "MP_Xmas2_M_Tat_018",
      "MP_Xmas2_M_Tat_019",
      "MP_Xmas2_M_Tat_022",
      "MP_Xmas2_M_Tat_023",
      "MP_Xmas2_M_Tat_024",
      "MP_Xmas2_M_Tat_025",
      "MP_Xmas2_M_Tat_026",
      "MP_Xmas2_M_Tat_027",
      "MP_Xmas2_M_Tat_028",
      "MP_Xmas2_M_Tat_029",
    },
  },


  [7] = {
    collection = "mpgunrunning_overlays",
    tattoos = {
      "MP_Gunrunning_Tattoo_000_M",
      "MP_Gunrunning_Tattoo_001_M",
      "MP_Gunrunning_Tattoo_002_M",
      "MP_Gunrunning_Tattoo_003_M",
      "MP_Gunrunning_Tattoo_004_M",
      "MP_Gunrunning_Tattoo_005_M",
      "MP_Gunrunning_Tattoo_006_M",
      "MP_Gunrunning_Tattoo_007_M",
      "MP_Gunrunning_Tattoo_008_M",
      "MP_Gunrunning_Tattoo_009_M",
      "MP_Gunrunning_Tattoo_010_M",
      "MP_Gunrunning_Tattoo_011_M",
      "MP_Gunrunning_Tattoo_012_M",
      "MP_Gunrunning_Tattoo_013_M",
      "MP_Gunrunning_Tattoo_014_M",
      "MP_Gunrunning_Tattoo_015_M",
      "MP_Gunrunning_Tattoo_016_M",
      "MP_Gunrunning_Tattoo_017_M",
      "MP_Gunrunning_Tattoo_018_M",
      "MP_Gunrunning_Tattoo_019_M",
      "MP_Gunrunning_Tattoo_020_M",
      "MP_Gunrunning_Tattoo_021_M",
      "MP_Gunrunning_Tattoo_022_M",
      "MP_Gunrunning_Tattoo_023_M",
      "MP_Gunrunning_Tattoo_024_M",
      "MP_Gunrunning_Tattoo_025_M",
      "MP_Gunrunning_Tattoo_026_M",
      "MP_Gunrunning_Tattoo_027_M",
      "MP_Gunrunning_Tattoo_028_M",
      "MP_Gunrunning_Tattoo_029_M",
      "MP_Gunrunning_Tattoo_030_M",
    },
  },

  [8] = {
    collection = "mpimportexport_overlays",
    tattoos = {
      "MP_MP_ImportExport_Tat_000_M",
      "MP_MP_ImportExport_Tat_001_M",
      "MP_MP_ImportExport_Tat_002_M",
      "MP_MP_ImportExport_Tat_003_M",
      "MP_MP_ImportExport_Tat_004_M",
      "MP_MP_ImportExport_Tat_005_M",
      "MP_MP_ImportExport_Tat_006_M",
      "MP_MP_ImportExport_Tat_007_M",
      "MP_MP_ImportExport_Tat_008_M",
      "MP_MP_ImportExport_Tat_009_M",
      "MP_MP_ImportExport_Tat_010_M",
      "MP_MP_ImportExport_Tat_011_M",
    }
  },

  [9] = {
    collection = "mplowrider2_overlays",
    tattoos = {
      "MP_LR_Tat_000_M",
      "MP_LR_Tat_003_M",
      "MP_LR_Tat_006_M",
      "MP_LR_Tat_008_M",
      "MP_LR_Tat_011_M",
      "MP_LR_Tat_012_M",
      "MP_LR_Tat_016_M",
      "MP_LR_Tat_018_M",
      "MP_LR_Tat_019_M",
      "MP_LR_Tat_022_M",
      "MP_LR_Tat_028_M",
      "MP_LR_Tat_029_M",
      "MP_LR_Tat_030_M",
      "MP_LR_Tat_031_M",
      "MP_LR_Tat_032_M",
      "MP_LR_Tat_035_M",
    }
  },

  [10] = {
    collection = "mplowrider_overlays",
    tattoos = {
      "MP_LR_Tat_001_M",
      "MP_LR_Tat_002_M",
      "MP_LR_Tat_004_M",
      "MP_LR_Tat_005_M",
      "MP_LR_Tat_007_M",
      "MP_LR_Tat_009_M",
      "MP_LR_Tat_010_M",
      "MP_LR_Tat_013_M",
      "MP_LR_Tat_014_M",
      "MP_LR_Tat_015_M",
      "MP_LR_Tat_017_M",
      "MP_LR_Tat_020_M",
      "MP_LR_Tat_021_M",
      "MP_LR_Tat_023_M",
      "MP_LR_Tat_026_M",
      "MP_LR_Tat_027_M",
      "MP_LR_Tat_033_M",
    }
  },

  [11] = {
    collection = "mpChristmas2017_overlays",
    tattoos = {
      "MP_Christmas2017_Tattoo_000_M",
      "MP_Christmas2017_Tattoo_001_M",
      "MP_Christmas2017_Tattoo_002_M",
      "MP_Christmas2017_Tattoo_003_M",
      "MP_Christmas2017_Tattoo_004_M",
      "MP_Christmas2017_Tattoo_005_M",
      "MP_Christmas2017_Tattoo_006_M",
      "MP_Christmas2017_Tattoo_007_M",
      "MP_Christmas2017_Tattoo_008_M",
      "MP_Christmas2017_Tattoo_009_M",
      "MP_Christmas2017_Tattoo_010_M",
      "MP_Christmas2017_Tattoo_011_M",
      "MP_Christmas2017_Tattoo_012_M",
      "MP_Christmas2017_Tattoo_013_M",
      "MP_Christmas2017_Tattoo_014_M",
      "MP_Christmas2017_Tattoo_015_M",
      "MP_Christmas2017_Tattoo_016_M",
      "MP_Christmas2017_Tattoo_017_M",
      "MP_Christmas2017_Tattoo_018_M",
      "MP_Christmas2017_Tattoo_019_M",
      "MP_Christmas2017_Tattoo_020_M",
      "MP_Christmas2017_Tattoo_021_M",
      "MP_Christmas2017_Tattoo_022_M",
      "MP_Christmas2017_Tattoo_023_M",
      "MP_Christmas2017_Tattoo_024_M",
      "MP_Christmas2017_Tattoo_025_M",
      "MP_Christmas2017_Tattoo_026_M",
    }
  },

  [12] = {
    collection = "mpChristmas2018_overlays",
    tattoos = {
      "MP_Christmas2018_Tat_000_M",
    }
  },

  [13] = {
    collection = "mpHeist3_overlays",
    tattoos = {
      "mpHeist3_Tat_000_M",
      "mpHeist3_Tat_001_M",
      "mpHeist3_Tat_002_M",
      "mpHeist3_Tat_003_M",
      "mpHeist3_Tat_004_M",
      "mpHeist3_Tat_005_M",
      "mpHeist3_Tat_006_M",
      "mpHeist3_Tat_007_M",
      "mpHeist3_Tat_008_M",
      "mpHeist3_Tat_009_M",
      "mpHeist3_Tat_010_M",
      "mpHeist3_Tat_011_M",
      "mpHeist3_Tat_012_M",
      "mpHeist3_Tat_013_M",
      "mpHeist3_Tat_014_M",
      "mpHeist3_Tat_015_M",
      "mpHeist3_Tat_016_M",
      "mpHeist3_Tat_017_M",
      "mpHeist3_Tat_018_M",
      "mpHeist3_Tat_019_M",
      "mpHeist3_Tat_020_M",
      "mpHeist3_Tat_021_M",
      "mpHeist3_Tat_022_M",
      "mpHeist3_Tat_023_M",
      "mpHeist3_Tat_024_M",
      "mpHeist3_Tat_025_M",
      "mpHeist3_Tat_026_M",
      "mpHeist3_Tat_027_M",
      "mpHeist3_Tat_028_M",
      "mpHeist3_Tat_029_M",
      "mpHeist3_Tat_030_M",
      "mpHeist3_Tat_031_M",
      "mpHeist3_Tat_032_M",
      "mpHeist3_Tat_033_M",
      "mpHeist3_Tat_034_M",
      "mpHeist3_Tat_035_M",
      "mpHeist3_Tat_036_M",
      "mpHeist3_Tat_037_M",
      "mpHeist3_Tat_038_M",
      "mpHeist3_Tat_039_M",
      "mpHeist3_Tat_040_M",
      "mpHeist3_Tat_041_M",
    }
  },

  [14] = {
    collection = "mpLuxe2_overlays",
    tattoos = {
      "MP_Luxe_Tat_002_M",
      "MP_Luxe_Tat_005_M",
      "MP_Luxe_Tat_010_M",
      "MP_Luxe_Tat_011_M",
      "MP_Luxe_Tat_012_M",
      "MP_Luxe_Tat_016_M",
      "MP_Luxe_Tat_017_M",
      "MP_Luxe_Tat_018_M",
      "MP_Luxe_Tat_022_M",
      "MP_Luxe_Tat_023_M",
      "MP_Luxe_Tat_025_M",
      "MP_Luxe_Tat_026_M",
      "MP_Luxe_Tat_027_M",
      "MP_Luxe_Tat_028_M",
      "MP_Luxe_Tat_029_M",
      "MP_Luxe_Tat_030_M",
      "MP_Luxe_Tat_031_M",
    }
  },

  [15] = {
    collection = "mpSmuggler_overlays",
    tattoos = {
      "MP_Smuggler_Tattoo_000_M",
      "MP_Smuggler_Tattoo_001_M",
      "MP_Smuggler_Tattoo_002_M",
      "MP_Smuggler_Tattoo_003_M",
      "MP_Smuggler_Tattoo_004_M",
      "MP_Smuggler_Tattoo_005_M",
      "MP_Smuggler_Tattoo_006_M",
      "MP_Smuggler_Tattoo_007_M",
      "MP_Smuggler_Tattoo_008_M",
      "MP_Smuggler_Tattoo_009_M",
      "MP_Smuggler_Tattoo_010_M",
      "MP_Smuggler_Tattoo_011_M",
      "MP_Smuggler_Tattoo_012_M",
      "MP_Smuggler_Tattoo_013_M",
      "MP_Smuggler_Tattoo_014_M",
      "MP_Smuggler_Tattoo_015_M",
      "MP_Smuggler_Tattoo_016_M",
      "MP_Smuggler_Tattoo_017_M",
      "MP_Smuggler_Tattoo_018_M",
      "MP_Smuggler_Tattoo_019_M",
      "MP_Smuggler_Tattoo_020_M",
      "MP_Smuggler_Tattoo_021_M",
      "MP_Smuggler_Tattoo_022_M",
      "MP_Smuggler_Tattoo_023_M",
      "MP_Smuggler_Tattoo_024_M",
      "MP_Smuggler_Tattoo_025_M",
    }
  },

  [16] = {
    collection = "mpStunt_overlays",
    tattoos = {
      "MP_MP_Stunt_Tat_000_M",
      "MP_MP_Stunt_Tat_001_M",
      "MP_MP_Stunt_Tat_002_M",
      "MP_MP_Stunt_Tat_003_M",
      "MP_MP_Stunt_Tat_004_M",
      "MP_MP_Stunt_Tat_005_M",
      "MP_MP_Stunt_Tat_006_M",
      "MP_MP_Stunt_Tat_007_M",
      "MP_MP_Stunt_Tat_008_M",
      "MP_MP_Stunt_Tat_009_M",
      "MP_MP_Stunt_Tat_010_M",
      "MP_MP_Stunt_Tat_011_M",
      "MP_MP_Stunt_Tat_012_M",
      "MP_MP_Stunt_Tat_013_M",
      "MP_MP_Stunt_Tat_014_M",
      "MP_MP_Stunt_Tat_015_M",
      "MP_MP_Stunt_Tat_016_M",
      "MP_MP_Stunt_Tat_017_M",
      "MP_MP_Stunt_Tat_018_M",
      "MP_MP_Stunt_Tat_019_M",
      "MP_MP_Stunt_Tat_020_M",
      "MP_MP_Stunt_Tat_021_M",
      "MP_MP_Stunt_Tat_022_M",
      "MP_MP_Stunt_Tat_023_M",
      "MP_MP_Stunt_Tat_024_M",
      "MP_MP_Stunt_Tat_025_M",
      "MP_MP_Stunt_Tat_026_M",
      "MP_MP_Stunt_Tat_027_M",
      "MP_MP_Stunt_Tat_028_M",
      "MP_MP_Stunt_Tat_029_M",
      "MP_MP_Stunt_Tat_030_M",
      "MP_MP_Stunt_Tat_031_M",
      "MP_MP_Stunt_Tat_032_M",
      "MP_MP_Stunt_Tat_033_M",
      "MP_MP_Stunt_Tat_034_M",
      "MP_MP_Stunt_Tat_035_M",
      "MP_MP_Stunt_Tat_036_M",
      "MP_MP_Stunt_Tat_037_M",
      "MP_MP_Stunt_Tat_038_M",
      "MP_MP_Stunt_Tat_039_M",
      "MP_MP_Stunt_Tat_040_M",
      "MP_MP_Stunt_Tat_041_M",
      "MP_MP_Stunt_Tat_042_M",
      "MP_MP_Stunt_Tat_043_M",
      "MP_MP_Stunt_Tat_044_M",
      "MP_MP_Stunt_Tat_045_M",
      "MP_MP_Stunt_Tat_046_M",
      "MP_MP_Stunt_Tat_047_M",
      "MP_MP_Stunt_Tat_048_M",
      "MP_MP_Stunt_Tat_049_M",
    }
  },

  [17] = {
    collection = "mpVinewood_overlays",
    tattoos = {
      "MP_Vinewood_Tat_000_M",
      "MP_Vinewood_Tat_001_M",
      "MP_Vinewood_Tat_002_M",
      "MP_Vinewood_Tat_003_M",
      "MP_Vinewood_Tat_004_M",
      "MP_Vinewood_Tat_005_M",
      "MP_Vinewood_Tat_006_M",
      "MP_Vinewood_Tat_007_M",
      "MP_Vinewood_Tat_008_M",
      "MP_Vinewood_Tat_009_M",
      "MP_Vinewood_Tat_010_M",
      "MP_Vinewood_Tat_011_M",
      "MP_Vinewood_Tat_012_M",
      "MP_Vinewood_Tat_013_M",
      "MP_Vinewood_Tat_014_M",
      "MP_Vinewood_Tat_015_M",
      "MP_Vinewood_Tat_016_M",
      "MP_Vinewood_Tat_017_M",
      "MP_Vinewood_Tat_018_M",
      "MP_Vinewood_Tat_019_M",
      "MP_Vinewood_Tat_020_M",
      "MP_Vinewood_Tat_021_M",
      "MP_Vinewood_Tat_022_M",
      "MP_Vinewood_Tat_023_M",
      "MP_Vinewood_Tat_024_M",
      "MP_Vinewood_Tat_025_M",
      "MP_Vinewood_Tat_026_M",
      "MP_Vinewood_Tat_027_M",
      "MP_Vinewood_Tat_028_M",
      "MP_Vinewood_Tat_029_M",
      "MP_Vinewood_Tat_030_M",
      "MP_Vinewood_Tat_031_M",
      "MP_Vinewood_Tat_032_M",
    }
  }
}

local tatCategs = {
  { "ZONE_TORSO", 0 },
  { "ZONE_HEAD", 0 },
  { "ZONE_LEFT_ARM", 0 },
  { "ZONE_RIGHT_ARM", 0 },
  { "ZONE_LEFT_LEG", 0 },
  { "ZONE_RIGHT_LEG", 0 },
  { "ZONE_UNKNOWN", 0 },
  { "ZONE_NONE", 0 },
}

function AddZoneIDToTattoos()
  tempTattoos = {}
  for k, v in ipairs(tattoosList) do
    for i = 1, #v.tattoos do
      if tempTattoos[v.collection] == nil then tempTattoos[v.collection] = {} end
      local PedDecZoneFromHash = GetPedDecorationZoneFromHashes(v.collection, GetHashKey(v.tattoos[i]))
      if PedDecZoneFromHash == 6 or PedDecZoneFromHash == 7 then
        print(v.collection, v.tattoos[i], "Error adding this tattoo?")
      end
      tempTattoos[v.collection][i] = {
        v.tattoos[i],
        tatCategs[GetPedDecorationZoneFromHashes(v.collection, GetHashKey(v.tattoos[i])) + 1][1]
      }
    end
  end
  tattoosList = tempTattoos
end

AddZoneIDToTattoos()

function CreateHashList()
  tempTattooHashList = {}
  for k, v in pairs(tattoosList) do
    for i = 1, #v do
      local categ = v[i][2]
      if tempTattooHashList[categ] == nil then tempTattooHashList[categ] = {} end
      table.insert(
        tempTattooHashList[categ],
        { GetHashKey(v[i][1]),
          GetHashKey(k) }
      )
    end
  end
  return tempTattooHashList
end

function GetTatCategs()
  for key, value in pairs(tattoosList) do
    for i = 1, #value do
      local zone = GetPedDecorationZoneFromHashes(key, GetHashKey(value[i][1]))
      tatCategs[zone + 1] = { tatCategs[zone + 1][1], tatCategs[zone + 1][2] + 1 }
    end
  end

  return tatCategs
end