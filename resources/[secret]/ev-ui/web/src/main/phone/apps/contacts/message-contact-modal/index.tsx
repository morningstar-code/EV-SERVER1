import React, { FunctionComponent } from "react";
import Input from "components/input/input";
import SimpleForm from "components/simple-form";
import { closePhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import { nuiAction } from "lib/nui-comms";
import { addMessageToConversation } from "../../conversations/actions";

const MessageContactModal: FunctionComponent<any> = (props) => {
    const defaultValues = {
        number: props.number || ''
    }

    return (
        <SimpleForm
            defaultValues={defaultValues}
            elements={[
                {
                    name: 'number',
                    render: (prop: SimpleFormRender<string>) => {
                        const onChange = prop.onChange;
                        const value = prop.value;

                        return (
                            <Input.Phone
                                onChange={onChange}
                                value={value}
                                useNormalInput={true}
                            />
                        )
                    },
                    validate: ['phone', 'Phone Number']
                },
                {
                    name: 'message',
                    render: (prop: SimpleFormRender<string>) => {
                        const onChange = prop.onChange;
                        const value = prop.value;

                        return (
                            <Input.TextArea
                                icon="comment"
                                label="Message"
                                onChange={onChange}
                                value={value}
                            />
                        )
                    },
                    validate: ['text', 'Message']
                }
            ]}
            onCancel={() => {
                closePhoneModal(false);
            }}
            onSubmit={async (values) => {
                setPhoneModalLoading();

                const results = await nuiAction('ev-ui:smsSend', values);

                if (results.meta.ok) {
                    closePhoneModal();
                    addMessageToConversation({
                        number: values.number,
                        message: values.message
                    });
                } else {
                    setPhoneModalError(results.meta.message);
                }
            }}
        />
    )
}

export default MessageContactModal;