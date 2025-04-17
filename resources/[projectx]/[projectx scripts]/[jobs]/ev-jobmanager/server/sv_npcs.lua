local NPCS = {}

--[[ NPCS[#NPCS + 1] = {
  id = "recycle_employer",
  position = {
    coords = vector3(-352.52, -1545.68, 27.72 - 1),
    heading = 272.8,
    random = false
  },
  pedType = 4,
  model = "s_m_y_dockwork_01",
  networked = false,
  distance = 50.0,
  appearance = nil,
  settings = {
      { mode = "invincible", active = true },
      { mode = "ignore", active = true },
      { mode = "freeze", active = true },
  },
  flags = {
    isNPC = true,
    isJobEmployer = true,
  },
  job = "garbage",
} ]]

--[[ NPCS[#NPCS + 1] = {
  id = "trucker_employer",
  position = {
    coords = vector3(919.9, -1256.54, 25.53 - 1),
    heading = 38.96,
    random = false
  },
  pedType = 4,
  model = "cs_floyd",
  networked = false,
  distance = 50.0,
  appearance = nil,
  settings = {
      { mode = "invincible", active = true },
      { mode = "ignore", active = true },
      { mode = "freeze", active = true },
  },
  flags = {
    isNPC = true,
    isJobEmployer = true,
  },
  scenario = "WORLD_HUMAN_CLIPBOARD",
  job = "trucker",
} ]]

--[[ NPCS[#NPCS + 1] = {
  id = "postop_employer",
  position = {
    coords = vector3(-417.233, -2792.829, 6.0007 - 1),
    heading = 227.363,
    random = false
  },
  pedType = 4,
  model = "cs_floyd",
  networked = false,
  distance = 50.0, 
  appearance = nil,
  settings = {
      { mode = "invincible", active = true },
      { mode = "ignore", active = true },
      { mode = "freeze", active = true },
  },
  flags = {
    isNPC = true,
    isJobEmployer = true,
  },
  scenario = "WORLD_HUMAN_CLIPBOARD",
  job = "postop",
} ]]

--[[ NPCS[#NPCS + 1] = {
  id = "fish_employer",
  position = {
    coords = vector3(-335.48, 6105.53, 31.45 - 1),
    heading = 234.58,
    random = false
  },
  pedType = 4,
  model = "mp_m_weed_01",
  networked = false,
  distance = 50.0,
  appearance = nil,
  settings = {
      { mode = "invincible", active = true },
      { mode = "ignore", active = true },
      { mode = "freeze", active = true },
  },
  flags = {
    isNPC = true,
    isJobEmployer = true,
  },
  scenario = "WORLD_HUMAN_CLIPBOARD",
  job = "fishing",
} ]]

NPCS[#NPCS + 1] = { -- dodo job
  id = "dodo_logestics", 
  position = {
    coords = vector3(-432.95, -2786.08, 6.01 - 1),
    heading = 46.97,
    random = false
  },
  pedType = 4,
  model = "mp_m_weapexp_01",
  networked = false,
  distance = 50.0,
  appearance = nil,
  settings = {
      { mode = "invincible", active = true },
      { mode = "ignore", active = true },
      { mode = "freeze", active = true },
  },
  flags = {
    isNPC = true,
    isJobEmployer = true,
  },
}

NPCS[#NPCS + 1] = {
  id = "waterandpower_employer",
  position = {
    coords = vector3(443.0755, -1969.359, 24.40176 - 1),
    heading = 222.57,
    random = false
  },
  pedType = 4,
  model = "s_m_m_gaffer_01",
  networked = false,
  distance = 50.0,
  appearance = nil,
  settings = {
      { mode = "invincible", active = true },
      { mode = "ignore", active = true },
      { mode = "freeze", active = true },
  },
  flags = {
    isNPC = true,
    isJobEmployer = true,
  },
  scenario = "WORLD_HUMAN_CLIPBOARD",
  job = "waterandpower",
}

NPCS[#NPCS + 1] = { --stores
  id = "darkmarket_stores",
  pedType = 4,
  model = "s_m_y_ammucity_01",
  networked = false,
  distance = 25.0,
  position = {
      coords = vector3(-1282.51, -189.90, 50.54),
      heading =  174.21,
      random = false
  },
  appearance = nil,
  settings = {
      {mode = "invincible", active = true},
      {mode = "ignore", active = true},
      {mode = "freeze", active = true},
  },
  flags = {
    isNPC = true,
    isJobEmployer = true,
  },
}

