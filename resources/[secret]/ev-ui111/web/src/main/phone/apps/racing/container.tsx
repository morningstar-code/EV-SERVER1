import React from 'react';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import { nuiAction } from 'lib/nui-comms';
import Racing from './components/racing';

const { mapStateToProps, mapDispatchToProps } = compose(store);

interface Props {
    updateState: (state: any) => void;
    currentConversation: any;
    character: Character;
    creatingRace: boolean;
    maps: RaceTrack[];
    tournaments: RaceTournament[];
}

class Container extends React.Component<Props> {
    getAllRaces = async () => {
        const results = await nuiAction('ev-ui:racingGetAllRaces', {}, {
            returnData: {
                activeRaces: [],
                completed: [
                    {
                        buyIn: 500,
                        category: 'underground',
                        eventId:
                            'e512b674-f2f2-4eda-8d43-753c472a6600',
                        eventName: 'Drag $500',
                        id: 0,
                        isNightTime: false,
                        laps: 1,
                        length: 346.57598876953125,
                        owner: 1001,
                        players: [
                            {
                                alias: 'Ghost',
                                bestLapTime: 11710,
                                characterId: 1001,
                                cryptoReward: 0,
                                curCheckpointIndex: 2,
                                finished: 11710,
                                id: 1,
                                lastPos: 1,
                                leftRace: false,
                                name: 'Michael Person',
                                place: 1,
                                prize: 500,
                                straightDistToCheckpoint: 165.95692443847656,
                                totalDist: 165.95692443847656,
                                vehicle: 'Continental GT Dragon',
                                vehicleClass: 'S',
                                vehicleFullyUpgraded: false,
                                vehicleVin: '2MNSP05WL2D284490',
                                vehicleVinScratched: false,
                            },
                        ],
                        raceId:
                            '0260b257-fa5a-4d8a-9582-b9206ff422f4',
                        reverse: false,
                        timestamp: 1646114346594,
                        track: 'Drag Queen',
                        type: 'Sprint',
                        vehicleClass: 'S',
                    }
                ],
                pendingRaces: {
                    '7392b75b-f662-4330-ba8c-6868e26307f0': {
                        author: 'steam:110000106995cc4',
                        bannedPlayers: [],
                        bubblePopper: false,
                        buyIn: 500,
                        category: 'underground',
                        countdown: 15,
                        createdAt: 1646114207007,
                        dnfCountdown: 180,
                        dnfPosition: 1,
                        eventId:
                            '7392b75b-f662-4330-ba8c-6868e26307f0',
                        eventName: 'Directors $500',
                        hitPenalty: 0,
                        id: '16405319-11d8-4188-967e-adfd38041328',
                        laps: 3,
                        length: 9655.98046875,
                        name: "Director's Cut",
                        owner: 1001,
                        phasing: '30',
                        players: {
                            1: {
                                alias: 'Ghost',
                                characterId: 1001,
                                finished: false,
                                id: 1,
                                lastPos: -1,
                                leftRace: false,
                                name: 'Michael Person',
                            },
                        },
                        prizeDistribution: [0.6, 0.3, 0.1],
                        reverse: false,
                        sendNotification: false,
                        showPosition: true,
                        start: [],
                        thumbnail: 'https',
                        type: 'Lap',
                        vehicleClass: 'A',
                        visible: 1,
                    }
                },
                races: {
                    '0260b257-fa5a-4d8a-9582-b9206ff422f4': {
                        author: 'steam:110000106995cc4',
                        category: 'underground',
                        createdAt: 1614952800,
                        id: '0260b257-fa5a-4d8a-9582-b9206ff422f4',
                        length: 346.57598876953125,
                        name: 'Drag Queen',
                        start: [],
                        thumbnail: 'https',
                        type: 'Sprint',
                        visible: 1,
                    },
                    '16405319-11d8-4188-967e-adfd38041328': {
                        author: 'steam:110000106995cc4',
                        category: 'underground',
                        createdAt: 1614952800,
                        id: '16405319-11d8-4188-967e-adfd38041328',
                        length: 9655.98046875,
                        name: "Director's Cut",
                        start: [],
                        thumbnail: 'https',
                        type: 'Lap',
                        visible: 1,
                    },
                    '25712fe9-ac43-4b02-9d81-f600f010cbaa': {
                        author: 'steam:110000102179203',
                        category: 'pd',
                        createdAt: 1622615633,
                        id: '25712fe9-ac43-4b02-9d81-f600f010cbaa',
                        length: 11906.900390625,
                        name: 'Sandy Shores(Challenger)',
                        start: [],
                        thumbnail: 'https',
                        type: 'Lap',
                        visible: 1,
                    },
                    random: {
                        author: 'steam:11000010516795a',
                        category: 'random',
                        createdAt: 1646113170855,
                        id: 'random',
                        minLaps: 1,
                        name: 'Random Waypoint',
                        thumbnail: 'https',
                        type: 'Sprint',
                        visible: true,
                    },
                }
            }
        });

        //console.log("maps", results.data.races);

        const sortedMaps = Object.values(results.data.races).sort((a: RaceTrack, b: RaceTrack) => {
            return a.name.localeCompare(b.name);
        });

        //console.log("sortedMaps", sortedMaps);

        const sortedPending = Object.values(results.data.pendingRaces).sort((a: Race, b: Race) => {
            return a.createdAt === b.createdAt ? 0 : b.createdAt - a.createdAt;
        });

        //console.log("sortedPending", sortedPending);

        const sortedActive = Object.values(results.data.activeRaces).sort((a: Race, b: Race) => {
            return a.createdAt === b.createdAt ? 0 : b.createdAt - a.createdAt;
        });

        //console.log("sortedActive");

        //console.log("completed", results.data.completed);

        const sortedCompleted = results.data.completed !== undefined && Object.values(results.data.completed).map((complete: RaceCompleted) => {
            return {
                ...complete,
                name: complete.track
            }
        }).sort((a: RaceCompleted, b: RaceCompleted) => {
            return a.timestamp === b.timestamp ? 0 : b.timestamp - a.timestamp;
        }) || [];

        //console.log("sortedCompleted");

        this.props.updateState({
            active: sortedActive,
            completed: sortedCompleted,
            maps: sortedMaps,
            pending: sortedPending
        });
    }

    getAllTournaments = async () => {
        const results = await nuiAction<ReturnData<RaceTournament[]>>('ev-ui:racingGetAllTournaments', {}, { returnData: [] });

        this.props.updateState({
            tournaments: results.data
        });
    }

    componentDidMount() {
        this.getAllRaces();
        this.getAllTournaments();
        nuiAction('ev-ui:racingSetNightTime');
    }

    render() {
        return (
            <Racing {...this.props} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);