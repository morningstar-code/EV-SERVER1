import { getContactData } from 'lib/character';
import AppContainer from 'main/phone/components/app-container';
import React from 'react';
import { callStart } from '../../call-history/events';
import ConversationTop from './conversation/conversation-top';
import ConversationMessage from './conversation/conversation-message';
import '../../../../phone/apps/conversations/components/messages.scss';
import { addMessageToConversation } from '../actions';
import { nuiAction } from 'lib/nui-comms';

export default (props: any) => {
    const activeConversation = props.activeConversation;
    const hasName = activeConversation.hasName;
    const name = activeConversation.name;
    const data = {
        name: hasName ? name : '',
        number: props.activeConversation,
        messages: (props.conversations[props.activeConversation] || {}).messages || []
    }
    const [messages, setMessages] = React.useState(data.messages);
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        setMessages(data.messages);
    }, [data.messages]);

    const primaryActions = [];

    primaryActions.push({
        icon: 'phone',
        title: 'Call',
        onClick: () => callStart({ number: data.number.toString() })
    });

    return (
        <AppContainer
            emptyMessage={data.messages.length === 0}
            fadeIn={false}
            onClickBack={() => props.updateState({ activeConversation: -1 })}
            primaryActions={primaryActions}
            search={{
                filter: ['message'],
                list: data.messages,
                onChange: setMessages
            }}
        >
            <div className={`messages-container messages-container-${props.burner.orientation}`}>
                <ConversationTop conversation={data} />
                <div className="messages">
                    {messages && messages.length > 0 && messages.map((message: any, index: number) => (
                        <ConversationMessage
                            key={index}
                            message={message}
                        />
                    ))}
                </div>
                <div className="send-message">
                    <textarea
                        onChange={(e) => setMessage(e.target.value.replace(/[\n\r]+/g, ''))}
                        placeholder="Send message..."
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                if (!message.trim()) {
                                    return;
                                }

                                if (!props.burner.isOwner) {
                                    return;
                                }

                                addMessageToConversation({
                                    number: props.activeConversation,
                                    message: message
                                });

                                nuiAction('ev-ui:smsSend', {
                                    message: message,
                                    number: props.activeConversation.toString(),
                                    source_number: props.burner.source_number
                                });

                                setMessage('');
                            }
                        }}
                        value={message}
                    />
                </div>
            </div>
        </AppContainer>
    )
}