import React, { FunctionComponent } from 'react';
import Spinner from '../../../../../components/spinner/spinner';
import ContractButton from '../contract-button';
import useStyles from './index.styles';
import { useSelector } from 'react-redux';
import store from 'main/laptop/store';
import { nuiAction } from 'lib/nui-comms';
import { AddSystemNotification } from '../../laptop-screen';
import { updateLaptopState } from 'main/laptop/actions';

interface TransferPopupProps {
    contractId: string;
    handleClose: () => void;
}

const TransferPopup: FunctionComponent<TransferPopupProps> = (props) => {
    const state: LaptopState = useSelector((state) => state[store.key]);
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [stateId, setStateId] = React.useState('');

    const boostingAppIcon = state.boostingAppIcon;

    const transferContract = async () => {
        if (!(stateId.length < 1)) {
            setLoading(true);

            const results = await nuiAction('ev-boosting:ui:tranferContract', { cid: stateId, contractId: props.contractId });

            if (results.meta.ok) {
                updateLaptopState({ boostingContracts: results.data });
                AddSystemNotification({
                    show: true,
                    icon: boostingAppIcon,
                    title: "Boostin",
                    message: `Contract successfully transferred - ${props.contractId}`
                });
            } else {
                AddSystemNotification({
                    show: true,
                    icon: boostingAppIcon,
                    title: "Boostin",
                    message: results.meta.message
                });
            }

            setLoading(false);
            props.handleClose();
        }
    }

    return (
        <>
            {loading ? (
                <div className={classes.loadingIcon}>
                    <Spinner />
                </div>
            ) : (
                <div className={classes.transferPopup}>
                    <div className={classes.title}>
                        Transfer Contract
                    </div>
                    <input
                        className={classes.input}
                        placeholder="Enter state id..."
                        value={stateId}
                        onChange={(e) => setStateId(e.target.value)}
                        type="number"
                    />
                    <div className={classes.buttons}>
                        <ContractButton
                            onClick={transferContract}
                            label="Send"
                        />
                        <ContractButton
                            onClick={props.handleClose}
                            style={{ margin: '0.5rem 0' }}
                            label="Cancel"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default TransferPopup;