import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "musicplayer",
    initialState: {
        minimized: false,
        soundcloudUrl: '',
        show: false,
        volume: 20,
        url: 'https://soundcloud.com/outtotunetyrone/down-bad-outto-tune-tyrone',
    }
};

export default store;