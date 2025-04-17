export const ImpoundWorkerActivity = {
    name: "Impound Worker",
    deadline: 0,
    references: [
        {
            key: "towTruckVehicle",
            value: {
                id: "towTruckVehicle",
                type: "entity", //vehicle
                data: {
                    netId: 0
                },
                settings: {
                    model: "flatbed"
                }
            }
        },
        {
            key: "requestedVehicle",
            value: {
                id: "requestedVehicle",
                type: "entity",
                //netId: 0 //gets set when job is started
                data: {
                    netId: 0
                }
            }
        },
        {
            key: "impoundLot",
            value: {
                id: "impoundLot",
                type: "vectors",
                settings: {
                    vectors: {
                        x: 1013.21,
                        y: -2343.25,
                        z: 30.51
                    }
                }
            }
        },
        {
            key: "impoundLotBlip",
            value: {
                id: "impoundLotBlip",
                type: "blip",
                settings: {
                    type: "vectors",
                    color: 26,
                    scale: 1.0,
                    route: true,
                    text: "Impound Drop Off"
                }
            }
        },
        {
            key: "requestedVehicleBlip",
            value: {
                id: "requestedVehicleBlip",
                type: "blip",
                settings: {
                    type: "entity",
                    sprite: 523,
                    color: 47,
                    scale: 1.0,
                    route: true,
                    text: "Impound Vehicle"
                }
            }
        }
    ],
    objectives: [
        {
            key: "get_in_a_tow_truck",
            value: {
                id: "get_in_a_tow_truck",
                type: "getVehicle",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    trigger: {
                        type: "vehicle",
                        vehicle: {
                            //wanted: true,
                            //enforce: true,
                            reference: "towTruckVehicle"
                        }
                    },
                    wanted: 1
                }
            }
        },
        {
            key: "go_to_the_assigned_vehicle",
            value: {
                id: "go_to_the_assigned_vehicle",
                type: "destination",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    location: {
                        reference: "requestedVehicle",
                        blip: "requestedVehicleBlip"
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
            key: "attach_the_tow_hook_to_the_vehicle",
            value: {
                id: "attach_the_tow_hook_to_the_vehicle",
                type: "checkAttach",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    attach: {
                        attachments: [
                            {
                                id: "attach_the_tow_hook_to_the_vehicle",
                                reference: "requestedVehicle", //towTruckVehicle?
                                target: "towTruckVehicle" //requestedVehicle?
                            }
                        ]
                    },
                    wanted: 1
                }
            }
        },
        {
            key: "go_to_the_vehicle_impound_lot",
            value: {
                id: "go_to_the_vehicle_impound_lot",
                type: "destination",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    location: {
                        reference: "impoundLot",
                        blip: "impoundLotBlip" 
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
            key: "detach_the_tow_hook",
            value: {
                id: "detach_the_tow_hook",
                type: "checkDetach",
                data: {
                    status: "none",
                    count: 0
                },
                settings: {
                    attach: {
                        attachments: [
                            {
                                id: "detach_the_tow_hook",
                                reference: "requestedVehicle", //towTruckVehicle?
                                target: "towTruckVehicle" //requestedVehicle?
                            }
                        ]
                    }
                }
            }
        }
    ],
    tasks: [],
    activity: { //phone
        name: "Impound Worker",
        deadline: 60 * 60 * 1000,
        tasks: [
            { // getVehicle (model: flatbed)
                id: "get_in_a_tow_truck",
                description: "Get in a towtruck",
                tracked: []
            },
            { // destination (this gets modifed with activityData, type entity)
                id: "go_to_the_assigned_vehicle",
                description: "Go to the assigned vehicle.",
                tracked: []
            },
            { // checkAttach
                id: "attach_the_tow_hook_to_the_vehicle",
                description: "Attach the tow hook to the vehicle.",
                tracked: []
            },
            { // destination / zone?
                id: "go_to_the_vehicle_impound_lot",
                description: "Go to the vehicle impound lot.",
                tracked: []
            },
            { // checkDetach
                id: "detach_the_tow_hook",
                description: "Detach the tow hook.",
                tracked: []
            }
        ]
    }
};