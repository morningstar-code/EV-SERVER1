local listening, currentPrompt = false, nil
local defaultDuiUrl = 'https://i.imgur.com/5Ust2GQ.jpg'
local currentBoardUrl = 'https://i.imgur.com/5Ust2GQ.jpg'
local currentMeetingRoomBoardUrl = 'https://i.imgur.com/5Ust2GQ.jpg'
local inClassRoom, inMeetingRoom, isMegaphoneActivated = false, false, false
local dui = nil

Citizen.CreateThread(function()

  exports["ev-polyzone"]:AddPolyZone("mrpd_classroom", {
    vector2(448.41372680664, -990.47613525391),
    vector2(439.50704956055, -990.55731201172),
    vector2(439.43478393555, -981.08758544922),
    vector2(448.419921875, -981.26306152344),
    vector2(450.23190307617, -983.00885009766),
    vector2(450.25042724609, -988.77667236328)
  }, {
    gridDivisions = 25,
    minZ = 34.04,
    maxZ = 37.69
  })
  exports["ev-polyzone"]:AddBoxZone("mrpd_meetingroom", vector3(474.07, -995.08, 30.69), 10.2, 5.2, {
    heading=0,
    minZ=29.64,
    maxZ=32.84
  })
  
  exports["ev-polyzone"]:AddBoxZone("mrpd_clothing_lockers_male", vector3(480.77, -1011.15, 30.69), 8.4, 6.0, {
    heading=0,
    minZ=29.49,
    maxZ=31.89
  })

  exports["ev-polyzone"]:AddBoxZone("mrpd_clothing_lockers_female", vector3(475.07, -992.81, 30.69), 4.6, 6.8, {
    heading=0,
    minZ=29.59,
    maxZ=32.59
  })

  exports["ev-polyzone"]:AddBoxZone("mrpd_armory", vector3(461.0, -999.05, 30.69), 3.0, 1.6, {
    heading=0,
    minZ=25.09,
    maxZ=32.09
  })

  exports["ev-polyzone"]:AddBoxZone("mrpd_evidence", vector3(474.12, -988.09, 30.69), 2.2, 2.2, {
    heading=0,
    minZ=29.54,
    maxZ=32.34
  })

  -----exports["ev-polyzone"]:AddBoxZone("mrpd_trash", vector3(472.88, -996.28, 26.27), 1.2, 3.0, {
  -----  heading=90,
  -----  minZ=25.27,
  -----  maxZ=27.87
  -----})
-----
  exports["ev-polyzone"]:AddBoxZone("mrpd_character_switcher_male", vector3(486.79, -1015.6, 30.69), 1.6, 3.0, {
    heading=0,
    minZ=25.89,
    maxZ=32.89
  })

  exports["ev-polyzone"]:AddBoxZone("mrpd_character_switcher_female", vector3(483.17, -990.77, 30.69), 1.4, 3.2, {
    heading=0,
    minZ=27.49,
    maxZ=32.29
  })

  -- Armory, VBPD
  exports["ev-polyzone"]:AddBoxZone("vbpd_armory", vector3(-1075.05, -830.85, 19.3), 4.6, 1.2, {
    heading=308,
    minZ=18.3,
    maxZ=21.1
  })

  exports["ev-polyzone"]:AddBoxZone("vbpd_clothing_lockers", vector3(-1087.41, -832.43, 19.3), 4.2, 11.2, {
    heading=308,
    minZ=18.15,
    maxZ=21.95
  })

  exports["ev-polyzone"]:AddCircleZone("vbpd_character_switcher", vector3(-1081.85, -834.42, 19.3), 0.5, {
    useZ=true,
  })

  exports["ev-polyzone"]:AddCircleZone("vbpd_evidence", vector3(-1099.11, -824.35, 19.3), 0.7, {
    useZ=true,
  })

  exports["ev-polyzone"]:AddCircleZone("vbpd_trash", vector3(-1096.47, -818.9, 19.3), 0.3, {
    useZ=true,
  })

  -- Sheriff, Sandy
  exports["ev-polyzone"]:AddBoxZone("sandy_clothing_lockers", vector3(1853.81, 3688.74, 29.82), 2.7, 1.9, {
    heading=30,
    minZ=28.82,
    maxZ=30.97
  })

  exports["ev-polyzone"]:AddBoxZone("sandy_character_switch_evidence_trash_armory", vector3(1861.04, 3689.48, 34.28), 2.9, 2.95, {
    heading=30,
    minZ=33.28,
    maxZ=35.48
  })

  exports["ev-polyzone"]:AddBoxZone("paleto_clothing_lockers_character_switch_evidence_trash_armory", vector3(-452.63, 6014.1, 31.72), 2.4, 2.8, {
    heading=44,
    minZ=30.5,
    maxZ=33.0
  })

  exports["ev-polyzone"]:AddBoxZone("beaverpd_clothing_lockers_character_switch_evidence_trash_armory", vector3(387.19, 799.6, 187.46), 1.0, 2.2, {
    heading=359,
    minZ=184.86,
    maxZ=188.86
  })

  exports["ev-polyzone"]:AddBoxZone("doc_clothing_lockers", vector3(1783.38, 2493.71, 50.43), 3.8, 2.0, {
    heading=30,
    minZ=49.43,
    maxZ=53.43
  })

  exports["ev-polyzone"]:AddBoxZone("doc_armory", vector3(1774.73, 2511.36, 45.83), 3.0, 1.4, {
    heading=300,
    minZ=44.83,
    maxZ=48.83
  })

  --  SASP 
  exports["ev-polyzone"]:AddBoxZone("sasp_clothing_lockers", vector3(853.31, -1312.96, 28.24), 3.0, 2, {
    heading=180,
    minZ=29.79,
    maxZ=27.19
  })

  exports["ev-polyzone"]:AddBoxZone("sasp_evidence", vector3(850.39, -1312.25, 28.24), 2.45, 2.4, {
    heading=90,
    minZ=29.89,
    maxZ=27.19
  })

  exports["ev-polyzone"]:AddBoxZone("sasp_trash", vector3(846.56, -1313.04, 28.24), 2.2, 1.35, {
    heading=90,
    minZ=29.89,
    maxZ=27.19
  })
  -- -- Prison - Bus Spawn
  -- exports["ev-polyzone"]:AddBoxZone("pd_shared", vector3(1689.371948, 2605.291992, 44.564999), 5.8, 15.0, {
  --   heading=0,
  --   minZ=44.56,
  --   maxZ=47.56
  -- })

  -- -- MRPD - Underground B
  --   exports["ev-polyzone"]:AddBoxZone("pd_shared", vector3(425.97, -980.22, 25.7), 11.6, 6.4, {
  --     heading=0,
  --     minZ=24.7,
  --     maxZ=29.7
  --   })


  -- -- MRPD - Bus Spawn
  -- exports["ev-polyzone"]:AddBoxZone("pd_shared", vector3(479.43, -1019.49, 27.96), 6.0, 15.0, {
  --   heading=0,
  --   minZ=26.96,
  --   maxZ=28.96
  -- })

  -- -- MRPD Helipads
  -- exports["ev-polyzone"]:AddBoxZone("pd_shared", vector3(466.16, -981.74, 43.69), 13.6, 46.8, {
  --   heading=0,
  --   minZ=39.89,
  --   maxZ=46.89
  -- })

  -- -- Vespucci PD Helipad
  -- exports["ev-polyzone"]:AddBoxZone("pd_shared", vector3(-1095.58, -834.96, 37.68), 14.0, 13.6, {
  --   heading=40,
  --   minZ=36.48,
  --   maxZ=40.68
  -- })

  -- -- Paleto PD Helipad
  -- exports["ev-polyzone"]:AddBoxZone("pd_shared", vector3(-475.69, 5988.67, 31.34), 14.0, 13.6, {
  --   heading=40,
  --   minZ=30.34,
  --   maxZ=34.54
  -- })

  -- -- VBPD Garage
  -- exports["ev-polyzone"]:AddBoxZone("pd_shared", vector3(-1131.84, -836.9, 3.75), 37.35, 62.6, {
  --   heading=37,
  --   minZ=2.55,
  --   maxZ=6.75
  -- })

  -- -- Paleto PD Garage
  -- exports["ev-polyzone"]:AddBoxZone("pd_shared", vector3(-474.19, 6029.99, 31.34), 28.4, 12.8, {
  --   heading=315,
  --   minZ=30.24,
  --   maxZ=34.24
  -- })

  -- -- Courthouse PD Shared Garage
  -- exports["ev-polyzone"]:AddBoxZone("pd_shared", vector3(-585.92, -236.39, 35.7), 36.0, 4.4, {
  --   heading=30,
  --   minZ=34.7,
  --   maxZ=37.9
  -- })

  -- -- Sandy PD Shared Garage
  -- exports["ev-polyzone"]:AddBoxZone("pd_shared", vector3(1842.01, 3671.63, 39.64), 73.4, 20, {
  --   heading=300.0,
  --   minZ=32.33,
  --   maxZ=41.33
  -- })

  -- -- Beaver Bush PD Shared Garage
  -- exports["ev-polyzone"]:AddBoxZone("pd_shared", vector3(374.53, 795.94, 187.28), 10, 8, {
  --   heading= 180.0,
  --   minZ=186.08,
  --   maxZ=191.28
  -- })

  -- -- Sandy Airfield Heli PD Shared
  -- exports["ev-polyzone"]:AddBoxZone("pd_shared", vector3(1770.36, 3239.85, 41.36), 14.0, 14.8, {
  --   heading=15,
  --   minZ=40.79,
  --   maxZ=45.79
  -- })

  -- exports["ev-polyzone"]:AddBoxZone("pd_shared_bike", vector3(1865.71, 3681.22, 33.67), 8, 10.8, {
  --   heading=30,
  --   minZ=32.47,
  --   maxZ=37.07
  -- })

  -- exports["ev-polyzone"]:AddBoxZone("pd_shared_bike", vector3(-1119.91, -859.81, 13.41), 23.8, 9.6, {
  --   heading=304,
  --   minZ=12.31,
  --   maxZ=17.31
  -- })

  -- exports["ev-polyzone"]:AddBoxZone("pd_shared_bike", vector3(-457.98, 6044.63, 31.34), 16.2, 7.0, {
  --   heading=45,
  --   minZ=30.14,
  --   maxZ=35.34
  -- })

  -- exports["ev-polyzone"]:AddBoxZone("ems_shared", vector3(352.26, -588.32, 74.36), 15.8, 16.4, {
  --   name="emschop",
  --   heading=330,
  --   minZ=73.0,
  --   maxZ=76.36
  -- })

  -- exports["ev-polyzone"]:AddBoxZone("ems_shared", vector3(-790.76, -1191.65, 53.03), 14.2, 13.2, {
  --   name="ems3",
  --   heading=320,
  --   minZ=51.03,
  --   maxZ=55.03
  -- })

  -- exports["ev-polyzone"]:AddBoxZone("ems_shared", vector3(1217.43, -1525.4, 34.69), 16.6, 6.4, {
  --   name="emsrancho",
  --   heading=90,
  --   minZ=33.49,
  --   maxZ=39.69
  -- })

  exports["ev-polyzone"]:AddCircleZone("doc_trash", vector3(1840.87, 2572.94, 46.01), 0.4, {
    useZ=true,
  })

  exports["ev-polyzone"]:AddCircleZone("doc_trash2", vector3(1771.26, 2497.24, 50.43), 0.4, {
    useZ=true,
  })

  exports["ev-polytarget"]:AddBoxZone("mrdp_change_picture", vector3(439.44, -985.89, 34.97), 1.0, 0.4, {
    heading=0,
    minZ=35.37,
    maxZ=36.17
  })

  exports["ev-polytarget"]:AddBoxZone("mrpd_meetingroom_screen", vector3(474.02, -1001.79, 30.69), 3.6, 2.8, {
    heading=1,
    minZ=30.54,
    maxZ=32.54
  })

  exports["ev-polytarget"]:AddBoxZone("mrpd_cheif_jobs", vector3(461.36, -986.21, 30.73), 0.55, 0.7, {
    heading=0,
    minZ=30.58,
    maxZ=31.03
  })

  exports["ev-polytarget"]:AddBoxZone("mrpd_badge_desk", vector3(453.24, -987.42, 30.69), 0.35, 0.75, {
    heading = 0,
    minZ = 30.59,
    maxZ = 30.79
  })

  exports["ev-polytarget"]:AddBoxZone("bcso_cheif_jobs", vector3(1848.95, 3694.71, 38.22), 0.7, 0.8, {
    heading=30,
    minZ=37.92,
    maxZ=38.27
  })
  
  exports["ev-polytarget"]:AddBoxZone("bcso_badge_desk", vector3(1859.58, 3689.95, 38.22), 0.7, 0.8, {
    heading=30,
    minZ=38.07,
    maxZ=38.37
  })

  exports["ev-polytarget"]:AddBoxZone("rangers_cheif_jobs", vector3(387.65, 798.0, 190.49), 0.7, 0.6, {
    heading=90,
    minZ=190.34,
    maxZ=190.64
  })

  exports["ev-polytarget"]:AddBoxZone("sasp_cheif_jobs", vector3(855.95, -1300.46, 28.26), 0.7, 0.6, {
    heading=90,
    minZ=28.11,
    maxZ=28.41
  })
  
  exports["ev-interact"]:AddPeekEntryByPolyTarget("mrpd_badge_desk", {{
      event = "ev-polce:getBadge",
      id = 'polcegetBadge',
      icon = "circle",
      label = "Police Badge",
      parameters = {},
  }}, { distance = { radius = 2.5 } ,
    isEnabled = function ()
      if exports["isPed"]:isPed("myjob") == "police" then
        return true
      else
        return false
      end
    end
  })

  exports["ev-interact"]:AddPeekEntryByPolyTarget("mrpd_cheif_jobs", {{
      event = "ev-polce:giveJob",
      id = 'polcegiveJob_1',
      icon = "circle",
      label = "Police Managment",
      parameters = "lspd",
  }}, { distance = { radius = 2.5 } ,
    isEnabled = function ()
      if exports["isPed"]:isPed("myjob") == "police" then
        return true
      else
        return false
      end
    end
  })

  exports["ev-interact"]:AddPeekEntryByPolyTarget("rangers_cheif_jobs", {{
      event = "ev-polce:giveJob",
      id = 'polcegiveJob_2',
      icon = "circle",
      label = "Police Managment",
      parameters = "rangers",
  }}, { distance = { radius = 2.5 } ,
    isEnabled = function ()
      if exports["isPed"]:isPed("myjob") == "police" then
        return true
      else
        return false
      end
    end
  })

  exports["ev-interact"]:AddPeekEntryByPolyTarget("sasp_cheif_jobs", {{
      event = "ev-polce:giveJob",
      id = 'polcegiveJob_3',
      icon = "circle",
      label = "Police Managment",
      parameters = "troopers",
  }}, { distance = { radius = 2.5 } ,
    isEnabled = function ()
      if exports["isPed"]:isPed("myjob") == "police" then
        return true
      else
        return false
      end
    end
  })

  exports["ev-interact"]:AddPeekEntryByPolyTarget("bcso_cheif_jobs", {{
      event = "ev-polce:giveJob",
      id = 'polcegiveJob_4',
      icon = "circle",
      label = "Police Managment",
      parameters = "bcso",
  }}, { distance = { radius = 2.5 } ,
    isEnabled = function ()
      if exports["isPed"]:isPed("myjob") == "police" then
        return true
      else
        return false
      end
    end
  })

  exports["ev-interact"]:AddPeekEntryByPolyTarget("bcso_badge_desk", {{
    event = "ev-polce:getBadge",
    id = 'polcegetBadge',
    icon = "circle",
    label = "Police Badge",
    parameters = {},
  }}, { distance = { radius = 2.5 } ,
    isEnabled = function ()
      if exports["isPed"]:isPed("myjob") == "police" then
        return true
      else
        return false
      end
    end
  })

  exports["ev-interact"]:AddPeekEntryByPolyTarget("mrdp_change_picture", {{
      event = "ev-polce:changewhiteboardurl",
      id = 'polcechangewhiteboardurlc',
      icon = "circle",
      label = "Change URL",
      parameters = {
        room = "classroom"
      }
  }}, { distance = { radius = 2.5 } })

  exports["ev-interact"]:AddPeekEntryByPolyTarget("mrpd_meetingroom_screen", {{
      event = "ev-polce:changewhiteboardurl",
      id = 'polcechangewhiteboardurlm',
      icon = "circle",
      label = "Change URL",
      parameters = {
        room = "meetingroom"
      }
  }}, { distance = { radius = 2.5 } })

end)

