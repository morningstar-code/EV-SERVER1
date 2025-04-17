import React, { FunctionComponent } from "react";
import { availableWifiSpots } from "main/burner/spots.config";
import SimpleForm from "components/simple-form";
import Input from "components/input/input";
import { closeBurnerModal, connectToWifi } from "main/burner/actions";

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
                    render: (prop: any) => {
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
                    render: (prop: any) => {
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
                        fn: (p1, p2) => {
                            const network = p2.network;

                            if (p1 === undefined) {
                                p1 = '';
                            }

                            try {
                                const foundHotSpot = Array.isArray(foundSpot) ? foundSpot.find((spot) => spot.id === network) : foundSpot;

                                return (!foundHotSpot.password || foundHotSpot.password === p1);
                            } catch (e) {
                                return false;
                            }
                        },
                        message: 'Password incorrect'
                    }
                }
            ]}
            onCancel={() => closeBurnerModal(false)}
            onSubmit={(prop) => {
                const network = prop.network;
                closeBurnerModal();
                const foundHotSpot = Array.isArray(foundSpot) ? foundSpot.find((spot) => spot.id === network) : foundSpot;
                if (foundHotSpot) {
                    connectToWifi(foundHotSpot);
                }
            }}
        />
    )
}

export default WifiModal;