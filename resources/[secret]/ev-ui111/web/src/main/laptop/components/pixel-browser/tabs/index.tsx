import React, { FunctionComponent } from 'react';
import { updateLaptopState } from '../../../actions';
import { Typography } from '@mui/material';
import useStyles from './index.styles';
import Button from '../../../../../components/button/button';

interface TabsProps {
    handleSelected: (src: string, id: number, url: string) => void;
    selected: number;
    tabs: PixelBrowserTab[];
}

const Tabs: FunctionComponent<TabsProps> = (props) => {
    const classes = useStyles();
    const handleSelected = props.handleSelected;
    const selected = props.selected;
    const tabs = props.tabs;

    const _0x40b517 = React.useCallback(() => {
        for (
            let i = 0;
            i < tabs.length;
            i++
        ) {
            const tab = tabs[i];

            if (tab?.enabled && tab?.enabled() && tab.id !== 'Default_Tab') {
                return handleSelected(tab.url, i, tab.fakeUrl);
            }
        }

        return handleSelected(tabs[0].url, 0, tabs[0].fakeUrl);
    }, [tabs, handleSelected]);

    // React.useEffect(() => {
    //     _0x40b517();
    // }, [_0x40b517]);

    return (
        <div id="tab-bar" className={classes.tabBar}>
            <ul className={classes.tabs}>
                {tabs && tabs.map((tab, index) => (
                    tab?.enabled && tab?.enabled() && (
                        <li key={index} onClick={() => { return handleSelected(tab.url, index, tab.fakeUrl) }} className={`${classes.tabsLi} ${index === selected && classes.active}`}>
                            {tab.icon && (
                                <img className={classes.tabIcon} src={tab.icon} alt="icon" />
                            )}
                            <Typography variant="h1" className={classes.tabText}>
                                {tab.title}
                            </Typography>
                        </li>
                    )
                ))}
                <li className={`${classes.tabsLi} ${classes.tabLiSmall}`}>
                    <Typography variant="h1" className={classes.tabText}>
                        +
                    </Typography>
                </li>
            </ul>
            <Button.Primary onClick={() => updateLaptopState({ showPixelApp: false })} className={classes.appControlCloseBtn}>
                <div></div>
            </Button.Primary>
        </div>
    );
}

export default Tabs;