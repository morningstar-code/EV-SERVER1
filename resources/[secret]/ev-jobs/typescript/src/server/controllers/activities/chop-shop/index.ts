export const ChopShopActivity = {
    name: "Chop Shop",
    deadline: 0,
    references: [
        {
            key: "target_vehicle", //Stores netId of the vehicle
            value: {
                id: "target_vehicle",
                type: "entity",
                data: {
                    netId: 0
                },
                settings: {
                    model: ""
                }
            }
        },
        {
            key: "target_dropoff",
            value: {
                id: "target_dropoff",
                type: "vectors",
                settings: {}
            }
        },
        {
            key: "target_dropoff_blip",
            value: {
                id: "target_dropoff_blip",
                type: "blip",
                settings: {
                    type: "vectors",
                    color: 26,
                    scale: 1.0,
                    route: true,
                    text: "Chop Shop Dropoff"
                }
            }
        },
        {
            key: "target_pickup",
            value: {
                id: "target_pickup",
                type: "vectors",
                settings: {}
            }
        },
        {
            key: "target_pickup_blip",
            value: {
                id: "target_pickup_blip",
                type: "blip",
                settings: {
                    type: "vectors",
                    color: 26,
                    scale: 1.0,
                    text: "Chop Shop Pickup"
                }
            }
        }
    ],
    objectives: [
        { //TODO: Perhaps spawn chop vehicle after they arrive (at distance?)
            key: "spawn_chop_vehicle",
            value: {
                id: "spawn_chop_vehicle",
                type: "spawnEntity",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    spawn: [
                        {
                            type: "vehicle",
                            networked: false, //true
                            reference: "target_vehicle",
                            location: {
                                reference: "target_pickup"
                            }
                        }
                    ],
                    wanted: 1
                }
            }
        },
        {
            key: "make_your_way_to_the_spot",
            value: {
                id: "make_your_way_to_the_spot",
                type: "destination",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    location: {
                        reference: "target_pickup",
                        blip: "target_pickup_blip"
                    },
                    trigger: {
                        type: "area",
                        wanted: 15
                    },
                    wanted: 1
                }
            }
        },
        {
            key: "find_and_steal_the_wanted_vehicle",
            value: {
                id: "find_and_steal_the_wanted_vehicle",
                type: "customEvent",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    event: {
                        name: "ev-jobs:chopshop:activity",
                        params: []
                    },
                    wanted: 1
                }
            }
        },
        {
            key: "go_to_the_chop_location",
            value: {
                id: "go_to_the_chop_location",
                type: "destination",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    location: {
                        reference: "target_dropoff",
                        blip: "target_dropoff_blip"
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
            key: "chop_vehicle",
            value: {
                id: "chop_vehicle",
                name: "chop_vehicle",
                type: "customEvent", //mb dont trigger
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    event: {
                        name: "ev-jobs:chopshop:activity",
                        params: []
                    },
                    wanted: 1
                }
            }
        },
        {
            key: "leave_chop_area",
            value: {
                id: "leave_chop_area",
                name: "leave_chop_area",
                type: "customEvent",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    event: {
                        name: "ev-jobs:chopshop:activity",
                        params: []
                    },
                    wanted: 1
                }
            }
        }
    ],
    tasks: [],
    activity: {
        name: "Chop Shop",
        deadline: 50 * 60 * 1000,
        tasks: [
            { // destination
                id: "make_your_way_to_the_spot",
                description: "Make your way towards the spot where the vehicle was last seen.",
                tracked: []
            },
            { // customEvent
                id: "find_and_steal_the_wanted_vehicle",
                description: "Find and steal the wanted vehicle.",
                tracked: []
            },
            { // destination
                id: "go_to_the_chop_location",
                description: "Go to the chop location.",
                tracked: []
            },
            { // customEvent
                id: "chop_vehicle",
                description: "Chop the valuable parts.",
                tracked: []
            },
            { // customEvent
                id: "leave_chop_area",
                description: "Leave the area.",
            }
        ]
    }
};