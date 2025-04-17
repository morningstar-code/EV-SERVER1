import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@mui/material";
import { formatNumber } from "lib/format";

export default (props: any) => {
    const conversation = props.conversation;

    return (
        <div className="contact-info">
            <div className="icon">
                <FontAwesomeIcon icon="user-circle" size="2x" />
            </div>
            <div className="text">
                {!!conversation.name && (
                    <Typography variant="body2" style={{ color: '#fff' }}>
                        {conversation?.name}
                    </Typography>
                )}
                <Typography variant="body2" style={{ color: '#fff' }}>
                    {formatNumber(conversation?.number)}
                </Typography>
            </div>
        </div>
    )
}