import shellStyles from './index.styles';

export const shells = {
    android: function () {
        const classes = shellStyles();
        return (
            <div className={classes.android}>
                <div className={classes.androidInner}></div>
                <div className={classes.androidOverflow}>
                    <div className={classes.androidOverflowShadow}></div>
                </div>
            </div>
        )
    },
    ios: function () {
        const classes = shellStyles();
        return (
            <div className={classes.iphone}>
                <div className={classes.iphoneTopBar}></div>
                <div className={classes.iphoneSleep}></div>
                <div className={classes.iphoneBottomBar}></div>
                <div className={classes.iphoneVolume}></div>
                <div className={classes.iphoneInnerShadow}>
                    <div className="inner-shadow-bg"></div>
                </div>
            </div>
        )
    }
}