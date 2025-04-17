import { ComponentDetails } from "components/component-details";
import { ComponentDrawer } from "components/component-drawer";
import { ComponentPaper } from "components/paper";
import Text from "components/text/text";
import { nuiAction } from "lib/nui-comms";
import { closePhoneModal, openConfirmModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import { getRacingAlias } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getTournamentActions = (tournament: RaceTournament, players: RacePlayer[], character: Character) => {
    if (tournament.completed) {
        return [];
    }

    const myPlayer = !!players.find((player: RacePlayer) => Number(player.characterId) === character.id);

    const actions = [];

    Number(tournament.owner) === -1 || Number(tournament.owner) === character.id ? actions.push({
        icon: 'flag-checkered',
        title: 'Cancel Tournament',
        onClick: () => {
            openConfirmModal(
                async () => {
                    setPhoneModalLoading();

                    const results = await nuiAction('ev-ui:racingEndTournament', {
                        tournament: tournament
                    });

                    if (results.meta.ok) {
                        return closePhoneModal();
                    }

                    setPhoneModalError(results.meta.message);
                },
                'Are you sure you want to cancel the tournament?'
            )
        }
    }) : myPlayer ? actions.push({
        icon: 'user-minus',
        title: 'Leave Tournament',
        onClick: () => {
            openConfirmModal(
                async () => {
                    setPhoneModalLoading();

                    const results = await nuiAction('ev-ui:racingLeaveTournament', {
                        tournament: tournament
                    });

                    if (results.meta.ok) {
                        return closePhoneModal();
                    }

                    setPhoneModalError(results.meta.message);
                },
                'Are you sure you want to leave the tournament?'
            )
        }
    }) : tournament.active || actions.push({
        icon: 'user-plus',
        title: 'Join Tournament',
        onClick: async () => {
            setPhoneModalLoading();

            const results = await nuiAction('ev-ui:racingJoinTournament', {
                tournament: tournament,
                alias: getRacingAlias()
            });

            if (results.meta.ok) {
                return closePhoneModal();
            }

            setPhoneModalError(results.meta.message, true);
        }
    });

    return actions;
}

const cryptoReward = (tournament: RaceTournament, player: RacePlayer) => {
    return (
        <span>
            [<FontAwesomeIcon icon={tournament.completed ? 'horse-head' : 'trophy'} /> {player?.cryptoReward ?? '\u2014'}]
        </span>
    );
}

interface TournamentProps {
    tournament: RaceTournament;
    character: Character;
}

export default (props: TournamentProps) => {
    const tournament = props.tournament;
    const players = Object.values(tournament.players);

    players.sort((a: RacePlayer, b: RacePlayer) => {
        return b?.cryptoReward ?? 0 - a?.cryptoReward ?? 0;
    });

    const mappedPlayers = players.map((player: RacePlayer) => {
        return {
            icon: 'user',
            text: <span style={{ marginRight: '4px' }}>{player.alias} {tournament.active ? cryptoReward(tournament, player) : null}</span>
        }
    });

    return (
        <ComponentPaper
            actions={getTournamentActions(tournament, players, props.character)}
            drawer={mappedPlayers.length === 0 ? null : <ComponentDrawer items={mappedPlayers} />}
            expandDrawerOnActionClick={false}
        >
            <ComponentDetails
                title={tournament.name}
                titleClass=""
                description={(
                    <Text variant="body2">
                        Races (3)
                    </Text>
                )}
            />
        </ComponentPaper>
    )
}