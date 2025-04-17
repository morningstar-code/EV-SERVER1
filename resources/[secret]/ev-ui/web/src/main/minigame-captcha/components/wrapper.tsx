import React, { FunctionComponent } from "react";
import useStyles from "./index.styles";

const Wrapper: FunctionComponent<any> = (props) => {
    const classes = useStyles(props);

    return (
        <div className={classes.wrapper}>
            <div className={classes.container} style={{ minWidth: 320 * props.numberOfShapes }}>
                {props.children}
            </div>
        </div>
    );
}

export default Wrapper;