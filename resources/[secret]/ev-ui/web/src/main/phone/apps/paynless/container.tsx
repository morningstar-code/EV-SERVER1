import React from "react";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/phone/dev-data";
import Paynless from "./components/paynless";

const { mapStateToProps, mapDispatchToProps } = compose(store);

interface ContainerProps {
    character: Character;
    units: Unit[];
    updateState: (...args: any) => void;
}

class Container extends React.Component<ContainerProps> {
    getUnits = async () => {
        const results = await nuiAction('ev-storageunits:client:getUnits', {}, { returnData: devData.getUnitData() });

        this.props.updateState({
            units: results.data
        });
    }

    componentDidMount() {
        this.getUnits();
    }

    render() {
        return (
            <Paynless {...this.props} getUnits={this.getUnits} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);