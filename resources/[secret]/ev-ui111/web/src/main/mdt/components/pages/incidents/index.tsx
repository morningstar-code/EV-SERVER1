import { mdtAction, showMdtLoadingModal } from "main/mdt/actions";
import { getDefaultIncident } from "main/mdt/store";
import React from "react";
import Page from "./page";

export const incidentMarkDownData: any = {};

class Incidents extends React.Component<any> {
    overrideComplete = false;
    timeout = null;

    state = {
        overrideSearchValue: '',
        searchValue: ''
    }

    search = async (searchValue: string) => {
        this.setState({ overrideSearchValue: searchValue, searchValue: searchValue });
        this.props.updateState({ isSearchLoading: true, incidents: [], overrideSearchValue: false });

        if (!(this.state.searchValue === searchValue || searchValue.length < 3)) {
            const results = await mdtAction('searchIncidents', { search: searchValue }, [
                {
                    id: 1,
                    created_by_name: 'D W',
                    title: 'Whatever',
                    timestamp: 1606482823,
                    report_category_name:
                        'Incident Report',
                    civs: [],
                    officers: [],
                    evidence: [],
                    tags: [],
                }
            ]);

            this.props.updateState({ isSearchLoading: false });

            if (results.meta.ok) {
                this.props.updateState({ incidents: results.data });
            }

            return;
        }

        clearTimeout(this.timeout);
        this.props.updateState({ isSearchLoading: false });
        return;
    }

    refreshIncident = async (data: any, returnData = null) => {
        const results = await mdtAction('getIncident', data, returnData || data);
        showMdtLoadingModal(false);
        this.props.updateState({ incident: results.data });
    }

    refreshIncidents = async () => {
        const results = await mdtAction('getIncidents', { latest: true });
        showMdtLoadingModal(false);
        this.props.updateState({ incidents: results.data });
    }

    selectIncident = (data: any) => {
        showMdtLoadingModal(true);
        this.refreshIncident(data);
    }

    updateField = (field: any, value: any) => {
        const incident = { ...this.props.incident };
        incident[field] = value;
        this.props.updateState({ incident: incident });
    }

    createNew = () => {
        const incident = getDefaultIncident(this.props.myProfile, this.props.character);
        this.props.updateState({ incident: {
            ...incident
        } });
    }

    save = async () => {
        const name = 'incident';
        const description = typeof incidentMarkDownData[this.props[name].id || -1] === 'function' ? incidentMarkDownData[this.props[name].id || -1]() : this.props[name].description;
        if (this.props[name].title) {
            showMdtLoadingModal(true);
            const results = await mdtAction('editIncident', {
                ...this.props[name],
                description: description || ''
            }, { id: 1 });
            this.refreshIncident(results.data, getDefaultIncident(this.props.myProfile, 1));
            this.refreshIncidents();
        }
        return;
    }

    removeCiv = async (incident: any, civ: any) => {
        showMdtLoadingModal(true);
        await mdtAction('removeIncidentCiv', { incident_id: incident.id, profile_civ_id: civ.id });
        this.refreshIncident(incident);
    }

    exportCiv = async (incident: any, profile: any) => {
        showMdtLoadingModal(true);
        const results = await mdtAction('exportIncidentCiv', { incident_id: incident.id, profile_id: profile.id });
        showMdtLoadingModal(false);
        if (results.data.length !== 0 && results.data !== 'nothing returned') {
            //TODO; IDC (_0x30af5c here (a modal for exported link?))
        }
        return;
    }

    saveCiv = async (incident: any, civ: any) => {
        showMdtLoadingModal(true);
        await mdtAction('editIncidentCiv', {
            ...civ,
            incident_id: incident.id,
            profile_civ_id: civ.id
        }, {});
        this.refreshIncident(incident);
    }

    addCiv = async (civ: any) => {
        const incident = this.props.incident;
        showMdtLoadingModal(true);
        await mdtAction('editIncidentCiv', {
            incident_id: incident.id,
            profile_civ_id: civ.id,
            guilty: 0,
            warrant: 0,
            warrant_expiry_timestamp: 0,
            processed: 0,
            processed_by: 0
        }, {});
        this.refreshIncident(incident);
    }

