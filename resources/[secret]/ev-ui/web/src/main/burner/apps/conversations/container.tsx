import React from 'react';
import { compose, storeObj } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import { getContactData, isPortrait } from 'lib/character';
import MultiPager from 'main/phone/components/multi-pager';
import { updateBurnerAppState } from 'main/burner/actions';
import Conversations from './components/conversations';
import Messages from './components/messages';
//import Conversations from './components/conversations';
//import Messages from './components/messages';

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapDispatchToProps: {
        addMessagesToConversation: (number: any, messages: any) => {
            const sortedMessages = messages.sort((a: any, b: any) => {
                return a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0;
            });

            const conversations = storeObj.getState()[store.key].conversations;
            
            conversations[number] || (conversations[number] = []);
            
            conversations[number].messages = sortedMessages.map((message: any) => {
                return {
                    direction: message.number_from === number ? 'in' : 'out',
                    message: message.message,
                    timestamp: message.timestamp
                }
            });

            const loaded = storeObj.getState()[store.key].loaded;

            loaded.push(number);

            updateBurnerAppState(store.key, {
                conversations: conversations,
                loaded: loaded
            });
        },
        openMessagesContainer: (number: any) => {
            const notifications = storeObj.getState()[store.key].notifications;
            const hasNotification = notifications.indexOf(number);

            hasNotification !== -1 && notifications.splice(hasNotification, 1);
            
            updateBurnerAppState(store.key, {
                activeConversation: number,
                notifications: notifications,
            });
        }
    },
    mapStateToProps: (state: any) => {
        return {
            burner: state.burner
        }
    }
});

class Container extends React.Component<any> {
    render() {
        const conversations = this.props.conversations;
        const order = this.props.order;
        const orderedConversations = [];

        order.forEach((number) => {
            const contactData = getContactData(number);
            const hasName = contactData.hasName;
            const name = contactData.name;
            
            orderedConversations.push({
                number: number,
                name: hasName ? name : '',
                messages: conversations[number].messages
            });
        });

        return (
            <MultiPager
                activeIndex={this.props.activeConversation !== -1 ? 1 : 0}
                landscapeOptions={this.props.orientation ? {} : {
                    indexLeft: 0,
                    indexRight: 1,
                    hideRight: this.props.activeConversation === -1,
                    split: true
                }}
                pages={[
                    {
                        index: 0,
                        content: <Conversations {...this.props} conversations={orderedConversations} />
                    },
                    {
                        index: 1,
                        content: this.props.activeConversation && this.props.conversations[this.props.activeConversation] ? <Messages {...this.props} /> : null
                    }
                ]}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);