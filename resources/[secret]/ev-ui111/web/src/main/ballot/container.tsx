import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import { nuiAction } from 'lib/nui-comms';
import { devData } from 'main/dev-data';
import Ballot from './components/ballot';
import { Wait } from 'utils/misc';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    state = {
        show: false
    }

    onShow = async (data: any) => {
        this.setState({ show: true });

        const selectedMap = {};
        const results = await nuiAction('ev-ui:getCurrentBallotOptions', {}, { returnData: devData.getCurrentBallotOptions() });
        
        await Wait(1000);

        results.data.forEach(option => {
            selectedMap[option.id] = option.selected || [];
        });

        this.props.updateState({
            options: results.data,
            selectedMap: selectedMap,
            loading: false
        });
    }

    onHide = () => {
        this.setState({
            show: false
        });
    }

    selectItem = (p1: number, p2: number, multi: boolean) => {
        const selectedMap = { ...this.props.selectedMap };
        const arr = multi ? selectedMap[p1] : [p2];

        if (!multi) {
            selectedMap[p1] = arr;
            
            this.props.updateState({ selectedMap: selectedMap });

            return;
        }

        const arrIdx = arr.indexOf(p2);

        arrIdx === -1 ? arr.push(p2) : arr.splice(arrIdx, 1);

        selectedMap[p1] = arr;

        this.props.updateState({ selectedMap: selectedMap });
    }

    submitBallot = async () => {
        this.props.updateState({ loading: true });

        const mappedChoices = this.props.options.map(option => {
            return {
                id: option.id,
                choices: this.props.selectedMap[option.id]
            }
        });

        await nuiAction('ev-ui:submitBallotChoices', {
            choices: mappedChoices
        });

        await Wait(1000);

        this.props.updateState({
            ballotSaved: true,
            loading: false
        });
    }

    render() {
        return (
            <AppWrapper
                center={true}
                closeOnError={true}
                name="ballot"
                onError={this.onHide}
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.state.show && (
                    <Ballot {...this.props} selectItem={this.selectItem} submitBallot={this.submitBallot} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);