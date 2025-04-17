import React from 'react';
import useStyles from '../index.styles';
import { mdtAction, showMdtLoadingModal } from 'main/mdt/actions';
import Text from 'components/text/text';
import Input from 'components/input/input';
import Button from 'components/button/button';

export default (props: any) => {
    const classes = useStyles();
    const [vehicle, setVehicle] = React.useState({
        plate: '',
        reason: ''
    });

    const createEvidenceVehicle = async () => {
        showMdtLoadingModal(true);
        const results = await mdtAction('createEvidenceVehicle', {
            resourceType: props.resourceType,
            resourceId: props.resourceId,
            vehicle: vehicle
        });
        results && props.refreshIncident();
    }

    return (
        <div className={classes.wrapperFlex}>
            <div className={classes.modalGroup}>
                <div className={classes.modalItem}>
                    <Text variant="body2">
                        Create Vehicle
                    </Text>
                </div>
                <div className={classes.modalItem}>
                    <Input.Text
                        labeL="Plate"
                        onChange={(value: string) => setVehicle({ ...vehicle, plate: value })}
                        value={vehicle.plate}
                    />
                </div>
                <div className={classes.modalItem}>
                    <Input.Text
                        labeL="Reason"
                        icon="tag"
                        onChange={(value: string) => setVehicle({ ...vehicle, reason: value })}
                        value={vehicle.reason}
                    />
                </div>
                <div className={classes.modalItemButton}>
                    <Button.Primary onClick={createEvidenceVehicle}>
                        Create
                    </Button.Primary>
                </div>
            </div>
        </div>
    )
}