local EVENTS = {
  LOCKERS = 1,
  CLOTHING = 2,
  SWITCHER = 3,
  EVIDENCE = 4,
  TRASH = 5,
  ARMORY = 6
}

local zoneData = {
  mrpd_clothing_lockers_male = {
    promptText = "[E] Lockers & Clothes",
    menuData = {
      {
        title = "Lockers",
        description = "Access your personal locker",
        action = "ev-police:handler",
        key = EVENTS.LOCKERS
      },
      {
        title = "Clothing",
        description = "Gotta look Sharp",
        action = "ev-police:handler",
        key = EVENTS.CLOTHING
      }
    }
  },
  mrpd_clothing_lockers_female = {
    promptText = "[E] Lockers & Clothes",
    menuData = {
      {
        title = "Lockers",
        description = "Access your personal locker",
        action = "ev-police:handler",
        key = EVENTS.LOCKERS
      },
      {
        title = "Clothing",
        description = "Gotta look Sharp",
        action = "ev-police:handler",
        key = EVENTS.CLOTHING
      }
    }
  },
  sasp_clothing_lockers = {
    promptText = "[E] Lockers & Clothes",
    menuData = {
      {
        title = "Lockers",
        description = "Access your personal locker",
        action = "ev-police:handler",
        key = EVENTS.LOCKERS
      },
      {
        title = "Clothing",
        description = "Gotta look Sharp",
        action = "ev-police:handler",
        key = EVENTS.CLOTHING
      }
    }
  },
  vbpd_clothing_lockers = {
    promptText = "[E] Lockers & Clothes",
    menuData = {
      {
        title = "Lockers",
        description = "Access your personal locker",
        action = "ev-police:handler",
        key = EVENTS.LOCKERS
      },
      {
        title = "Clothing",
        description = "Gotta look Sharp",
        action = "ev-police:handler",
        key = EVENTS.CLOTHING
      }
    }
  },
  sandy_clothing_lockers = {
    promptText = "[E] Lockers & Clothes",
    menuData = {
      {
        title = "Lockers",
        description = "Access your personal locker",
        action = "ev-police:handler",
        key = EVENTS.LOCKERS
      },
      {
        title = "Clothing",
        description = "Gotta look Sharp",
        action = "ev-police:handler",
        key = EVENTS.CLOTHING
      }
    }
  },
  doc_clothing_lockers = {
    promptText = "[E] Lockers & Clothes",
    menuData = {
      {
        title = "Lockers",
        description = "Access your personal locker",
        action = "ev-police:handler",
        key = EVENTS.LOCKERS
      },
      {
        title = "Clothing",
        description = "Gotta look Sharp",
        action = "ev-police:handler",
        key = EVENTS.CLOTHING
      }
    }
  },
  mrpd_character_switcher_male = {
    promptText = "[E] Switch Character",
    menuData = {
      {
        title = "Character switch",
        description = "Go bowling with your cousin",
        action = "ev-police:handler",
        key = EVENTS.SWITCHER
      }
    }
  },
  mrpd_character_switcher_female = {
    promptText = "[E] Switch Character",
    menuData = {
      {
        title = "Character switch",
        description = "Go bowling with your cousin",
        action = "ev-police:handler",
        key = EVENTS.SWITCHER
      }
    }
  },
  vbpd_character_switcher = {
    promptText = "[E] Switch Character",
    menuData = {
      {
        title = "Character switch",
        description = "Go bowling with your cousin",
        action = "ev-police:handler",
        key = EVENTS.SWITCHER
      }
    }
  },
  sandy_character_switch_evidence_trash_armory = {
    promptText = "[E] Station Services",
    menuData = {
      {
        title = "Armory",
        description = "WEF - Weapons, Equipment, Fun!",
        action = "ev-police:handler",
        key = EVENTS.ARMORY
      },
      {
        title = "Evidence",
        description = "Drop off some evidence",
        action = "ev-police:handler",
        key = EVENTS.EVIDENCE
      },
      {
        title = "Trash",
        description = "Where Spaghetti Code belongs",
        action = "ev-police:handler",
        key = EVENTS.TRASH
      },
      {
        title = "Character switch",
        description = "Go bowling with your cousin",
        action = "ev-police:handler",
        key = EVENTS.SWITCHER
      },
    }
  },
  mrpd_trash = {
    promptText = "[E] Trash"
  },
  vbpd_trash = {
    promptText = "[E] Trash"
  },
  shierff_trash = {
    promptText = "[E] Trash"
  },
  sasp_trash = {
    promptText = "[E] Trash"
  },
  ranger_trash = {
    promptText = "[E] Trash"
  },
  mrpd_armory = {
    promptText = "[E] Armory"
  },
  vbpd_armory = {
    promptText = "[E] Armory"
  },
  doc_armory = {
    promptText = "[E] Armory"
  },
  shierff_armory = {
    promptText = "[E] Armory"
  },
  sasp_armory = {
    promptText = "[E] Armory"
  },
  ranger_armory = {
    promptText = "[E] Armory"
  },
  mrpd_evidence = {
    promptText = "[E] Evidence"
  },
  sasp_evidence = {
    promptText = "[E] Evidence"
  },
  shierff_evidence = {
    promptText = "[E] Evidence"
  },
  ranger_evidence = {
    promptText = "[E] Evidence"
  },
  vbpd_evidence = {
    promptText = "[E] Evidence"
  },
  doc_trash = {
    promptText = "[E] Trash"
  },
  doc_trash2 = {
    promptText = "[E] Trash"
  },
  paleto_clothing_lockers_character_switch_evidence_trash_armory = {
    promptText = "[E] Station Services",
    menuData = {
      {
        title = "Lockers",
        description = "Access your personal locker",
        action = "ev-police:handler",
        key = EVENTS.LOCKERS
      },
      {
        title = "Clothing",
        description = "Gotta look Sharp",
        action = "ev-police:handler",
        key = EVENTS.CLOTHING
      },
      {
        title = "Armory",
        description = "WEF - Weapons, Equipment, Fun!",
        action = "ev-police:handler",
        key = EVENTS.ARMORY
      },
      {
        title = "Evidence",
        description = "Drop off some evidence",
        action = "ev-police:handler",
        key = EVENTS.EVIDENCE
      },
      {
        title = "Trash",
        description = "Where Spaghetti Code belongs",
        action = "ev-police:handler",
        key = EVENTS.TRASH
      },
      {
        title = "Character switch",
        description = "Go bowling with your cousin",
        action = "ev-police:handler",
        key = EVENTS.SWITCHER
      },
    }
  },
  beaverpd_clothing_lockers_character_switch_evidence_trash_armory = {
    promptText = "[E] Station Services",
    menuData = {
      {
        title = "Lockers",
        description = "Access your personal locker",
        action = "ev-police:handler",
        key = EVENTS.LOCKERS
      },
      {
        title = "Clothing",
        description = "Gotta look Sharp",
        action = "ev-police:handler",
        key = EVENTS.CLOTHING
      },
      {
        title = "Armory",
        description = "WEF - Weapons, Equipment, Fun!",
        action = "ev-police:handler",
        key = EVENTS.ARMORY
      },
      {
        title = "Evidence",
        description = "Drop off some evidence",
        action = "ev-police:handler",
        key = EVENTS.EVIDENCE
      },
      {
        title = "Trash",
        description = "Where Spaghetti Code belongs",
        action = "ev-police:handler",
        key = EVENTS.TRASH
      },
      {
        title = "Character switch",
        description = "Go bowling with your cousin",
        action = "ev-police:handler",
        key = EVENTS.SWITCHER
      },
    }
  }
}

