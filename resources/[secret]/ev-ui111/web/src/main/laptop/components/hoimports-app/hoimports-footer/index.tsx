import React from "react";
import useStyles from "./index.styles";

const HOImportsFooter: React.FunctionComponent<any> = (props) => {
    const classes = useStyles();

    return (
        <section className={classes.footer}>
            {props.children}
        </section>
    );
}

export default HOImportsFooter;