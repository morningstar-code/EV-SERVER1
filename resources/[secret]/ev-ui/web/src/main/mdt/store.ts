import { StoreObject } from "lib/redux";
import moment from "moment";

const appName = "mdt"

export const getDefaultEvidenceAdd = () => {
    return {
        identifier: '',
        cid: null
    }
}

export const getDefaultEvidenceCreate = () => {
    return {
        type: 'other',
        identifier: '',
        description: '',
        cid: null
    }
}

export const getDefaultTagCreate = () => {
    return {
        category_id: 1,
        text: ''
    }
}

export const getDefaultCertCreate = () => {
    return {
        name: '',
        description: ''
    }
}

export const getEvidenceTypes = () => {
    return [
        {
            id: 'other',
            name: 'Other',
            color: '#FFEB3B',
            colorText: 'black'
        },
        {
            id: 'blood',
            name: 'Blood',
            color: '#f44336',
            colorText: 'white'
        },
        {
            id: 'casing',
            name: 'Casing',
            color: '#7FB962',
            colorText: 'black'
        },
        {
            id: 'weapon',
            name: 'Weapon',
            color: '#E0E0E0',
            colorText: 'black'
        },
        {
            id: 'projectile',
            name: 'Projectile',
            color: '#FF9800',
            colorText: 'black'
        },
        {
            id: 'glass',
            name: 'Glass',
            color: '#03A9F4',
            colorText: 'black'
        },
        {
            id: 'vehiclefragment',
            name: 'Vehicle Fragment',
            color: '#9C27B0',
            colorText: 'white'
        },
        {
            id: 'photo',
            name: 'Photo',
            color: '#4CAF50',
            colorText: 'black'
        },
        {
            id: 'strain',
            name: 'Strain',
            color: '#db9a00',
            colorText: 'black'
        }
    ]
}

export const getDefaultProfileCreate = () => {
    return {
        state_id: '',
        name: '',
        profile_image_url: '',
        summary: '',
        drivers_points: 0,
        is_wanted: false,
        tags: [],
        evidence: [],
        priors: [],
        licenses: []
    }
}

export const getDefaultIncidentDescription = (profileData: any, charData: any) => {
    return `**${profileData.department ?? 'Police'} Report**\n\n ${moment.utc().format('YYYY-MM-DD HH:mm:ss')} UTC\n\n **Reporting Officer**\n\n @${profileData.callsign ?? 'N/a'} ${profileData.rank ?? 'Officer'} ${profileData.name ?? `${charData.first_name} ${charData.last_name}`}\n\n\n **Assisting Officer/s:**\n\n  **Suspect/s:**\n\n  **Victim/s:**\n\n  **Witnesses:**\n\n  **Location:**\n\n  **Debrief:**\n`
}

export const getDefaultIncident = (profileData: any, charData: any, id = null) => {
    const description = getDefaultIncidentDescription(profileData, charData);
    return {
        id: id,
        title: '',
        description: description,
        civs: [
            {
                name: 'Devlin Weloper',
                id: 1004,
                drivers_points: 1,
                guilty: 0,
                warrant: 0,
                warrant_expiry_timestamp: 0,
                processed: 0,
                processed_by: 0,
                parole_end_timestamp: 1606499364,
                warrants: [],
                charges: [
                    {
                        id: 4,
                        name: 'Calling it the MDT',
                        accessory: 0,
                        time: 10,
                        fine: 100,
                        points: 0,
                    },
                    {
                        id: 3,
                        name: 'Calling it the MDT',
                        accessory: 1,
                        time: 25,
                        fine: 250,
                        points: 0,
                    },
                ],
                tags: [
                    {
                        id: 1,
                        parent_id: 1,
                        color: 'black',
                        color_text: 'white',
                        icon: 'microscope',
                        text: 'hi1',
                    },
                    {
                        id: 2,
                        parent_id: 1,
                        color: 'black',
                        color_text: 'white',
                        icon: 'microscope',
                        text: 'hi2',
                    },
                ],
            },
        ],
        officers: [],
        evidence: [],
        tags: []
    }
}

const store: StoreObject = {
    key: appName,
    initialState: {
        charges: [],
        evidenceAdd: getDefaultEvidenceAdd(), //() => getDefaultEvidenceAdd()
        evidenceCreate: getDefaultEvidenceCreate(), //() => getDefaultEvidenceCreate()
        fadeOut: false,
        isSearchLoading: false,
        modal: false,
        modalLoading: false,
        modalStyle: {},
        myProfile: {},
        officers: [],
        permissions: { steam: false, steam_id: '' },
        publicApp: false,
        tabs: 1,
        tabActive: 1,
        tabsRemoved: [],
        tagCategories: [],
        tagCreate: getDefaultTagCreate(), //() => getDefaultTagCreate()
        certCreate: getDefaultCertCreate(), //() => getDefaultCertCreate()
        tags: [],
        vehicles: [],
        impounds: [],
        vehicleHistory: [],
        useNewApi: true,
    },
};

export default store;