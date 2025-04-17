local blips = {
    {id = "casino1", name = "Casino Resort", color = 5, sprite = 207, x = 925.329, y = 46.152, z = 80.908 },
    {id = "hosp3", name = "LS Central Hospital", scale = 0.75, color = 3, sprite = 61, x = 352.73300170898, y= -1399.7823486328, z= 32.49934387207},
    {id = "police1", name = "Police Department HQ", color = 3, sprite = 60, x = 425.130, y = -979.558, z = 30.711},
    {id = "police2", name = "Police Air HQ", color = 3, sprite = 43, x = 449.359, y = -980.727, z = 42.60},

    {id = "cloth1", name = "Clothing", scale = 0.6, color = 3, sprite = 73, x = 425.236, y=-806.008, z=29.491},
    {id = "cloth2", name = "Clothing", scale = 0.6, color = 3, sprite = 73, x = -162.658, y=-303.397, z=39.733},
    {id = "cloth3", name = "Clothing", scale = 0.6, color = 3, sprite = 73, x = 75.950, y=-1392.891, z=29.376},
    {id = "cloth4", name = "Clothing", scale = 0.6, color = 3, sprite = 73, x = -822.194, y=-1074.134, z=11.328},
    {id = "cloth5", name = "Clothing", scale = 0.6, color = 3, sprite = 73, x = -1450.711, y=-236.83, z=49.809},
    {id = "cloth6", name = "Clothing", scale = 0.6, color = 3, sprite = 73, x = 4.254, y=6512.813, z=31.877},
    {id = "cloth7", name = "Clothing", scale = 0.6, color = 3, sprite = 73, x = 615.180, y=2762.933, z=44.088},
    {id = "cloth8", name = "Clothing", scale = 0.6, color = 3, sprite = 73, x = 1196.785, y=2709.558, z=38.222},
    {id = "cloth9", name = "Clothing", scale = 0.6, color = 3, sprite = 73, x = -3171.453, y=1043.857, z=20.863},
    {id = "cloth10", name = "Clothing", scale = 0.6, color = 3, sprite = 73, x = -1100.959, y=2710.211, z=19.107},
    {id = "cloth11", name = "Clothing", scale = 0.6, color = 3, sprite = 73, x = -1192.9453125, y=-772.62481689453, z=17.3254737854},
    {id = "cloth12", name = "Clothing", scale = 0.6, color = 3, sprite = 73, x = -707.33416748047, y=-155.07914733887, z=37.415187835693},
    {id = "cloth13", name = "Clothing", scale = 0.6, color = 3, sprite = 73, x = 1683.45667, y=4823.17725, z=42.1631294},
    {id = "cloth14", name = "Clothing", scale = 0.6, color = 3, sprite = 73, x =121.76, y=-224.6, z=54.56},
    {id = "cloth15", name = "Clothing", scale = 0.6, color = 3, sprite = 73, x = 1950.24, y = 3766.1, z = 32.6},

    {id = "bar1", name = "Bahama Mamas", sprite = 93, x = -1388.53430175781, y=-586.615295410156, z=29.2186660766602},
    {id = "bar2", name = "Tequilala", sprite = 93, x =-564.68, y= 276.15, z =83.12 },
    {id = "bar3", name = "Split Sides Comedy Club", sprite = 93, x = -439.4, y= 272.8, z =86.3 },
    {id = "pcenter", name = "Payments & Internet Center", scale = 1.3, sprite = 351, color = 17, x=-1081.8293457031, y=-248.12872314453, z=37.763294219971},
    {id = "ttruckjob", name = "Impound Lot", color = 17, sprite = 68, x = -189.88, y = -1163.99, z = 23.68},
    {id = "ottosauto", name = "Otto's Auto", color = 17, sprite = 227, x = 834.9, y = -821.57, z = 26.35},
    {id = "ottospastels", name = "PASTELS", color = 17, sprite = 366, x = 717.24, y = -965.05, z = 26.35},
    {id = "diving", name = "Diving", color = 17, sprite = 597, x = -1612.113, y = 5257.893, z = 3.974}, 
    {id = "lsbb", name = "Los Santos Billboards", color = 32, sprite = 475, x = -915.05, y = -452.75, z = 39.38},
    {id = "ironhog", name = "Iron Hog", color = 1, sprite = 226, x = 1769.51, y = 3327.99, z = 40.57},

    {id = "fire1", name = "Fire Station",scale = 0.9, color = 1, sprite = 153, x = 205.30201721191, y = -1651.4327392578, z = 29.803213119507},
    {id = "fire2", name = "Fire Tower",scale = 0.9, color = 1, sprite = 153, x =  -1195.5244140625, y = -1788.2210693359, z = 19.490871429443},

    {id = "fire3", name = "Fire Main",scale = 0.9, color = 1, sprite = 153, x =  1206.3913574219, y = -1473.1184082031, z = 34.859497070313},

    {id = "fishingsales", name = "Fish Sales", scale = 0.7, color = 3, sprite = 304, x=-1507.86, y=1503.53, z=114.29},
    {id = "huntingshop", name = "Sporting & Survival", scale = 0.7, color = 3, sprite = 141, x=-675.3189, y=5836.144, z=17.70478},
    {id = "huntingsales", name = "Hunting Sales", scale = 0.7, color = 3, sprite = 442, x=569.32, y= 2796.66, z=14.14},

    {id = "bobcatsecurity", name = "Bobcat Security", scale = 0.7, color = 2, sprite = 498, x=880.8951, y=-2258.308, z=32.53486},
    {id = "airshop", name = "Aircraft Sales & Rentals", scale = 0.7, color = 2, sprite = 307, x=-1621.42, y=-3152.99, z=14.0},
    {id = "boatshop", name = "Boat Sales", scale = 0.7, color = 2, sprite = 427, x=-876.42, y=-1324.7, z=1.61},
    {id = "veh_rentals", name = "Vespucci Vehicle Rentals", scale = 0.5, color = 2, sprite = 326, x=-291.672, y=-1020.935, z=29.741}, 

    {id = "veh_rentals2", name = "Paleto Vehicle Rentals", scale = 0.5, color = 2, sprite = 326, x=-247.94, y=6205.98, z=30.82},

    {id = "flight_school", name = "Flight School - AirX", scale = 0.6, color = 3, sprite = 307, x=-1875.02, y=2811.66, z=32.81},

    {id = "townhallfucktobi", name = "Davis City Hall", scale = 0.7, color = 25, sprite = 438, x=323.4, y=-1629.7, z=32.5},

    {id = "galleryvlc", name = "The Gallery", scale = 0.6, color = 18, sprite = 617, x=-424.47, y=22.29, z=46.27},
    {id = "bobmulet", name = "Bob Mulet", scale = 0.6, color = 9, sprite = 71, x=-817.28, y=-184.71, z=37.57},
    {id = "wuchangr", name = "Wu Chang Records", scale = 0.6, color = 18, sprite = 136, x=-834.16, y=-697.75, z=27.28},
    {id = "PDM", name = "Premium Deluxe Motorsports", scale = 0.7, color = 7, sprite = 326, x=-33.737, y=-1102.322, z= 26.422},
    {id = "Tuner", name = "Tuner Shop", scale = 0.7, color = 7, sprite = 326, x=155.79, y = -3031.23, z = 7.04},
    {id = "Bicycles", name = "Bicycle Shop", scale = 0.7, color = 7, sprite = 226, x=-1100.69, y= -1702.88, z= 4.38},
    
    {id = 'TaxiRank', name = 'Taxi Rank', scale = 0.7, color = 5, sprite = 56, x = -12.72, y = -143.3, z = 56.26},

    {id = "tattoos", name = "Blazing Tattoo", scale = 0.5, color = 1, sprite = 75, x=322.139, y=180.467, z=103.587},
    {id = "tattoos2", name = "The Pit Tattoo Parlor", scale = 0.5, color = 1, sprite = 75, x = -1153.7, y = -1425.54, z = 4.96},


    {id = 'winery', name = 'The Winery', scale = 0.6, color = 6, sprite = 478, x = -1889.86, y = 2036.54, z = 140.83},


    {id = 'HarmonyRepairs', name = 'Harmony Repairs', scale = 0.7, color = 12, sprite = 478, x = 1183.18, y = 2651.66, z = 37.81},
    {id = 'HayesAutos', name = 'Hayes Autos Repairs', scale = 0.7, color = 12, sprite = 478, x = -1416.86, y = -447.97, z = 35.91},

     {id = "burgies", name = "Burger Shot", scale = 0.7, color = 8, sprite = 106, x = -1199.61, y = -899.79, z = 14.0},
     {id = "SnrB", name = "Snr Buns", scale = 0.7, color = 1, sprite = 120, x=-513.33, y= -695.67, z= 33.67},

     {id = "cbc", name = "Cerberus Business Center", scale = 0.6, color = 1, sprite = 89, x = -114.54, y = -605.52, z = 36.29},

     {id = "roosters", name = "Roosters Rest", scale = 0.6, color = 8, sprite = 93, x = -163.40, y = 297.81, z = 98.50},
     {id = "tavern", name = "The Tavern", scale = 0.7, color = 10, sprite = 93, x = 1216.33, y = -417.62, z = 67.72},

    {id = "di", name = "Driving School", scale = 0.6, color = 44, sprite = 380, x = -37.73983, y= -205.6322, z= 45.78902},
    {id = "digitalden", name = "Digital Den", scale = 0.8, color = 26, sprite = 619, x=1136.88, y=-474.85, z=66.44},
    {id = "pps", name = "Pet Store", scale = 0.6, color = 35, sprite = 141, x=-280.94, y=6291.74, z=35.18},
    {id = "pfm", name = "Farmers Market (Day)", scale = 0.6, color = 7, sprite = 479, x=-293.13, y=6127.71, z=31.51},
    {id = "dwfm", name = "Farmers Market (Night)", scale = 0.6, color = 7, sprite = 479, x=-1696.68, y=-1059.89, z=13.02},
    {id = "deanworld", name = "Dean World", scale = 0.6, color = 59, sprite = 266, x=-1591.7, y=-1063.21, z=13.02},
    {id = "newscenter", name = "LS News Center", scale = 0.8, color = 5, sprite = 135, x=-582.95, y=-930.09, z=36.84},

    {id = "hunting", name = "Legal Hunting Area", scale = 0.8, color = 3, sprite = 141, x=-838.5, y=4176.4, z=192.5 },
    {id = "scrapyard", name = "Scrapyard", color = 5, sprite = 566, x =-455.73, y = -1707.39, z = 18.8},
    {id = "sionis", name = "Sionis Industries", color = 1, sprite = 566, x =1063.01, y = -2005.72, z = 30.04},
    
    {id = "nerdscomic", name = "Guild Hall", color = 48, sprite = 183, x =-144.41, y = 226.49, z = 94.99},

    {id = "overboostdrift", name = "Overboost Drift School", color = 1, sprite = 467, x = -194.71, y = -2507.77, z = 6.15 },
}

local circles = {
    { id = "hunting", name = "Legal Hunting Area", opacity = 80, radius = 1000.0, color = 1, sprite = 9, x=-838.5, y=4176.4, z=192.5 },
}


local circleBlips = {}

AddEventHandler("ev-base:playerSessionStarted", function()
    Citizen.CreateThread(function()
        for k,v in ipairs(blips) do
            CPX.BlipManager:CreateBlip(v.id, v)
        end
        for k,v in ipairs(circles) do
            local blip = AddBlipForRadius(v.x,v.y,v.z,v.radius)
            SetBlipColour(blip,v.color)
            SetBlipAlpha(blip,v.opacity)
            SetBlipSprite(blip,9)
            circleBlips[#circleBlips+1] = {
                blip = blip,
                data = v
            }
        end
    end)
end)

AddEventHandler('ev-island:hideBlips', function(pState)
    for k,v in ipairs(blips) do
        CPX.BlipManager:HideBlip(v.id, pState)
    end
    for _,blipData in ipairs(circleBlips) do
        if pState then
            SetBlipAlpha(blipData.blip, 0)
        else
            SetBlipAlpha(blipData.blip, blipData.data.opacity)
        end
    end
end)
