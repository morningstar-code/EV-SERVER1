CPX = {}
CPX.Jobs = {}
CPX.Jobs.ValidJobs = {
    ["unemployed"] = {
        name = "Unemployed",
        paycheck = 50, -- * 8
        decor = 0,
        requiresDriversLicense = false
    },
    ["garbage"] = {
        name = "Garbage Colleter",
        paycheck = 50, -- * 8
        decor = 0,
        requiresDriversLicense = true
    },
    ["waterandpower"] = {
        name = "Water & Power",
        paycheck = 50, -- * 8
        decor = 0,
        requiresDriversLicense = true
    },
    ["ems"] = {
        name = "EMS",
        paycheck = 390,
        garages = { "pillbox_ambulance", "ems_shared", "ems_shared_heli" },
        whitelisted = true,
        ranks = {
            [1] = "EMT",
            [2] = "Paramedic",
            [3] = "Lieutenant of EMS",
            [4] = "Assistant Chief",
            [5] = "Chief of EMS",
        },
        decor = 1,
        requiresDriversLicense = false,
    },
    ["police"] = {
        name = "Police officer",
        paycheck = 330,
        whitelisted = true,
        ranks = {
            [1] = "Cadet",
            [2] = "Trooper",
            [3] = "Corporal",
            [4] = "Sergeant",
            [5] = "Staff Sergeant",
            [6] = "Inspector",
            [7] = "Lieutenant",
            [8] = "Captain",
            [9] = "Major",
            [10] = "Commander",
            [11] = "Lieutenant Colonel",
            [12] = "Assistant Chief",
            [13] = "Chief of Police",
        },
        garages = { "mrpd_garage", "pd_shared", "pd_shared_bike", "vbpd_garage", "paleto_garage", "pd_shared_heli", "rangers_garage", "sheriff_shared_heli", "sheriff_shared" },
        decor = 2,
        requiresDriversLicense = true
    },
    ["foodtruck"] = {
        name = "Food Truck",
        paycheck = 0,
        decor = 4,
        requiresDriversLicense = true
    },
    ["taxi"] = {
        name = "Taxi driver",
        paycheck = 0,
        decor = 5,
        requiresDriversLicense = true
    },
    ["trucker"] = {
        name = "Delivery Job",
        paycheck = 0,
        decor = 6,
        requiresDriversLicense = true
    },
    ["entertainer"] = {
        name = "Entertainer",
        paycheck = 110,
        decor = 7,
        requiresDriversLicense = false
    },
    ["news"] = {
        name = "News Reporter",
        paycheck = 180,
        decor = 8,
        requiresDriversLicense = false
    },
    ["defender"] = {
        name = "Public Defender",
        paycheck = 230,
        decor = 9,
        whitelisted = true,
        requiresDriversLicense = false
    },
    ["district attorney"] = {
        name = "District Attorney",
        paycheck = 150,
        decor = 10,
        whitelisted = true,
        requiresDriversLicense = false
    },
    ["judge"] = {
        name = "Judge",
        paycheck = 310,
        decor = 11,
        whitelisted = true,
        requiresDriversLicense = false
    },
    ["broadcaster"] = {
        name = "Broadcaster",
        paycheck = 220,
        decor = 12,
        requiresDriversLicense = false
    },
    ["doctor"] = {
        name = "Doctor",
        paycheck = 310,
        garages = { "pillbox_ambulance", "ems_shared", "ems_shared_heli" },
        decor = 13,
        whitelisted = true,
        requiresDriversLicense = false
    },
    ["therapist"] = {
        name = "Therapist",
        paycheck = 300,
        decor = 14,
        whitelisted = true,
        requiresDriversLicense = false
    },
    ["driving instructor"] = {
        name = "Driving Instructor",
        paycheck = 260,
        garages = { "garage_drivingschool", "garage_drivingschool_back" },
        decor = 15,
        whitelisted = true,
        requiresDriversLicense = true
    },
    ["foodtruckvendor"] = {
        name = "Food Truck Vendor",
        paycheck = 0,
        decor = 16,
        requiresDriversLicense = false
    },
    ["doc"] = {
        name = "Department of Corrections officer",
        garages = { "mrpd_garage", "pd_shared", "pd_shared_bike", "pd_shared_heli" },
        paycheck = 250,
        decor = 17,
        whitelisted = true,
        requiresDriversLicense = true
    },
    ["mayor"] = {
        name = "Mayor",
        paycheck = 360,
        decor = 18,
        whitelisted = true,
        requiresDriversLicense = false
    },
    ["deputy_mayor"] = {
        name = "Deputy Mayor",
        paycheck = 290,
        decor = 19,
        whitelisted = true,
        requiresDriversLicense = false
    },
    ["county_clerk"] = {
        name = "County Clerk",
        paycheck = 210,
        decor = 20,
        whitelisted = true,
        requiresDriversLicense = false
    }
}

exports("JobsList", function()
    return CPX.Jobs.ValidJobs
end)