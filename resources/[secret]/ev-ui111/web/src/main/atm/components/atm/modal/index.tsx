import { FormControl, InputAdornment, TextField, Typography } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import Button from "components/button/button";
import useStyles from "./index.styles";
import Spinner from "components/spinner/spinner";

interface ModalProps {
    account: Account;
    action: string;
    showModalError: boolean | string;
    closeModal: () => void;
    performAction: (action: string, account: Account, amount: number, comment: string, accountId: number, stateId: number) => void;
    performExportAction: (account: Account, startDate: Date, endDate: Date, callback: Function) => void;
}

const Modal: FunctionComponent<ModalProps> = (props) => {
    const classes = useStyles();

    const [amount, setAmount] = useState<number>(null);
    const [accountId, setAccountId] = useState<number>(null);
    const [stateId, setStateId] = useState<number>(null);
    const [comment, setComment] = useState<string>(null);
    const [error, setError] = useState<string>(null);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <>
            {props.showModalError ? (
                <div className={classes.modalWrapper}>
                    <div className={classes.modalContainer}>
                        <div>
                            <Typography variant="h5" style={{ color: 'white' }}>
                                {props.showModalError}
                            </Typography>
                        </div>
                        <div style={{ marginTop: 32 }}>
                            <Button.Secondary onClick={props.closeModal}>
                                Close
                            </Button.Secondary>
                        </div>
                    </div>
                </div>
            ) : loading ? (
                <div className={classes.modalWrapper}>
                    <div className={classes.modalContainer}>
                        <Spinner />
                    </div>
                </div>
            ) : (
                <div className={classes.modalWrapper}>
                    <div className={classes.modalContainer}>
                        <div className={classes.modalInner}>
                            <Typography variant="h5" style={{ color: 'white' }}>
                                {props?.account?.name} / {props?.account?.id}
                            </Typography>
                        </div>
                        <div className={classes.modalInner}>
                            <div className="input-wrapper">
                                <FormControl fullWidth sx={{ width: '100%' }}>
                                    <TextField
                                        className={classes.input}
                                        id="input-with-icon-textfield"
                                        type="number"
                                        label="Amount"
                                        variant="standard"
                                        onChange={(e) => setAmount(parseInt(e.target.value))}
                                        value={amount}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    $
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className={classes.modalInner}>
                            <div className="input-wrapper">
                                <FormControl fullWidth sx={{ width: '100%' }}>
                                    <TextField
                                        className={classes.input}
                                        id="input-with-icon-textfield"
                                        label="Comment"
                                        variant="standard"
                                        onChange={(e) => setComment(e.target.value)}
                                        value={comment}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    //
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </FormControl>
                            </div>
                        </div>
                        {props.action === 'transfer' && (
                            <>
                                <div className={classes.modalInner}>
                                    <div className="input-wrapper">
                                        <FormControl fullWidth sx={{ width: '100%' }}>
                                            <TextField
                                                className={classes.input}
                                                id="input-with-icon-textfield"
                                                label="State ID"
                                                variant="standard"
                                                onChange={(e) => setStateId(parseInt(e.target.value))}
                                                value={stateId}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            #
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                                <div className={classes.modalInner}>
                                    <div className="input-wrapper">
                                        <FormControl fullWidth sx={{ width: '100%' }}>
                                            <TextField
                                                className={classes.input}
                                                id="input-with-icon-textfield"
                                                label="...or Account ID"
                                                variant="standard"
                                                onChange={(e) => setAccountId(parseInt(e.target.value))}
                                                value={accountId}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            #
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                            </>
                        )}
                        {error && (
                            <div className={classes.modalInner}>
                                <Typography variant="h5" style={{ color: 'white' }}>
                                    {error}
                                </Typography>
                            </div>
                        )}
                        <div className={classes.modalActions}>
                            <Button.Secondary onClick={props.closeModal}>
                                Cancel
                            </Button.Secondary>
                            <Button.Primary onClick={() => {
                                if (Number(amount) < 1) {
                                    setError("Amount must be positive")
                                } else if (Number(amount) > 20000000) {
                                    setError("Amount can't be more than $20,000,00.00")
                                } else {
                                    setLoading(true);
                                    props.performAction(
                                        props.action,
                                        props.account,
                                        amount,
                                        comment,
                                        accountId,
                                        stateId
                                    );
                                }
                            }}>
                                {props.action}
                            </Button.Primary>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;