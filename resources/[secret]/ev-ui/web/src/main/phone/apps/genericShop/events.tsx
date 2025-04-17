import config from "./config";

export default function events(cb) {
    cb('ping-receive', function (event) {
        const eventData = event?.data;
        const eventState = event?.state;

        void 0 === eventData.shopId ||
            void 0 === eventData.callback ||
            void 0 === eventData.items ||
            (eventState[config.name].shops[eventData.shopId] = {
                callback: eventData.callback,
                items: eventData.items,
            })

        return eventState;
    });
};