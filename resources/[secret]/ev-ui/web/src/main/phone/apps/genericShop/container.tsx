import React from "react";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import { nuiAction } from "lib/nui-comms";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    componentDidMount() {
    }

    render() {
        return (
            <></>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);