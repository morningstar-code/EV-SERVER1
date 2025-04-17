import React, { FunctionComponent } from "react";
import { Typography } from "@mui/material";
import HudCircle from "./hud-circle";
import { MemoBlackjack } from "./memos/blackjack";
import { MemoBoosting } from "./memos/boosting";
import { MemoNos } from "./memos/nos";
import { MemoRoulette } from "./memos/roulette";
import { MemoSpeed } from "./memos/speed";
import { MemoSpeedCircle } from "./memos/speed/speed-circle";
import useStyles from "./index.styles";

const Hud: FunctionComponent<any> = (props) => {
    const classes = useStyles(props);

    if (!props.display) {
        return null;
    }

    const isRadioPowered = props.radio?.powered === 'on';
    const burgerShotIntercom = props.burgerShotIntercom;
    const hudStatusRadioChannel = props.preferences['hud.status.radio.channel'];
    const shouldShowRadioChannel = (isRadioPowered && 1 === hudStatusRadioChannel) || (isRadioPowered && 2 === hudStatusRadioChannel && props.displayRadioChannel);

    //console.log("radio.powered", props.radio?.powered);
    //console.log("isRadioPowered", isRadioPowered);
    //console.log("burgerShotIntercom", burgerShotIntercom);
    //console.log("hudStatusRadioChannel", hudStatusRadioChannel);
    //console.log("shouldShowRadioChannel", shouldShowRadioChannel);

    const voiceRanges = {
        '1': 33.3,
        '2': 66.6,
        '3': 100
    };

    return (
        <>
            <div className={classes.wrapper}>
                <div className={classes.hudInnerContainer}>
                    <HudCircle
                        color={props.voiceActive ? '#FFEB3B' : props.voiceActiveRadio ? '#e43f5a' : 'white'}
                        fill={voiceRanges[props.voiceRange]}
                        icon={burgerShotIntercom ? 'hamburger' : isRadioPowered ? 'headset' : 'microphone'}
                        innerText={shouldShowRadioChannel && props.gameRadioChannel && !isNaN(+props.gameRadioChannel) ? (+(+props.gameRadioChannel).toFixed(1)).toString() : ''}
                        transitionTime="400ms"
                        iconSize={11}
                    />
                    <HudCircle
                        redIfLow={true}
                        color="#3BB273"
                        fill={props.health}
                        icon="heart"
                        iconBuffed={props.buffedHealth}
                        hide={!props.displayAllForce &&
                            (!props.preferences['hud.status.health.enabled'] ||
                                (Number(props.preferences['hud.status.health.hide']) <
                                    100 && Number(props.preferences['hud.status.health.hide']) < props.health)
                            )}
                        iconSize={16}
                    />
                    <HudCircle
                        color="#33B8C1"
                        fill={props.mana}
                        icon="burn"
                        hide={!props.manaShow}
                        iconSize={12}
                    />
                    <HudCircle
                        redIfLow={true}
                        color="#1565C0"
                        fill={props.armor}
                        icon="shield-alt"
                        iconBuffed={props.buffedArmor}
                        hide={!props.displayAllForce &&
                            (!props.preferences['hud.status.armor.enabled'] ||
                                (Number(props.preferences['hud.status.armor.hide']) <
                                    100 && Number(props.preferences['hud.status.armor.hide']) < props.armor)
                            )}
                        iconSize={16}
                    />
                    <HudCircle
                        redIfLow={true}
                        color="#FF6D00"
                        fill={props.food}
                        icon="hamburger"
                        iconBuffed={props.buffedHunger}
                        hide={!props.displayAllForce &&
                            (!props.preferences['hud.status.food.enabled'] ||
                                (Number(props.preferences['hud.status.food.hide']) <
                                    100 && Number(props.preferences['hud.status.food.hide']) < props.food)
                            )}
                        iconSize={16}
                    />
                    <HudCircle
                        redIfLow={true}
                        color="#0277BD"
                        fill={props.water}
                        iconBuffed={props.buffedThirst}
                        icon="tint"
                        hide={!props.displayAllForce &&
                            (!props.preferences['hud.status.water.enabled'] ||
                                (Number(props.preferences['hud.status.water.hide']) <
                                    100 && Number(props.preferences['hud.status.water.hide']) < props.water)
                            )}
                        iconSize={11}
                    />
                    {props.gameIsHardcore && (
                        <HudCircle
                            redIfLow={true}
                            color="#E8BEAC"
                            fill={props.hardcoreScore}
                            icon="heartbeat"
                            hide={!props.displayAllForce &&
                                (!props.preferences['hud.status.hardcore.enabled'] ||
                                    (Number(
                                        props.preferences['hud.status.hardcore.hide']
                                    ) < 100 &&
                                        Number(
                                            props.preferences['hud.status.hardcore.hide']
                                        ) < props.hardcoreScore))
                            }
                        />
                    )}
                    <HudCircle
                        color="#4f9ec5"
                        fill={props.stamina}
                        icon="head-side-cough"
                        hide={!props.displayAllForce && !props.staminaShow}
                    />
                    <HudCircle
                        color="#90A4AE"
                        fill={props.oxygen}
                        icon="lungs"
                        iconBuffed={props.buffedOxygen}
                        hide={!props.displayAllForce &&
                            (!props.preferences['hud.status.oxygen.enabled'] || !props.oxygenShow)}
                        iconSize={20}
                    />
                    <HudCircle
                        color="#d50000"
                        fill={props.stress}
                        icon="brain"
                        iconBuffed={props.buffedStress}
                        hide={!props.displayAllForce && (!props.preferences['hud.status.stress.enabled'] || props.stress === 0)}
                        iconSize={18}
                    />
                    <HudCircle
                        color="#FFD700"
                        fill={props.buffedDouble || 0}
                        fillColor="#e4d00a"
                        icon="database"
                        iconBuffed={!!props.buffedDouble}
                        hide={!props.buffedDouble || !!props.preferences['hud.status.buffs.disabled']}
                        iconSize={9}
                    />
                    <HudCircle
                        color="#FFD700"
                        fill={props.buffedAgility || 0}
                        fillColor="#e4d00a"
                        icon="wind"
                        iconBuffed={!!props.buffedAgility}
                        hide={!props.buffedAgility || !!props.preferences['hud.status.buffs.disabled']}
                        iconSize={20}
                    />
                    <HudCircle
                        color="#FFD700"
                        fill={props.buffedAlertness || 0}
                        fillColor="#e4d00a"
                        icon="exclamation"
                        iconBuffed={!!props.buffedAlertness}
                        hide={!props.buffedAlertness || !!props.preferences['hud.status.buffs.disabled']}
                        iconSize={20}
                    />
                    <HudCircle
                        color="#FFD700"
                        fill={props.buffedInt || 0}
                        fillColor="#e4d00a"
                        icon="lightbulb"
                        iconBuffed={!!props.buffedInt}
                        hide={!props.buffedInt || !!props.preferences['hud.status.buffs.disabled']}
                        iconSize={14}
                    />
                    <HudCircle
                        color="#FFD700"
                        fill={props.buffedJobpay || 0}
                        fillColor="#e4d00a"
                        icon="dollar-sign"
                        iconBuffed={!!props.buffedJobpay}
                        hide={!props.buffedJobpay || !!props.preferences['hud.status.buffs.disabled']}
                        iconSize={11}
                    />
                    <HudCircle
                        color="#FFD700"
                        fill={props.buffedStamina || 0}
                        fillColor="#e4d00a"
                        icon="swimmer"
                        iconBuffed={!!props.buffedStamina}
                        hide={!props.buffedStamina || !!props.preferences['hud.status.buffs.disabled']}
                        iconSize={16}
                    />
                    <HudCircle
                        color="#FFD700"
                        fill={props.buffedStrength || 0}
                        fillColor="#e4d00a"
                        icon="dumbbell"
                        iconBuffed={!!props.buffedStrength}
                        hide={!props.buffedStrength || !!props.preferences['hud.status.buffs.disabled']}
                        iconSize={6}
                    />
                    <HudCircle
                        color="#FFD700"
                        fill={props.buffedBikeStats || 0}
                        fillColor="#e4d00a"
                        icon="bicycle"
                        iconBuffed={!!props.buffedBikeStats}
                        hide={!props.buffedBikeStats || !!props.preferences['hud.status.buffs.disabled']}
                        iconSize={20}
                    />
                    <HudCircle
                        color="#AB47BC"
                        fill={props.harnessDurability === 1 ? 35 : props.harnessDurability === 2 ? 70 : props.harnessDurability === 3 ? 100 : props.harnessDurability === 100 ? props.harnessDurability : 0}
                        icon="user-slash"
                        hide={!props.preferences['hud.vehicle.harness.enabled'] || props.harnessDurability === 0}
                        iconSize={20}
                    />
                    <HudCircle
                        color="#e43f5a"
                        fill={props.pursuit}
                        icon="tachometer-alt"
                        hide={!props.radarShow || !props.pursuitShow}
                        iconSize={18}
                    />
                    <HudCircle
                        color="#47e10c"
                        fill={props.infected}
                        icon="biohazard"
                        hide={!props.infectedShow}
                    />
                    {props.radarShow && (
                        <div>
                            <HudCircle
                                color="#0048ff"
                                fill={100}
                                icon="car-alt"
                                hide={!props.autopilotShow}
                            />
                        </div>
                    )}
                    <HudCircle
                        color="#f08329"
                        fill={100}
                        icon="location-arrow"
                        hide={!props.collarShow}
                        iconSize={16}
                    />
                    <HudCircle
                        color="#e43f5a"
                        fill={props.boostCompletions}
                        icon="microchip"
                        hide={props.boostCompletions <= 0}
                        iconSize={16}
                    />
                    {props.showWeaponFireRate && (
                        <HudCircle
                            color="#e43f5a"
                            fill={100}
                            icon="stream"
                            hide={false}
                            iconSize={16}
                        />
                    )}
                    {props.showDriftMode && (
                        <HudCircle
                            color="#e34cfa"
                            fill={props.driftMode ? 100 : 0}
                            icon="car-crash"
                            hide={false}
                            iconSize={16}
                        />
                    )}
                    {props.showDriftThread && (
                        <HudCircle
                            color="#e43f5a"
                            fill={props.driftThread}
                            icon="history"
                            hide={false}
                            iconSize={16}
                        />
                    )}
                    {props.displayBoostingMinigameCooldown && (
                        <>
                            <MemoBoosting />
                        </>
                    )}
                    {!props.nosEnabled && (
                        <HudCircle
                            color="#e43f5a"
                            fill={props.nos}
                            icon="meteor"
                            hide={!props.preferences['hud.vehicle.nitrous.enabled'] || !props.nosShow}
                            iconSize={16}
                        />
                    )}
                    {props.nosEnabled && (
                        <>
                            <MemoNos />
                        </>
                    )}
                    {props.showMethLabStatus && (
                        <>
                            <HudCircle
                                transitionTime={props.methLabStatus.FRIDGE_TEMPERATURE === 100 ? '1s' : '60s'}
                                fill={props.methLabStatus.FRIDGE_TEMPERATURE > 0 ? props.methLabStatus.FRIDGE_TEMPERATURE : 0}
                                color="#4DD0E1"
                                icon="thermometer-quarter"
                            />
                            <HudCircle
                                transitionTime={props.methLabStatus.MIXER_HARDWARE === 100 ? '1s' : '60s'}
                                fill={props.methLabStatus.MIXER_HARDWARE > 0 ? props.methLabStatus.MIXER_HARDWARE : 0}
                                color="#607D8B"
                                icon="blender"
                            />
                            <HudCircle
                                transitionTime={props.methLabStatus.MIXER_INGREDIENTS === 100 ? '1s' : '60s'}
                                fill={props.methLabStatus.MIXER_INGREDIENTS > 0 ? props.methLabStatus.MIXER_INGREDIENTS : 0}
                                color="#5C6BC0"
                                icon="mortar-pestle"
                            />
                            <HudCircle
                                transitionTime={props.methLabStatus.MIXER_TEMPERATURE === 100 ? '1s' : '60s'}
                                fill={props.methLabStatus.MIXER_TEMPERATURE > 0 ? props.methLabStatus.MIXER_TEMPERATURE : 0}
                                color="#f44336"
                                icon="thermometer-full"
                            />
                            <HudCircle
                                transitionTime={props.methLabStatus.DISTIL_STEAM === 100 ? '1s' : '60s'}
                                fill={props.methLabStatus.DISTIL_STEAM > 0 ? props.methLabStatus.DISTIL_STEAM : 0}
                                color="#E0E0E0"
                                icon="bong"
                            />
                            <HudCircle
                                transitionTime={props.methLabStatus.DISTIL_SETTINGS === 100 ? '1s' : '60s'}
                                fill={props.methLabStatus.DISTIL_SETTINGS > 0 ? props.methLabStatus.DISTIL_SETTINGS : 0}
                                color="#FF9800"
                                icon="sliders-h"
                            />
                        </>
                    )}
                    {props.displayBlackjackTimer && (
                        <>
                            <MemoBlackjack />
                        </>
                    )}
                    {props.godModeEnabled && (
                        <HudCircle
                            color="#b8b679"
                            fill={100}
                            icon="feather-alt"
                        />
                    )}
                    {props.displayRouletteTimer && (
                        <>
                            <MemoRoulette />
                        </>
                    )}
                    {props.hasParachute && (
                        <HudCircle
                            color="black"
                            fill={100}
                            icon="parachute-box"
                            iconSize={16}
                        />
                    )}
                    {props.gameModeDev && (
                        <HudCircle
                            color={props.gameModeGod ? "#b8b679" : "black"}
                            fill={100}
                            icon="terminal"
                        />
                    )}
                    {props.gameModeDebug && (
                        <HudCircle
                            color="black"
                            fill={100}
                            icon="bug"
                        />
                    )}
                    {!props.voipStatus && (
                        <HudCircle
                            color="red"
                            fill={100}
                            icon="exclamation-triangle"
                            iconColor="red"
                        />
                    )}
                </div>

                {/* Car Hud */}
                {props.preferences['hud.vehicle.minimap.enabled'] && props.radarShow && (
                    <div className={classes.carhudWrapper}>
                        {props.waypointActive && (
                            <div className={classes.distanceWaypoint}>
                                <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>{Number(props.waypointDistance).toFixed(2)} mi</Typography>
                            </div>
                        )}

                        {!props.preferences['hud.vehicle.minimap.default'] && props.preferences['hud.vehicle.minimap.outline'] && (
                            <div className={classes.radarCircle} />
                        )}

                        <div className={classes.gauges}>
                            <div className={classes.mphGauge}>
                                <div className={classes.mphHolder}>
                                    <MemoSpeed
                                        label="mph"
                                        stateKey="speed"
                                    />
                                </div>
                                <div className={classes.fuelGauge}>
                                    <MemoSpeedCircle
                                        color={props.fuel < 25 ? 'red' : 'white'}
                                        icon="gas-pump"
                                        fill={props.fuel}
                                        label=""
                                        radius={30}
                                        strokeWidth={3}
                                        value={props.fuel}
                                        excludeTransition={true}
                                    />
                                </div>
                            </div>
                            {props.altitudeShow && (
                                <MemoSpeed
                                    label="alt"
                                    stateKey="alt"
                                />
                            )}
                            {props.beltShow && (
                                <div className={classes.iconHolder}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-slash" className="svg-inline--fa fa-user-slash fa-w-20 fa-fw fa-lg " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style={{ color: 'rgb(216, 67, 21)' }}><path fill="currentColor" d="M633.8 458.1L362.3 248.3C412.1 230.7 448 183.8 448 128 448 57.3 390.7 0 320 0c-67.1 0-121.5 51.8-126.9 117.4L45.5 3.4C38.5-2 28.5-.8 23 6.2L3.4 31.4c-5.4 7-4.2 17 2.8 22.4l588.4 454.7c7 5.4 17 4.2 22.5-2.8l19.6-25.3c5.4-6.8 4.1-16.9-2.9-22.3zM96 422.4V464c0 26.5 21.5 48 48 48h350.2L207.4 290.3C144.2 301.3 96 356 96 422.4z"></path></svg>
                                </div>
                            )}
                            {props.engineDamageShow && (
                                <div className={classes.iconHolder}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="oil-can" className="svg-inline--fa fa-oil-can fa-w-20 fa-fw fa-lg " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style={{ color: 'rgb(216, 67, 21)' }}><path fill="currentColor" d="M629.8 160.31L416 224l-50.49-25.24a64.07 64.07 0 0 0-28.62-6.76H280v-48h56c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H176c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h56v48h-56L37.72 166.86a31.9 31.9 0 0 0-5.79-.53C14.67 166.33 0 180.36 0 198.34v94.95c0 15.46 11.06 28.72 26.28 31.48L96 337.46V384c0 17.67 14.33 32 32 32h274.63c8.55 0 16.75-3.42 22.76-9.51l212.26-214.75c1.5-1.5 2.34-3.54 2.34-5.66V168c.01-5.31-5.08-9.15-10.19-7.69zM96 288.67l-48-8.73v-62.43l48 8.73v62.43zm453.33 84.66c0 23.56 19.1 42.67 42.67 42.67s42.67-19.1 42.67-42.67S592 288 592 288s-42.67 61.77-42.67 85.33z"></path></svg>
                                </div>
                            )}
                            {props.partsDamageShow && (
                                <div className={classes.iconHolder}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="oil-can" className="svg-inline--fa fa-oil-can fa-w-20 fa-fw fa-lg " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style={{ color: '#ff002b' }}><path fill="currentColor" d="M629.8 160.31L416 224l-50.49-25.24a64.07 64.07 0 0 0-28.62-6.76H280v-48h56c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16H176c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h56v48h-56L37.72 166.86a31.9 31.9 0 0 0-5.79-.53C14.67 166.33 0 180.36 0 198.34v94.95c0 15.46 11.06 28.72 26.28 31.48L96 337.46V384c0 17.67 14.33 32 32 32h274.63c8.55 0 16.75-3.42 22.76-9.51l212.26-214.75c1.5-1.5 2.34-3.54 2.34-5.66V168c.01-5.31-5.08-9.15-10.19-7.69zM96 288.67l-48-8.73v-62.43l48 8.73v62.43zm453.33 84.66c0 23.56 19.1 42.67 42.67 42.67s42.67-19.1 42.67-42.67S592 288 592 288s-42.67 61.77-42.67 85.33z"></path></svg>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {props.preferences['hud.crosshair.enabled'] && props.crosshairShow && (
                    <div className={classes.crosshairWrapper}>
                        <div className={classes.crosshair} />
                    </div>
                )}
            </div>
        </>
    );
}

export default Hud;