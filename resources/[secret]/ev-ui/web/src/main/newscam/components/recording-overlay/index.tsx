import useStyles from "./index.styles";

export default (props: any) => {
    const classes = useStyles(props);

    return (
        <div className={classes.container}>
            <div className={classes.recordingOverlay}></div>
        </div>
    )
}