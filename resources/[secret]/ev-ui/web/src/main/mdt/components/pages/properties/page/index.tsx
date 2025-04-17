import React from 'react';
import Input from 'components/input/input';
import Content from 'main/mdt/components/content';
import useStyles from '../../../index.styles';
import Paper from 'main/mdt/components/paper';
import { isJob } from 'lib/character';
import { Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import Chip from 'main/mdt/components/chip';
import { nuiAction } from 'lib/nui-comms';
import { mdtAction } from 'main/mdt/actions';

const PropertyGPS = (props: any) => {
    return (
        <Tooltip title="Set GPS" placement="top" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)' }} arrow>
            <div>
                <Chip
                    noLabel={true}
                    icon="map-pin"
                    iconSize="lg"
                    textColor="white"
                    bgColor="black"
                    onClick={props.onClick}
                />
            </div>
        </Tooltip>
    )
}

export default (props: any) => {
    const classes = useStyles(props);
    const [search, setSearch] = React.useState('');
    const properties = props.properties ?? [];

    const selectProperty = async (property: any) => {
        if (!props.propertySelected || props.propertySelected.id !== property.id) {
            const ownerResults = await nuiAction('ev-mdt:getPropertyOwner', { property_id: property.id }, {});
            const ownerData = {
                cid: ownerResults?.data?.cid ?? 0,
                owner: ownerResults?.data?.name ?? 'Not owned',
            };

            const outstandingPaymentsResults = await nuiAction('ev-mdt:getOutstandingHousePayments', { property_id: property.id, property_owner: ownerData.cid });

            let outstandingPayments: any = [];
            let dueDate = 0;

            outstandingPayments = outstandingPaymentsResults.data;

            if (Array.isArray(outstandingPayments) && outstandingPayments.length > 0) {
                dueDate = (outstandingPayments
                    .sort((a, b) => {
                        const aDueDate = a?.due_date ?? 0;
                        const bDueDate = b?.due_date ?? 0;
                        return aDueDate - bDueDate;
                    })[0]?.due_date ?? moment())
            }

            if (!(ownerData.cid > 0 && isJob(['judge']))) {
                const ownershipHistoryResults = await mdtAction('getPropertyOwnershipHistory', { propertyId: property.id }, []);
                props.updateState({
                    propertySelected: {
                        ...property,
                        ...ownerData,
                        outstandingTaxes: outstandingPayments ?? [],
                        oldestPayment: dueDate ?? 0,
                        ownershipHistory: ownershipHistoryResults?.data?.history ?? []
                    }
                });
            }
        }
        return;
    }

    const filteredProperties = properties.length > 0 && properties?.filter((property: any) => {
        return property.street.toLowerCase().indexOf(search.toLowerCase()) !== -1 || property.id === parseInt(search);
    }).slice(0, 50);

    const hasAllowedJob = isJob(['judge', 'police']);

    return (
        <div className={classes.contentWrapper}>
            <Content
                search={true}
                onChangeSearch={setSearch}
                searchValue={search}
                title="Properties"
            >
                {filteredProperties.length > 0 && filteredProperties.map((property: any) => (
                    <Paper
                        key={property.id}
                        id={property.id}
                        title={property.street}
                        onClick={() => selectProperty(property)}
                    />
                ))}
            </Content>
            <div className={classes.spacer}></div>
            <div className={classes.verticalStack}>
                <Content
                    autoHeight={true}
                    title="Property"
                    actions={(
                        <div className={classes.contentActions}>
                            <PropertyGPS
                                onClick={() => nuiAction('ev-mdt:setPropertyGps', props.propertySelected.coords)}
                            />
                        </div>
                    )}
                >
                    {props.propertySelected && props.propertySelected.id && (
                        <div className={classes.inputWrapperFlex}>
                            <div style={{ width: '100%' }}>
                                <div className={classes.inputWrapper}>
                                    <Input.Text
                                        label="Property ID"
                                        icon="list-ol"
                                        onChange={() => { }}
                                        value={props.propertySelected.id}
                                    />
                                </div>
                                <div className={classes.inputWrapper}>
                                    <Input.Text
                                        label="Street"
                                        icon="house-user"
                                        onChange={() => { }}
                                        value={props.propertySelected.street}
                                    />
                                </div>
                                {props.publicApp ? (
                                    <div className={classes.inputWrapper}>
                                        <Input.Text
                                            label="Owned"
                                            icon="user"
                                            onChange={() => { }}
                                            value={props.propertySelected.cid > 0 ? 'Yes' : 'No'}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div className={classes.inputWrapper}>
                                            <Input.Text
                                                label="Owner"
                                                icon="user"
                                                onChange={() => { }}
                                                value={props.propertySelected.owner}
                                            />
                                        </div>
                                        <div className={classes.inputWrapper}>
                                            <Input.CityID
                                                onChange={() => { }}
                                                value={props.propertySelected.cid}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </Content>
                {hasAllowedJob && (
                    <Content
                        autoHeight={true}
                        title="Ownership History"
                    >
                        {props.propertySelected && props.propertySelected.id && props.propertySelected.ownershipHistory.map((history: any) => (
                            <Paper
                                key={history.id}
                                id={history.id}
                                timestamp={history.event_time}
                                title={`Type: ${history.event}`}
                                titleExtra={`State ID: ${history.invoker_id}`}
                            />
                        ))}
                    </Content>
                )}
            </div>
            <div className={classes.spacer}></div>
            <div className={classes.verticalStack}>
                {isJob(['judge']) && (
                    <Content
                        autoHeight={true}
                        title="Taxes"
                    >
                        {props.propertySelected && props.propertySelected.id && (
                            <div className={classes.inputWrapperFlex}>
                                <div style={{ width: '100%' }}>
                                    {props.propertySelected.outstandingTaxes.length > 0 && (
                                        <Typography variant="body2" style={{ color: 'white' }}>
                                            This property currently has {props.propertySelected.outstandingTaxes.length} outstanding tax payments, dating back to {moment.unix(props.propertySelected.oldestPayment).format('YYYY/MM/DD')}.
                                            <br />
                                            The outstanding taxes are amounting to ${props.propertySelected.outstandingTaxes.reduce((a: any, b: any) => a + b.amount, 0)}
                                        </Typography>
                                    )}
                                    {props.propertySelected.outstandingTaxes.length === 0 && (
                                        <Typography variant="body2" style={{ color: 'white' }}>
                                            This property currently has no outstanding tax payments.
                                        </Typography>
                                    )}
                                </div>
                            </div>
                        )}
                    </Content>
                )}
            </div>
        </div>
    )
}