import React from 'react';
import useStyles from '../index.styles';
import Text from 'components/text/text';
import { Slider } from '@mui/material';

export default (props: any) => {
    const classes = useStyles();

    const min = props.min;
    const max = props.max;
    const step = props.step;
    const onChange = props.onChange;
    const value = props.value;
    const label = props.label ?? '';
    const styles = props.styles ?? {};

    const [sliderValue, setSliderValue] = React.useState(value);

    const handleOnChange = () => onChange(sliderValue);

    return (
        <div style={{ ...styles, margin: 10 }}>
            <div style={{ width: '100%' }}>
                {label && (
                    <Text variant="body2">
                        {label}
                    </Text>
                )}
                <Slider
                    min={min}
                    max={max}
                    step={step}
                    value={sliderValue ?? step}
                    onChange={(event: any, value: any) => {
                        setSliderValue(+value);
                        handleOnChange();
                    }}
                />
            </div>
        </div>
    )
}