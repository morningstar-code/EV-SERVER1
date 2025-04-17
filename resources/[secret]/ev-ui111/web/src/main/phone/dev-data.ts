export const devData = {
    getDetails: () => {
        return {
            bank: 1333337,
            cash: 1337,
            casino: 0,
            jobs: {
                primary: 'unemployed',
                secondary: 'none'
            },
            licenses: [
                {
                    name: "Drivers",
                    status: true
                }
            ]
        }
    },
    showroomGetCarConfig: () => {
        return [
            {
                model: 'primoard',
                active: true,
                group: 'Sports',
                brand: 'Primo',
                name: 'Primo ARD',
                import_price: 100000,
                retail_price: 100000,
                pdm: true,
                fastlane: false,
                tuner: true,
                showroom_image_url: '',
                hd_image_url: '',
                current_stock: 5,
                hash: 1
            }
        ]
    },
    getContacts: () => {
        return [
            {
                id: 1,
                name: 'Juan Carnandez aka Flippy',
                number: '1234567444'
            },
            {
                id: 2,
                name: 'Justice Dredd',
                number: '1234567890'
            },
            {
                id: 3,
                name: 'Witteh Mate',
                number: '6012357990'
            }
        ]
    },
    getTwats: () => {
        return [
            {
                character: { id: 1, first_name: 'Juan', last_name: 'Carnandez', job: 'unemployed', number: 1, bank_account_id: 1, server_id: 1 },
                text: 'Hi Bozo!',
                timestamp: Date.now(),
                isBlue: false, //Returned from srv side
                isGold: true,
            }
        ]
    },
    getYellowPages: () => {
        return [
            {
                character: { id: 1, first_name: 'Juan', last_name: 'Carnandez', job: 'unemployed', number: 9999999999, bank_account_id: 1, server_id: 1 },
                text: 'Hi Bozo!'
            },
            // {
            //     character: mainDevData.init().character,
            //     text: 'Yo Bozos!'
            // }
        ]
    },
    getDOJData: () => {
        return [
            {
                job: 'defender',
                name: 'Juan Carnandez',
                phone: '1234567890',
                status: 'Available'
            }
        ]
    },
    getDebt: () => {
        return [
            {
                id: 1,
                amount_paid_total: 25000,
                amount_owed_total: 100000,
                amount_owed_now: 25000,
                comment: 'Car',
                debtor: 'Sahara International',
                payments_remaining: 4,
                payments_schedule: 7,
                payments_last_date: '2020-06-20T12:55:37Z'
            }
        ]
    },
    getVenmoTransactions: () => {
        return [
            {
                id: 'bfad16b2-b1a3-491b-820f-06a08092e426',
                direction: 'in',
                amount: 1500,
                type: 'venmo',
                date: '2020-06-03T12:55:37Z',
                comment: 'comment',
                from_account_id: 33333,
                from_account_name: 'Not Drugs',
                from_civ_name: 'Siz Fulker',
                to_account_id: 11111,
                to_account_name: 'Personal',
                to_civ_name: 'Siz Fulker'
            }
        ]
    },
    getCrypto: () => {
        return [
            {
                id: 1,
                icon: 'caret-square-up',
                ticker: 'SHUNG',
                name: 'Shungite',
                amount: 1337
            }
        ]
    },
    getCars: () => {
        return [
            {
                name: "panto",
                location: '',
                parking_state: 'out',
                parking_garage: 'garage_alta',
                plate: 'ABCD1337',
                spawnable: true,
                sellable: true,
                stats_body: 100,
                stats_engine: 100,
                type: 'car'
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
    getEmploymentInformation: () => {
        return [
            {
                id: 1,
                access_level: -1,
                code: 'abdultaxi',
                name: 'Premium Deluxe Motorsports',
                role: 'Owner',
                permissions: [
                    'hire',
                    'change_role',
                    'pay_employee',
                    'pay_external',
                    'charge_external',
                    'fire',
                    'view_logs'
                ],
                business_type: 'Showroom',
                bank_account_id: 1
            },
            {
                id: 1,
                access_level: -1,
                code: 'tuner',
                name: '6STR Tuner Shop',
                role: 'Owner',
                permissions: [
                    'hire',
                    'change_role',
                    'pay_employee',
                    'pay_external',
                    'charge_external',
                    'fire'
                ],
                business_type: 'Showroom',
                bank_account_id: 2
            },
            {
                id: 1,
                access_level: -1,
                code: 'fast_loans',
                name: 'Fast Loans',
                role: 'Owner',
                permissions: [
                    'hire',
                    'change_role',
                    'pay_employee',
                    'pay_external',
                    'charge_external',
                    'fire'
                ],
                business_type: 'Loans',
                bank_account_id: 3
            },
            {
                id: 1,
                access_level: -1,
                code: 'paynless', //paynless
                name: 'Sports Book',
                role: 'Owner',
                permissions: [
                    'hire',
                    'change_role',
                    'pay_employee',
                    'pay_external',
                    'charge_external',
                    'fire'
                ],
                business_type: 'Generic',
                bank_account_id: 4
            },
            {
                id: 1,
                access_level: -1,
                code: 'lsbn',
                name: 'LSBN',
                role: 'Owner',
                permissions: [
                    'hire',
                    'change_role',
                    'pay_employee',
                    'pay_external',
                    'charge_external',
                    'fire'
                ],
                business_type: 'Generic',
                bank_account_id: 4
            }
        ]
    },
    getBusinessEmployees: () => {
        return [
            {
                id: 1,
                first_name: 'YourMom',
                last_name: 'IsALoser',
                role: 'Owner',
                permissions: [
                    'hire',
                    'change_role',
                    'pay_employee',
                    'pay_external',
                    'charge_external',
                    'fire',
                    'property_keys',
                    'stash_access',
                ]
            },
            {
                id: 2,
                first_name: 'Joe',
                last_name: 'Mama',
                role: 'Employee',
                permissions: [
                    'charge_external',
                    'property_keys',
                    'stash_access',
                ]
            }
        ]
    },
    getBusinessRoles: () => {
        return [
            {
                id: 1,
                name: 'Owner',
                permissions: [
                    'hire',
                    'change_role',
                    'pay_employee',
                    'pay_external',
                    'charge_external',
                    'fire',
                    'property_keys',
                    'stash_access',
                ]
            },
            {
                id: 2,
                name: 'Employee',
                permissions: [
                    'charge_external',
                    'property_keys',
                    'stash_access',
                ]
            }
        ]
    },
    getAssetTaxes: () => {
        return [
            {
                id: 1,
                amount: 600,
                due_date: 1599424965,
                is_paid: 0,
                asset_type: 'vehicle',
                asset_name: 'Panto'
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
                phone_number: 9999999999,
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
    getLoanConfig: () => {
        return {
            state_interest: 10,
            max_interest_rate: 35
        }
    },
    getConversations: () => {
        return [
            {
                number_from: '1234567444',
                number_to: '1231234321',
                message: 'Hello 1',
                timestamp: '2020-06-29T17:00:00Z'
            }
        ]
    },
    getMessages: (number: string) => {
        return [
            {
                number_from: '1234567444',
                number_to: '1231234321',
                message: 'Hello 2',
                timestamp: '2020-06-28T00:00:00Z'
            }
        ].filter((m => m.number_from === number || m.number_to === number))
    },
    getDocumentTypes: () => {
        return [
            {
                id: 1, //This is handled by an external api
                name: 'Notes',
                editable: true,
                shareable: false,
                can_sign: false,
                max_signatures: 4
            },
            {
                id: 2,
                name: 'Licenses',
                editable: false,
                shareable: true,
                can_sign: false,
                max_signatures: 3
            },
            {
                id: 3,
                name: 'Documents', //This is handled by an external api
                editable: true,
                shareable: true,
                can_sign: true,
                max_signatures: 3
            },
            {
                id: 4,
                name: 'Vehicle Registration',
                editable: true,
                shareable: true,
                can_sign: false
            },
            {
                id: 5,
                name: 'Housing Documents', //This is handled by an external api
                editable: true,
                shareable: true,
                can_sign: false
            },
            {
                id: 6,
                name: 'Contracts', //This is handled by an external api
                editable: true,
                shareable: true,
                can_sign: false
            }
        ]
    },
    getDocuments: (typeId: number) => {
        return [
            {
                id: 1,
                editable: false,
                can_sign: true,
                signed: null,
                title: 'My first note',
                type: 'Notes',
                type_id: 1
            },
            {
                id: 2,
                editable: false,
                can_sign: false,
                signed: null,
                title: 'My second note',
                type_id: 1
            },
            {
                id: 3,
                editable: true,
                can_sign: false,
                signed: null,
                title: 'My first Doc',
                type_id: 2
            },
            {
                id: 4,
                editable: false,
                can_sign: false,
                signed: null,
                title: 'My first Doc',
                type_id: 2
            },
            {
                id: 5,
                editable: false,
                can_sign: false,
                signed: null,
                title: 'My Unsigned Doc',
                type_id: 2
            }
        ].filter((d) => d.type_id === typeId)
    },
    getDocumentSignatures: () => {
        return [
            {
                id: 10,
                first_name: 'Alex',
                last_name: 'IsAWeeb',
                timestamp: 1598621872
            },
            {
                id: 20,
                first_name: 'Weebs',
                last_name: 'areAlex',
                timestamp: null
            }
        ]
    },
    getDocumentContent: () => {
        return {
            id: 1,
            title: 'This some title',
            content: '\n## San Andreas DMV\n\n| __Registered__ | 2020-01-01 |\n|---|---:|\n| __State ID__ | 1 |\n| __Name__ | Mr ChangMr ChangMr ChangMr ChangMr Chang |\n| __Model__ | cvpi |\n| __Plate__ | ABC12341 |\n',
            type_id: 2,
            editable: true
        }
    },
    getArticles: (typeId: number) => {
        return [
            {
                id: 1,
                editable: false,
                header_image: '',
                type_id: 2,
                title: 'My first article'
            },
            {
                id: 2,
                editable: true,
                header_image: 'https://i.imgur.com/7n1lpVo.jpg',
                type_id: 1,
                title: 'My second article',
                author: 'Dean Watson',
                modified_at: 1631231231
            }
        ].filter((a) => a.type_id === typeId);
    },
    getMusicCharts: () => {
        return [
            {
                title: 'Test me baby',
                artist: 'OTT',
                plays: '51615'
            },
            {
                title: 'Test me baby',
                artist: 'OTT',
                plays: '1110'
            },
            {
                title: 'Test me baby',
                artist: 'OTT',
                plays: '555'
            }
        ]
    },
    getArticleContent: () => {
        return {
            id: 1,
            title: 'This some title',
            images: [
                'https://i.imgur.com/7n1lpVo.jpg',
                'https://i.imgur.com/7n1lpVo.jpg',
                'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4'
            ],
            type_id: 1,
            content: '\n## San Andreas DMV\n\n| __Registered__ | 2020-01-01 |\n|---|---:|\n| __State ID__ | 1 |\n| __Name__ | Mr ChangMr ChangMr ChangMr ChangMr Chang |\n| __Model__ | cvpi |\n| __Plate__ | ABC12341 |\n'
        }
    },
    getJobCenterJobs: () => {
        return [
            {
                id: 1,
                icon: 'truck-pickup',
                name: 'Towtruck',
                employees: 3,
                groups: 2,
                vpn: false,
                pay_grade: 1,
                headquarters: [123.32, 753.14, 56.78]
            },
            {
                id: 2,
                icon: 'taxi',
                name: 'Taxi',
                employees: 3,
                groups: 2,
                vpn: false,
                pay_grade: 3,
                headquarters: [123.32, 753.14, 56.78]
            },
            {
                id: 3,
                icon: 'ambulance',
                name: 'Ambulance',
                employees: 3,
                groups: 2,
                vpn: false,
                pay_grade: 5,
                headquarters: [123.32, 753.14, 56.78]
            },
            {
                id: 4,
                icon: 'ambulance',
                name: 'Robbery',
                employees: 3,
                groups: 2,
                vpn: true,
                pay_grade: 5,
                headquarters: [123.32, 753.14, 56.78]
            }
        ]
    },
    getJobCenterGroups: () => {
        return [
            {
                id: 1,
                leader: {
                    id: 1,
                    first_name: 'Weeb',
                    last_name: 'Alex'
                },
                status: 'idle',
                public: true,
                capacity: 2,
                size: 1
            },
            {
                id: 2,
                leader: {
                    id: 2,
                    first_name: 'Alex',
                    last_name: 'Weeb'
                },
                status: 'in-activity',
                public: true,
                capacity: 2,
                size: 1
            }
        ]
    },
    getJobCenterGroupMembers: () => {
        return {
            members: [
                {
                    id: 1,
                    first_name: 'Weeb',
                    last_name: 'Alex',
                    is_leader: true,
                    is_online: true
                }
            ],
            ready: true
        }
    },
    getCurrentApartment: () => {
        return {
            roomType: 1,
            roomNumber: 1,
            streetName: 'Alta Street'
        }
    },
    getApartmentTypes: () => {
        return [
            {
                apartmentType: 1,
                apartmentPrice: 90,
                apartmentStreet: 'Small PP'
            },
            {
                apartmentType: 2,
                apartmentPrice: 180,
                apartmentStreet: 'Mid PP'
            },
            {
                apartmentType: 3,
                apartmentPrice: 360,
                apartmentStreet: 'Big PP'
            }
        ]
    },
    getProperties: () => {
        return [
            {
                id: 1,
                is_owner: true,
                is_locked: false,
                cat: 'housing',
                name: '11 Grove Street',
                keys: []
            },
            {
                id: 2,
                is_owner: false,
                is_locked: true,
                cat: 'housing',
                name: '12 Grove Street',
                keys: []
            },
            {
                id: 3,
                is_owner: false,
                is_locked: true,
                cat: 'office',
                name: '13 Grove Street',
                keys: []
            },
            {
                id: 4,
                is_owner: true,
                is_locked: true,
                cat: 'warehouse',
                name: '14 Grove Street',
                keys: []
            }
        ]
    },
    getSportsBookData: () => {
        return {
            events: [
                {
                    title: 'VLC 2 Main Event',
                    key: 'VLC 2',
                    bettors: {},
                    description: 'Eddie Marshall VS Leslie Lingberg',
                    options: {
                        Toretti: {
                            id: 'Toretti',
                            name: 'Toretti'
                        },
                        'Kyle Pred': {
                            id: 'Kyle Pred',
                            name: 'Kyle Pred'
                        }
                    },
                    locked: true,
                    minbet: 500
                }
            ]
        }
    },
    getSecurityCams: () => {
        return [
            {
                key: 1,
                name: 'Legion Square'
            },
            {
                key: 2,
                name: 'Alta Street'
            }
        ]
    },
    getCalendarEvents: () => {
        return [
            {
                id: 'random-uuid-goes-here',
                name: 'Fun Event Name',
                host: 'Penny or something',
                timestamp: Date.now() + 1000 * 60 * 60 * 24 * 2,
                code: 'ABCDEF',
                location: 'Legion Square',
                attendees: 250,
                description: 'This is a fun event description'
            }
        ]
    },
    getQueueData: () => {
        return {
            queue: [
                {
                    code: 'fleeca_go',
                    expires: Date.now() - 2700000,
                    name: 'Fleeca: Greact Ocean',
                    id: 'id_1',
                    queued: false,
                    status: 'Expired',
                },
                {
                    code: 'fleeca_go',
                    expires: Date.now() + 9400000,
                    name: 'Fleeca: Great Ocean',
                    id: 'id_2',
                    queued: false,
                    status: 'Available',
                },
                {
                    code: 'fleeca_go',
                    expires: Date.now() + 5400000,
                    name: 'Fleeca: Great Ocean',
                    id: 'id_3',
                    queued: true,
                    status: 'Available',
                },
                {
                    code: 'fleeca_go',
                    expires: Date.now() + 8100000,
                    name: 'Fleeca: Great Ocean',
                    id: 'id_4',
                    queued: false,
                    status: 'Claimed',
                },
            ],
            isManager: true,
            heistLevel: 1
        }
    },
    getGroupData: () => {
        return {
            id: '1234',
            heistActive: false,
            members: [
                {
                    characterId: 1,
                    isLeader: true,
                    isOnline: true,
                    firstName: 'monka',
                    lastName: 'S',
                },
                {
                    characterId: 2,
                    isLeader: false,
                    isOnline: true,
                    firstName: 'pepe',
                    lastName: 'Ga',
                },
            ]
        }
    },
    getGangData: () => {
        return [
            {
                id: 'gsf',
                gangName: 'GSF',
                members: [
                    {
                        cid: 1,
                        heistWeight: 4,
                        name: 'GSF Miles',
                    },
                ],
                heistWeight: 1,
            },
            {
                id: 'vagos',
                gangName: 'Vagos',
                members: [
                    {
                        cid: 5,
                        heistWeight: 10,
                        name: 'Speedy',
                    },
                ],
                heistWeight: 5,
            }
        ]
    },
    getUnitData: () => {
        return [
            {
                id: 'paynless_1',
                business_id: 'paynless',
                business_name: 'PayNLess',
                size: 1200,
                tenant_cid: 1,
                due_date: Date.now() + 604800000,
                due_amount: 1000,
                has_paid: false,
                location: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                password: 1234
            }
        ]
    }
}