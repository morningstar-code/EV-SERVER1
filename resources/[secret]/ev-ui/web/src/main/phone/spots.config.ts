import { storeObj } from "lib/redux";

export const availableWifiSpots = [
    {
        id: 1,
        name: 'PDM Employees',
        location: 'pdm',
        password: 'pdm123',
    },
    {
        id: 2,
        name: 'Fastlane Employees',
        location: 'fastlane',
        password: 'fastlane123',
    },
    {
        id: 3,
        name: 'Tuner Shop Employees',
        location: 'tuner',
        password: 'tunershop123',
    },
    {
        id: 4,
        name: 'Public Hotspot',
        location: 'heist_wifi_spot_1',
        password: '',
    },
    {
        id: 5,
        name: 'Public Hotspot',
        location: 'heist_wifi_spot_2',
        password: '',
        check: function () {
            return storeObj.getState().phone.hasUsbPaleto
        },
    },
    {
        id: 6,
        name: 'Public Hotspot',
        location: 'heist_wifi_spot_3',
        password: '',
        check: function () {
            return storeObj.getState().phone.hasUsbUpper
        },
    },
    {
        id: 7,
        name: 'Public Hotspot',
        location: 'heist_wifi_spot_4',
        password: '',
        check: function () {
            return storeObj.getState().phone.hasUsbLower
        },
    },
    {
        id: 8,
        name: 'Public Hotspot',
        location: 'imports_shop_wifi',
        password: '',
    },
    {
        id: 9,
        name: 'Public Hotspot',
        location: 'heist_wifi_spot_5',
        password: '',
        check: function () {
            return storeObj.getState().phone.hasUsbLower
        },
    },
];