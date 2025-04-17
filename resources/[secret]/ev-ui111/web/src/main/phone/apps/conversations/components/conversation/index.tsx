import { ComponentDetails } from "components/component-details";
import { ComponentIcon } from "components/component-icon";
import { ComponentPaper } from "components/paper";
import { Typography } from "@mui/material";
import { formatNumber } from "lib/format";

export default (props: any) => {
    const conversation = props.conversation;
    const notifications = props.notifications;
    const onClick = props.onClick;
    const message = conversation.messages[0];

    return (
        <ComponentPaper
            className="cursor-pointer"
            notifications={notifications}
            onClick={() => onClick(conversation.number)}
        >
            <ComponentIcon icon="user-circle" />
            <ComponentDetails
                title={conversation.name ? conversation.name : formatNumber(conversation.number)}
                description={(
                    <div className="flex-row">
                        {message?.direction === 'out' && (
                            <i className="fas fa-share fa-fw fa-sm" style={{ color: '#fff', marginRight: 8 }} />
                        )}
                        <Typography variant="body2" className="text-clip" style={{ color: '#fff' }}>
                            {message?.message}
                        </Typography>
                    </div>
                )}
            />
        </ComponentPaper>
    )
}