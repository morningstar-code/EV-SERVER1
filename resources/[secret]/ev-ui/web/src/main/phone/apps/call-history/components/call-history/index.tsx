import moment from "moment";
import React, { FunctionComponent } from "react";
import { getContactData } from "lib/character";
import AppContainer from "main/phone/components/app-container";
import { ComponentDetails } from "components/component-details";
import { ComponentIcon } from "components/component-icon";
import { ComponentPaper } from "components/paper";
import { closePhoneModal, openPhoneModal } from "main/phone/actions";
import SimpleForm from "components/simple-form";
import Input from "components/input/input";
import { callStart } from "../../events";
import AddContactModal from "main/phone/apps/contacts/add-contact-modal";
import MessageContactModal from "main/phone/apps/contacts/message-contact-modal";

const CallHistory: FunctionComponent<any> = (props) => {
    const [list, setList] = React.useState(props.list);

    React.useEffect(() => {
        setList(props.list);
    }, [props.list]);

    return (
        <AppContainer
            emptyMessage={list.length === 0}
            primaryActions={[
                {
                    icon: 'phone',
                    onClick: () => {
                        return openPhoneModal(
                            <SimpleForm
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
                                                />
                                            )
                                        }
                                    }
                                ]}
                                onCancel={() => {
                                    closePhoneModal(false);
                                }}
                                onSubmit={(values) => {
                                    callStart({ number: values.number });
                                    closePhoneModal(false);
                                }}
                            />
                        )
                    },
                    title: 'Call Someone'
                }
            ]}
            search={{
                filter: ['name', 'number'],
                list: props.list,
                onChange: setList
            }}
        >
            {list && list.length > 0 && list.map((call, index) => {
                const actions = [
                    {
                        icon: 'phone',
                        onClick: () => {
                            callStart({ number: call.number });
                        },
                        title: 'Call'
                    },
                    {
                        icon: 'comment',
                        onClick: () => {
                            openPhoneModal(
                                <MessageContactModal number={call.number} />
                            )
                        },
                        title: 'Message'
                    },
                ]

                const contactData = getContactData(call.number);
                const hasName = contactData.hasName;
                const name = contactData.name;

                if (!hasName) {
                    actions.push({
                        icon: 'user-plus',
                        onClick: () => {
                            openPhoneModal(
                                <AddContactModal number={call.number} />
                            )
                        },
                        title: 'Add Contact'
                    });
                }

                const title = name.includes("Unknown Number") ? "Unknown Number" : name;

                return (
                    <ComponentPaper
                        key={index}
                        actions={actions}
                    >
                        <div className="image">

                            <ComponentIcon icon={call.direction === 'in' ? 'phone' : 'phone-alt'} />
                        </div>
                        <ComponentDetails
                            description={moment(call.timestamp * 1000).fromNow()}
                            title={title}
                        />
                    </ComponentPaper>
                )
            })}
        </AppContainer>
    )
}

export default CallHistory;