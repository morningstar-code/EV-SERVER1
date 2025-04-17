import { Tooltip } from "@mui/material";
import { nuiAction } from "lib/nui-comms";
import React, { FunctionComponent } from "react";
import useStyles from "./container.styles";
import { getContentBottomState, updatePhoneContentBottomState } from "./actions";

const ContentBottom: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const [hovering, setHovering] = React.useState(false);
    //let timeout: any = null;
    const timeout = React.useRef(null);

    const doPulse = (bool: boolean) => {
        if (bool) {
            timeout.current = setTimeout(() => {
                setHovering(true);
            }, 1000);
        } else {
            clearTimeout(timeout.current);
            setHovering(false);
        }
    }

    React.useEffect(() => {
        return () => {
            clearTimeout(timeout.current);
        }
    }, [timeout.current]);

    const handleClick = () => {
        //clearTimeout(timeout);
        //setHovering(false);
        props.updateState({ activeApp: 'home-screen' });
    }

    const handleSwitchOrientation = () => {
        // const orientationForced = state.orientationForced;
        // if (orientationForced) {
        //     return false;
        // }

        const app = props.config.find(function (app) {
            return app.name === props.activeApp
        });

        const orientation = props.orientation === 'portrait' ? 'landscape' : 'portrait';

        if (app.forceOrientation === undefined || app.forceOrientation === orientation) {
            props.updateState({ orientation: orientation });
        }
    }

    return (
        <div className={classes.wrapper}>
            <Tooltip title="Toggle Sounds" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                <div onClick={() => {
                    updatePhoneContentBottomState({ notifications: !getContentBottomState().notifications })
                    nuiAction('ev-ui:togglePhoneNotificationSounds', {
                        status: getContentBottomState().notifications ? 'off' : 'on'
                    });
                }}>
                    <i className={`fas fa-${getContentBottomState().notifications ? 'bell' : 'bell-slash'} fa-fw fa-sm`} style={{ color: '#fff' }}></i>
                </div>
            </Tooltip>
            <Tooltip title="Selfie!" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                <div onClick={() => nuiAction('ev-ui:activateSelfieMode')}>
                    <i className="fas fa-camera fa-fw fa-sm" style={{ color: '#fff' }}></i>
                </div>
            </Tooltip>
            <Tooltip title="Home" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                <div onClick={handleClick} onMouseEnter={() => doPulse(true)} onMouseLeave={() => doPulse(false)}>
                    {!hovering && (
                        <i className="far fa-circle fa-fw fa-lg" style={{ color: '#fff' }}></i>
                    )}
                    {hovering && (
                        <i className={`fas fa-heart fa-fw fa-lg ${classes.pulse}`} style={{ color: '#1E88E5' }}></i>
                    )}
                </div>
            </Tooltip>
            <Tooltip title="Switch Orientation" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                <div onClick={handleSwitchOrientation}>
                    <i className="fas fa-sync-alt fa-fw fa-sm" style={{ color: '#fff' }}></i>
                </div>
            </Tooltip>
            <Tooltip title="Los Santos Explorer (Coming Soon)" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                <div onClick={() => {
                    //handleSwitchOrientation();
                    //props.updateState({ activeApp: 'browser' });
                }}>
                    <i className="fab fa-internet-explorer fa-fw fa-sm" style={{ color: '#fff' }}></i>
                </div>
            </Tooltip>
        </div>
    )
}

export default ContentBottom;