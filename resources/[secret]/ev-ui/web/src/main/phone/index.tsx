import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveHeight } from '../../utils/responsive';
import store from './store';
import useStyles from './index.styles';
import shellStyles from './shells/index.styles';
import ContentTop from './components/content-top/container';
import ContentBottom from './components/content-bottom/container';
import Notifications from './components/notifications';
import Modal from './components/modal/container';
import { isDevel } from 'lib/env';
import { shells } from './shells';

export const calculatePos = (data: any, bool?: boolean) => {
    return data.status === 'show' ? data.dev || data.landscape ? 0 : ResponsiveHeight(data.shell === 'ios' ? 18 : 12, bool) : data.hasNotification ? ResponsiveHeight(-540, bool) : ResponsiveHeight(-1000, bool);
}

const Phone: FunctionComponent<any> = (props) => {
    const state = useSelector((state) => state[store.key]);
    const preferences = useSelector((state: any) => state.preferences);
    const [orientation, setOrientation] = React.useState(props.orientation);
    const [isChanging, setIsChanging] = React.useState(false);
    const classes = useStyles({
        isChanging: isChanging,
        dev: isDevel(),
        hasNotification: props.hasNotification,
        landscape: orientation === 'landscape',
        shell: preferences['phone.shell'],
        status: props.status,
        wallpaper: preferences['hud.phone.wallpaper'] || preferences['phone.wallpaper']
    });
    const shellClasses = shellStyles();

    React.useEffect(() => {
        if (props.orientation !== orientation) {
            setIsChanging(true);
            setOrientation(props.orientation);
            setTimeout(() => {
                return setIsChanging(false);
            }, 500);
        }
    }, [orientation, props.orientation]);

    React.useEffect(() => {
        calculatePos({ hasNotification: true }, true); //+ ResponsiveHeight(652, true)
    }, [props.hasNotification]);

    const app = props.config.find(function (app) {
        return app.name === props.activeApp
    });

    return (
        <>
            <div className={classes.innerWrap}>
                {!isChanging && (
                    <>
                        <Notifications />
                        <ContentTop />
                        <ContentBottom {...props} config={props.config} />
                        <Modal />
                        {app.render && <app.render />}
                    </>
                )}
                {orientation === 'portrait' && preferences['phone.shell'] === 'ios' && (
                    <div className={shellClasses.iphoneNotch}>
                        <div className={shellClasses.iphoneSpacer}></div>
                        <div className={shellClasses.iphoneSpeakerWrapper}>
                            <div className={shellClasses.iphoneSpeaker}></div>
                        </div>
                        <div className={shellClasses.iphoneSpeakerWrapper}>
                            <div className={shellClasses.iphoneCamera}></div>
                        </div>
                    </div>
                )}
            </div>
            <div className={classes.rotateWrapper}>
                {shells[preferences['phone.shell']]()}
            </div>
        </>
    );
}

export default Phone;