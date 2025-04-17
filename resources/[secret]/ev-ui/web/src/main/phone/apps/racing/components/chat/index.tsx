import Text from "components/text/text";
import React from "react"
import ChatBottom from "./chat-bottom";
import ChatContainer from "./chat-container";
import ChatMessage from "./chat-message";
import "./chat.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default (props: any) => {
    const [conversation, setConversation] = React.useState(props.conversations[props.currentConversation]);
    const [messages, setMessages] = React.useState(conversation ? conversation.messages : []);

    React.useEffect(() => {
        const currentConversation = props.conversations[props.currentConversation];
        setConversation(currentConversation);
        setMessages(currentConversation.messages);
    }, [props.currentConversation]);

    return (
        <div className="chat-container">
            <div className="chat-info">
                <div className="chat-info-top">
                    <Text variant="h6">
                        Chat
                    </Text>
                    <div className="icon">
                        <FontAwesomeIcon
                            icon="times"
                            size="lg"
                            onClick={() => props.updateState({ currentConversation: null })}
                        />
                    </div>
                </div>
                <Text variant="body1">
                    {conversation?.name}
                </Text>
            </div>
            <ChatContainer>
                <div className="messages">
                    {messages && messages.sort((a: any, b: any) => b.id - a.id).map((message: any, index: number) => (
                        <ChatMessage
                            key={index}
                            message={message}
                            direction={message.sender.id === props.character.id ? 'out' : 'in'}
                        />
                    ))}
                </div>
            </ChatContainer>
            {conversation.raceType !== 'completed' && (
                <ChatBottom
                    {...props}
                    id={conversation.id}
                />
            )}
        </div>
    )
}