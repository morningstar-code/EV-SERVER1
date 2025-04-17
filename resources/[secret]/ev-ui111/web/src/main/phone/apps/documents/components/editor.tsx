import Input from "components/input/input";
import AppContainer from "main/phone/components/app-container";
import useStyles from "./editor.styles";
import RichMarkdownEditor from 'rich-markdown-editor';
import { editDocument, getDocumentState, saveDocument, updateDocumentsPage } from "../actions";
import { nuiAction } from "lib/nui-comms";
import { closePhoneModal, openConfirmModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import SimpleForm from "components/simple-form";

export default (props: any) => {
    const classes = useStyles();

    const handleUpdateDocument = (data: any) => {
        return props.updateState({
            document: {
                ...props.document,
                ...data
            }
        });
    }

    const isEditable = props.document.editable && props.selectedDocumentType.editable && !props.fromShare;
    const isShareable = props.selectedDocumentType.shareable && !props.fromShare;
    const isInvalidDocument = !props.document || props.document.id === -1;
    const isValidDocument = !isInvalidDocument && (!isEditable || (isShareable && !props.unlocked && !props.fromShare));
    const isNotesDocument = props.selectedDocumentType.name === 'Notes';
    const canSignDocument = props.selectedDocumentType.can_sign;

    // console.log("isInvalidDocument (should be false)", isInvalidDocument);
    // console.log("props.fromShare (should be true)", props.fromShare);
    // console.log("isEditable (should be false)", isEditable);
    // console.log("canSignDocument (should be true)", canSignDocument);

    const primaryActions = [];
    const auxActions = [];

    if (!isValidDocument && !props.fromShare) {
        primaryActions.push({
            icon: 'cloud-upload-alt',
            onClick: () => saveDocument(),
            title: 'Save'
        });
    }

    if (isValidDocument && isEditable) {
        primaryActions.push({
            icon: 'pencil-alt',
            onClick: () => editDocument(),
            title: 'Edit Document'
        });
    }

    if (!isInvalidDocument && !props.fromShare) {
        if (isNotesDocument) {
            auxActions.push({
                icon: 'qrcode',
                onClick: () => {
                    const state = getDocumentState().document;
                    nuiAction('ev-ui:dropDocument', { document: state });
                },
                title: 'Drop QR Code'
            });
        }
        auxActions.push({
            icon: 'share-alt',
            onClick: () => {
                const state = getDocumentState().document;
                nuiAction('ev-ui:shareDocumentLocal', { document: state });
            },
            title: 'Share (Local)'
        });
        if (isShareable) {
            auxActions.push({
                icon: 'share',
                onClick: () => {
                    openPhoneModal(
                        <SimpleForm
                            elements={[
                                {
                                    name: 'id',
                                    render: (prop: SimpleFormRender<number>) => {
                                        const onChange = prop.onChange;
                                        const value = prop.value;

                                        return (
                                            <Input.CityID
                                                onChange={onChange}
                                                value={value}
                                            />
                                        )
                                    }
                                }
                            ]}
                            onCancel={() => {
                                closePhoneModal(false);
                            }}
                            onSubmit={async (values) => {
                                await nuiAction('ev-ui:shareDocumentPermanent', { document: props.document, sharee_id: Number(values.id) });
                                closePhoneModal();
                            }}
                        />
                    )
                },
                title: 'Share (Permanent)'
            });
        }
        if (!isEditable && !isNotesDocument && !props.unlocked) { //!isEditable || isNotesDocument || props.unlocked
            auxActions.push({
                icon: 'stamp',
                onClick: () => {
                    openConfirmModal(
                        async () => {
                            setPhoneModalLoading();
                            const results = await nuiAction('ev-ui:finalizeDocument', { document: props.document });
                            if (results.meta.ok) {
                                props.updateState({
                                    document: {
                                        ...props.document,
                                        editable: false
                                    }
                                });
                                closePhoneModal();
                                return updateDocumentsPage(props.selectedDocumentType.id, false);
                            }

                            return setPhoneModalError(results.meta.message, true);
                        },
                        'Are you sure? This cannot be undone'
                    )
                },
                title: 'Finalize'
            });
        }
        if (!isEditable && canSignDocument) {
            auxActions.push({
                icon: 'pen-nib',
                onClick: () => {
                    props.updateState({ page: 'signatures' });
                },
                title: 'Signatures'
            });
        }
        auxActions.push({
            icon: 'trash',
            onClick: () => {
                openConfirmModal(
                    async () => {
                        setPhoneModalLoading();
                        await nuiAction('ev-ui:deleteDocument', { document: props.document });
                        closePhoneModal();
                        updateDocumentsPage(props.selectedDocumentType.id);
                    },
                    'Are you sure? This cannot be undone'
                )
            },
            title: 'Delete'
        });
    }

    if (!isInvalidDocument && props.fromShare && !isEditable && canSignDocument) { //This should show on vehicle regs
        auxActions.push({
            icon: 'pen-nib',
            onClick: () => {
                props.updateState({ page: 'signatures' });
            },
            title: 'Signatures'
        });
    }

    return (
        <AppContainer
            fadeIn={false}
            onClickBack={() => {
                props.updateState({
                    fromShare: false,
                    page: 'home'
                });
            }}
            primaryActions={primaryActions}
            auxActions={auxActions}
            titularInput={(
                <Input.Text
                    icon="tags"
                    label="Title"
                    onChange={(e) => handleUpdateDocument({ title: e })}
                    value={props.document.title}
                />
            )}
        >
            <div className={classes.markdownWrapper}>
                <RichMarkdownEditor
                    key={props.document.id}
                    dark={true}
                    readOnly={isValidDocument}
                    onChange={(value: Function) => handleUpdateDocument({ content: value() })}
                    placeholder="Document content goes here..."
                    defaultValue={props.document.content}
                    // onClickLink={() => { }}
                    // embeds={[]}
                    // tooltip={null}
                    style={{ background: 'transparent' }}
                />
            </div>
        </AppContainer>
    )
}