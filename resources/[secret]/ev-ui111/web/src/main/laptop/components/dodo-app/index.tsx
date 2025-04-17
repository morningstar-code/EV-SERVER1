import React from 'react';
import Draggable from 'react-draggable';
import useStyles from './index.styles';
import { updateLaptopState } from 'main/laptop/actions';
import AppHeader from '../app-header';
import DodoSidebar from './dodo-sidebar';
import Dashboard from './pages/dashboard';
import Workers from './pages/workers';
import Inbox from './pages/inbox';
import Tracking from './pages/tracking';
import Logs from './pages/logs';

export default () => {
    const [selectedPage, setSelectedPage] = React.useState('inbox-page');

    const classes = useStyles();

    return (
        <Draggable handle="#app-header">
            <div className={classes.container}>
                <AppHeader appName="" color="#24314d" onClose={() => updateLaptopState({ showDodoApp: false })} style={{ color: '#dee1e6', padding: '0 1rem', height: '2rem' }} />
                <div className={classes.wrapper}>
                    <DodoSidebar selectedPage={selectedPage} onSelect={setSelectedPage} />
                    {selectedPage === 'dashboard-page' && (
                        <Dashboard />
                    )}
                    {selectedPage === 'workers-page' && (
                        <Workers />
                    )}
                    {selectedPage === 'inbox-page' && (
                        <Inbox />
                    )}
                    {selectedPage === 'tracking-page' && (
                        <Tracking />
                    )}
                    {selectedPage === 'logs-page' && (
                        <Logs />
                    )}
                </div>
            </div>
        </Draggable>
    )
}