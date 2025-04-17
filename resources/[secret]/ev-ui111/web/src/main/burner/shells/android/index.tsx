import useStyles from "./index.styles";

export default (props: any) => {
    const classes = useStyles();

    return (
        <div className={classes.android}>
        <div className={classes.androidInner}></div>
        <div className={classes.androidOverflow}>
            <div className={classes.androidOverflowShadow}></div>
        </div>
    </div>
    )
}