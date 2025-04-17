import React from 'react';
import store from './store';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import MultiPager from 'main/phone/components/multi-pager';
import { nuiAction } from 'lib/nui-comms';
import { isPortrait } from 'lib/character';
import LifeInvader from './components/lifeinvader';
import Editor from './components/editor';
import Contacts from './components/contacts';
import { getLifeInvaderAppState } from './actions';

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            character: state.character
        }
    }
});

const Pages = {
    home: 0,
    editing: 1,
    contacts: 2
};

interface LifeInvaderContainerProps {
    character: Character;
    updateState: (data: any) => void;
    page: string;
    emails: LifeInvaderEmail[];
    list: LifeInvaderContact[];
    adUrl?: string;
    category: LifeInvaderCategory;
    categories: { id: string; name: string; }[];
    email: LifeInvaderEmail;
}

class Container extends React.Component<LifeInvaderContainerProps> {
    async componentDidMount() {
        await this.getEmails();

        const results = await nuiAction<ReturnData<{ url: string }>>('ev-ui:li:getAdURL', {}, { returnData: { url: 'https://assets.primagames.com/media/images/news/gtav_Grand_Theft_Auto_5_How_to_Use_LifeInvader.jpg/PRIMA/resize/1200x500/format/jpg' } });
        const data = results.data;

        this.props.updateState({ adUrl: data?.url });
    }

    async getEmails(type?: string, id?: number) {
        const cat = type?.length > 0 && type ? type : 'inbox';

        const results = await nuiAction<ReturnData<LifeInvaderEmail[]>>('ev-ui:li:getEmails', { category: cat }, {
            returnData: [
                {
                    id: 1,
                    sender: 'me@lifeinvader.com',
                    to: 'mine@lifeinvader.com',
                    title: 'hello world',
                    category: 'inbox',
                    timestamp: 1671045680,
                    cc: [
                        'someone@lifeinvader.com',
                        'other@lifeinvader.com',
                    ],
                },
                {
                    id: 2,
                    sender: 'me@lifeinvader.com',
                    to: 'mine@lifeinvader.com',
                    title: 'hello',
                    category: 'draft',
                    timestamp: 1671045680,
                    cc: ['someone@lifeinvader.com'],
                },
                {
                    id: 3,
                    sender: 'you@lifeinvader.com',
                    to: 'mine@lifeinvader.com',
                    title: 'world',
                    category: 'sent',
                    timestamp: 1671045680,
                    cc: ['someone@lifeinvader.com'],
                },
                {
                    id: 4,
                    sender: 'they@lifeinvader.com',
                    to: 'mine@lifeinvader.com',
                    title: 'test',
                    category: 'trash',
                    timestamp: 1671045680,
                    cc: ['someone@lifeinvader.com'],
                }
            ].filter((email: LifeInvaderEmail) => email.category === cat)
        });

        if (results.meta.ok) {
            results?.data?.forEach((e: LifeInvaderEmail) => {
                const cc = e?.cc;
                e.category = cat;
                e.cc = Array.isArray(cc) ? cc : cc.split(',');
                e.sender === "system@lifeinvader.net" && (e.sender = "Unknown");
            });

            results?.data?.sort((a: LifeInvaderEmail, b: LifeInvaderEmail) => b.timestamp - a.timestamp);

            if (id) {
                this.props.updateState({
                    email: {
                        ...getLifeInvaderAppState().email,
                        id: id
                    },
                    emails: results?.data,
                });
            } else {
                this.props.updateState({
                    emails: results?.data,
                });
            }
        }
    }

    render() {
        return (
            <MultiPager
                activeIndex={Pages[this.props.page]}
                landscapeOptions={isPortrait ? {} : {
                    indexLeft: 0,
                    indexRight: this.props.page === 'contacts' ? 2 : 1,
                    hideRight: this.props.page !== 'editing' && this.props.page !== 'contacts',
                    split: true
                }}
                pages={[
                    {
                        index: 0,
                        content: <LifeInvader {...this.props} getEmails={this.getEmails.bind(this)} />
                    },
                    {
                        index: 1,
                        content: this.props.page !== 'editing' ? null : <Editor {...this.props} getEmails={this.getEmails.bind(this)} />
                    },
                    {
                        index: 2,
                        content: this.props.page !== 'contacts' ? null : (
                            <Contacts {...this.props} />
                        )
                    }
                ]}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);