RegisterUICallback("ev-police:handler", function(data, cb)
  local eventData = data.key
  local location = currentPrompt ~= nil and string.match(currentPrompt, "(.-)_") or ''
  local job = exports["isPed"]:isPed("myjob")
  if eventData == EVENTS.LOCKERS and (job == "police" or job == "doc") then
    local cid = exports["isPed"]:isPed("cid")
    TriggerEvent("server-inventory-open", "1", ("personalStorage-%s-%s"):format(location, cid))
    TriggerServerEvent('InteractSound_SV:PlayWithinDistance', 3.0, 'LockerOpen', 0.4)
  elseif eventData == EVENTS.CLOTHING then
    exports["ev-ui"]:hideInteraction()
    Wait(500)
    TriggerEvent("raid_clothes:openClothing", true, true, false)
  elseif eventData == EVENTS.SWITCHER then
    isCop = false
    TransitionToBlurred(500)
    DoScreenFadeOut(500)
    Wait(1000)
    TriggerEvent("ev-base:clearStates")
    exports["ev-base"]:getModule("SpawnManager"):Initialize()
    Wait(1000)
  elseif eventData == EVENTS.EVIDENCE and (job == "police" or job == "doc") then
    TriggerEvent("server-inventory-open", "1", ("%s_evidence"):format(location))
  elseif eventData == EVENTS.TRASH and (job == "police" or job == "doc") then
    TriggerEvent("server-inventory-open", "1", ("%s_trash"):format(location))
  elseif eventData == EVENTS.ARMORY and (job == "police" or job == "doc") then
    TriggerEvent("server-inventory-open", "10", "Shop")
  end
  cb({ data = {}, meta = { ok = true, message = "done" } })
end)

