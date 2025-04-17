import Input from 'components/input/input';
import AppContainer from 'main/phone/components/app-container';
import useStyles from './editor.styles';
import { closePhoneModal, openConfirmModal, setPhoneModalError, setPhoneModalLoading } from 'main/phone/actions';
import { nuiAction } from 'lib/nui-comms';
import RichMarkdownEditor from 'rich-markdown-editor';
import { Tooltip } from "@mui/material";
import { updatLifeInvaderAppState } from '../actions';

interface LifeInvaderEditorProps {
    email: LifeInvaderEmail;
    category: LifeInvaderCategory;
    character: Character;
    getEmails: (categoryId?: string, id?: number) => void;
    updateState: (data: any) => void;
}

export default (props: LifeInvaderEditorProps) => {
    const classes = useStyles();

    const updateEmail = (email: any) => {
        return props.updateState({
            email: {
                ...props.email,
                ...email
            }
        })
    }

    const notEmailOrIsDraft = !props.email || props.email.category === 'draft';
    const invalidEmail = !props.email || props.email.id === -1;

    const shouldShowTo = notEmailOrIsDraft || props?.email?.category === 'sent';
    const shouldShowFrom = !notEmailOrIsDraft || props?.email?.category !== 'sent';
    const shouldShowCC = props?.email?.cc?.length > 0 || notEmailOrIsDraft;

    const primaryActions = [];
    const auxActions = [];

    switch (props?.email?.category) {
        case 'inbox':
            primaryActions.push({
                title: 'Reply',
                icon: 'reply',
                onClick: () => {
                    updateEmail({
                        id: -1,
                        title: `RE: ${props.email.title}`,
                        category: 'draft',
                        sender: props.character.email,
                        to: props.email.sender,
                        cc: [],
                        body: `Reply to\n ${props.email.body.split('\n').map((line: string) => `> ${line}`).join('\n')}`
                    });
                }
            });
            if (props?.email?.cc && props.email.cc.length > 0) {
                primaryActions.push({
                    title: 'Reply All',
                    icon: 'reply-all',
                    onClick: () => {
                        updateEmail({
                            id: -1,
                            title: `RE: ${props.email.title}`,
                            category: 'draft',
                            sender: props.character.email,
                            to: props.email.sender,
                            cc: props.email.cc.filter((email: string) => email !== props.character.email),
                            body: `Reply to\n ${props.email.body.split('\n').map((line: string) => `> ${line}`).join('\n')}`
                        });
                    }
                });
            }
            break;
        case 'sent':
            break;
        case 'draft':
            primaryActions.push({
                title: 'Send',
                icon: 'paper-plane',
                onClick: () => {
                    openConfirmModal(
                        async () => {
                            setPhoneModalLoading();
                            if (props.email.id !== -1) { //Sending a draft
                                updateEmail({ category: 'sent' });

                                const results = await nuiAction<ReturnData>("ev-ui:li:sendEmail", { email: props.email });

                                if (results.meta.ok) {
                                    await nuiAction("ev-ui:li:sentEmail", {
                                        to: props.email.to,
                                        cc: props.email.cc,
                                        title: props.email.title
                                    });

                                    closePhoneModal();

                                    props.getEmails(props.category.id);

                                    return;
                                }

                                return setPhoneModalError(results.meta.message, true);
                            } else {
                                updateEmail({ category: 'sent' });

                                const results = await nuiAction<ReturnData<{ insertId: number }>>("ev-ui:li:createEmail", {
                                    email: {
                                        ...props.email,
                                        category: 'sent'
                                    }
                                });

                                if (results.meta.ok) {
                                    props.email.id = results.data.insertId;

                                    await nuiAction("ev-ui:li:sentEmail", {
                                        to: props.email.to,
                                        cc: props.email.cc,
                                        title: props.email.title
                                    });

                                    closePhoneModal();

                                    props.getEmails(props.category.id, results.data.insertId);

                                    return;
                                }

                                return setPhoneModalError(results.meta.message, true);
                            }
                        },
                        "Are you sure? This cannot be undone"
                    );
                }
            });
            if (!invalidEmail) {
                primaryActions.push({
                    title: 'Save',
                    icon: 'save',
                    onClick: async () => {
                        setPhoneModalLoading();

                        const results = await nuiAction('ev-ui:li:updateEmail', { email: props.email });

                        if (results.meta.ok) {
                            closePhoneModal();
                            props.getEmails('draft');
                            props.updateState({ page: 'home', category: { id: 'draft' } });
                            return;
                        }

                        setPhoneModalError(results.meta.message, true);
                    }
                });
            }
            break;
    }

    if (!invalidEmail || props.email.category === 'trash') {
        auxActions.push({
            title: 'Delete',
            icon: 'trash',
            onClick: () => {
                openConfirmModal(
                    async () => {
                        setPhoneModalLoading();

                        await nuiAction(props.email.category === 'draft' ? 'ev-ui:li:discardDraft' : 'ev-ui:li:deleteEmail', { email: props.email });

                        props.getEmails(props.email.category);
                        props.updateState({ page: 'home', category: { id: props.email.category } });
                        closePhoneModal();
                    },
                    "Are you sure?"
                );
            }
        });
    }

    if (invalidEmail) {
        auxActions.push({
            title: 'Save As Draft',
            icon: 'save',
            onClick: async () => {
                setPhoneModalLoading();

                const results = await nuiAction('ev-ui:li:createEmail', { email: props.email });

                if (results.meta.ok) {
                    closePhoneModal();
                    const newCategory = { ...props.category, id: 'draft' };
                    updatLifeInvaderAppState({ category: newCategory });
                    props.getEmails('draft');
                    updateEmail({ id: results.data.insertId });
                    return;
                }

                setPhoneModalError(results.meta.message, true);
            }
        });
    }

    return (
        <AppContainer
            fadeIn={false}
            primaryActions={primaryActions}
            auxActions={auxActions}
            style={{ backgroundColor: 'rgb(100 1 1)' }}
        >
            <>
                <div className={classes.searchContainer}>
                    <Tooltip title="Go Back" placement="right" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <div className={classes.backButton} onClick={() => props.updateState({ page: 'home' })}>
                            <i className="fas fa-chevron-left fa-fw fa-lg" style={{ color: '#fff' }}></i>
                        </div>
                    </Tooltip>
                </div>
                <div className={classes.inputs}>
                    {shouldShowTo && (
                        <Input.Email
                            label="To"
                            readOnly={!notEmailOrIsDraft}
                            onChange={(value: string) => updateEmail({ to: value })}
                            value={props.email.to}
                        />
                    )}
                    {shouldShowFrom && (
                        <Input.Email
                            label="From"
                            readOnly={true}
                            value={props.email.sender}
                        />
                    )}
                    {shouldShowCC && ( //TODO: Fix this, when adding 1 CC it fully dissapears...?
                        <Input.MultiEmail
                            label="CC"
                            readOnly={!notEmailOrIsDraft}
                            onChange={(value: string[]) => {
                                updateEmail({
                                    cc: value.map((cc: any) => cc.email).filter((email: string) => email !== props.email.to)
                                })
                            }}
                            value={props?.email?.cc?.map((cc: string) => {
                                return {
                                    email: cc,
                                    title: cc
                                }
                            })}
                        />
                    )}
                    <Input.Text
                        label="Title"
                        icon="tags"
                        maxLength={50}
                        placeholder="Something catchy..."
                        InputProps={{
                            readOnly: !notEmailOrIsDraft
                        }}
                        onChange={(value: string) => updateEmail({ title: value })}
                        value={props.email.title}
                    />
                </div>
            </>
            <div className={classes.markdownWrapper}>
                <RichMarkdownEditor
                    key={props.email.id}
                    dark={true}
                    readOnly={!notEmailOrIsDraft}
                    onChange={(value: Function) => updateEmail({ body: value() })}
                    placeholder="Email content goes here..."
                    defaultValue={props.email.body}
                />
            </div>
        </AppContainer>
    )
}