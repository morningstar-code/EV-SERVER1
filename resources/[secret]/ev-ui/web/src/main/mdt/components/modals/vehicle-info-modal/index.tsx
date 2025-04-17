import React from 'react';
import Modal from './modal';
import { mdtAction, showMdtLoadingModal } from 'main/mdt/actions';

class VehicleInfoModal extends React.Component<any> {
    saveVehicleData = (data: { vehicle: { plate: string, vin: string }, type: string, vin: string, value: string }) => {
        mdtAction('changeVehicleData', data, {});
    }

    saveImpoundData = async (data: { id: number, strike: number, locked_until: number, release_paid: number, released: number, release_date: number }) => {
        showMdtLoadingModal(true);
        await mdtAction('updateImpoundData', data, {});
        showMdtLoadingModal(false);
        this.props.refreshProfile();
    }

    mapHoldLength = (data: { locked_until: number, impound_date: number }) => {
        const timestamp = data.locked_until - data.impound_date;
        const hours = Math.floor(timestamp / 3600);
        return ` - held for ${hours} hours`;
    }

    async componentDidMount() {
        const impounds = await mdtAction('getVehicleImpounds', { vin: this.props.vehicle.vin }, { returnData: [
            {
                id: '1',
                report_id: '1',
                impound_date: Date.now() - 60000 * 5,
                first_name: 'Bozo',
                last_name: 'Da Clown',
                reason: 'Being a bozo',
                locked_until: 1664096604,
                released: false,
                release_paid: false,
                strike: 0
            }
        ] });
        const history = await mdtAction('getVehicleOwnershipHistory', { vin: this.props.vehicle.vin }, { returnData: [
            {
                seller_name: 'Kevin Malagnaggi',
                owner_name: 'Bozo Da Clown',
                sell_price: 1000000,
                transferred_at: '2022-09-21'
            }
        ] });

        if (impounds || history) {
            this.props.updateState({
                impounds: impounds.data,
                vehicleHistory: history.data
            });
        }
    }

    render() {
        return (
            <Modal {...this.props} saveVehicleData={this.saveVehicleData} mapHoldLength={this.mapHoldLength} saveImpoundData={this.saveImpoundData} />
        )
    }
}

export default VehicleInfoModal;