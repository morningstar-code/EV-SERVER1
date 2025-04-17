import React, { FunctionComponent, useEffect } from 'react';
import useStyles from './index.styles';
import DesktopIcon from './desktop-icon';
import NotificationPanel from './notification-panel';
import SettingsPanel from './settings-panel';
import Taskbar from './taskbar';
import { useSelector } from 'react-redux';
import store from '../../store';
import { setShowBennysApp, setShowBoostingApp, setShowCasinoApp, setShowDodoApp, setShowGamblingApp, setShowHeistApp, setShowHerbsApp, setShowHOImportApp, setShowMethApp, setShowSeedAnalyzerApp, setShowStreetApp, setShowTowApp, setWhiteIconNames, updateLaptopState } from "../../actions";
import PresetBackgrounds from './preset-backgrounds';
import { storeObj } from 'lib/redux';
import Notification from './notification';
import BoostingApp from '../boosting-app';
import BennysApp from '../bennys-app';
import HoImportsApp from '../hoimports-app';
import MethApp from '../meth-app';
import HerbsApp from '../herbs-app';
import TowApp from '../tow-app';
import StreetRepApp from '../street-rep-app';
import SeedAnalyzerApp from '../seed-analyzer-app';
import DodoApp from '../dodo-app';
import HeistApp from '../heist-app';
import PixelBrowser from '../pixel-browser';
import CasinoApp from '../casino-app';
import GamblingApp from '../gambling-app';

export const AddSystemNotification = (notification: SystemNotification) => {
    const notifications = storeObj.getState()[store.key].systemNotifications;
    const now = Date.now();
    const extraData = { expired: false, createdAt: now };
    const newNotification = { ...notification, ...extraData };
    updateLaptopState({ systemNotifications: [...notifications, newNotification] });
    setTimeout(() => {
        const notifs = storeObj.getState()[store.key].systemNotifications;
        const foundIdx = notifs.findIndex(n => n.createdAt === now);
        if (foundIdx !== -1) {
            const newNotifs = [...notifs];
            newNotifs[foundIdx].expired = true;
            updateLaptopState({ systemNotifications: newNotifs });
        }
    }, 5000);
}

