import Input from "components/input/input";
import SimpleForm from "components/simple-form"
import { nuiAction } from "lib/nui-comms";
import { closePhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import { cryptoType } from "../crypto";

export default (props: any) => {

    return (
        <SimpleForm
            defaultValues={{ id: props.crypto.id }}
            elements={[
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
                            return Number(value) > 0;
                        },
                        message: "You can't send 0 or less."
                    }
                }
            ]}
            onCancel={() => {
                closePhoneModal(false);
            }}
            onSubmit={async (values: any) => {
                setPhoneModalLoading();

                const results = await nuiAction(cryptoType[values.id] === 'buy' ? 'ev-ui:cryptoPurchase' : 'ev-ui:cryptoSell', {
                    amount: Number(values.amount),
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