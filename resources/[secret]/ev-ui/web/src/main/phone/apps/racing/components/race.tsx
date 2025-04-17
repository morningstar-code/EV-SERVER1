import { ComponentDetails } from "components/component-details";
import { ComponentDetailsAux } from "components/component-details-aux";
import { ComponentDrawer } from "components/component-drawer";
import { ComponentPaper } from "components/paper";
import { formatCurrency } from "lib/format";
import { nuiAction } from "lib/nui-comms";
import moment from "moment";
import { getRacingAlias, hasPdDongle } from "../actions";
import "./race.scss";
import { closePhoneModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import { openConfirmModal } from "main/phone/actions";
import SimpleForm from "components/simple-form";
import Input from "components/input/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getRaceActions = (race: Race, player: RacePlayer, type: string, isRaceOwner: boolean, characterId: number) => {
    return isRaceOwner && type === 'pending' && player?.characterId !== characterId ? [
        {
            icon: ['far', 'times-circle'],
            title: 'Kick',
            onClick: () => {
                openConfirmModal(
                    async () => {
                        setPhoneModalLoading();

                        const results = await nuiAction('ev-ui:racingKickFromRace', {
                            raceId: race.eventId,
                            playerId: player.id
                        });

                        if (results.meta.ok) {
                            return closePhoneModal();
                        }

                        setPhoneModalError(results.meta.message);
                    },
                    `Are you sure you want to kick ${player.alias} from this race?`
                );
            }
        },
        // {
        //     icon: 'ban',
        //     title: 'Ban',
        //     onClick: () => {
        //         openConfirmModal(
        //             async () => {
        //                 setPhoneModalLoading();

        //                 const results = await nuiAction('ev-ui:racingBanFromRace', {
        //                     raceId: race.eventId,
        //                     playerId: player.id
        //                 });

        //                 if (results.meta.ok) {
        //                     return closePhoneModal();
        //                 }

        //                 setPhoneModalError(results.meta.message);
        //             },
        //             `Are you sure you want to ban ${player.alias} from this race?`
        //         );
        //     }
        // }
    ] : []
}

const getRaceRewardAndLapTime = (player: RacePlayer, isTimeTrial: boolean) => {
    const lapTime = `[${formatRaceLapTime(player.finished)} / ${formatRaceLapTime(player.bestLapTime)}]`;
    return isTimeTrial ? lapTime :
        player?.tournamentPoints ? <span>[{formatCurrency(player.prize)}/<FontAwesomeIcon icon="trophy" />{player?.tournamentPoints ?? '\u2014'}] {lapTime}</span> :
            <span>[{formatCurrency(player.prize)}/<FontAwesomeIcon icon="horse-head" />{player?.cryptoReward ?? '\u2014'}] {lapTime}</span>
}

const formatRaceLapTime = (time: number) => {
    return time ? moment(time).format('mm:ss.SSS') : 'DNF';
}

const joinRace = async (race: Race, password: string) => {
    setPhoneModalLoading();

    const results = await nuiAction('ev-ui:racingJoinRace', {
        race: race,
        alias: hasPdDongle() ? null : getRacingAlias(),
        password: password
    });

    if (results.meta.ok) {
        return closePhoneModal();
    }

    setPhoneModalError(results.meta.message, true);
}

interface RaceProps {
    race: Race;
    character: Character;
    type: string;
    isNightTime: boolean;
    onConversationOpened: (data: any) => void;
}

