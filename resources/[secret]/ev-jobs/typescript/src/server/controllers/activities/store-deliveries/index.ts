export const StoreDeliveriesActivity = {
    name: "Store Deliveries",
    deadline: 0,
    references: [
        {
            key: "foremanLocation",
            value: {
                id: "foremanLocation",
                type: "vectors",
                settings: {
                    vectors: {
                        x: 919.92041015625,
                        y: -1256.6762695312,
                        z: 24.519781112671
                    }
                }
            }
        },
        {
            key: "deliveryVehicle",
            value: {
                id: "deliveryVehicle",
                type: "vehicle",
                settings: {
                    model: 2053223216
                },
                data: {
                    netId: 0
                }
            }
        },
        {
            key: "deliveryVehicleSpawnLocation",
            value: {
                id: "deliveryVehicleSpawnLocation",
                type: "vectors",
                settings: {
                    vectors: {
                        x: 916.25878,
                        y: -1258.626,
                        z: 25.548988
                    },
                    heading: 34.375301,
                    color: 26,
                    scale: 1.0,
                    route: true
                }
            }
        },
        {
            key: "storeLocation",
            value: {
                id: "storeLocation",
                type: "vectors",
                settings: {}
            }
        },
        {
            key: "storeBlip",
            value: {
                id: "storeBlip",
                type: "blip",
                settings: {
                    type: "vectors",
                    color: 26,
                    scale: 1.0,
                    route: true,
                    text: "Store Delivery"
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
                        x: 916.25878,
                        y: -1258.626,
                        z: 25.548988
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
            key: "spawn_delivery_vehicle",
            value: {
                id: "spawn_delivery_vehicle",
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
                            reference: "deliveryVehicle",
                            location: {
                                reference: "deliveryVehicleSpawnLocation"
                            }
                        }
                    ],
                    wanted: 1
                }
            }
        },
        {
            key: "get_in_the_delivery_vehicle",
            value: {
                id: "get_in_the_delivery_vehicle",
                type: "getVehicle",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    trigger: {
                        type: "vehicle",
                        vehicle: {
                            reference: "deliveryVehicle"
                        }
                    },
                    wanted: 1
                }
            }
        },
        {
            key: "go_to_the_assigned_store",
            value: {
                id: "go_to_the_assigned_store",
                type: "destination",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    location: {
                        reference: "storeLocation",
                        blip: "storeBlip",
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
            key: "drop_off_goods",
            value: {
                id: "drop_off_goods",
                name: "drop_off_goods",
                type: "customEvent",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    event: {
                        name: "ev-jobs:247delivery:deliver",
                        params: []
                    },
                    wanted: 3
                },
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
                            reference: "deliveryVehicle"
                        }
                    ],
                    wanted: 1
                }
            }
        }
    ],
    tasks: [],
    activity: {
        name: "Store Deliveries",
        deadline: 60 * 60 * 1000,
        tasks: [
            { // destination
                id: "go_to_the_foreman",
                description: "Go to the foreman",
                tracked: []
            },
            { // getVehicle
                id: "get_in_the_delivery_vehicle",
                description: "Get in the delivery vehicle",
                tracked: []
            },
            { // destination
                id: "go_to_the_assigned_store",
                description: "Go to the assigned store",
                tracked: []
            },
            { //customEvent?
                id: "drop_off_goods",
                description: "Drop off goods",
                tracked: []
            },
            { // destination
                id: "return_the_vehicle",
                description: "Return the vehicle",
                tracked: []
            }
        ]
    }
};