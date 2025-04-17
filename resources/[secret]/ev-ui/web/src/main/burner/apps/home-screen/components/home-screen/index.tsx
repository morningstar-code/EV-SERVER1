import AppContainer from "main/phone/components/app-container";
import useStyles from "./index.styles"
import { BurnerConfigObject, GetBurnerAppConfig } from "lib/config/burner/appConfig"
import { Tooltip } from "@mui/material";
import { storeObj } from "lib/redux";
import { updateBurnerState } from "main/burner/actions";

const config = GetBurnerAppConfig();

const openApp = (config: BurnerConfigObject) => {
    const name = config.name;
    const appsWithNotifications = storeObj.getState().phone.appsWithNotifications;
    const orientation = storeObj.getState().phone.orientation;
    const newOrientation = config.forceOrientation ? config.forceOrientation : orientation;
    const isForced = !!config.forceOrientation;

    appsWithNotifications.includes(name) && appsWithNotifications.splice(appsWithNotifications.indexOf(name), 1);

    updateBurnerState({
        appsWithNotifications: appsWithNotifications,
        activeApp: name,
        orientation: newOrientation,
        orientationForced: isForced
    });
}

export default (props: any) => {
    const classes = useStyles();

    return (
        <AppContainer
            background="rgba(0, 0, 0, 0)"
            removePadding={true}
        >
            <div className={classes.wrapper}>
                {config && config.filter(c => typeof c.hidden === 'function' ? !c?.hidden() : !c.hidden).map((c, i) => {
                    const hasNotification = props.burner.appsWithNotifications.includes(c.name);
                    const label = typeof c.label === 'function' ? c.label() : c.label;
                    const icon = c.icon ? {
                        backgroundColor: typeof c.icon.background === 'function' ? c.icon.background() : c.icon.background,
                        color: c.icon.color
                    } : {
                        background: `url(${typeof c.iconPng === 'function' ? c.iconPng() : c.iconPng})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    };
                    return (
                        <Tooltip key={c.name} title={label} placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                            <div className={classes.icon} style={icon} onClick={() => openApp(c)}>
                                {hasNotification && (
                                    <div className={classes.notification}></div>
                                )}
                                {!!c.icon && (
                                    <i className={`${Array.isArray(c.icon.name) ? c.icon.name[0] : 'fas'} fa-${Array.isArray(c.icon.name) ? c.icon.name[1] : c.icon.name} fa-fw fa-w-16`} style={{ WebkitTextStrokeColor: '#222831', WebkitTextStrokeWidth: '0.6px' }}></i>
                                )}
                            </div>
                        </Tooltip>
                    )
                })}
            </div>
        </AppContainer>
    )
}