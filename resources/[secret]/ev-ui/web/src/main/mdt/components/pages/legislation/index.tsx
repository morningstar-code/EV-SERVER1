import { mdtAction, showMdtLoadingModal } from "main/mdt/actions";
import React from "react";
import Page from "./page";

export const legislationMarkDownData: any = {};

class Legislation extends React.Component<any> {
    timeout = null as any;

    state = {
        searchValue: ''
    }

    search = async (searchValue: string) => {
        this.props.updateState({ isSearchLoading: true, legislations: [] })
        this.setState({ searchValue: searchValue });

        if (!(this.state.searchValue === searchValue || searchValue.length < 3)) {
            clearTimeout(this.timeout);
            //this.timeout = setTimeout(async () => {
                const results = await mdtAction('getReports', { title: searchValue, report_category_id: 7 }, [
                    {
                        description:
                            'Some bullshit',
                        evidence: [
                            {
                                id: 1,
                                type: 'other',
                                identifier: '123-ABC',
                                description:
                                    'Something happened...',
                            },
                            {
                                id: 1,
                                type: 'blood',
                                identifier: '123-ABC',
                                description:
                                    'Something happened...',
                            },
                            {
                                id: 1,
                                type: 'casing',
                                identifier: '123-ABC',
                                description:
                                    'Something happened...',
                            },
                            {
                                id: 1,
                                type: 'projectile',
                                identifier: '123-ABC',
                                description:
                                    'Something happened...',
                            },
                            {
                                id: 1,
                                type: 'glass',
                                identifier: '123-ABC',
                                description:
                                    'Something happened...',
                            },
                            {
                                id: 1,
                                type: 'vehiclefragment',
                                identifier: '123-ABC',
                                description:
                                    'Something happened...',
                            },
                            {
                                id: 1,
                                type: 'photo',
                                identifier:
                                    'https://i.imgur.com/8K92F1l.jpg',
                                description:
                                    'Something happened...',
                            },
                        ],
                        id: 1,
                        title: 'hello',
                        report_category_name:
                            'Civilian Report',
                        report_category_id: 1,
                        tags: [
                            {
                                id: 1,
                                color: 'black',
                                color_text: 'white',
                                icon: 'cannabis',
                                text: 'Basic',
                            },
                        ],
                        timestamp: 1606314143,
                    }
                ]);

                this.props.updateState({ isSearchLoading: false });

                if (results.meta.ok) {
                    return this.props.updateState({ legislations: results.data });
                }
            //}, 500);
        } else {
            this.getReports();
        }

        clearTimeout(this.timeout);
        this.props.updateState({ isSearchLoading: false });
    }

    refreshReport = async (data: any) => {
        const results = await mdtAction('getReport', data, data);
        showMdtLoadingModal(false);
        this.props.updateState({ legislation: results.data });
    }

    selectReport = (data: any) => {
        showMdtLoadingModal(true);
        this.refreshReport(data);
    }

    updateField = (field: string, value: any) => {
        const legislation = { ...this.props.legislation };
        legislation[field] = value;
        this.props.updateState({ legislation: legislation });
    }

    createNew = () => {
        this.props.updateState({
            legislation: {
                description: '',
                id: 0,
                title: ''
            }
        });
    }

    save = async () => {
        const description = typeof legislationMarkDownData[this.props.legislation.id || -1] === 'function' ? legislationMarkDownData[this.props.legislation.id || -1]() : this.props.legislation.description;
        if (this.props.legislation.title && description) {
            showMdtLoadingModal(true)
            const legislation = {
                ...this.props.legislation,
                description: description
            };
            legislation.report_category_id = 7;
            const results = await mdtAction('editReport', legislation);
            //The condition below is to check if the report being created or already exists and is being edited

            this.refreshReport(legislation.id !== undefined && legislation.id !== 0 ? legislation : { id: results.data.id })
            this.getReports();
        }
        return;
    }

    getReports = async () => {
        const results = await Promise.all([
            mdtAction('getReports', { latest: true, report_category_id: 7 }, [
                {
                    id: 1,
                    description: 'Some bullshit',
                    title: 'Incident Report',
                    template: 'Some shit go here',
                },
                {
                    id: 2,
                    description: 'Some bullshit',
                    title: 'Civilian Report',
                    template: 'Some shit go here',
                }
            ])
        ]);

        this.props.updateState({ legislations: results[0].data });
    }

    async componentDidMount() {
        const results = await Promise.all([
            mdtAction('getReports', { latest: true, report_category_id: 7 }, [
                {
                    id: 1,
                    description: 'Some bullshit',
                    title: 'Incident Report',
                    template: 'Some shit go here',
                },
                {
                    id: 2,
                    description: 'Some bullshit',
                    title: 'Civilian Report',
                    template: 'Some shit go here',
                }
            ])
        ]);

        this.props.updateState({ legislations: results[0].data });
    }

    render() {
        return (
            <Page {...this.props} createNew={this.createNew} save={this.save} search={this.search} searchValue={this.state.searchValue} updateField={this.updateField} selectReport={this.selectReport} />
        )
    }
}

export default Legislation;