import Button from 'components/button/button';
import { nuiAction } from 'lib/nui-comms';
import React from 'react';
import useStyles from "./index.styles";

export default (props: any) => {
    const classes = useStyles();
    const [content, setContent] = React.useState(props.content);

    const createNotepadNote = () => {
        nuiAction('ev-ui:createNotepadNote', {
            content: content
        });
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                {props.canSave && (
                    <div className={classes.header}>
                        <Button.Primary onClick={() => createNotepadNote}>
                            Save
                        </Button.Primary>
                    </div>
                )}
                <div>
                    {props.canSave && (
                        <textarea
                            id="notepad-content"
                            className={classes.textarea}
                            spellCheck={false}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    )}
                    {!props.canSave && (
                        <textarea
                            id="notepad-content"
                            readOnly={true}
                            value={props.content}
                            className={classes.textarea}
                            spellCheck={false}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}