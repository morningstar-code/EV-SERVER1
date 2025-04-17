Market = {}
Market.Account = "gne" -- Account used to buy items
Market.TargetSystem = "qtarget" -- qb-target or qtarget, if using ox_target it will automatically convert it
Market.BlipCoords = {2168.10, 3330.53, 46.81}
Market.BlipIcon = 306
Market.BlipScale = 0.8
Market.BlipColor = 3
Market.Categories = {
    { name = "bennys", label = "Bennys", job = false }, 
    { name = "drugs", label = "Drugs", job = false }, -- it will restrict the category to X job, or set false
    { name = "weapons", label = "Weapons", job = false },
}
-- Job = false or "jobName" will make the category restricted
Market.Items = {
    {name = "advrepairkit", label = "Advanced Repair Kit", category = "bennys", stock = 20, price = 5},
    {name = "harness", label = "Harness", category = "bennys", stock = 20, price = 25},
    {name = "fakeplates", label = "Fake Plates", category = "bennys", stock = 20, price = 15},
    {name = "nitrous", label = "Nitrous", category = "bennys", stock = 20, price = 50},
    {name = "hackingdevice", label = "Hacking Device", category = "bennys", stock = 20, price = 175},
    {name = "trackerdisabler", label = "Tracker Disabler", category = "bennys", stock = 20, price = 50},
}

--phonedongle ADD SOMEWHERE