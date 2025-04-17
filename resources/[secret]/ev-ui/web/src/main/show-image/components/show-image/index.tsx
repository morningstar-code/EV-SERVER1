import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.showImage && (
                <div className={classes.imageWrapper}>
                    <img
                        className={classes.image}
                        src={props.url}
                        alt="polaroid"
                    />
                </div>
            )}
        </div>
    )
}