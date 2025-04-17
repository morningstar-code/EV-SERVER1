import React from 'react';
import ManageLoans from './components/manage-loans';
import { nuiAction } from 'lib/nui-comms';
import { devData } from 'main/dev-data';

class Container extends React.Component<any> {
    getLoans = async () => {
        const results = await nuiAction('ev-ui:getLoans', { type: 'state' }, { returnData: devData.getLoans() });
        this.props.updateState({ loans: results.data ?? [] });
    }

    componentDidMount() {
        this.getLoans();
    }

    render() {
        return (
            <ManageLoans {...this.props} />
        )
    }
}

export default Container;