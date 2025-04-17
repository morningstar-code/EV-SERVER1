import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles(props);

    return (
        <div className={classes.container}>
            <img
                className={classes.scope}
                src="https://gta-assets.subliminalrp.net/images/sniper-scope1.png"
                alt="scope"
            />
        </div>
    )
}