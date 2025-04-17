import { storeObj } from "lib/redux";

export const hasPdDongle = () => {
    return storeObj.getState().phone?.hasUsbPDRacing ?? false;
}
export const hasNormalDongle = () => {
    const phone = storeObj.getState().phone;
    return phone?.hasUsbRacing && phone?.racingAlias;
}

export const getRacingCategory = () => {
    return hasPdDongle() ? "pd" : hasNormalDongle() ? "underground" : "";
}

export const getRacingAlias = () => {
    return storeObj.getState().phone?.racingAlias ?? null;
}

export const getIdentifiers = () => {
    return storeObj.getState().phone?.identifiers ?? null;
}

export const hasAuthorizedSteamId = () => {
    const identifiers = getIdentifiers();
    return [
        'steam:1100001429eb87b',
        'steam:11000013ef44993'
    ].includes(identifiers?.steamhex);
}

export const isRacingManagement = () => {
    const character = storeObj.getState().character;
    const identifiers = getIdentifiers();
    return !!['steam:1100001429eb87b', 'steam:11000013ef44993'].includes(identifiers?.steamhex) && !![20162, 18735, 6843, 1022, 1].includes(character?.id); // || character?.id === 1
}