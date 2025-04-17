import React from 'react';
import store from 'main/laptop/store';
import Draggable from 'react-draggable';
import useStyles from './index.styles';
import { nuiAction } from 'lib/nui-comms';
import { updateLaptopState } from 'main/laptop/actions';
import AppHeader from '../app-header';
import Button from 'components/button/button';
import BennysAppPartItem from './bennys-app-part-item';
import { storeObj } from 'lib/redux';
import BennysCart from './bennys-cart';

export default () => {
    const state: LaptopState = storeObj.getState()[store.key];
    const [search, setSearch] = React.useState('');
    const [selectedTab, setSelectedTab] = React.useState('cosmetic');

    const enabledFeatures = state.enabledFeatures;
    const bennysAppItems = state.bennysAppItems;
    const bennysAppCart = state.bennysAppCart;

    const addCartItem = (item: BennysAppItem) => {
        const mappedCart = bennysAppCart.map((cartItem) => {
            return {
                ...cartItem,
            }
        });

        const data = {
            qty: 1,
            icon: item.icon,
            code: `${item.type}_${item.part}`,
            name: item.name,
            price: item.importPrice,
            details: {
                type: item.type,
                part: item.part
            },
            stock: item.stock
        }

        const cartIdx = mappedCart.findIndex((cartItem) => cartItem.code === data.code);

        if (cartIdx !== -1) {
            mappedCart[cartIdx].qty += 1;
        } else {
            mappedCart.push(data);
        }

        updateLaptopState({ bennysAppCart: mappedCart });
    }

    const isTabActive = (tab: string) => {
        return selectedTab === tab ? 'bennysActiveBtn' : 'bennysTabBtn';
    }

    const getBennysCatalog = async () => {
        const results = await nuiAction<any>('ev-ui:laptop:getBennysCatalog', {}, {
            returnData: [
                {
                    qty: 1,
                    icon: '',
                    code: 'bozo_bozo',
                    name: 'Bozo',
                    importPrice: 100,
                    returnValue: 150,
                    details: {
                        type: 'bozo',
                        part: 'bozo'
                    },
                    stock: 3,
                    category: 'cosmetic',
                    type: 'bozo',
                    part: 'bozo'
                }
            ]
        });

        if (results) {
            updateLaptopState({ bennysAppItems: results.data });
        }
    }

    React.useEffect(() => {
        getBennysCatalog();
    }, []);

    const classes = useStyles();

    return (
        <Draggable handle="#app-header">
            <div className={classes.bennysApp}>
                <AppHeader appName="Bennys Online Shop" color="#212121" onClose={() => updateLaptopState({ showBennysApp: false })} style={{ color: '#737373' }} />
                <div className={classes.bennysAppContainer}>
                    <div className={classes.bennysAppHeading}>
                        <div className={classes.bennysAppTabSection}>
                            <Button.Primary
                                className={classes[isTabActive('cosmetic')]}
                                onClick={() => setSelectedTab('cosmetic')}
                            >
                                Cosmetic Parts
                            </Button.Primary>
                            <Button.Primary
                                className={classes[isTabActive('performance')]}
                                onClick={() => setSelectedTab('performance')}
                            >
                                Performance Parts
                            </Button.Primary>
                            {enabledFeatures.includes('bennysApp:showConsumables') && (
                                <Button.Primary
                                    className={classes[isTabActive('consumables')]}
                                    onClick={() => setSelectedTab('consumables')}
                                >
                                    Consumables Parts
                                </Button.Primary>
                            )}
                            <input
                                type="text"
                                placeholder="Search"
                                className={classes.bennysAppSearch}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button.Primary
                            id="cart"
                            className={classes.bennysActiveBtn}
                            onClick={() => setSelectedTab('cart')}
                        >
                            <i className={`fas fa-shopping-cart fa-fw fa-2x ${classes.icon}`} style={{ color: 'white' }}></i>
                            Cart
                            <div className={classes.bennysCartQty}>
                                {bennysAppCart && bennysAppCart.reduce((a, b) => a + b.qty, 0)}
                            </div>
                        </Button.Primary>
                    </div>
                    {selectedTab !== 'cart' && (
                        <>
                            {bennysAppItems && bennysAppItems.filter((item: BennysAppItem) => item.name.toLowerCase().includes(search)).map((item: BennysAppItem) => (
                                item.category === selectedTab && (
                                    <BennysAppPartItem
                                        partInfo={item}
                                        addCartItem={addCartItem}
                                        cart={bennysAppCart}
                                    />
                                )
                            ))}
                        </>
                    )}
                    {selectedTab === 'cart' && (
                        <BennysCart cart={bennysAppCart} />
                    )}
                </div>
            </div>
        </Draggable>
    )
}