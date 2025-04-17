import React from 'react';
import ManageBallots from './components/manage-ballots';
import { nuiAction } from 'lib/nui-comms';
import { devData } from 'main/dev-data';

class Container extends React.Component<any> {
    getBallots = async () => {
        const results = await nuiAction('ev-ui:getBallots', {}, { returnData: devData.getBallots() });
        const activeBallots = results?.data?.filter((ballot: Ballot) => new Date(ballot.end_date * 1000) > new Date()) ?? [];
        const expiredBallots = results?.data?.filter((ballot: Ballot) => new Date(ballot.end_date * 1000) < new Date()) ?? [];

        return {
            activeBallots: activeBallots ?? [],
            expiredBallots: expiredBallots ?? []
        };
    }

    updateBallots = async () => {
        const ballots = await this.getBallots();
        const { activeBallots, expiredBallots } = ballots;

        this.props.updateState({
            activeBallots: activeBallots,
            expiredBallots: expiredBallots
        });
    }

    saveBallot = async (ballot: Ballot, data: any) => {
        const action = ballot.id ? 'ev-ui:editBallot' : 'ev-ui:createBallot';
        const _data = { ...data };
        
        ballot.id && (_data.id = ballot.id);
        
        const results = await nuiAction(action, _data);

        if (results.meta.ok) {
            this.updateBallots();
            return results;
        }
    }

    addBallotOption = async (ballot: Ballot, data: any) => {
        const results = await nuiAction('ev-ui:addBallotOption', {
            ...data,
            ballot_id: ballot.id
        });

        if (results.meta.ok) {
            this.updateBallots();
            return results;
        }
    }

    deleteBallot = async (ballot: Ballot, id?: number) => {
        let action = 'ev-ui:deleteBallot';
        id && (action = ''.concat(action, 'Option'));

        const results = await nuiAction(action, {
            id: id || ballot.id
        });

        if (results.meta.ok) {
            this.updateBallots();
            return results;
        }
    }

    componentDidMount() {
        this.updateBallots();
    }

    render() {
        return (
            <ManageBallots {...this.props} addBallotOption={this.addBallotOption} deleteBallot={this.deleteBallot} saveBallot={this.saveBallot} />
        )
    }
}

export default Container;