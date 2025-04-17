import AppContainer from "main/phone/components/app-container";
import { getRacingAlias, hasAuthorizedSteamId, hasPdDongle } from "../../actions";
import Tournaments from "../tournaments";
import Button from "components/button/button";
import { closePhoneModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import SimpleForm from "components/simple-form";
import { nuiAction } from "lib/nui-comms";
import Input from "components/input/input";

export default (props: any) => {
    const pendingTournaments = props.tournaments.filter((t: any) => !t.completed && !t.active).reverse();
    const activeTournaments = props.tournaments.filter((t: any) => !t.completed && t.active).reverse();
    const completedTournaments = props.tournaments.filter((t: any) => t.completed).reverse();

    return (
        <AppContainer
            containerStyle={{ padding: 0 }}
            style={{ padding: 0 }}
        >
            {hasAuthorizedSteamId() && (
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 8
                }}>
                    <Button.Primary onClick={() => {
                        openPhoneModal(
                            <SimpleForm
                                elements={[
                                    {
                                        name: 'name',
                                        render: (prop: SimpleFormRender<string>) => {
                                            const onChange = prop.onChange;
                                            const value = prop.value;

                                            return (
                                                <Input.Name
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

                                    values.alias = hasPdDongle() ? null : getRacingAlias();

                                    const results = await nuiAction('ev-ui:racingCreateTournament', {
                                        options: values
                                    }, { returnData: [] });

                                    if (results.meta.ok) {
                                        return closePhoneModal();
                                    }

                                    setPhoneModalError(results.meta.message, true);
                                }}
                            />
                        )
                    }}>
                        Create Tournament
                    </Button.Primary>
                </div>
            )}
            {pendingTournaments.length > 0 && (
                <Tournaments
                    category="Pending"
                    tournaments={pendingTournaments}
                    character={props.character}
                />
            )}
            {activeTournaments.length > 0 && (
                <Tournaments
                    category="Active"
                    tournaments={activeTournaments}
                    character={props.character}
                />
            )}
            {completedTournaments.length > 0 && (
                <Tournaments
                    category="Completed"
                    tournaments={completedTournaments}
                    character={props.character}
                />
            )}
        </AppContainer>
    )
}