import React from "react";
import AppContainer from "main/phone/components/app-container";
import { getRacingAlias, hasPdDongle } from "../../actions";
import List from "../list";
import Text from "components/text/text";
import Input from "components/input/input";
import moment from "moment";
import { closePhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import { nuiAction } from "lib/nui-comms";

interface LeaderboardProps {
    race: RaceTrack;
}

const getLeaderboardData = async (
    race,
    racingAlias,
    vehicleClass,
    setVehicleClass: (vehicleClass: string) => void,
    setBestLapTimes: (bestLapTimes: any[]) => void,
    setBestLapTimeForAlias: (bestLapTimeForAlias: any) => void
) => {
    setPhoneModalLoading();

    const results = await nuiAction('ev-ui:racingBestLapTimes', {
        id: race.id,
        alias: racingAlias,
        vehicleClass: vehicleClass
    });

    if (results.meta.ok) {
        closePhoneModal(false);
        setVehicleClass(vehicleClass);
        setBestLapTimes(results.data.bestLapTimes);
        setBestLapTimeForAlias(results.data.bestLapTimeForAlias);
        return;
    }

    setPhoneModalError(results.meta.message);
}

const getLeaderboardRows = (bestLapTimes, bestLapTimeForAlias) => {
    let matched = false;
    const rows = [];

    for (let i = 0; i < bestLapTimes.length; i++) {
        const bestLapTime = bestLapTimes[i];
        const matching = bestLapTimeForAlias && bestLapTime.alias === bestLapTimeForAlias.alias && bestLapTime.characterId === bestLapTimeForAlias.characterId;
        const time = moment(bestLapTime.bestLapTime).format('mm:ss.SSS');
        const text = `${time}\n${bestLapTime.alias} | ${bestLapTime.vehicle || 'Unknown'}`;

        if (matching) {
            matched = true;
            rows.push({
                key: i,
                data: [
                    {
                        text: i + 1,
                        style: { fontWeight: 'bold' },
                    },
                    {
                        text: text,
                        style: {
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-line',
                            fontWeight: 'bold',
                        },
                    },
                ]
            });
        } else {
            rows.push({
                key: i,
                data: [
                    i + 1,
                    {
                        text: text,
                        style: {
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-line',
                        },
                    },
                ]
            });
        }
    }

    if (!matched && bestLapTimeForAlias) {
        const bestLapTimesLength = bestLapTimes.length;
        const time = moment(bestLapTimeForAlias.bestLapTime).format('mm:ss.SSS');
        const text = `${time}\n${bestLapTimeForAlias.alias} | ${bestLapTimeForAlias.vehicle || 'Unknown'}`;
        bestLapTimeForAlias.ranking > bestLapTimesLength + 1 && rows.push({
            key: bestLapTimesLength,
            data: ['-', '-']
        });
        rows.push({
            key: bestLapTimesLength + 1,
            data: [
                {
                    text: bestLapTimeForAlias.ranking,
                    style: { fontWeight: 'bold' },
                },
                {
                    text: text,
                    style: {
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-line',
                        fontWeight: 'bold',
                    },
                },
            ]
        });
    }

    return rows;
}

export default (props: LeaderboardProps) => {
    if (!props.race) return null;

    const hasPd = hasPdDongle();
    const racingAlias = hasPd ? null : getRacingAlias();
    const [vehicleClass, setVehicleClass] = React.useState('All');
    const [bestLapTimes, setBestLapTimes] = React.useState(null);
    const [bestLapTimeForAlias, setBestLapTimeForAlias] = React.useState(null);

    React.useEffect(() => {
        getLeaderboardData(
            props.race,
            racingAlias,
            vehicleClass,
            setVehicleClass,
            setBestLapTimes,
            setBestLapTimeForAlias
        );
    }, []);

    return (
        bestLapTimes ? <AppContainer
            containerStyle={{ padding: 0 }}
            style={{ padding: 0 }}
        >
            <Text variant="h6">
                Best Lap Times
            </Text>
            <Text variant="body1" style={{ marginBottom: hasPdDongle ? 8 : 4 }}>
                {props.race.name || 'Unset'}
            </Text>
            {!hasPd && (
                <div style={{ marginBottom: 8 }}>
                    <Input.Select
                        label="Vehicle Class"
                        items={[
                            {
                                id: 'All',
                                name: 'All',
                            },
                            {
                                id: 'M',
                                name: 'M',
                            },
                            {
                                id: 'X',
                                name: 'X',
                            },
                            {
                                id: 'S',
                                name: 'S',
                            },
                            {
                                id: 'A',
                                name: 'A',
                            },
                            {
                                id: 'B',
                                name: 'B',
                            }
                        ]}
                        onChange={(e: string) => {
                            return getLeaderboardData(
                                props.race,
                                racingAlias,
                                e,
                                setVehicleClass,
                                setBestLapTimes,
                                setBestLapTimeForAlias
                            );
                        }}
                        value={vehicleClass}
                    />
                </div>
            )}
            <List
                headers={['#', 'Best Lap Time']}
                rows={getLeaderboardRows(bestLapTimes, bestLapTimeForAlias)}
                cellStyle={{ padding: '6px 12px' }}
            />
        </AppContainer>
            : null
    )
}