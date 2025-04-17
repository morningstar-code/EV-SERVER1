import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getDispatchStateKey } from 'main/dispatch/actions';
import { nuiAction } from 'lib/nui-comms';
import Map from './map';
import './map.scss';

const policeVehicleTypes = {
    car: 'car',
    bike: 'motorcycle',
    bicycle: 'bicycle',
    heli: 'helicopter',
    interceptor: 'horse-head',
}

const emsVehicleTypes = {
    car: 'ambulance',
    heli: 'helicopter',
}

let dispatchMapState = null;

let mapMarkerPings = {};
let mapMarkerCalls = {};
let mapMarkerUnits = {};
let deletedCallIds = [];

const mapBounds = [
    [-2696, -3716],
    [5496, 4476],
] as any;

const markerTypes = {
    unit: function (unit) {
        return 'police' === unit.job
            ? {
                className: 'map-icon map-icon-unit',
                html: '<i class="fa fa-'.concat(
                    policeVehicleTypes[unit.vehicle],
                    ' fa-2x"></i>'
                ),
                offset: L.point(10, 0),
            }
            : {
                className: 'map-icon map-icon-ems',
                html: '<i class="fas fa-'.concat(
                    emsVehicleTypes[unit.vehicle],
                    ' fa-1x"></i>'
                ),
                offset: L.point(0, 0),
            }
    },
    ping: function () {
        return {
            className: 'map-icon map-icon-ping',
            html: '<i class="fa fa-map-pin fa-2x"></i>',
            offset: L.point(0, 0),
        }
    },
    call: function () {
        return {
            className: 'map-icon map-icon-call',
            html: '<i class="fas fa-map-marker-alt fa-2x"></i>',
            offset: L.point(0, 0),
        }
    }
}

const calculatePosition = (pos: number[]) => {
    return [0.66 * pos[0], 0.66 * pos[1]];
}

const addMapMarker = (data: any) => {
    const type = data.type;
    const markerData = markerTypes[type](data);
    const mapPos: any = calculatePosition(data.latLng || [0, 0]);
    const icon = L.divIcon({
        html: markerData.html,
        iconSize: [20, 20],
        className: markerData.className
    });

    return (
        L.marker(mapPos, { icon: icon }).addTo(dispatchMapState).bindTooltip(data.tooltip, {
            permanent: true,
            interactive: false,
            direction: 'right',
            offset: markerData.offset,
            className: 'map-tooltip'
        }).openTooltip()
    )
}

class MapWrapper extends React.Component<any, { map: any }> {
    constructor(props) {
        super(props);

        this.state = {
            map: null
        }
    }

    _addPing = (ping) => {
        if (ping?.data.origin !== undefined && ping?.data.origin?.x !== undefined) {
            const includes = getDispatchStateKey('calls').map((call) => {
                return call?.ctxId
            }).includes(ping.data.ctxId);

            if (!includes) {
                mapMarkerPings[ping.data.ctxId] = addMapMarker({
                    latLng: [ping.data.origin.y, ping.data.origin.x],
                    type: 'ping',
                    tooltip: `${ping.data.ctxId}`
                });
            }
        }
    }

    _delPing = (ping) => {
        try {
            dispatchMapState.removeLayer(mapMarkerPings[ping.data.ctxId]);
            mapMarkerPings[ping.data.ctxId] = null;
        } catch (e) { }
    }

    _addCall = (call) => {
        if (call?.data?.origin && call?.data?.origin?.x) {
            mapMarkerCalls[call.data.ctxId] = addMapMarker({
                latLng: [call.data.origin.y, call.data.origin.x],
                type: 'call',
                tooltip: `${call.data.ctxId}`
            });
        }
    }

    _delCall = (call) => {
        try {
            deletedCallIds.push(call.data.ctxId);
            dispatchMapState.removeLayer(mapMarkerCalls[call.data.ctxId]);
            mapMarkerCalls[call.data.ctxId] = null;
        } catch (e) { }
    }

    _onEventWrapper = (eventData: any) => {
        if (eventData && eventData.data && eventData.data.source === 'ev-nui' && eventData.data.app === 'dispatch') {
            const data = eventData.data.data;

            switch (data.action) {
                case 'addPing':
                    this._addPing(data);
                    break;
                case 'delPing':
                    this._delPing(data);
                    break;
                case 'addCall':
                    this._addCall(data);
                    break;
                case 'delCall':
                    this._delCall(data);
                    break;
                case 'updateUnitLocations':
                    data.data.forEach((unit) => {
                        const coords = unit.coords;
                        const serverId = unit.serverId;

                        try {
                            if (!coords) return;

                            const unitFound = getDispatchStateKey('units').find((u) => !!u && u.serverId === serverId);

                            if (!unitFound) return;

                            mapMarkerUnits[unitFound.serverId] ? mapMarkerUnits[unitFound.serverId].setLatLng(calculatePosition([coords.y, coords.x]))
                                : unitFound.attachedTo || (mapMarkerUnits[unitFound.serverId] = addMapMarker({
                                    type: 'unit',
                                    tooltip: unitFound.callSign,
                                    job: unitFound.job,
                                    vehicle: unitFound.vehicle,
                                    latLng: [coords.y, coords.x]
                                }));
                        } catch (e: any) {
                            console.log('updateUnitLocations', e.message)
                        }
                    });
                    break;
                case 'removeUnit':
                    try {
                        if (mapMarkerUnits[data.data.serverId]) {
                            dispatchMapState.removeLayer(mapMarkerUnits[data.data.serverId]);
                            mapMarkerUnits[data.data.serverId] = null;
                        }
                    } catch (e) { }
                    break;
            }
        }
    }

    componentDidMount() {
        dispatchMapState = L.map('dispatch-map-container', {
            crs: L.CRS.Simple,
            minZoom: -3,
            maxZoom: 0,
            maxBounds: mapBounds,
            maxBoundsViscosity: 1,
            attributionControl: false
        });

        const imageUrl = 'https://gta-assets.subliminalrp.net/images/dispatch-map.png';

        L.imageOverlay(imageUrl, mapBounds).addTo(dispatchMapState);

        dispatchMapState.setView([1432, 370], -3);

        getDispatchStateKey('pings').map((ping) => {
            return this._addPing({ data: ping });
        });

        getDispatchStateKey('calls').map((call) => {
            return deletedCallIds.includes(call?.ctxId) || this._addCall({ data: call });
        });

        window.addEventListener('message', this._onEventWrapper);
    }

    componentWillUnmount() {
        dispatchMapState.remove();

        nuiAction('ev-ui:dispatchToggleMapListener', {
            active: false
        });

        mapMarkerPings = {};
        mapMarkerCalls = {};
        mapMarkerUnits = {};

        window.removeEventListener('message', this._onEventWrapper);
    }

    render() {
        return (
            <Map />
        );
    }
}

export default MapWrapper;