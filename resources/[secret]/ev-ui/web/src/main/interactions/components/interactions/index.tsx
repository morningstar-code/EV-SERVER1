import { Alert, Slide, Typography } from '@mui/material';
import { Transition } from 'react-transition-group';
import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles();
    const values = [];

    const splittedMessage = props.message.split(' ');

    return (
        <>
            {splittedMessage.forEach((value) => {
                value.indexOf('[') === 0 ?
                    values.push({
                        render: function () {
                            return (
                                <span className={classes.textClassB}>
                                    {value} {" "}
                                </span>
                            )
                        }
                    }) : values.push({
                        render: function () {
                            return (
                                <span>
                                    {value} {" "}
                                </span>
                            )
                        }
                    })
            })}
            <div className={classes.wrapper}>
                <div className={classes.alert}>
                    <Slide
                        timeout={600}
                        direction="right"
                        in={props.show}
                        mountOnEnter={true}
                        unmountOnExit={true}
                    >
                        <Alert
                            icon={false}
                            variant="filled"
                            severity={props.type}
                            sx={{ textAlign: 'center' }}
                        >
                            <Typography variant="body1" className={classes.textClass} style={{ color: '#fff', textAlign: 'center' }}>
                                {values.map((value) => {
                                    return value.render();
                                })}
                            </Typography>
                        </Alert>
                    </Slide>
                </div>
            </div>
        </>
    )
}