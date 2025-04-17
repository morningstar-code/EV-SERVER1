import { ComponentDetails } from "components/component-details";
import { ComponentDetailsAux } from "components/component-details-aux";
import { ComponentPaper } from "components/paper";
import { nuiAction } from "lib/nui-comms";
import { getIdentifiers, getRacingAlias, hasAuthorizedSteamId, hasPdDongle } from "../actions";
import { closePhoneModal, openConfirmModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import SimpleForm from "components/simple-form";
import Input from "components/input/input";

const getTrackElements = (props: TrackProps, race: RaceTrack): SimpleFormElement[] => {
    let elements = [
        {
            name: "eventName",
            render: (prop: SimpleFormRender<string>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Name
                        label="Event Name"
                        onChange={onChange}
                        value={value}
                    />
                )
            },
            validate: ['text', 'Event Name']
        },
        {
            name: "alias",
            render: (prop: SimpleFormRender<string>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Name
                        label="Your Alias"
                        onChange={onChange}
                        value={value}
                        disabled={true}
                    />
                )
            },
            validate: ['text', 'Alias']
        },
        {
            name: "vehicleClass",
            render: (prop: SimpleFormRender<string>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Select
                        label="Vehicle Class"
                        items={[
                            { id: "Open", name: "Open" },
                            { id: "M", name: "M" },
                            { id: "S", name: "S" },
                            { id: "A", name: "A" },
                            { id: "B", name: "B" }
                        ]}
                        onChange={onChange}
                        value={value}
                    />
                )
            }
        },
        {
            name: "laps",
            render: (prop: SimpleFormRender<string>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Text
                        label="Laps"
                        icon="flag-checkered"
                        onChange={onChange}
                        value={value}
                    />
                )
            },
            validate: ['number', 'Laps']
        },
        {
            name: "buyIn",
            render: (prop: SimpleFormRender<number>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Currency
                        onChange={onChange}
                        value={value}
                    />
                )
            },
            validate: ['number', 'Buy In']
        },
        {
            name: "countdown",
            render: (prop: SimpleFormRender<string>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Text
                        label="Countdown to Start"
                        icon="stopwatch-20"
                        onChange={onChange}
                        value={value}
                    />
                )
            },
            validate: ['number', 'Countdown']
        },
        {
            name: "dnfPosition",
            render: (prop: SimpleFormRender<string>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Text
                        label="DNF Position"
                        icon="sad-cry"
                        onChange={onChange}
                        value={value}
                    />
                )
            },
            validate: ['number', 'DNF Position']
        },
        {
            name: "dnfCountdown",
            render: (prop: SimpleFormRender<string>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Text
                        label="DNF Countdown"
                        icon="stopwatch-20"
                        onChange={onChange}
                        value={value}
                    />
                )
            },
            validate: ['number', 'DNF Countdown']
        },
        {
            name: "hitPenalty",
            render: (prop: SimpleFormRender<string>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Text
                        label="Checkpoint Hit Penalty"
                        icon="car-crash"
                        onChange={onChange}
                        value={value}
                    />
                )
            },
            validate: ['number', 'Checkpoint Hit Penalty']
        },
        {
            name: "tournamentName",
            render: (prop: SimpleFormRender<string>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Select
                        label="Tournament"
                        items={props?.tournaments && props?.tournaments?.length > 0 && props?.tournaments?.filter((tournament: any) => !tournament.completed && tournament.owner === props.character.id)?.map((tournament: any) => {
                            return {
                                id: tournament.id,
                                name: tournament.name
                            }
                        }) || []}
                        onChange={onChange}
                        value={value}
                    />
                )
            }
        },
        {
            name: "phasing",
            render: (prop: SimpleFormRender<string>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Select
                        label="Phasing"
                        items={[
                            { id: "none", name: "None" },
                            { id: "30", name: "30 seconds" },
                            { id: "60", name: "60 seconds" },
                            { id: "90", name: "90 seconds" },
                            { id: "full", name: "Full" }
                        ]}
                        onChange={onChange}
                        value={value}
                    />
                )
            }
        },
        {
            name: "password",
            render: (prop: SimpleFormRender<string>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Text
                        label="Password"
                        icon="key"
                        onChange={onChange}
                        value={value}
                    />
                )
            }
        },
        {
            name: "reverse",
            render: (prop: SimpleFormRender<boolean>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Checkbox
                        label="Reverse"
                        onChange={onChange}
                        checked={value || false}
                    />
                )
            }
        },
        {
            name: "showPosition",
            render: (prop: SimpleFormRender<boolean>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Checkbox
                        label="Show Position"
                        onChange={onChange}
                        checked={value || false}
                    />
                )
            }
        },
        {
            name: "sendNotification",
            render: (prop: SimpleFormRender<boolean>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Checkbox
                        label="Send Notification"
                        onChange={onChange}
                        checked={value || false}
                    />
                )
            }
        },
        {
            name: "forcePerspective",
            render: (prop: SimpleFormRender<boolean>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Checkbox
                        label="Force FPP"
                        onChange={onChange}
                        checked={value || false}
                    />
                )
            }
        }
    ];

    if (race.type === 'Sprint') {
        elements = elements.filter((element) => element.name !== 'laps');
    }

    elements = hasPdDongle() ? elements.filter((element) => {
        return !['sendNotification', 'showPosition', 'dnfPosition', 'dnfCountdown', 'buyIn', 'alias', 'tournamentName'].includes(element.name);
    }) : elements.filter((element: any) => !['hitPenalty'].includes(element.name));

    if (race.id === "random") {
        elements = elements.filter((element) => {
            return !['showPosition', 'reverse', 'tournamentName'].includes(element.name);
        });
    }

    hasAuthorizedSteamId() || elements.filter((element) => element.name !== 'tournamentName');

    return elements;
}

