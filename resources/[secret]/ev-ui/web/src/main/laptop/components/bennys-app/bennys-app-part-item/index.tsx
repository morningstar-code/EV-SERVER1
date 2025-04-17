import React from 'react';
import { Typography } from '@mui/material';
import useStyles from './index.styles';
import Button from 'components/button/button';

interface BennysPartItemProps {
    partInfo: BennysAppItem;
    addCartItem: (partInfo: BennysAppItem) => void;
    cart: BennysCartItem[];
}

export default (props: BennysPartItemProps) => {
    const partInfo = props.partInfo;
    const addCartItem = props.addCartItem;
    const cart = props.cart;
    const ref = React.useRef(null);
    const classes = useStyles();

    return (
        <div className={classes.bennysPartItem} ref={ref}>
            {(function () {
                const cartIdx = cart.findIndex((item: BennysCartItem) => item.code === `${partInfo.type}_${partInfo.part}`);

                if (cartIdx === -1) {
                    return (
                        <div className={classes.bennysCartQty}>
                            {cart[cartIdx].qty}
                        </div>
                    )
                }
            })}
            <img className="thumbnail" alt="part-item-icon" src={partInfo.icon} />
            <Typography variant="h1" className={classes.bennysTextTitle}>
                {partInfo.name}
            </Typography>
            <ul className={classes.bennysPartInfo}>
                {partInfo.category !== 'consumables' && (
                    <Typography className={classes.bennysPartInfoText}>
                        Stock: {(function (stock: number) {
                            let status = 'lowStock';
                            stock > 3 && (status = 'medStock');
                            stock > 6 && (status = 'highStock');

                            return (
                                <Typography variant="h1" className={classes[status]} style={{ fontSize: 14, marginLeft: 3 }}>
                                    {stock}
                                </Typography>
                            )
                        })(partInfo.stock)}
                    </Typography>
                )}
                <Typography className={classes.bennysPartInfoText}>
                    Price: {partInfo.importPrice} GNE
                </Typography>
                {partInfo.category !== 'consumables' && (
                    <Typography className={classes.bennysPartInfoText}>
                        Return: {partInfo.returnValue}
                    </Typography>
                )}
            </ul>
            <Button.Primary className={classes.bennysAddItemBtn} onClick={() => addCartItem(partInfo)}>
                Add to Cart
            </Button.Primary>
        </div>
    )
}