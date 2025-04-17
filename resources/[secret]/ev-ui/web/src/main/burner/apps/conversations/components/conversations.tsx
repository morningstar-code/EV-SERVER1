import { nuiAction } from "lib/nui-comms";
import AppContainer from "main/phone/components/app-container";
import { devData } from "main/phone/dev-data";
import React from "react";
import Conversation from "./conversation";

export default (props: any) => {
    const [list, setList] = React.useState(props.conversations);

    React.useEffect(() => {
        setList(props.conversations);
    }, [props.conversations]);

    return (
        <AppContainer
            emptyMessage={props.conversations.length === 0}
            primaryActions={[
                {
                    icon: 'comment',
                    onClick: () => { },
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

                        const results = await nuiAction('ev-ui:getMessages', { source_number: props.burner.source_number, target_number: number.toString() }, { returnData: devData.getMessages(number) });

                        props.addMessagesToConversation(number, results.data);
                    }}
                />
            ))}
        </AppContainer>
    )
};