import React, { FunctionComponent } from 'react';
import useStyles from './index.styles';
import Draggable from 'react-draggable';
import AppHeader from '../app-header';
import { updateLaptopState } from '../../actions';
import { isEnvBrowser } from 'utils/misc';
import { useSelector } from 'react-redux';
import store from '../../store';
import { Typography } from '@mui/material';
import Tabs from './tabs';
import BlankPage from './pages/BlankPage';
import BozoWebPage from './pages/BozoWeb';
import SilverHand from './pages/SilverHand';

interface PixelBrowserProps {

}

const PixelBrowser: FunctionComponent<PixelBrowserProps> = (props) => {
    const classes = useStyles();
    const enabledFeatures = useSelector((state: any) => state[store.key].enabledFeatures);
    const [ref, setRef] = React.useState(null);
    const [selected, setSelected] = React.useState(0);
    const [src, setSrc] = React.useState('');
    const [url, setUrl] = React.useState('');

    const handleSelected = React.useCallback((src: string, id: number, url: string) => {
        setSrc(src);
        setSelected(id);
        setUrl(url);
    }, []);

    const padZero = (value: number) => {
        return value.toString(16).padStart(2, '0')
    }

    const generateUrl = () => {
        const uint = new Uint8Array(20)
        return (
            window.crypto.getRandomValues(uint),
            `https://${Array.from(uint, padZero).join('')}.onion`
        )
    }

    const tabs: PixelBrowserTab[] = [
        {
            url: '',
            id: 'Default_Tab',
            enabled: () => true,
            fakeUrl: 'www.gurgle.com',
            title: 'Default Tab - Coming Soon',
            icon: 'https://i.imgur.com/94Jcaqg.png',
            component: <Typography variant="h1" className={classes.pixelSoonText}> Coming Soon</Typography>,
        },
        {
            url: 'https://6str.talwyd.com/',
            id: 'Tunershop_Dashboard',
            fakeUrl: generateUrl(),
            enabled: () => enabledFeatures.includes('tunershop:showBrowserTab'),
            title: 'Tuner Shop - Dashboard',
            icon: null,
        },
        {
            url: '',
            id: 'Bozo_Web',
            fakeUrl: generateUrl(),
            enabled: () => enabledFeatures.includes('bozoweb:showBrowserTab'),
            title: 'Bozo Web',
            icon: null,
            component: <BozoWebPage />,
        },
        {
            url: '',
            id: 'New_Tab',
            fakeUrl: '',
            enabled: () => true,
            title: 'Blank Tab',
            icon: null,
            component: <BlankPage />,
        },
        {
            url: '',
            id: 'Silver_Hand',
            fakeUrl: 'http://10.0.0.0',
            webAddress: '10.0.0.0',
            enabled: () => false,
            title: '10.0.0.0',
            icon: null,
            component: <SilverHand />,
        }
    ];

    return (
        <Draggable handle="#tab-bar">
            <div className={classes.pixelBrowser}>
                <Tabs handleSelected={(src: string, id: number, url: string) => handleSelected(src, id, url)} selected={selected} tabs={tabs} />
                <form onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (tabs[selected].id === 'New_Tab') {
                        const trimmedUrl = url.trim().toLocaleLowerCase();
                        const foundTab = tabs.find((tab) => tab?.webAddress === trimmedUrl);
                        if (foundTab) {
                            setSrc(foundTab?.url);
                            setUrl(foundTab?.fakeUrl);
                            setSelected(tabs.indexOf(foundTab));
                        }
                    }
                }}>
                    <div className={classes.pixelControl}>
                        <input className={classes.pixelUrl} placeholder="Enter address url.." value={url} onChange={(e) => setUrl(e.target.value)} />
                    </div>
                </form>
                <div className={classes.pixelPage}>
                    {tabs[selected].id === 'Tunershop_Dashboard' ? (
                        <iframe width="100%" height="100%" src={src} title="kek" ref={ref} />
                    ) : (
                        <>
                            {tabs[selected].component ?? "No Component"}
                        </>
                    )}
                </div>
            </div>
        </Draggable>
    );
}

export default PixelBrowser;