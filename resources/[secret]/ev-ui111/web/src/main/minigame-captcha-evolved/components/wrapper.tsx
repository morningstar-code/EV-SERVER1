import React, { FunctionComponent } from "react";
import useStyles from "./index.styles";

const Wrapper: FunctionComponent<any> = (props) => {
    const classes = useStyles(props);

    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                {props.children}
            </div>
        </div>
    );
}

export default Wrapper;