import React, { FunctionComponent } from "react";
import { Tooltip } from "@mui/material";
import { GetPhoneAppConfig, PhoneConfigObject } from "lib/config/phone/appConfig";
import { storeObj } from "lib/redux";
import { updatePhoneState } from "../../actions";
import AppContainer from "main/phone/components/app-container";
import useStyles from "./container.styles";
import { isDevel } from "lib/env";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const config = GetPhoneAppConfig();

const openApp = (config: PhoneConfigObject) => {
    const name = config.name;
    const appsWithNotifications = storeObj.getState().phone.appsWithNotifications;
    const orientation = storeObj.getState().phone.orientation;
    const newOrientation = config.forceOrientation ? config.forceOrientation : orientation;
    const isForced = !!config.forceOrientation;

    appsWithNotifications.includes(name) && appsWithNotifications.splice(appsWithNotifications.indexOf(name), 1);

    updatePhoneState({
        appsWithNotifications: appsWithNotifications
    });

    updatePhoneState({
        activeApp: name
    });

    updatePhoneState({
        orientation: newOrientation
    });

    updatePhoneState({
        orientationForced: isForced
    });
}

const HomeScreen: FunctionComponent = () => {
    const classes = useStyles();

    return (
        <AppContainer
            background="rgba(0, 0, 0, 0)"
            removePadding={true}
        >
            <div className={classes.wrapper}>
                {config && config.filter(c => typeof c.hidden === 'function' ? !c?.hidden() : !c.hidden).map((c) => {
                    const hasNotification = storeObj.getState().phone.appsWithNotifications.includes(c.name);
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
                        <Tooltip key={c.name} title={`${label} ${isDevel() ? `[name: ${c.name}]` : ''}`} placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                            <div className={classes.icon} style={icon} onClick={() => openApp(c)}>
                                {hasNotification && (
                                    <div className={classes.notification}></div>
                                )}
                                {!!c.icon && (
                                    <i className={`${Array.isArray(c.icon.name) ? c.icon.name[0] : 'fas'} fa-${Array.isArray(c.icon.name) ? c.icon.name[1] : c.icon.name} fa-fw fa-w-16`} style={{ WebkitTextStrokeColor: '#222831', WebkitTextStrokeWidth: '0.6px' }}></i>
                                    // <FontAwesomeIcon
                                    //     icon={c.icon.name}
                                    //     size="2x"
                                    //     style={{ WebkitTextStrokeColor: '#222831', WebkitTextStrokeWidth: '0.6px' }}
                                    //     strokeWidth={0.6}
                                    //     stroke="#222831"
                                    // />
                                )}
                            </div>
                        </Tooltip>
                    )
                })}
            </div>
        </AppContainer>
    )
}

export default HomeScreen;