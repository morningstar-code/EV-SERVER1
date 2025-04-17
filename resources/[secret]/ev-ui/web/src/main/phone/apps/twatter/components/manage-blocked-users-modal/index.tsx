import { FunctionComponent } from "react";
import Input from "components/input/input";
import SimpleForm from "components/simple-form";
import { closePhoneModal, setPhoneModalLoading } from "main/phone/actions";
import { nuiAction } from "lib/nui-comms";

const ManageBlockedUsersModal: FunctionComponent<any> = (props) => {
    return (
        <SimpleForm
            defaultValues={{ user: props.users[0].id }}
            elements={[
                {
                    name: 'user',
                    render: (prop: SimpleFormRender<string>) => {
                        const onChange = prop.onChange;
                        const value = prop.value;

                        return (
                            <Input.Select
                                onChange={onChange}
                                value={value}
                                label="User"
                                items={props.users}
                            />
                        )
                    }
                }
            ]}
            onCancel={() => {
                closePhoneModal(false);
            }}
            onSubmit={async (values) => {
                setPhoneModalLoading();

                if (!values.user) {
                    return closePhoneModal();
                }

                const results = await nuiAction<ReturnData>('ev-ui:unblockTwatterUser', {
                    user: values.user
                });
                
                if (results.meta.ok) {
                    props.reloadUsers();
                }

                closePhoneModal();
            }}
        />
    )
}

export default ManageBlockedUsersModal;