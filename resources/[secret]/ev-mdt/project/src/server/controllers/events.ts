import { Procedures } from "@cpx/server";
import { getBusinessEmploymentHistory, getBusinesses, getEmployeesByBusinessId, updateBusinessName, updateBusinessOwner } from "./actions/business";
import { getCharges } from "./actions/charges";
import { addInvItem, addRolePermission, getAllConfigOptions, getRolePermissions, hasConfigPermission, insertConfigOption, updateConfigOption } from "./actions/config";
import { changeVehicleData, editCivilianProfile, expungeCiv, getCivilianProfile, getCivilianProfiles, getCivilianProfilesPublic, getOfficerProfiles, resetDrivingPoints, updateImpoundData } from "./actions/profiles";
import { addEvidenceToResource, addResourceLink, createEvidenceVehicle, deleteResourceItem, removeResourceLink } from "./actions/resource";
import { editReport, exportReport, getReport, getReportCategories, getReports, promoteReport, searchReports } from "./actions/resource/reports";
import { editTag, getTagCategories, getTags } from "./actions/tags";
import { getBolos, getBulletins, getWarrants } from "./actions/dashboard";
import { editCert, getCerts } from "./actions/certs";
import { editEvidence, getEvidence, getSingleEvidence } from "./actions/evidence";
import { editIncident, editIncidentCiv, editIncidentCivCharges, exportIncidentCiv, getIncident, getIncidents, removeIncidentCiv, searchIncidents } from "./actions/resource/incidents";

export const InitEvents = async (): Promise<void> => { }

//TODO; Figure out when they actually add the charges/priors to the civ profile? (They add it when guilty and processed is saved)
RPC.register("ev-ui:mdtApiRequest", (pSource: number, pData: { action: string, data: any }) => {
    // console.log(`[ev-ui:mdtApiRequest] Action: ${pData.action} | Data: ${JSON.stringify(pData.data)}`);
    let result: any = {
        message: null,
        success: false
    };
    switch (pData.action) {
        case "getTags":
            result = getTags(pData.data);
            break;
        case "getTagCategories": //Returns all tag categories
            result = getTagCategories(pData.data);
            break;
        case "editTag":
            result = editTag(pData.data);
            break;
        case "getCerts": //Returns all certs
            result = getCerts(pData.data);
            break;
        case "editCert":
            result = editCert(pData.data);
            break;
        case "getOfficerProfiles": //Returns all officer profiles (staff)
            result = getOfficerProfiles(pData.data);
            break;
        case "getCivilianProfiles": //Returns civilian profiles based on search
            result = getCivilianProfiles(pData.data);
            break;
        case "getCivilianProfilesPublic": //Returns civilian profiles based on search
            result = getCivilianProfilesPublic(pData.data);
            break;
        case "getCivilianProfile": //Returns specificed civilian profile
            result = getCivilianProfile(pData.data);
            break;
        case "getPropertyOwnershipHistory": //np-housing
            break;
        case "getBusinesses":
            result = getBusinesses(pData.data);
            break;
        case "getEmployeesByBusinessId":
            result = getEmployeesByBusinessId(pData.data);
            break;
        case "getBusinessEmploymentHistory":
            result = getBusinessEmploymentHistory(pData.data);
            break;
        case "updateBusinessName":
            result = updateBusinessName(pData.data);
            break;
        case "updateBusinessOwner":
            result = updateBusinessOwner(pData.data);
            break;
        case "getCharges":
            result = getCharges(pData.data);
            break;
        case "addInvItem":
            result = addInvItem(pSource, pData.data);
            break;
        case "addRolePermission":
            result = addRolePermission(pData.data);
            break;
        case "getRolePermissions":
            result = getRolePermissions(pData.data);
            break;
        case "hasConfigPermission": //Returns an object containing steam and steamId (Checks if their admin)
            result = hasConfigPermission(pSource, pData.data);
            break;
        case "getAllConfigOptions":
            result = getAllConfigOptions(pData.data);
            break;
        case "insertConfigOption":
            result = insertConfigOption(pData.data);
            break;
        case "updateConfigOption":
            result = updateConfigOption(pData.data);
            break;
        case "getIncident": //Returns specificed incidents data
            result = getIncident(pData.data);
            break;
        case "getIncidents": //Returns all incidents
            result = getIncidents(pData.data);
            break;
        case "editIncident": //Edits an incident
            result = editIncident(pSource, pData.data);
            break;
        case "editIncidentCiv": //Edits a civ (crim) in an incident
            result = editIncidentCiv(pData.data);
            break;
        case "editIncidentCivCharges": //Edits charges for a civ (crim) in an incident
            result = editIncidentCivCharges(pData.data);
            break;
        case "removeIncidentCiv": //Removes a civ (crim) from an incident
            result = removeIncidentCiv(pData.data);
            break;
        case "exportIncidentCiv": //Exports a civ (crim) from an incident
            result = exportIncidentCiv(pData.data);
            break;
        case "searchIncidents": //Searches incidents
            result = searchIncidents(pData.data);
            break;
        case "getReport": //Returns specificed report data
            result = getReport(pData.data);
            break;
        case "getReports": //Returns all reports
            result = getReports(pData.data);
            break;
        case "editReport": //Edits a report
            result = editReport(pSource, pData.data);
            break;
        case "searchReports": //Searches reports
            result = searchReports(pData.data);
            break;
        case "exportReport": //Exports a report
            result = exportReport(pData.data);
            break;
        case "promoteReport": //Promotes a report to an incident
            result = promoteReport(pData.data);
            break;
        case "getReportCategories": //Returns all report categories
            result = getReportCategories(pData.data);
            break;
        case "getWarrants": //Returns all warrants
            result = getWarrants(pData.data);
            break;
        case "getBolos": //Returns all bolos
            result = getBolos(pData.data);
            break;
        case "getBulletins": //Returns all bulletins
            result = getBulletins(pData.data);
            break;
        case "getEvidence": //Returns all evidence
            result = getEvidence(pData.data);
            break;
        case "getSingleEvidence": //Returns specificed evidence data
            result = getSingleEvidence(pData.data);
            break;
        case "editEvidence": //Edits evidence
            result = editEvidence(pData.data);
            break;
        case "createEvidenceVehicle": //Creates a vehicle evidence
            result = createEvidenceVehicle(pData.data);
            break;
        case "changeVehicleData":
            result = changeVehicleData(pData.data);
            break;
        case "updateImpoundData":
            result = updateImpoundData(pData.data);
            break;
        case "getVehicleImpounds": //np-jobs
            break;
        case "getVehicleOwnershipHistory": //np-jobs
            break;
        case "expungeCiv": //Expunges a civ (removes all their priors)
            result = expungeCiv(pData.data);
            break;
        case "resetDrivingPoints":
            result = resetDrivingPoints(pData.data);
            break;
        case "editCivilianProfile":
            result = editCivilianProfile(pData.data);
            break;
        case "addResourceLink": //Example: Adding a person, adding officers, creating/adding tags to an incident/report/etc
            result = addResourceLink(pData.data);
            break;
        case "removeResourceLink": //Example: Removing a person, removing officers, removing tags from an incident/report/etc
            result = removeResourceLink(pData.data);
            break;
        case "deleteResourceItem": //Deletes incidents, reports, legislation, profiles, etc
            result = deleteResourceItem(pData.data);
            break;
        case "addEvidenceToResource": //Adds evidence to incident aswell as it's own table (generates uniqueId used in both tables)
            result = addEvidenceToResource(pData.data);
            break;
    }
    return result;
});

