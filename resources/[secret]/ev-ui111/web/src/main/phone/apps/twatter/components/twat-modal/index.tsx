import React, { FunctionComponent } from "react";
import Input from "components/input/input";
import SimpleForm from "components/simple-form";
import { closePhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import { nuiAction } from "lib/nui-comms";

const TwatModal: FunctionComponent<any> = (props) => {
    const defaultValues = {
        twat: props.twat || ''
    }

    return (
        <SimpleForm
            defaultValues={defaultValues}
            elements={[
                {
                    name: 'twat',
                    render: (prop: SimpleFormRender<string>) => {
                        const onChange = prop.onChange;
                        const value = prop.value;

                        return (
                            <Input.TextArea
                                helperText={`${value ? value.length : 0} / 255`}
                                label="Twat"
                                icon={["fab", "twitter"]}
                                onChange={(value) => {
                                    value.length < 256 && onChange(value);
                                }}
                                value={value}
                            />
                        )
                    },
                    validate: ['text', 'Twat']
                }
            ]}
            onCancel={() => {
                closePhoneModal(false);
            }}
            onSubmit={async (values) => {
                setPhoneModalLoading();

                const results = await nuiAction('ev-ui:twatSend', {
                    text: values.twat
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

export default TwatModal;