import React from 'react';
import ManageAccounts from './components/manage-accounts';
import { nuiAction } from 'lib/nui-comms';
import { devData } from 'main/dev-data';

class Container extends React.Component<any> {
    async componentDidMount() {
        const results = await nuiAction('ev-ui:getAccountTypes', {}, { returnData: devData.getAccountTypes() });
        this.props.updateState({ accountTypes: results.data ?? [] });
    }

    render() {
        return this.props.accountTypes.length === 0 ? null
            : <ManageAccounts {...this.props} />
    }
}

export default Container;