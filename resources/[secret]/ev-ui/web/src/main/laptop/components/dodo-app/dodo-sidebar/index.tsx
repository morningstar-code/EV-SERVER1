import React from 'react';
import { storeObj } from 'lib/redux';
import useStyles from './index.styles';
import { CircularProgress, Typography } from '@mui/material';
import { nuiAction } from 'lib/nui-comms';
import { AddSystemNotification } from '../../laptop-screen';

interface DodoSidebarProps {
    selectedPage: string;
    onSelect: (page: string) => void;
}

export default (props: DodoSidebarProps) => {
    const state: LaptopState = storeObj.getState().laptop;
    const [signedIn, setSignedIn] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const enabledFeatures = state.enabledFeatures;

    const pages = [
        {
            id: 'inbox-page',
            icon: 'inbox',
            text: 'Inbox',
            show: true,
        },
        {
            id: 'dashboard-page',
            icon: 'chart-line',
            text: 'Dashboard',
            show: enabledFeatures.includes('dodoApp:showManagement'),
        },
        {
            id: 'workers-page',
            icon: 'user-alt',
            text: 'Workers',
            show: enabledFeatures.includes('dodoApp:showManagement'),
        },
        {
            id: 'tracking-page',
            icon: 'truck-loading',
            text: 'Tracking',
            show: true,
        },
        {
            id: 'logs-page',
            icon: 'clipboard-list',
            text: 'Logs',
            show: enabledFeatures.includes('dodoApp:showManagement'),
        }
    ];

    const isSignedIn = React.useCallback(async () => {
        const results = await nuiAction<ReturnData<boolean>>("ev-dodo:ui:isSignedIn", {}, { returnData: {} });

        if (results.meta.ok) {
            setSignedIn(results.data);
            setLoading(false);
        }
    }, []);

    const updateStatus = async (status: boolean) => {
        if (!loading) {
            setLoading(true);

            const results = await nuiAction<ReturnData<boolean>>("ev-dodo:ui:updateStatus", { signedIn: status });

            if (!results.data) {
                return AddSystemNotification({
                    show: true,
                    icon: 'https://i.imgur.com/5iJpfNS.png',
                    title: 'Dodo Deliveries',
                    message: results.meta.message
                });
            }

            isSignedIn();

            AddSystemNotification({
                show: true,
                icon: 'https://i.imgur.com/5iJpfNS.png',
                title: 'Dodo Deliveries',
                message: results.meta.message
            });
        }

        return;
    }

    React.useEffect(() => {
        isSignedIn();
    }, [isSignedIn]);

    const classes = useStyles();

    return (
        <div className={classes.sidebar}>
            <img src="https://i.imgur.com/OMiaPl0.png" alt="dodo-logo" className={classes.logo} />
            <ul className={classes.menu}>
                {pages.map((page) => (
                    <>
                        {page.show && (
                            <li
                                key={page.id}
                                className={`${props.selectedPage === page.id ? classes.menuItemActive : classes.menuItem}`}
                                onClick={() => props.onSelect(page.id)}
                            >
                                <i className={`fas fa-${page.icon} fa-fw ${classes.icon}`} style={{ color: 'white' }}></i>
                                <Typography variant="h1" className={classes.menuText} style={{ color: 'white' }}>
                                    {page.text}
                                </Typography>
                            </li>
                        )}
                    </>
                ))}
            </ul>
            {signedIn ? (
                <div className={classes.signInBtn} onClick={() => updateStatus(false)}>
                    {loading ? (
                        <CircularProgress size={15} className="fabProgress" style={{ color: '#9CFFFF' }} />
                    ) : (
                        <Typography variant="h1" className={classes.menuText} style={{ color: 'white' }}>
                            Sign Out
                        </Typography>
                    )}
                </div>
            ) : (
                <div className={classes.signInBtn} onClick={() => updateStatus(true)}>
                    {loading ? (
                        <CircularProgress size={15} className="fabProgress" style={{ color: '#9CFFFF' }} />
                    ) : (
                        <Typography variant="h1" className={classes.menuText} style={{ color: 'white' }}>
                            Sign In
                        </Typography>
                    )}
                </div>
            )}
        </div>
    )
}