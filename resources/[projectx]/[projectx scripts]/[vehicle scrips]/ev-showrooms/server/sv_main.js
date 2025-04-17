RPC.register("ev-showroom:getCarConfigByHash", async (pSource, pHash) => {
    const results = await SQL.execute("SELECT * FROM _car_config WHERE hash = ?", [pHash]);
    if (results.length > 0) {
        return results[0];
    }

    return null;
});