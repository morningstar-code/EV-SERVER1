import React from "react";
import AppWrapper from "components/ui-app/ui-app";
import Dispatch from "./components/dispatch";
import store from "./store";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/dev-data";
import { getDispatchStateKey } from "./actions";
import Notification from "./components/dispatch/components/notification";

const { mapStateToProps, mapDispatchToProps } = compose(store);

interface DispatchState {
    active: boolean;
    processed: any;
    show: boolean;
    showWithMap: boolean;
    updateNumber: number;
}

class Container extends React.Component<any, DispatchState> {
    constructor(props: any) {
        super(props);

        this.state = {
            active: false,
            processed: [],
            show: false,
            showWithMap: false,
            updateNumber: 0
        }
    }

    _update = () => {
        this.setState({
            updateNumber: this.state.updateNumber + 1
        });
    }

    _processNotification = (notification: any) => {
        setTimeout(() => {
            const processed = this.state.processed;
            processed.push(notification);
            this.setState({ processed: processed });
        }, 5000);
    }

    onEvent = (eventData: any) => {
        const action = eventData?.action;

        switch (action) {
            case 'toggleDuty':
                const active = eventData.data.active;
                this.setState({ active: active });
                break;
            case 'addPing':
                const pings = this.props.pings;
                pings.unshift(eventData.data);
                this._update();
                if (this.state.show || eventData.data['_hideNotification']) {
                    const processed = this.state.processed;
                    processed.push(eventData.data.ctxId);
                    this.setState({ processed: processed });
                } else {
                    this._processNotification(eventData.data.ctxId);
                }
                break;
            case 'delPing':
                const pingIdx = getDispatchStateKey('pings').findIndex((ping: any) => ping.ctxId === eventData.data.ctxId);
                if (pingIdx !== -1) {
                    this.props.pings.splice(pingIdx, 1);
                    this.props.updateState({
                        pings: this.props.pings
                    });
                    this._update();
                }
                break;
            case 'addCall':
                const newData = {
                    unitsPolice: [],
                    unitsPoliceCount: 0,
                    unitsEMS: [],
                    unitsEMSCount: 0,
                    ...eventData.data
                }

                const inactiveCalls = [
                    ...getDispatchStateKey('inactiveCalls'),
                    newData
                ];
                const callIds = getDispatchStateKey('callIds');

                callIds.push(newData.ctxId);

                this.props.updateState({
                    calls: [
                        ...getDispatchStateKey('calls'),
                        newData
                    ],
                    inactiveCalls: inactiveCalls,
                    callIds: callIds
                });

                this._update();
                break;
            case 'delCall':
                const callIdx = getDispatchStateKey('calls').findIndex((call: any) => call.ctxId === eventData.data.ctxId);
                if (callIdx !== -1) {
                    this.props.calls.splice(pingIdx, 1);
                    this.props.updateState({
                        calls: this.props.calls
                    });
                    this._update();
                }
                break;
            case 'updateUnitAssignments':
                this.updateUnitAssignments(eventData.data);
                break;
            case 'setRadioForCall':
                const calls = getDispatchStateKey('calls');
                const activeCalls = getDispatchStateKey('activeCalls');
                const foundCallIdx = calls.findIndex((call: any) => call.ctxId === eventData.data.ctxId);
                const foundActiveCallIdx = activeCalls.findIndex((call: any) => call.ctxId === eventData.data.ctxId);

                if (foundCallIdx !== -1) {
                    calls[foundCallIdx].radio = eventData.data.radio;
                }

                if (foundActiveCallIdx !== -1) {
                    activeCalls[foundActiveCallIdx].radio = eventData.data.radio;
                }

                this.props.updateState({
                    calls: calls,
                    activeCalls: activeCalls
                });

                break;
            case 'updateUnits':
                const data = eventData?.data;
                const units = data?.units ?? getDispatchStateKey('units');
                const playerUnit = data?.playerUnit ?? getDispatchStateKey('playerUnit'); //TODO; REMOVE THIS DOGSHIT CANCER
                
                this.props.updateState({
                    units: units,
                    playerUnit: playerUnit
                });

                this._update();
                break;
            case 'initLoad':
                this.getInitialLoad(eventData.data.active);
                break;
        }
    }

