import React from 'react';
import useStyles from '../index.styles';
import Input from 'components/input/input';

const Status: React.FC<any> = (props) => {
    const classes = useStyles();

    const name = `hud.status.${props.name.toLowerCase()}`;

    return (
        <div className={classes.flex}>
            <div style={{ maxWidth: '35%' }}>
                <Input.Checkbox
                    label={props.label ? props.label : `Show ${props.name}`}
                    checked={props[`${name}.enabled`]}
                    onChange={(e) => {
                        props.updateState({ [`${name}.enabled`]: e });
                    }}
                />
            </div>
            {props[`${name}.enabled`] && (
                <Input.Text
                    label="Hide when more than... (100 = never hide)"
                    icon="percent"
                    value={props[`${name}.hide`]}
                    onChange={(e) => {
                        const value = Number(e);
                        if (!isNaN(value)) {
                            //value cant be less than 0 or more than 100
                            if (value >= 0 && value <= 100) {
                                props.updateState({ [`${name}.hide`]: value });
                            }
                        }
                    }}
                />
            )}
        </div>
    );
}

export default Status;