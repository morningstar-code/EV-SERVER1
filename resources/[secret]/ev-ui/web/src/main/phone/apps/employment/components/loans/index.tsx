import Input from "components/input/input";
import SimpleForm from "components/simple-form";
import Spinner from "components/spinner/spinner";
import Text from "components/text/text";
import { nuiAction } from "lib/nui-comms";
import { closePhoneModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import AppContainer from "main/phone/components/app-container";
import ComponentLoan from "main/phone/components/component-loan";
import React, { FunctionComponent } from "react";

const Loans: FunctionComponent<any> = (props) => {
    const [list, setList] = React.useState(props.list);

    React.useEffect(() => {
        setList(props.list);
    }, [props.list]);

    const primaryActions = [];

    primaryActions.push({
        icon: "dollar-sign",
        title: "Create Loan",
        onClick: () => {
            openPhoneModal(
                <div>
                    <div style={{ marginBottom: 16 }}>
                        <Text variant="body2">
                            State Interest Rate: {Number(props.loanConfig.state_interest).toFixed(2)}%
                        </Text>
                        <Text variant="body2">
                            Max Interest Rate: {props.loanConfig.max_interest_rate}%
                        </Text>
                    </div>
                    <SimpleForm
                        defaultValues={{
                            schedule: 7,
                            payments: 10,
                            stateInterest: props.loanConfig.state_interest.toFixed(2)
                        }}
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
                                    let value = prop.value;

                                    if (!isNaN(value)) {
                                        value = Math.min(value ?? 0, 2000000);
                                        value = parseFloat(value.toFixed(2));
                                    }

                                    return (
                                        <Input.Currency
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )
                                },
                                validate: ['number', 'Amount']
                            },
                            {
                                name: 'stateInterest',
                                render: (prop: SimpleFormRender<string>) => {
                                    const onChange = prop.onChange;
                                    const value = prop.value;

                                    return (
                                        <Input.Text
                                            icon="percent"
                                            label="State Interest Rate"
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )
                                },
                                validate: {
                                    fn: (value) => {
                                        const percent = Number(Number(value).toFixed(2));
                                        return !(percent <= 0) && !(percent > Number(props.loanConfig.max_interest_rate)) && !(percent < Number(Number(props.loanConfig.state_interest).toFixed(2)));
                                    },
                                    message: 'State interest rate must be valid'
                                }
                            },
                            {
                                name: 'interest',
                                render: (prop: SimpleFormRender<string>) => {
                                    const onChange = prop.onChange;
                                    const value = prop.value;

                                    return (
                                        <Input.Text
                                            icon="percent"
                                            label="Interest Rate"
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )
                                },
                                validate: {
                                    fn: (value) => {
                                        return Number(value) > 0 && Number(value) <= props.loanConfig.max_interest_rate;
                                    },
                                    message: 'Interest rate must be valid'
                                }
                            },
                            {
                                name: 'note',
                                render: (prop: SimpleFormRender<string>) => {
                                    const onChange = prop.onChange;
                                    const value = prop.value;

                                    return (
                                        <Input.Text
                                            icon="clipboard"
                                            label="Note"
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )
                                },
                                validate: ['text', 'Note']
                            },
                            {
                                name: 'schedule',
                                render: (prop: SimpleFormRender<string>) => {
                                    const onChange = prop.onChange;
                                    const value = prop.value;

                                    return (
                                        <Input.Text
                                            icon="calendar-alt"
                                            label="Schedule (days)"
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )
                                },
                                validate: ['number', 'Schedule']
                            },
                            {
                                name: 'payments',
                                render: (prop: SimpleFormRender<string>) => {
                                    const onChange = prop.onChange;
                                    const value = prop.value;

                                    return (
                                        <Input.Text
                                            icon="calculator"
                                            label="Number of Payments"
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )
                                },
                                validate: ['number', 'Payments']
                            }
                        ]}
                        onCancel={() => {
                            return closePhoneModal(false);
                        }}
                        onSubmit={async (values) => {
                            setPhoneModalLoading();

                            const results = await nuiAction('ev-ui:loanOffer', {
                                state_id: Number(values.stateId),
                                payments: Number(values.payments),
                                schedule: Number(values.schedule),
                                amount: Number(values.amount),
                                interest: Number(values.interest),
                                state_interest: Number(values.stateInterest),
                                note: values.note,
                                business: props.activeBusiness,
                                character: props.character
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

    primaryActions.push({
        icon: 'funnel-dollar',
        title: 'Pay State',
        onClick: async () => {
            const results = await nuiAction('ev-ui:fetchTotalPaymentsAmount', {
                business: props.activeBusiness,
                character: props.character
            });

            openPhoneModal(
                <div>
                    <SimpleForm
                        defaultValues={{ amount: 0 }}
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
                                            label={`Total State Owed: ${results?.data?.total?.toFixed(2) ?? 0}`}
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

                            const results = await nuiAction('ev-ui:loanPaymentStateAll', {
                                business: props.activeBusiness,
                                character: props.character,
                                amount: Number(values.amount)
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

    const defaultedLoans = list.filter(loan => !!loan.defaulted);
    const mappedDefaultedLoanIds = defaultedLoans.map((loan) => loan.id);

    const overdueLoans = list.filter(loan => {
        return !mappedDefaultedLoanIds.includes(loan.id) && 1000 * (loan.last_payment + 86400 * loan.payments_schedule_days) < Date.now() && loan.payments_count < loan.payments_total;
    });

    overdueLoans.sort((a, b) => {
        const calc = (value) => {
            return value.last_payment + 86400 * value.payments_schedule_days
        }

        return calc(a) > calc(b) ? 1 : calc(a) < calc(b) ? -1 : 0;
    });

    const mappedOverdueLoanIds = overdueLoans.map((loan: Loan) => {
        return loan.id
    });

    const outstandingLoans = list.filter((loan: Loan) => {
        return !mappedDefaultedLoanIds.includes(loan.id) && !mappedOverdueLoanIds.includes(loan.id) && (loan.state_paid < loan.state_owed || loan.payments_count < loan.payments_total)
    });

    const archivedLoans = list.filter((loan: Loan) => {
        return !mappedDefaultedLoanIds.includes(loan.id) && !mappedOverdueLoanIds.includes(loan.id) && loan.state_paid >= loan.state_owed && loan.payments_count >= loan.payments_total
    });

    const manageLoans = () => props.manageLoans(props.activeBusiness);

    // React.useEffect(() => {
    //     manageLoans();
    // }, [props.loadedLoans, props.selectedLoanType]);

    return (
        <AppContainer
            emptyMessage={
                defaultedLoans.length === 0 &&
                outstandingLoans.length === 0 &&
                archivedLoans.length === 0 &&
                overdueLoans.length === 0
            }
            onClickBack={() => props.updateState({ page: 1 })}
            primaryActions={primaryActions}
            search={{
                filter: ['first_name', 'last_name', 'id'],
                list: props.list,
                onChange: (value, list) => {
                    setList(value);
                    props.updateState({ search: list });
                    //manageLoans();
                }
            }}
        >
            <div style={{ marginBottom: 16 }}>
                <Input.Select
                    items={[
                        {
                            id: 1,
                            name: 'Overdue',
                        },
                        {
                            id: 2,
                            name: 'Outstanding',
                        },
                        {
                            id: 3,
                            name: 'Defaulted',
                        },
                        {
                            id: 4,
                            name: 'Archived',
                        },
                        {
                            id: 5,
                            name: 'State Outstanding',
                        }
                    ]}
                    label="Type"
                    onChange={(value) => {
                        props.updateState({ selectedLoanType: value });
                        manageLoans();
                    }}
                    value={props.selectedLoanType}
                />
            </div>
            {props.showLoading && (
                <Spinner />
            )}
            {props.selectedLoanType === 1 && overdueLoans.length > 0 && (
                <div>
                    {overdueLoans.map((loan: Loan, index: number) => (
                        <ComponentLoan key={index} isOverdue={true} loan={loan} {...props} />
                    ))}
                </div>
            )}
            {props.selectedLoanType === 2 && outstandingLoans.length > 0 && (
                <div>
                    {outstandingLoans.map((loan: Loan, index: number) => (
                        <ComponentLoan key={index} loan={loan} {...props} />
                    ))}
                </div>
            )}
            {props.selectedLoanType === 3 && defaultedLoans.length > 0 && (
                <div>
                    {defaultedLoans.map((loan: Loan, index: number) => (
                        <ComponentLoan key={index} loan={loan} {...props} />
                    ))}
                </div>
            )}
            {props.selectedLoanType === 4 && archivedLoans.length > 0 && (
                <div>
                    {archivedLoans.map((loan: Loan, index: number) => (
                        <ComponentLoan key={index} loan={loan} {...props} />
                    ))}
                </div>
            )}
            {props.selectedLoanType === 5 && list.length > 0 && (
                <div>
                    {list.map((loan: Loan, index: number) => (
                        <ComponentLoan key={index} loan={loan} {...props} />
                    ))}
                </div>
            )}
        </AppContainer>
    )
}

export default Loans;