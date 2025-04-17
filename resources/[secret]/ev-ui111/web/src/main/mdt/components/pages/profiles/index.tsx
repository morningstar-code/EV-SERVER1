import { nuiAction } from "lib/nui-comms";
import { mdtAction, showMdtLoadingModal } from "main/mdt/actions";
import React from "react";
import { Wait } from "utils/misc";
import Page from "./page";
import { getDefaultProfileCreate } from "main/mdt/store";

export const profileMarkDownData: any = {};

const getStorageName = (storage: any) => {
    const storegeUnitBusinesses = {
        rr_hotel: 'Roosters Inn',
        casino_hotel: 'Diamond Casino Hotel',
        paynless: 'Pay-N-Less'
    }
    return storegeUnitBusinesses[storage.business] || storage.business;
}

class Profiles extends React.Component<any> {
    timeout = null;

    state = {
        searchValue: ''
    }

    search = async (value: any) => {
        this.props.updateState({
            isSearchLoading: true,
            profiles: []
        });

        this.setState({
            searchValue: value
        });

        if (!(this.state.searchValue === value || value.length < 3)) {
            await Wait(500);

            const results = await mdtAction(this.props.publicApp ? 'getCivilianProfilesPublic' : 'getCivilianProfiles', { name: value }, [
                {
                    id: 1,
                    name: 'Devlin Weloper',
                    profile_image_url: 'https://i.imgur.com/ttNVaPp.png',
                    summary: 'Something happened...',
                    parole_end_timestamp: 1606499463,
                    driving_license_points_start_date: 0,
                    drivers_points: 0,
                    is_wanted: false,
                    licenses: [],
                    tags: [
                        {
                            id: 1,
                            icon: null,
                            text: 'Test Tag',
                            color_text: '#ffffff',
                            color: '#000000'
                        }
                    ],
                    priors: [
                        {
                            name: 'Hellogasdqweuiotzxcnmqwertyuioplmnbxczasd',
                            count: 1,
                        }
                    ]
                }
            ]);

            this.props.updateState({
                isSearchLoading: false,
                profiles: results.data
            });
        }

        clearTimeout(this.timeout);

        this.props.updateState({
            isSearchLoading: false
        });

        return;
    }

    refreshProfile = async (profile: any) => {
        const results = await Promise.all([
            nuiAction('getCivilianProfile', { profile: profile }, { returnData: profile }),
            nuiAction('ev-ui:getHousingInformation', { profile: profile }, {
                returnData: [
                    {
                        address: '123 who cares bro',
                        key_type: 'Key Holder'
                    }
                ]
            }),
            nuiAction('ev-business:hotel:ui:getRooms', { cid: profile.id }, {
                returnData: [
                    {
                        id: '123 who cares bro',
                        name: 'Casino Hotel Room 501'
                    }
                ]
            }),
            nuiAction('ev-storageunits:client:getAccessLogs', { cid: profile.id }, {
                returnData: [
                    {
                        id: '123 who cares bro',
                        business: 'Casino Hotel Room 501',
                        unitId: 1
                    }
                ]
            }),
            nuiAction('ev-mdt:getVehiclesByCharacterId', { character: { id: profile.id } }, {
                returnData: [
                    {
                        name: 'Jugular',
                        plate: 'DW',
                        parking_garage: 'Q',
                        strikes: 0,
                        records: []
                    }
                ]
            }),
            nuiAction('ev-ui:getLicenses', { character: { id: profile.id } }, {
                returnData: [
                    {
                        id: 1,
                        name: 'Drivers License'
                    },
                    {
                        id: 2,
                        name: 'Weapons License'
                    },
                    {
                        id: 3,
                        name: 'Bar License'
                    }
                ]
            }),
            nuiAction('ev-ui:getEmploymentInformation', { character: { id: profile.id } }, { returnData: [] }),
            nuiAction('ev-mdt:getPlayerOnlineStatus', { character: { id: profile.id } }, {
                returnData: [
                    {
                        online: true
                    }
                ]
            }),
            nuiAction('ev-ui:getApartmentInformation', { profile: profile }, {
                returnData: {
                    apartment: 'No 1'
                }
            }),
        ]);

        const profileData = results[0].data;
        const housingData = results[1].data;
        const hotelData = results[2].data;
        const storageData = results[3].data;
        const vehicleData = results[4].data;
        const licenseData = results[5].data;
        const employmentData = results[6].data;
        const onlineStatus = results[7].data;
        const apartmentData = results[8].data;

        const p = {
            ...profileData,
            employment: employmentData,
            housing: housingData,
            apartment: apartmentData,
            hotels: hotelData,
            storage: (storageData && storageData.length > 0 && storageData.map((s: any) => {
                return {
                    ...s,
                    name: getStorageName(s)
                }
            })) ?? [],
            licenses: licenseData,
            vehicles: (vehicleData && vehicleData.length > 0 && vehicleData.map((v: any) => {
                // v.strikes = Math.min(
                //     30,
                //     v.records.filter((r: any) => {
                //         return r.impoundDate >= Date.now() - 2592000000;
                //     }).map((r: any) => {
                //         return r.strike;
                //     }).reduce((a, b) => a + b, 0)
                // )
                v.name = v.name !== null ? v.name : v.model;
                v.strikes = 0;

                return v
            })) ?? [],
            isOnline: onlineStatus?.online
        }

        await Wait(1000);

        showMdtLoadingModal(false);

        this.props.updateState({
            profile: p
        });
    }

    suspendLicense = async (profile: any, license: any) => {
        showMdtLoadingModal(true);
        await nuiAction('ev-ui:revokeLicense', { license: license, target_id: profile.id }) //This nui callback is inside ev-gov/cl_state_management.lua
        this.refreshProfile(profile);
    }

    resetDrivingPoints = (profile: any) => {
        showMdtLoadingModal(true);
        mdtAction('resetDrivingPoints', profile);
        this.refreshProfile(profile);
    }

    selectProfile = (data: any) => {
        showMdtLoadingModal(true);
        this.refreshProfile(data);
    }

    updateField = (name: string, value: string) => {
        const profileCopy = { ...this.props.profile };
        profileCopy[name] = value;
        this.props.updateState({ profile: profileCopy });
    }

    createNew = () => {
        const defaultProfile = getDefaultProfileCreate();
        this.props.updateState({ profile: defaultProfile });
    }

    save = async () => {
        const summary = typeof profileMarkDownData[this.props.profile.id || -1] === 'function' ? profileMarkDownData[this.props.profile.id || -1]() : this.props.profile.name;
        if (this.props.profile.name && summary) {
            showMdtLoadingModal(true);
            const profile = {
                ...this.props.profile,
                summary: summary
            };
            profile.character_id = Number(profile.id ? profile.id : profile.state_id);
            await mdtAction('editCivilianProfile', profile);
            profile.id = profile.character_id;
            this.refreshProfile(profile);
        }
        return;
    }

    addLicense = async (licenseId: number) => { //string
        showMdtLoadingModal(true);
        await nuiAction('ev-ui:grantLicense', { license: { id: licenseId }, target_id: this.props.profile.id }) //This nui callback is inside ev-gov/cl_state_management.lua
        this.refreshProfile(this.props.profile);
    }

    render() {
        return (
            <Page {...this.props} addLicense={this.addLicense} createNew={this.createNew} resetDrivingPoints={this.resetDrivingPoints} save={this.save} search={this.search} searchValue={this.state.searchValue} selectProfile={this.selectProfile} suspendLicense={this.suspendLicense} updateField={this.updateField} refreshProfile={this.refreshProfile} />
        )
    }
}

export default Profiles;