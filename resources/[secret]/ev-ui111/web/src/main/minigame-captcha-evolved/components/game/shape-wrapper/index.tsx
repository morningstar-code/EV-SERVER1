import React from "react";
import useStyles from "../../index.styles";

export default (props) => {
    const classes = useStyles(props);
    const [_0x441b89, _0x3ec791] = React.useState(false);
    const [_0x5707c6, _0xa13db6] = React.useState(true);
    const [_0x31507d, _0x2c4539] = React.useState(false);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            _0x3ec791(true);
        }, 5000);
        const timeout2 = setTimeout(() => {
            _0xa13db6(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
            clearTimeout(timeout2);
        }
    }, []);

    return (
        <div className={classes.shapeContainer} style={!_0x441b89 || _0x31507d ? {} : { backgroundColor: props.backgroundColor.color }}>

        </div>
    )
}