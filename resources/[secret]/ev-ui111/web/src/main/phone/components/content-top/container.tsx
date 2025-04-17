import React, { FunctionComponent } from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { availableWifiSpots } from "main/phone/spots.config";
import useStyles from "./container.styles";
import { hasVpn } from "lib/character";
import { openPhoneModal } from "main/phone/actions";
import WifiModal from "./wifi-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//TODO; Gotta make this into a class component, and insert connectToWifi dispatch (look at ev-ui for ref)
const ContentTop: FunctionComponent = () => {
    const classes = useStyles();
    const state = useSelector((state: any) => state);
    const foundSpot = availableWifiSpots.find(wifi => wifi.location === state.game.location);
    const isAtLocation = !!foundSpot && (!foundSpot.check || foundSpot.check());
    const isConnected = state.phone.wifiConnected.filter(wifi => wifi.location === state.game.location && wifi.active === true).length > 0;

    return (
        <div className={classes.wrapper}>
            <div className={`${classes.leftRight} ${classes.left}`}>
                <Typography variant="body2" className={classes.text}>{state.game.time}</Typography>
                <div className={classes.serverId}>
                    <Typography variant="body2" className={classes.text} style={{ textAlign: 'right' }}>#{state.character.server_id}</Typography>
                </div>
            </div>
            <div className={classes.notchSpacer}></div>
            <div className={`${classes.leftRight} ${classes.right}`}>
                <FontAwesomeIcon icon={state.game.weatherIcon} size="sm" />
                {hasVpn() ? (
                    <i className="fas fa-lock fa-fw fa-sm" style={{ color: '#fff' }}></i>
                ) : (
                    <i className="fas fa-unlock fa-fw fa-sm" style={{ color: '#607D8B' }}></i>
                )}
                {!isAtLocation && (
                    <FontAwesomeIcon
                        icon={"fa-sharp fa-solid fa-signal" as any}
                        size="sm"
                        fixedWidth
                    />
                )}
                {isAtLocation && (
                    <div onClick={() => {
                        openPhoneModal(
                            <WifiModal location={state.game.location} />
                        )
                    }}>
                        <i className="fas fa-wifi fa-fw fa-sm" style={isConnected ? {} : { color: '#607D8B' }}></i>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ContentTop;