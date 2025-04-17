export async function IsEmployedAtBusiness(pBusinessId: string, pCharacterId: number) {
    // const [success] = await RPC.execute<[boolean, boolean]>("IsEmployedAtBusiness", {
    //     character: { id: pCharacterId },
    //     business: { id: pBusinessId }
    // });
    //return success;

    return new Promise((resolve) => {
        const isEmployed = global.exports["ev-business"].IsEmployedAt(pBusinessId);
        resolve(isEmployed);
    });
}