import React, { FunctionComponent } from "react";
import { ComponentPaper } from "components/paper";
import { ComponentIcon } from "components/component-icon";
import { ComponentDetails } from "components/component-details";
import { Tooltip, Typography } from "@mui/material";

const Member: FunctionComponent<any> = (props) => {
    const action = props.action;
    const leader = props.leader;
    const leaderIsMe = props.leaderIsMe;
    const member = props.member;

    const actions = [];

    if (!leader && leaderIsMe) {
        actions.push({
            icon: 'user-minus',
            title: 'Remove from Group',
            onClick: () => {
                action('ev-ui:jobCenterGroupRemove', { member_id: member.id });
            }
        });
        actions.push({
            icon: 'user-graduate',
            title: 'Promote to Leader',
            onClick: () => {
                action('ev-ui:jobCenterGroupPromote', { member_id: member.id });
            }
        });
    }

    return (
        <ComponentPaper
            actions={actions}
            notifications={true}
            notificationsColor={member.is_online ? '#4CAF50' : '#f44336'}
        >
            <ComponentIcon icon={leader ? 'user-graduate' : 'user'} />
            <ComponentDetails
                title={`${member.first_name} ${member.last_name}`}
                description=''
            />
        </ComponentPaper>
    )
}

export default Member;