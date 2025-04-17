import Input from "components/input/input";
import SimpleForm from "components/simple-form"
import { nuiAction } from "lib/nui-comms";
import { closePhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";

export default ({
    groupId
}) => {

    return (
        <SimpleForm
            elements={[
                {
                    name: 'stateId',
                    render: (prop: SimpleFormRender<number>) => {
                        const onChange = prop.onChange;
                        const value = prop.value;

                        return (
                            <Input.CityID
                                onChange={onChange}
                                value={value}
                            />
                        )
                    }
                }
            ]}
            onCancel={() => {
                closePhoneModal(false);
            }}
            onSubmit={async (values: any) => {
                setPhoneModalLoading();

                const results = await nuiAction('ev-ui:heists:invite', { groupId: groupId, text: values.stateId });

                if (results.meta.ok) {
                    closePhoneModal();
                } else {
                    setPhoneModalError(results.meta.message)
                }
            }}
        />
    )
}