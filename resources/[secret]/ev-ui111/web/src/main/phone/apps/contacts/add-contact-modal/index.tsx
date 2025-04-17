import React, { FunctionComponent } from "react";
import Input from "components/input/input";
import SimpleForm from "components/simple-form";
import { closePhoneModal, setPhoneModalError, setPhoneModalLoading, updatePhoneAppState } from "main/phone/actions";
import { storeObj } from "lib/redux";
import { nuiAction } from "lib/nui-comms";

const AddContactModal: FunctionComponent<any> = (props) => {
    const defaultValues = {
        name: props.name || '',
        number: props.number || ''
    }

    return (
        <SimpleForm
            defaultValues={defaultValues}
            elements={[
                {
                    name: 'name',
                    render: (prop: SimpleFormRender<string>) => {
                        const onChange = prop.onChange;
                        const value = prop.value;

                        return (
                            <Input.Text
                                label="Name"
                                icon="user"
                                onChange={onChange}
                                value={value}
                            />
                        )
                    },
                    validate: ['text', 'Name']
                },
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
                }
            ]}
            onCancel={() => {
                closePhoneModal(false);
            }}
            onSubmit={async (values) => {
                setPhoneModalLoading();

                const results = await nuiAction('ev-ui:addContact', {
                    ...values,
                    number: values.number.toString()
                });

                if (results.meta.ok) {
                    closePhoneModal();

                    const contacts = storeObj.getState()['phone.apps.contacts'].list;

                    updatePhoneAppState('phone.apps.contacts', {
                        list: [
                            ...contacts,
                            {
                                name: values.name,
                                number: values.number
                            }
                        ]
                    });
                } else {
                    setPhoneModalError(results.meta.message)
                }
            }}
        />
    )
}

export default AddContactModal;