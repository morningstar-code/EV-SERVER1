import React, { FunctionComponent } from "react";
import { Typography } from "@mui/material";
import Button from "components/button/button";
import { fromNow } from "lib/date";
import { formatCurrency } from "lib/format";
import { ComponentDetails } from "components/component-details";
import { ComponentDrawer } from "components/component-drawer";
import { ComponentIcon } from "components/component-icon";
import { ComponentPaper } from "components/paper";
import { closePhoneModal, openConfirmModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import SimpleForm from "components/simple-form";
import Input from "components/input/input";
import { nuiAction } from "lib/nui-comms";

const ComponentLoan: FunctionComponent<{ loan: Loan, type: string, isOverdue?: boolean, activeBusiness?: any, character?: Character, manageLoans?: any, getDebt?: any }> = (props) => {
    const loan = props.loan;
    const type = props.type ? props.type : 'business';
    const isOverdue = props.isOverdue;

    const loanSeize = async () => {
        await nuiAction('ev-ui:loanSeize', {
            loan: loan
        });

        props.manageLoans(props.activeBusiness);
    }

    const loanTrack = async (toggled: boolean) => {
        setPhoneModalLoading();

        await nuiAction('ev-ui:loanTrack', {
            loan: loan,
            stop: toggled,
        });

        props.manageLoans(props.activeBusiness);
        closePhoneModal();
    }

    const drawerData = [
        {
            icon: 'clipboard',
            text: loan.note,
            tooltip: 'Note',
        },
        {
            icon: 'id-card',
            text: loan.id,
            tooltip: 'ID',
        },
        {
            icon: 'phone',
            text: loan.phone_number,
            tooltip: 'Phone Number',
        },
        {
            icon: 'hand-holding-usd',
            text: formatCurrency(loan.civ_owed - loan.payments_count * (loan.civ_owed / loan.payments_total)),
            tooltip: 'Outstanding',
        },
        {
            icon: 'calendar-alt',
            text: loan.payments_total > loan.payments_count ? fromNow(loan.last_payment + 86400 * loan.payments_schedule_days) : 'Paid Off',
            tooltip: 'Next Payment Due',
        },
        {
            icon: 'hand-holding-usd',
            text: `${formatCurrency(loan.amount)} / ${loan.interest_civ}%`,
            tooltip: 'Original Amount'
        },
        {
            icon: 'search-dollar',
            text: formatCurrency(loan.civ_owed / loan.payments_total),
            tooltip: 'Per Payment Amount',
        }
    ] as any[];

    if (type === 'business') {
        drawerData.push(
            {
                icon: 'dollar-sign', //Figure out state_paid, state_owed stuff?
                text: `${formatCurrency(loan.state_paid)} / ${formatCurrency((loan.state_owed / loan.payments_total) * loan.payments_count)}`,
                tooltip: 'State Paid / Est. Owed',
            },
            {
                icon: 'dollar-sign',
                text: `${formatCurrency(loan.state_owed)} / ${loan.interest_state}%`,
                tooltip: 'State Owed',
            }
        );
    }

    if (isOverdue && props.activeBusiness.permissions.includes('craft_access')) {
        drawerData.push({
            icon: 'map-marker-alt',
            text: loan?.tracked_by ?? 'Not Tracked',
            tooltip: 'Tracked By',
            actions: loan.tracked_by && loan.tracked_by === `${props.character.first_name} ${props.character.last_name}` ? [
                {
                    icon: ['far', 'times-circle'],
                    title: 'Stop Tracking',
                    onClick: () => {
                        return loanTrack(true)
                    }
                }
            ] : [
                {
                    icon: ['fas', 'map-pin'],
                    title: 'Track',
                    onClick: () => {
                        return loanTrack(false)
                    }
                }
            ]
        });
    }

    return (
        <ComponentPaper
            actions={[]}
            drawer={(
                <ComponentDrawer
                    items={drawerData}
                >
                    {type === 'business' && loan.state_paid < loan.state_owed && (
                        <div className="flex flex-centered" style={{ padding: 8 }}>
                            <Button.Primary onClick={() => {
                                openPhoneModal(
                                    <SimpleForm
                                        elements={[
                                            {
                                                name: 'amount',
                                                render: (prop: SimpleFormRender<number>) => {
                                                    const onChange = prop.onChange;
                                                    let value = prop.value;

                                                    const owed = loan.defaulted ?
                                                        loan.state_owed - loan.state_paid : (
                                                            loan.state_owed / loan.payments_total
                                                        ) * loan.payments_count - loan.state_paid;

                                                    if (!isNaN(value)) {
                                                        value = Math.min(value ?? 0, owed);
                                                        value = parseFloat(value.toFixed(2));
                                                    }

                                                    return (
                                                        <Input.Currency
                                                            onChange={onChange}
                                                            value={value}
                                                            label={`Amount Owed: ${formatCurrency(owed)}`}
                                                        />
                                                    )
                                                },
                                                validate: ['number', 'Amount Owed: ']
                                            }
                                        ]}
                                        onCancel={() => {
                                            closePhoneModal(false);
                                        }}
                                        onSubmit={async (values) => {
                                            setPhoneModalLoading();

                                            const owed = (loan.state_owed / loan.payments_total) * loan.payments_count - loan.state_paid;

                                            let amount = values.amount;
                                            if (!isNaN(amount)) {
                                                amount = Math.min(Number(amount) ?? 0, owed);
                                                amount = parseFloat(amount.toFixed(2));
                                            }

                                            const results = await nuiAction('ev-ui:loanPaymentState', {
                                                loan: loan,
                                                amount: amount,
                                                business: props.activeBusiness,
                                                character: props.character
                                            });

                                            if (results.meta.ok) {
                                                closePhoneModal();
                                                props.manageLoans(props.activeBusiness);
                                                return;
                                            }

                                            return setPhoneModalError(results.meta.message);
                                        }}
                                    />
                                )
                            }}>
                                Pay State
                            </Button.Primary>
                        </div>
                    )}
                    {type === 'business' && !loan.defaulted && (
                        <div className="flex flex-centered" style={{ padding: 8 }}>
                            <Button.Secondary onClick={() => {
                                openConfirmModal(
                                    async () => {
                                        setPhoneModalLoading();

                                        await nuiAction('ev-ui:loanDefault', {
                                            loan: loan
                                        });

                                        props.manageLoans(props.activeBusiness);
                                        closePhoneModal(); //closeConfirmModal();
                                    }
                                )
                            }}>
                                Default
                            </Button.Secondary>
                        </div>
                    )}
                    {type === 'business' && !!loan.defaulted && (
                        <div className="flex flex-centered" style={{ padding: 8 }}>
                            <Button.Secondary onClick={() => loanSeize()}>
                                Seize Asset
                            </Button.Secondary>
                        </div>
                    )}
                    {type === 'business' && (
                        <div className="flex flex-centered" style={{ padding: 8 }}>
                            <Button.Tertiary onClick={() => { }}>
                                Export Loan
                            </Button.Tertiary>
                        </div>
                    )}
                    {type === 'character' && !loan.defaulted && loan.payments_total > loan.payments_count && (
                        <div className="flex flex-centered" style={{ padding: 8 }}>
                            <Button.Primary onClick={() => {
                                openConfirmModal(
                                    async () => {
                                        setPhoneModalLoading();

                                        const results = await nuiAction('ev-ui:loanPayment', {
                                            loan: loan
                                        });

                                        if (results.meta.ok) {
                                            props.getDebt();
                                            closePhoneModal(); //closeConfirmModal();
                                            return;
                                        }

                                        return setPhoneModalError(results.meta.message);
                                    }
                                )
                            }}>
                                Make Loan Payment
                            </Button.Primary>
                        </div>
                    )}
                </ComponentDrawer>
            )}
        >
            <ComponentIcon icon="file-invoice-dollar" />
            <ComponentDetails
                title={type !== 'business' ? loan.business_name : `${loan.first_name} ${loan.last_name}`}
                description={(
                    <div className="flex flex-row flex-space-between">
                        <Typography variant="body2" style={{ color: '#fff' }}>
                            {formatCurrency(loan.civ_owed)}
                        </Typography>
                        <Typography variant="body2" style={{ color: '#fff' }}>
                            {loan.payments_count} / {loan.payments_total}
                        </Typography>
                    </div>
                )}
            />
        </ComponentPaper>
    );
}

export default ComponentLoan;