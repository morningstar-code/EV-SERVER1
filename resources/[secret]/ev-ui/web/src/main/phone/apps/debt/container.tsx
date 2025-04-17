import React from 'react';
import store from './store';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import { nuiAction } from 'lib/nui-comms';
import { devData } from 'main/phone/dev-data';
import Debt from './components/debt';

const { mapStateToProps, mapDispatchToProps } = compose(store)

class Container extends React.Component<any> {
    getDebt = async () => {
        const results = await nuiAction('ev-ui:getLoans', { type: 'character', id: this.props.character.id }, { returnData: devData.getLoans() });

        this.props.updateState({
            list: results.data ?? []
        });
    }

    getTaxes = async () => {
        const results = await nuiAction('ev-ui:getAssetTaxes', {}, { returnData: devData.getAssetTaxes() });
        this.props.updateState({
            taxes: results.data ?? null
        });
    }

    componentDidMount() {
        this.getDebt();
        //this.getTaxes();
    }

    render() {
        return (
            <Debt {...this.props} getDebt={this.getDebt} getTaxes={this.getTaxes} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)