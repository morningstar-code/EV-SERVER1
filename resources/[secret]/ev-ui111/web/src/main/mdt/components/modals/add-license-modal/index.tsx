import React from 'react';
import { nuiAction } from 'lib/nui-comms';
import { devData } from 'main/dev-data';
import Modal from './modal';

class AddLicenseModal extends React.Component<any> {
    state = {
        licenses: []
    }

    async componentDidMount() {
        const results = await nuiAction('ev-ui:getAllLicenses', {}, { returnData: devData.getLicenses() });

        if (results) {
            this.setState({
                licenses: results.data
            });
        }
    }

    render() {
        return (
            <>
                {this.state.licenses.length === 0 ? null : (
                    <Modal {...this.props} licenses={this.state.licenses} />
                )}
            </>
        )
    }
}

export default AddLicenseModal;