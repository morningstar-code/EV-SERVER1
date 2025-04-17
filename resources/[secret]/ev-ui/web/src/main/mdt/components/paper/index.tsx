import { Typography } from '@mui/material';
import { fromNow } from 'lib/date';
import RichMarkdownEditor from 'rich-markdown-editor';
import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles(props);

    return (
        <div className={classes.wrapper} onClick={props.onClick}>
            <div className={classes.flexWrapper}>
                {!!props.image && (
                    <div className={classes.imageHolder}>
                        <img src={props.image} alt="profile" />
                    </div>
                )}
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div className={classes.title}>
                        <div>
                            <Typography variant="body1" style={{ color: 'white' }}>
                                {props.title}
                            </Typography>
                        </div>
                        {!!props.titleExtra && (
                            <div className={classes.titleExtra}>
                                <Typography variant="body1" style={{ color: 'white' }}>
                                    {props.titleExtra}
                                </Typography>
                            </div>
                        )}
                    </div>
                    {props.description && !props.useMdEditor && (
                        <div className={classes.description}>
                            <Typography variant="body2" style={{ color: 'white' }}>
                                {props.description}
                            </Typography>
                        </div>
                    )}
                    {props.description && props.useMdEditor && (
                        <div className={classes.description}>
                            <RichMarkdownEditor
                                dark={true}
                                readOnly={true}
                                defaultValue={props.description.toString().substring(0, 1000)}
                            />
                        </div>
                    )}
                    <div className={classes.bottomRow}>
                        {props.id && (
                            <div>
                                <Typography variant="body2" style={{ color: 'white' }}>
                                    ID: {props.id}
                                </Typography>
                            </div>
                        )}
                        {props.timestamp && (
                            <div className={classes.timestamp}>
                                <Typography variant="body2" style={{ color: 'white' }}>
                                    {props.timestampExtra || ''} {fromNow(props.timestamp)}
                                </Typography>
                            </div>
                        )}
                        {props.content}
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}