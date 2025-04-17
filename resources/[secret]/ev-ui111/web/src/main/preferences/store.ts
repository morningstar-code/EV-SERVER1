import { StoreObject } from "lib/redux";

const defaultPhoneBg = "https://i.imgur.com/3KTfLIV.jpg";

export const defaultHudPresets = () => {
    return {
        'farmersmarket.disableBanners': false,
        'interact.disablePrompts': false,
        'scenes.disableLargeText': false,
        'scenes.showOnPeek': false,
        'hud.taskbar.circle': false,
        'hud.status.health.enabled': true,
        'hud.status.health.hide': 95,
        'hud.status.armor.enabled': true,
        'hud.status.armor.hide': 95,
        'hud.status.food.enabled': true,
        'hud.status.food.hide': 95,
        'hud.status.water.enabled': true,
        'hud.status.water.hide': 95,
        'hud.status.hardcore.enabled': true,
        'hud.status.hardcore.hide': 95,
        'hud.status.stress.enabled': true,
        'hud.status.oxygen.enabled': true,
        'hud.status.radio.channel': 2,
        'hud.vehicle.minimap.enabled': true,
        'hud.vehicle.minimap.default': false,
        'hud.vehicle.minimap.outline': true,
        'hud.vehicle.speedometer.fps': 64,
        'hud.vehicle.harness.enabled': true,
        'hud.vehicle.nitrous.enabled': true,
        'hud.vehicle.nitrous.arcadetrail': false,
        'hud.compass.enabled': true,
        'hud.compass.fps': 16,
        'hud.compass.time.enabled': false,
        'hud.compass.roadnames.enabled': true,
        'hud.blackbars.enabled': false,
        'hud.blackbars.size': '10',
        'hud.crosshair.enabled': false,
        'hud.golfballcam.enabled': false,
        'hud.outfits.preview.enabled': true,
        'hud.outfits.camera.enabled': true,
        'hud.phone.wallpaper': defaultPhoneBg
    }
}

const store: StoreObject = {
    key: "preferences",
    initialState: {
        ...defaultHudPresets(),
        'date.format': 'YYYY-MM-DD hh:mm:ss A',
        'date.timezone': 'America/New_York',
        'hud.presets': [defaultHudPresets()],
        'hud.presetSelected': 1,
        'phone.images.enabled': true,
        'phone.notifications.email': true,
        'phone.notifications.sms': true,
        'phone.notifications.twatter': true,
        'phone.notifications.race': true,
        'phone.shell': 'android',
        'phone.wallpaper': defaultPhoneBg,
        'phone.volume': 0.8,
        'phone.balance': 1,
        'radio.stereo.enabled': true,
        'radio.volume': 0.8,
        'radio.balance': 1,
        'radio.clicks.outgoing.enabled': true,
        'radio.clicks.incoming.enabled': true,
        'radio.clicks.volume': 0.8,
        'rtc.settings.device': '',
        'rtc.settings.phone.filter.enabled': true,
        'rtc.settings.phone.filter.gainNode': 1,
        'rtc.settings.phone.filter.pannerNode': 0.4,
        'rtc.settings.phone.filter.highpassBiquad': 500,
        'rtc.settings.phone.filter.lowpassBiquad': 8000,
        'rtc.settings.phone.filter.waveShaper': 5,
        'rtc.settings.radio.filter.enabled': true,
        'rtc.settings.radio.filter.gainNode': 1.5,
        'rtc.settings.radio.filter.pannerNode': -0.4,
        'rtc.settings.radio.filter.highpassBiquad': 1000,
        'rtc.settings.radio.filter.lowpassBiquad': 2000,
        'rtc.settings.radio.filter.waveShaper': 9,
        'rtc.system': {}
    }
};

export default store;