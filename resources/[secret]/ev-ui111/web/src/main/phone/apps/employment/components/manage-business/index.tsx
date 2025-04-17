import React, { FunctionComponent } from "react";
import AppContainer from "main/phone/components/app-container";
import Employee from "./employee";
import { closePhoneModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import SimpleForm from "components/simple-form";
import Input from "components/input/input";
import CreateRoleModal from "../create-role-modal";
import EditRoleModal from "../edit-role-modal";
import { nuiAction } from "lib/nui-comms";

const ManageBusiness: FunctionComponent<any> = (props) => {
    const [employees, setEmployees] = React.useState(props.employees);

    React.useEffect(() => {
        setEmployees(props.employees);
    }, [props.employees]);

    const primaryActions = [];
    const auxActions = [];

    if (props.activeBusiness !== -1) {
        if (props.roles.length > 0) {
            if (props.activeBusiness.permissions.includes('hire')) {
                auxActions.push({
                    icon: 'user-plus',
                    title: 'Hire',
                    onClick: () => {
                        const role = props.roles[0].id;
                        openPhoneModal(
                            <SimpleForm
                                defaultValues={role}
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
                                        },
                                        validate: ['number', 'State ID']
                                    },
                                    {
                                        name: 'role',
                                        render: (prop: SimpleFormRender<string>) => {
                                            const onChange = prop.onChange;
                                            const value = prop.value;

                                            return (
                                                <Input.Select
                                                    onChange={onChange}
                                                    value={value}
                                                    label="Role"
                                                    items={props.roles}
                                                />
                                            )
                                        }
                                    }
                                ]}
                                onCancel={() => {
                                    closePhoneModal(false);
                                }}
                                onSubmit={async (values) => {
                                    setPhoneModalLoading();

                                    const results = await nuiAction('ev-ui:hireBusinessEmployee', {
                                        role_id: values.role,
                                        state_id: Number(values.stateId),
                                        business: props.activeBusiness
                                    });

                                    if (results.meta.ok) {
                                        props.manageBusiness(props.activeBusiness);

                                        closePhoneModal();
                                    } else {
                                        setPhoneModalError(results.meta.message);
                                    }
                                }}
                            />
                        )
                    }
                });
            }
            if (props.activeBusiness.permissions.includes('pay_external')) {
                auxActions.push({
                    icon: 'hand-holding-usd',
                    title: 'Pay External',
                    onClick: () => {
                        openPhoneModal(
                            <SimpleForm
                                elements={[
                                    {
                                        name: 'accountId',
                                        render: (prop: SimpleFormRender<number>) => {
                                            const onChange = prop.onChange;
                                            const value = prop.value;

                                            return (
                                                <Input.AccountID
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            )
                                        },
                                        validate: ['number', 'Account ID']
                                    },
                                    {
                                        name: 'amount',
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
                                    },
                                    {
                                        name: 'comment',
                                        render: (prop: SimpleFormRender<string>) => {
                                            const onChange = prop.onChange;
                                            const value = prop.value;

                                            return (
                                                <Input.TextArea
                                                    label="Comment"
                                                    icon="comment-o"
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
                                onSubmit={async (values) => {
                                    setPhoneModalLoading();

                                    const results = await nuiAction('ev-ui:businessPayExternal', {
                                        target_account_id: Number(values.accountId),
                                        amount: Number(values.amount),
                                        comment: values.comment,
                                        business: props.activeBusiness,
                                        character: props.character
                                    });

                                    if (results.meta.ok) {
                                        closePhoneModal();
                                    } else {
                                        setPhoneModalError(results.meta.message);
                                    }
                                }}
                            />
                        )
                    }
                });
            }
            if (props.activeBusiness.permissions.includes('charge_external')) {
                auxActions.push({
                    icon: 'credit-card',
                    title: 'Charge External',
                    onClick: () => {
                        openPhoneModal(
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
                                        },
                                        validate: ['number', 'State ID']
                                    },
                                    {
                                        name: 'amount',
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
                                    },
                                    {
                                        name: 'comment',
                                        render: (prop: SimpleFormRender<string>) => {
                                            const onChange = prop.onChange;
                                            const value = prop.value;

                                            return (
                                                <Input.TextArea
                                                    label="Comment"
                                                    icon="comment-o"
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
                                onSubmit={async (values) => {
                                    setPhoneModalLoading();

                                    const results = await nuiAction('ev-ui:businessChargeExternal', {
                                        state_id: Number(values.stateId),
                                        amount: Number(values.amount),
                                        comment: values.comment,
                                        business: props.activeBusiness,
                                        character: props.character
                                    });

                                    if (results.meta.ok) {
                                        closePhoneModal();
                                    } else {
                                        setPhoneModalError(results.meta.message);
                                    }
                                }}
                            />
                        )
                    }
                });
            }
            if (props.activeBusiness.permissions.includes('change_role')) {
                auxActions.push({
                    icon: 'user-tag',
                    title: 'Create Role',
                    onClick: () => CreateRoleModal(props)
                });
            }
            if (props.activeBusiness.permissions.includes('change_role')) {
                auxActions.push({
                    icon: 'user-tag',
                    title: 'Edit Role',
                    onClick: () => EditRoleModal(props)
                });
            }
            if (props.activeBusiness.permissions.includes('change_role')) {
                auxActions.push({
                    icon: 'user-tag',
                    title: 'Delete Role',
                    onClick: () => {
                        const role = props.roles[0].id;
                        openPhoneModal(
                            <SimpleForm
                                defaultValues={role}
                                elements={[
                                    {
                                        name: 'role',
                                        render: (prop: SimpleFormRender<string>) => {
                                            const onChange = prop.onChange;
                                            const value = prop.value;

                                            return (
                                                <Input.Select
                                                    onChange={onChange}
                                                    value={value}
                                                    label="Role"
                                                    items={props.roles}
                                                />
                                            )
                                        }
                                    }
                                ]}
                                onCancel={() => {
                                    closePhoneModal(false);
                                }}
                                onSubmit={async (values) => {
                                    setPhoneModalLoading();

                                    const results = await nuiAction('ev-ui:deleteBusinessRole', {
                                        role_id: values.role,
                                        business: props.activeBusiness
                                    });

                                    if (results.meta.ok) {
                                        props.manageBusiness(props.activeBusiness);

                                        closePhoneModal();
                                    } else {
                                        setPhoneModalError(results.meta.message);
                                    }
                                }}
                            />
                        )
                    }
                });
            }
            if (props.activeBusiness.permissions.includes('view_logs')) {
                auxActions.push({
                    icon: 'list',
                    title: 'Logs',
                    onClick: () => props.viewLogs()
                });
            }
            if (props.activeBusiness.role !== 'Owner') {
                auxActions.push({
                    icon: 'sign-out-alt',
                    title: 'Quit',
                    onClick: async () => {
                        setPhoneModalLoading();

                        const results = await nuiAction('ev-ui:removeBusinessEmployee', {
                            business: props.activeBusiness,
                            employee: { id: props.character.id, role: props.activeBusiness.role }
                        });

                        if (results.meta.ok) {
                            await nuiAction('ev-ui:removeCharacterFromAccount', {
                                character: { id: props.character.id },
                                account: { id: props.activeBusiness.bank_account_id }
                            });

                            props.updateState({
                                activeBusiness: -1,
                                page: 0
                            });

                            props.getEmployment();

                            closePhoneModal();
                        } else {
                            setPhoneModalError(results.meta.message);
                        }
                    }
                });
            }
            if (props.activeBusiness.business_type === 'Loans') {
                primaryActions.push({
                    icon: 'donate',
                    title: 'Loans',
                    onClick: () => props.manageLoans(props.activeBusiness)
                });
            }
        }
    }

    return (
        <AppContainer
            auxActions={auxActions}
            emptyMessage={employees.length === 0}
            onClickBack={() => props.updateState({ activeBusiness: -1, page: 0 })}
            primaryActions={primaryActions}
            search={{
                filter: ['first_name', 'last_name', 'role'],
                list: props.employees,
                onChange: setEmployees
            }}
        >
            {props.activeBusiness !== -1 && (
                <>
                    {employees && employees.length > 0 && employees.map((employee: any, index: number) => (
                        <Employee key={index} business={props.activeBusiness} employee={employee} p={props} />
                    ))}
                </>
            )}
        </AppContainer>
    )
}

export default ManageBusiness;