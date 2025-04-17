import React from 'react';
import Input from 'components/input/input';
import AppContainer from 'main/phone/components/app-container';
import { closePhoneModal, openConfirmModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from 'main/phone/actions';
import SimpleForm from 'components/simple-form';
import { nuiAction } from 'lib/nui-comms';
import { getContacts } from '../actions';
import Text from 'components/text/text';
import Contact from './contact';

interface LifeInvaderContactsProps {
    character: Character;
    list: LifeInvaderContact[];
    updateState: (data: any) => void;
}

export default (props: LifeInvaderContactsProps) => {
    const [list, setList] = React.useState(props.list);

    React.useEffect(() => {
        setList(props.list);
    }, [props.list]);

    return (
        <AppContainer
            search={{
                filter: ['name'],
                list: props.list,
                onChange: setList
            }}
            fadeIn={false}
            onClickBack={() => props.updateState({ page: 'home' })}
            style={{ backgroundColor: 'rgb(100 1 1)' }}
            primaryActions={[
                {
                    title: 'Add',
                    icon: 'user-plus',
                    onClick: () => {
                        openPhoneModal(
                            <SimpleForm
                                elements={[
                                    {
                                        name: 'name',
                                        render: (prop: SimpleFormRender<string>) => {
                                            const onChange = prop.onChange;
                                            const value = prop.value;

                                            return (
                                                <Input.Text
                                                    label="Name"
                                                    icon="user"
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            )
                                        },
                                        validate: ['text', 'Name']
                                    },
                                    {
                                        name: 'email',
                                        render: (prop: SimpleFormRender<string>) => {
                                            const onChange = prop.onChange;
                                            const value = prop.value;

                                            return (
                                                <Input.Text
                                                    label="Email"
                                                    icon="at"
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            )
                                        },
                                        validate: ['text', 'Email']
                                    }
                                ]}
                                onCancel={() => closePhoneModal(false)}
                                onSubmit={async (values) => {
                                    const name = values.name;
                                    const email = values.email;

                                    setPhoneModalLoading();

                                    const results = await nuiAction('ev-ui:li:addContact', {
                                        name: name,
                                        email: email
                                    });

                                    if (results.meta.ok) {
                                        const contacts = await getContacts();

                                        props.updateState({
                                            list: contacts
                                        });

                                        closePhoneModal();

                                        return;
                                    }

                                    setPhoneModalError(results.meta.message, true);
                                }}
                            />
                        )
                    }
                }
            ]}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Text variant="body2" style={{ color: 'darkgray' }}>
                    Signed in as
                </Text>
                <Text variant="body2" style={{ color: 'darkgray' }}>
                    {props.character.email}
                </Text>
            </div>
            {list && list.length > 0 && list.map((contact: LifeInvaderContact) => (
                <Contact
                    key={contact.name}
                    contact={contact}
                    onClick={() => {
                        openConfirmModal(
                            async () => {
                                setPhoneModalLoading();

                                await nuiAction('ev-ui:li:deleteContact', {
                                    ...contact
                                });

                                const contacts = await getContacts();

                                props.updateState({
                                    list: contacts
                                });

                                closePhoneModal();
                            },
                            'Are you sure you want to delete this contact?',
                        )
                    }}
                />
            ))}
        </AppContainer>
    )
}