import React, { FunctionComponent } from "react";
import useStyles from "../../index.styles";

const Map: FunctionComponent<any> = (props) => {
    const classes = useStyles(props);

    return (
        <div id="dispatch-map-container" className={classes.mapWrapper}>
        </div>
    );
}

export default Map;