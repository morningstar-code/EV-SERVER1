function getCrypto(pCharacterId)
    local availableCryptos = Await(SQL.execute("SELECT * FROM _phone_crypto", {}))

    if not availableCryptos then return false, "Failed to fetch cryptos" end

    generateCryptoWallet(pCharacterId)

    local myWallet = Await(SQL.execute("SELECT * FROM user_crypto WHERE cid = @cid", {
        cid = pCharacterId
    }))

    if not myWallet then return false, "Failed to fetch wallet" end

    local cryptos = {}

    for k,v in pairs(availableCryptos) do
        local crypto = {
            id = v.crypto_id,
            name = v.crypto_name,
            ticker = v.crypto_ticker,
            price = v.crypto_price,
            icon = v.crypto_icon,
            show_price = v.show_price,
            can_purchase = v.can_purchase,
            can_sell = v.can_sell,
            can_exchange = v.can_exchange
        }

        -- If they dont have this crypto in their wallet, add it

        local found = false

        for k2,v2 in pairs(myWallet) do
            if v2.crypto_id == v.crypto_id then
                crypto.amount = v2.crypto_amount
                crypto.wallet_id = v2.id
                found = true
                break
            end
        end

        if not found then
            local insert = Await(SQL.execute("INSERT INTO user_crypto (crypto_id, crypto_amount, cid) VALUES (@crypto_id, @crypto_amount, @cid)", {
                crypto_id = v.crypto_id,
                crypto_amount = 0,
                cid = cid
            }))
        end

        cryptos[#cryptos+1] = crypto
    end

    return true, cryptos
end

function purchaseCryptoByPhone(pCharacterId, pBankId, pCryptoId, pAmount)
    local crypto = Await(SQL.execute("SELECT * FROM _phone_crypto WHERE crypto_id = @crypto_id", {
        crypto_id = pCryptoId
    }))

    if not crypto then return false, "Invalid crypto" end

    local balance = exports["ev-financials"]:getAccountBalance(pBankId)

    local calculatedPrice = tonumber(crypto[1].crypto_price or 100) * pAmount

    if tonumber(balance or 0) < calculatedPrice then return false, "You can't afford this!" end

    local transactionResult = exports["ev-financials"]:DoTransaction(-1, pBankId, 7, calculatedPrice, "Bought " .. tostring(pAmount) .. " " .. crypto[1].crypto_ticker, 1, "transfer")
    if not transactionResult.success then return false, transactionResult.message end

    local update = Await(SQL.execute("UPDATE user_crypto SET crypto_amount = crypto_amount + @crypto_amount WHERE cid = @cid AND crypto_id = @crypto_id", {
        crypto_amount = pAmount,
        cid = pCharacterId,
        crypto_id = pCryptoId
    }))

    if not update then return false, "Failed to purchase crypto" end

    return true, "Successfully purchased crypto"
end

function transferCryptoByPhone(pCharacterId, pTargetNumber, pCryptoId, pAmount)
    local isValidCrypto = Await(SQL.execute("SELECT COUNT(*) AS total FROM _phone_crypto WHERE crypto_id = @crypto_id", {
        crypto_id = pCryptoId
    }))

    if isValidCrypto[1].total == 0 then return false, "Invalid crypto ID" end

    local target = Await(SQL.execute("SELECT * FROM characters WHERE phone_number = @phone_number", {
        phone_number = pTargetNumber
    }))

    if not target then return false, "Invalid target number" end
    -- Check if they have enough crypto

    local myCrypto = Await(SQL.execute("SELECT crypto_amount FROM user_crypto WHERE cid = @cid AND crypto_id = @crypto_id", {
        cid = pCharacterId,
        crypto_id = pCryptoId
    }))

    if not myCrypto then return false, "Failed to fetch wallet" end

    if tonumber(myCrypto[1].crypto_amount or 0) < tonumber(pAmount or 0) then return false, "You don't have enough crypto" end

    -- Update their crypto

    local update = Await(SQL.execute("UPDATE user_crypto SET crypto_amount = crypto_amount - @crypto_amount WHERE cid = @cid AND crypto_id = @crypto_id", {
        crypto_amount = pAmount,
        cid = pCharacterId,
        crypto_id = pCryptoId
    }))

    if not update then return false, "Failed to update wallet" end

    -- Update their target's crypto

    local update = Await(SQL.execute("UPDATE user_crypto SET crypto_amount = crypto_amount + @crypto_amount WHERE cid = @cid AND crypto_id = @crypto_id", {
        crypto_amount = pAmount,
        cid = target[1].id or 0,
        crypto_id = pCryptoId
    }))

    if not update then return false, "Failed to update target wallet" end

    return true, "Successfully transferred crypto"
end

function sellCryptoByPhone(pCharacterId, pBankId, pCryptoId, pAmount)
    -- TODO;
end

function useCrypto(pCryptoId, pAmount)
    -- TODO;
end

function addCrypto(pSource, pCryptoId, pAmount)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return false, "Invalid user" end

    local crypto = Await(SQL.execute("SELECT * FROM _phone_crypto WHERE crypto_id = @crypto_id", {
        crypto_id = pCryptoId
    }))

    if not crypto then return false, "Invalid crypto" end

    local update = Await(SQL.execute("UPDATE user_crypto SET crypto_amount = crypto_amount + @crypto_amount WHERE cid = @cid AND crypto_id = @crypto_id", {
        crypto_amount = pAmount,
        cid = user.character.id,
        crypto_id = pCryptoId
    }))

    if not update then return false, "Failed to add crypto" end

    return true, "Successfully added crypto"
end

exports("addCrypto", addCrypto)

function removeCrypto(pSource, pCryptoId, pAmount)
    local user = exports["ev-base"]:getModule("Player"):GetUser(pSource)
    if not user then return false, "Invalid user" end

    local crypto = Await(SQL.execute("SELECT * FROM _phone_crypto WHERE crypto_id = @crypto_id", {
        crypto_id = pCryptoId
    }))

    if not crypto then return false, "Invalid crypto" end

    local update = Await(SQL.execute("UPDATE user_crypto SET crypto_amount = crypto_amount - @crypto_amount WHERE cid = @cid AND crypto_id = @crypto_id", {
        crypto_amount = pAmount,
        cid = user.character.id,
        crypto_id = pCryptoId
    }))

    if not update then return false, "Failed to remove crypto" end

    return true, "Successfully removed crypto"
end

exports("removeCrypto", removeCrypto)

function removeCryptoByWalletId(pWalletId, pAmount)
    local crypto = Await(SQL.execute("SELECT * FROM user_crypto WHERE id = @id", {
        id = pWalletId
    }))

    if not crypto then return false, "Invalid crypto" end

    local update = Await(SQL.execute("UPDATE user_crypto SET crypto_amount = crypto_amount - @crypto_amount WHERE id = @id", {
        crypto_amount = tonumber(pAmount or 0),
        id = pWalletId
    }))

    if not update then return false, "Failed to remove crypto" end

    return true, "Successfully removed crypto"
end

exports("removeCryptoByWalletId", removeCryptoByWalletId)

function getCryptoBalanceById(pId, pCharacterId)
    local crypto = Await(SQL.execute("SELECT * FROM _phone_crypto WHERE crypto_id = @crypto_id", {
        crypto_id = pId
    }))

    if not crypto then return false, "Invalid crypto" end

    local myWallet = Await(SQL.execute("SELECT * FROM user_crypto WHERE cid = @cid AND crypto_id = @crypto_id", {
        cid = pCharacterId,
        crypto_id = pId
    }))

    if not myWallet then return false, "Failed to fetch wallet" end

    return true, myWallet[1].crypto_amount
end

exports("getCryptoBalanceById", getCryptoBalanceById)

function getCryptoWalletById(pWalletId)
    local myWallet = Await(SQL.execute("SELECT * FROM user_crypto WHERE id = @id", {
        id = pWalletId
    }))

    if not myWallet then return false, "Failed to fetch wallet" end

    return true, myWallet[1]
end

exports("getCryptoWalletById", getCryptoWalletById)

function generateCryptoWallet(pCharacterId)
    local availableCryptos = Await(SQL.execute("SELECT * FROM _phone_crypto", {}))

    if not availableCryptos then return false, "Failed to fetch cryptos" end

    for k,v in pairs(availableCryptos) do
        local hasCrypto = Await(SQL.execute("SELECT COUNT(*) AS total FROM user_crypto WHERE cid = @cid AND crypto_id = @crypto_id", {
            cid = pCharacterId,
            crypto_id = v.crypto_id
        }))
        if not hasCrypto then return false, "Failed to fetch wallet" end
        if hasCrypto[1].total == 0 then
            local insert = Await(SQL.execute("INSERT INTO user_crypto (crypto_id, crypto_amount, cid) VALUES (@crypto_id, @crypto_amount, @cid)", {
                crypto_id = v.crypto_id,
                crypto_amount = 0,
                cid = pCharacterId
            }))
        end
    end

    return true, "Successfully generated crypto wallet"
end