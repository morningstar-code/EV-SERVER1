import React from 'react';
import useStyles from './index.styles';
import { Typography } from '@mui/material';
import Input from 'components/input/input';
import Button from 'components/button/button';

const PhoneTab: React.FC<any> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div>
                <div className={classes.flex}>
                    <Typography variant="h6" style={{ color: 'white' }}>
                        Misc
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button.Primary onClick={props.saveSettings}>
                            Save
                        </Button.Primary>
                    </div>
                </div>
                <div className={classes.preference}>
                    <Input.Select
                        label="Brand"
                        items={[
                            {
                                id: 'ios',
                                name: 'iOS'
                            },
                            {
                                id: 'android',
                                name: 'Android'
                            }
                        ]}
                        value={props['phone.shell']}
                        onChange={(e) => {
                            props.updateState({ 'phone.shell': e });
                        }}
                    />
                </div>
                <div className={classes.preference}>
                    <Input.Text
                        label="Background URL (1:2.2 res)"
                        icon="images"
                        value={props['phone.wallpaper']}
                        onChange={(e) => {
                            props.updateState({ 'phone.wallpaper': e });
                        }}
                    />
                </div>
            </div>
            <hr />
            <div>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Notifications
                </Typography>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Receive SMS"
                        checked={props['phone.notifications.sms']}
                        onChange={(e: any) => {
                            props.updateState({ 'phone.notifications.sms': e });
                        }}
                    />
                </div>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="New Tweet"
                        checked={props['phone.notifications.twatter']}
                        onChange={(e) => {
                            props.updateState({ 'phone.notifications.twatter': e })
                        }}
                    />
                </div>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Receive Email"
                        checked={props['phone.notifications.email']}
                        onChange={(e) => {
                            props.updateState({ 'phone.notifications.email': e })
                        }}
                    />
                </div>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="New Race"
                        checked={props['phone.notifications.race']}
                        onChange={(e) => {
                            props.updateState({ 'phone.notifications.race': e })
                        }}
                    />
                </div>
            </div>
            <hr />
            <div>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Images
                </Typography>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Embedded Images Enabled"
                        checked={props['phone.images.enabled']}
                        onChange={(e) => {
                            props.updateState({ 'phone.images.enabled': e })
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default PhoneTab;