local function listenForKeypress(pZone)
  listening = true
  Citizen.CreateThread(function()
    while listening do
      if IsControlJustReleased(0, 38) then
        local job = exports["isPed"]:isPed("myjob")
        if pZone == "mrpd_clothing_lockers_male" or pZone == "mrpd_clothing_lockers_female" or pZone == "vbpd_clothing_lockers" or pZone == "sasp_clothing_lockers" or pZone == "sandy_clothing_lockers" or pZone == "doc_clothing_lockers" or pZone == "paleto_clothing_lockers_character_switch_evidence_trash_armory" then
          exports["ev-ui"]:showContextMenu(zoneData[pZone].menuData)
        elseif pZone == "beaverpd_clothing_lockers_character_switch_evidence_trash_armory" and (job == "police" or job == "doc") then
          exports["ev-ui"]:showContextMenu(zoneData[pZone].menuData)
        elseif pZone == "mrpd_character_switcher_male" or pZone == "mrpd_character_switcher_female" or pZone == "vbpd_character_switcher" or pZone == "sandy_character_switch_evidence_trash_armory" then
          exports["ev-ui"]:showContextMenu(zoneData[pZone].menuData)
        elseif (pZone == "mrpd_armory" or pZone == "vbpd_armory" or pZone == "doc_armory" or pZone == "shierff_armory" or pZone == "sasp_armory" or pZone == "ranger_armory") and (job == "police" or job == "doc") then
          TriggerEvent("server-inventory-open", "10", "Shop")
        elseif pZone == "mrpd_trash" or pZone == "vbpd_trash" or pZone == "shierff_trash" or pZone == "sasp_trash" or pZone == "ranger_trash" or pZone == "doc_trash" or pZone == "doc_trash2" and (job == "police" or job == "doc") then
          TriggerEvent("server-inventory-open", "1", pZone)
        elseif pZone == "mrpd_evidence" or pZone == "vbpd_evidence" or pZone == "ranger_evidence" or pZone == "shierff_evidence" or pZone == "sasp_evidence" and (job == "police" or job == "doc") then
          TriggerEvent("server-inventory-open", "1", pZone)
          TriggerServerEvent('InteractSound_SV:PlayWithinDistance', 3.0, 'LockerOpen', 0.4)
        end
      end
      Wait(0)
    end
  end)
