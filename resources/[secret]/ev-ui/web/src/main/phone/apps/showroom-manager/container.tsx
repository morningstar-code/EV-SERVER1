import React from "react";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/phone/dev-data";
import ShowroomManager from "./components/showroom-manager";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    async componentDidMount() {
        const results = await nuiAction('ev-ui:showroomGetCarConfig', {}, { returnData: devData.showroomGetCarConfig() });

        if (results.data) {
            const filteredCars = results.data.filter(car => {
                return !car.owner_only;
            });

            this.props.updateState({ cars: filteredCars });
        }
    }

    render() {
        return (
            <>
                {this.props.cars.length === 0 ? null : <ShowroomManager {...this.props} />}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);