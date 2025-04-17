import React from 'react';
import ManageTaxes from './components/manage-taxes';
import { nuiAction } from 'lib/nui-comms';
import { devData } from 'main/dev-data';

class Container extends React.Component<any> {
    getTaxes = async () => {
        const results = await nuiAction('ev-ui:getTaxOptions', { type: 'state' }, { returnData: devData.getTaxOptions() });
        this.props.updateState({ taxes: results.data ?? [] });
    }

    componentDidMount() {
        this.getTaxes();
    }

    render() {
        return (
            <ManageTaxes {...this.props} getTaxes={this.getTaxes} />
        )
    }
}

export default Container;