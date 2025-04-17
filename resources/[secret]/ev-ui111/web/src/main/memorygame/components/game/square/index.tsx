import React from "react";
import useStyles from "../index.styles";

export default (props: any) => {
    const classes = useStyles(props);
    const [shouldClick, setShouldClick] = React.useState<boolean>(false);
    const [click, setClick] = React.useState<boolean>(false);
    const [mouseDown, setMouseDown] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (props.isClickable) {
            setTimeout(() => {
                setShouldClick(true);
            }, 32);
        }

        setTimeout(() => {
            setClick(true);
            setShouldClick(false);
        }, 4032);
    }, [props.isClickable]);

    return (
        <div
            className={`${classes.clickSquare} ${shouldClick ? classes.clickSquareWasClicked : ''} ${mouseDown && props.isClickable ? classes.clickSquareWasClicked : ''} ${mouseDown && !props.isClickable ? classes.clickSquareWasClickedFail : ''}`}
            onMouseDown={() => {
                if (click && !mouseDown) {
                    setMouseDown(true);
                    props.clickSquare(props.isClickable);
                }
            }}
        />
    )
}