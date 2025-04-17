import React from "react";
import useStyles from "./index.styles";
import { isDevel } from "lib/env";
import Android from "./shells/android";
import { ResponsiveHeight } from "utils/responsive";
import ContentBottom from "./components/content-bottom";
import ContentTop from "./components/content-top";
import Modal from "./components/modal/container";

export const calculatePos = (data: any, bool?: boolean) => {
    return data.status === 'show' ? data.dev || data.landscape ? 0 : ResponsiveHeight(data.shell === 'ios' ? 18 : 12, bool) : data.hasNotification ? ResponsiveHeight(-540, bool) : ResponsiveHeight(-1000, bool);
}

export default (props: any) => {
    const [orientation, setOrientation] = React.useState(props.orientation);
    const [isChanging, setIsChanging] = React.useState(false);
    const classes = useStyles({
        isChanging: isChanging,
        dev: isDevel(),
        hasNotification: props.hasNotification,
        landscape: orientation === 'landscape',
        shell: 'android',
        status: props.status,
        wallpaper: 'https://i.imgur.com/JVPavDg.jpg'
    });

    React.useEffect(() => {
        if (props.orientation !== orientation) {
            setIsChanging(true);
            setOrientation(props.orientation);
            setTimeout(() => {
                return setIsChanging(false);
            }, 500);
        }
    }, [orientation, props.orientation]);

    const app = props.config.find(function (app: any) {
        return app.name === props.activeApp
    });

    return (
        <>
            <div className={classes.innerWrap}>
                {/* Notificatons */}
                <ContentTop />
                <ContentBottom config={props.config} />
                <Modal />
                {app.render && <app.render />}
            </div>
            <div className={classes.rotateWrapper}>
                <Android />
            </div>
        </>
    )
}