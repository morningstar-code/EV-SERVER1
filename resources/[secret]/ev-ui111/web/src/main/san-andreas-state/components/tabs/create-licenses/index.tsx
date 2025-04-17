import React from 'react';
import CreateLicenses from './components/create-licenses';
import { nuiAction } from 'lib/nui-comms';
import { devData } from 'main/dev-data';

class Container extends React.Component<any> {
    getLicenses = async () => {
        const results = await nuiAction('ev-ui:getAllLicenses', {}, { returnData: devData.getLicenses() });
        this.props.updateState({ licenses: results.data ?? [] });
    }

    componentDidMount() {
        this.getLicenses();
    }

    render() {
        return (
            <CreateLicenses {...this.props} getLicenses={this.getLicenses} />
        )
    }
}

export default Container;