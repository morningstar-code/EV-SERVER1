import { isJob } from "lib/character";
import { mdtAction, showMdtLoadingModal, updateMdtStore } from "main/mdt/actions";
import React from "react";
import Page from "./page";

class Dashboard extends React.Component<any> {
    timeout = null;

    state = {
        searchValue: ''
    }

    selectWarrant = async (warrant: any) => {
        if (isJob(['judge', 'police'])) {
            showMdtLoadingModal(true);

            const results = await mdtAction('getIncident', { id: warrant.incident_id }, {
                id: 1,
                title: 'Sagde',
                description: 'Wanna fup?',
                tags: [],
                officers: [],
                evidence: [],
                civs: []
            });

            if (results.meta.ok) {
                updateMdtStore({ page: 'Incidents' }, this.props.storeKey);
                updateMdtStore({ incident: results.data }, `${this.props.storeKey}.Incidents`);
                showMdtLoadingModal(false);
            }
        }

        return;
    }

    selectReport = async (report: any) => {
        if (isJob(['judge', 'police'])) {
            showMdtLoadingModal(true);

            const results = await mdtAction('getReport', report, {
                id: 1,
                title: 'Sagde',
                description: 'Wanna fup?',
                tags: [],
                officers: [],
                evidence: [],
                civs: []
            });

            if (results.meta.ok) {
                updateMdtStore({ page: 'Reports' }, this.props.storeKey);
                updateMdtStore({ report: results.data }, `${this.props.storeKey}.Reports`);
                showMdtLoadingModal(false);
            }
        }
    }

    async componentDidMount() {
        const results = await Promise.all([
            mdtAction('getWarrants', {}, [
                {
                    incident_id: 1,
                    incident_title: 'Some shit happened...',
                    warrant_expiry_timestamp: 1663781472,
                    civ_name: 'Devlin Weloper',
                    profile_image_url: 'https://i.imgur.com/ttNVaPp.png'
                }
            ]),
            mdtAction('getBolos', {}, [
                {
                    description: 'Some shit',
                    id: 2,
                    timestamp: 1663781472,
                    title: 'Johan Schmorgeun' //Possibly title is author
                }
            ]),
            mdtAction('getBulletins', {}, [
                {
                    description: 'Hello this is some shit\n          Hello\n          WHATS UP\n          123\n          123\n          ',
                    id: 3,
                    title: 'Johan Schmorgeun', //Possibly title is author
                    timestamp: 1663781472,
                }
            ]),
        ]);
        
        this.props.updateState({
            bolos: results[1].data,
            bulletins: results[2].data,
            warrants: results[0].data
        });
    }

    render() {
        return (
            <Page {...this.props} selectReport={this.selectReport} selectWarrant={this.selectWarrant} />
        )
    }
}

export default Dashboard;