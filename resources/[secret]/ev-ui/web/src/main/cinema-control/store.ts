import { StoreObject } from "lib/redux";

const store: StoreObject = {
    key: "cinema-control",
    initialState: {
        show: false,
        type: 'public',
        isAllowed: true,
        mode: 'youtube',
        volume: 50,
        canMap: false,
        paused: false,
        currentVideo: null,
        playlist: null,
        showPlaylist: false,
        percentage: 0,
    }
};

export default store;