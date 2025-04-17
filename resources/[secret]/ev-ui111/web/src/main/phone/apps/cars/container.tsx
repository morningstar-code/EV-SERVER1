import React from "react";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/phone/dev-data";
import store from "./store";
import { connect } from "react-redux";
import Cars from "./components/cars";
import { compose } from "lib/redux";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    clickable = true;

    getCars = async () => {
        const results = await nuiAction('ev-ui:getCars', {}, { returnData: devData.getCars() });
        this.props.updateState({
            list: results.data
        });

        this.clickable = true;
    }

    doAction = async (action: string, data: any) => {
        if (this.clickable) {
            this.clickable = false;

            const results = await nuiAction(`ev-ui:carAction${action}`, { car: data });

            this.clickable = true;

            this.getCars();
        }
    }

    componentDidMount() {
        this.getCars();
    }

    render() {
        return (
            <Cars {...this.props} getCars={this.getCars} doAction={this.doAction} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);