import { nuiAction } from "lib/nui-comms";
import React from "react";
import { addMessageToConversation } from "../../../actions";

export default (props: any) => {
    const [message, setMessage] = React.useState('');

    return (
        <div className="send-message">
            <textarea
                onChange={(e) => setMessage(e.target.value.replace(/[\n\r]+/g, ''))}
                placeholder="Send message..."
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        if (!message.trim()) {
                            return;
                        }

                        addMessageToConversation({
                            number: props.activeConversation,
                            message: message
                        });

                        nuiAction('ev-ui:smsSend', {
                            message: message,
                            number: props.activeConversation.toString()
                        });

                        setMessage('');
                    }
                }}
                value={message}
            />
        </div>
    )
}