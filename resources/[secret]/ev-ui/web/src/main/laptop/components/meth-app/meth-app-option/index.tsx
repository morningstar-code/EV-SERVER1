import React, { FunctionComponent } from 'react';
import { Typography } from '@mui/material';
import moment from 'moment';
import useStyles from './index.styles';
import Button from '../../../../../components/button/button';
import MethAppConfirmPopup from '../meth-app-confirm-popup';
import { nuiAction } from 'lib/nui-comms';

interface MethAppOptionPorps {
    option: { id: number, name: string, price: number, due_at: number };
    fee: boolean;
    reloadFunc: () => void;
}

const MethAppOption: FunctionComponent<MethAppOptionPorps> = (props) => {
    const classes = useStyles();
    const option = props.option;
    const fee = props.fee;
    const reloadFunc = props.reloadFunc;

    const [confirmModal, setConfirmModal] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const confirmPurchase = async (id: number) => {
        if (!loading) {
            setLoading(true);

            if (fee) {
                await nuiAction("ev-meth:payFee", { id: id });
            } else {
                await nuiAction("ev-meth:purchaseOption", { name: id });
            }

            reloadFunc();
            
            setConfirmModal(false);
            setLoading(false);
        }

        return;
    };

    const Text = (label: string, value: string) => {
        return (
            <Typography variant="body1" className={classes.text}>
                {label}: <Typography variant="body1" className={classes.textValue}>{value}</Typography>
            </Typography>
        );
    }

    return (
        <div className={classes.contract}>
            {confirmModal && (
                <MethAppConfirmPopup
                    message={fee ? 'Do you really want to pay the fee for this item?' : 'Do you really want to purchase this item?'}
                    onAccept={() => confirmPurchase(option.id)}
                    onCancel={() => setConfirmModal(false)}
                    loading={loading}
                />
            )}
            <div className={classes.info} style={{ width: '50%' }}>
                {Text('Name', option.name)}
                {Text('Price', `${option.price} Shungite`)}
                {Text('Due in', moment.unix(option.due_at / 1000).fromNow())}
            </div>
            <div className={classes.info}>
                <div className={classes.buttons}>
                    <Button.Primary onClick={() => setConfirmModal(true)} className={classes.btn}>
                        {fee ? 'Pay' : 'Purchase'}
                    </Button.Primary>
                </div>
            </div>
        </div>
    );
}

export default MethAppOption;