    updateUnitAssignments = (unitAssignments: any, dispatchCalls = null, dispatchUnits = null, data = null) => {
        let units = dispatchUnits || getDispatchStateKey('units');
        let calls = dispatchCalls || getDispatchStateKey('calls');

        const unitToCallId = {};
        const callIdToUnit = {};

        if (dispatchCalls) {
            calls = calls.map((call: any) => {
                return {
                    ...call,
                    unitsPolice: [],
                    unitsPoliceCount: 0,
                    unitsEMS: [],
                    unitsEMSCount: 0
                }
            });
        }

        unitAssignments.forEach((unitAssignment: any) => {
            const foundUnit = units.find((unit: any) => unit.serverId === unitAssignment.serverId);

            if (foundUnit) {
                unitToCallId[foundUnit.serverId] = unitAssignment.ctxId;
                callIdToUnit[unitAssignment.ctxId] || (callIdToUnit[unitAssignment.ctxId] = {
                    unitsPolice: [],
                    unitsPoliceCount: 0,
                    unitsEMS: [],
                    unitsEMSCount: 0
                });

                if (foundUnit.job === 'police') {
                    callIdToUnit[unitAssignment.ctxId].unitsPolice.push(foundUnit);
                    if (units) {
                        callIdToUnit[unitAssignment.ctxId].unitsPoliceCount += 1 + units?.filter((unit: any) => unit.attachedTo === foundUnit.serverId).length;
                    }
                } else if (foundUnit.job === 'ems') {
                    callIdToUnit[unitAssignment.ctxId].unitsEMS.push(foundUnit);
                    if (units) {
                        callIdToUnit[unitAssignment.ctxId].unitsEMSCount += 1 + units?.filter((unit: any) => unit.attachedTo === foundUnit.serverId).length;
                    }
                }
            }
        });

        const values = Object.values(unitToCallId);

        const activeCalls = [];
        const inactiveCalls = [];

        calls.forEach((call: any) => {
            const combined = { ...call, ...callIdToUnit[call.ctxId] || {} };

            values.includes(combined.ctxId) ? activeCalls.push(combined) : inactiveCalls.push(combined);
        });

        this.props.updateState({
            ...data,
            activeCalls: activeCalls,
            calls: calls,
            inactiveCalls: inactiveCalls
        });

        this._update();
    }

    getInitialLoad = async (active: boolean) => {
        if (!this.props.initialLoadComplete) {
            const dispatchData = await nuiAction('ev-ui:getDispatchData', {}, { returnData: devData.getDispatchData() });
            if (dispatchData) {
                const callsReversed = dispatchData.data?.calls?.reverse();
                const pingsReversed = dispatchData.data?.pings?.reverse();

                this.updateUnitAssignments(
                    dispatchData?.data?.unitAssignments,
                    callsReversed,
                    dispatchData?.data?.units,
                    { ...dispatchData.data, pings: pingsReversed }
                );

                this.props.updateState({
                    initialLoadComplete: true
                });

                const processed = pingsReversed.map((ping: any) => {
                    return ping.ctxId;
                });

                this.setState({
                    processed: processed
                });
            }
        }

        this.setState({ active: active });
    }

    onShow = (data: any) => {
        this.setState({
            show: true, showWithMap: !!data?.showWithMap
        });
    }

    onHide = () => {
        this.setState({
            show: false,
            showWithMap: false
        });
    }

    render() {
        return (
            <AppWrapper
                center
                name="dispatch"
                onEvent={this.onEvent}
                onShow={this.onShow}
                onHide={this.onHide}
                onEscape={this.onHide}
            >
                {this.props.initialLoadComplete && this.state.show && (
                    <Dispatch {...this.state} />
                )}
                {this.state.active && this.props.initialLoadComplete && !this.state.show && (
                    <Notification {...this.state} processNotification={this._processNotification} processed={this.state.processed}  />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);