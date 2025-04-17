import { Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import ConfirmPopup from '../confirm-popup';
import ContractButton from '../contract-button';
import TransferPopup from '../transfer-popup';
import useStyles from './index.styles';
import store from 'main/laptop/store';
import { nuiAction } from 'lib/nui-comms';
import { AddSystemNotification } from '../../laptop-screen';
import { updateLaptopState } from 'main/laptop/actions';
import AuctionPopup from '../auction-popup';

interface BoostingAppContractProps {
    contract: BoostingContract;
}

const BoostingAppContract: FunctionComponent<BoostingAppContractProps> = (props) => {
    const state: LaptopState = useSelector((state) => state[store.key]);
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [startPopup, setStartPopup] = React.useState(false);
    const [transferPopup, setTransferPopup] = React.useState(false);
    const [deletePopup, setDeletePopup] = React.useState(false);
    const [auctionPopup, setAuctionPopup] = React.useState(false);
    const [scratchable, setScratchable] = React.useState(false);
    const [dropOffType, setDropOffType] = React.useState<any>();

    const boostingAppIcon = state.boostingAppIcon;

    const startContract = async (contractId: string, buyIn: number) => {
        if (!loading && dropOffType) {
            setLoading(true);

            const results = await nuiAction('ev-boosting:ui:startContract', { contractId: contractId, buyIn: buyIn, contractType: dropOffType });

            if (results.meta.ok) {
                AddSystemNotification({
                    show: true,
                    icon: boostingAppIcon,
                    title: "Boostin",
                    message: "Contract started, you should be email/pinged instructions."
                });
            } else {
                AddSystemNotification({
                    show: true,
                    icon: boostingAppIcon,
                    title: "Boostin",
                    message: results.meta.message
                });
            }

            setStartPopup(false);
            setLoading(false);
        }
    }

    const disbandContract = async (contractId: string) => {
        if (!loading) {
            setLoading(true);

            const results = await nuiAction('ev-boosting:ui:disbandContract', { contractId: contractId });

            if (results.meta.ok) {
                setDeletePopup(false);
                setLoading(false);
                updateLaptopState({ boostingContracts: results.data });
                AddSystemNotification({
                    show: true,
                    icon: boostingAppIcon,
                    title: "Boostin",
                    message: `Contract successfully deleted - ${contractId}`
                });
            }
        }
    }

    const cancelContract = async (contractId: string) => {
        const results = await nuiAction('ev-boosting:ui:cancelContract', { contractId: contractId });

        if (results.meta.ok) {
            setLoading(false);
            updateLaptopState({ boostingContracts: results.data });
            AddSystemNotification({
                show: true,
                icon: boostingAppIcon,
                title: "Boostin",
                message: "Successfully canceled contract!"
            });
        } else {
            AddSystemNotification({
                show: true,
                icon: boostingAppIcon,
                title: "Boostin",
                message: results.meta.message
            });
        }
    }

    const calculateExpiry = (expiry: number) => {
        const timestamp = expiry - Date.now();
        const calc = Math.floor((timestamp / 1000 / 3600) % 24);
        const calc2 = Math.floor((timestamp / 60000) % 60);

        let color = "";

        if (calc < 2) {
            color = "#efca15";
        }

        if (calc < 1 && calc2 < 60) {
            color = "#ef4715";
        }

        if (calc >= 2 && calc2 > 0) {
            color = "#1ad61a";
        }

        const hours = calc < 10 ? `0${calc} Hours` : `${calc} Hours`;
        const minutes = calc2 < 10 ? `0${calc2} Min` : `${calc2} Min`;

        return (
            <span style={{ color: color, marginLeft: 2, fontSize: '1.6vh' }}>
                {`${hours}, ${minutes}`}
            </span>
        )
    }

    const setType = (type: string) => {
        setDropOffType(type);
        setScratchable(false);
        setStartPopup(true);
    }

    return (
        <div className={classes.contract}>
            {startPopup && (
                <ConfirmPopup
                    message="Start Contract?"
                    onAccept={() => startContract(props.contract.uuid, props.contract.contractBuyIn)}
                    onCancel={() => setStartPopup(false)}
                    loading={loading}
                />
            )}
            {transferPopup && (
                <TransferPopup
                    contractId={props.contract.uuid}
                    handleClose={() => setTransferPopup(false)}
                />
            )}
            {auctionPopup && (
                <AuctionPopup
                    contractId={props.contract.uuid}
                    handleClose={() => setAuctionPopup(false)}
                />
            )}
            {deletePopup && (
                <ConfirmPopup
                    message="Delete Contract?"
                    onAccept={() => disbandContract(props.contract.uuid)}
                    onCancel={() => setDeletePopup(false)}
                    loading={loading}
                />
            )}
            {scratchable && (
                <div className={classes.contractType}>
                    <Typography variant="h1" className={classes.close} onClick={() => setScratchable(false)}>
                        <i className="fas fa-times fa-fw fa-1x" style={{ color: 'white' }}></i>
                    </Typography>
                    <Typography variant="h1" className={classes.title}>
                        Select Type
                    </Typography>
                    <Typography variant="body1" className={classes.desc}>
                        If you choose to vin scratch it will cost an additional {props.contract.contractVehicleInfo.gnePurchaseCost} GNE to claim ownership.
                    </Typography>
                    <div className={classes.typeButtons}>
                        <ContractButton
                            onClick={() => setType('vinScratch')}
                            label="Vin Scratch"
                        />
                        <ContractButton
                            onClick={() => setType('normal')}
                            label="Normal Dropoff"
                            style={{ margin: '0.5rem 0' }}
                        />
                    </div>
                </div>
            )}
            {props.contract.playerInfo && (
                <div className={classes.playerContractBanner}>
                    Player Contract
                </div>
            )}
            <div className={classes.vehicleClass}>
                {props.contract.contractVehicleClass}
            </div>
            <div className={classes.contractInfo}>
                <Typography variant="body1" className={classes.contractText} style={{ marginBottom: '0 !important' }}>
                    {props.contract.racingAlias}
                </Typography>
                <Typography variant="h1" className={classes.contractVehicle}>
                    {props.contract.contractVehicleInfo.name}
                </Typography>
                {props.contract.vehiclePlate && (
                    <Typography variant="body1" className={classes.contractText}>
                        Plate: {props.contract.vehiclePlate}
                    </Typography>
                )}
                {!props.contract.contractActive && (
                    <>
                        <Typography variant="body1" className={classes.contractText}>
                            Buy In: {props.contract.contractBuyIn} GNE
                        </Typography>
                        <Typography variant="body1" className={classes.contractText}>
                            Expires In: {calculateExpiry(props.contract.expiresAt)}
                        </Typography>
                    </>
                )}
                <div className={classes.contractButtons}>
                    <ContractButton
                        onClick={() => {
                            const isVinScratchable = ['D', 'C', 'B', 'A', 'A+', 'S+', 'S++'].includes(props.contract.contractVehicleClass);

                            if (isVinScratchable) {
                                setScratchable(true);
                            } else {
                                setStartPopup(true);
                                setDropOffType('normal');
                            }
                        }}
                        disabled={props.contract.contractActive}
                        label={props.contract.contractActive ? 'Contract In Progress' : 'Start Contract'}
                    />
                    <ContractButton
                        onClick={() => setTransferPopup(true)}
                        disabled={props.contract.contractActive}
                        style={{ marginTop: '0.5rem' }}
                        label="Transfer Contract"
                    />
                    <ContractButton
                        onClick={() => setAuctionPopup(true)}
                        disabled={props.contract.contractActive}
                        style={{ marginTop: '0.5rem' }}
                        label="Auction Contract"
                    />
                    {props.contract.contractActive ? (
                        <ContractButton
                            onClick={() => cancelContract(props.contract.uuid)}
                            disabled={props.contract.contractActive}
                            style={{ marginTop: '0.5rem' }}
                            label="Cancel Contract"
                        />
                    ) : (
                        <ContractButton
                            onClick={() => setDeletePopup(true)}
                            disabled={props.contract.contractActive}
                            style={{ marginTop: '0.5rem' }}
                            label="Decline Contract"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default BoostingAppContract;