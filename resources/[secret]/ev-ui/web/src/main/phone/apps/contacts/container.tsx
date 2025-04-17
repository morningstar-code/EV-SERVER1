import React, { FunctionComponent } from "react";
import AppContainer from "main/phone/components/app-container";
import { ComponentPaper } from "components/paper";
import { ComponentDetails } from "components/component-details";
import { ComponentIcon } from "components/component-icon";
import { formatNumber } from "lib/format";
import { useSelector } from "react-redux";
import store from "./store";
import { closePhoneModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading, updatePhoneAppState } from "main/phone/actions";
import AddContactModal from "./add-contact-modal";
import MessageContactModal from "./message-contact-modal";
import { copyToClipboard } from "utils/copy";
import { nuiAction } from "lib/nui-comms";
import { storeObj } from "lib/redux";
import { callStart } from "../call-history/events";

const Container: FunctionComponent<any> = (props) => {
    const state = useSelector((state) => state[store.key]);

    const [list, setList] = React.useState([]);

    React.useEffect(() => {
        setList(state.list);
    }, [state.list]);

    const primaryActions = [
        {
            icon: "fas fa-user-plus",
            title: "Add Contact",
            onClick: () => {
                openPhoneModal(
                    <AddContactModal />
                )
            }
        }
    ]

    return (
        <AppContainer
            emptyMessage={list.length === 0}
            primaryActions={primaryActions}
            search={{
                filter: ['name', 'number'],
                list: state.list,
                onChange: setList
            }}
        >
            {list && list.length > 0 && list.map((contact) => (
                <ComponentPaper
                    key={contact.id}
                    actions={[
                        {
                            icon: 'user-slash',
                            title: 'Yeet',
                            onClick: async () => {
                                setPhoneModalLoading();

                                const results = await nuiAction('ev-ui:deleteContact', {
                                    id: contact.id
                                });

                                if (results.meta.ok) {
                                    closePhoneModal();

                                    const contacts = storeObj.getState()['phone.apps.contacts'].list;
                                    const newContacts = contacts.filter((c) => c.id !== contact.id);

                                    updatePhoneAppState('phone.apps.contacts', {
                                        list: newContacts
                                    });
                                } else {
                                    setPhoneModalError(results.meta.message);
                                }
                            }
                        },
                        {
                            icon: 'phone',
                            onClick: () => callStart({ number: contact.number }),
                            title: 'Call'
                        },
                        {
                            icon: 'comment',
                            onClick: () => {
                                openPhoneModal(
                                    <MessageContactModal number={contact.number} />
                                )
                            },
                            title: 'Message'
                        },
                        {
                            icon: 'clipboard',
                            onClick: () => copyToClipboard(contact.number),
                            title: 'Copy Number'
                        }
                    ]}
                >
                    <ComponentIcon icon="user-circle" />
                    <ComponentDetails
                        title={contact.name}
                        description={formatNumber(contact.number)}
                    />
                </ComponentPaper>
            ))}
        </AppContainer>
    )
}

export default Container;