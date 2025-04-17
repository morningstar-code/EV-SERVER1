import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import { nuiAction } from 'lib/nui-comms';
import Gopros from './components/gopros';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    onEvent = (data: any) => {
        this.props.updateState(data);
    }

    onShow = (data = {} as any) => {
        this.props.updateState({
            show: true,
            ...data
        });
    }

    onHide = () => {
        this.props.updateState({ show: false });
    }

    changeSelectedPov = (netId: number) => {
        nuiAction('ev-ui:goproChangeSelectedPov', {
            netId: netId
        });

        this.props.updateState({ switchingViews: true });
    }

    render() {
        return (
            <AppWrapper
                center={true}
                store={store}
                name="gopros"
                onEvent={this.onEvent}
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.props.show && (
                    <Gopros
                        {...this.props}
                        {...this.state}
                        items={this.props.dashcams.filter((item: any) => item.type === this.props.selectedType)}
                        changeSelectedPov={this.changeSelectedPov}
                    />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);