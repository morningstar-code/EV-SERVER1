import { Typography } from "@mui/material";
import { fromNow } from "lib/date";
import { FindImagesInString } from "lib/images";
import ComponentImage from "components/component-image";

export default (props: any) => {
    const message = props.message;
    const messageData = FindImagesInString(message.message);
    const msg = messageData.message;
    const images = messageData.images;

    return (
        <div className={`message message-${message.direction}`}>
            {images && images.length > 0 && (
                <ComponentImage
                    key={message.timestamp}
                    images={images}
                />
            )}
            <div className={`inner inner-${message.direction}`}>
                <Typography variant="body2" style={{ color: '#fff' }}>
                    {msg}
                </Typography>
            </div>
            <div className={`timestamp timestamp-${message.direction}`}>
                <Typography variant="body2" className="timestamp" style={{ color: '#fff' }}>
                    {fromNow(message.timestamp)}
                </Typography>
            </div>
        </div>
    )
}