end

AddEventHandler("ev-polyzone:enter", function(zone)
  local currentZone = zoneData[zone]
  if zone == "mrpd_classroom" then
    if not dui then
      dui = exports["ev-lib"]:getDui(currentBoardUrl)
      AddReplaceTexture('prop_planning_b1', 'prop_base_white_01b', dui.dictionary, dui.texture)
    else
      exports["ev-lib"]:changeDuiUrl(dui.id, currentBoardUrl)
    end
    inClassRoom = true
  elseif zone == "mrpd_meetingroom" then
    if not dui then
      dui = exports["ev-lib"]:getDui(currentMeetingRoomBoardUrl)
      AddReplaceTexture('prop_planning_b1', 'prop_base_white_01b', dui.dictionary, dui.texture)
    else
      exports["ev-lib"]:changeDuiUrl(dui.id, currentMeetingRoomBoardUrl)
    end
    inMeetingRoom = true
  elseif currentZone then --and isCop
    currentPrompt = zone
    local prompt = type(currentZone.promptText) == 'function' and currentZone.promptText() or currentZone.promptText
    exports["ev-ui"]:showInteraction(prompt)
    listenForKeypress(zone)
  end
end)

AddEventHandler("ev-polyzone:exit", function(zone)
  local currentZone = zoneData[zone]
  if zone == "mrpd_classroom" then
    RemoveReplaceTexture('prop_planning_b1', 'prop_base_white_01b')
    if dui ~= nil then
      exports["ev-lib"]:releaseDui(dui.id)
      dui = nil
    end
    inClassRoom = false
  elseif zone == "mrpd_meetingroom" then
    RemoveReplaceTexture('prop_planning_b1', 'prop_base_white_01b')
    if dui ~= nil then
      exports["ev-lib"]:releaseDui(dui.id)
      dui = nil
    end
    inMeetingRoom = false
  elseif currentZone then
    exports["ev-ui"]:hideInteraction()
    listening = false
    currentPrompt = nil
  end
end)

