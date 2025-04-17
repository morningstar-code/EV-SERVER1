export const DarkmarketActivity = {
    name: "Dark Market Transports",
    deadline: 0,
    references: [
        {
            key: "transport_vehicle",
            value: {
                id: "transport_vehicle",
                type: "vehicle",
                data: {
                    netId: 0
                }
            }
        },
        {
            key: "pick_up_goods_location",
            value: {
                id: "pick_up_goods_location",
                type: "vectors",
                settings: {}
            }
        },
        {
            key: "pick_up_goods_blip",
            value: {
                id: "pick_up_goods_blip",
                type: "blip",
                settings: {
                    type: "vectors",
                    color: 26,
                    sprite: 524,
                    scale: 1.0,
                    route: true,
                    text: "Pick Up Goods"
                }
            }
        },
        {
            key: "first_handoff_location",
            value: {
                id: "first_handoff_location",
                type: "vectors",
                settings: {}
            }
        },
        {
            key: "first_handoff_blip",
            value: {
                id: "first_handoff_blip",
                type: "blip",
                settings: {
                    type: "vectors",
                    color: 26,
                    sprite: 524,
                    scale: 1.0,
                    route: true,
                    text: "First Handoff"
                }
            }
        },
        {
            key: "second_handoff_location",
            value: {
                id: "second_handoff_location",
                type: "vectors",
                settings: {}
            }
        },
        {
            key: "second_handoff_blip",
            value: {
                id: "second_handoff_blip",
                type: "blip",
                settings: {
                    type: "vectors",
                    color: 26,
                    sprite: 524,
                    scale: 1.0,
                    route: true,
                    text: "Second Handoff"
                }
            }
        },
        {
            key: "oxy_valid_entities",
            value: {
                id: "oxy_valid_entities",
                type: "entities",
                data: {
                    valid: []
                }
            }
        },
        {
            key: "rid_of_vehicle_location",
            value: {
                id: "rid_of_vehicle_location",
                type: "vectors",
                settings: {
                    vectors: {
                        x: -1276.602,
                        y: -202.3626,
                        z: 42.445899
                    }
                }
            }
        },
        {
            key: "rid_of_vehicle_blip",
            value: {
                id: "rid_of_vehicle_blip",
                type: "blip",
                settings: {
                    type: "vectors",
                    color: 26,
                    sprite: 524,
                    scale: 1.0,
                    route: true
                }
            }
        }
    ],
    objectives: [
        {
            key: "find_vehicle",
            value: {
                id: "find_vehicle",
                name: "find_vehicle",
                type: "customEvent",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    event: {
                        name: "ev-jobs:crim:oxyrun", //ev-jobs:crim:oxyrun:status
                        params: []
                    },
                    wanted: 1
                }
            }
        },
        {
            key: "ask_for_goods",
            value: {
                id: "ask_for_goods",
                type: "destination",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    location: {
                        reference: "pick_up_goods_location",
                        blip: "pick_up_goods_blip"
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
            key: "load_packages",
            value: {
                id: "load_packages",
                name: "load_packages",
                type: "customEvent",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    event: {
                        name: "ev-jobs:crim:oxyrun",
                        params: []
                    },
                    wanted: 10
                }
            }
        },
        {
            key: "drive_to_handoff_location_with_transport_vehicle_1",
            value: {
                id: "drive_to_handoff_location_with_transport_vehicle_1",
                type: "destination",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    location: {
                        reference: "first_handoff_location",
                        blip: "first_handoff_blip"
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
            key: "first_handoff_oxy",
            value: {
                id: "first_handoff_oxy",
                name: "first_handoff_oxy",
                type: "customEvent",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    event: {
                        name: "ev-jobs:crim:oxyrun",
                        params: []
                    },
                    wanted: 5
                }
            }
        },
        {
            key: "drive_to_handoff_location_with_transport_vehicle_2",
            value: {
                id: "drive_to_handoff_location_with_transport_vehicle_2",
                type: "destination",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    location: {
                        reference: "second_handoff_location",
                        blip: "second_handoff_blip"
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
            key: "second_handoff_oxy",
            value: {
                id: "second_handoff_oxy",
                name: "second_handoff_oxy",
                type: "customEvent",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    event: {
                        name: "ev-jobs:crim:oxyrun",
                        params: []
                    },
                    wanted: 5
                }
            }
        },
        {
            key: "get_rid_of_vehicle",
            value: {
                id: "get_rid_of_vehicle",
                name: "get_rid_of_vehicle",
                type: "customEvent",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    event: {
                        name: "ev-jobs:crim:oxyrun",
                        params: []
                    },
                    wanted: 1
                }
            }
        }
    ],
    tasks: [],
    activity: {
        name: "Dark Market Transports", //TODO: Actually pull name from job config?
        deadline: 50 * 60 * 1000,
        tasks: [
            { // customEvent
                id: "find_vehicle",
                description: "Find and steal a vehicle to use as transport.",
                tracked: []
            },
            { // destination
                id: "ask_for_goods",
                description: "Go to the supplier and ask for the goods.",
                tracked: []
            },
            { // customEvent
                id: "load_packages",
                description: "Load the packages into the vehicle trunk.",
                tracked: []
            },
            { // destination
                id: "drive_to_handoff_location_with_transport_vehicle_1",
                description: "Drive to the handoff location with the transport vehicle.",
                tracked: []
            },
            { // customEvent
                id: "first_handoff_oxy",
                description: "Wait for the customers and handoff the goods.",
                tracked: []
            },
            { // destination
                id: "drive_to_handoff_location_with_transport_vehicle_2",
                description: "Drive to the next handoff location.",
                tracked: []
            },
            { // customEvent
                id: "second_handoff_oxy",
                description: "Wait for the customers and handoff the goods.",
                tracked: []
            },
            { // destination / customEvent
                id: "get_rid_of_vehicle",
                description: "Get rid of the vehicle.",
                tracked: []
            }
        ]
    }
};