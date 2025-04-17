import { GetJobProgression } from "../../npcs";

const impoundRankRequiredXp = new Map<string, number>([
    ["Amateur", 0],
    ["Apprentice", 500],
    ["Recognized", 1000],
    ["Respected", 1500],
    ["Distinguished", 3000],
    ["Prominent", 6000],
    ["Legendary", 9000]
]) as any;

const impoundRankMultipliers = new Map<string, number>([
    ["Amateur", 1],
    ["Apprentice", 1],
    ["Recognized", 1.25],
    ["Respected", 1.5],
    ["Distinguished", 2],
    ["Prominent", 2.5],
    ["Legendary", 3]
]) as any;

export function IsImpoundRank(rank: string): boolean {
    return GetJobProgression("impound") >= impoundRankRequiredXp.get(rank);
}

export function GetImpoundRankMultiplier(rank: string): number {
    return impoundRankMultipliers.get(rank);
}

export function GetImpoundRank() {
    let foundRank, foundValue;
    const progression = GetJobProgression("impound");
    for (const [rank, value] of impoundRankRequiredXp) {
        if (!foundRank || progression > value && value > foundValue) {
            foundRank = rank;
            foundValue = value;
        }
    }
    return foundRank;
}

export function GetImpoundCurAndNext() {
    var p1, p2, p3;

    if (!impoundRankRequiredXp) return { current: "Unknown", next: "Stranger", amount: 0 };

    const requiredXpArray = Array.from(impoundRankRequiredXp, ([name, value]) => ({
        name: name,
        value: value
    }));

    const progression = (p1 = GetJobProgression("impound")) !== null && p1 !== void 0 ? p1 : 0;
    let name = requiredXpArray[0].name;
    let value = 0;

    requiredXpArray.forEach(rank => {
        const rankValue = Number(rank.value);
        if (rankValue <= progression && value < rankValue) {
            value = rankValue;
            name = rank.name;
        }
    });

    const foundRank = requiredXpArray[requiredXpArray.findIndex(rank => rank.value === value) + 1];
    const pName = (p2 = foundRank === null || foundRank === void 0 ? void 0 : foundRank.name) !== null && p2 !== void 0 ? p2 : name;
    const pValue = (p3 = foundRank === null || foundRank === void 0 ? void 0 : foundRank.value) !== null && p3 !== void 0 ? p3 : value;
    const pAmount = (progression - value) / (Number(pValue) - value) * 100;

    return {
        current: name,
        next: pName,
        amount: pAmount !== Infinity ? pAmount : 100
    };
}