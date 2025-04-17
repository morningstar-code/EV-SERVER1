import Button from 'components/button/button';
import Text from 'components/text/text';
import Chip from 'main/mdt/components/chip';
import Charges from 'main/mdt/components/pages/charges';
import React from 'react';
import useStyles from '../../../index.styles';

export default (props: any) => {
    const classes = useStyles(props);
    const [currentCharges, setCurrentCharges] = React.useState(props.currentCharges || []);

    const addCharge = (charge: any, isAccomplice: boolean, isAccessory: boolean) => {
        //console.log("addCharge", charge, isAccomplice, isAccessory);
        //console.log("currentCharges", currentCharges);

        const currentChargesCopy = [...currentCharges];
        currentChargesCopy.push({
            ...charge,
            isAccomplice: isAccomplice,
            isAccessory: isAccessory
        });

        //console.log("currentChargesCopy", currentChargesCopy);

        setCurrentCharges(currentChargesCopy);
    }

    return (
        <div>
            <div className={classes.flexSpaceBetween}>
                <Text variant="body1">
                    Current Charges
                </Text>
                <div className={classes.flexSpaceBetween}>
                    <Button.Secondary
                        onClick={() => props.updateState({ modal: false, modalStyle: {} })}
                        style={{ marginRight: '16px' }}
                    >
                        Close
                    </Button.Secondary>
                    <Button.Primary onClick={() => props.updateCharges(currentCharges)}>
                        Done
                    </Button.Primary>
                </div>
            </div>
            <div style={{ paddingTop: 8 }}>
                {currentCharges.map((charge: any, index: number) => {
                    //console.log("Looping currentCharges", charge, index);

                    return (
                        <Chip
                            key={index}
                            label={`${charge.isAccessory ? '(As)' : charge.isAccomplice ? '(Ap)' : ''} ${charge.name}`}
                            textColor="white"
                            bgColor="black"
                            style={{ marginRight: 8, marginBottom: 8 }}
                            onDelete={() => {
                                const newCharges = [...currentCharges];
                                newCharges.splice(index, 1);
                                setCurrentCharges(newCharges);
                            }}
                        />
                    )
                })}
            </div>
            <hr style={{ margin: '16px 0' }} />
            <Charges
                {...props}
                onAddCharge={(charge: any) => addCharge(charge, false, false)}
                onAddChargeAsAccomplice={(charge: any) => addCharge(charge, true, false)}
                onAddChargeAsAccessory={(charge: any) => addCharge(charge, false, true)}
            />
        </div>
    )
}