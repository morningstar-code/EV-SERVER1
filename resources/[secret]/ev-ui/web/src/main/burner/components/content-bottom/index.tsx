import React, { FunctionComponent } from "react";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import useStyles from "./index.styles";
import { updateBurnerState } from "main/burner/actions";
import { Tooltip } from "@mui/material";
import { nuiAction } from "lib/nui-comms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            burner: state.burner
        }
    }
})

const ContentBottom: FunctionComponent<any> = (props: any): any => {
    const classes = useStyles();
    const [hovering, setHovering] = React.useState(false);
    let timeout: any = null;

    const doPulse = (bool: boolean) => {
        if (bool) {
            timeout = setTimeout(() => {
                setHovering(true);
            }, 1000);
        } else {
            setHovering(false);
            clearTimeout(timeout);
        }
    }

    React.useEffect(() => {
        return () => {
            clearTimeout(timeout);
        }
    }, [timeout]);

    const handleClick = () => {
        clearTimeout(timeout);
        setHovering(false);
        updateBurnerState({ activeApp: 'home-screen' });
    }

    const handleSwitchOrientation = () => {
        const app = props.config.find((app: any) => {
            return app.name === props.burner.activeApp
        });

        const orientation = props.burner.orientation === 'portrait' ? 'landscape' : 'portrait';

        if (app.forceOrientation === undefined || app.forceOrientation === orientation) {
            updateBurnerState({ orientation: orientation });
        }
    }

    return (
        <div className={classes.wrapper}>
            <Tooltip title="Toggle Sounds" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                <div onClick={() => {
                    props.updateState({ notifications: !props.notifications });
                    nuiAction('ev-ui:toggleBurnerNotificationSounds', {
                        status: props.notifications ? 'off' : 'on'
                    });
                }}>
                    <i className={`fas fa-${props.notifications ? 'bell' : 'bell-slash'} fa-fw fa-sm`} style={{ color: '#fff' }}></i>
                </div>
            </Tooltip>
            <Tooltip title="Selfie!" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                <div onClick={() => { }}>
                    <FontAwesomeIcon icon="camera" size="sm" fixedWidth />
                </div>
            </Tooltip>
            <Tooltip title="Home" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                <div onClick={handleClick} onMouseEnter={() => doPulse(true)} onMouseLeave={() => doPulse(false)}>
                    {!hovering && (
                        <FontAwesomeIcon icon={['far', 'circle']} size="lg" fixedWidth />
                    )}
                    {hovering && (
                        <FontAwesomeIcon className={classes.pulse} icon="heart" size="lg" color="#1E88E5" fixedWidth />
                    )}
                </div>
            </Tooltip>
            <Tooltip title="Switch Orientation" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                <div onClick={handleSwitchOrientation}>
                    <FontAwesomeIcon icon="sync-alt" size="sm" fixedWidth />
                </div>
            </Tooltip>
            <Tooltip title="Los Santos Explorer (Coming Soon)" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                <div onClick={() => {
                    handleSwitchOrientation();
                    updateBurnerState({ activeApp: 'browser' });
                }}>
                    <FontAwesomeIcon icon={['fab', 'internet-explorer']} size="sm" fixedWidth />
                </div>
            </Tooltip>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentBottom) as any;