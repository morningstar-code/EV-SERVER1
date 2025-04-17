export const HouseRobberyActivity = {
    name: "House Robbery",
    deadline: 0,
    references: [],
    objectives: [],
    tasks: [],
    activity: {
        name: "House Robbery",
        deadline: 50 * 60 * 1000,
        tasks: [
            { // destination
                id: "the_boss_has_asked_you_to_go_to_the_property",
                description: "The Boss has asked you to go to the property",
                wanted: 1,
                count: 0, //This get's updated when the task is completed
            },
            { // customEvent
                id: "find_current_fishing_spot",
                description: "Find the current fishing spot",
                wanted: 1,
                count: 0, //This get's updated when the task is completed
                tracked: []
            },
            { // customEvent
                id: "collect_twenty_fishes",
                description: "Test the waters",
                wanted: 30,
                count: 0, //This get's updated when the task is completed
                tracked: []
            },
            { // destination
                id: "let_them_know_spot_is_good",
                description: "Let them know the spot is good",
                wanted: 1,
                count: 0, //This get's updated when the task is completed
                tracked: []
            }
        ]
    }
};