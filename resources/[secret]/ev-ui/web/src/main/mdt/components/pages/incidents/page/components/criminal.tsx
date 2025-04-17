import React from 'react';
import moment from 'moment';
import useStyles from '../../../../index.styles';
import Content from 'main/mdt/components/content';
import Remove from 'main/mdt/components/icons/remove';
import Save from 'main/mdt/components/icons/save';
import Chip from 'main/mdt/components/chip';
import { updateMdtState } from 'main/mdt/actions';
import ChargesModal from 'main/mdt/components/modals/charges-modal';
import Input from 'components/input/input';
import { formatCurrency } from 'lib/format';
import Text from 'components/text/text';

const timeAndFineReduce = (total: number, reduction: number, type = 'plus') => {
    return type === 'minus' ? Math.max(Math.ceil(total - total * reduction), 1) : Math.max(Math.ceil(total + total * reduction), 1);
}

const getChargeId = (charge: any) => {
    return `${charge.id}_${charge.accomplice}_${charge.accessory}`;
}

export default (props: any) => {
    const classes = useStyles(props);
    const [civProfile, setCivProfile] = React.useState<any>({
        id: 0,
        character_id: 0,
        profile_civ_id: 0,
        name: '',
        warrant: 0,
        warrant_expiry_timestamp: 0,
        processed_by: 0,
        processed: 0,
        guilty: 0,
        charges: [],
        warrants: [],
    });
    const [reductions, setReductions] = React.useState<number>(0);

    React.useEffect(() => {
        if (props.civProfile) {
            setCivProfile(props.civProfile);
        }
    }, [props]);

    const updateField = (field: string, value: any) => {
        if (field === 'warrant') {
            setCivProfile({
                ...civProfile,
                [field]: value ? 1 : 0,
                'warrant_expiry_timestamp': moment().utc().add(3, 'day').unix()
            });
        } else {
            setCivProfile({
                ...civProfile,
                [field]: value
            });
        }
    }

    const incident = props.incident;
    let totalTime = 0;
    let totalFine = 0;
    let totalPoints = 0;
    let paroleDenied = false;
    let chargeCount: any = { chargeId: 1 };
    let charges: any = [];

    civProfile.charges.forEach((charge: any) => {
        const chargeId = getChargeId(charge);
        const hasAccessory = !!charge.accessory;
        const hasAccomplice = !!charge.accomplice;

        if (!chargeCount[chargeId]) {
            chargeCount[chargeId] = 0;
            charges.push(charge);
            totalTime += hasAccessory ? charge.accessory_time : hasAccomplice ? charge.accomplice_time : charge.time;
        }

        paroleDenied = paroleDenied || charge.deny_parole || charge.accomplice_deny_parole || charge.accessory_deny_parole;

        if (hasAccessory) {
            totalFine += charge.accessory_fine;
            totalPoints += charge.accessory_points;
        } else if (hasAccomplice) {
            totalFine += charge.accomplice_fine;
            totalPoints += charge.accomplice_points;
        } else {
            totalFine += charge.fine;
            totalPoints += charge.points;
        }
    });

    totalTime = Math.max(totalTime, 1);
    totalFine = Math.max(totalFine, 1);

    let paroleMonths = 0;
    if (civProfile.parole_end_timestamp > Math.round(Date.now() / 1000)) {
        paroleMonths = Math.ceil((civProfile.parole_end_timestamp - Math.round(Date.now() / 1000) + 1) / 60);
    }

    let warrantFine = 0;
    let warrantPoints = 0;
    let warrantTime = 0;

    civProfile.warrants.forEach((warrant: any) => {
        warrantFine += warrant.fine;
        warrantPoints += warrant.points;
        warrantTime += warrant.time;
    });

    let reducedFine = reductions === 0 ? totalFine : 10 * Math.round(timeAndFineReduce(totalFine, reductions / 100) / 10);
    let reducedTime = reductions === 0 ? totalTime : timeAndFineReduce(totalTime, reductions / 100, 'minus');

    if (paroleDenied) {
        reducedFine = totalFine;
        reducedTime = totalTime;
    }

    return (
        <Content
            autoHeight={true}
            title={`${civProfile.name} (#${civProfile.id})`}
            actions={(
                <div className={classes.contentActions}>
                    {/* TODO; Export Icon */}
                    <Remove onClick={() => props.removeCiv(incident, civProfile)} />
                    <Save onClick={() => props.saveCiv(incident, civProfile)} />
                </div>
            )}
        >
            <div className={classes.inputWrapperFlex} style={{ alignItems: 'unset' }}>
                <div>
                    <Chip
                        label="Edit Charges"
                        textColor="black"
                        bgColor="white"
                        style={{ marginRight: 8, marginBottom: 8 }}
                        onClick={() => {
                            const data = {
                                currentCharges: civProfile.charges.map((charge: any) => {
                                    return {
                                        ...charge,
                                        isAccomplice: charge.accomplice,
                                        isAccessory: charge.accessory
                                    }
                                }),
                                updateCharges: (charges: any) => {
                                    return props.updateCharges(charges, incident, civProfile);
                                }
                            };

                            updateMdtState({
                                modal: (state: any) => {
                                    return (
                                        <ChargesModal
                                            {...state}
                                            {...data}
                                        />
                                    )
                                },
                                modalStyle: { minHeight: '80%', minWidth: '80%' }
                            });
                        }}
                    />
                    {!!civProfile.id && charges.map((charge: any, index: number) => {
                        const chargeNames = [];
                        chargeCount[getChargeId(charge)] > 1 && chargeNames.push(`${chargeCount[getChargeId(charge)]}x`);
                        charge.accomplice ? chargeNames.push('(Ap)') : charge.accessory && chargeNames.push('(As)');
                        chargeNames.push(charge.name);
                        return (
                            <Chip
                                key={index}
                                label={chargeNames.join(' ')}
                                textColor="white"
                                bgColor="black"
                                style={{ marginRight: 8, marginBottom: 8 }}
                            />
                        )
                    })}
                </div>
            </div>
            <div className={`${classes.inputWrapperFlex} ${classes.inputWrapperBorderTop}`}>
                <Input.Checkbox
                    label="Warrant for Arrest"
                    onChange={(value: boolean) => updateField('warrant', value)}
                    checked={!!civProfile.warrant}
                />
                {!!civProfile.warrant && (
                    <Input.DatePicker
                        label="Expiration Date"
                        onChange={(value: Date) => updateField('warrant_expiry_timestamp', Math.round(value.getTime() / 1000))}
                        value={civProfile.warrant_expiry_timestamp === 0 ? Date.now() + 259200000 : civProfile.warrant_expiry_timestamp * 1000}
                    />
                )}
            </div>
            {!!civProfile.charges.length && !civProfile.warrant && !paroleDenied && (
                <div className={`${classes.inputWrapperFlex} ${classes.inputWrapperBorderTop}`}>
                    <Input.Select
                        items={[
                            {
                                id: 0,
                                name: `0% / ${totalTime} months / ${formatCurrency(totalFine)}`
                            },
                            {
                                id: 10,
                                name: `10% / ${timeAndFineReduce(totalTime, 0.1, 'minus')} months / ${formatCurrency(Math.round(timeAndFineReduce(totalFine, 0.1) / 10) * 10)}`
                            },
                            {
                                id: 25,
                                name: `25% / ${timeAndFineReduce(totalTime, 0.25, 'minus')} months / ${formatCurrency(Math.round(timeAndFineReduce(totalFine, 0.25) / 10) * 10)}`
                            },
                            {
                                id: 50,
                                name: `50% / ${timeAndFineReduce(totalTime, 0.5, 'minus')} months / ${formatCurrency(Math.round(timeAndFineReduce(totalFine, 0.5) / 10) * 10)}`
                            }
                        ]}
                        label="Reductions"
                        onChange={(value: number) => setReductions(value)}
                        value={reductions}
                    />
                </div>
            )}
            {!!civProfile.charges.length && !civProfile.warrant && (!!civProfile.warrants.length || !!paroleMonths) && (
                <div className={classes.inputWrapperFlex} style={{ alignItems: 'unset' }}>
                    {!!paroleMonths && (
                        <div style={{ maxWidth: '30%' }}>
                            <Text variant="body1">
                                Parole Violation
                            </Text>
                            <Text variant="h6">
                                {paroleMonths} months
                            </Text>
                        </div>
                    )}
                    {!!civProfile.warrants.length && (
                        <div>
                            <Text variant="body1">
                                Outstanding Warrants
                            </Text>
                            {civProfile.warrants.map((warrant: any) => {
                                <Text key={warrant.id} variant="h6">
                                    #{warrant.id}
                                </Text>
                            })}
                        </div>
                    )}
                </div>
            )}
            {!!civProfile.charges.length && !civProfile.warrant && (
                <div className={classes.inputWrapper}>
                    <Text variant="h5">
                        Final
                    </Text>
                    <Text variant="h6">
                        {reducedTime + paroleMonths + warrantTime} months {'('} +{totalTime + (reductions ? totalTime - reducedTime : 0) * 2}) {'months parole) /'} {formatCurrency(Math.round(reducedFine + warrantFine))} fine {totalPoints + warrantPoints === 0 ? null : ` / ${totalPoints + warrantPoints} point(s)`}
                    </Text>
                </div>
            )}
            {!!civProfile.charges.length && !civProfile.warrant && (
                <div className={`${classes.inputWrapperFlex} ${classes.inputWrapperBorderTop}`}>
                    <div className={classes.inputWrapper}>
                        <Input.Checkbox
                            label="Pleaded Guilty"
                            onChange={(value: boolean) => updateField('guilty', value)}
                            checked={!!civProfile.guilty}
                        />
                    </div>
                    <div className={classes.inputWrapper}>
                        <Input.Checkbox
                            label="Processed"
                            onChange={(value: boolean) => updateField('processed', value)}
                            checked={!!civProfile.processed}
                        />
                    </div>
                </div>
            )}
        </Content>
    )
}