export default (props: RaceProps) => {
    const isTimeTrial = hasPdDongle();
    const race = props.race;
    const raceTitle = isTimeTrial ? 'Time Trial' : 'Race';
    const racePlayers = race.players ? Array.isArray(race.players) ? race.players : Object.values(race.players) : [];

    const isInRaceNotLeft = !!racePlayers.find((player: RacePlayer) => {
        return Number(player.characterId) === props.character.id && !player.leftRace;
    });
    const isInRace = !!racePlayers.find((player: RacePlayer) => {
        return Number(player.characterId) === props.character.id;
    });
    const isRaceOwner = Number(race.owner) === -1 || Number(race.owner) === props.character.id;
    const noPasswordAndHasntLeft = !race.password || isInRaceNotLeft;

    const actions = [];

    props.type === 'pending' && noPasswordAndHasntLeft && actions.push({
        icon: 'map-marker',
        title: 'Set GPS',
        onClick: () => {
            nuiAction('ev-ui:racingLocateRace', {
                race: race,
                id: race.raceId,
                eventId: race.eventId
            });
        }
    });

    props.type === 'pending' && noPasswordAndHasntLeft && race.id !== 'random' && actions.push({
        icon: 'eye',
        title: 'Preview',
        onClick: () => {
            nuiAction('ev-ui:racingPreviewRace', {
                race: race,
                id: race.raceId,
                eventId: race.eventId
            });
        }
    });

    !isTimeTrial && isInRace && actions.push({
        icon: 'comment',
        title: 'Chat',
        onClick: async () => {
            setPhoneModalLoading();

            const results = await nuiAction('ev-ui:racingGetEventConversation', {
                eventId: race.eventId
            });

            if (results.meta.ok) {
                closePhoneModal(false);
                results.data.raceType = props.type;
                props.onConversationOpened(results.data);
                return;
            }

            setPhoneModalError(results.meta.message, true);
        }
    });

    if (props.type !== 'pending' || isInRaceNotLeft || isRaceOwner) {
        if (props.type === 'pending' && isRaceOwner) {
            actions.push({
                icon: 'arrow-circle-right',
                title: `Start ${raceTitle} ${props.isNightTime ? ' (2x)' : ''}`,
                onClick: async () => {
                    setPhoneModalLoading();

                    const results = await nuiAction('ev-ui:racingStartRace', {
                        race: race
                    });

                    if (results.meta.ok) {
                        return closePhoneModal();
                    }

                    setPhoneModalError(results.meta.message, true);
                }
            });
        }
    } else {
        actions.push({
            icon: 'user-plus',
            title: `Join ${raceTitle}`,
            onClick: async () => {
                if (!race.password) {
                    return joinRace(race, null);
                }

                openPhoneModal(
                    <SimpleForm
                        elements={[
                            {
                                name: "password",
                                render: (prop: SimpleFormRender<number>) => {
                                    const onChange = prop.onChange;
                                    const value = prop.value;

                                    return (
                                        <Input.Password
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )
                                }
                            }
                        ]}
                        onCancel={() => {
                            return closePhoneModal(false);
                        }}
                        onSubmit={(values: { password: string }) => {
                            return joinRace(race, values.password);
                        }}
                    />
                )
            }
        });
    }

    if (isInRaceNotLeft && (props.type === 'active' || (props.type === 'pending'))) { // (isInRaceNotLeft && (props.type === 'active' || (props.type === 'pending')) && !isRaceOwner)
        actions.push({
            icon: 'user-minus',
            title: `Leave ${raceTitle}`,
            onClick: async () => {
                setPhoneModalLoading();

                const results = await nuiAction('ev-ui:racingLeaveRace', {
                    race: race
                });

                if (results.meta.ok) {
                    return closePhoneModal();
                }

                setPhoneModalError(results.meta.message);
            }
        });
    }

    props.type !== 'active' && props.type !== 'pending' || !isRaceOwner || actions.push({ //Make sure only owner sees this
        icon: 'flag-checkered',
        title: `End ${raceTitle}`,
        onClick: () => {
            openConfirmModal(
                async () => {
                    setPhoneModalLoading();

                    const results = await nuiAction('ev-ui:racingEndRace', {
                        race: race,
                    });

                    if (results.meta.ok) {
                        return closePhoneModal();
                    }

                    setPhoneModalError(results.meta.message);
                },
                `Are you sure you want to end the ${raceTitle.toLowerCase()}?`
            );
        }
    });

    const mappedPlayers = racePlayers.map((p: RacePlayer) => {
        return {
            icon: Number(race.owner) === p.characterId ? 'crown' : 'user',
            text: <span style={{ marginRight: '4px' }}>{p.alias} {props.type !== 'completed' ? null : getRaceRewardAndLapTime(p, isTimeTrial)}</span>,
            actions: getRaceActions(
                race,
                p,
                props.type,
                isRaceOwner,
                props.character.id
            )
        }
    });

    return (
        <ComponentPaper
            actions={actions}
            drawer={props.type && mappedPlayers.length !== 0 ? <ComponentDrawer items={mappedPlayers} /> : null}
            expandDrawerOnActionClick={false}
        >
            <ComponentDetails
                title={race.eventName}
                titleClass="title-race-event-name"
                description={race.type === 'Sprint' ? 'Sprint' : `Laps (${race.laps}) / ${race.vehicleClass}`}
            />
            {!!race.length && (
                <ComponentDetailsAux
                    text={`${Number((race.length / 1000) * 0.715).toFixed(2)}mi`}
                    auxClass="aux-race-length"
                />
            )}
        </ComponentPaper>
    )
}