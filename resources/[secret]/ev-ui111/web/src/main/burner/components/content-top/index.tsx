import React, { FunctionComponent } from "react";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import useStyles from "./index.styles";
import { openBurnerModal, updateBurnerState } from "main/burner/actions";
import { Tooltip, Typography } from "@mui/material";
import { nuiAction } from "lib/nui-comms";
import WifiModal from "./wifi-modal";
import { availableWifiSpots } from "main/burner/spots.config";
import { hasVpn } from "lib/character";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            character: state.character,
            game: state.game,
            burner: state.burner,
            top: state[store.key]
        }
    }
})

const ContentTop: FunctionComponent<any> = (props: any): any => {
    const classes = useStyles();
    const foundSpot = availableWifiSpots.find(wifi => wifi.location === props.game.location);
    const isAtLocation = !!foundSpot && (!foundSpot.check || foundSpot.check());
    const isConnected = props.burner.wifiConnected.filter(wifi => wifi.location === props.game.location && wifi.active === true).length > 0;

    return (
        <div className={classes.wrapper}>
            <div className={`${classes.leftRight} ${classes.left}`}>
                <Typography variant="body2" className={classes.text}>{props.game.time}</Typography>
                <div className={classes.serverId}>
                    <Typography variant="body2" className={classes.text} style={{ textAlign: 'right' }}>#{props.character.server_id}</Typography>
                </div>
            </div>
            <div className={classes.notchSpacer}></div>
            <div className={`${classes.leftRight} ${classes.right}`}>
                <FontAwesomeIcon icon="sun" size="sm" fixedWidth />
                {hasVpn() ? (
                    <FontAwesomeIcon icon="lock" size="sm" fixedWidth />
                ) : (
                    <FontAwesomeIcon icon="unlock" size="sm" color="#607D8B" fixedWidth />
                )}
                {!isAtLocation && (
                    <FontAwesomeIcon icon="signal" size="sm" fixedWidth />
                )}
                {isAtLocation && (
                    <div onClick={() => {
                        openBurnerModal(
                            <WifiModal location={props.game.location} />
                        )
                    }}>
                        <FontAwesomeIcon icon="wifi" size="sm" color={isConnected && '#607D8B'} fixedWidth />
                    </div>
                )}
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentTop) as any;