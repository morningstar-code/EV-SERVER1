import { devData } from "main/phone/dev-data";
import React, { FunctionComponent } from "react";
import { isEnvBrowser } from "utils/misc";
import "./cmdlet.scss";

const cmdletApps = {
    atm: () => {
        return { app: 'atm' }
    },
    bank: (data) => {
        return {
            app: 'cash',
            data: {
                amountAdjustment: data[1],
                bankAmount: data[0],
                bankName: data[2]
            },
        }
    },
    ballot: () => {
        return { app: 'ballot' }
    },
    burner: (data) => {
        const action = data[0];
        const state: { [key: string]: any } = { action: action };

        switch (action) {
            case 'email-receive':
                state.subject = data[1];
                state.body = data[2];
                break;
            case 'twatter-receive':
                state.character = {
                    id: data[1],
                    first_name: data[2],
                    last_name: data[3]
                };
                state.text = data[4];
                break;
            case 'sms-receive':
                state.number = data[1];
                state.message = data[2];
                break;
            case 'job-check-in':
                state.job_id = data[1];
                break;
            default:
                state.name = data[1];
                state.number = data[1];
                break;
        }

        return {
            ...state,
            app: 'burner'
        }
    },
    cash: (data) => {
        return {
            app: 'cash',
            cash: data[0],
            amountAdjustment: data[1]
        }
    },
    cashbank: (data) => {
        return {
            app: 'cash',
            data: {
                bankAmount: data[1],
                bankName: data[2],
                cash: data[0]
            },
        }
    },
    contextmenu: (data) => {
        return {
            app: 'contextmenu',
            show: true,
            position: data[0],
            options: JSON.parse(data[1])
        }
    },
    debuglogs: (data) => {
        return {
            app: 'debuglogs',
            data: { display: data[0] === 'show' }
        }
    },
    drpager: (data) => {
        return {
            app: 'drpager',
            show: true,
            data: { hospital: data[0] }
        }
    },
    gametime: (data) => {
        return {
            app: 'game',
            data: { time: data[0] }
        }
    },
    interactions: (data) => {
        return {
            app: 'interactions',
            data: {
                type: data[0],
                show: data[1] === 'true',
                message: data[2]
            }
        }
    },
    main: (data) => {
        return {
            app: 'main',
            action: data[0]
        }
    },
    phone: (data) => {
        const action = data[0];
        const state: { [key: string]: any } = { action: action };

        switch (action) {
            case 'email-receive':
                state.sender = data[1];
                state.subject = data[2];
                state.body = data[3];
                break;
            case 'vehicle-purchase':
                state.price = data[1];
                break;
            case 'view-document':
                state.title = data[1];
                state.content = data[2];
                break;
            case 'loan-offer':
                state.data.amount = Number(data[1]);
                state.data.interest = data[2];
                state.data.business = { name: data[3] };
                break;
            case 'charge-accept':
                state.data.amount = Number(data[1]);
                state.data.comment = data[2];
                state.data.business = { name: data[3] };
                break;
            case 'twatter-receive':
                state.character.id = data[1];
                state.character.first_name = data[2];
                state.character.last_name = data[3];
                state.text = data[4];
                break;
            case 'sms-receive':
                state.number = data[1];
                state.message = data[2];
                break;
            case 'crypto-receive':
                state.number = data[1];
                state.message = data[2];
                break;
            case 'weather-update':
                state.icon = data[1];
                break;
            case 'notification':
                state.target_app = data[1];
                state.title = data[2];
                state.body = data[3];
                state.show_even_if_app_active = data[4] === true || data[4] === 'true';
                break;
            case 'call-inactive':
                state.number = data[1];
                state.message = data[2];
                break;
            case 'note-qr-code':
                state.title = data[1];
                state.content = data[2];
                break;
            case 'jobs-update':
                state.state = JSON.parse(data[1]);
                break;
            case 'job-check-in':
                state.job_id = data[1];
                break;
            case 'job-group-join-deny':
                state.requestId = data[1];
                break;
            case 'job-group-join-accept':
                state.requestId = data[1];
                break;
            case 'job-group-join-request':
                state.group_id = data[1];
                state.member = JSON.parse(data[2]);
                break;
            case 'job-group-update':
                const members = [...devData.getJobCenterGroupMembers().members];
                members.pop();
                state.members = members;
                break;
            case 'job-group-offer-activity':
                state.activity_id = Number(data[1]);
                state.message = data[2];
                break;
            case 'job-group-activity':
                state.activity = {
                    id: 1,
                    name: 'Police Vehicle Impound',
                    deadline: '2020-07-08T03:30:00.000Z',
                    tasks: [
                        {
                            id: 1,
                            description: 'Go to the Vehicle Pickup Location bruh',
                            wanted: 1,
                            count: 1,
                            tracked: []
                        },
                        {
                            id: 2,
                            description: 'Load up 5 vehicles on 1 truck because this is NoPixel',
                            wanted: 5,
                            count: 0,
                            tracked: []
                        },
                        {
                            id: 3,
                            description: 'Burn all the vehicles outside MRPD',
                            wanted: 1,
                            count: 0,
                            tracked: [
                                {
                                    id: 1,
                                    name: 'Towtruck',
                                    minLabel: 'Damage',
                                    minValue: 100,
                                    maxLabel: 'Limit',
                                    maxValue: 500
                                },
                                {
                                    id: 2,
                                    name: 'Vehicle Impounded',
                                    minLabel: 'Damage',
                                    minValue: 100,
                                    maxLabel: 'Limit',
                                    maxValue: 500
                                }
                            ]
                        }
                    ]
                };
                break;
            case 'job-group-activity-n':
                state.activity = {
                    id: 1,
                    name: 'Police Vehicle Impound',
                    deadline: '2020-07-08T03:30:00.000Z',
                    tasks: [
                        {
                            id: 1,
                            description: 'Go to the Vehicle Pickup Location bruh',
                            wanted: 1,
                            count: 1,
                            tracked: []
                        },
                        {
                            id: 2,
                            description: 'Load up 5 vehicles on 1 truck because this is NoPixel',
                            wanted: 5,
                            count: 1,
                            tracked: []
                        },
                        {
                            id: 3,
                            description: 'Burn all the vehicles outside MRPD',
                            wanted: 1,
                            count: 0,
                            tracked: [
                                {
                                    id: 1,
                                    name: 'Towtruck',
                                    minLabel: 'Damage',
                                    minValue: 100,
                                    maxLabel: 'Limit',
                                    maxValue: 500
                                },
                                {
                                    id: 2,
                                    name: 'Vehicle Impounded',
                                    minLabel: 'Damage',
                                    minValue: 600,
                                    maxLabel: 'Limit',
                                    maxValue: 500
                                }
                            ]
                        }
                    ]
                };
                break;
            default:
                state.name = data[1];
                state.number = data[1];
                state.message = data[1];
                state.show = data[0] === 'show';
                break;
        }

        return {
            ...state,
            app: 'phone'
        }
    },
    newspaper: () => {
        return { app: 'newspaper' }
    },
    radio: () => {
        return { app: 'radio' }
    },
    showroom: (data) => {
        return {
            app: 'showroom',
            shop: data[0]
        }
    },
    sounds: (data) => {
        return {
            app: 'sounds',
            data: {
                action: data[0],
                id: data[1],
                name: data[2],
                volume: Number(data[3]),
                loop: data[4] === 'true'
            }
        }
    },
    ui: (data) => {
        return {
            app: 'main',
            action: data[0]
        }
    },
    taskbar: (data) => {
        return {
            app: 'taskbar',
            display: data[0] === 'true',
            duration: Number(data[1]),
            label: data[2],
        }
    },
    photo: (data) => {
        return {
            app: 'npolaroid-photo',
            show: true,
            description: data[0],
            uuid: data[1],
            created: Number(data[2]),
            id: Number(data[3])
        }
    },
    showImage: (data) => {
        return {
            app: 'show-image',
            show: true,
            url: data[0]
        }
    },
    vehiclemenu: (data) => {
        return {
            app: 'vehicle-menu',
            show: data[0] === 'show',
            settings: {
                seats: [],
                doorAccess: false,
                engine: false,
                windows: {},
                doors: {},
                extLights: false,
                intLights: false,
                hazard: false,
                nitrous: "Boost",
                neons: {},
            }
        }
    }
}

