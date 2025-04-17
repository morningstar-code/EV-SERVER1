import { Typography } from "@mui/material";
import Input from "components/input/input";
import SimpleForm from "components/simple-form";
import { formatCurrency } from "lib/format";
import { nuiAction } from "lib/nui-comms";
import { closePhoneModal, getCurrentLocation, isAtLocation, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import { ComponentDetails } from "components/component-details";
import { ComponentPaper } from "components/paper";

export default (props: any) => {
    const car = props.car;
    const actions = [];
    const displays = [
        {
            id: '1',
            name: '1'
        },
        {
            id: '2',
            name: '2'
        },
        {
            id: '3',
            name: '3'
        },
        {
            id: '4',
            name: '4'
        },
        {
            id: '5',
            name: '5'
        }
    ]

    if (car.current_stock !== 0) {
        actions.push({
            icon: 'car',
            title: 'Test Drive',
            onClick: async () => {
                setPhoneModalLoading();

                const results = await nuiAction('ev-ui:showroomTestDrive', {
                    model: car.model,
                    location: getCurrentLocation()
                });
                
                if (results) {
                    closePhoneModal();
                } else {
                    setPhoneModalError(results?.meta?.message);
                }

                //setPhoneModalLoading();
            }
        });

        if (isAtLocation(['pdm', 'tuner'])) {
            displays.push({
                id: '6',
                name: '6'
            });
            displays.push({
                id: '7',
                name: '7'
            });
        }

        actions.push({
            icon: 'eye',
            title: 'Display',
            onClick: () => {
                openPhoneModal(
                    <SimpleForm
                        defaultValues={{ idx: '1' }}
                        elements={[
                            {
                                name: 'idx',
                                render: (prop: SimpleFormRender<string>) => {
                                    const onChange = prop.onChange;
                                    const value = prop.value;

                                    return (
                                        <Input.Select
                                            label="Position"
                                            items={displays}
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )
                                }
                            }
                        ]}
                        onCancel={() => {
                            closePhoneModal(false);
                        }}
                        onSubmit={(values) => {
                            const idx = values.idx;
                            closePhoneModal();

                            nuiAction('ev-ui:showroomDisplayCar', {
                                index: parseInt(idx, 10),
                                model: car.model
                            });
                        }}
                    />
                )
            }
        });
    } else {
        actions.push({
            icon: 'times-circle',
            title: 'Out of Stock',
            onClick: () => { }
        });
    }

    return (
        <ComponentPaper
            actions={actions}
        >
            <ComponentDetails
                title={(
                    <div className="flex flex-centered flex-space-between">
                        <Typography variant="body1" style={{ color: 'white' }}>
                            {car.brand || ''}
                        </Typography>
                        <Typography variant="body1" style={{ color: 'white' }}>
                            {car.name}
                        </Typography>
                    </div>
                )}
                description={(
                    <div className="flex flex-centered flex-space-between">
                        <Typography variant="body1" style={{ color: 'white' }}>
                            {car.group || 'Unknown'}
                        </Typography>
                        <Typography variant="body1" style={{ color: 'white' }}>
                            {formatCurrency(car.retail_price)} ({car.current_stock < 0 ? '99' : car.current_stock})
                        </Typography>
                    </div>
                )}
            />
        </ComponentPaper>
    )
}