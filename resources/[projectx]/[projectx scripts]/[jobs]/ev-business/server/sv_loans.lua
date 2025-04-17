function getLoansByBusinessId(businessId, params) -- this is used in the employment app
    local limit = params.limit or 10
    local loanType = params.loanType -- 1-5 (Overdue, Outstanding, Defaulted, Archived, State Outstanding)
    local search = params.search or ""

    local query = [[
        SELECT
            l.character_id as 'id',
            c.first_name,
            c.last_name,
            c.phone_number,
            l.amount,
            l.payments_schedule_days,
            l.payments_total,
            l.interest_civ,
            l.note,
            l.last_payment,
            l.payments_count,
            l.civ_owed,
            l.created_at,
            l.state_owed,
            l.state_paid
        FROM
            _loan l
            LEFT JOIN characters c ON c.id = l.character_id
        WHERE
            l.business_id = @business_id
        LIMIT @limit
    ]]

    -- search
    -- if search ~= "" then
    --     query = query .. [[
    --         AND (
    --             c.first_name LIKE @search
    --             OR c.last_name LIKE @search
    --             OR c.phone_number LIKE @search
    --         )
    --     ]]
    -- end

    -- TODO: loan type

    local result = Await(SQL.execute(query, {
        business_id = businessId,
        limit = limit,
        --search = "%" .. search .. "%"
    }))

    if result == nil then
        return false, "Failed to get loans"
    end

    return true, result
end

function getLoansByState() -- this is used in the the state menu
    -- Perhaps they make 2 loan inserts, 1 for the civ to the loan business, and 1 loan from the state to the business
    return {}
end

function getLoansByCharacterId(characterId) -- this is used in the debt app
    local query = [[
        SELECT
            l.character_id as 'id',
            b.name as 'business_name',
            b.account_id as 'business_bank_account_id',
            l.amount,
            l.payments_schedule_days,
            l.payments_total,
            l.interest_civ,
            l.note,
            l.last_payment,
            l.payments_count,
            l.civ_owed,
            l.created_at,
            c.phone_number
        FROM
            _loan l
            LEFT JOIN _business b ON b.code = l.business_id
            LEFT JOIN characters c ON c.id = l.character_id
        WHERE
            l.character_id = @character_id
    ]]

    local result = Await(SQL.execute(query, {
        character_id = characterId
    }))

    if result == nil then
        return false, "Failed to get loans"
    end

    return true, result
end

function offerLoan(data)
    local state_id = data.state_id

    local serverId = FindPlayerIdById(state_id)
    if not serverId then
        return false, "Player not found."
    end

    TriggerClientEvent("loans:loanAcceptPrompt", serverId, data)

    return true, "Offered loan to player."
end

function acceptLoan(source, data) -- TODO: Figure out state_paid/state_owed and defaulted
    local requiredAmount = (data.amount / 100) * Config.DownpaymentRequirement
    local loanAmount = data.amount - requiredAmount

    local currAccountBalance = exports["ev-financials"]:getAccountBalance(data.character.bank_account_id)
    if currAccountBalance < requiredAmount then
        return false, "Need $" .. requiredAmount .. " for this loan."
    end

    local insertQ = [[
        INSERT INTO _loan (
            `character_id`,
            `business_id`,
            `amount`,
            `payments_schedule_days`,
            `payments_total`,
            `interest_state`,
            `interest_civ`,
            `note`,
            `created_by`,
            `last_payment`,
            `state_owed`,
            `civ_owed`,
            `created_at`
        ) VALUES (
            @character_id,
            @business_id,
            @amount,
            @payments_schedule_days,
            @payments_total,
            @interest_state,
            @interest_civ,
            @note,
            @created_by,
            @last_payment,
            @state_owed,
            @civ_owed,
            @created_at
        )
    ]]

    local result = Await(SQL.execute(insertQ, {
        character_id = data.state_id,
        business_id = data.business.code,
        amount = loanAmount,
        payments_schedule_days = data.schedule,
        payments_total = data.payments,
        interest_state = data.state_interest,
        interest_civ = data.interest,
        note = data.note,
        created_by = data.character.id,
        last_payment = os.time(),
        state_owed = data.amount, -- loanAmount
        civ_owed = loanAmount, -- data.amount
        created_at = os.time()
    }))

    if result == nil then
        return false, "Failed to create loan."
    end

    local success, accountId = exports["ev-financials"]:getDefaultBankAccount(data.character.id)
    if not success then
        return false, "Failed to get default bank account."
    end

    local success, message = exports["ev-financials"]:DoLoanTransaction(accountId, loanAmount, "Loan: " .. data.business.name .. " - " .. data.note)
    if not success then
        return false, message
    end

    return true, "Loan created."
end

function loanDefault(data)
    local loan = data.loan
    local character = data.character
end

function loanPayment(data)
    local loan = data.loan
    local character = data.character
    local amount = data.amount
end

function loanStatePayment(data)
    local loan = data.loan
    local character = data.character
    local amount = data.amount
end

function loanFetchStateAmount()
end

function loanStatePaymentAll()
end

function getStateInterestRate()
    return 5.0, 50.0
end

function loanHandleTrack()
end