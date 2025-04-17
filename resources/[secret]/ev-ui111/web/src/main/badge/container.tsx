import React from "react";
import AppWrapper from "components/ui-app/ui-app";
import { nuiAction } from "lib/nui-comms";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import Badge from "./components/badge";

const { mapStateToProps, mapDispatchToProps } = compose(store)

class Container extends React.Component<any> {
    onShow = (data: any) => {
        this.props.updateState({
            ...data,
            mount: true
        });

        setTimeout(() => {
            this.props.updateState({
                mount: false
            });
        }, 5000);
    }

    render() {
        return (
            <AppWrapper
                name="badge"
                onShow={this.onShow}
                zIndex={1000}
            >
                {this.props.mount && (
                    <Badge {...this.props} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);