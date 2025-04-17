RPC.register("ev-business:hasGarageAccess", function(pSource, pBusinessId)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return end

    local businessId = pBusinessId

    return isEmployedAtBusiness({
        character = { id = user.character.id },
        business = { id = businessId }
    })
end)