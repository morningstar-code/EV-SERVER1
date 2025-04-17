import React from 'react';
import store from 'main/laptop/store';
import Draggable from 'react-draggable';
import useStyles from './index.styles';
import { updateLaptopState } from 'main/laptop/actions';
import AppHeader from '../app-header';
import Button from 'components/button/button';
import { storeObj } from 'lib/redux';
import SticksShop from './SticksShop';
import VehicleShop from './VehicleShop';

export default () => {
    const state: LaptopState = storeObj.getState()[store.key];
    const [selectedTab, setSelectedTab] = React.useState('vehicle_shop');

    const enabledFeatures = state.enabledFeatures;

    const isTabActive = (tab: string) => {
        return selectedTab === tab ? 'hoimportsActiveBtn' : 'hoimportsTabBtn';
    }

    const classes = useStyles();

    return (
        <Draggable handle="#app-header">
            <div className={classes.hoimportsApp}>
                <AppHeader appName="HO Exports" color="#31394D" onClose={() => updateLaptopState({ showHOImportApp: false })} style={{ color: '#F0F0F0' }} />
                <div className={classes.hoimportsContainer}>
                    <div className={classes.hoimportsHeading}>
                        <div className={classes.hoimportsTabSection}>
                            <Button.Primary className={classes[isTabActive('vehicle_shop')]} onClick={() => setSelectedTab('vehicle_shop')}>
                                Vehicle Shop
                            </Button.Primary>
                            {enabledFeatures && enabledFeatures.includes('hoimportsApp:secretShop') && (
                                <Button.Primary className={classes[isTabActive('sticks_shop')]} onClick={() => setSelectedTab('sticks_shop')}>
                                    Sticks Shop
                                </Button.Primary>
                            )}
                        </div>
                    </div>
                    {selectedTab === 'sticks_shop' && (
                        <SticksShop />
                    )}
                    {selectedTab === 'vehicle_shop' && (
                        <VehicleShop />
                    )}
                </div>
            </div>
        </Draggable>
    )
}