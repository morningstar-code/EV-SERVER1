import { Slider } from '@mui/material';
import Button from 'components/button/button';
import React from 'react';
import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles();
    const [values, setValues] = React.useState([1, 1, 1]);

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <div className={classes.sliders}>
                    {Array(props.sliders).fill(0).map((_, i) => {
                        return (
                            <Slider
                                color="primary"
                                size="small"
                                orientation="vertical"
                                defaultValue={1}
                                min={1}
                                step={1}
                                max={100}
                                onChange={(e, value) => {
                                    return (function (idx, val) {
                                        const vals: any = values;
                                        vals[idx] = val;
                                        setValues(vals);
                                    })(i, value);
                                }}
                            />
                        )
                    })}
                </div>
                <div className={classes.button}>
                    <Button.Primary onClick={() => props.submitValues(values)}>
                        Submit
                    </Button.Primary>
                </div>
            </div>
        </div>
    )
}