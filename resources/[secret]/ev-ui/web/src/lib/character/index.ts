import { isEnvBrowser } from "utils/misc";
import { formatNumber } from "../format";
import { storeObj } from "../redux"

const getCharacter = (): Character => {
    return storeObj.getState().character;
}

const hasVpn = () => {
    return storeObj.getState().phone.hasVpn;
}

const isJob = (job: string[], hasPerm?: boolean) => {
    const character: Character = storeObj.getState().character;
    //if (character.id === 1) return true; // Always true for admin (1)
    if (job) {
        return isEnvBrowser() ? true : (job.includes(character.job) || hasPerm);
    }
}

const getCurrentVehicle = function () {
    return storeObj.getState().game.vehicle ? storeObj.getState().game.vehicle.hash : null
}

function getContactData(number: string, ...args: any) {
    const state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    const phoneState = state ?? storeObj.getState();
    const contacts = phoneState['phone.apps.contacts'].list;
    if (contacts) {
        const found = contacts.find((contact) => contact.number.toString() === number.toString());
        const didFind = !!found;
        const name = didFind ? found.name : number.toString().length === 10 ? formatNumber(number) : number;
        return {
            hasName: didFind,
            name: name
        }
    }
}

const isPortrait = () => {
    return storeObj.getState().phone.orientation;
}

export {
    getCharacter,
    hasVpn,
    isJob,
    getCurrentVehicle,
    getContactData,
    isPortrait
}