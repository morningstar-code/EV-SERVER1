import { Typography } from '@mui/material';
import Input from 'components/input/input';
import React from 'react';
import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles();
    const [password, setPassword] = React.useState('');

    return (
        <div className={classes.container}>
            {!props.gameFinished && !props.introShown && (
                <div className={classes.introBox}>
                    <i className="fas fa-user-secret fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }}></i>
                    <Typography variant="body1" style={{ color: 'white' }}>
                        Input password as shown
                    </Typography>
                </div>
            )}
            {!props.gameFinished && !props.passwordShown && props.introShown && (
                <div className={classes.introBox}>
                    <Typography variant="h3" style={{ color: 'white' }}>
                        {props.requiredPassword}
                    </Typography>
                </div>
            )}
            {!props.gameFinished && props.passwordShown && props.introShown && (
                <div className={classes.introBox}>
                    <Input.Text
                        autoFocus={true}
                        label="Password"
                        icon="user-secret"
                        value={password}
                        onChange={setPassword}
                        onKeyUp={(e: any) => {
                            if (e.key === 'Enter') {
                                props.checkPassword(password);
                            }
                        }}
                        onPaste={(e: any) => {
                            e.preventDefault();
                        }}
                    />
                </div>
            )}
            {props.gameFinished && (
                <div className={classes.introBox}>
                    <i className="fas fa-user-secret fa-fw fa-4x" style={{ color: 'white', marginBottom: 32 }}></i>
                    <Typography variant="body1" style={{ color: 'white' }}>
                        Password Input {props.gameWon ? 'Complete' : 'Failed'}
                    </Typography>
                </div>
            )}
        </div>
    )
}