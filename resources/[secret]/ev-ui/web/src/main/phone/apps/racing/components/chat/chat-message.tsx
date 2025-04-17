import ComponentImage from "components/component-image";
import Text from "components/text/text";
import { fromNow } from "lib/date";
import { FindImagesInString } from "lib/images";

export default (props: any) => {
    const message = props.message;
    const direction = props.direction;
    const messageData = FindImagesInString(message.message);
    const msg = messageData.message;
    const images = messageData.images;
    const sender = message?.sender?.name;

    return (
        <div className={`message message-${direction}`}>
            {images && images.length > 0 && (
                <ComponentImage
                    key={message.timestamp}
                    images={images}
                />
            )}
            {!!msg && (
                <div className={`inner inner-${direction}`}>
                    <Text variant="body2">
                        {msg}
                    </Text>
                </div>
            )}
            <div className={`timestamp timestamp-${direction}`}>
                <Text variant="body2" className="timestamp">
                    {sender ? sender + ' - ' : '' + fromNow(message.timestamp)}
                </Text>
            </div>
        </div>
    )
}