NPCS[#NPCS + 1] = { -- bobcat
  id = "darkmarket_bcat",
  pedType = 4,
  model = "s_m_y_ammucity_01",
  networked = false,
  distance = 25.0,
  position = {
      coords = vector3(-1262.97, -1142.34, 6.54), 
      heading =  199.32,
      random = false
  },
  appearance = nil,
  settings = {
      {mode = "invincible", active = true},
      {mode = "ignore", active = true},
      {mode = "freeze", active = true},
  },
  flags = {
    isNPC = true,
    isJobEmployer = true,
  },
}

NPCS[#NPCS + 1] = { -- jewel
  id = "darkmarket_jewel",
  pedType = 4,
  model = "s_m_y_ammucity_01",
  networked = false,
  distance = 25.0,
  position = {
      coords = vector3(957.45, -1514.54, 30.29), 
      heading =  15.30,
      random = false
  },
  appearance = nil,
  settings = {
      {mode = "invincible", active = true},
      {mode = "ignore", active = true},
      {mode = "freeze", active = true},
  },
  flags = {
    isNPC = true,
    isJobEmployer = true,
  },
}

NPCS[#NPCS + 1] = { -- banks
  id = "darkmarket_banks",
  pedType = 4,
  model = "s_m_y_ammucity_01",
  networked = false,
  distance = 25.0,
  position = {
      coords = vector3(-1191.26, -511.40, 34.65), 
      heading = 340.48,
      random = false
  },
  appearance = nil,
  settings = {
      {mode = "invincible", active = true},
      {mode = "ignore", active = true},
      {mode = "freeze", active = true},
  },
  flags = {
    isNPC = true,
    isJobEmployer = true,
  },
}

-- NPCS[#NPCS + 1] = { -- hosuing
--   id = "darkmarket_hosuing",
--   pedType = 4,
--   model = "s_m_y_ammucity_01",
--   networked = false,
--   distance = 25.0,
--   position = {
--       coords = vector3(332.83, -1000.87, 28.31), 
--       heading = 2.23,
--       random = false
--   },
--   appearance = nil,
--   settings = {
--       {mode = "invincible", active = true},
--       {mode = "ignore", active = true},
--       {mode = "freeze", active = true},
--   },
--   flags = {
--     isNPC = true,
--     isJobEmployer = true,
--   },
-- }

-- NPCS[#NPCS + 1] = { -- runs
--   id = "darkmarket_runs",
--   pedType = 4,
--   model = "s_m_y_ammucity_01",
--   networked = false,
--   distance = 25.0,
--   position = {
--       coords = vector3(329.26, -1001.15, 28.28), 
--       heading = 4.18,
--       random = false
--   },
--   appearance = nil,
--   settings = {
--       {mode = "invincible", active = true},
--       {mode = "ignore", active = true},
--       {mode = "freeze", active = true},
--   },
--   flags = {
--     isNPC = true,
--     isJobEmployer = true,
--   },
-- }

-- NPCS[#NPCS + 1] = { -- chop chop
--   id = "darkmarket_chopchop",
--   pedType = 4,
--   model = "s_m_y_ammucity_01",
--   networked = false,
--   distance = 25.0,
--   position = {
--       coords = vector3(328.41, -994.33, 28.32), 
--       heading = 181.48,
--       random = false
--   },
--   appearance = nil,
--   settings = {
--       {mode = "invincible", active = true},
--       {mode = "ignore", active = true},
--       {mode = "freeze", active = true},
--   },
--   flags = {
--     isNPC = true,
--     isJobEmployer = true,
--   },
-- }

NPCS[#NPCS + 1] = { -- bennys
  id = "bennys",
  pedType = 4,
  model = "ig_benny",
  networked = false,
  distance = 25.0,
  position = {
      coords = vector3(122.56, -3026.71, 7.04 - 1), 
      heading = 308.19,
      random = false
  },
  appearance = nil,
  settings = {
      {mode = "invincible", active = true},
      {mode = "ignore", active = true},
      {mode = "freeze", active = true},
  },
  flags = {
    isNPC = true,
  },
}

RPC.register("ev-jobs:npc:getNPCs", function(src)
  return NPCS
end)