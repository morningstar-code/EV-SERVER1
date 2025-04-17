import { Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import AppContainer from "main/phone/components/app-container";
import { closePhoneModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import SimpleForm from "components/simple-form";
import Input from "components/input/input";
import Tax from "../tax";
import ComponentLoan from "main/phone/components/component-loan";
import { nuiAction } from "lib/nui-comms";

const Debt: FunctionComponent<any> = (props) => {
    const [list, setList] = React.useState(props.list);

    React.useEffect(() => {
        setList(props.list);
    }, [props.list]);

    const primaryActions: any = [
        {
            icon: "donate",
            title: "Pay Other Loan",
            onClick: () => {
                return openPhoneModal(
                    <SimpleForm
                        elements={[
                            {
                                name: "loanId",
                                render: (prop: SimpleFormRender<string>) => {
                                    const onChange = prop.onChange;
                                    const value = prop.value;

                                    return (
                                        <Input.Text
                                            label="Loan ID"
                                            icon="fingerprint"
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )
                                },
                                validate: ['number', 'Loan ID']
                            }
                        ]}
                        onCancel={() => {
                            closePhoneModal(false);
                        }}
                        onSubmit={async (values) => {
                            setPhoneModalLoading();

                            const results = await nuiAction('ev-ui:loanPayment', {
                                loan: {
                                    id: Number(values.loanId),
                                    third_party: true
                                }
                            });

                            if (results.meta.ok) {
                                props.getDet();
                                closePhoneModal();
                                return;
                            }

                            return setPhoneModalError(results.meta.message);
                        }}
                    />
                )
            }
        }
    ];

    return (
        <AppContainer
            primaryActions={primaryActions}
            emptyMessage={list.length === 0 && props?.taxes?.length === 0}
            search={{
                filter: ['debtor'],
                list: props.list,
                onChange: setList
            }}
        >
            {props?.taxes && props?.taxes?.length > 0 && (
                <Typography variant="body1" style={{ color: '#fff', textAlign: 'left', width: '100%', padding: 8 }}>
                    Maintenance Fees
                </Typography>
            )}
            {props?.taxes && props?.taxes?.length > 0 && props?.taxes?.map((asset: any) => (
                <Tax key={asset.id} {...props} asset={asset} getTaxes={props.getTaxes} />
            ))}
            {list && list?.length > 0 && (
                <Typography variant="body1" style={{ color: '#fff', textAlign: 'left', width: '100%', padding: 8 }}>
                    Loans
                </Typography>
            )}
            {list && list?.length > 0 && list?.map((loan: Loan, index: number) => (
                <ComponentLoan key={index} type='character' loan={loan} />
            ))}
        </AppContainer>
    )
}

export default Debt;