import React from "react";
import useStyles from '../../../../../index.styles';
import Button from "components/button/button";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

export default (props: any) => {
    const classes = useStyles();
    const [obj, setObj] = React.useState<any>(props?.obj || {});

    return (
        <div className={classes.editBox}>
            <div>
                <JSONInput
                    id={props.id}
                    placeholder={obj}
                    locale={locale}
                    height="100%"
                    width="100%"
                    onChange={(e: any) => setObj(e.jsObject)}
                    style={{ body: { fontSize: 'unset' } }}
                />
            </div>
            <div className={classes.buttons}>
                {!!props.isCreate && (
                    <Button.Primary onClick={() => props.onCreate(obj)}>
                        Create
                    </Button.Primary>
                )}
                {!props.isCreate && (
                    <Button.Secondary onClick={() => props.onSave(obj)}>
                        Save
                    </Button.Secondary>
                )}
                {props.extraButton && (
                    <Button.Tertiary onClick={() => props.extraButton.onClick(props.obj)}>
                        {props.extraButton.label}
                    </Button.Tertiary>
                )}
            </div>
        </div>
    )
}