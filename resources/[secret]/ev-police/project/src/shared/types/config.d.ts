interface MainConfig {
    payoutFactor: number;
    characterLimit: number;
    progression: any;
    restartLength: number;
}

interface PoliceConfig {
    stunDuration: number;
    policeVehicles: string[];
    megaphoneRanges: ProximityOverride[];
    megaphoneRangesHeli: ProximityOverride[];
    dragCooldownMili: number;
    maxCuffAttempts: number;
    cuffAttemptMapping: [number, number][];
    cuffRagdollImmunity: number;
    softCuffOnly: boolean;
    panicButtonCooldown: number;
    panicButtonPrepTime: number;
    panicButtonDelay: number;
    panicButtonAutomated: boolean;
    distressSignalDelayed: boolean;
}