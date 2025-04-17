import React, { FunctionComponent } from "react";
import Button from "components/button/button";
import { ComponentDetails } from "components/component-details";
import { ComponentDetailsAux } from "components/component-details-aux";
import { ComponentDrawer } from "components/component-drawer";
import { ComponentIcon } from "components/component-icon";
import { ComponentPaper } from "components/paper";
import { closePhoneModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import SimpleForm from "components/simple-form";
import Input from "components/input/input";
import { nuiAction } from "lib/nui-comms";

interface CarProps {
    car: any;
    action: any;
}

const Car: FunctionComponent<CarProps> = (props) => {
    const doAction = props.action;
    const car = props.car;
    const carData = [
        {
            icon: 'map-marker-alt',
            text: car.parking_garage,
        },
        {
            icon: 'closed-captioning',
            text: car.plate,
        },
        {
            icon: 'oil-can',
            text: `${Math.round(car?.stats_engine / 10)}%`,
            tooltip: 'Engine',
        },
        {
            icon: 'car-crash',
            text: `${Math.round(car?.stats_body / 10)}%`,
            tooltip: 'Body',
        }
    ];

    return (
        <ComponentPaper
            drawer={(
                <ComponentDrawer
                    items={carData}
                >
                    <div className="flex-centered flex-space-around">
                        {car?.spawnable && (
                            <Button.Tertiary size="small" onClick={() => doAction('Spawn', car)}>
                                Spawn
                            </Button.Tertiary>
                        )}
                        {car?.parking_state?.toLowerCase() !== 'in' && (
                            <Button.Primary size="small" onClick={() => doAction('Track', car)}>
                                Track
                            </Button.Primary>
                        )}
                        {car?.sellable && (
                            <Button.Secondary size="small" onClick={() => {
                                openPhoneModal(
                                    <div style={{ alignSelf: 'flex-start' }}>
                                        <SimpleForm
                                            elements={[
                                                {
                                                    name: 'stateId',
                                                    render: (prop: SimpleFormRender<number>) => {
                                                        const onChange = prop.onChange;
                                                        const value = prop.value;

                                                        return (
                                                            <Input.CityID
                                                                onChange={onChange}
                                                                value={value}
                                                            />
                                                        )
                                                    }
                                                },
                                                {
                                                    name: 'price',
                                                    render: (prop: SimpleFormRender<number>) => {
                                                        const onChange = prop.onChange;
                                                        const value = prop.value;

                                                        return (
                                                            <Input.Currency
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
                                            onSubmit={async (values) => {
                                                setPhoneModalLoading();

                                                const results = await nuiAction('ev-ui:carActionSell', {
                                                    car: car,
                                                    ...values
                                                });

                                                if (results.meta.ok) {
                                                    return closePhoneModal();
                                                }

                                                return setPhoneModalError(results.meta.message, true);
                                            }}
                                        />
                                    </div>
                                )
                            }}>
                                Sell
                            </Button.Secondary>
                        )}
                    </div>
                </ComponentDrawer>
            )}
        >
            <ComponentIcon icon={
                car.type === 'boat' ? 'ship' : 
                car.type === 'bicycle' ? 'biking' : 
                car.type === 'motorcycle' ? 'motorcycle' : 
                car.type === 'helicopter' ? 'helicopter' :
                car.type === 'plane' ? 'plane' :
                'car'
            } />
            <ComponentDetails
                title={car.plate}
                description={car.name || car.model}
            />
            <ComponentDetailsAux
                text={car.parking_state}
            />
        </ComponentPaper>
    )
}

export default Car;