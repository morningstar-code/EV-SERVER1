export const FishingActivity = {
    name: "Fishing",
    deadline: 0,
    references: [
        {
            key: "fishingStand",
            value: {
                id: "fishingStand",
                type: "vectors",
                settings: {
                    vectors: {
                        x: -331.4118,
                        y: 6102.3994,
                        z: 31.459058
                    }
                }
            }
        },
        {
            key: "fishingSpot",
            value: {
                id: "fishingSpot",
                type: "vectors",
                settings: {}
            }
        }
    ],
    objectives: [
        {
            key: "meet_up_at_fishing_stand",
            value: {
                id: "meet_up_at_fishing_stand",
                type: "destination",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    location: {
                        reference: "fishingStand"
                    },
                    trigger: {
                        type: "area",
                        wanted: 5
                    },
                    wanted: 1
                }
            }
        },
        {
            key: "find_current_fishing_spot",
            value: {
                id: "find_current_fishing_spot",
                type: "destination",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    location: {
                        reference: "fishingSpot"
                    },
                    trigger: {
                        type: "area",
                        wanted: 20
                    },
                    wanted: 1
                }
            }
        },
        {
            key: "collect_twenty_fishes",
            value: {
                id: "collect_twenty_fishes",
                name: "collect_twenty_fishes",
                type: "customEvent",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    event: {
                        name: "ev-fishing:jobEvent",
                        params: []
                    },
                    wanted: 30
                }
            }
        },
        {
            key: "let_them_know_spot_is_good",
            value: {
                id: "let_them_know_spot_is_good",
                type: "destination",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    location: {
                        reference: "fishingStand"
                    },
                    trigger: {
                        type: "area",
                        wanted: 5
                    },
                    wanted: 1
                }
            }
        }
    ],
    tasks: [],
    activity: {
        name: "Fishing",
        deadline: 60 * 60 * 1000,
        tasks: [
            { // destination
                id: "meet_up_at_fishing_stand",
                description: "Meet up at the fishing stand",
            },
            { // destination
                id: "find_current_fishing_spot",
                description: "Find the current fishing spot",
                tracked: []
            },
            { // customEvent
                id: "collect_twenty_fishes",
                description: "Test the waters",
                tracked: []
            },
            { // destination
                id: "let_them_know_spot_is_good",
                description: "Let them know the spot is good",
                tracked: []
            }
        ]
    }
};