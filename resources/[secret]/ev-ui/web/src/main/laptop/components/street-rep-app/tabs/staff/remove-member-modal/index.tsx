import React, { FunctionComponent } from 'react';
import { Dialog, DialogContent, Typography } from '@mui/material';
import Input from '../../../../../../../components/input/input';
import Button from '../../../../../../../components/button/button';
import useStyles from './index.styles';
import { nuiAction } from 'lib/nui-comms';
import { AddSystemNotification } from 'main/laptop/components/laptop-screen';

interface RemoveMemberModalProps {
    show: boolean;
    handleClose: () => void;
    groups?: StreetGangGroup[];
}

const RemoveMemberModal: FunctionComponent<RemoveMemberModalProps> = (props) => {
    const classes = useStyles();
    const [stateId, setStateId] = React.useState(0);
    const [group, setGroup] = React.useState(null);

    const staffRemoveMember = async (id: number, groupId: number) => {
        if (stateId !== 0) {
            if (group !== 0) {
                const results = await nuiAction("ev-gangsystem:ui:staffRemoveMember", { stateId: id, groupId: groupId }, { returnData: {} });
                
                AddSystemNotification({
                    show: true,
                    icon: 'https://i.imgur.com/HNyPZK7.png',
                    title: 'Unknown',
                    message: results.meta.message,
                });

                results.meta.ok && props.handleClose();
            }
        }
    }

    return (
        <Dialog open={props.show} onClose={() => props.handleClose()} aria-labelledby="form-dialog-title">
            <DialogContent className={classes.modalContent}>
                <Typography variant="h2" className={classes.headerText}>Remove Group Member</Typography>
                <Input.Select
                    label="Group"
                    items={props.groups}
                    onChange={(e) => setGroup(e.target.value)}
                    value={group}
                />
                <div style={{ marginTop: '0.5rem' }}>
                    <Input.CityID
                        onChange={(e) => setStateId(e.target.value)}
                        value={stateId}
                    />
                </div>
                <Button.Primary onClick={() => staffRemoveMember(stateId, group)} className={classes.orangeButton}>
                    Remove Member
                </Button.Primary>
            </DialogContent>
        </Dialog>
    );
}

export default RemoveMemberModal;