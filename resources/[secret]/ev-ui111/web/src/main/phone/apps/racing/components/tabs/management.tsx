import Button from "components/button/button";
import Input from "components/input/input";
import SimpleForm from "components/simple-form";
import Text from "components/text/text";
import { nuiAction } from "lib/nui-comms";
import { closePhoneModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import AppContainer from "main/phone/components/app-container";
import { isRacingManagement } from "../../actions";

export default (props: any) => {
    return isRacingManagement() ? (
        <AppContainer
            containerStyle={{ padding: 0 }}
            style={{ padding: 0 }}
        >
            <Text variant="body1" style={{ marginBottom: 8 }}>
                Actions
            </Text>
            <Button.Primary onClick={() => {
                openPhoneModal(
                    <SimpleForm
                        elements={[
                            {
                                name: "characterId",
                                render: (prop: SimpleFormRender<string>) => {
                                    const onChange = prop.onChange;
                                    const value = prop.value;
                                    return (
                                        <Input.Text
                                            label="State ID"
                                            icon="user"
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )
                                }
                            }
                        ]}
                        onCancel={() => {
                            return closePhoneModal(false);
                        }}
                        onSubmit={async (values: any) => {
                            setPhoneModalLoading();

                            const results = await nuiAction('ev-ui:racingGiveDongle', { options: values });

                            if (results.meta.ok) {
                                closePhoneModal();
                                return;
                            }

                            setPhoneModalError(results.meta.message, true);
                        }}
                    />
                )
            }}>
                Give Dongle
            </Button.Primary>
        </AppContainer>
    ) : null;
}