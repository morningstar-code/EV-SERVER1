import { ComponentDetails } from "components/component-details";
import { ComponentIcon } from "components/component-icon";
import Input from "components/input/input";
import { ComponentPaper } from "components/paper";
import SimpleForm from "components/simple-form";
import { fromNow } from "lib/date";
import { formatCurrency } from "lib/format";
import { nuiAction } from "lib/nui-comms";
import { closePhoneModal, openConfirmModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import React from "react";

export default (props: React.PropsWithChildren<{ units: Unit[], character: Character, getUnits: () => void }>) => {
    return (
        <div>
            {props.units && props.units.length > 0 && props.units.map((unit: Unit) => (
                <ComponentPaper
                    key={unit.id}
                    actions={[
                        {
                            icon: 'dollar-sign',
                            title: 'Make Payment',
                            onClick: () => {
                                openConfirmModal(
                                    async () => {
                                        const results = await nuiAction('ev-storageunits:client:makePayment', {
                                            unitId: unit.id
                                        });

                                        if (results.meta.ok) {
                                            closePhoneModal();
                                            props.getUnits();
                                        } else {
                                            setPhoneModalError(results.meta.message);
                                        }
                                    },
                                    `Are you sure you want to make a payment of ${formatCurrency(unit.due_amount ?? 0)}?`,
                                )
                            }
                        },
                        {
                            icon: 'map-marked',
                            title: 'Set GPS',
                            onClick: () => {
                                nuiAction('ev-storageunits:client:setGps', {
                                    location: unit.location
                                });
                            }
                        },
                        {
                            icon: 'key',
                            title: 'Change Password',
                            onClick: () => {
                                openPhoneModal(
                                    <div>
                                        <SimpleForm
                                            elements={[
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
                                                    validate: ['number', 'Password']
                                                }
                                            ]}
                                            onCancel={() => {
                                                return closePhoneModal(false);
                                            }}
                                            onSubmit={async (values: any) => {
                                                setPhoneModalLoading();

                                                const results = await nuiAction('ev-storageunits:client:changePassword', {
                                                    unitId: unit.id,
                                                    password: values.password
                                                });

                                                if (results.meta.ok) {
                                                    closePhoneModal();
                                                    props.getUnits();
                                                } else {
                                                    setPhoneModalError(results.meta.message);
                                                }
                                            }}
                                        />
                                    </div>
                                )
                            }
                        }
                    ]}
                >
                    <ComponentIcon icon="archive" />
                    <ComponentDetails
                        title={`${unit.id} (${unit.size})`}
                        description={`Payment Due: ${unit.tenant_cid ? (
                            new Date(unit.due_date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
                                ? 'Today'
                                : new Date(unit.due_date) < new Date()
                                    ? 'Overdue'
                                    : String(fromNow(unit.due_date / 1000)).replace('in ', '')
                        ) : 'N/A'}`}
                    />
                </ComponentPaper>
            ))}
        </div>
    )
}