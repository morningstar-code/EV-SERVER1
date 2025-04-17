import React from 'react';
import Input from 'components/input/input';
import AppContainer from 'main/phone/components/app-container';
import { getDocumentContent, updateDocumentAppState, updateDocumentsPage } from '../actions';
import store from '../store';
import Document from './document';

export default (props: any) => {
    const [list, setList] = React.useState(props.list);
    const [selectedDocumentTypeId, setSelectedDocumentTypeId] = React.useState(props.selectedDocumentType.id);

    React.useEffect(() => {
        setList(props.list);
    }, [props.list]);

    React.useEffect(() => {
        updateDocumentsPage(selectedDocumentTypeId, true);
    }, [selectedDocumentTypeId]);

    const primaryActions = [];

    if (props.selectedDocumentType.editable) {
        primaryActions.push({
            icon: 'edit',
            title: 'Create New',
            onClick: () => {
                updateDocumentAppState({
                    document: store.initialState.document,
                    page: 'editing'
                });
            }
        });
    }

    return (
        <AppContainer
            primaryActions={primaryActions}
            search={{
                filter: ['title'],
                list: props.list,
                onChange: setList
            }}
        >
            <div style={{ marginBottom: 16 }}>
                <Input.Select
                    items={props.documentTypes}
                    label="Type"
                    onChange={(e) => setSelectedDocumentTypeId(e)}
                    value={props.selectedDocumentType.id}
                />
            </div>
            {list && list.length > 0 && list.map((document: any) => (
                <Document key={document.id} document={document} onClick={() => getDocumentContent(document)} />
            ))}
        </AppContainer>
    )
}