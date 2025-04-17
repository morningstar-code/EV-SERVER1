import { storeObj } from "lib/redux";
import { updateBurnerAppState } from "main/burner/actions";
import store from "./store";

export const sortConversations = (number: number, data: any) => {
    const order = [];
    const conversations = {};
    const convos = data;

    convos.sort((a: any, b: any) => {
        return a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0;
    });

    convos.forEach((convo: any) => {
        const arr = convo.number_from === number ? ['out', convo.number_to] : ['in', convo.number_from];

        const direction = arr[0];
        const ordr = arr[1];
        const msgs = { messages: [] };

        const msgData = {
            direction: direction,
            message: convo.message,
            timestamp: convo.timestamp
        }

        order.includes(ordr) || order.push(ordr);
        conversations[ordr] || (conversations[ordr] = msgs);
        conversations[ordr].messages.push(msgData);
    });

    return {
        conversations: conversations,
        order: order
    }
}

export const addMessageToConversation = (data: { number: number, message: string }) => {
    const conversations = storeObj.getState()[store.key].conversations;
    const order = storeObj.getState()[store.key].order;

    const newConversations = { ...conversations };

    const convo = newConversations[data.number];
    const msgData = {
        direction: 'out',
        message: data.message,
        timestamp: Date.now() / 1000
    }

    convo.messages.unshift(msgData);

    updateBurnerAppState(store.key, {
        conversations: newConversations,
        order: [...order]
    });
}

export const updateNotifsAndConvo = (data: any) => {
    const activeConversation = data.activeConversation;
    const activeConvoIdx = activeConversation ? activeConversation : -1;
    const conversations = data.conversations;
    const direction = data.direction;
    const message = data.message;
    const notifications = data.notifications;
    const number = data.number;
    const order = data.order;

    const newOrder = [...order];
    const numberOrderIdx = newOrder.indexOf(number);
    numberOrderIdx !== -1 && newOrder.splice(numberOrderIdx, 1);
    newOrder.unshift(number);

    const newConversations = { ...conversations };
    numberOrderIdx === -1 && (newConversations[number] = { messages: [] });

    const newNotifications = { ...notifications };
    if (direction !== 'in' ||
        activeConvoIdx === number ||
        newNotifications.includes(number) ||
        newNotifications.push(number)) {
        newConversations[number].messages.unshift({
            direction: direction,
            message: message,
            timestamp: new Date().toISOString(),
        });
    }

    return {
        conversations: newConversations,
        notifications: newNotifications,
        order: newOrder
    }
}