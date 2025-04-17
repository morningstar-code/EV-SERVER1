import React, { useEffect } from 'react';
import Button from 'components/button/button';
import Input from 'components/input/input';
import useStyles from './textbox.styles';

export default (props: any) => {
    const [values, changeValue] = React.useState({});
    const classes = useStyles();

    const changeFieldValue = (name: string, value: any, maxLength = 0) => {
        if (maxLength > 0 && typeof value === 'string' && value.length > maxLength) value = value.substring(0, maxLength);
        changeValue({ ...values, [name]: value });
    }

    const onKeyDown = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            props.submitValues(values);
        }
    }

    useEffect(() => {
        const newValues = {};

        for (let i = 0; i < props.items.length; i++) {
            newValues[props.items[i].name] = props.items[i]._defaultValue ?? null;
        }

        changeValue(newValues);
    }, [props.items]);

    return (
        <div className={classes.wrapper} onKeyDown={onKeyDown}>
            <div className={classes.inputs}>
                {props.title && (<p className={classes.text}>{props.title}</p>)}
                {props.items && props.items.map((item: any) => {
                    if (item._type === 'select') {
                        return (
                            <div key={item.name} style={{ marginBottom: 16 }}>
                                <Input.Select
                                    items={item.options}
                                    label={item.label}
                                    onChange={(v: any) => changeFieldValue(item.name, v)}
                                    value={values[item.name]}
                                />
                            </div>
                        );
                    }

                    if (item._type === 'checkbox') {
                        return (
                            <div key={item.name} style={{ marginBottom: 16 }}>
                                <Input.Checkbox
                                    label={item.label}
                                    onChange={(v: any) => changeFieldValue(item.name, v)}
                                    checked={values[item.name]}
                                />
                            </div>
                        );
                    }

                    if (item.type === 'password' || item._type === 'password') {
                        return (
                            <div key={item.name} style={{ marginBottom: 16 }}>
                                <Input.Password
                                    onChange={(v: any) => changeFieldValue(item.name, v)}
                                    value={values[item.name]}
                                />
                            </div>
                        );
                    }

                    const text = item.maxLength ? `${item.label} (${item.maxLength - (values[item.name]?.length ?? 0)} remaining)` : item.label;

                    if (item._type === 'textarea') {
                        return (
                            <div key={item.name} style={{ marginBottom: 16 }}>
                                <Input.TextArea
                                    label={text}
                                    icon={item.icon}
                                    onChange={(v: any) => changeFieldValue(item.name, v, item.maxLength)}
                                    value={values[item.name]}
                                />
                            </div>
                        );
                    }

                    if (item._type === 'imagelist') {
                        return (
                            <div key={item.name} style={{ marginBottom: 16 }}>
                                <Input.ImageList
                                    label={text}
                                    icon={item.icon}
                                    minWidth={item.minWidth}
                                    minHeight={item.minHeight}
                                    onChange={(v: any) => changeFieldValue(item.name, v)}
                                    value={values[item.name]}
                                />
                            </div>
                        );
                    }

                    return (
                        <div key={item.name} style={{ marginBottom: 16 }}>
                            <Input.Text
                                label={text}
                                icon={item.icon}
                                onChange={(v: any) => changeFieldValue(item.name, v, item.maxLength)}
                                value={values[item.name]}
                                onPaste={(e: any) => item.preventPaste && e.preventDefault()}
                            />
                        </div>
                    );
                })}
            </div>
            <div className={classes.button}>
                <Button.Primary onClick={() => props.submitValues(values)}>
                    Submit
                </Button.Primary>
            </div>
        </div>
    )
}