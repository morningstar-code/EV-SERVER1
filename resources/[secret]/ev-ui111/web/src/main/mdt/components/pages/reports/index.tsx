import React from "react";
import Page from "./page";
import { hasMdtPermission, mdtAction, showMdtLoadingModal, updateMdtState } from "main/mdt/actions";

export const reportMarkDownData: any = {};

class Reports extends React.Component<any> {
    timeout = null;

    state = {
        searchValue: ''
    }

    search = async (searchValue: string) => {
        this.setState({ searchValue: searchValue });
        this.props.updateState({ isSearchLoading: true, reports: [] });

        if (!(this.state.searchValue === searchValue || searchValue.length < 3)) {
            clearTimeout(this.timeout);
            //this.timeout = setTimeout(async () => {
                const results = await mdtAction('searchReports', { title: searchValue }, [
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
                    const filteredReports = results.data.filter((report: any) => {
                        return report.report_category_id !== 1 && report.report_category_id !== 7 && hasMdtPermission('reports.viewCategory', report.report_category_id);
                    });

                    this.props.updateState({
                        reports: filteredReports,
                        searchCategorySelected: this.props.searchCategories[0]
                    });
                }

                return;
            //}, 1000);
        } else {
            this.getReports(this?.props?.reportCategorySelected?.id ?? null); //Doesn't work? For some reason id is 2? (BOLO?)
        }

        clearTimeout(this.timeout);
        this.props.updateState({ isSearchLoading: false });
    }

    refreshReport = async (data: any) => {
        const results = await mdtAction('getReport', data, data);
        const report = results.data;
        const reportCategorySelected = this.props.reportCategories.find((category: any) => category.id === report.report_category_id);
        showMdtLoadingModal(false);

        this.props.updateState({
            report: {
                ...report,
            },
            reportCategorySelected: reportCategorySelected
        });
    }

    selectReport = (data: any) => {
        showMdtLoadingModal(true);
        this.refreshReport(data);
    }

    updateField = (field: any, value: any) => {
        const report = { ...this.props.report };
        report[field] = value;
        this.props.updateState({ report: report });
    }

    createNew = () => {
        const defaultReport = {
            description: '',
            id: 0,
            title: ''
        };

        const reportCategorySelected = this.props.reportCategories.find((category: any) => category.id === this.props.reportCategorySelected.id);

        defaultReport.description = reportCategorySelected.template;

        this.props.updateState({ report: defaultReport });
    }

    export = () => {
        //TODO;
    }

    promote = async () => {
        const description = typeof reportMarkDownData[this.props.report.id || -1] === 'function' ? reportMarkDownData[this.props.report.id || -1]() : this.props.report.description;
        if (this.props.report.title && description) {
            showMdtLoadingModal(true);
            const results = await mdtAction('promoteReport', { id: this.props.report.id });
            showMdtLoadingModal(false);
            if (results) {
                this.createNew();
                updateMdtState({ page: 'Incidents' }, this.props.storeKey);
                updateMdtState({ incident: results.data }, `${this.props.storeKey}.Incidents`);
            }
        }
        return;
    }

    save = async () => {
        const description = typeof reportMarkDownData[this.props.report.id || -1] === 'function' ? reportMarkDownData[this.props.report.id || -1]() : this.props.report.description;
        if (this.props.report.title && description) {
            showMdtLoadingModal(true);
            const report = {
                ...this.props.report,
                description: description
            };
            report.report_category_id = this.props.reportCategorySelected.id;
            const results = await mdtAction('editReport', report);
            this.refreshReport(report.id !== undefined && report.id !== 0 ? report : { id: results.data.id ?? results.data.insertId })
            this.getReports(this?.props?.reportCategorySelected?.id ?? null);
        }
        return;
    }

    changeReportCategory = (categoryId: string) => {
        const reportCategorySelected = this.props.reportCategories.find((category: any) => category.id === categoryId);
        const report = { ...this.props.report };
        if (!report.description) {
            report.description = reportCategorySelected.template;
        }
        this.props.updateState({
            report: report,
            reportCategorySelected: reportCategorySelected
        });
    }

    changeSearchCategory = async (categoryId: string) => {
        this.setState({ searchValue: '' });
        const searchCategorySelected = this.props.searchCategories.find((category: any) => category.id === categoryId);
        const reports = await this.getReports(categoryId);
        this.props.updateState({
            reports: reports,
            searchCategorySelected: searchCategorySelected
        });
    }

    getReports = async (id: any) => {
        const results = await mdtAction('getReports', {
            latest: true,
            report_category_id: id
        }, [
            {
                id: 1,
                title: 'Report 1',
                created_by_name: 'John Doe',
                report_category_name: 'Civilian Report',
                timestamp: (Date.now() - 1000000) / 1000
            },
            {
                id: 2,
                title: 'Report 2',
                created_by_name: 'John Doe',
                report_category_name: 'Incident Report',
                timestamp: (Date.now() - 2000000) / 1000
            }
        ]);

        const filteredReports = results.data.filter((report: any) => {
            return report.report_category_id !== 1 && report.report_category_id !== 7 && hasMdtPermission('reports.viewCategory', report.report_category_id);
        });

        return filteredReports;
    }

    async componentDidMount() {
        const results = await mdtAction('getReportCategories', {}, [
            {
                id: 1,
                description: 'Some bullshit',
                name: 'Incident Report',
                template: 'Some shit go here',
            },
            {
                id: 2,
                description: 'Some bullshit',
                name: 'Civilian Report',
                template: 'Some shit go here',
            }
        ]);

        const filteredResults = results.data.filter((category: any) => {
            return category.id !== 1 && category.id !== 7 && hasMdtPermission('reports.viewCategory', category.id);
        });

        const reports = await this.getReports(null);
        const searchCategories = [
            {
                id: 0,
                name: 'All',
                description: 'All reports',
                template: '',
                deleted: 0
            },
            ...filteredResults
        ];

        this.props.updateState({
            searchCategories: searchCategories,
            reports: reports,
            reportCategories: filteredResults,
            searchCategorySelected: searchCategories[0],
            reportCategorySelected: this.props.report && this.props.report.report_category_id ? filteredResults.find((category: any) => category.id === this.props.report.report_category_id) : filteredResults[0] //filteredResults[1]
        });
    }

    render() {
        return (
            <>
                {this.props.reportCategories.length === 0 ? null : (
                    <Page {...this.props} changeReportCategory={this.changeReportCategory} changeSearchCategory={this.changeSearchCategory} createNew={this.createNew} promote={this.promote} save={this.save} search={this.search} searchValue={this.state.searchValue} selectReport={this.selectReport} updateField={this.updateField} refreshReport={this.refreshReport} getReports={this.getReports} />
                )}
            </>
        )
    }
}

export default Reports;