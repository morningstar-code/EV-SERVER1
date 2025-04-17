import React, { FunctionComponent } from "react";
import { ComponentPaper } from "components/paper";
import { ComponentIcon } from "components/component-icon";
import { ComponentDetails } from "components/component-details";

const Member: FunctionComponent<any> = (props) => {
    const leaderIsMe = props.leaderIsMe;
    const member = props.member;
    const getGroup = props.getGroup;
    const actions = [];

    const groupAction = (action, member) => {

    }

    if (!member.isLeader && leaderIsMe) {
        actions.push({
            icon: 'user-minus',
            onClick: () => groupAction('remove', { member_id: member.characterId }),
            title: 'Remove from Group'
        });
        actions.push({
            icon: 'user-graduate',
            onClick: () => groupAction('promote', { member_id: member.characterId }),
            title: 'Promote to Leader'
        });
    }

    return (
        <ComponentPaper
            actions={actions}
            notifications={true}
            notificationsColor={member.isOnline ? '#4CAF50' : '#f44336'}
        >
            <ComponentIcon icon={member.isLeader ? 'user-graduate' : 'user'} />
            <ComponentDetails title={`${member.firstName} ${member.lastName}`} description="" />
        </ComponentPaper>
    )
}

export default Member;