interface RacePlayer {
    id: number;
    characterId: number;
    alias: string;
    name: string;
    cryptoReward: number;
    curCheckpointIndex: number;
    place: number;
    lastPos: number;
    leftRace: boolean;
    prize: number;
    straightDistToCheckpoint: number;
    totalDist: number;
    finished: number;
    bestLapTime: number;
    tournamentPoints?: number;
    vehicle: string;
    vehicleClass: string;
    vehicleFullyUpgraded: boolean;
    vehicleVin: string;
    vehicleVinScratched: boolean;
}

interface RaceTrack {
    id: string;
    name: string;
    author: string;
    category: string;
    type: string;
    length: number;
    createdAt: number;
    start: any[];
    thumbnail: string;
    visible: boolean;
}

interface RaceTournament {
    id: number;
    name: string;
    completed: boolean;
    active: boolean;
    owner: number;
    players: RacePlayer[];
}

interface Race {
    id: string;
    raceId: string;
    eventId: string;
    eventName: string;
    password: string;
    track: string;
    owner: number;
    players: RacePlayer[];
    buyIn: number;
    type: string;
    vehicleClass: string;
    category: string;
    laps: number;
    length: number;
    reverse: boolean;
    sendNotification: boolean;
    showPosition: boolean;
    start: any[];
    phasing: string;
    hitPenalty: number;
    dnfCountdown: number;
    dnfPosition: number;
    countDown: number;
    bubblePopper: boolean;
    bannedPlayers: number[];
    author: string;
    visible: boolean;
    reverse: boolean;
    prizeDistribution: number[];
    createdAt: number;
}

interface RaceCompleted {
    id: string;
    raceId: string;
    eventId: string;
    eventName: string;
    owner: number;
    players: RacePlayer[];
    buyIn: number;
    type: string;
    vehicleClass: string;
    category: string;
    laps: number;
    length: number;
    reverse: boolean;
    timestamp: number;
    track: string;
    createdAt: number;
}