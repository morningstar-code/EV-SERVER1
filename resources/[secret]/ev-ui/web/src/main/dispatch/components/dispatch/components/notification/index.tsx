import React, { FunctionComponent } from "react";
import { Slide } from "@mui/material";
import { getDispatchStateKey } from "main/dispatch/actions";
import Ping from "../pings/components/ping";
import useStyles from "../pings/index.styles";

const Notification: FunctionComponent<any> = (props) => {
    const classes = useStyles(props);

    return (
        <>
            {props.updateNumber === -1 ? null : (
                <div className={classes.notificationsWrapper}>
                    {getDispatchStateKey('pings').map((ping: any, index: number) => (
                        <Slide
                            key={index + 5}
                            direction="left"
                            in={!props.processed.includes(ping.ctxId)}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div>
                                <Ping ping={ping} />
                            </div>
                        </Slide>
                    ))}
                </div>
            )}
        </>
    )
}

export default Notification;