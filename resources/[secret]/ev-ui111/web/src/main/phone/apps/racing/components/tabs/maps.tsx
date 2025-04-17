import React from "react";
import Button from "components/button/button";
import { storeObj } from "lib/redux";
import AppContainer from "main/phone/components/app-container";
import Track from "../track";
import { getRacingCategory, hasPdDongle } from "../../actions";
import { nuiAction } from "lib/nui-comms";
import { closePhoneModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import SimpleForm from "components/simple-form";
import Input from "components/input/input";

interface MapsProps {
    maps: RaceTrack[];
    tournaments: RaceTournament[];
    creatingRace: boolean;
    character: Character;
    updateState: (state: any) => void;
    onRaceCreated: () => void;
    openLeaderboard: (race: RaceTrack) => void;
}

export default (props: MapsProps) => {
    const hasPd = hasPdDongle();
    const category = getRacingCategory() ?? 'underground';
    const [maps, setMaps] = React.useState(props.maps);

    React.useEffect(() => {
        setMaps(props.maps);
    }, [props.maps]);

    const GetRandomMaps = () => {
        return maps.find((map: RaceTrack) => map.id === "random");
    }

    return (
        <AppContainer
            containerStyle={{ padding: 0 }}
            style={{ padding: 0 }}
        >
            {storeObj.getState().phone?.hasUsbRacingCreate && (
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex',
                    alignItems: 'flex',
                    flexDirection: 'column',
                    padding: 8,
                    textAlign: 'center'
                }}>
                    {!props.creatingRace && (
                        <Button.Primary style={{ marginTop: 16 }} onClick={() => {
                            openPhoneModal(
                                <SimpleForm
                                    defaultValues={{
                                        raceMinLaps: '1'
                                    }}
                                    elements={[
                                        {
                                            name: 'raceName',
                                            render: (prop: SimpleFormRender<string>) => {
                                                const onChange = prop.onChange;
                                                const value = prop.value;

                                                return (
                                                    <Input.Name
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )
                                            }
                                        },
                                        {
                                            name: 'raceType',
                                            render: (prop: SimpleFormRender<string>) => {
                                                const onChange = prop.onChange;
                                                const value = prop.value;

                                                return (
                                                    <Input.Select
                                                        items={[
                                                            {
                                                                id: 'Sprint',
                                                                name: 'Sprint'
                                                            },
                                                            {
                                                                id: 'Lap',
                                                                name: 'Laps'
                                                            }
                                                        ]}
                                                        label="Type"
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )
                                            }
                                        },
                                        {
                                            name: 'raceMinLaps',
                                            render: (prop: SimpleFormRender<string>) => {
                                                const onChange = prop.onChange;
                                                const value = prop.value;

                                                return prop.values.raceType !== "Lap" ? <div /> : <Input.Text
                                                    label="Min Laps"
                                                    icon="recycle"
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            },
                                            validate: {
                                                fn: (value) => {
                                                    return Number(value) > 0 && Number(value) < 100;
                                                },
                                                message: 'Number must be between 1 and 99'
                                            }
                                        }
                                    ]}
                                    onCancel={() => {
                                        return closePhoneModal(false);
                                    }}
                                    onSubmit={async (values: any) => {
                                        values.raceCategory = category;
                                        values.raceMinLaps = Number(values.raceMinLaps) || 1;

                                        setPhoneModalLoading();

                                        const results = await nuiAction('ev-ui:racingCreateMap', {
                                            ...values,
                                            raceThumbnail: 'https'
                                        });

                                        if (results.meta.ok) {
                                            props.updateState({ creatingRace: true });
                                            closePhoneModal();
                                            return;
                                        }

                                        props.updateState({ creatingRace: false });
                                        closePhoneModal();

                                        setPhoneModalError(results.meta.message, true);
                                    }}
                                />
                            )
                        }}>
                            Create {hasPd ? 'Time Trial' : 'Race'} Map
                        </Button.Primary>
                    )}
                    {props.creatingRace && (
                        <>
                            <Button.Primary style={{ marginTop: 16 }} onClick={() => {
                                props.updateState({ creatingRace: false });
                                nuiAction('ev-ui:racingFinishMap');
                            }}>
                                Complete Map Creation
                            </Button.Primary>
                            <Button.Secondary style={{ marginTop: 16 }} onClick={() => {
                                props.updateState({ creatingRace: false });
                                nuiAction('ev-ui:racingCancelMap');
                            }}>
                                Cancel Map Creation
                            </Button.Secondary>
                        </>
                    )}
                </div>
            )}
            <AppContainer
                containerStyle={{ padding: 0 }}
                style={{ padding: 0 }}
                search={{
                    filter: ['name', 'type'],
                    list: props.maps,
                    onChange: setMaps
                }}
            >
                {!hasPdDongle && GetRandomMaps() && (
                    <Track
                        key="random"
                        race={GetRandomMaps()}
                        tournaments={props.tournaments}
                        character={props.character}
                        onRaceCreated={props.onRaceCreated}
                        openLeaderboard={props.openLeaderboard}
                    />
                )}
                {maps.filter((map: RaceTrack) => map.category === category).map((map: RaceTrack) => {
                    return (
                        <Track
                            key={map.id}
                            race={map}
                            tournaments={props.tournaments}
                            character={props.character}
                            onRaceCreated={props.onRaceCreated}
                            openLeaderboard={props.openLeaderboard}
                        />
                    )
                })}
            </AppContainer>
        </AppContainer>
    )
}