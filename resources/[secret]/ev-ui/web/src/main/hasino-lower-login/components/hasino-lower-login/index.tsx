import { Typography } from '@mui/material';
import Input from 'components/input/input';
import SimpleForm from 'components/simple-form';
import { baseStyles } from 'lib/styles';
import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            {props.timeRemaining > 0 && !props.success && (
                <div className={classes.textWrapper}>
                    <Typography variant="h2" style={{ color: 'white' }}>
                        {props.timerText}
                    </Typography>
                </div>
            )}
            {props.response && (
                <div className={classes.textWrapper}>
                    <Typography style={{ color: props.success ? baseStyles.greenText : baseStyles.redText }}>
                        {props.response}
                    </Typography>
                </div>
            )}
            {props.attempts < 5 && !props.success && (
                <div className={classes.textWrapper}>
                    <Typography style={{ color: 'white' }}>
                        Attempts Remaining: {props.attempts}
                    </Typography>
                </div>
            )}
            <SimpleForm
                elements={[
                    {
                        name: 'password',
                        render: (prop) => {
                            const onChange = prop.onChange;
                            const value = prop.value;

                            return (
                                <Input.Password
                                    onChange={onChange}
                                    value={value}
                                />
                            )
                        }
                    }
                ]}
                onCancel={props.onHide}
                onSubmit={(prop) => {
                    return props.submitPassword(prop.password);
                }}
            />
            <div className={classes.textWrapperBottom}>
                <Typography className={classes.hint}>
                    Password Hint: {props.hint}
                </Typography>
            </div>
        </div>
    )
}