import { ComponentDetails } from "components/component-details";
import { ComponentIcon } from "components/component-icon";
import Input from "components/input/input";
import { ComponentPaper } from "components/paper";
import SimpleForm from "components/simple-form";
import Text from "components/text/text";
import { fromNow } from "lib/date";
import { nuiAction } from "lib/nui-comms";
import { closePhoneModal, openConfirmModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import { callStart } from "main/phone/apps/call-history/events";

export default (props: React.PropsWithChildren<{ units: Unit[], getUnits: () => void }>) => {
    return (
        <div>
            {props.units && props.units.length > 0 && props.units.map((unit: Unit) => {
                const actions = [];

                if (!unit.tenant_cid) {
                    actions.push({
                        icon: 'user-plus',
                        title: 'Add Tenant',
                        onClick: () => {
                            openPhoneModal(
                                <SimpleForm
                                    elements={[
                                        {
                                            name: 'state_id',
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
                                        }
                                    ]}
                                    onCancel={() => {
                                        return closePhoneModal(false);
                                    }}
                                    onSubmit={async (values: any) => {
                                        setPhoneModalLoading();

                                        const results = await nuiAction('ev-storageunits:client:addTenant', {
                                            unitId: unit.id,
                                            stateId: values.state_id
                                        });

                                        if (results.meta.ok) {
                                            closePhoneModal();
                                            props.getUnits();
                                        } else {
                                            setPhoneModalError(results.meta.message);
                                        }
                                    }}
                                />
                            )
                        }
                    });
                }

                if (unit.tenant_cid) {
                    actions.push({
                        icon: 'user-slash',
                        title: 'Remove Tenant',
                        onClick: () => {
                            openConfirmModal(
                                async () => {
                                    setPhoneModalLoading();

                                    const results = await nuiAction('ev-storageunits:client:removeTenant', {
                                        unitId: unit.id
                                    });

                                    if (results.meta.ok) {
                                        closePhoneModal();
                                        props.getUnits();
                                    } else {
                                        setPhoneModalError(results.meta.message);
                                    }
                                },
                                'Are you sure you want to remove this tenant?',
                            )
                        }
                    });

                    actions.push({
                        icon: 'key',
                        title: 'Change Password',
                        onClick: () => {
                            openPhoneModal(
                                <div>
                                    <Text variant="body1">
                                        Current Password: {unit.password}
                                    </Text>
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
                    });

                    actions.push({
                        icon: 'phone-alt',
                        title: 'Call Tenant',
                        onClick: () => callStart({ number: unit.phone_number })
                    });
                }

                actions.push({
                    icon: 'map-marked',
                    title: 'Set GPS',
                    onClick: () => {
                        nuiAction('ev-storageunits:client:setGps', {
                            location: unit.location
                        });
                    }
                });

                return (
                    <ComponentPaper
                        key={unit.id}
                        actions={actions}
                    >
                        <ComponentIcon icon="archive" />
                        <ComponentDetails
                            title={(
                                <div>
                                    <Text variant="body2">
                                        {unit.id} ({unit.size})
                                    </Text>
                                    <Text variant="body2">
                                        Current Tenant: {unit.tenant_cid ?? 'None'}
                                    </Text>
                                </div>
                            )}
                            description={( //Need to check if due date is today and if it is say "Today" instead of the date
                                <div>
                                    <Text variant="body2">
                                        Status: {unit.has_paid ? 'Paid' : unit.tenant_cid ? 'Unpaid' : 'Unoccupied'}
                                    </Text>
                                    <Text variant="body2">
                                        Payment Due: {unit.tenant_cid ? (
                                            new Date(unit.due_date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
                                                ? 'Today'
                                                : new Date(unit.due_date) < new Date()
                                                    ? `Overdue ${Math.floor((new Date().getTime() - new Date(unit.due_date).getTime()) / (1000 * 60 * 60 * 24))}d`
                                                    : String(fromNow(unit.due_date / 1000)).replace('in ', '')
                                        ) : 'N/A'}
                                    </Text>
                                </div>
                            )}
                        />
                    </ComponentPaper>
                )
            })}
        </div>
    )
}