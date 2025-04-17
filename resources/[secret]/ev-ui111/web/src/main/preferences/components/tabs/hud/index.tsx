import React from 'react';
import useStyles from './index.styles';
import { Typography } from '@mui/material';
import Input from 'components/input/input';
import Button from 'components/button/button';
import Status from './status';
import { storeObj } from 'lib/redux';
import { updatePreferencesState } from 'main/preferences/actions';
import { nuiAction } from 'lib/nui-comms';
import { defaultHudPresets } from 'main/preferences/store';

export function handlePresetSave() {
    const preferences = storeObj.getState().preferences;
    const presets = preferences['hud.presets'];
    const presetSelected = preferences['hud.presetSelected'] - 1;

    if (!presets[presetSelected]) {
        presets[presetSelected] = defaultHudPresets();
    }

    Object.keys(defaultHudPresets()).forEach((key) => {
        presets[presetSelected][key] = preferences[key];
    });

    updatePreferencesState({ 'hud.presets': presets });

    const updatedState = storeObj.getState().preferences;

    nuiAction('ev-ui:setKVPValue', {
        key: 'ev-preferences',
        value: updatedState
    });

    nuiAction('ev-ui:hudSetPreferences', updatedState);
}

export function handlePresetChange(value: any) {
    const arg2 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    const preferences = storeObj.getState().preferences;

    if (!(arg2 && preferences['hud.presets'].length < Number(value))) {
        if (preferences['hud.presets'].length < Number(value)) {
            updatePreferencesState({
                'hud.presetSelected': value
            });

            storeObj.dispatch({
                type: 'ev-ui-state-reset',
                store: 'preferences',
                data: {
                    ...preferences,
                    ...defaultHudPresets()
                }
            });

            nuiAction('ev-ui:hudSetPreferences', defaultHudPresets());
        }

        const index = Number(value) - 1;

        storeObj.dispatch({
            type: 'ev-ui-state-reset',
            store: 'preferences',
            data: {
                ...preferences,
                ...preferences['hud.presets'][index],
                ['hud.presetSelected']: value
            }
        });

        nuiAction('ev-ui:hudSetPreferences', preferences['hud.presets'][index]);
    }
}

