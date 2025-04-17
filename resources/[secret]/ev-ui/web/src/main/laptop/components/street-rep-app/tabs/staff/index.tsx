import { Typography } from '@mui/material';
import { nuiAction } from 'lib/nui-comms';
import React, { FunctionComponent } from 'react';
import Button from '../../../../../../components/button/button';
import useStyles from './index.styles';
import LogsModal from './logs-modal';
import RemoveMemberModal from './remove-member-modal';

interface StaffProps {
    isStaff: boolean;
}

const Staff: FunctionComponent<StaffProps> = (props) => {
    const classes = useStyles();
    const [staffInfo, setStaffInfo] = React.useState<{ groups: StreetGangGroup[], totalGroups: number, totalMembersInGroups: number }>();
    const [logsModal, setLogsModal] = React.useState<boolean>(false);
    const [removeMemberModal, setRemoveMemberModal] = React.useState<boolean>(false);

    const fetchStaffInformation = React.useCallback(async () => {
        const result = await nuiAction('ev-gangsystem:ui:fetchStaffInformation', {}, {
            returnData: {
                totalGroups: 20,
                totalMembersInGroups: 20,
                groups: [
                    {
                        id: 'vagos',
                        name: 'Vagos',
                    },
                    {
                        id: 'gsf',
                        name: 'GSF',
                    }
                ]
            }
        });

        if (result.meta.ok) {
            setStaffInfo(result.data);
        }
    }, []);

    React.useEffect(() => {
        fetchStaffInformation();
    }, [fetchStaffInformation]);

    return (
        <div className={classes.staffPage}>
            <RemoveMemberModal
                show={removeMemberModal}
                handleClose={() => setRemoveMemberModal(false)}
                groups={staffInfo?.groups ?? []}
            />
            <LogsModal
                show={logsModal}
                handleClose={() => setLogsModal(false)}
                groups={staffInfo?.groups ?? []}
            />
            <Typography variant="body2" className={classes.headerText}>Staff Panel</Typography>
            <div className={classes.infoList}>
                <div className={classes.infoItem}>
                    <Typography variant="body2" className={classes.headerText}>Total Groups</Typography>
                    <Typography variant="body2" className={classes.subHeaderText}>{staffInfo?.totalGroups ?? 0}</Typography>
                </div>
                <div className={classes.infoItem}>
                    <Typography variant="body2" className={classes.headerText}>Total Users In Groups</Typography>
                    <Typography variant="body2" className={classes.subHeaderText}>{staffInfo?.totalMembersInGroups ?? 0}</Typography>
                </div>
            </div>
            <div className={classes.infoList}>
                <div className={classes.infoItem}>
                    <Typography variant="body2" className={classes.headerText}>View Group Logs</Typography>
                    <Button.Primary className={classes.button} onClick={() => setLogsModal(true)}>
                        View Logs
                    </Button.Primary>
                </div>
                <div className={classes.infoItem}>
                    <Typography variant="body2" className={classes.headerText}>Remove Group Member</Typography>
                    <Button.Primary className={classes.button} onClick={() => setRemoveMemberModal(true)}>
                        Remove
                    </Button.Primary>
                </div>
            </div>
        </div>
    );
}

export default Staff;