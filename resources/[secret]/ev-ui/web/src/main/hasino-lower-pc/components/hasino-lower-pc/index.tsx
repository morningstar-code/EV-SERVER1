import { Typography } from '@mui/material';
import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div className={classes.abc}>
                <div className={classes.inner}>
                    <fieldset className={classes.roundedFieldset}>
                        <legend>
                            <Typography style={{ color: 'white' }}>
                                {props.a}
                            </Typography>
                        </legend>
                    </fieldset>
                </div>
                <div className={classes.middle}>
                    <fieldset className={classes.roundedFieldset}>
                        <legend>
                            <Typography style={{ color: 'white' }}>
                                {props.b}
                            </Typography>
                        </legend>
                    </fieldset>
                </div>
                <div className={classes.outer}>
                    <fieldset className={classes.roundedFieldset}>
                        <legend>
                            <Typography style={{ color: 'white' }}>
                                {props.c}
                            </Typography>
                        </legend>
                    </fieldset>
                </div>
            </div>
            {props.prompts.map((prompt: any, index: number) => (
                <div key={index} className={classes.prompt}>
                    <Typography style={{ color: 'white' }}>
                        {prompt} = ?
                    </Typography>
                </div>
            ))}
        </div>
    )
}