    updateCharges = async (charges: any, incident: any, civ: any) => {
        showMdtLoadingModal(true);
        await mdtAction('editIncidentCivCharges', {
            charges: charges,
            incident_id: incident.id,
            profile_civ_id: civ.id
        }, {});
        this.refreshIncident(incident);
    }

    async componentDidMount() {
        const results = await mdtAction('getIncidents', { latest: true }, [
            {
                civs: [
                    {
                        charge_accessory: 0,
                        charge_accessory_deny_parole: 0,
                        charge_accessory_fine: 0,
                        charge_accessory_points: 0,
                        charge_accessory_time: 0,
                        charge_accomplice: 0,
                        charge_accomplice_deny_parole: 0,
                        charge_accomplice_fine: 0,
                        charge_accomplice_points: 0,
                        charge_accomplice_time: 0,
                        charge_deny_parole: 0,
                        charge_fine: 20,
                        charge_id: 3,
                        charge_name: 'Being mean',
                        charge_points: 5,
                        charge_row_id: 114,
                        charge_time: 20,
                        charges: [
                            {
                                accessory: 0,
                                accessory_fine: 0,
                                accessory_points: 0,
                                accessory_time: 0,
                                accomplice: 0,
                                accomplice_fine: 0,
                                accomplice_points: 0,
                                accomplice_time: 0,
                                deny_parole: 0,
                                fine: 20,
                                id: 3,
                                name: 'Being mean',
                                points: 5,
                                row_id: 114,
                                time: 20,
                            },
                            {
                                accessory: 0,
                                accessory_fine: 0,
                                accessory_points: 0,
                                accessory_time: 0,
                                accomplice: 0,
                                accomplice_fine: 0,
                                accomplice_points: 0,
                                accomplice_time: 0,
                                deny_parole: 0,
                                fine: 20,
                                id: 3,
                                name: 'Being mean',
                                points: 5,
                                row_id: 115,
                                time: 20,
                            },
                            {
                                accessory: 0,
                                accessory_fine: 0,
                                accessory_points: 0,
                                accessory_time: 0,
                                accomplice: 0,
                                accomplice_fine: 0,
                                accomplice_points: 0,
                                accomplice_time: 0,
                                deny_parole: 0,
                                fine: 20,
                                id: 3,
                                name: 'Being mean',
                                points: 5,
                                row_id: 116,
                                time: 20,
                            },
                            {
                                accessory: 0,
                                accessory_fine: 0,
                                accessory_points: 0,
                                accessory_time: 0,
                                accomplice: 0,
                                accomplice_fine: 0,
                                accomplice_points: 0,
                                accomplice_time: 0,
                                deny_parole: 0,
                                fine: 20,
                                id: 6,
                                name: 'Being mean deny parole',
                                points: 5,
                                row_id: 117,
                                time: 20,
                            },
                            {
                                accessory: 1,
                                accessory_fine: 10,
                                accessory_points: 2,
                                accessory_time: 10,
                                accomplice: 0,
                                accomplice_fine: 0,
                                accomplice_points: 0,
                                accomplice_time: 0,
                                deny_parole: 0,
                                fine: 20,
                                id: 8,
                                name: 'Being mean a',
                                points: 5,
                                row_id: 118,
                                time: 20,
                            },
                            {
                                accessory: 1,
                                accessory_fine: 10,
                                accessory_points: 2,
                                accessory_time: 10,
                                accomplice: 0,
                                accomplice_fine: 0,
                                accomplice_points: 0,
                                accomplice_time: 0,
                                deny_parole: 0,
                                fine: 20,
                                id: 8,
                                name: 'Being mean a',
                                points: 5,
                                row_id: 119,
                                time: 20,
                            },
                            {
                                accessory: 0,
                                accessory_fine: 1,
                                accessory_points: 1,
                                accessory_time: 1,
                                accomplice: 1,
                                accomplice_fine: 10,
                                accomplice_points: 1,
                                accomplice_time: 10,
                                deny_parole: 0,
                                fine: 1,
                                id: 2,
                                name: 'Calling it the MDT!',
                                points: 1,
                                row_id: 120,
                                time: 1,
                            },
                            {
                                accessory: 0,
                                accessory_fine: 1,
                                accessory_points: 1,
                                accessory_time: 1,
                                accomplice: 1,
                                accomplice_fine: 10,
                                accomplice_points: 1,
                                accomplice_time: 10,
                                deny_parole: 0,
                                fine: 1,
                                id: 2,
                                name: 'Calling it the MDT!',
                                points: 1,
                                row_id: 121,
                                time: 1,
                            },
                        ],
                        civ_id: 2,
                        civ_name: 'D W',
                        drivers_points: 42,
                        fine_applied: 0,
                        guilty: 0,
                        id: 2,
                        incident_id: 1033,
                        name: 'D W',
                        parole_end_timestamp: 0,
                        processed: 0,
                        processed_by: 0,
                        profile_civ_id: 2,
                        resource_link_id_tag: 173,
                        tag_color: 'blue',
                        tag_color_text: 'yellow',
                        tag_icon: 'tag',
                        tag_id: 16,
                        tag_text: 'UY1Y6Y58',
                        tags: [
                            // {
                            //     color: 'blue',
                            //     color_text: 'yellow',
                            //     icon: 'tag',
                            //     id: 16,
                            //     resource_link_id: 173,
                            //     text: 'UY1Y6Y58',
                            // },
                            // {
                            //     color: 'black',
                            //     color_text: 'white',
                            //     icon: 'tag',
                            //     id: 7,
                            //     resource_link_id: 174,
                            //     text: 'test',
                            // },
                        ],
                        warrant: 0,
                        warrant_expiry_timestamp: 0,
                        warrants: [{
                            fine: 0,
                            id: 1032,
                            points: 0,
                            time: 0
                        }],
                    },
                ],
                created_by: 2,
                created_by_name: 'D W',
                description: 'testeeeee',
                evidence: [
                    {
                        type: 'photo',
                        identifier: 'https://i.imgur.com/9LMCSuQ.png',
                        description: 'ww',
                    },
                ],
                id: 1033,
                officers: [],
                persons: [],
                vehicles: [],
                report_category_id: 1,
                report_category_name: 'Incident Report',
                tags: [
                    // {
                    //     color: 'blue',
                    //     color_text: 'yellow',
                    //     icon: 'tag',
                    //     id: 16,
                    //     resource_link_id: 173,
                    //     text: 'UY1Y6Y58',
                    // }
                ],
                timestamp: 1607877868,
                title: 'Testerrrrr',
            },
            {
                id: 1,
                created_by_name: 'D W',
                title: 'Whatever',
                timestamp: 1606482823,
                report_category_name: 'Incident Report',
                civs: [],
                officers: [],
                persons: [],
                vehicles: [],
                evidence: [],
                tags: [],
            }
        ]);

        this.props.updateState({ incidents: results.data });

        //console.log("incident id", this?.props?.incident?.id);
        if (this?.props?.incident?.id === undefined || this?.props?.incident?.id === 0) { //TODO; Fix?
            //console.log('no incident id, creating new with template');
            this.createNew();
        }
    }

    componentDidUpdate(prevProps: Readonly<any>) {
        if (!this.overrideComplete && prevProps.overrideSearchValue && prevProps.overrideSearchValue !== this.state.overrideSearchValue) {
            this.overrideComplete = true;
            this.search(prevProps.overrideSearchValue);
        }
    }

    keyup(e: any) {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            this.save();
        }
    }

    render() {
        return (
            <Page {...this.props} createNew={this.createNew} removeCiv={this.removeCiv} save={this.save} addCiv={this.addCiv} saveCiv={this.saveCiv} exportCiv={this.exportCiv} search={this.search} searchValue={this.state.searchValue} selectIncident={this.selectIncident} updateField={this.updateField} updateCharges={this.updateCharges} onKeyUp={this.keyup} refreshIncident={this.refreshIncident} refreshIncidents={this.refreshIncidents} />
        )
    }
}

export default Incidents;