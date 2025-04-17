import React, { FunctionComponent } from "react";
import Input from "components/input/input";
import SimpleForm from "components/simple-form";
import { closePhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import { nuiAction } from "lib/nui-comms";

const SendMoneyModal: FunctionComponent<any> = (props) => {
    return (
        <SimpleForm
            elements={[
                {
                    name: 'phone',
                    render: (prop: SimpleFormRender<string>) => {
                        const onChange = prop.onChange;
                        const value = prop.value;

                        return (
                            <Input.Phone
                                onChange={onChange}
                                value={value}
                            />
                        )
                    },
                    validate: ['phone', 'Phone']
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
                    },
                    validate: {
                        fn: (value) => {
                            return Number(value) && Number(value) > 0;
                        },
                        message: 'Amount should be greater than 0.'
                    }
                },
                {
                    name: 'comment',
                    render: (prop: SimpleFormRender<string>) => {
                        const onChange = prop.onChange;
                        const value = prop.value;

                        return (
                            <Input.Comment
                                onChange={onChange}
                                value={value}
                            />
                        )
                    },
                    validate: ['text', 'Comment']
                }
            ]}
            onCancel={() => {
                closePhoneModal(false);
            }}
            onSubmit={async (values) => {
                setPhoneModalLoading();

                const character = props.character;

                const results = await nuiAction('ev-ui:accountTransfer', {
                    account_id: Number(character.bank_account_id),
                    amount: Number(values.amount),
                    comment: values.comment,
                    target_phone_number: values.phone.toString(),
                    type: 'venmo'
                });

                if (results.meta.ok) {
                    props.getTransactions();
                    closePhoneModal();
                } else {
                    setPhoneModalError(results.meta.message);
                }
            }}
        />
    )
}

export default SendMoneyModal;