const App: FunctionComponent = () => {
    const [consoleValue, setConsoleValue] = React.useState('');

    if (!isEnvBrowser) {
        return null;
    }

    return (
        <>
            {isEnvBrowser() && (

                <div className="cmdlet-wrapper">
                    <p style={{ marginRight: 16 }}>
                        Console
                    </p>
                    <input
                        onChange={(e) => setConsoleValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                try {
                                    const matched = consoleValue.match(/`.+`|(?:[^\s"']+|['"][^'"]*["'])+/g) || [].map((x) => {
                                        return x.indexOf('`') ? x.replace(/("|')/g, '') : x.replace(/`/g, '');
                                    })

                                    const shifted = matched.shift() || '';

                                    const matchedApp = cmdletApps[shifted](matched);

                                    const appState = { app: matchedApp.app, content: matchedApp?.content };
                                    
                                    window.dispatchEvent(
                                        new MessageEvent("message", {
                                            data: {
                                                source: "ev-nui",
                                                ...appState,
                                                ...matchedApp,
                                                data: matchedApp || {}
                                            }
                                        })
                                    );
                                } catch (error: any) {
                                    alert('could not do that bro: ' + error.message);
                                }
                            }
                        }}
                        type="text"
                        value={consoleValue}
                    />
                </div>
            )}
        </>
    )
}

export default App;