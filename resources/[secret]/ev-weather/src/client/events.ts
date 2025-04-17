const pInServerFarm = false;

onNet('weather:blackout', (pLightState, pBool) => {
    if (pLightState && pInServerFarm && !pBool) return;
    SetArtificialLightsState(pLightState);
    SetArtificialLightsStateAffectsVehicles(false);
});