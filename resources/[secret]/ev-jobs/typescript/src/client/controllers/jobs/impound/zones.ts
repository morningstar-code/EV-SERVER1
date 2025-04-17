import { PolyZone } from "@shared/classes/polyzone";
import { PolyTarget } from "@shared/classes/polytarget";
import { GetPlayerJob } from "../../npcs";
import { GetImpoundTruck } from "client/controllers/jobs/impound/events";

let inImpoundDropOffZone = false;

export const IsInImpoundDropOffZone = () => inImpoundDropOffZone;

export async function InitImpoundZones(): Promise<void> {
    PolyZone.addBoxZone("ev-jobs:impound:records", {
        x: -191.9,
        y: -1162.19,
        z: 23.92
    }, 2.6, 0.6, {
        heading: 359,
        minZ: 22.67,
        maxZ: 25.17
    });
    PolyZone.addBoxZone("ev-jobs:impound:dropOff", {
        x: 1013.21,
        y: -2343.25,
        z: 30.51
    }, 19.2, 26.8, {
        heading: 355, 
        minZ: 29.51,
        maxZ: 34.51
    });
    PolyZone.addBoxZone("ev-jobs:impound:dropOff", {
        x: 454.8,
        y: -1019.95,
        z: 28.34
    }, 6.2, 5.8, {
        heading: 2,
        minZ: 27.09,
        maxZ: 33.89
    });
    PolyZone.addBoxZone("ev-jobs:impound:dropOff", {
        x: -448.38,
        y: 6050.82,
        z: 30.66
    }, 14.4, 11.4, {
        heading: 299,
        minZ: 29.66,
        maxZ: 33.66
    });
    PolyTarget.addBoxZone("ev-jobs:pd_impound:signIn", {
        x: 413.83,
        y: -1025.36,
        z: 29.5
    }, 0.8, 0.6, {
        heading: 273,
        minZ: 28.9,
        maxZ: 30.3
    });

    on("ev-polyzone:enter", (pZone: string) => {
        if (pZone !== "ev-jobs:impound:dropOff") return;
        inImpoundDropOffZone = true;
    });

    on("ev-polyzone:exit", (pZone: string) => {
        if (pZone !== "ev-jobs:impound:dropOff") return;
        inImpoundDropOffZone = false;
    });

    global.exports["ev-interact"].AddPeekEntryByPolyTarget("ev-jobs:pd_impound:signIn", [{
        event: "ev-jobs:signIn",
        id: "pdi_signin",
        icon: "clock",
        label: "Sign in",
        parameters: { jobId: "pd_impound" }
    }], {
        distance: { radius: 2.5 },
        isEnabled: () => GetPlayerJob() !== "pd_impound"
    });

    global.exports["ev-interact"].AddPeekEntryByPolyTarget("ev-jobs:pd_impound:signIn", [{
        event: "ev-jobs:pdimpound:paycheck",
        id: "pdi_paycheck",
        icon: "circle",
        label: "Get paycheck",
        parameters: {}
    }, {
        event: "ev-jobs:signOut",
        id: "pdi_signout",
        icon: "clock",
        label: "Sign out",
        parameters: { jobId: "pd_impound" }
    }], {
        distance: { radius: 2.5 },
        isEnabled: () => GetPlayerJob() === "pd_impound"
    });

    global.exports["ev-interact"].AddPeekEntryByPolyTarget("ev-jobs:pd_impound:signIn", [{
        event: "ev-jobs:pdimpound:spawnTruck",
        id: "pdi_towtruck",
        icon: "truck-loading",
        label: "Get tow truck",
        parameters: {}
    }], {
        distance: { radius: 2.5 },
        isEnabled: () => GetPlayerJob() === "pd_impound" && !GetImpoundTruck()
    });

    global.exports["ev-interact"].AddPeekEntryByPolyTarget("ev-jobs:pd_impound:signIn", [{
        event: "ev-jobs:pdimpound:returnTruck",
        id: "pdi_towtruckreturn",
        icon: "truck-loading",
        label: "Return tow truck",
        parameters: {}
    }], {
        distance: { radius: 2.5 },
        isEnabled: () => GetPlayerJob() === "pd_impound" && GetImpoundTruck()
    });
}