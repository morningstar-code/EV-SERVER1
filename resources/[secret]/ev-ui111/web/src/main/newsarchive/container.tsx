import React from "react";
import AppWrapper from "components/ui-app/ui-app";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/dev-data";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import { isDevel } from "lib/env";
import GeneralManager from "components/general-manager";
import Approvals from "./components/approvals";
import Archives from "./components/archives";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    state = {
        activeId: -1,
        show: false
    }

    onHide = () => {
        this.setState({ show: false });
    }

    onShow = () => {
        this.setState({ show: true });
    }

    render() {
        return (
            <AppWrapper
                center={true}
                store={store}
                name="newsarchive"
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.state.show && (
                    <GeneralManager
                        activeItem={this.state.activeId}
                        items={[
                            {
                                id: 1,
                                label: 'Approvals'
                            },
                            {
                                id: 2,
                                label: 'Archives'
                            }
                        ]}
                        onMenuItemClick={(item) => this.setState({ activeId: item.id })}
                    >
                        {this.state.activeId === -1 && (
                            <div></div>
                        )}
                        {this.state.activeId === 1 && (
                            <Approvals {...this.props} />
                        )}
                        {this.state.activeId === 2 && (
                            <Archives {...this.props} />
                        )}
                    </GeneralManager>
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);