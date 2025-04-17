import { nuiAction } from "lib/nui-comms";
import AppContainer from "main/phone/components/app-container";
import { devData } from "main/phone/dev-data";
import React from "react";
import Conversation from "./conversation";
import { closePhoneModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import SimpleForm from "components/simple-form";
import Input from "components/input/input";
import { addMessageToConversation } from "../actions";

export default (props: any) => {
    const [list, setList] = React.useState(props.conversations);

    React.useEffect(() => {
        setList(props.conversations);
    }, [props.conversations]);

    return (
        <AppContainer
            emptyMessage={props.conversations.length === 0}
            fadeIn={props.fadeIn}
            primaryActions={[
                {
                    icon: 'comment',
                    onClick: () => {
                        openPhoneModal(
                            <SimpleForm
                                defaultValues={{ number: '' }}
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
                                                    useNormalInput={true}
                                                />
                                            )
                                        },
                                        validate: ['phone', 'Phone Number']
                                    },
                                    {
                                        name: 'message',
                                        render: (prop: SimpleFormRender<string>) => {
                                            const onChange = prop.onChange;
                                            const value = prop.value;

                                            return (
                                                <Input.TextArea
                                                    icon="comment"
                                                    label="Message"
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            )
                                        },
                                        validate: ['text', 'Message']
                                    }
                                ]}
                                onCancel={() => {
                                    return closePhoneModal(false);
                                }}
                                onSubmit={async (values: any) => {
                                    setPhoneModalLoading();

                                    const results = await nuiAction<ReturnData>("ev-ui:smsSend", values);

                                    if (results.meta.ok) {
                                        closePhoneModal();

                                        addMessageToConversation(values);

                                        return;
                                    }

                                    setPhoneModalError(results.meta.message);
                                }}
                            />
                        )
                    },
                    title: 'Send Message'
                }
            ]}
            search={{
                filter: ['name', 'number'],
                list: props.conversations,
                onChange: setList
            }}
        >
            {list && list.length > 0 && list.map((conversation: any, index: number) => (
                <Conversation
                    key={index}
                    conversation={conversation}
                    notifications={props.notifications.includes(conversation.number)}
                    onClick={async (number: string) => {
                        props.openMessagesContainer(number);

                        if (props.loaded.includes(number)) {
                            return;
                        }

                        const results = await nuiAction('ev-ui:getMessages', { target_number: number.toString() }, { returnData: devData.getMessages(number) });

                        props.addMessagesToConversation(number, results.data);
                    }}
                />
            ))}
        </AppContainer>
    )
};