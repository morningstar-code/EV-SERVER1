import { getContactData } from 'lib/character';
import { openPhoneModal } from 'main/phone/actions';
import AppContainer from 'main/phone/components/app-container';
import React from 'react';
import { callStart } from '../../call-history/events';
import AddContactModal from '../../contacts/add-contact-modal';
import ConversationBottom from './conversation/conversation-bottom';
import ConversationMessage from './conversation/conversation-message';
import ConversationTop from './conversation/conversation-top';
import './messages.scss';

export default (props: any) => {
    const [conversation, setConversation] = React.useState<any>({
        messages: []
    });
    const [messages, setMessages] = React.useState(conversation.messages);

    React.useEffect(() => {
        const contactData = getContactData(props.activeConversation);
        const hasName = contactData.hasName;
        const name = contactData.name;

        const data = {
            name: hasName ? name : '',
            number: props.activeConversation,
            messages: (props.conversations[props.activeConversation] || {}).messages || []
        }

        setConversation(data);
        setMessages(data.messages);
    }, [props]);

    const primaryActions = [];

    if (!conversation?.name) {
        primaryActions.push({
            icon: 'user-plus',
            title: 'Add Contact',
            onClick: () => {
                openPhoneModal(
                    <AddContactModal number={conversation.number} />
                )
            }
        });
    }

    primaryActions.push({
        icon: 'phone',
        title: 'Call',
        onClick: () => callStart({ number: conversation.number.toString() })
    });

    return (
        <AppContainer
            emptyMessage={conversation.messages.length === 0}
            fadeIn={false}
            onClickBack={() => props.updateState({ page: 0 })}
            primaryActions={primaryActions}
            search={{
                filter: ['message'],
                list: conversation.messages,
                onChange: setMessages
            }}
        >
            <div className={`messages-container messages-container-${props.phone.orientation}`}>
                <ConversationTop conversation={conversation} />
                <div className="messages">
                    {messages && messages.length > 0 && messages.map((message: any, index: number) => (
                        <ConversationMessage key={index} message={message} />
                    ))}
                </div>
                <ConversationBottom activeConversation={props.activeConversation} />
            </div>
        </AppContainer>
    )
}