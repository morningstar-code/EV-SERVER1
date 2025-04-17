--[[
    Business
]]

RPC.register("CreateBusiness", function(pSource, pData)
    return createBusiness(pData)
end)

RPC.register("GetBusinessTypes", function(pSource)
    return getBusinessTypes()
end)

RPC.register("GetBusinesses", function(pSource)
    return getBusinesses()
end)

RPC.register("GetEmploymentInformation", function(pSource, pData)
    return getEmploymentInformation(pData)
end)

RPC.register("GetBusinessEmployees", function(pSource, pData)
    return getBusinessEmployees(pData)
end)

RPC.register("GetBusinessRoles", function(pSource, pData)
    return getBusinessRoles(pData)
end)

RPC.register("CreateBusinessRole", function(pSource, pData)
    return createBusinessRole(pData)
end)

RPC.register("ChangeBusinessRole", function(pSource, pData)
    return changeBusinessRole(pData)
end)

RPC.register("HireBusinessEmployee", function(pSource, pData)
    return hireBusinessEmployee(pData)
end)

RPC.register("EditBusinessRole", function(pSource, pData)
    return editBusinessRole(pData)
end)

RPC.register("DeleteBusinessRole", function(pSource, pData)
    return deleteBusinessRole(pData)
end)

RPC.register("RemoveBusinessEmployee", function(pSource, pData)
    return removeBusinessEmployee(pData)
end)

RPC.register("BusinessPayEmployee", function(pSource, pData)
    return businessPayEmployee(pData)
end)

RPC.register("BusinessPayExternal", function(pSource, pData)
    return businessPayExternal(pData)
end)

RPC.register("ChargeExternal", function(pSource, pData)
    return chargeExternal(pData)
end)

RPC.register("BusinessChargeAccept", function(pSource, pData)
    return businessChargeAccept(pData)
end)

RPC.register("GetBusinessSpawnByCode", function(pSource, pBusinessId)
    return getBusinessSpawnByCode(pBusinessId)
end)

RPC.register("GetBusinessIdByCode", function(pSource, pCode)
    return getBusinessIdByCode(pCode)
end)

RPC.register("IsEmployedAtBusiness", function(pSource, pData)
    return isEmployedAtBusiness(pData)
end)

RPC.register("ev-business:getLogs", function(pSource, pData, pBool)
    return getLogs(pData, pBool)
end)

RPC.register("ev-business:hasPermission", function(pSource, pCode, pPerm, pCid)
    if pCid == nil then
        local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
        if not user then return false end

        pCid = user.character.id
    else
        pCid = pCid
    end

    return hasPermission(pCode, pPerm, pCid)
end)

RPC.register("ev-business:purchaseHandler", function(pSource, pPrice, pItemId, pAmount)
    return purchaseHandler(pPrice, pItemId, pAmount)
end)

--[[
    Loans
]]

RPC.register("GetLoansByBusinessId", function(pSource, pBusinessId, pParams)
    return getLoansByBusinessId(pBusinessId, pParams)
end)

RPC.register("GetLoansByState", function(pSource)
    return getLoansByState()
end)

RPC.register("GetLoansByCharacterId", function(pSource, pCharacterId)
    return getLoansByCharacterId(pCharacterId)
end)

RPC.register("LoanOffer", function(pSource, pData)
    return offerLoan(pData)
end)

RPC.register("LoanAccept", function(pSource, pData)
    return acceptLoan(pSource, pData)
end)

RPC.register("LoanDefault", function(pSource, pData)
    return defaultLoan(pData)
end)

RPC.register("LoanPayment", function(pSource, pData)
    return loanPayment(pData)
end)

RPC.register("LoanStatePayment", function(pSource, pData)
    return loanStatePayment(pData)
end)

RPC.register("LoanFetchStateAmount", function(pSource)
    return loanFetchStateAmount()
end)

RPC.register("LoanStatePaymentAll", function(pSource)
    return loanStatePaymentAll()
end)

RPC.register("GetStateInterestRate", function(pSource)
    return getStateInterestRate()
end)

RPC.register("LoanHandleTrack", function(pSource, pData)
    return loanHandleTrack(pData)
end)