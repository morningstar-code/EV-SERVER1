import React, { FunctionComponent } from "react";
import { Button as MUIButton, ButtonGroup, TextField, Typography } from "@mui/material";
import { ComponentDetails } from "components/component-details";
import { baseStyles } from "lib/styles";
import Button from "components/button/button";
import { ResponsiveWidth } from "utils/responsive";
import useStyles from "./index.styles"

export default (props: any) => {
    const classes = useStyles();

    const min = props.min;
    const max = props.max;
    const onChange = props.onChange;
    let value = props.value;
    const styles = props.styles ?? {};

    return (
        <ButtonGroup
            disableFocusRipple={true}
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                boxShadow: 'none',
                backgroundColor: 'transparent',
                ...styles
            }}
            variant="contained"
        >
            <Button.Tertiary onClick={() => {
                (value -= 1) < min && (value = max - 1);
                value > max - 1 && (value = min);
                onChange(+value);
            }} style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, paddingBottom: '10px' }}>
                {'<'}
            </Button.Tertiary>
            <MUIButton
                disableRipple={true}
                disableTouchRipple={true}
                style={{ backgroundColor: 'transparent', padding: '0' }}
            >
                <TextField
                    autoFocus={false}
                    type="number"
                    style={{ width: ResponsiveWidth(100) }}
                    InputProps={{
                        onKeyDown: (e) => {
                            e.keyCode === 65 && onChange(+value - 1);
                            e.keyCode === 68 && onChange(+value + 1);
                        },
                        style: { width: '100%' },
                        startAdornment: null,
                        inputProps: {
                            min: min,
                            max: max,
                            className: classes.componentInput,
                            style: { padding: '9px 0' }
                        }
                    }}
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    variant="standard"
                />
            </MUIButton>
            <Button.Tertiary onClick={() => {
                (value += 1) < min && (value = max - 1);
                value > max - 1 && (value = min);
                onChange(+value);
            }} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0, paddingBottom: '10px' }}>
                {'>'}
            </Button.Tertiary>
        </ButtonGroup>
    )
};