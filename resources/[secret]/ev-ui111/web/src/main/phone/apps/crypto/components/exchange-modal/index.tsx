import Input from "components/input/input";
import SimpleForm from "components/simple-form"
import { nuiAction } from "lib/nui-comms";
import { closePhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";

export default (props: any) => {

    return (
        <SimpleForm
            defaultValues={{ id: props.crypto.id }}
            elements={[
                {
                    name: 'id',
                    render: (prop: SimpleFormRender<string>) => {
                        const onChange = prop.onChange;
                        const value = prop.value;

                        return (
                            <Input.Text
                                icon="id-card"
                                label="Crypto ID"
                                onChange={onChange}
                                value={value}
                            />
                        )
                    }
                },
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
                    validate: ['phone', 'Phone Number']
                },
                {
                    name: 'amount',
                    render: (prop: SimpleFormRender<string>) => {
                        const onChange = prop.onChange;
                        const value = prop.value;

                        return (
                            <Input.Text
                                icon="sliders-h"
                                label="Amount"
                                onChange={onChange}
                                value={value}
                            />
                        )
                    },
                    validate: {
                        fn: (value) => {
                            return Number(value) > 0 && Number(value) <= Number(props.crypto.amount);
                        },
                        message: "You don't have enough."
                    }
                }
            ]}
            onCancel={() => {
                closePhoneModal(false);
            }}
            onSubmit={async (values: any) => {
                setPhoneModalLoading();

                const results = await nuiAction('ev-ui:cryptoExchange', {
                    amount: Number(values.amount),
                    number: Number(values.phone),
                    id: Number(values.id)
                });

                if (results.meta.ok) {
                    closePhoneModal();
                    props.getCrypto();
                } else {
                    setPhoneModalError(results.meta.message);
                }
            }}
        />
    )
}