RegisterNetEvent("police:changewhiteboardcli")
AddEventHandler("police:changewhiteboardcli", function(pUrl, pRoom)
  if pRoom == "classroom" and inClassRoom and dui then
    currentBoardUrl = pUrl
    exports["ev-lib"]:changeDuiUrl(dui.id, currentBoardUrl)
  elseif pRoom == "meetingroom" and inMeetingRoom and dui then
    currentMeetingRoomBoardUrl = pUrl
    exports["ev-lib"]:changeDuiUrl(dui.id, currentMeetingRoomBoardUrl)
  end
end)

RegisterUICallback("ev-ui:policechangeurl", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['ev-ui']:closeApplication('textbox')
  TriggerServerEvent("police:changewhiteboard",  data.values.url, data.inputKey)
end)

AddEventHandler("ev-polce:changewhiteboardurl", function(pParams)
  exports['ev-ui']:openApplication('textbox', {
    callbackUrl = 'ev-ui:policechangeurl',
    inputKey = pParams.room,
    items = {
      {
        icon = "circle",
        label = "URL",
        name = "url",
      },
    },
    show = true,
  })
end)

AddEventHandler("ev-polce:giveJob", function(pParams)
  local context = {
    {
      title = 'Police Actions',
    },
    {
      title = 'Jobs',
      description = 'Give or Remove Job',
      icon = 'id-card',
      children = {
        {
          title = 'Give Job',
          icon = "user-plus",
          action = 'ev-police:job:ManageWhitelist',
          key = {
            action = 'give', 
            department = pParams,
          }
        },
        {
          title = 'Change Rank',
          icon = "user-plus",
          action = 'ev-police:job:ManageWhitelist',
          key = {
            action = 'change', 
            department = pParams,
          }
        },
        {
          title = 'Remove Job',
          icon = "user-minus",
          action = 'ev-police:job:ManageWhitelist',
          key = {
            action = 'remove', 
            department = pParams,
          }
        },
      },
    },
  }
  exports['ev-ui']:showContextMenu(context)
end)

