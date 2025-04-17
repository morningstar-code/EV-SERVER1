import React from 'react';
import MountedTab from './mounted-tab';
import { updateState } from 'main/actions';
import { mdtPages } from '../';
import { mdtDashboardInitState, mdtProfilesInitState } from '../';

class Tab extends React.Component<any> {
    componentDidMount() {
        if (!this.props.tabMounted) {
            const pagesReduced = mdtPages.reduce((acc, page) => {
                return {
                    ...acc,
                    [`${this.props.storeKey}.${page.name}`]: page.initialState
                }
            }, {});

            updateState({
                ...pagesReduced,
                [this.props.storeKey]: {
                    ...this.props.publicApp ? mdtProfilesInitState : mdtDashboardInitState,
                    storeKey: this.props.storeKey
                },
            });
        }
    }

    componentWillUnmount() {
        const pagesReduced = mdtPages.reduce((acc, page) => {
            return {
                ...acc,
                [`${this.props.storeKey}.${page.name}`]: null
            }
        }, {});

        updateState({
            ...pagesReduced,
            [this.props.storeKey]: null
        });
    }

    render() {
        return (
            <>
                {this.props.tabMounted ? (
                    <MountedTab {...this.props} />
                ) : null}
            </>
        );
    }
}

export default Tab;