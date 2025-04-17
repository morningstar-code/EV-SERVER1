export const SanitationWorkerActivity = { 
    name: "Sanitation Worker",
    deadline: 0,
    references: [
        {
            key: "foremanLocation",
            value: {
                id: "foremanLocation",
                type: "vectors",
                settings: {
                    vectors: {
                        x: -352.4917,
                        y: -1545.042,
                        z: 27.721336
                    }
                }
            }
        },
        {
            key: "sanitationVehicle",
            value: {
                id: "sanitationVehicle",
                type: "vehicle",
                settings: {
                    model: "trash2"
                },
                data: {
                    netId: 0
                }
            }
        },
        {
            key: "sanitationVehicleSpawnLocation",
            value: {
                id: "sanitationVehicleSpawnLocation",
                type: "vectors",
                settings: {
                    vectors: {
                        x: -332.8148,
                        y: -1565.952,
                        z: 25.23188
                    },
                    heading: 238.91943
                }
            }
        },
        {
            key: "assignedZone1",
            value: {
                id: "assignedZone1",
                type: "zone",
                settings: {
                    id: ""
                }
            }
        },
        {
            key: "assignedZone2",
            value: {
                id: "assignedZone2",
                type: "zone",
                settings: {
                    id: ""
                }
            }
        },
        {
            key: "returnVehicleLocation",
            value: {
                id: "returnVehicleLocation",
                type: "vectors",
                settings: {
                    vectors: {
                        x: -332.8148,
                        y: -1565.952,
                        z: 25.23188
                    }
                }
            }
        },
        {
            key: "returnVehicleBlip",
            value: {
                id: "returnVehicleBlip",
                type: "blip",
                settings: {
                    type: "vectors",
                    color: 26,
                    scale: 1.0,
                    route: true,
                    text: "Return Vehicle"
                }
            }
        }
    ],
    objectives: [
        {
            key: "go_to_the_foreman",
            value: {
                id: "go_to_the_foreman",
                type: "destination",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    location: {
                        reference: "foremanLocation"
                    },
                    trigger: {
                        type: "interact",
                        key: 38,
                        wanted: 2
                    },
                    notification: {
                        mode: "info",
                        text: "[E] Ask the foreman for a vehicle",
                        distance: 2
                    },
                    wanted: 1
                }
            }
        },
        {
            key: "spawn_sanitation_vehicle",
            value: {
                id: "spawn_sanitation_vehicle",
                type: "spawnEntity",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    spawn: [
                        {
                            type: "vehicle",
                            networked: true,
                            reference: "sanitationVehicle",
                            location: {
                                reference: "sanitationVehicleSpawnLocation"
                            }
                        }
                    ],
                    wanted: 1
                }
            }
        },
        {
            key: "get_in_the_sanitation_vehicle",
            value: {
                id: "get_in_the_sanitation_vehicle",
                type: "getVehicle",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    trigger: {
                        type: "vehicle",
                        vehicle: {
                            reference: "sanitationVehicle"
                        }
                    },
                    wanted: 1
                }
            }
        },
        {
            key: "go_to_the_assigned_zone_1",
            value: {
                id: "go_to_the_assigned_zone_1",
                type: "destination",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    location: {
                        reference: "assignedZone1"
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
            key: "collect_trash_1",
            value: {
                id: "collect_trash_1",
                name: "collect_trash_1", // ?
                type: "customEvent",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    event: {
                        name: "ev-jobs:sanitationWorker:collect",
                        params: ["assignedZone1"]
                    },
                    wanted: 15
                }
            }
        },
        {
            key: "go_to_the_assigned_zone_2",
            value: {
                id: "go_to_the_assigned_zone_2",
                type: "destination",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    location: {
                        reference: "assignedZone2"
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
            key: "collect_trash_2",
            value: {
                id: "collect_trash_2",
                name: "collect_trash_2", // ?
                type: "customEvent",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    event: {
                        name: "ev-jobs:sanitationWorker:collect",
                        params: ["assignedZone2"]
                    },
                    wanted: 15
                }
            }
        },
        {
            key: "return_the_vehicle",
            value: {
                id: "return_the_vehicle",
                type: "destination",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    location: {
                        reference: "returnVehicleLocation",
                        blip: "returnVehicleBlip",
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
            key: "delete_vehicle",
            value: {
                id: "delete_vehicle",
                type: "despawnEntity",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    spawn: [
                        {
                            type: "vehicle",
                            reference: "sanitationVehicle"
                        }
                    ]
                },
                wanted: 1
            }
        }
    ],
    tasks: [],
    activity: {
        name: "Sanitation Worker",
        deadline: 60 * 60 * 1000,
        tasks: [
            { // destination
                id: "go_to_the_foreman",
                description: "Go to the foreman",
                tracked: []
            },
            { // getVehicle
                id: "get_in_the_sanitation_vehicle",
                description: "Get in the sanitation vehicle",
                tracked: []
            },
            { // destination
                id: "go_to_the_assigned_zone_1",
                description: "Go to the assigned zone", //Adds zone here (East Vinewood)
                descriptionExtraReference: "assignedZone1",
                tracked: []
            },
            { // customEvent
                id: "collect_trash_1",
                description: "Collect trash",
                wanted: 15,
                count: 0
            },
            { // destination
                id: "go_to_the_assigned_zone_2",
                description: "Go to the assigned zone", //Adds zone here (East Vinewood)
                descriptionExtraReference: "assignedZone2",
                tracked: []
            },
            { // customEvent
                id: "collect_trash_2",
                description: "Collect trash",
                wanted: 15,
                count: 0
            },
            { // destination
                id: "return_the_vehicle",
                description: "Return the vehicle",
                tracked: []
            }
        ]
    }
};