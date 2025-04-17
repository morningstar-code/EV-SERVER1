import React, { FunctionComponent } from "react";
import AppContainer from "main/phone/components/app-container";
import { Tooltip, Typography } from "@mui/material";
import useStyles from "./details.styles";
import { useSelector } from "react-redux";
import { devData as phoneDevData } from "main/phone/dev-data";
import { devData } from "main/dev-data";
import { formatCurrency, formatNumber } from "lib/format";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Details: FunctionComponent<any> = (props) => {

    const classes = useStyles();

    return (
        <AppContainer>
            <div className={classes.container}>
                <div className={classes.moneys}>
                    <Tooltip title="State ID" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <div>
                            <i className="fas fa-id-card fa-fw fa-2x"></i>
                            <Typography variant="h6">{props.character.id}</Typography>
                        </div>
                    </Tooltip>
                    <Tooltip title="Bank Account ID" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <div>
                            <i className="fas fa-university fa-fw fa-2x"></i>
                            <Typography variant="h6">{props.character.bank_account_id ?? devData.init().character.bank_account_id}</Typography>
                        </div>
                    </Tooltip>
                    <Tooltip title="Phone Number" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <div>
                            <i className="fas fa-mobile fa-fw fa-2x"></i>
                            <Typography variant="h6">{formatNumber(props.character.number ?? devData.init().character.number)}</Typography>
                        </div>
                    </Tooltip>
                    <Tooltip title="Wallet" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <div className="cash">
                            <i className="fas fa-wallet fa-fw fa-2x"></i>
                            <Typography variant="h6" style={{ color: 'white' }}>{formatCurrency(props?.cash)}</Typography>
                        </div>
                    </Tooltip>
                    <Tooltip title="Personal Bank Balance" placement="bottom" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <div className="bank">
                            <i className="fas fa-piggy-bank fa-fw fa-2x"></i>
                            <Typography variant="h6" style={{ color: 'white' }}>{formatCurrency(props?.bank)}</Typography>
                        </div>
                    </Tooltip>
                    <Tooltip title="Casino Balance" placement="bottom" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <div className="casino">
                            <i className="fas fa-dice-three fa-fw fa-2x"></i>
                            <Typography variant="h6" style={{ color: 'white' }}>{formatCurrency(props?.casino)}</Typography>
                        </div>
                    </Tooltip>
                </div>
                <div className={classes.licenses}>
                    <Typography variant="h5" style={{ color: '#fff' }}>Licenses</Typography>
                    {props?.licenses && props?.licenses?.length > 0 && props?.licenses?.map((license) => (
                        <div key={license.name} className={classes.license}>
                            <div style={{ flex: 1 }}>
                                <Typography variant="body1" style={{ color: '#fff' }}>{capitalizeFirstLetter(license.name)}</Typography>
                            </div>
                            <div className={`icon icon-${license.status ? 'green' : 'red'}`} style={{ maxWidth: 60 }}>
                                <i className={`fas fa-${license.status ? 'check-circle' : 'times-circle'} fa-fw fa-lg`}></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppContainer>
    )
}

export default Details;