export const devData = {
    init: () => {
        return {
            character: {
                id: 1,
                first_name: 'monka',
                last_name: 'S',
                number: '1231234321',
                bank_account_id: 1,
                roles: [
                    'ballot-manager',
                    'bank-manager',
                    'business-manager',
                    'management',
                    'judge',
                    'mayor',
                    'tax-manager',
                ],
                email: 'example@lifeinvader.com',
                server_id: 33,
                job: 'unemployed'
            }
        }
    },
    showroomGetCarConfig: () => {
        return [
            {
                model: 'primoard',
                active: true,
                group: 'Sports',
                brand: 'Ford',
                name: 'Primo ARD',
                import_price: -1,
                retail_price: 100000,
                pdm: true,
                fastlane: false,
                tuner: true,
                showroom_image_url: '',
                hd_image_url: ''
            },
            {
                model: 'primoard',
                active: true,
                group: 'Sports',
                brand: 'Ford',
                name: 'Sports 1',
                import_price: -1,
                retail_price: 100000,
                pdm: true,
                fastlane: true,
                tuner: false,
                showroom_image_url: null,
                hd_image_url: ''
            },
            {
                model: 'primoard',
                active: true,
                group: 'Sports',
                brand: 'Ford',
                name: 'Sports 1',
                import_price: -1,
                retail_price: 100000,
                pdm: true,
                fastlane: true,
                tuner: false,
                showroom_image_url: null,
                hd_image_url: ''
            },
            {
                model: 'primoard',
                active: true,
                group: 'Sports',
                brand: 'Ford',
                name: 'Sports 1',
                import_price: -1,
                retail_price: 100000,
                pdm: true,
                fastlane: true,
                tuner: false,
                showroom_image_url: null,
                hd_image_url: ''
            },
            {
                model: 'primoard',
                active: true,
                group: 'Sports',
                brand: 'Ford',
                name: 'Sports 1',
                import_price: -1,
                retail_price: 100000,
                pdm: true,
                fastlane: true,
                tuner: false,
                showroom_image_url: null,
                hd_image_url: ''
            },
            {
                model: 'primoard',
                active: true,
                group: 'Sports',
                brand: 'Ford',
                name: 'Sports 1',
                import_price: -1,
                retail_price: 100000,
                pdm: true,
                fastlane: true,
                tuner: false,
                showroom_image_url: null,
                hd_image_url: ''
            },
            {
                model: 'primoard',
                active: true,
                group: 'Sports',
                brand: 'Ford',
                name: 'Sports 1',
                import_price: -1,
                retail_price: 100000,
                pdm: true,
                fastlane: true,
                tuner: false,
                showroom_image_url: null,
                hd_image_url: ''
            },
            {
                model: 'primoard',
                active: true,
                group: 'Sports',
                brand: 'Ford',
                name: 'Sports 1',
                import_price: -1,
                retail_price: 100000,
                pdm: true,
                fastlane: true,
                tuner: false,
                showroom_image_url: null,
                hd_image_url: ''
            },
            {
                model: 'wot',
                active: true,
                group: 'Sports',
                brand: 'Ford',
                name: 'Sports 2',
                import_price: -1,
                retail_price: 100000,
                pdm: false,
                fastlane: true,
                tuner: false,
                showroom_image_url: null,
                hd_image_url: ''
            },
            {
                model: 'wot',
                active: true,
                group: 'Cycle',
                brand: 'Ford',
                name: 'Cycle',
                import_price: -1,
                retail_price: 100000,
                pdm: false,
                fastlane: true,
                tuner: false,
                showroom_image_url: null,
                hd_image_url: ''
            }
        ]
    },
    showroomChangeCar: () => {
        return {
            info: [
                {
                    name: 'Acceleration',
                    value: 9.8,
                },
                {
                    name: 'Speed',
                    value: 9.8,
                },
                {
                    name: 'Handling',
                    value: 9.8,
                },
                {
                    name: 'Braking',
                    value: 9.8,
                }
            ],
            vehClass: 'S'
        }
    },
    getCharacterPreferences: () => {
        return {
            value: JSON.stringify({ phone: 'ios' })
        }
    },
    getAccountTypes: () => {
        return [
            {
                id: 1,
                name: 'Default'
            },
            {
                id: 2,
                name: 'Personal',
                public: true
            },
            {
                id: 3,
                name: 'Business'
            },
            {
                id: 4,
                name: 'Savings',
                public: true
            }
        ]
    },
    getCharacterDetails: () => {
        return {
            bank: 1333337,
            cash: 1337,
            jobs: {
                primary: 'unemployed',
                secondary: 'none'
            },
            licenses: [
                {
                    name: 'Drivers',
                    status: true
                }
            ]
        }
    },
    getAccountCharacters: () => {
        return [
            {
                id: 1111,
                name: 'Siz Fulker',
                is_owner: true,
                access: ['deposit', 'withdraw', 'transfer', 'transactions']
            },
            {
                id: 3333,
                name: 'Kevin Malagnaggi',
                is_owner: false,
                access: ['deposit', 'withdraw', 'transfer', 'transactions'],
            }
        ]
    },
    getAccounts: () => {
        return {
            is_atm: false,
            accounts: [
                {
                    id: 1,
                    bank_account_id: 1,
                    cid: 1111,
                    type_id: 1,
                    owner_first_name: 'D',
                    owner_last_name: 'W',
                    name: 'Personal Account',
                    type: 'Default',
                    balance: 15000,
                    is_frozen: false,
                    is_monitored: false,
                    access: [
                        'deposit',
                        'withdraw',
                        'transfer',
                        'transactions',
                        'balance',
                    ]
                }
            ]
        }
    },
    getTransactions: () => {
        return [
            {
                id: 'bfad16b2-b1a3-491b-820d-06a08192e426',
                direction: 'in',
                amount: 1500,
                type: 'income',
                date: 1598450656,
                comment: 'comment',
                from_account_id: 33333,
                from_account_name: 'Not Drugs',
                from_civ_name: 'Siz Fulker',
                to_account_id: 11111,
                to_account_name: 'Personal',
                to_civ_name: 'Siz Fulker',
                tax_type: 'Personal Income',
                tax_id: 6,
                tax_percentage: 20
            }
        ]
    },
    getTaxOptions: () => {
        return [
            {
                id: 1,
                name: 'Vehicle',
                level: 10,
                new_level: 15,
                date: ''
            },
            {
                id: 2,
                name: 'Groceries',
                level: 15,
                new_level: 10,
                date: '2020-06-03T12:55:37Z'
            }
        ]
    },
    getBusinesses: () => {
        return [
            {
                id: 1,
                code: 'pdm',
                name: 'Premium Deluxe Motorsports',
                business_type_id: 1,
                business_type_name: 'showroom'
            }
        ]
    },
    getBusinessTypes: () => {
        return [
            {
                id: 1,
                name: 'Showroom'
            },
            {
                id: 2,
                name: 'Generic'
            },
            {
                id: 3,
                name: 'Loans'
            }
        ]
    },
    getTaxHistory: () => {
        return [
            {
                id: 1,
                name: 'Vehicle',
                civ_name: 'Coop Holligay',
                date: '2020-06-03T12:55:37Z',
                level: 10
            }
        ]
    },
    getLoans: () => {
        return [
            {
                id: 1,
                first_name: 'What',
                last_name: 'Ever',
                business_name: 'Whatever',
                business_bank_account_id: 1,
                amount: 15000,
                payments_schedule_days: 7,
                payments_total: 10,
                interest_state: 10.5,
                interest_civ: 15.5,
                created_at: 1597185310,
                civ_owed: 17500,
                note: 'cvpi',
                state_owed: 15000,
                state_paid: 0,
                last_payment: 1597185310,
                payments_count: 1,
                payments: [
                    {
                        direction: 'OUT',
                        amount: 1250.22,
                        created_at: 1597285310,
                    }
                ]
            }
        ]
    },
    getLicenses: () => {
        return [
            {
                id: 1,
                name: 'Drivers License'
            }
        ]
    },
    getBallots: () => {
        return [
            {
                id: 1,
                end_date: 1699555815,
                start_date: 1599305815,
                multi: false,
                name: 'Mayor of Los Santos',
                description: 'Vote for the Mayor!',
                options: [
                    {
                        id: 1,
                        name: 'HOLLIDAY, Coop',
                        description: 'Some fluff about Coop',
                        icon: 'birthday-cake',
                        party: 'Affiliated Party',
                        vote_count: 0,
                    },
                    {
                        id: 2,
                        name: 'HOLLIDAY, Coop',
                        description: 'Some fluff about Coop',
                        icon: 'birthday-cake',
                        party: 'Affiliated Party',
                        vote_count: 0,
                    }
                ]
            }
        ]
    },
    getCurrentBallotOptions: () => {
        return [
            {
                id: 1,
                name: 'Mayor of Los Santos',
                multi: false,
                options: [
                    {
                        id: 1,
                        name: 'HOLLIDAY, Coop',
                        description: 'Some fluff about Coop',
                        icon: 'birthday-cake',
                        party: 'Affiliated Party',
                    },
                    {
                        id: 2,
                        name: 'CHAVEZ, Nino',
                        description: 'Some fluff about Nino',
                        icon: 'birthday-cake',
                        party: 'Sahara International',
                    },
                ]
            },
            {
                id: 2,
                name: 'Governor of San Andreas',
                selected: [],
                multi: true,
                options: [
                    {
                        id: 1,
                        name: 'HOLLIDAY, Coop',
                        description: 'Some fluff about Coop',
                        icon: 'birthday-cake',
                        party: 'Affiliated Party',
                    },
                    {
                        id: 2,
                        name: 'CHAVEZ, Nino',
                        description: 'Some fluff about Nino',
                        icon: 'birthday-cake',
                        party: 'Sahara International',
                    },
                    {
                        id: 3,
                        name: 'PAYNE, Matthew',
                        description: 'Some fluff about Payne',
                        icon: 'birthday-cake',
                        party: 'Payne Enterprises',
                    },
                ]
            }
        ]
    },
    getNewspaperContent: () => {
        return {
            drugs: '',
            lockups: [
                {
                    name: 'Mel Rickenbacker',
                    duration: 123
                }
            ],
            taxes: [
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                },
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                },
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                },
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                },
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                },
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                },
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                },
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                },
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                },
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                },
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                },
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                },
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                },
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                },
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                },
                {
                    type: 'Vehicle',
                    level: 15,
                },
                {
                    type: 'Groceries',
                    level: 10,
                }
            ],
            recentElections: [
                {
                    date: '2020-06-03T12:55:37Z',
                    title: 'Mayor of Los Santos',
                    description: 'Coop Chavez won!',
                },
                {
                    date: '2020-06-03T12:55:37Z',
                    title: 'Mayor of Los Santos',
                    description: 'Coop Chavez won!',
                },
                {
                    date: '2020-06-03T12:55:37Z',
                    title: 'Mayor of Los Santos',
                    description:
                        'Vote for the Mayor! Candidates include Coop Holliday and Nino Chavez!',
                },
                {
                    date: '2020-06-03T12:55:37Z',
                    title: 'Mayor of Los Santos',
                    description:
                        'Vote for the Mayor! Candidates include Coop Holliday and Nino Chavez!',
                }
            ],
            stonks: 'The market has been in turmoil since the global catastrophe that was...',
            upcomingElections: [
                {
                    date: '2020-06-03T12:55:37Z',
                    title: 'Mayor of Los Santos',
                    description:
                        'Vote for the Mayor! Candidates include Coop Holliday and Nino Chavez!',
                },
                {
                    date: '2020-06-03T12:55:37Z',
                    title: 'Mayor of Los Santos',
                    description:
                        'Vote for the Mayor! Candidates include Coop Holliday and Nino Chavez!',
                }
            ]
        }
    },
    getNewsArchives: () => {
        return []
    },
    generateDispatchCall: (ctxId?: number) => {
        return {
            callSign: null,
            ctxId: ctxId || 1,
            dispatchCode: '10-30A',
            dispatchMessage: 'A homie dead RIP',
            firstColor: null,
            flagged_at: null,
            flagged_by: null,
            flagged_reason: null,
            extraData: null,
            heading: null,
            id: 1,
            location: null,
            model: null,
            origin: { x: 0, y: 0, z: 0 },
            plate: null,
            secondColor: null,
            senderId: null,
            senderName: null,
            senderNumber: null,
            text: null,
            timestamp: null,
            title: null,
            priority: 1
        }
    },
    getDispatchData: () => {
        const assignments = {};
        (assignments['205'] = 1);
        (assignments['215'] = 1);
        (assignments['L-1'] = 1);

        return {
            calls: [
                // devData.generateDispatchCall(5),
                // devData.generateDispatchCall(4),
                // devData.generateDispatchCall(3),
                // devData.generateDispatchCall(2),
                // devData.generateDispatchCall(),
            ],
            pings: [], //devData.generateDispatchCall()
            units: [
                {
                    serverId: 1,
                    callSign: '205',
                    name: 'Jackie Snow',
                    attachedTo: null,
                    job: 'police',
                    vehicle: 'car',
                    status: '10-8',
                },
                {
                    serverId: 2,
                    callSign: '206',
                    name: 'Dylan Snow',
                    attachedTo: null,
                    job: 'police',
                    vehicle: 'car',
                    status: '10-8',
                },
                {
                    serverId: 3,
                    callSign: '207',
                    name: 'Bob Snow',
                    attachedTo: 2,
                    job: 'police',
                    vehicle: 'car',
                    status: '10-8',
                },
                {
                    callSign: '669',
                    name: 'Francis J Francer',
                    attachedTo: '205',
                    job: 'police',
                    vehicle: 'car',
                    status: '10-8',
                },
                {
                    callSign: 'L-1',
                    name: 'Weebs R UsWeebs R Us',
                    attachedTo: null,
                    job: 'ems',
                    vehicle: 'car',
                    status: '10-8',
                }
            ],
            unitAssignments: []
        }
    }
}