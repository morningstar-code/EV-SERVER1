import { Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import Button from '../../../../../../components/button/button';
import AddMemberModal from './add-member-modal';
import useStyles from './index.styles';
import { nuiAction } from 'lib/nui-comms';
import { AddSystemNotification } from 'main/laptop/components/laptop-screen';

interface MembersProps {
    members: StreetGangMember[];
    fetchGangInfo: () => StreetGangInfo;
    isLeader: boolean;
}

const Members: FunctionComponent<MembersProps> = (props) => {
    const classes = useStyles();
    const members = props.members;
    const fetchGangInfo = props.fetchGangInfo;
    const isLeader = props.isLeader;

    const kickMember = async (stateId: number) => {
        const results = await nuiAction("ev-gangsystem:ui:kickMember", { stateId: stateId }, { returnData: {} });

        AddSystemNotification({
            show: true,
            icon: 'https://i.imgur.com/HNyPZK7.png',
            title: 'Unknown',
            message: results.meta.message,
        });

        if (!results.meta.ok) return;

        return fetchGangInfo();
    }

    const [showAddMemberModal, setShowAddMemberModal] = React.useState(false);

    return (
        <div className={classes.membersPage}>
            <AddMemberModal
                show={showAddMemberModal}
                handleClose={() => setShowAddMemberModal(false)}
            />
            <Typography variant="body1" className={classes.headerText}>Current Members ({members?.length ?? 0})</Typography>
            {isLeader && (
                <Button.Primary className={classes.addMemberButton} onClick={() => setShowAddMemberModal(true)}>
                    Add Member
                </Button.Primary>
            )}
            <div className={classes.membersList}>
                {members && members.map((member) => (
                    <li className={classes.member}>
                        <Typography variant="body2" className={classes.memberName}>{member.name}</Typography>
                        {isLeader && (
                            <Typography variant="body2" className={classes.kickMember} onClick={() => kickMember(member.cid)}>Kick Member</Typography>
                        )}
                    </li>
                ))}
            </div>
        </div>
    );
}

export default Members;