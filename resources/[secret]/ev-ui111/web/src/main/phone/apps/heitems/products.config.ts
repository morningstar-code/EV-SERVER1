import { storeObj } from "lib/redux"

export const wifiProducts = {
    heist_wifi_spot_1: [
        {
            icon: 'user-secret',
            key: 'vpnxj',
            name: 'VPN',
            price: 20,
        },
        {
            icon: 'clipboard-list',
            key: 'darkmarketdeliveries',
            name: 'Delivery List',
            price: 10,
        },
        {
            icon: 'mask',
            key: 'racingusb2',
            name: 'Phone Dongle (R)',
            price: 50,
            crypto_id: 2,
            show: function () {
                return !storeObj.getState().phone.hasEmergencyJob
            },
        },
    ],
    heist_wifi_spot_2: [
        {
            icon: 'laptop-code',
            key: 'heistlaptop2',
            name: 'Laptop',
            price: 250,
        },
    ],
    heist_wifi_spot_3: [
        {
            icon: 'laptop-code',
            key: 'heistlaptop4',
            name: 'Laptop',
            price: 500,
        },
    ],
    heist_wifi_spot_4: [
        {
            icon: 'laptop-code',
            key: 'heistlaptop1',
            name: 'Laptop',
            price: 1500,
        },
    ],
    heist_wifi_spot_5: [
        {
            icon: 'mask',
            key: 'vcomputerusb',
            name: 'Vault Computer USB',
            price: 250,
        },
        {
            icon: 'ship',
            key: 'heistpadyacht',
            name: 'PixelPad',
            price: 250,
        },
    ]
}