RegisterCommand("generateprofile", async () => {
    // await SQL.execute("INSERT INTO _mdt_profile_officer (character_id, alias, callsign, department_id, rank_id, profile_image_url, phone_number) VALUES (@character_id, @alias, @callsign, @department_id, @rank_id, @profile_image_url, @phone_number)", {
    //     character_id: 724,
    //     alias: "Cool",
    //     callsign: "123",
    //     department_id: 1,
    //     rank_id: 9,
    //     profile_image_url: "https://i.imgur.com/1ZQ3Z0M.png",
    //     phone_number: "123-456-7890"
    // });
    // console.log("Inserted Officer Profile");
    // await SQL.execute("INSERT INTO _mdt_profile_officer_role (name, icon, color, color_text) VALUES (@name, @icon, @color, @color_text)", {
    //     name: "JTF",
    //     icon: "anonymous",
    //     color: "white",
    //     color_text: "black"
    // });
    // console.log("Inserted Officer Role");
    // await SQL.execute("INSERT INTO _mdt_profile_officer_roles (character_id, role_id) VALUES (@character_id, @role_id)", {
    //     character_id: 724,
    //     role_id: 1
    // });
    // console.log("Inserted Officer Roles");
    // await SQL.execute("INSERT INTO _mdt_department (name) VALUES (@name)", {
    //     name: "LSPD"
    // });
    // console.log("Inserted Departments");
    // await SQL.execute("INSERT INTO _mdt_rank (name) VALUES (@name)", [
    //     { name: "Cadet" },
    //     { name: "Officer" },
    //     { name: "Senior Officer" },
    //     { name: "Corporal" },
    //     { name: "Sergeant" },
    //     { name: "Lieutenant" },
    //     { name: "Captain" },
    //     { name: "Deputy Chief Of Police" },
    //     { name: "Chief Of Police" },
    // ]);
    // console.log("Inserted Ranks");

    // await SQL.execute("INSERT INTO _mdt_role_access (name) VALUES (@name)", {
    //     rank_id: 1,
    //     name: ""
    // });
}, false);