import React, { FunctionComponent } from "react";
import Input from "components/input/input";
import SimpleForm from "components/simple-form";
import { closePhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import { nuiAction } from "lib/nui-comms";

const CreateAdModal: FunctionComponent<any> = (props) => {
    const getEntries = props.getEntries;
    const defaultValues = {
        number: props.number || ''
    }

    return (
        <SimpleForm
            defaultValues={defaultValues}
            elements={[
                {
                    name: 'ad',
                    render: (prop: SimpleFormRender<string>) => {
                        const onChange = prop.onChange;
                        const value = prop.value;

                        return (
                            <Input.TextArea
                                helperText={`${value ? value.length : 0} / 100`}
                                icon="phone"
                                label="Ad"
                                onChange={(value) => {
                                    value.length < 101 && onChange(value);
                                }}
                                value={value}
                            />
                        )
                    },
                    validate: ['text', 'Advert']
                }
            ]}
            onCancel={() => {
                closePhoneModal(false);
            }}
            onSubmit={async (values) => {
                setPhoneModalLoading();

                const results = await nuiAction('ev-ui:addYellowPagesEntry', {
                    text: values.ad
                });
                
                //setPhoneModalLoading();

                if (results.meta.ok) {
                    closePhoneModal();
                    getEntries();
                } else {
                    setPhoneModalError(results.meta.message);
                }
            }}
        />
    )
}

export default CreateAdModal;