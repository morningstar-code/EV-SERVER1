import { nuiAction } from 'lib/nui-comms';
import AppContainer from 'main/phone/components/app-container';
import React from 'react';
import ShowroomCar from './showroom-car';
import { closePhoneModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from 'main/phone/actions';
import Text from 'components/text/text';
import { getCurrentVehicle } from 'lib/character';
import { formatCurrency } from 'lib/format';
import Input from 'components/input/input';
import SimpleForm from 'components/simple-form';

export default (props: any) => {
    const [cars, setCars] = React.useState(props.cars);

    React.useEffect(() => {
        setCars(props.cars);
    }, [props.cars]);

    const primaryActions = [];
    const currentVehicle = getCurrentVehicle();
    const filteredCars = cars.filter(car => {
        return !!car.active;
    });

    if (currentVehicle) {
        const vehicle = filteredCars.find(car => {
            return String(car.hash) === String(currentVehicle);
        });

        primaryActions.push({
            icon: 'car',
            title: 'Return Car',
            onClick: () => nuiAction('ev-ui:showroomTestDriveReturn')
        });

        primaryActions.push({
            icon: 'spray-can',
            title: 'Save Preset',
            onClick: async () => {
                setPhoneModalLoading(true);
                const results = await nuiAction('ev-ui:showroomTestDriveSavePreset', {});

                if (results.meta.ok) {
                    return closePhoneModal();
                }

                return setPhoneModalError(results.meta.message);
            }
        });

        primaryActions.push({
            icon: 'dollar-sign',
            title: 'Sell Car',
            onClick: () => {
                openPhoneModal(
                    <div>
                        <div style={{ marginBottom: 16 }}>
                            <Text variant="body2">
                                Min: {formatCurrency(vehicle?.import_price)}
                            </Text>
                            <Text variant="body2">
                                Retail: {formatCurrency(vehicle?.retail_price)}
                            </Text>
                        </div>
                        <SimpleForm
                            elements={[
                                {
                                    name: 'cityId',
                                    render: (prop: SimpleFormRender<number>) => {
                                        const onChange = prop.onChange;
                                        const value = prop.value;

                                        return (
                                            <Input.CityID
                                                onChange={onChange}
                                                value={value}
                                            />
                                        )
                                    },
                                    validate: ['number', 'State ID']
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
                                    },
                                    validate: {
                                        fn: (value) => {
                                            return vehicle.import_price < Number(value)
                                        },
                                        message: 'Price too low.'
                                    }
                                }
                            ]}
                            onCancel={() => {
                                closePhoneModal(false);
                            }}
                            onSubmit={async (values) => {
                                setPhoneModalLoading();

                                const results = await nuiAction('ev-ui:showroomSellCar', {
                                    state_id: Number(values.cityId),
                                    price: Number(values.price)
                                });

                                if (results.meta.ok) {
                                    return closePhoneModal();
                                }

                                return setPhoneModalError(results.meta.message);
                            }}
                        />
                    </div>
                )
            }
        });
    }

    return (
        <AppContainer
            primaryActions={primaryActions}
            search={{
                filter: ['name', 'brand', 'group', 'model'],
                list: props.cars,
                onChange: setCars
            }}
        >
            {filteredCars.map((car, idx) => (
                <ShowroomCar key={idx} {...props} car={car} />
            ))}
        </AppContainer>
    )
}