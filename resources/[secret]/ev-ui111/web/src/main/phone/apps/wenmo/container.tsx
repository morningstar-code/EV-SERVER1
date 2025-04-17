import React from 'react';
import store from './store';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import { nuiAction } from 'lib/nui-comms';
import { devData } from 'main/phone/dev-data';
import Wenmo from './components';

const { mapStateToProps, mapDispatchToProps } = compose(store)

class Container extends React.Component<any> {
    getTransactions = async () => {
        const results = await nuiAction('ev-ui:getAccountTransactions', {
            account_id: this.props.character.bank_account_id,
            transactionType: 'venmo'
        }, { returnData: devData.getVenmoTransactions() });
        
        this.props.updateState({
            list: results.data
        });
    }

    componentDidMount() {
        this.getTransactions();
    }

    render() {
        return (
            <Wenmo {...this.props} getTransactions={this.getTransactions} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)