AddEventHandler("ev-polce:getBadge", function(pParams)
  exports['ev-ui']:openApplication('textbox', {
    callbackUrl = 'ev-police:policeGetBadge',
    inputKey = "lspd",
    items = {
      {
        icon = "circle",
        label = "Image URL",
        name = "url",
      },
      {
        icon = "circle",
        label = "Callsign",
        name = "callsign",
      },
    },
    show = true,
  })
end)

RegisterUICallback("ev-police:policeGetBadge", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  local info = data.values
  RPC.execute("ev-gov:police:getBadge", info.url, info.callsign)
end)

RegisterUICallback("ev-police:job:ManageWhitelist", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  local department = data.key.department
  local elements = {
    ['id'] = { name = 'id', label = 'Player ID', icon = 'id-card' },
    ['cid'] = { name = 'cid', label = 'State ID', icon = 'id-card' },
    ['ranks'] = { _type = 'select', label = 'Police Ranks', name = 'ranks', options = {
      {
        id = "1",
        name = "Cadet",
      },
      {
        id = "2",
        name = 'Trooper'
      },
      {
        id = "3",
        name = 'Corporal'
      },
      {
        id = "4",
        name = 'Sergeant'
      },
      {
        id = "5",
        name = 'Staff Sergeant'
      },
      {
        id = "6",
        name = 'Inspector'
      },
      {
        id = "7",
        name = 'Lieutenant'
      },
      {
        id = "8",
        name = 'Captain'
      },
      {
        id = "9",
        name = 'Major'
      },
      {
        id = "10",
        name = 'Commander'
      },
      {
        id = "11",
        name = 'Lieutenant Colonel'
      },
      {
        id = "12",
        name = 'Assistant Chief'
      },
      {
        id = "13",
        name = 'Chief of Police'
      },
    }}
  }

  local actionHandlers = {
    ['give'] = function()
      local elements = {
        elements['id'],
        elements['ranks'],
      }
      local prompt = exports['ev-ui']:OpenInputMenu(elements, function(values)
        return values.id and values.id:len() > 0 and values.ranks
      end)
      if not prompt then return end
        local result = RPC.execute("ev-police:updateJobState", prompt.ranks, 1, prompt.id, department)
        if not result then 
          return TriggerEvent('DoLongHudText', "Something went wrong", 2)
        end
        TriggerEvent('DoLongHudText', 'Player (' .. prompt.id .. ") has been hired." )
    end,
    ['remove'] = function()
      local elements = {
        elements['cid'],
      }
      local prompt = exports['ev-ui']:OpenInputMenu(elements, function(values)
        return values.cid and values.cid:len() > 0
      end)
      if not prompt then return end
      local result = RPC.execute("ev-police:updateJobState", false, 0, prompt.cid)
      if not result then 
        return TriggerEvent('DoLongHudText', "Something went wrong", 2)
      end
      TriggerEvent('DoLongHudText', "player (" .. prompt.cid .. ") has been fired.")
    end,
    ['change'] = function()
      local elements = {
        elements['id'],
        elements['ranks'],
      }
      local prompt = exports['ev-ui']:OpenInputMenu(elements, function(values)
        return values.id and values.id:len() > 0 and values.ranks
      end)
      if not prompt then return end
      local result = RPC.execute("ev-police:updateJobState", prompt.ranks, 2, prompt.id)
      if not result then 
        return TriggerEvent('DoLongHudText', "Something went wrong" ,2)
      end
      TriggerEvent('DoLongHudText', "player (" .. prompt.id .. ") has been promoted.")
    end,
  }

  local action = data.key.action
  if not actionHandlers[action] then
    TriggerEvent('DoLongHudText', 'Invalid action', 2)
    return
  end

  actionHandlers[action]()
end)

