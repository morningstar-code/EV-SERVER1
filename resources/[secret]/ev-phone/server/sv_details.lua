local licenseIdMappedToName = {
    ["Pilot"] = "Pilot License",
    ["Fishing"] = "Fishing License",
    ["Business"] = "Business License",
    ["Bar"] = "Bar License",
    ["Hunting"] = "Hunting License",
    ["Driver"] = "Drivers License",
    ["Weapon"] = "Weapon License",
    ["WeaponClass2"] = "Class 2 License",
}

RPC.register("GetLicenses", function(pSource, pCharacterId)
    local licenses = exports["ev-gov"]:getLicenses(pSource, pCharacterId)

    local licenseList = {}

    for k,v in pairs(licenses) do
        table.insert(licenseList, {name = licenseIdMappedToName[k] or k, status = v == 1})
    end

    return true, licenseList
end)