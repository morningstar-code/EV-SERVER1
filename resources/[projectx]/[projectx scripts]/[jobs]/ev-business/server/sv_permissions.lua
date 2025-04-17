local accessDefinitions = {
    hire = 1,
    fire = 2,
    change_role = 3,
    pay_employee = 4,
    pay_external = 5,
    charge_external = 6,
    property_keys = 12,
    stash_access = 24,
    view_logs = 48
}

function hasAccessPermission(pAccessLevel, pPermission)
    local mask, hasAccess = accessDefinitions[pPermission], false

    if mask then
        hasAccess = (pAccessLevel & mask) > 0
    end

    return hasAccess
end

function buildPermissions(pAccessLevel, pIsOwner)
    local permissions = {}

    for permission, mask in pairs(accessDefinitions) do
        if pIsOwner == 1 or hasAccessPermission(pAccessLevel, permission) then
            permissions[#permissions + 1] = permission
        end
    end

    return permissions
end

function reversePermissions(pPermissions)
    local permissions = 0

    for _, permission in pairs(pPermissions) do
        permissions = permissions + accessDefinitions[permission]
    end

    return permissions
end