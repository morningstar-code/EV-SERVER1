import { Typography } from '@mui/material';
import Button from 'components/button/button';
import { updateLaptopState } from 'main/laptop/actions';
import useStyles from './index.styles';
import { nuiAction } from 'lib/nui-comms';
import { AddSystemNotification } from '../../laptop-screen';

interface BennysCartProps {
    cart: BennysCartItem[];
}

export default (props: BennysCartProps) => {
    const cart = props.cart;
    const classes = useStyles();

    const calculatePrice = () => {
        let price = 0;

        for (let i = 0; i < cart.length; i++) {
            price += cart[i].price * cart[i].qty;
        }

        return price;
    }

    const checkoutCart = async () => {
        if (!(cart.length < 1)) {
            const results = await nuiAction<ReturnData<{ success: boolean, message: string }>>("", { totalPrice: calculatePrice(), cart: cart }, { returnData: {
                success: true,
                message: ""
            } });

            const success = results.data.success;
            let message = results.data.message;

            let totalItems = 0;

            for (let i = 0; i < cart.length; i++) {
                totalItems += cart[i].qty * 1;
            }

            if (success) {
                message = `You have purchased ${totalItems} item(s), in the amount of ${calculatePrice()} GNE!`;

                updateLaptopState({ bennysAppCart: [] });
            }

            AddSystemNotification({
                show: true,
                icon: 'https://i.imgur.com/WaFc6BD.png',
                title: 'Bennys Parts',
                message: message
            });
        }

        return;
    }

    return (
        <div className={classes.bennysCart}>
            <div className={classes.bennysCartList}>
                {cart && cart.map((item: BennysCartItem) => (
                    <div className={classes.bennysCartItem}>
                        <div className={classes.bennysPartInfo}>
                            <img src={item.icon} className={classes.bennysPartThumbnail} alt="cart-thumbnail" />
                            <Typography variant="h1" className={classes.bennysPartTitle}>
                                - {item.name} ({item.qty}x) - {item.price} GNE
                            </Typography>
                        </div>
                        <Button.Primary className={classes.bennysRemoveBtn} onClick={() => {
                            const cartIdx = cart.findIndex((cartItem: BennysCartItem) => cartItem.code === item.code);

                            if (cartIdx !== -1) {
                                const mappedCart = cart.map((cartItem: BennysCartItem) => {
                                    return {
                                        ...cartItem
                                    }
                                });

                                if (mappedCart[cartIdx].qty > 1) {
                                    mappedCart[cartIdx].qty -= 1;
                                } else {
                                    mappedCart.splice(cartIdx, 1);
                                }

                                updateLaptopState({ bennysAppCart: mappedCart });
                            }
                        }}>
                            Remove Item
                        </Button.Primary>
                    </div>
                ))}
            </div>
            <div className={classes.bennysCheckoutPanel}>
                Total: {calculatePrice()} GNE
                <Button.Primary className={classes.bennysCheckoutBtn} onClick={checkoutCart}>
                    Checkout
                </Button.Primary>
            </div>
        </div>
    )
}