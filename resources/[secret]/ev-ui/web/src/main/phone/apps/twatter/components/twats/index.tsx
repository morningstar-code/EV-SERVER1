import React, { FunctionComponent } from "react";
import AppContainer from "main/phone/components/app-container";
import { useSelector } from "react-redux";
import store from "../../store";
import { storeObj } from "lib/redux";
import Button from "components/button/button";
import Twat from "./twat";
import { closeConfirmModal, closePhoneModal, openConfirmModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import TwatModal from "../twat-modal";
import { getTwats } from "../../config";
import { nuiAction } from "lib/nui-comms";
import ManageBlockedUsersModal from "../manage-blocked-users-modal";

const Twats: FunctionComponent<any> = (props) => {
    const [list, setList] = React.useState(getTwats());
    const [twatsLoaded, setTwatsLoaded] = React.useState(20);

    React.useEffect(() => {
        if (props.shouldUpdate !== -1) {
            setList(getTwats());
        } else {
            return null;
        }
    }, [props.shouldUpdate]);

    const twitterEnabled = storeObj.getState().system.account.twitterEnabled;

    const getBlockedTwatterUsers = async () => {
        new Promise((resolve) => {
            return setTimeout(resolve, 2000);
        });

        const results = await nuiAction('ev-ui:getBlockedTwatterUsers', {});

        const blockedUsers = [];

        Object.keys(results.data).forEach((key) => {
            blockedUsers.push({
                id: parseInt(key),
                name: results.data[key].name
            });
        });

        props.updateState({ blockedUsers: blockedUsers });
    }

    const primaryActions = [];

    props.hasBlue ? primaryActions.push({
        icon: 'user-times',
        onClick: () => {
            openConfirmModal(
                async () => {
                    setPhoneModalLoading();
                    const results = await nuiAction('ev-ui:phone:cancelBlue', {});
                    if (results.meta.ok) {
                        props.updateState({ hasBlue: false });
                        closeConfirmModal();
                        return;
                    }
                    setPhoneModalError(results.meta.message);
                },
                "Are you sure you want to give up your checkmark?"
            )
        },
        title: 'Cancel Twatter Blu'
    }) : primaryActions.push({
        icon: 'comment-dollar',
        onClick: () => {
            openConfirmModal(
                async () => {
                    setPhoneModalLoading();
                    const results = await nuiAction('ev-ui:phone:purchaseBlue', {}, { returnData: true });
                    if (results.meta.ok) {
                        props.updateState({ hasBlue: true });
                        closeConfirmModal();
                        return;
                    }
                    setPhoneModalError(results.meta.message);
                },
                "$8000 - All Blu subscribers get a blue checkmark"
            )
        },
        title: 'Purchase Twatter Blu'
    });

    props.blockedUsers.length > 0 && primaryActions.push({
        icon: 'shield-alt',
        title: 'Manage blocked users',
        onClick: () => {
            openPhoneModal(
                <ManageBlockedUsersModal
                    users={props.blockedUsers}
                    reloadUsers={getBlockedTwatterUsers}
                />
            )
        }
    });

    twitterEnabled && primaryActions.push({
        icon: 'twitter',
        iconType: 'fab',
        onClick: () => {
            openPhoneModal(
                <TwatModal {...props} />
            );
        },
        title: 'Twat'
    });

    return (
        <AppContainer
            emptyMessage={list.length === 0}
            primaryActions={primaryActions}
            search={{
                filter: [
                    function (l) {
                        return `${l.character.first_name} ${l.character.last_name}`
                    },
                    'text',
                ],
                list: getTwats(),
                onChange: setList
            }}
        >
            {list && list.length > 0 && list.filter((l) => {
                return !(function(twat) {
                    return props.blockedUsers.find((bl) => {
                        return bl.id === Number(twat.character.id)
                    })
                })(l)
            }).slice(0, twatsLoaded).map((twat, index) => (
                <Twat
                    key={index}
                    twat={twat}
                    reloadUsers={getBlockedTwatterUsers}
                />
            ))}
            {list && list.length > 20 && (
                <div style={{ margin: 16, display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                    <Button.Primary onClick={() => setTwatsLoaded(twatsLoaded + 20)}>
                        Show More
                    </Button.Primary>
                </div>
            )}
        </AppContainer>
    )
}

export default Twats;