const HudTab: React.FC<any> = (props) => {
    const classes = useStyles();
    const presets = [];

    for (let i = 0; i < props['hud.presets'].length; i += 1) {
        presets.push({
            id: i + 1,
            name: `${i + 1}`
        });
    }

    return (
        (presets.push({
            id: props['hud.presets'].length + 1,
            name: `${props['hud.presets'].length + 1}`
        })),
        <div className={classes.container}>
            <div>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Preset
                </Typography>
                <div className={classes.preference}>
                    <div className={classes.flex}>
                        <Input.Select
                            label="Number"
                            items={presets}
                            onChange={(e) => {
                                handlePresetChange(e)
                            }}
                            value={props['hud.presetSelected']}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button.Primary onClick={handlePresetSave}>
                                Save
                            </Button.Primary>
                        </div>
                    </div>
                </div>
                <div className={classes.preference}>
                    <Typography variant="body2" style={{ color: 'white' }}>
                        Save settings for the selected preset, and then use &nbsp;
                        <span className={classes.cmd}>
                            /hud [:number]
                        </span>
                        &nbsp; where number is the selected preset. Currently &nbsp;
                        <span className={classes.cmd}>
                            /hud {props['hud.presetSelected']}
                        </span>
                        .
                    </Typography>
                </div>
            </div>
            <hr />
            <div>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Farmers Market
                </Typography>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Disable dynamic banners (GREATLY improves performance)"
                        checked={props['farmersmarket.disableBanners']}
                        onChange={(e) => {
                            props.updateState({
                                'farmersmarket.disableBanners': e
                            });
                        }}
                    />
                </div>
            </div>
            <div>
                <Typography variant="h6" style={{ color: 'white' }}>
                    World
                </Typography>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Disable Interact Prompts (Improves performance)"
                        checked={props['interact.disablePrompts']}
                        onChange={(e) => {
                            props.updateState({
                                'interact.disablePrompts': e
                            });
                        }}
                    />
                </div>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Disable Large Scene Text"
                        checked={props['scenes.disableLargeText']}
                        onChange={(e) => {
                            props.updateState({
                                'scenes.disableLargeText': e
                            });
                        }}
                    />
                </div>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Only Show Scenes While Peeking"
                        checked={props['scenes.showOnPeek']}
                        onChange={(e) => {
                            props.updateState({
                                'scenes.showOnPeek': e
                            });
                        }}
                    />
                </div>
            </div>
            <div>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Misc
                </Typography>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Enable Circle Taskbar"
                        checked={props['hud.taskbar.circle']}
                        onChange={() => {
                            props.updateState({
                                'hud.taskbar.circle': !props['hud.taskbar.circle']
                            });
                        }}
                    />
                </div>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Enable /outfits Preview"
                        checked={props['hud.outfits.preview.enabled']}
                        onChange={(e) => {
                            props.updateState({
                                'hud.outfits.preview.enabled': e
                            });
                        }}
                    />
                </div>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Enable /outfits Camera"
                        checked={props['hud.outfits.camera.enabled']}
                        onChange={(e) => {
                            props.updateState({
                                'hud.outfits.camera.enabled': e
                            });
                        }}
                    />
                </div>
            </div>
            <hr />
            <div>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Status
                </Typography>
                <div className={classes.preference}>
                    <Status {...props} name="Health" />
                </div>
                <div className={classes.preference}>
                    <Status {...props} name="Armor" />
                </div>
                <div className={classes.preference}>
                    <Status {...props} name="Food" />
                </div>
                <div className={classes.preference}>
                    <Status {...props} name="Water" />
                </div>
                <div className={classes.preference}>
                    <Status {...props} label="Body Health (Hardcore Only)" name="hardcore" />
                </div>
                <div className={classes.preference}>
                    <div className={classes.flex}>
                        <Input.Checkbox
                            label="Show Stress when relevant"
                            checked={props['hud.status.stress.enabled']}
                            onChange={(e) => {
                                props.updateState({
                                    'hud.status.stress.enabled': e
                                });
                            }}
                        />
                        <Input.Checkbox
                            label="Show Oxygen when relevant"
                            checked={props['hud.status.oxygen.enabled']}
                            onChange={(e) => {
                                props.updateState({
                                    'hud.status.oxygen.enabled': e
                                });
                            }}
                        />
                        <Input.Checkbox
                            label="Hide Enhancements"
                            checked={props['hud.status.buffs.disabled']}
                            onChange={(e) => {
                                props.updateState({
                                    'hud.status.buffs.disabled': e
                                });
                            }}
                        />
                    </div>
                </div>
                <div className={classes.preference}>
                    <Input.Select
                        label="Radio Channel Visibility"
                        items={[
                            {
                                id: 0,
                                name: 'Never'
                            },
                            {
                                id: 1,
                                name: 'Always'
                            },
                            {
                                id: 2,
                                name: 'Relevant'
                            }
                        ]}
                        onChange={(e) => {
                            props.updateState({
                                'hud.status.radio.channel': e
                            });
                        }}
                        value={props['hud.status.radio.channel']}
                    />
                </div>
            </div>
            <hr />
            <div>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Vehicle
                </Typography>
                <div className={classes.preference}>
                    <div className={classes.flex}>
                        <div>
                            <Input.Checkbox
                                label="Minimap Enabled"
                                checked={props['hud.vehicle.minimap.enabled']}
                                onChange={(e) => {
                                    props.updateState({
                                        'hud.vehicle.minimap.enabled': e
                                    });
                                }}
                            />
                        </div>
                        {props['hud.vehicle.minimap.enabled'] && (
                            <div>
                                <Input.Select
                                    label="Speedometer FPS"
                                    items={[
                                        {
                                            id: 16,
                                            name: '60'
                                        },
                                        {
                                            id: 24,
                                            name: '45'
                                        },
                                        {
                                            id: 32,
                                            name: '30'
                                        },
                                        {
                                            id: 64,
                                            name: '15'
                                        }
                                    ]}
                                    onChange={(e) => {
                                        props.updateState({
                                            'hud.vehicle.speedometer.fps': e
                                        });
                                    }}
                                    value={props['hud.vehicle.speedometer.fps']}
                                />
                                <Typography variant="body2" style={{ color: 'white', marginTop: 8 }}>
                                    The higher the FPS, the more demanding this is on your machine
                                </Typography>
                            </div>
                        )}
                    </div>
                    <div className={classes.preference}>
                        <Input.Checkbox
                            label="Use Default Minimap (may require game restart)"
                            checked={props['hud.vehicle.minimap.default']}
                            onChange={(e) => {
                                props.updateState({
                                    'hud.vehicle.minimap.default': e
                                });
                            }}
                        />
                    </div>
                    <div className={classes.preference}>
                        <Input.Checkbox
                            label="Show Minimap Outline"
                            checked={props['hud.vehicle.minimap.outline']}
                            onChange={(e) => {
                                props.updateState({
                                    'hud.vehicle.minimap.outline': e
                                });
                            }}
                        />
                    </div>
                </div>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Show Harness durability"
                        checked={props['hud.vehicle.harness.enabled']}
                        onChange={(e) => {
                            props.updateState({
                                'hud.vehicle.harness.enabled': e
                            });
                        }}
                    />
                </div>
                <div className={classes.preference}>
                    <div className={classes.flex}>
                        <Input.Checkbox
                            label="Show Nitrous levels"
                            checked={props['hud.vehicle.nitrous.enabled']}
                            onChange={(e) => {
                                props.updateState({
                                    'hud.vehicle.nitrous.enabled': e
                                });
                            }}
                        />
                        <Input.Checkbox
                            label="Show Nitrous trail"
                            checked={props['hud.vehicle.nitrous.arcadetrail']}
                            onChange={(e) => {
                                props.updateState({
                                    'hud.vehicle.nitrous.arcadetrail': e
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
            <hr />
            <div>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Compass
                </Typography>
                <div className={classes.preference}>
                    <div className={classes.flex}>
                        <div>
                            <Input.Checkbox
                                label="Enabled"
                                checked={props['hud.compass.enabled']}
                                onChange={(e) => {
                                    props.updateState({
                                        'hud.compass.enabled': e
                                    });
                                }}
                            />
                            <Typography variant="body2" style={{ color: 'white' }}>
                                Disabling the compass entirely can vastly improve performance
                            </Typography>
                        </div>
                        {props['hud.compass.enabled'] && (
                            <div>
                                <Input.Select
                                    label="Compass FPS"
                                    items={[
                                        {
                                            id: 16,
                                            name: '60'
                                        },
                                        {
                                            id: 24,
                                            name: '45'
                                        },
                                        {
                                            id: 32,
                                            name: '30'
                                        },
                                        {
                                            id: 64,
                                            name: '15'
                                        }
                                    ]}
                                    onChange={(e) => {
                                        props.updateState({
                                            'hud.compass.fps': e
                                        })
                                    }}
                                    value={props['hud.compass.fps']}
                                />
                                <Typography variant="body2" style={{ color: 'white', marginTop: 8 }}>
                                    The higher the FPS, the more demanding this is on your machine
                                </Typography>
                            </div>
                        )}
                    </div>
                </div>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Show the current time with the compass"
                        checked={props['hud.compass.time.enabled']}
                        onChange={(e) => {
                            props.updateState({
                                'hud.compass.time.enabled': e
                            });
                        }}
                    />
                </div>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Show street names when in a vehicle"
                        checked={props['hud.compass.roadnames.enabled']}
                        onChange={(e) => {
                            props.updateState({
                                'hud.compass.roadnames.enabled': e
                            });
                        }}
                    />
                    <Typography variant="body2" style={{ color: 'white' }}>
                        Disabling this can help improve performance
                    </Typography>
                </div>
            </div>
            <hr />
            <div>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Phone Wallpaper
                </Typography>
                <div className={classes.preference}>
                    <Input.Text
                        icon="mask"
                        label="Phone Wallpaper (1:2.2 res)"
                        onChange={(e) => {
                            props.updateState({
                                'hud.phone.wallpaper': e
                            });
                        }}
                        value={props['hud.phone.wallpaper']}
                    />
                </div>
            </div>
            <hr />
            <div>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Black Bars
                </Typography>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Enabled"
                        checked={props['hud.blackbars.enabled']}
                        onChange={(e) => {
                            props.updateState({
                                'hud.blackbars.enabled': e
                            });
                        }}
                    />
                </div>
                <div className={classes.preference}>
                    <Input.Text
                        icon="mask"
                        label="Percentage of screen"
                        onChange={(e) => {
                            props.updateState({
                                'hud.blackbars.size': e
                            });
                        }}
                        value={props['hud.blackbars.size']}
                    />
                </div>
            </div>
            <hr />
            <div>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Crosshair
                </Typography>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Enabled"
                        checked={props['hud.crosshair.enabled']}
                        onChange={(e) => {
                            props.updateState({
                                'hud.crosshair.enabled': e
                            });
                        }}
                    />
                </div>
            </div>
            <hr />
            <div>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Golf Ball Camera
                </Typography>
                <div className={classes.preference}>
                    <Input.Checkbox
                        label="Enabled"
                        checked={props['hud.golfballcam.enabled']}
                        onChange={(e) => {
                            props.updateState({
                                'hud.golfballcam.enabled': e
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default HudTab;