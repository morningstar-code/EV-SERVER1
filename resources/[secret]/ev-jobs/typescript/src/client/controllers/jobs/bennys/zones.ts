import { PolyZone } from "@shared/classes/polyzone";
import { PolyTarget } from "@shared/classes/polytarget";

export async function InitBennyZones(): Promise<void> {
    PolyZone.addBoxZone("job_geofence", {
        x: 141.75,
        y: -3045.74,
        z: 8.38
    }, 165.4, 0x7e, {
        heading: 0,
        minZ: 4.18,
        maxZ: 17.98,
        debugPoly: false,
        data: {
            id: "bennys_workplace",
            job: "bennys"
        }
    });

    PolyZone.addBoxZone("bennys_bodywork", {
        x: 141.75,
        y: -3045.74,
        z: 8.38
    }, 165.4, 126, {
        heading: 0,
        minZ: 4.18,
        maxZ: 17.98,
        debugPoly: false,
        data: {
            id: "bennys_bodywork"
        }
    });

    PolyZone.addBoxZone("bennys_respray", {
        x: 141.75,
        y: -3045.74,
        z: 8.38
    }, 165.4, 126, {
        heading: 0,
        minZ: 4.18,
        maxZ: 17.98,
        debugPoly: false,
        data: {
            id: "bennys_respray"
        }
    });

    PolyTarget.addBoxZone("bennys_storage", {
        x: 128.95,
        y: -3031.37,
        z: 7.04
    }, 1.8, 1.6, {
        heading: 345,
        minZ: 6.04,
        maxZ: 7.84,
        debugPoly: false,
        data: {
            id: "bennys_storage"
        }
    });

    PolyZone.addBoxZone("bennys_bench", {
        x: 125.6,
        y: -3028.22,
        z: 7.04
    }, 1, 2.6, {
        heading: 340,
        minZ: 6.64,
        maxZ: 7.04,
        debugPoly: false,
        data: {
            id: "bennys_bench"
        }
    });

    PolyZone.addBoxZone("bennys_purchase", {
        x: 122.25,
        y: -3031.67,
        z: 7.04
    }, 2.4, 2.4, {
        heading: 0,
        minZ: 6.04,
        maxZ: 8.44,
        debugPoly: false,
        data: {
            id: "bennys_purchase"
        }
    });

    PolyZone.addBoxZone("imports_shop_wifi", {
        x: -356.37,
        y: -134.85,
        z: 38.7
    }, 24.2, 19.2, {
        heading: 340,
        minZ: 37.1,
        maxZ: 44.3,
        debugPoly: false,
        data: {
            id: "imports_shop_wifi"
        }
    });

    PolyZone.addBoxZone("imports_pickup", {
        x: 1182.39,
        y: -3322.04,
        z: 6.03
    }, 2.6, 3.6, {
        heading: 359,
        minZ: 5.03,
        maxZ: 7.83,
        debugPoly: false,
        data: {
            id: "imports_pickup"
        }
    });
}