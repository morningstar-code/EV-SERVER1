import React from 'react';
import Input from 'components/input/input';
import AppContainer from 'main/phone/components/app-container';
import useStyles from './lifeinvader.styles';
import Email from './email';
import { getEmailContent } from '../actions';

interface LifeInvaderProps {
    emails: LifeInvaderEmail[];
    categories: { id: string; name: string; }[];
    category: LifeInvaderCategory;
    character: Character;
    adUrl?: string;
    getEmails: (categoryId: string) => void;
    updateState: (data: any) => void;
}

export default (props: LifeInvaderProps) => {
    const classes = useStyles();
    const [list, setList] = React.useState<LifeInvaderEmail[]>(props.emails);

    React.useEffect(() => {
        setList(props.emails);
    }, [props.emails]);

    const [categoryId, setCategoryId] = React.useState<string>(props.category.id);

    React.useEffect(() => {
        props.getEmails(categoryId);
    }, [categoryId]);

    return (
        <AppContainer
            search={{
                filter: ['title'],
                list: props.emails,
                onChange: setList
            }}
            style={{
                backgroundImage: 'url(https://i.imgur.com/BnKycpx.png)',
                backgroundRepeat: 'no-repeat',
                paddingTop: 80,
                backgroundPositionY: '20px',
                backgroundColor: 'rgb(100 1 1)'
            }}
            primaryActions={[
                {
                    title: 'New',
                    icon: 'plus',
                    onClick: function () {
                        props.updateState({
                            page: 'editing',
                            email: {
                                id: -1,
                                title: '',
                                body: '',
                                category: 'draft',
                                sender: props.character.email,
                                to: '',
                                cc: [],
                            },
                        })
                    },
                },
                {
                    title: 'Contacts',
                    icon: 'address-book',
                    onClick: function () {
                        props.updateState({ page: 'contacts' })
                    },
                }
            ]}
        >
            <div style={{ marginBottom: 16 }}>
                <Input.Select
                    items={props.categories}
                    label="Category"
                    onChange={(value: string) => setCategoryId(value)}
                    value={categoryId}
                />
            </div>
            <div className={classes.emailList}>
                {list.map((email: LifeInvaderEmail) => (
                    <Email
                        key={email.id}
                        email={email}
                        onClick={async () => {
                            const body = await getEmailContent(email);
                            props.updateState({
                                page: 'editing',
                                email: {
                                    ...email,
                                    body: body
                                }
                            });
                        }}
                    />
                ))}
            </div>
            <div className={classes.adContainer}>
                <img
                    className={classes.adImage}
                    src={props?.adUrl}
                    alt="LifeInvader advertisement"
                />
            </div>
        </AppContainer>
    )
}