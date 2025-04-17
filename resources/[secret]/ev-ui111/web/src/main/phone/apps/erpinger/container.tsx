import { Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import Input from "components/input/input";
import { hasVpn } from "lib/character";
import AppContainer from "main/phone/components/app-container";
import useStyles from "./container.styles";
import { nuiAction } from "lib/nui-comms";

const Container: FunctionComponent<any> = (props) => {
    const classes = useStyles();

    const [paypalId, setPaypalId] = React.useState('');

    const pingSend = async (anon: boolean) => {
        if (paypalId) {

            await nuiAction('ev-ui:pingSend', {
                anonymous: anon,
                number: Number(paypalId)
            });

            setPaypalId('');
        }
    }

    return (
        <AppContainer
            removePadding
            style={{ backgroundImage: 'url(https://gta-assets.subliminalrp.net/images/pingder.png)', backgroundSize: 'cover' }}
        >
            <div className={classes.wrapper}>
                <div className={classes.title}>
                    <span role="img">
                            {'\uD83C\uDF46'}
                    </span>
                    eRPinger
                    <span role="img">
                        {'\uD83C\uDF51'}
                    </span>
                </div>
                <div className={classes.input}>
                    <Input.PaypalID
                        value={paypalId}
                        onChange={setPaypalId}
                    />
                </div>
                <div className={classes.buttons}>
                    <div className={classes.send} onClick={() => pingSend(false)}>
                        <i className="fas fa-map-pin fa-fw fa-2x" style={{ color: '#fff' }}></i>
                        <Typography variant="h6" style={{ color: '#fff' }}>
                            Send Ping
                        </Typography>
                    </div>
                    {hasVpn() && (
                        <div className={classes.send} onClick={() => pingSend(true)}>
                            <i className="fas fa-user-secret fa-fw fa-2x" style={{ color: '#fff' }}></i>
                            <Typography variant="h6" style={{ color: '#fff' }}>
                                Anon Ping
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        </AppContainer>
    )
}

export default Container;