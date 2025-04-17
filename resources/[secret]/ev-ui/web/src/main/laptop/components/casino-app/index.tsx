import React from 'react';
import Draggable from 'react-draggable';
import { updateLaptopState } from 'main/laptop/actions';
import AppHeader from '../app-header';
import { nuiAction } from 'lib/nui-comms';
import { CircularProgress } from '@mui/material';
import Text from 'components/text/text';
import InformationBlock from './information-block';
import InformationBlockButton from './information-block-button';
import CasinoChipBreakdownModal from './casino-chip-breakdown-modal';
import './casino-app.scss';

export default () => {
    const [loading, setLoading] = React.useState(false);
    const [chipBreakdownModal, setChipBreakdownModal] = React.useState(false);
    const [stateId, setStateId] = React.useState(0);
    const [userInformation, setUserInformation] = React.useState(null);

    const getUserInformation = React.useCallback(async (targetId: number) => {
        setLoading(true);
        const results = await nuiAction('ev-casino:ui:getUserInformation', { targetId: targetId }, {
            returnData: {
                cid: 17691,
                totalBet: 200,
                totalLoss: 50,
                totalWon: 12,
                profit: -10,
                first_name: 'Alex',
                last_name: 'Ron',
                chips_purchased: 100,
                chips_withdrawn: 100
            }
        });

        if (results.meta.ok) {
            setUserInformation(results.data);
            setLoading(false);
        }
    }, []);

    const formatCurrency = (amount: number) => {
        let value = Number(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const splitted = value.split('.');
        if (splitted.length > 1) {
            value = splitted[0];
        }
        return value;
    };

    return (
        <Draggable handle="#app-header">
            <div className="app-wrapper">
                <AppHeader appName="Diamond Casino and Resort - Management Tool" color="#171717" textColor="#d3cfcf" onClose={() => updateLaptopState({ showCasinoApp: false })} style={{ color: '#ffffff' }} />
                <CasinoChipBreakdownModal
                    show={chipBreakdownModal}
                    handleClose={() => setChipBreakdownModal(false)}
                    stateId={stateId}
                />
                <div className="app-container">
                    <div className="search-input">
                        <input
                            type="number"
                            placeholder="Search by state id..."
                            value={stateId}
                            onChange={(e) => setStateId(e.target.valueAsNumber)}
                        />
                        <button onClick={() => getUserInformation(stateId)}>Search</button>
                    </div>
                    {loading ? (
                        <CircularProgress
                            size={50}
                            thickness={2}
                            className="loading-indicator"
                            style={{ color: '#fff' }}
                        />
                    ) : (
                        <>
                            {userInformation ? (
                                <div className="user-information">
                                    <InformationBlock
                                        value={userInformation.first_name ?? ''}
                                        title="First Name"
                                    />
                                    <InformationBlock
                                        value={userInformation.last_name ?? ''}
                                        title="Last Name"
                                    />
                                    <InformationBlock
                                        value={userInformation.cid ?? ''}
                                        title="StateID"
                                    />
                                    <InformationBlock
                                        danger={userInformation.profit < 0 ?? null}
                                        success={userInformation.profit > 0 ?? null}
                                        value={`$${formatCurrency(userInformation.profit ?? 0)}`}
                                        title="Profit"
                                    />
                                    <InformationBlock
                                        value={`$${formatCurrency(userInformation.totalWon ?? 0)}`}
                                        title="Total Won"
                                    />
                                    <InformationBlock
                                        value={`$${formatCurrency(userInformation.totalBet ?? 0)}`}
                                        title="Total Bet"
                                    />
                                    <InformationBlock
                                        value={`$${formatCurrency(userInformation.chips_purchased ?? 0)}`}
                                        title="Chips Purchased"
                                    />
                                    <InformationBlock
                                        value={`$${formatCurrency(userInformation.chips_withdrawn ?? 0)}`}
                                        title="Chips Withdrawn"
                                    />
                                    <InformationBlockButton
                                        title="View Chip Breakdown"
                                        action={() => setChipBreakdownModal(true)}
                                    />
                                </div>
                            ) : (
                                <div className="no-user-information">
                                    <Text variant="p">
                                        No User Information...
                                    </Text>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Draggable>
    )
}