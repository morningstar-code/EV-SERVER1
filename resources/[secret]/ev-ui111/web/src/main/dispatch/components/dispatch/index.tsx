import React from 'react';
import MapWrapper from './components/map/index';
import Calls from './components/calls';
import Pings from './components/pings';
import Leos from './components/leos';
import { getDispatchState } from 'main/dispatch/actions';
import useStyles from "./index.styles";

const Dispatch: React.FC<any> = (props) => {
    const classes = useStyles(props);

    return (
        <div className={classes.wrapper}>
            <div className={classes.mapContainer}>
                {props.showWithMap && (
                    <MapWrapper {...getDispatchState()} />
                )}
            </div>
            <div className={classes.callsContainer}>
                <div className={classes.calls}>
                    <Calls updateNumber={props.updateNumber} />
                </div>
                <div className={classes.pingsLeos}>
                    <div className={classes.pings}>
                        <Pings updateNumber={props.updateNumber} />
                    </div>
                    <div className={classes.leos}>
                        <Leos updateNumber={props.updateNumber} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dispatch;