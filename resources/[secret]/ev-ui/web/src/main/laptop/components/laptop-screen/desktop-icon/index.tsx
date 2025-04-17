import { FunctionComponent } from 'react';
import useStyles from '../index.styles';
import { Typography } from '@mui/material';

interface DesktopIconProps {
    itemInfo: Icon;
    whiteIconNames: () => string;
}

const DesktopIcon: FunctionComponent<DesktopIconProps> = (props) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.desktopIconBox} onClick={props.itemInfo.open}>
                {typeof props.itemInfo.icon === 'string' ? (
                    <img src={props.itemInfo.icon} alt="file-icon" style={{ height: 40 }} className={classes.icon} />
                ) : (
                    props.itemInfo.icon()
                )}
                <Typography className={classes.iconTitle} variant="h1" style={{ color: props.whiteIconNames() === 'on' ? '#fff' : '#000', fontSize: 12, fontWeight: 'normal' }}>
                    {props.itemInfo.title}
                </Typography>
            </div>
        </>
    );
}

export default DesktopIcon;