import React from "react";
import Page from "./page";
import { mdtAction, showMdtLoadingModal } from "main/mdt/actions";
import { getDefaultEvidenceCreate } from "main/mdt/store";

class Evidence extends React.Component<any> {
    timeout = null;

    state = {
        searchValue: ''
    }

    search = async (searchValue: string) => {
        this.setState({ searchValue: searchValue });
        this.props.updateState({ isSearchLoading: true, evidence: [] });

        if (!(this.state.searchValue === searchValue || searchValue.length < 3)) {
            const results = await mdtAction('getEvidence', { identifier: searchValue }, [
                {
                    id: 1,
                    type: 'other',
                    identifier: '123-ABC',
                    description: 'Something happened...',
                    tags: [],
                    cid: null,
                },
                {
                    id: 2,
                    type: 'other',
                    identifier: '123-ABC',
                    description: 'Something happened...',
                    tags: [],
                    cid: null,
                }
            ]);

            this.props.updateState({ isSearchLoading: false });

            if (results.meta.ok) {
                this.props.updateState({ evidence: results.data });
            }

            return;
        }

        clearTimeout(this.timeout);
        this.props.updateState({ isSearchLoading: false });
        return;
    }

    refreshEvidence = async (data: any) => {
        const evidence = await mdtAction('getEvidence');
        showMdtLoadingModal(false);
        this.props.updateState({ evidence: evidence.data });
    }

    selectEvidence = async (data: any) => {
        showMdtLoadingModal(true);
        const results = await mdtAction('getSingleEvidence', data, data);
        showMdtLoadingModal(false);
        results.data.cid || (results.data.cid = '')
        this.props.updateState({ evidenceSelected: results.data });
    }

    updateField = (field: any, value: any) => {
        const evidenceSelected = { ...this.props.evidenceSelected };
        evidenceSelected[field] = value;
        this.props.updateState({ evidenceSelected: evidenceSelected });
    }

    createNew = () => {
        const evidenceSelected = getDefaultEvidenceCreate();
        this.props.updateState({ evidenceSelected: evidenceSelected });
    }

    save = async () => {
        const name = 'evidenceSelected';
        if (this.props[name].identifier) {
            showMdtLoadingModal(true);
            const cid = this.props[name]?.cid ?? null;
            if (cid?.length > 0) {
                this.props[name].cid = parseInt(cid);
            } else {
                this.props[name].cid = null;
            }
            await mdtAction('editEvidence', this.props[name]);
            this.refreshEvidence(this.props[name]);
        }
        return;
    }

    changeEvidenceType = (type: any) => {
        const evidenceSelected = { ...this.props.evidenceSelected };
        evidenceSelected.type = type;
        evidenceSelected.cid || (evidenceSelected.cid = '');
        this.props.updateState({ evidenceSelected: evidenceSelected });
    }

    async componentDidMount() {
        const results = await mdtAction('getEvidence', {
            latest: true
        }, [
            {
                id: 1,
                type: 'other',
                identifier: '123-ABC',
                description: 'Something happened...',
                tags: [],
                cid: null,
            },
            {
                id: 2,
                type: 'other',
                identifier: '123-ABC',
                description: 'Something happened...',
                tags: [],
                cid: null,
            }
        ]);

        this.props.updateState({ evidence: results.data });
    }

    render() {
        return (
            <Page {...this.props} changeEvidenceType={this.changeEvidenceType} createNew={this.createNew} save={this.save} search={this.search} searchValue={this.state.searchValue} selectEvidence={this.selectEvidence} updateField={this.updateField} />
        )
    }
}

export default Evidence;