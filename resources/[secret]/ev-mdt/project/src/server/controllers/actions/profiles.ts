import { Repository } from "server/database/repository";

export const getOfficerProfiles = async (data: any): Promise<any> => {
    const [success, officerProfiles] = await Repository.getOfficerProfiles();

    return {
        message: officerProfiles,
        success: success
    };
}

export const getCivilianProfiles = async (data: { name: string }): Promise<any> => {
    const [success, civilianProfiles] = await Repository.getCivilianProfiles(data.name);

    return {
        message: civilianProfiles,
        success: success
    };
}

export const getCivilianProfilesPublic = async (data: { name: string }): Promise<any> => {
    const [success, civilianProfiles] = await Repository.getCivilianProfilesPublic(data.name);

    return {
        message: civilianProfiles,
        success: success
    };
}

export const getCivilianProfile = async (data: { profile: { id: number } }): Promise<any> => {
    const [success, civilianProfile] = await Repository.getCivilianProfile(data.profile.id);

    return {
        message: civilianProfile,
        success: success
    };
}

export const changeVehicleData = async (data: { vehicle: { plate: string, vin: string }, type: string, vin: string, value: string }): Promise<any> => {
    const [success, vehicle] = await Repository.changeVehicleData(data);
    
    return {
        message: vehicle,
        success: success
    };
}

export const updateImpoundData = async (data: any): Promise<any> => {
    const [success, impound] = await Repository.updateImpoundData(data);

    return {
        message: impound,
        success: success
    };
}

export const expungeCiv = async (data: { profile_civ_id: number }): Promise<any> => {
    const [success, expunge] = await Repository.expungeCiv(data);

    return {
        message: expunge,
        success: success
    };
}

export const resetDrivingPoints = async (data: { id: number }): Promise<any> => {
    const [success, drivingPoints] = await Repository.resetDrivingPoints(data);

    return {
        message: drivingPoints,
        success: success
    };
}

export const editCivilianProfile = async (data: CivilianProfile, ignoreEdit = false): Promise<any> => {
    const [success, civilianProfile] = await Repository.editCivilianProfile(data, ignoreEdit);

    return {
        message: civilianProfile,
        success: success
    };
}

global.exports("createCivilianProfile", (characterId: number, name: string) => {
    editCivilianProfile({
        character_id: characterId,
        name: name,
        profile_image_url: "",
        summary: "",
        parole_end_timestamp: 0,
        driving_license_points_start_date: 0,
        drivers_points: 0,
        is_wanted: false,
        tags: [],
        priors: []
    }, true);
});