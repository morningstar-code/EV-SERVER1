import React, { FunctionComponent } from "react";
import { availableWifiSpots } from "main/phone/spots.config";
import SimpleForm from "components/simple-form";
import Input from "components/input/input";
import { closePhoneModal, connectToWifi } from "main/phone/actions";

const WifiModal: FunctionComponent<any> = (props: any) => {
    const location = props.location;
    const foundSpot: any = availableWifiSpots.find((wifi) => wifi.location === location);

    return (
        <SimpleForm
            defaultValues={{
                network: Array.isArray(foundSpot) ? foundSpot[0].id : foundSpot.id,
            }}
            elements={[
                {
                    name: 'network',
                    render: (prop: SimpleFormRender<string>) => {
                        const onChange = prop.onChange;
                        const value = prop.value;

                        return (
                            <Input.Select
                                label="Network"
                                items={foundSpot}
                                onChange={onChange}
                                value={value}
                            />
                        )
                    }
                },
                {
                    name: 'password',
                    render: (prop: SimpleFormRender<number>) => {
                        const onChange = prop.onChange;
                        const value = prop.value;

                        return (
                            <Input.Password
                                onChange={onChange}
                                value={value}
                            />
                        )
                    },
                    validate: {
                        fn: (value, values) => {
                            const network = values.network;

                            if (value === undefined) {
                                value = '';
                            }

                            try {
                                const foundHotSpot = Array.isArray(foundSpot) ? foundSpot.find((spot) => spot.id === network) : foundSpot;

                                return (!foundHotSpot.password || foundHotSpot.password === value);
                            } catch (e) {
                                return false;
                            }
                        },
                        message: 'Password incorrect'
                    }
                }
            ]}
            onCancel={() => closePhoneModal(false)}
            onSubmit={(prop) => {
                const network = prop.network;
                closePhoneModal();
                const foundHotSpot = Array.isArray(foundSpot) ? foundSpot.find((spot) => spot.id === network) : foundSpot;
                if (foundHotSpot) {
                    connectToWifi(foundHotSpot);
                }
            }}
        />
    )
}

export default WifiModal;