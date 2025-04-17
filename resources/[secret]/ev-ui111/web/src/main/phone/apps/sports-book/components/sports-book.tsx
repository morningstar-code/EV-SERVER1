import React, { FunctionComponent } from "react";
import AppContainer from "main/phone/components/app-container";
import useStyles from "./sports-book.styles";
import Button from "components/button/button";
import { Typography } from "@mui/material";
import { closePhoneModal, isEmployed, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import SimpleForm from "components/simple-form";
import Input from "components/input/input";
import moment from "moment-timezone";
import { nuiAction } from "lib/nui-comms";
import { getCharacter } from "lib/character";
import { ComponentPaper } from "components/paper";
import { ComponentDrawer } from "components/component-drawer";
import { ComponentIcon } from "components/component-icon";
import { ComponentDetails } from "components/component-details";

const SportsBook: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const events = props.events ?? [];
    const characterId = getCharacter().id;

    const isEventLocked = (event: any) => {
        return !!event.locked || moment().tz('UTC').unix() > event.autolock
    }

    const calculateBetsAndPercent = (id: string | number, event: any) => {
        const bettors = event.bettors ?? [];
        if (!bettors || Object.keys(event.bettors).length === 0) return '0 bets / 0%';

        let data = {};
        let amount = 0;

        Object.values(bettors).forEach((bettor: any) => {
            const defaultData = {
                amount: 0,
                bets: 0
            };

            if (!data[bettor.option]) {
                data[bettor.option] = defaultData;
            }

            data[bettor.option].bets += 1;
            data[bettor.option].amount += bettor.amount;

            amount += bettor.amount;
        });

        return data[id] ? `$${Math.ceil(data[id].amount / 1000)}k / ${((data[id].amount / amount) * 100).toFixed(1)}%` : '0 bets / 0%';
    }

    return (
        <AppContainer>
            <div className={classes.wrapper}>
                <div className={classes.icon}>
                    <i className="fas fa-gem fa-fw fa-3x" style={{ color: 'white' }} />
                </div>
                {isEmployed('sports_book') && (
                    <div className={classes.addButton}>
                        <Button.Primary onClick={() => {
                            openPhoneModal(
                                <SimpleForm
                                    elements={[
                                        {
                                            name: 'key',
                                            render: (prop: SimpleFormRender<string>) => {
                                                const onChange = prop.onChange;
                                                const value = prop.value;

                                                return (
                                                    <Input.Text
                                                        icon="pencil-alt"
                                                        label="Key (Unique)"
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )
                                            },
                                            validate: ['text', 'Key']
                                        },
                                        {
                                            name: 'title',
                                            render: (prop: SimpleFormRender<string>) => {
                                                const onChange = prop.onChange;
                                                const value = prop.value;

                                                return (
                                                    <Input.Text
                                                        icon="pencil-alt"
                                                        label="Title"
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )
                                            }
                                        },
                                        {
                                            name: 'description',
                                            render: (prop: SimpleFormRender<string>) => {
                                                const onChange = prop.onChange;
                                                const value = prop.value;

                                                return (
                                                    <Input.Text
                                                        icon="pencil-alt"
                                                        label="Description"
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )
                                            }
                                        },
                                        {
                                            name: 'minbet',
                                            render: (prop: SimpleFormRender<string>) => {
                                                const onChange = prop.onChange;
                                                const value = prop.value;

                                                return (
                                                    <Input.Text
                                                        icon="pencil-alt"
                                                        label="Min. Bet"
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )
                                            },
                                            validate: ['number', 'Min. Bet']
                                        },
                                        {
                                            name: 'autolock',
                                            render: (prop: SimpleFormRender<string>) => {
                                                const onChange = prop.onChange;
                                                const value = prop.value;

                                                return (
                                                    <Input.Text
                                                        icon="pencil-alt"
                                                        label="Auto-Lock (Hours from now, timezone: UTC)"
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )
                                            },
                                            validate: ['number', 'Auto Lock']
                                        }
                                    ]}
                                    onCancel={() => {
                                        closePhoneModal(false);
                                    }}
                                    onSubmit={async (values) => {
                                        setPhoneModalLoading();

                                        let autolock = 0;

                                        if (values.autolock) {
                                            const time = moment().tz('UTC').add(Number(values.autolock), 'hours');
                                            autolock = time.unix();
                                        }

                                        const results = await nuiAction('ev-ui:casino:updateEvent', {
                                            event: {
                                                autolock: autolock,
                                                key: values.key,
                                                title: values.title,
                                                description: values.description,
                                                minBet: isNaN(Number(values.minbet)) ? 0 : Number(values.minbet) || 0
                                            }
                                        });

                                        if (results.meta.ok) {
                                            props.getSportsBookData();
                                            closePhoneModal();
                                        }

                                        return setPhoneModalError(results.meta.message);
                                    }}
                                />
                            )
                        }}>
                            Add Event
                        </Button.Primary>
                    </div>
                )}
                <div>
                    {!events.length && (
                        <Typography variant="h5" style={{ color: '#fff', textAlign: 'center', marginTop: 16 }}>
                            No Events
                        </Typography>
                    )}
                    {!!events.length && events.map((event: any) => {
                        const actions = [];

                        if (!isEventLocked(event) || !(event.bettors && event.bettors[characterId])) {
                            actions.push({
                                icon: 'dollar-sign',
                                title: 'Place Bet',
                                onClick: () => {
                                    openPhoneModal(
                                        <SimpleForm
                                            elements={[
                                                {
                                                    name: 'option',
                                                    render: (prop: SimpleFormRender<string>) => {
                                                        const onChange = prop.onChange;
                                                        const value = prop.value;

                                                        return (
                                                            <Input.Select
                                                                label="Option"
                                                                onChange={onChange}
                                                                value={value || ''}
                                                                items={event.options ? Object.values(event.options).map((option: any) => {
                                                                    return {
                                                                        id: option.id,
                                                                        name: option.name
                                                                    }
                                                                }) : []}
                                                            />
                                                        )
                                                    },
                                                    validate: ['text', 'Option']
                                                },
                                                {
                                                    name: 'amount',
                                                    render: (prop: SimpleFormRender<number>) => {
                                                        const onChange = prop.onChange;
                                                        const value = prop.value;

                                                        return (
                                                            <Input.Currency
                                                                label={`Amount (Min Bet: $${event.minbet})`}
                                                                onChange={onChange}
                                                                value={value}
                                                            />
                                                        )
                                                    },
                                                    validate: ['number', 'Amount']
                                                }
                                            ]}
                                            onCancel={() => {
                                                closePhoneModal(false);
                                            }}
                                            onSubmit={async (values: any) => {
                                                //TODO;
                                            }}
                                        />
                                    )
                                }
                            });
                        }

                        if (isEmployed('sports_book')) {
                            actions.push({
                                icon: 'pencil-alt',
                                title: 'Edit',
                                onClick: () => {
                                    openPhoneModal(
                                        <SimpleForm
                                            elements={[
                                                {
                                                    name: 'title',
                                                    render: (prop: SimpleFormRender<string>) => {
                                                        const onChange = prop.onChange;
                                                        const value = prop.value;

                                                        return (
                                                            <Input.Text
                                                                icon="pencil-alt"
                                                                label="Title"
                                                                onChange={onChange}
                                                                value={value}
                                                            />
                                                        )
                                                    },
                                                    validate: ['text', 'Title']
                                                },
                                                {
                                                    name: 'description',
                                                    render: (prop: SimpleFormRender<string>) => {
                                                        const onChange = prop.onChange;
                                                        const value = prop.value;

                                                        return (
                                                            <Input.Text
                                                                icon="pencil-alt"
                                                                label="Description"
                                                                onChange={onChange}
                                                                value={value}
                                                            />
                                                        )
                                                    },
                                                    validate: ['text', 'Description']
                                                }
                                            ]}
                                            onCancel={() => {
                                                closePhoneModal(false);
                                            }}
                                            onSubmit={async (values) => {
                                                //TODO;
                                            }}
                                        />
                                    )
                                }
                            });
                            actions.push({
                                icon: 'user-plus',
                                title: 'Add Option',
                                onClick: () => {
                                    openPhoneModal(
                                        <SimpleForm
                                            elements={[
                                                {
                                                    name: 'key',
                                                    render: (prop: SimpleFormRender<string>) => {
                                                        const onChange = prop.onChange;
                                                        const value = prop.value;

                                                        return (
                                                            <Input.Text
                                                                icon="pencil-alt"
                                                                label="Key (Unique)"
                                                                onChange={onChange}
                                                                value={value}
                                                            />
                                                        )
                                                    },
                                                    validate: ['text', 'Key']
                                                },
                                                {
                                                    name: 'title',
                                                    render: (prop: SimpleFormRender<string>) => {
                                                        const onChange = prop.onChange;
                                                        const value = prop.value;

                                                        return (
                                                            <Input.Text
                                                                icon="pencil-alt"
                                                                label="Title"
                                                                onChange={onChange}
                                                                value={value}
                                                            />
                                                        )
                                                    },
                                                    validate: ['text', 'Title']
                                                }
                                            ]}
                                            onCancel={() => {
                                                closePhoneModal(false);
                                            }}
                                            onSubmit={async (values) => {
                                                //TODO;
                                            }}
                                        />
                                    )
                                }
                            });
                            actions.push({
                                icon: 'user-slash',
                                title: 'Remove Option',
                                onClick: () => {
                                    openPhoneModal(
                                        <SimpleForm
                                            elements={[
                                                {
                                                    name: 'option',
                                                    render: (prop: SimpleFormRender<string>) => {
                                                        const onChange = prop.onChange;
                                                        const value = prop.value;

                                                        return (
                                                            <Input.Select
                                                                label="Option"
                                                                onChange={onChange}
                                                                value={value || ''}
                                                                items={event.options ? Object.values(event.options).map((option: any) => {
                                                                    return {
                                                                        id: option.id,
                                                                        name: option.name
                                                                    }
                                                                }) : []}
                                                            />
                                                        )
                                                    },
                                                    validate: ['text', 'Option']
                                                }
                                            ]}
                                            onCancel={() => {
                                                closePhoneModal(false);
                                            }}
                                            onSubmit={async (values) => {
                                                //TODO;
                                            }}
                                        />
                                    )
                                }
                            });
                            actions.push({
                                icon: 'hand-holding-usd',
                                title: 'Refund',
                                onClick: () => {
                                    //TODO;
                                }
                            });
                        }

                        if (isEmployed('sports_book') && !isEventLocked(event)) {
                            actions.push({
                                icon: 'key',
                                title: 'Lock',
                                onClick: () => {
                                    //TODO;
                                }
                            });
                        }

                        if (isEmployed('sports_book') && isEventLocked(event)) {
                            actions.push({
                                icon: 'flag-checkered',
                                title: 'Close / Pay Out',
                                onClick: () => {
                                    openPhoneModal(
                                        <SimpleForm
                                            elements={[
                                                {
                                                    name: 'winner',
                                                    render: (prop: SimpleFormRender<string>) => {
                                                        const onChange = prop.onChange;
                                                        const value = prop.value;

                                                        return (
                                                            <Input.Select
                                                                label="Option"
                                                                onChange={onChange}
                                                                value={value || ''}
                                                                items={event.options ? Object.values(event.options).map((option: any) => {
                                                                    return {
                                                                        id: option.id,
                                                                        name: option.name
                                                                    }
                                                                }) : []}
                                                            />
                                                        )
                                                    },
                                                    validate: ['text', 'Winner']
                                                }
                                            ]}
                                            onCancel={() => {
                                                closePhoneModal(false);
                                            }}
                                            onSubmit={async (values: any) => {
                                                //TODO;
                                            }}
                                        />
                                    )
                                }
                            });
                        }

                        return (
                            <ComponentPaper
                                key={event.key}
                                actions={actions}
                                drawer={(
                                    <ComponentDrawer
                                        items={Object.values(event.options || {}).map((option: any) => {
                                            return {
                                                icon: 'funnel-dollar',
                                                text: `${option.name} (${calculateBetsAndPercent(option.id, event)})`
                                            }
                                        })}
                                    />
                                )}
                            >
                                <ComponentIcon icon="dollar-sign" />
                                <ComponentDetails title={event.title} description={event.description} />
                            </ComponentPaper>
                        )
                    })}
                </div>
            </div>
        </AppContainer>
    )
}

export default SportsBook;