AddEventHandler('ev-inventory:itemUsed', function(itemId, itemInfo, inventoryName, slot)
  if itemId ~= "pdevidencebag" then return end
  local metaData = json.decode(itemInfo)
  if not metaData.inventoryId then
    exports['ev-ui']:openApplication('textbox', {
      callbackUrl = 'ev-ui:saveEvidenceBag',
      inputKey = { slot = slot },
      items = {
        {
          icon = "fas fa-circle",
          label = "Bag Name",
          name = "name",
        },
      },
      show = true,
    })
    return
  end
  TriggerEvent("inventory-open-container", metaData.inventoryId, metaData.slots, metaData.weight)
end)

RegisterUICallback("ev-ui:saveEvidenceBag", function (data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  exports['ev-ui']:closeApplication('textbox')

  local genId = tostring(math.random(10000, 99999999))
  local invId = "container-" .. genId .. "-evidence bag"
  local metaData = json.encode({
    inventoryId = invId,
    bagName = data.values.name,
    slots = 15,
    weight = 10,
    _hideKeys = {'inventoryId', 'slots', 'weight'},
  })
  TriggerEvent('inventory:updateItem', 'pdevidencebag', data.inputKey.slot, metaData)
end)

local megaphoneRanges = {
  {
    mode = 1,
    range = 10.0,
    priority = 2
  },
  {
    mode = 2,
    range = 24.0,
    priority = 2
  },
  {
    mode = 3,
    range = 48.0,
    priority = 2
  }
}


local policeVehicles = {
  [`npolvic`] = true,
  [`polas350`] = true,
  [`bcat`] = true,
  [`npolvette`] = true,
  [`npolchal`] = true,
  [`npolstang`] = true,
  [`predator`] = true,
  [`npolexp`] = true,
}

function megaphoneUp()
  local plyPed = PlayerPedId()
  local plyVeh = GetVehiclePedIsIn(plyPed, false)
  local currentJob = exports["isPed"]:isPed("myjob")
  if (plyVeh ~= 0 and policeVehicles[GetEntityModel(plyVeh)] and currentJob == "police") then
    MumbleSetAudioInputIntent(`music`)
    TriggerEvent("ev:voice:proximity:override", "megaphone", megaphoneRanges)
    TriggerServerEvent("ev:voice:transmission:state", -1, "megaphone", true, "megaphone")
    isMegaphoneActivated = true
  end
end

function megaphoneDown()
  if isMegaphoneActivated then
    MumbleSetAudioInputIntent(`speech`)
    TriggerEvent("ev:voice:proximity:override", "megaphone", megaphoneRanges, -1, -1)
    TriggerServerEvent("ev:voice:transmission:state", -1, "megaphone", false, "gag")
  end
  isMegaphoneActivated = false
end

exports["ev-keybinds"]:registerKeyMapping("", "Gov", "Vehicle Megaphone", "+ev-police:vehicle-megaphone", "-ev-police:vehicle-megaphone")
RegisterCommand('+ev-police:vehicle-megaphone', megaphoneUp, false)
RegisterCommand('-ev-police:vehicle-megaphone', megaphoneDown, false)