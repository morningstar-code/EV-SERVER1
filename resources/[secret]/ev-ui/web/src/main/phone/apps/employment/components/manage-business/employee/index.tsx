import React, { FunctionComponent } from "react";
import { nuiAction } from "lib/nui-comms";
import { closePhoneModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import { ComponentDetails } from "components/component-details";
import { ComponentIcon } from "components/component-icon";
import { ComponentPaper } from "components/paper";
import { devData } from "main/dev-data";
import Input from "components/input/input";
import SimpleForm from "components/simple-form";

const Employee: FunctionComponent<any> = (props) => {
    const business: any = props.business;
    const employee: any = props.employee;
    const p: any = props.p;

    const actions = [];

    if (employee.role !== 'Owner' && business.permissions.includes('change_role')) {
        actions.push({
            icon: 'user-tag',
            title: 'Change Role',
            onClick: async () => {
                return (function (value) {
                    const emp = value.employee;
                    const biz = value.p;
                    const defaultValues = { role: biz.roles[0].id };

                    openPhoneModal(
                        <SimpleForm
                            defaultValues={defaultValues}
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
                                                items={biz.roles}
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

                                const results = await nuiAction('ev-ui:changeBusinessRole', {
                                    role_id: values.role,
                                    employee: emp,
                                    business: biz.activeBusiness
                                });

                                if (results.meta.ok) {
                                    biz.manageBusiness(biz.activeBusiness);

                                    closePhoneModal();
                                } else {
                                    setPhoneModalError(results.meta.message);
                                }
                            }}
                        />
                    )
                })({employee: employee, p: p});
            }
        });
    }

    if (business.permissions.includes('pay_employee')) {
        actions.push({
            icon: 'hand-holding-usd',
            title: 'Pay',
            onClick: async () => {
                openPhoneModal(
                    <div style={{ width: '100%' }}>
                        <SimpleForm
                            elements={[
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
                                                maxLength={254}
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

                                const results = await nuiAction('ev-ui:businessPayEmployee', {
                                    employee_id: employee.id,
                                    amount: Number(values.amount),
                                    comment: values.comment,
                                    business: p.activeBusiness,
                                    character: p.character
                                });

                                if (results.meta.ok) {
                                    closePhoneModal();
                                } else {
                                    setPhoneModalError(results.meta.message || 'unknown error');
                                }
                            }}
                        />
                    </div>
                )
            }
        });
    }

    if (employee.role !== 'Owner' && business.permissions.includes('fire')) {
        actions.push({
            icon: 'user-slash',
            title: 'Remove Employee',
            onClick: async () => {
                setPhoneModalLoading();

                const results = await nuiAction('ev-ui:removeBusinessEmployee', {
                    business: business,
                    employee: employee
                });

                if (results.meta.ok) {
                    await nuiAction('ev-ui:removeBusinessEmployee', {
                        character: { id: employee.id },
                        account: { id: business.removeCharacterFromAccount }
                    });

                    p.manageBusiness(p.activeBusiness);

                    closePhoneModal();
                } else {
                    setPhoneModalError(results.meta.message)
                }
            }
        });
    }

    if (business.access_level === -1 && employee.role !== 'Owner') {
        actions.push({
            icon: 'university',
            title: 'Bank Access',
            onClick: async () => {
                setPhoneModalLoading();

                const results = await nuiAction('ev-ui:getAccountCharacters', {
                    account_id: business.bank_account_id
                }, { returnData: devData.getAccountCharacters() });

                if (results.meta.ok) {
                    const foundEmployee = results.data.find((e: any) => e.id === employee.id);
                    const elements = [];
                    const defaultValues = {};
                    const access = [
                        'balance',
                        'deposit',
                        'transfer',
                        'transactions',
                        'withdraw'
                    ];

                    access.forEach((a: any) => {
                        defaultValues[a] = foundEmployee && foundEmployee.access.includes(a);

                        elements.push({
                            name: a,
                            render: (prop: SimpleFormRender<boolean>) => {
                                const onChange = prop.onChange;
                                const value = prop.value;

                                return (
                                    <Input.Checkbox
                                        checked={value || false}
                                        onChange={onChange}
                                        label={a}
                                    />
                                )
                            }
                        });
                    });

                    openPhoneModal(
                        <SimpleForm
                            defaultValues={defaultValues}
                            elements={elements}
                            onCancel={() => {
                                closePhoneModal(false);
                            }}
                            onSubmit={async (values) => {
                                setPhoneModalLoading();

                                const hasAccess = Object.keys(values).filter((v: any) => {
                                    return !!values[v];
                                }).length !== 0;

                                const access = Object.keys(values).filter((v: any) => {
                                    return !!values[v];
                                });

                                if (hasAccess) {
                                    const addResults = await nuiAction('ev-ui:addAccountCharacterPermissions', {
                                        employee: { id: employee.id, access: access },
                                        account: { id: business.bank_account_id }
                                    });
                                    if (addResults.meta.ok) {
                                        closePhoneModal();
                                    } else {
                                        nuiAction('ev-ui:editAccountCharacterPermissions', {
                                            employee: { id: employee.id, access: access },
                                            account: { id: business.bank_account_id }
                                        });
                                        closePhoneModal();
                                    }
                                } else { //idk if else here
                                    nuiAction('ev-ui:removeCharacterFromAccount', {
                                        employee: { id: employee.id },
                                        account: { id: business.bank_account_id }
                                    });
                                    closePhoneModal();
                                }
                            }}
                        />
                    )
                } else {
                    setPhoneModalError(results.meta.message)
                }
            }
        });
    }

    return (
        <ComponentPaper actions={actions}>
            <ComponentIcon icon={employee.role === 'Owner' ? 'user-secret' : 'user-tie'} />
            <ComponentDetails title={`${employee.first_name} ${employee.last_name}`} description={employee.role} />
        </ComponentPaper>
    )
}

export default Employee;