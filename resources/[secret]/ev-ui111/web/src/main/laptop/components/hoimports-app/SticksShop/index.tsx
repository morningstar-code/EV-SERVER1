import React from 'react';
import { storeObj } from 'lib/redux';
import useStyles from './index.styles';
import Button from 'components/button/button';
import { nuiAction } from 'lib/nui-comms';
import { HNOProducts } from './products.config';
import { AddSystemNotification } from '../../laptop-screen';
import { updateLaptopState } from 'main/laptop/actions';
import HOImportConfirmationModal from '../hoimports-modal-confirm';
import { CircularProgress, Typography } from '@mui/material';
import HOImportsFooter from '../hoimports-footer';
import { Wait } from 'utils/misc';

export default () => {
    const state: LaptopState = storeObj.getState().laptop;
    const [stock, setStock] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [confirmModal, setConfirmModal] = React.useState(false);

    const HOImportAppCart = state.HOImportAppCart;

    const fetchStock = React.useCallback(async () => {
        const results = await nuiAction<ReturnData<HNOStickStock[]>>('ev-hoimports:ui:fetchStock', {}, {
            returnData: [
                {
                    name: 'GNESTICK_10',
                    price: 10,
                    amount: 100
                },
                {
                    name: 'GNESTICK_25',
                    price: 25,
                    amount: 50
                },
                {
                    name: 'GNESTICK_50',
                    price: 50,
                    amount: 25
                },
                {
                    name: 'GNESTICK_100',
                    price: 100,
                    amount: 10
                },
                {
                    name: 'GNESTICK_250',
                    price: 250,
                    amount: 5
                }
            ]
        });

        const mappedProducts = HNOProducts.map((product: HNOStickProduct) => {
            const idx = results.data.findIndex((result) => result.name === product.name);

            return {
                ...product,
                price: idx === -1 ? 0 : results.data[idx].price,
                stock: idx === -1 ? 0 : results.data[idx].amount
            }
        });

        setStock(mappedProducts);
    }, []);

    const checkoutCart = async () => {
        setLoading(true);

        const results = await nuiAction('ev-hoimports:ui:checkoutCart', {
            cart: HOImportAppCart
        }, {
            meta: { ok: false, message: 'Error ordering GNE stick!' }
        });

        await Wait(1000);

        AddSystemNotification({
            show: true,
            icon: 'https://i.imgur.com/Ok9VHSy.png',
            title: 'HO Imports',
            message: results?.meta?.message
        });

        if (results.meta.ok) {
            updateLaptopState({ HOImportAppCart: [] });
            fetchStock();
        }

        setLoading(false);
    }

    const calculatePrice = () => {
        let price = 0;

        for (let i = 0; i < HOImportAppCart.length; i++) {
            price += HOImportAppCart[i].price * HOImportAppCart[i].quantity;
        }

        return price;
    }

    React.useEffect(() => {
        fetchStock();
    }, [fetchStock]);

    const classes = useStyles();

    return (
        <div className={classes.stickShopContainer}>
            <HOImportConfirmationModal
                show={confirmModal}
                close={() => setConfirmModal(false)}
                confirm={() => checkoutCart()}
            >
                Are you sure?
            </HOImportConfirmationModal>
            {stock && stock.map((product: HNOStickProduct) => (
                <div key={product.name} className={classes.shopItem}>
                    {(function (stickProduct) {
                        const cartIdx = HOImportAppCart.findIndex((cartItem) => cartItem.name === stickProduct.name);

                        return (
                            <>
                                {cartIdx !== -1 ? (
                                    <div className={classes.hoimportCartQty}>
                                        {HOImportAppCart[cartIdx].quantity}
                                    </div>
                                ) : null}
                            </>
                        )
                    })(product)}
                    <img
                        src={product.thumbnail}
                        className={classes.thumbnail}
                        alt="thumbnail-small"
                    />
                    <div>
                        <Typography className={classes.itemText} style={{ color: 'white' }}>
                            Name: {product.displayName}
                        </Typography>
                        <Typography className={classes.itemText} style={{ color: 'white' }}>
                            Price: {product.price} GNE
                        </Typography>
                        <Typography className={classes.itemText} style={{ color: 'white' }}>
                            Stock: {product.stock}
                        </Typography>
                    </div>
                    <Button.Primary
                        className={classes.cartBtn}
                        onClick={() => {
                            return (function (stickProduct) {
                                const mappedCart = HOImportAppCart.map((cartItem) => {
                                    return {
                                        ...cartItem
                                    }
                                });

                                const cartIdx = mappedCart.findIndex((cartItem) => cartItem.name === stickProduct.name);

                                if (cartIdx !== -1) {
                                    mappedCart[cartIdx].quantity += 1;
                                } else {
                                    mappedCart.push({
                                        quantity: 1,
                                        ...stickProduct
                                    });
                                }

                                updateLaptopState({ HOImportAppCart: mappedCart });
                            })(product)
                        }}
                    >
                        Add To Cart
                    </Button.Primary>
                    <Button.Primary
                        className={classes.removeBtn}
                        disabled={!(HOImportAppCart.findIndex(cartItem => cartItem.name === product.name) !== -1)}
                        onClick={() => {
                            return (function (productName) {
                                const cartIdx = HOImportAppCart.findIndex((cartItem) => cartItem.name === productName);

                                if (cartIdx !== -1) {
                                    const mappedCart = HOImportAppCart.map((cartItem) => {
                                        return {
                                            ...cartItem
                                        }
                                    });

                                    mappedCart[cartIdx].quantity > 1 ? mappedCart[cartIdx].quantity -= 1 : mappedCart.splice(cartIdx, 1);

                                    updateLaptopState({ HOImportAppCart: mappedCart });
                                }
                            })(product.name)
                        }}
                    >
                        Remove From Cart
                    </Button.Primary>
                </div>
            ))}
            <HOImportsFooter>
                <Typography style={{ color: 'white', fontSize: 13 }}>
                    Cart Total: {calculatePrice()} GNE
                </Typography>
                <Button.Primary
                    className={classes.checkoutBtn}
                    onClick={() => setConfirmModal(true)}
                >
                    {loading ? <CircularProgress size={30} /> : 'Confirm Order'}
                </Button.Primary>
            </HOImportsFooter>
        </div>
    )
}