const LaptopScreen: FunctionComponent = () => {
    const state: LaptopState = useSelector((state) => state[store.key]);

    const desktopIcons: Icon[] = [
        {
            icon: "https://i.imgur.com/95p83mB.png",
            title: "Recycle Bin",
            open: () => null,
            show: () => true,
            column: 1,
            opened: () => false,
            component: null
        },
        {
            icon: "https://i.imgur.com/up1NqZj.png",
            title: "Stuff",
            open: () => null,
            show: () => true,
            column: 1,
            opened: () => false,
            component: null
        },
        {
            icon: "https://i.imgur.com/3Gy9KnJ.png",
            title: "Boosting",
            open: () => setShowBoostingApp(true),
            show: () => state.shownApps.includes("boostingApp"),
            column: 1,
            opened: () => state.showBoostingApp,
            component: <BoostingApp />
        },
        {
            icon: "https://i.imgur.com/i32hdrb.png",
            title: "Bennys Parts",
            open: () => setShowBennysApp(true),
            show: () => state.shownApps.includes("bennysApp"),
            column: 1,
            opened: () => state.showBennysApp,
            component: <BennysApp />
        },
        {
            icon: "https://i.imgur.com/ATTcRA8.png",
            title: "HOE",
            open: () => setShowHOImportApp(true),
            show: () => state.shownApps.includes("hoimportsApp"),
            column: 1,
            opened: () => state.showHOImportApp,
            component: <HoImportsApp />
        },
        {
            icon: "https://i.imgur.com/u4Kk3ty.png",
            title: "Blue Plaza",
            open: () => setShowMethApp(true),
            show: () => state.shownApps.includes("methApp"),
            column: 1,
            opened: () => state.showMethApp,
            component: <MethApp />
        },
        {
            icon: "https://i.imgur.com/1SmKh5E.png",
            title: "Örter",
            open: () => setShowHerbsApp(true),
            show: () => state.shownApps.includes("herbsApp"),
            column: 2,
            opened: () => state.showHerbsApp,
            component: <HerbsApp />
        },
        {
            icon: "https://i.imgur.com/9wB5Nch.png",
            title: "Tow Service",
            open: () => setShowTowApp(true),
            show: () => state.shownApps.includes("towApp"),
            column: 2,
            opened: () => state.showTowApp,
            component: <TowApp />
        },
        {
            icon: "https://i.imgur.com/1laDi1a.png",
            title: "Unknown",
            open: () => setShowStreetApp(true),
            show: () => state.shownApps.includes("streetApp"),
            column: 2,
            opened: () => state.showStreetApp,
            component: <StreetRepApp />
        },
        {
            icon: "https://i.imgur.com/g4yX0d9.png",
            title: "ANALyzer",
            open: () => setShowSeedAnalyzerApp(true),
            show: () => state.shownApps.includes("seedAnalyzerApp"),
            column: 2,
            opened: () => state.showSeedAnalyzerApp,
            component: <SeedAnalyzerApp />
        },
        {
            icon: "https://i.imgur.com/5iJpfNS.png",
            title: "Dodo",
            open: () => setShowDodoApp(true),
            show: () => state.shownApps.includes("dodoApp"),
            column: 2,
            opened: () => state.showDodoApp,
            component: <DodoApp />
        },
        {
            icon: "https://i.imgur.com/Drh6VhF.png",
            title: "SecureGuard",
            open: () => setShowHeistApp(true),
            show: () => state.shownApps.includes("heistApp"),
            column: 3,
            opened: () => state.showHeistApp,
            component: <HeistApp gameData={state?.overwriteSettings?.gameData} />
        },
        {
            icon: "https://i.imgur.com/RpiMnBp.png",
            title: "Casino",
            open: () => setShowCasinoApp(true),
            show: () => state.shownApps.includes("casinoApp"),
            column: 2,
            opened: () => state.showCasinoApp,
            component: <CasinoApp />
        },
        {
            icon: "https://i.imgur.com/RpiMnBp.png",
            title: "Bake Casino",
            open: () => setShowGamblingApp(true),
            show: () => state.shownApps.includes("gamblingApp"),
            column: 1,
            opened: () => state.showGamblingApp,
            component: <GamblingApp />
        }
    ];

    if (state?.overwriteSettings?.isHeistPc) {
        const additionalFolders = state?.overwriteSettings?.additionalFolders ?? [];

        for (let i = 0; i < additionalFolders.length; i++) {
            const folder = additionalFolders[i];
            desktopIcons.push({
                icon: "https://i.imgur.com/up1NqZj.png",
                title: folder,
                open: () => null,
                show: () => true,
                column: 2,
                opened: () => false,
                component: null
            });
        }

        const additionalTextFiles = state?.overwriteSettings?.additionalTextFiles ?? [];

        for (let i = 0; i < additionalTextFiles.length; i++) {
            const textFile = additionalTextFiles[i];
            desktopIcons.push({
                icon: "https://i.imgur.com/Yhve86s.png",
                title: textFile + ".txt",
                open: () => null,
                show: () => true,
                column: 2,
                opened: () => false,
                component: null
            });
        }

        const additionalZipFiles = state?.overwriteSettings?.additionalZipFiles ?? [];

        for (let i = 0; i < additionalZipFiles.length; i++) {
            const zipFile = additionalZipFiles[i];
            desktopIcons.push({
                icon: "https://i.imgur.com/A14xleq.png",
                title: zipFile + ".zip",
                open: () => null,
                show: () => true,
                column: 1,
                opened: () => false,
                component: null
            });
        }
    }

    const getUseWhiteIcons = () => {
        return !state.personal && state?.overwriteSettings?.whiteIconNames ? state?.overwriteSettings?.whiteIconNames : state.whiteIconNames;
    }

    const getLaptopBackground = () => {
        return !state.personal && state?.overwriteSettings?.laptopBackground ? state?.overwriteSettings?.laptopBackground : state.laptopBackground;
    }

    const fetchUseWhiteIcons = () => {
        let kekw = localStorage.getItem("useWhiteIconNames") ?? "on";
        setWhiteIconNames(kekw);
    }

    useEffect(() => {
        fetchUseWhiteIcons();
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.screen} id="screen" style={{ opacity: state.showLaptop ? 1 : 0, pointerEvents: state.showLaptop ? "all" : "none" }}>
            <div className={classes.computerScreen} style={{ backgroundImage: `url(${getLaptopBackground()})` }}>
                <div className={classes.desktop}>
                    <div className={classes.notificationsList}>
                        {state.systemNotifications && state.systemNotifications.filter(e => !e.expired).map((e, index) => (
                            <Notification
                                key={index}
                                info={e}
                            />
                        ))}
                    </div>

                    {state.showPixelApp && <PixelBrowser />}

                    {desktopIcons && desktopIcons.map((item, index) => {
                        return item.opened() && item.component;
                    })}

                    <div className="column">
                        {desktopIcons && desktopIcons.filter(icon => icon.column === 1).map((item, index) => (
                            item.show() && <DesktopIcon
                                key={index}
                                itemInfo={item}
                                whiteIconNames={() => getUseWhiteIcons()}
                            />
                        ))}
                    </div>

                    <div className="column">
                        {desktopIcons && desktopIcons.filter(icon => icon.column === 2).map((item, index) => (
                            item.show() && <DesktopIcon
                                key={index}
                                itemInfo={item}
                                whiteIconNames={() => getUseWhiteIcons()}
                            />
                        ))}
                    </div>

                    <div className="column">
                        {desktopIcons && desktopIcons.filter(icon => icon.column === 3).map((item, index) => (
                            item.show() && <DesktopIcon
                                key={index}
                                itemInfo={item}
                                whiteIconNames={() => getUseWhiteIcons()}
                            />
                        ))}
                    </div>
                </div>

                <NotificationPanel show={state.showNotificationPanel} notifications={state.systemNotifications} />
                <SettingsPanel show={state.showSettingsPanel} />
                <PresetBackgrounds show={state.showPresetBackgrounds} />
                <Taskbar desktopIcons={desktopIcons} />
            </div>
        </div>
    );
}

export default LaptopScreen;