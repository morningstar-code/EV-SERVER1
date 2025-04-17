import { nuiAction } from "lib/nui-comms";
import React from "react";
import { getRacingAlias } from "../../actions";

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

                        nuiAction('ev-ui:racingSendMessage', {
                            message: message,
                            eventId: props.id,
                            characterId: props.character.id,
                            alias: getRacingAlias()
                        });

                        setMessage('');
                    }
                }}
                value={message}
            />
        </div>
    )
}