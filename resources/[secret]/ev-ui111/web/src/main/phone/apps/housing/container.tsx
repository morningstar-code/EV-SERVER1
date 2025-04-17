import React from 'react';
import store from './store';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import { nuiAction } from 'lib/nui-comms';
import { devData } from 'main/phone/dev-data';
import Housing from './components/housing';

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            character: state.character
        }
    }
});

class Container extends React.Component<any> {
    getApartments = async () => {

        const results = await Promise.all([
            nuiAction('ev-ui:getCurrentApartment', {},{ returnData: devData.getCurrentApartment() }),
            nuiAction('ev-ui:getApartmentTypes', {}, { returnData: devData.getApartmentTypes() }),
        ])

        this.props.updateState({
            currentApartment: results[0].data,
            apartmentTypes: results[1].data
        });
    }

    getProperties = async () => {
        const results = await nuiAction('ev-ui:getProperties', {}, { returnData: devData.getProperties() });
        this.props.updateState({
            properties: results.data
        });
    }


    upgradeApartment = async () => {

    }

    componentDidMount() {
        this.getApartments();
        this.getProperties();
    }

    render() {
        return (
            <>
                {this.props.currentApartment ? (
                    <Housing {...this.props} getApartments={this.getApartments} getProperties={this.getProperties} upgradeApartment={this.upgradeApartment} />
                ) : null}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);