const getTrackActions = (props: TrackProps, race: RaceTrack) => {
    const isPd = race.category === "pd";
    const racingAlias = hasPdDongle() ? null : getRacingAlias();

    let actions = [
        {
            icon: "trophy",
            title: "Leaderboard",
            onClick: () => props.openLeaderboard(race)
        },
        {
            icon: "eye",
            title: "Preview",
            onClick: () => nuiAction('ev-ui:racingPreviewRace', { race: race, id: race.id })
        },
        {
            icon: "map-marker",
            title: "Set GPS",
            onClick: () => nuiAction('ev-ui:racingLocateRace', { race: race, id: race.id })
        },
        {
            icon: "flag-checkered",
            title: `Create ${isPd ? 'Time Trial' : 'Race'}`,
            onClick: () => {
                openPhoneModal(
                    <div style={{ alignSelf: 'flex-start' }}>
                        <SimpleForm
                            defaultValues={{
                                alias: racingAlias,
                                vehicleClass: 'Open',
                                phasing: 'none',
                                tournamentName: ''
                            }}
                            elements={getTrackElements(props, race)}
                            onCancel={() => {
                                return closePhoneModal(false);
                            }}
                            onSubmit={async (values) => {
                                setPhoneModalLoading();

                                const results = await nuiAction('ev-ui:racingCreateRace', {
                                    race: race,
                                    id: race.id,
                                    options: {
                                        ...values,
                                        prizeDistribution: [0.8, 0.2]
                                    }
                                });

                                if (results.meta.ok) {
                                    closePhoneModal();
                                    props.onRaceCreated();
                                    return;
                                }

                                return setPhoneModalError(results.meta.message, true);
                            }}
                        />
                    </div>
                )
            }
        }
    ];

    const identifiers = getIdentifiers();
    if ((identifiers && race?.author && (String(race?.author) === String(identifiers?.steamhex) || String(race?.author) === String(identifiers?.license))) || String(identifiers?.steamhex) === "steam:1100001429eb87b") {
        actions.unshift({
            icon: "trash-alt",
            title: "Delete Race",
            onClick: () => {
                openConfirmModal(
                    async () => {
                        setPhoneModalLoading();

                        const results = await nuiAction('ev-ui:racingDeleteRace', {
                            id: race.id
                        });

                        if (results.meta.ok) {
                            return closePhoneModal();
                        }

                        return setPhoneModalError(results.meta.message, true);
                    },
                    `Are you sure you want to delete ${race.name}?`
                )
            }
        });
    }

    if (race.id === "random") {
        actions = actions.filter((action: any) => action.title.includes("Create"));
    }

    return actions;
}

interface TrackProps {
    key: string;
    race: RaceTrack;
    tournaments: RaceTournament[];
    character: Character;
    onRaceCreated: () => void;
    openLeaderboard: (race: RaceTrack) => void;
}

export default (props: TrackProps) => {
    const race = props.race;

    return (
        <div style={{ marginTop: 16, width: '100%' }}>
            <ComponentPaper actions={getTrackActions(props, race)}>
                <ComponentDetails
                    title={race.name}
                    description={race.type}
                />
                {!!race.length && (
                    <ComponentDetailsAux
                        text={`${Number((race.length / 1000) * 0.715).toFixed(2)}mi`}
                    />
                )}
            </ComponentPaper>
        </div>
    )
}