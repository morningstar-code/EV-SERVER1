import { Base } from "@cpx/server";

export const InitEvents = async (): Promise<void> => { };

const dueAmountMappedToSize = {
    600: 8000,
    900: 10000,
    1200: 25000
} as { [key: number]: number };

setImmediate(async () => {
    const unitQquery = `
        SELECT * FROM _storage_units WHERE due_date < @due_date;
    `;

    const unitResult = await SQL.execute<{ unit_id: string, password: number, business_id: string, size: number, cid: number, due_date: number }[]>(unitQquery, {
        due_date: Date.now()
    });

    if (!unitResult || unitResult.length === 0) return;

    for (const unit of unitResult) {
        const query = `
            UPDATE _storage_units SET has_paid = @has_paid, due_amount = @due_amount, due_date = @due_date WHERE unit_id = @unit_id;
        `;

        const result = await SQL.execute(query, {
            has_paid: false,
            due_amount: dueAmountMappedToSize[unit.size],
            due_date: unitResult[0].due_date,
            unit_id: unit.unit_id
        });

        if (!result) return;
    }
});

RPC.register("ev-storageunits:server:hasAccess", async (pSource: number, pUnitId: string, pBusinessId: string, pPassword: number) => {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return [false, "Unknown error"];

    const result = await SQL.execute<{ password: string }[]>("SELECT * FROM _storage_units WHERE unit_id = @unit_id AND business_id = @business_id", {
        unit_id: pUnitId,
        business_id: pBusinessId
    });

    if (result.length === 0) return [false, "Wrong password"];

    if (Number(result[0].password) !== Number(pPassword)) return [false, "Wrong password"];

    return [true, "Access granted"];
});

RPC.register("ev-storageunits:server:updatePassword", async (pSource: number, pUnitId: string, pPassword: string) => {
    const result = await SQL.execute<SQLUnit[]>("SELECT * FROM _storage_units WHERE unit_id = @unit_id", {
        unit_id: pUnitId
    });

    if (result.length === 0) return [false, "Unit doesn't have a tenant. Unable to change password."];

    const updated = await SQL.execute<SQLInsertResult>("UPDATE _storage_units SET password = @password WHERE unit_id = @unit_id", {
        unit_id: pUnitId,
        password: pPassword
    });

    if (updated.affectedRows === 0) return [false, "Unable to update password"];

    return [true, "Password updated"];
});

RPC.register("ev-storageunits:server:getAccessLogs", (pSource: number, pCid: number) => {
    return [];
});

RPC.register("ev-storageunits:server:getUnitsWithTenants", async (pSource: number) => {
    const query = `
        SELECT
            u.*,
            ut.cid,
            b.name,
            c.phone_number
        FROM
            _storage_units u
            LEFT JOIN _storage_units_tenants ut ON ut.unit_id = u.unit_id
            LEFT JOIN _business b ON b.code = u.business_id
            LEFT JOIN characters c ON c.id = ut.cid
    `;

    const result = await SQL.execute<{ unit_id: string, password: number, business_id: string, size: number, cid: number }[]>(query);

    return result;
});

RPC.register("ev-storageunits:server:addTenant", async (pSource: number, pUnit: Unit, pStateId: number) => {
    const unitQuery = `
        INSERT INTO _storage_units (unit_id, password, business_id, size, has_paid, due_amount, due_date) VALUES (@unit_id, @password, @business_id, @size, @has_paid, @due_amount, @due_date);
    `;

    const unitResult = await SQL.execute(unitQuery, {
        unit_id: pUnit.id,
        password: 1234,
        business_id: pUnit.business,
        size: pUnit.size,
        has_paid: true,
        due_amount: 0,
        due_date: Date.now() + (1000 * 60 * 60 * 24 * 7)
    });

    if (!unitResult) return [false, "Failed to add unit to records."];

    const tenantQuery = `
        INSERT INTO _storage_units_tenants (unit_id, cid) VALUES (@unit_id, @cid);
    `;

    const tenantResult = await SQL.execute(tenantQuery, {
        unit_id: pUnit.id,
        cid: pStateId,
    });

    if (!tenantResult) return [false, "Failed to add tenant to records."];

    return [true, "Successfully added unit to records."];
});

RPC.register("ev-storageunits:server:removeTenant", async (pSource: number, pUnitId: string) => {
    const unitQuery = `
        DELETE FROM _storage_units WHERE unit_id = @unit_id;
    `;

    const unitResult = await SQL.execute(unitQuery, {
        unit_id: pUnitId
    });

    if (!unitResult) return [false, "Failed to remove unit from records."];

    const tenantQuery = `
        DELETE FROM _storage_units_tenants WHERE unit_id = @unit_id;
    `;

    const tenantResult = await SQL.execute(tenantQuery, {
        unit_id: pUnitId
    });

    if (!tenantResult) return [false, "Failed to remove tenant from records."];

    return [true, "Successfully removed unit from records."];
});

RPC.register("ev-storageunits:server:changePassword", async (pSource: number, pUnitId: string, pPassword: number) => {
    const query = `
        UPDATE _storage_units SET password = @password WHERE unit_id = @unit_id;
    `;

    const result = await SQL.execute(query, {
        unit_id: pUnitId,
        password: pPassword
    });

    if (!result) return [false, "Failed to change password."];

    return [true, "Successfully changed password."];
});

RPC.register("ev-storageunits:server:makePayment", async (pSource: number, pUnitId: string) => {
    const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
    if (!user) return [false, "Failed to make payment."];

    const unitQuery = `
        SELECT * FROM _storage_units WHERE unit_id = @unit_id;
    `;

    const unitResult = await SQL.execute<{ due_amount: number }[]>(unitQuery, {
        unit_id: pUnitId
    });

    if (!unitResult || unitResult.length === 0) return [false, "Failed to make payment."];
    if (unitResult[0].due_amount === 0) return [false, "Unit doesn't have any due payments."];

    const [success, accountId] = await global.exports["ev-financials"].getDefaultBankAccount(user.character.id);
    if (!success) return [false, accountId];

    const balance = await global.exports["ev-financials"].getAccountBalance(accountId);
    if (balance < unitResult[0].due_amount) return [false, "You don't have enough money in your bank account."];

    const [businessSuccess, businessAccountId] = await global.exports["ev-financials"].getBusinessAccountId("paynless");
    if (!businessSuccess) return [false, businessAccountId];

    const transactionResult = await global.exports["ev-financials"].DoBusinessTransaction(-1, accountId, businessAccountId, Number(unitResult[0].due_amount), 2, "Unit Purchase", user.character.id, Number(unitResult[0].due_amount), "purchase");
    if (!transactionResult) return [false, "Failed to complete transaction."];

    const query = `
        UPDATE _storage_units SET has_paid = @has_paid, due_amount = @due_amount, due_date = @due_date WHERE unit_id = @unit_id;
    `;

    const result = await SQL.execute(query, {
        unit_id: pUnitId,
        has_paid: true,
        due_amount: 0,
        due_date: Date.now() + (1000 * 60 * 60 * 24 * 7)
    });

    if (!result) return [false, "Failed to make payment."];

    return [true, "Successfully made payment."];
});