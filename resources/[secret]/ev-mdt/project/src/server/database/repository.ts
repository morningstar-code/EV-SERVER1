import { Base } from "@cpx/server";

export abstract class Repository {
    static async getCharges(): Promise<[boolean, Charge[]]> {
        const charges = await SQL.execute<Charge[]>(`
            SELECT
                _mdt_charge.*,
                _mdt_charge_category.name AS category_title
            FROM
                _mdt_charge
                JOIN _mdt_charge_category ON _mdt_charge.charge_category_id = _mdt_charge_category.id;        
        `);
        if (!charges) return [false, []];
        return [true, charges];
    }

    static async getBusinesses(): Promise<[boolean, Business[]]> {
        const businesses = await SQL.execute<BusinessSQLPayload[]>("SELECT * FROM _business");
        if (!businesses) return [false, []];
        const mappedBusinesses = businesses.map(business => {
            return {
                id: business.code,
                name: business.name,
                type_id: business.type_id,
                account_id: business.account_id
            }
        });
        return [true, mappedBusinesses];
    }

    static async getEmployeesByBusinessId(businessId: string): Promise<[boolean, BusinessEmployee[]]> {
        const business = await SQL.execute<BusinessSQLPayload>("SELECT * FROM _business WHERE code = ?",[businessId]);
        if (!business) return [false, []];
        const employees = await SQL.execute<BusinessEmployeeSQLPayload[]>(`
            SELECT
                be.*,
                br.name as role,
                br.permissions,
                c.first_name,
                c.last_name
            FROM
                _business_employee be
                LEFT JOIN _business_role br ON br.id = be.role_id
                LEFT JOIN characters c ON c.id = be.cid
            WHERE
            be.code = ? 
        `,[businessId]);
        if (!employees) return [false, []];
        const mappedEmployees = employees.map(employee => {
            return {
                id: employee.cid,
                first_name: employee.first_name,
                last_name: employee.last_name,
                role: employee.role
            }
        });
        return [true, mappedEmployees];
    }

    static async getBusinessEmploymentHistory(businessId: string): Promise<[boolean, BusinessLog[]]> { //TODO: Maybe only get hiring/firing
        const employmentHistory = await SQL.execute<BusinessLogSQLPayload[]>(`
            SELECT
                bl.id,
                bl.code,
                bl.event,
                bl.invoker_id,
                bl.target_id,
                bl.role_id,
                bl.amount,
                bl.event_time,
                COALESCE(r.name, bl.old_role, 'Undefined') AS role,
                CONCAT(c.first_name, ' ', c.last_name) AS invoker,
                CONCAT(t.first_name, ' ', t.last_name) AS target
            FROM
                _business_log bl
                LEFT JOIN characters c ON c.id = bl.invoker_id
                LEFT JOIN characters t ON t.id = bl.target_id
                LEFT JOIN _business_role r ON r.id = bl.role_id
            WHERE
                bl.code = ?
            ORDER BY
                bl.id DESC
        `,[businessId]);
        if (!employmentHistory) return [false, []];
        // const mappedEmploymentHistory = employmentHistory.map(log => {
        //     return {
        //         id: log.id,
        //         event: log.event,
        //         invoker: log.invoker,
        //         target: log.target,
        //         role: log.role,
        //         event_time: log.event_time
        //     }
        // });
        return [true, employmentHistory];
    }

    static async updateBusinessName(data: { accountId: number, businessId: string, name: string }): Promise<[boolean, any]> {
        const newCode = data.name.toLowerCase().replace(/ /g, "_");
        const updatedBusiness = await SQL.execute<SQLResult>("UPDATE _business SET name = ?, code = ? WHERE account_id = ? AND code = ?",[data.name, newCode, data.accountId, data.businessId]);
        if (!updatedBusiness) return [false, {}];
        const updatedBusinessEmployees = await SQL.execute<SQLResult>("UPDATE _business_employee SET code = ? WHERE code = ?",[newCode, data.businessId]);
        if (!updatedBusinessEmployees) return [false, {}];
        const updateBusinessRoles = await SQL.execute<SQLResult>("UPDATE _business_role SET code = ? WHERE code = ?",[newCode, data.businessId]);
        if (!updateBusinessRoles) return [false, {}];
        const updatedBusinessLogs = await SQL.execute<SQLResult>("UPDATE _business_log SET code = ? WHERE code = ?",[newCode, data.businessId]);
        if (!updatedBusinessLogs) return [false, {}];
        return [true, {}];
    }

    static async updateBusinessOwner(data: { accountId: number, ownerId: number, businessId: string }): Promise<[boolean, any]> {
        const ownerRole = await SQL.execute<any>("SELECT * FROM _business_role WHERE code = ? AND name = ?",[data.businessId, "Owner"]);
        if (!ownerRole) return [false, {}];
        const updatedBusinessEmployee = await SQL.execute<SQLResult>("UPDATE _business_employee SET cid = ? WHERE code = ? AND role_id = ?",[data.ownerId, data.businessId, ownerRole[0].id]);
        if (!updatedBusinessEmployee) return [false, {}];
        const updatedAccountAccess = await SQL.execute<SQLResult>("UPDATE _account_access SET character_id = ? WHERE account_id = ? AND is_owner = 1",[data.ownerId, data.accountId]);
        if (!updatedAccountAccess) return [false, {}];
        return [true, {}];
    }

    static async getOfficerRoles(profile_id: number): Promise<[boolean, OfficerRole[]]> {
        const officerRoles = await SQL.execute<OfficerRoleSQLPayload[]>(`
            SELECT 
                por.id,
                por.name,
                por.icon,
                por.color,
                por.color_text,
                por.permissions
            FROM
                _mdt_profile_officer_role por
                LEFT JOIN _mdt_role_access ra ON por.id = ra.role_id
            WHERE
                ra.profile_id = ?
        `,[profile_id]);

        if (!officerRoles) return [false, []];

        return [true, officerRoles];
    }

    static async getOfficerProfiles(): Promise<[boolean, OfficerProfile[]]> {
        const officerProfiles = await SQL.execute<OfficerProfileSQLPayload[]>(`
            SELECT
                p.id as profile_id,
                p.character_id,
                p.alias,
                CONCAT(c.first_name, ' ', c.last_name) AS name,
                p.callsign,
                d.name as department,
                r.name as rank,
                p.profile_image_url,
                p.phone_number,
                GROUP_CONCAT(DISTINCT por.permissions SEPARATOR ',') as permissions
            FROM
                _mdt_profile_officer p
                LEFT JOIN _mdt_department d ON p.department_id = d.id
                LEFT JOIN _mdt_rank r ON p.rank_id = r.id
                LEFT JOIN _mdt_role_access ra ON p.id = ra.profile_id
                LEFT JOIN _mdt_profile_officer_role por ON ra.role_id = por.id
                LEFT JOIN characters c ON p.character_id = c.id
            GROUP BY
                p.character_id,
                p.alias,
                c.first_name,
                c.last_name,
                p.callsign,
                d.name,
                r.name,
                p.profile_image_url,
                p.phone_number
        `);
        if (!officerProfiles) return [false, []];

        const mappedOfficerProfiles = officerProfiles.map(async (profile) => {
            const [success, roles] = await this.getOfficerRoles(profile.profile_id);

            return {
                profile_id: profile.profile_id,
                character_id: profile.character_id,
                alias: profile.alias,
                name: profile.name,
                callsign: profile.callsign,
                rank: profile.rank,
                department: profile.department,
                roles: roles,
                permissions: [], //profile.permissions.split == "" ? [] : profile.permissions.split(",")
                profile_image_url: profile.profile_image_url,
                phone_number: profile.phone_number
            }
        })

        const officerProfilesData = await Promise.all(mappedOfficerProfiles);

        return [true, officerProfilesData];
    }

    static async getCivilianProfiles(searchValue: string): Promise<[boolean, any[]]> {
        const civilianProfiles = await SQL.execute<any[]>("SELECT * FROM _mdt_profile_civ WHERE character_id LIKE ? OR name LIKE ?",[`%${searchValue}%`, `%${searchValue}%`]);
        if (!civilianProfiles) return [false, []];

        const mappedCivilianProfiles = civilianProfiles.map(profile => {
            return {
                id: profile.character_id,
                name: profile.name,
                profile_image_url: profile.profile_image_url,
                is_wanted: profile.is_wanted,
            }
        });

        return [true, mappedCivilianProfiles];
    }

    static async getCivilianProfilesPublic(searchValue: string): Promise<[boolean, any[]]> {
        const civilianProfiles = await SQL.execute<any[]>("SELECT * FROM _mdt_profile_civ WHERE character_id LIKE ? OR name LIKE ?",[`%${searchValue}%`, `%${searchValue}%`]);
        if (!civilianProfiles || civilianProfiles.length === 0) return [false, []];

        const mappedCivilianProfiles = civilianProfiles.map(profile => {
            return {
                id: profile.character_id,
                name: profile.name
            }
        });

        return [true, mappedCivilianProfiles];
    }

    static async getCivilianProfile(characterId: number): Promise<[boolean, CivilianProfile]> {
        const civilianProfile = await SQL.execute<CivilianProfileSQLPayload[]>("SELECT * FROM _mdt_profile_civ WHERE character_id = ?",[characterId]);
        if (!civilianProfile) return [false, {} as any];

        const civilianTags = await SQL.execute<any>("SELECT * FROM _mdt_profile_civ_tags WHERE character_id = ?",[characterId]);
        if (!civilianTags) return [false, {} as any];

        const mappedTags = civilianTags.map(async (tag: any) => {
            const tag_id = tag.tag_id;
            const tagData = await SQL.execute<any>("SELECT * FROM _mdt_tag WHERE id = ?",[tag_id]);
            if (!tagData) return [false, {} as any];
            const tagCategoryData = await SQL.execute<any>("SELECT * FROM _mdt_tag_category WHERE id = ?",[tagData[0].category_id]);
            if (!tagCategoryData) return [false, {} as any];
            return {
                id: tagData[0].id,
                name: tagData[0].name,
                color: tagData[0].color,
                color_text: tagData[0].color_text,
                icon: tagData[0].icon
            };
        });

        const tags = await Promise.all(mappedTags) ?? [];

        const civilianPriors = await SQL.execute<any>("SELECT charge_id FROM _mdt_prior WHERE character_id = ?",[characterId]);
        if (!civilianPriors) return [false, {} as any];

        const mappedPriors = civilianPriors.map(async (prior: any) => {
            const charge_id = prior.charge_id;
            const chargeData = await SQL.execute<any>("SELECT * FROM _mdt_charge WHERE id = ?",[charge_id]);
            if (!chargeData) return [false, {} as any];
            return {
                charge_id: charge_id,
                name: chargeData[0].name
            };
        });

        const priors = await Promise.all(mappedPriors) ?? [];

        const civProfile = civilianProfile[0];

        return [true, {
            id: civProfile.character_id,
            character_id: civProfile.character_id,
            name: civProfile.name,
            profile_image_url: civProfile.profile_image_url,
            summary: civProfile.summary,
            parole_end_timestamp: civProfile.parole_end_timestamp,
            driving_license_points_start_date: civProfile.driving_license_points_start_date,
            drivers_points: civProfile.drivers_points,
            is_wanted: civProfile.is_wanted,
            tags: tags,
            priors: priors
        }];
    }

    static async promoteReport(data: { id: number }): Promise<[boolean, IReport]> {
        if (!data.id) return [false, [] as any];

        const report = await SQL.execute<ReportSQLPayload>("SELECT * FROM _mdt_report WHERE id = ?",[data.id]);
        if (!report) return [false, []] as any;

        const promoteReport = await SQL.execute<any>("UPDATE _mdt_report SET report_category_id = ?, report_category_name = ? WHERE id = ?",[1, "Incident Report", data.id]);
        if (!promoteReport) return [false, [] as any];

        const promotedReport = await SQL.execute<ReportSQLPayload>("SELECT * FROM _mdt_report WHERE id = ?",[data.id]);
        if (!promotedReport) return [false, [] as any];

        return [true, promotedReport];
    }

    static async getReportCategories(): Promise<[boolean, ReportCategory[]]> {
        const reportCategories = await SQL.execute<ReportCategorySQLPayload[]>("SELECT * FROM _mdt_report_category");
        if (!reportCategories) return [false, []];

        const mappedReportCategories = reportCategories.map(category => {
            return {
                id: category.id,
                name: category.name,
                description: category.description,
                template: category.template
            }
        });

        return [true, mappedReportCategories];
    }

    static async getReports(data: { title: string, latest?: boolean, report_category_id?: number }): Promise<[boolean, Reports[]]> {
        //If report category id is not provided, get all reports, otherwise get reports by category id
        //This function is used to search legislation, but also getReports by category id for the reports page
        let reports: ReportsSQLPayload[] = [];
        //const reports = data.report_category_id ? await SQL.execute<ReportsSQLPayload[]>("SELECT * FROM _mdt_report WHERE report_category_id = ?", [data.report_category_id]) : await SQL.execute<ReportSQLPayload[]>("SELECT * FROM _mdt_report WHERE NOT id = ? OR NOT id = ?", [1, 7]);

        if (data.report_category_id && data.report_category_id != 0) { //Should second be here?
            if (data.title) {
                reports = await SQL.execute<ReportsSQLPayload[]>("SELECT * FROM _mdt_report WHERE report_category_id = ? AND title LIKE ? ORDER BY id DESC",[data.report_category_id, `%${data.title}%`]);
            } else {
                reports = await SQL.execute<ReportsSQLPayload[]>("SELECT * FROM _mdt_report WHERE report_category_id = ? ORDER BY id DESC",[data.report_category_id]);
            }
        } else {
            if (data.title) {
                reports = await SQL.execute<ReportsSQLPayload[]>("SELECT * FROM _mdt_report WHERE title LIKE ? AND NOT id = ? OR NOT id = ? ORDER BY id DESC",[`%${data.title}%`, 1, 7]);
            } else {
                reports = await SQL.execute<ReportsSQLPayload[]>("SELECT * FROM _mdt_report WHERE NOT id = ? OR NOT id = ? ORDER BY id DESC",[1, 7]);
            }
        }

        if (!reports) return [false, []];

        const mappedReports = reports.map(report => {
            return {
                id: report.id,
                title: report.title,
                description: report.description,
                created_by_state_id: report.created_by_state_id,
                created_by_name: report.created_by_name,
                timestamp: report.timestamp,
                report_category_id: report.report_category_id,
                report_category_name: report.report_category_name
            }
        });

        return [true, mappedReports];
    }

    static async getReport(id: number): Promise<[boolean, IReport]> {
        const report = await SQL.execute<ReportSQLPayload[]>(`
            SELECT 
                r.id, 
                r.title, 
                r.description, 
                r.created_by_state_id, 
                r.created_by_name, 
                r.timestamp, 
                r.report_category_id, 
                r.report_category_name, 
                CASE WHEN c.report_id IS NOT NULL THEN Json_arrayagg(
                Json_object(
                    'character_id', c.character_id,
                    'warrant', c.warrant,
                    'warrant_expiry_timestamp', c.warrant_expiry_timestamp, 
                    'guilty', c.guilty,
                    'processed_by', c.processed_by, 
                    'processed', c.processed, 
                    'charges', c.charges
                    )
                ) ELSE NULL END AS civs, 
                CASE WHEN e.report_id IS NOT NULL THEN Json_arrayagg(
                Json_object(
                    'cid', e.cid, 'type', e.type, 'identifier', 
                    e.identifier, 'description', e.description, 
                    'resource_link_id', e.resource_link_id
                    )
                ) ELSE NULL END AS evidence, 
                CASE WHEN o.report_id IS NOT NULL THEN Json_arrayagg(
                Json_object(
                    'character_id', o.character_id, 'name', 
                    o.NAME, 'callsign', o.callsign, 'resource_link_id', 
                    o.resource_link_id
                    )
                ) ELSE NULL END AS officers, 
                CASE WHEN p.report_id IS NOT NULL THEN Json_arrayagg(
                Json_object(
                    'character_id', p.character_id, 'name', 
                    p.NAME, 'resource_link_id', p.resource_link_id
                    )
                ) ELSE NULL END AS persons, 
                CASE WHEN t.report_id IS NOT NULL THEN Json_arrayagg(
                Json_object(
                    'tag_id', t.tag_id, 'resource_link_id', 
                    t.resource_link_id
                    )
                ) ELSE NULL END AS tags, 
                CASE WHEN v.report_id IS NOT NULL THEN Json_arrayagg(
                Json_object(
                    'vin', v.vin, 'plate', v.plate, 'model', 
                    v.model, 'owner', v.owner, 'reason', 
                    v.reason, 'resource_link_id', v.resource_link_id
                    )
                ) ELSE NULL END AS vehicles 
            FROM
                _mdt_report r 
                LEFT JOIN _mdt_report_civs c ON r.id = c.report_id 
                LEFT JOIN _mdt_report_evidence e ON r.id = e.report_id 
                LEFT JOIN _mdt_report_officers o ON r.id = o.report_id 
                LEFT JOIN _mdt_report_persons p ON r.id = p.report_id 
                LEFT JOIN _mdt_report_tags t ON r.id = t.report_id 
                LEFT JOIN _mdt_report_vehicles v ON r.id = v.report_id 
            WHERE
                r.id = ?
        `,[id]);

        const mappedReport = report.map((report: any) => {
            return {
                id: report.id,
                title: report.title,
                description: report.description,
                created_by_state_id: report.created_by_state_id,
                created_by_name: report.created_by_name,
                timestamp: report.timestamp,
                report_category_id: report.report_category_id,
                report_category_name: report.report_category_name,
                civs: !report.civs ? [] : JSON.parse(report.civs),
                tags: !report.tags ? [] : JSON.parse(report.tags),
                evidence: !report.evidence ? [] : JSON.parse(report.evidence),
                officers: !report.officers ? [] : JSON.parse(report.officers),
                persons: !report.persons ? [] : JSON.parse(report.persons),
                vehicles: !report.vehicles ? [] : JSON.parse(report.vehicles)
            }
        });

        return [true, mappedReport[0]];
    }

    static async editReport(source: number, data: { id: number, title: string, description: string, created_by_state_id: number, created_by_name: string, timestamp: number, report_category_id: number, report_category_name: string, tags: any[], evidence: any[], officers: any[], persons: any[], vehicles: any[] }): Promise<[boolean, any]> {
        if (!data?.tags) data.tags = [];
        if (!data?.evidence) data.evidence = [];
        if (!data?.officers) data.officers = [];
        if (!data?.persons) data.persons = [];
        if (!data?.vehicles) data.vehicles = [];

        if (data.id !== undefined) {
            //Is editing a report
            const report = await SQL.execute<SQLResult>("UPDATE _mdt_report SET title = ?, description = ?, created_by_state_id = ?, created_by_name = ?, timestamp = ? WHERE id = ?",[data.title, data.description, data.created_by_state_id, data.created_by_name, data.timestamp, data.id]);
            if (!report) return [false, []];

            return [true, {
                id: data.id
            }]
        } else {
            //Is creating a report
            const category = await SQL.execute<ReportCategorySQLPayload[]>("SELECT * FROM _mdt_report_category WHERE id = ?",[data.report_category_id]);
            if (!category) return [false, []];

            const user: User = await Base.getModule<PlayerModule>("Player").GetUser(source);
            if (!user) return [false, []];

            const report = await SQL.execute<SQLResult>("INSERT INTO _mdt_report (title, description, created_by_state_id, created_by_name, timestamp, report_category_id, report_category_name) VALUES (?, ?, ?, ?, ?, ?, ?)",[data.title, data.description, user.character.id, `${user.character.first_name} ${user.character.last_name}`, Date.now() / 1000, data.report_category_id, category[0].name]);
            if (!report) return [false, []];

            return [true, {
                id: report.insertId,
            }]
        }
    }

    static async searchReports(data: { title: string }): Promise<[boolean, any]> {
        const reports = await SQL.execute<ReportsSQLPayload[]>("SELECT * FROM _mdt_report WHERE title LIKE ? AND NOT id = ? OR NOT id = ? ORDER BY id DESC",[`%${data.title}%`, 1, 7]);
        if (!reports) return [false, []]

        return [true, reports];
    }

    //Incident
    static async getIncidents(data: { latest?: boolean }): Promise<[boolean, Reports[]]> {
        let incidents: ReportsSQLPayload[] = await SQL.execute<ReportsSQLPayload[]>("SELECT * FROM _mdt_report WHERE report_category_id = ? ORDER BY id DESC", [1]);
        if (!incidents) return [false, []];

        const mappedIncidents = incidents.map(incident => {
            return {
                id: incident.id,
                title: incident.title,
                description: incident.description,
                created_by_state_id: incident.created_by_state_id,
                created_by_name: incident.created_by_name,
                timestamp: incident.timestamp,
                report_category_id: incident.report_category_id,
                report_category_name: incident.report_category_name
            }
        });

        return [true, mappedIncidents];
    }

    static async getIncident(id: number): Promise<[boolean, IReport]> {
        const incident = await SQL.execute<ReportSQLPayload[]>(`
            SELECT 
                r.id, 
                r.title, 
                r.description, 
                r.created_by_state_id, 
                r.created_by_name, 
                r.timestamp, 
                r.report_category_id, 
                r.report_category_name, 
                CASE WHEN c.report_id IS NOT NULL THEN Json_arrayagg(
                Json_object(
                    'character_id', c.character_id,
                    'warrant', c.warrant,
                    'warrant_expiry_timestamp', c.warrant_expiry_timestamp, 
                    'guilty', c.guilty,
                    'processed_by', c.processed_by, 
                    'processed', c.processed, 
                    'charges', c.charges
                    )
                ) ELSE NULL END AS civs, 
                CASE WHEN e.report_id IS NOT NULL THEN Json_arrayagg(
                Json_object(
                    'cid', e.cid, 'type', e.type, 'identifier', 
                    e.identifier, 'description', e.description, 
                    'resource_link_id', e.resource_link_id
                    )
                ) ELSE NULL END AS evidence, 
                CASE WHEN o.report_id IS NOT NULL THEN Json_arrayagg(
                Json_object(
                    'character_id', o.character_id, 'name', 
                    o.NAME, 'callsign', o.callsign, 'resource_link_id', 
                    o.resource_link_id
                    )
                ) ELSE NULL END AS officers, 
                CASE WHEN p.report_id IS NOT NULL THEN Json_arrayagg(
                Json_object(
                    'character_id', p.character_id, 'name', 
                    p.NAME, 'resource_link_id', p.resource_link_id
                    )
                ) ELSE NULL END AS persons, 
                CASE WHEN t.report_id IS NOT NULL THEN Json_arrayagg(
                Json_object(
                    'tag_id', t.tag_id, 'resource_link_id', 
                    t.resource_link_id
                    )
                ) ELSE NULL END AS tags, 
                CASE WHEN v.report_id IS NOT NULL THEN Json_arrayagg(
                Json_object(
                    'vin', v.vin, 'plate', v.plate, 'model', 
                    v.model, 'owner', v.owner, 'reason', 
                    v.reason, 'resource_link_id', v.resource_link_id
                    )
                ) ELSE NULL END AS vehicles 
            FROM
                _mdt_report r 
                LEFT JOIN _mdt_report_civs c ON r.id = c.report_id 
                LEFT JOIN _mdt_report_evidence e ON r.id = e.report_id 
                LEFT JOIN _mdt_report_officers o ON r.id = o.report_id 
                LEFT JOIN _mdt_report_persons p ON r.id = p.report_id 
                LEFT JOIN _mdt_report_tags t ON r.id = t.report_id 
                LEFT JOIN _mdt_report_vehicles v ON r.id = v.report_id 
            WHERE
                r.id = ?
        `,[id]);

        const mappedIncident = incident.map((incident: any) => {
            return {
                id: incident.id,
                title: incident.title,
                description: incident.description,
                created_by_state_id: incident.created_by_state_id,
                created_by_name: incident.created_by_name,
                timestamp: incident.timestamp,
                report_category_id: incident.report_category_id,
                report_category_name: incident.report_category_name,
                civs: !incident.civs ? [] : JSON.parse(incident.civs),
                tags: !incident.tags ? [] : JSON.parse(incident.tags),
                evidence: !incident.evidence ? [] : JSON.parse(incident.evidence),
                officers: !incident.officers ? [] : JSON.parse(incident.officers),
                persons: !incident.persons ? [] : JSON.parse(incident.persons),
                vehicles: !incident.vehicles ? [] : JSON.parse(incident.vehicles)
            }
        });

        //Need to fix tags. Need to grab the tag's name and then category_id from _mdt_tag and pull the category data from _mdt_tag_category
        for (const civ of mappedIncident[0].civs) {
            const character = await SQL.execute<{ name: string, parole_end_timestamp: number }>("SELECT name, parole_end_timestamp FROM _mdt_profile_civ WHERE character_id = ?",[civ.character_id]);
            const char = Array.isArray(character) ? character[0] : character;
            const warrants = await SQL.execute<{ warrant: string, warrant_expiry_timestamp: number }>("SELECT * FROM _mdt_warrant WHERE cid = ?",[civ.character_id]);

            civ.id = civ.character_id;
            civ.name = char?.name ?? "Unknown";
            civ.parole_end_timestamp = char?.parole_end_timestamp ?? 0;
            civ.warrants = warrants ?? [];
            civ.charges = !civ.charges ? [] : JSON.parse(civ.charges);
        }

        return [true, mappedIncident[0]];
    }

    static async editIncident(source: number, data: { id: number, title: string, description: string, created_by_state_id: number, created_by_name: string, timestamp: number, tags: any[], evidence: any[], officers: any[], persons: any[], vehicles: any[] }): Promise<[boolean, any]> {
        if (!data?.tags) data.tags = [];
        if (!data?.evidence) data.evidence = [];
        if (!data?.officers) data.officers = [];
        if (!data?.persons) data.persons = [];
        if (!data?.vehicles) data.vehicles = [];

        if (data.id !== undefined) {
            //Is editing a incident
            const incident = await SQL.execute<SQLResult>("UPDATE _mdt_report SET title = ?, description = ?, created_by_state_id = ?, created_by_name = ?, timestamp = ? WHERE id = ?",[data.title, data.description, data.created_by_state_id, data.created_by_name, data.timestamp, data.id]);
            if (!incident) return [false, []];

            return [true, {
                id: data.id
            }]
        } else {
            //Is creating a incident
            const category = await SQL.execute<ReportCategorySQLPayload[]>("SELECT * FROM _mdt_report_category WHERE id = ?",[1]);
            if (!category) return [false, []];

            const user: User = await Base.getModule<PlayerModule>("Player").GetUser(source);
            if (!user) return [false, []];

            const incident = await SQL.execute<SQLResult>("INSERT INTO _mdt_report (title, description, created_by_state_id, created_by_name, timestamp, report_category_id, report_category_name) VALUES (?, ?, ?, ?, ?, ?, ?)",[data.title, data.description, user.character.id, `${user.character.first_name} ${user.character.last_name}`, Date.now() / 1000, 1, category[0].name]);
            if (!incident) return [false, []];

            return [true, {
                id: incident.insertId,
            }]
        }
    }

    static async searchIncidents(data: { title: string }): Promise<[boolean, any]> {
        const incidents = await SQL.execute<ReportsSQLPayload[]>("SELECT * FROM _mdt_report WHERE title LIKE ? AND id = ? ORDER BY id DESC", [`%${data.title}%`, 1]);
        if (!incidents) return [false, []]

        return [true, incidents];
    }

    static async editIncidentCiv(data: { incident_id: number, warrant: number, warrant_expiry_timestamp: number, profile_civ_id: number, processed_by: number, processed: number, guilty: number }): Promise<[boolean, any]> {
        const civ = await SQL.execute<any[]>("SELECT * FROM _mdt_report_civs WHERE report_id = ? AND character_id = ?", [data.incident_id, data.profile_civ_id]);
        if (civ.length > 0) {
            //edit civ
            const updateCiv = await SQL.execute<any[]>("UPDATE _mdt_report_civs SET warrant = ?, warrant_expiry_timestamp = ?, processed_by = ?, processed = ?, guilty = ? WHERE report_id = ? AND character_id = ?",[data.warrant, data.warrant_expiry_timestamp, data.processed_by, data.processed, data.guilty, data.incident_id, data.profile_civ_id]);
            if (!updateCiv) return [false, []];

            if (data.processed == 1) { //TODO; Incident id in the future, to make sure no duplicates.
                const charges = civ[0].charges;
                const chargesData = !charges ? [] : JSON.parse(charges);
                for (const charge of chargesData) {
                    const insertPrior = await SQL.execute<any[]>("INSERT INTO _mdt_prior (charge_id, character_id, name) VALUES (?, ?, ?)", [charge.id, data.profile_civ_id, charge.name]);
                    if (!insertPrior) return [false, []];
                }
            }

            if (data.warrant == 1) {
                const warrant = await SQL.execute<any[]>("SELECT * FROM _mdt_warrant WHERE incident_id = ? AND cid = ?",[data.incident_id, data.profile_civ_id]);
                if (warrant.length > 0) return [false, []];

                const createWarrant = await SQL.execute<any[]>("INSERT INTO _mdt_warrant (incident_id, warrant_expiry_timestamp, cid) VALUES (?, ?, ?)",[data.incident_id, data.warrant_expiry_timestamp, data.profile_civ_id]);
                if (!createWarrant) return [false, []];
            }
        } else {
            //create civ
            const createCiv = await SQL.execute<any[]>("INSERT INTO _mdt_report_civs (report_id, character_id, warrant, warrant_expiry_timestamp, processed_by, processed, guilty) VALUES (?, ?, ?, ?, ?, ?, ?)",[data.incident_id, data.profile_civ_id, data.warrant, data.warrant_expiry_timestamp, data.processed_by, data.processed, data.guilty]);
            if (!createCiv) return [false, []];
        }

        return [true, []];
    }

    //TODO; Possibly make new table for charges? Or lazy way and just json encode inside the civs table (Holds charge_id's?) (Then cache charges?)
    static async editIncidentCivCharges(data: { charges: any, incident_id: number, profile_civ_id: number }): Promise<[boolean, any]> {
        const civ = await SQL.execute<any[]>("SELECT * FROM _mdt_report_civs WHERE report_id = ? AND character_id = ?",[data.incident_id, data.profile_civ_id]);
        if (!civ) return [false, []];

        //update charges
        const updateCharges = await SQL.execute<any[]>("UPDATE _mdt_report_civs SET charges = ? WHERE report_id = ? AND character_id = ?",[JSON.stringify(data.charges), data.incident_id, data.profile_civ_id]);
        if (!updateCharges) return [false, []];

        return [true, []];
    }

    static async removeIncidentCiv(data: { incident_id: number, profile_civ_id: number }): Promise<[boolean, any]> {
        const civ = await SQL.execute<any[]>("SELECT * FROM _mdt_report_civs WHERE report_id = ? AND character_id = ?",[data.incident_id, data.profile_civ_id]);
        if (!civ) return [false, []];

        const removeCiv = await SQL.execute<any[]>("DELETE FROM _mdt_report_civs WHERE report_id = ? AND character_id = ?",[data.incident_id, data.profile_civ_id]);
        if (!removeCiv) return [false, []];

        //const charges = await SQL.execute<any[]>("SELECT * FROM _mdt_report_civ_charges WHERE report_id = ? AND character_id = ?", [data.incident_id, data.profile_civ_id]);

        return [true, {}];
    }

    //Resource
    static async addResourceLink(data: { resource_type: string, resource_id: string, source_type: string, source_id: number }): Promise<[boolean, any[]]> {
        //Resource type is the type of resource: report, incident, evidence, officer, or profile
        //Resource id is the id of the report: incident, evidence, officer, or profile
        //Source type is the type of source: tag, officer, or profile
        //Source id can be: resource id, profile id, tag id, or character id

        const reportType = async () => {
            switch (data.source_type) {
                case "tag":
                    //TODO;
                    break;
                case "profile":
                    const character = await SQL.execute<Character[]>("SELECT * FROM characters WHERE id = ?",[data.source_id]);
                    if (!character) return [false, []];
                    const person = await SQL.execute<any[]>("SELECT * FROM _mdt_report_persons WHERE report_id = ? AND character_id = ?",[data.resource_id, data.source_id]);
                    if (person.length > 0) return [false, []];
                    const personsInsert = await SQL.execute<SQLResult>("INSERT INTO _mdt_report_persons (report_id, character_id, name, resource_link_id) VALUES (?, ?, ?, ?)",[data.resource_id, data.source_id, `${character[0].first_name} ${character[0].last_name}`, Math.floor(Math.random() * 999999)]);
                    if (!personsInsert) return [false, []];
                    return [true, []];
                case "officer":
                    const officer = await SQL.execute<any[]>("SELECT * FROM _mdt_report_officers WHERE report_id = ? AND character_id = ?",[data.resource_id, data.source_id]);
                    if (officer.length > 0) return [false, []];
                    const officerProfile = await SQL.execute<OfficerProfileSQLPayload[]>(`
                        SELECT 
                            p.character_id,
                            CONCAT(c.first_name, ' ', c.last_name) AS name,
                            p.callsign
                        FROM
                            _mdt_profile_officer p
                            LEFT JOIN characters c ON p.character_id = c.id
                        WHERE
                            p.character_id = ?
                        GROUP BY
                            p.character_id,
                            c.first_name,
                            c.last_name,
                            p.callsign
                    `,[data.source_id]);
                    if (!officerProfile) return [false, []];
                    const officerInsert = await SQL.execute<SQLResult>("INSERT INTO _mdt_report_officers (report_id, character_id, name, callsign, resource_link_id) VALUES (?, ?, ?, ?, ?)",[data.resource_id, officerProfile[0].character_id, officerProfile[0].name, officerProfile[0].callsign, Math.floor(Math.random() * 999999)]);
                    if (!officerInsert) return [false, []];
                    return [true, []];
            }
        }

        const incidentType = async () => {
            switch (data.source_type) {
                case "tag":
                    //TODO;
                    break;
                case "profile":
                    const character = await SQL.execute<Character[]>("SELECT * FROM characters WHERE id = ?",[data.source_id]);
                    if (!character) return [false, []];
                    //check if person is already in report
                    const person = await SQL.execute<any[]>("SELECT * FROM _mdt_report_persons WHERE report_id = ? AND character_id = ?",[data.resource_id, data.source_id]);
                    if (person.length > 0) return [false, []];
                    const personsInsert = await SQL.execute<SQLResult>("INSERT INTO _mdt_report_persons (report_id, character_id, name, resource_link_id) VALUES (?, ?, ?, ?)",[data.resource_id, data.source_id, `${character[0].first_name} ${character[0].last_name}`, Math.floor(Math.random() * 999999)]);
                    if (!personsInsert) return [false, []];
                    return [true, []];
                case "officer":
                    const officer = await SQL.execute<any[]>("SELECT * FROM _mdt_report_officers WHERE report_id = ? AND character_id = ?",[data.resource_id, data.source_id]);
                    if (officer.length > 0) return [false, []];
                    const officerProfile = await SQL.execute<OfficerProfileSQLPayload[]>(`
                        SELECT 
                            p.character_id,
                            CONCAT(c.first_name, ' ', c.last_name) AS name,
                            p.callsign
                        FROM
                            _mdt_profile_officer p
                            LEFT JOIN characters c ON p.character_id = c.id
                        WHERE
                            p.character_id = ?
                        GROUP BY
                            p.character_id,
                            c.first_name,
                            c.last_name,
                            p.callsign
                    `,[data.source_id]);
                    if (!officerProfile) return [false, []];
                    const officerInsert = await SQL.execute<SQLResult>("INSERT INTO _mdt_report_officers (report_id, character_id, name, callsign, resource_link_id) VALUES (?, ?, ?, ?, ?)",[data.resource_id, officerProfile[0].character_id, officerProfile[0].name, officerProfile[0].callsign, Math.floor(Math.random() * 999999)]);
                    if (!officerInsert) return [false, []];
                    return [true, []];
            }
        }

        const evidenceType = () => { //For tags etc
            switch (data.source_type) {
                case "tag": //TODO;
                    break;
            }
        }

        const officerType = () => { //For certs etc
            switch (data.source_type) {
                case "cert": //TODO;
                    break;
            }
        }

        const profileType = () => { //For tags etc
            switch (data.source_type) {
                case "tag": //TODO;
                    break;
            }
        }

        switch (data.resource_type) {
            case "report":
                reportType()
                break;
            case "incident":
                incidentType()
                break;
            case "evidence":
                evidenceType()
                break;
            case "officer":
                officerType()
                break;
            case "profile":
                profileType()
                break;
        }

        return [true, []];
    }

    static async removeResourceLink(data: { resource_link_id: number, source_type: string }): Promise<[boolean, any[]]> {
        if (!data.source_type || data.source_type === null || data.source_type === undefined || data.source_type === "") { // is null
            const resourceId = data.resource_link_id;
            //check all tables for resource id
            const officers = await SQL.execute<any[]>("SELECT * FROM _mdt_report_officers WHERE resource_link_id = ?",[resourceId]);
            if (officers.length > 0) {
                const officer = officers[0];
                const officerDelete = await SQL.execute<any>("DELETE FROM _mdt_report_officers WHERE id = ?",[officer.id]);
                if (!officerDelete) return [false, []];
            }
            const persons = await SQL.execute<any[]>("SELECT * FROM _mdt_report_persons WHERE resource_link_id = ?",[resourceId]);
            if (persons.length > 0) {
                const person = persons[0];
                const personDelete = await SQL.execute<any>("DELETE FROM _mdt_report_persons WHERE id = ?",[person.id]);
                if (!personDelete) return [false, []];
            }
            const tags = await SQL.execute<any[]>("SELECT * FROM _mdt_report_tags WHERE resource_link_id = ?",[resourceId]);
            if (tags.length > 0) {
                const tag = tags[0];
                const tagDelete = await SQL.execute<any>("DELETE FROM _mdt_report_tags WHERE id = ?",[tag.id]);
                if (!tagDelete) return [false, []];
            }
            const vehicles = await SQL.execute<any[]>("SELECT * FROM _mdt_report_vehicles WHERE resource_link_id = ?",[resourceId]);
            if (vehicles.length > 0) {
                const vehicle = vehicles[0];
                const vehicleDelete = await SQL.execute<any>("DELETE FROM _mdt_report_vehicles WHERE id = ?",[vehicle.id]);
                if (!vehicleDelete) return [false, []];
            }
            const evidence = await SQL.execute<any[]>("SELECT * FROM _mdt_report_evidence WHERE resource_link_id = ?",[resourceId]);
            if (evidence.length > 0) {
                const evidenceItem = evidence[0];
                const evidenceDelete = await SQL.execute<any>("DELETE FROM _mdt_report_evidence WHERE id = ?",[evidenceItem.id]); //TODO; update the resource_link_id and report_id to null?
                if (!evidenceDelete) return [false, []];
            }

            return [true, []];
        } else if (data.source_type === "cert") {
            //TODO;

            return [true, []];
        }

        return [false, []];
    }

    static async deleteResourceItem(data: { id: number, table: string, idField?: string }): Promise<[boolean, any[]]> {
        if (!data.idField) {
            //TODO; Delete all resource links (Meaning: evidence, vehicles, etc.)
            const deleteItem = await SQL.execute<any>("DELETE FROM ?? WHERE id = ?",[data.table, data.id]);
            if (!deleteItem) return [false, []];
        } else {
            const deleteItem = await SQL.execute<any>("DELETE FROM ?? WHERE ?? = ?",[data.table, data.idField, data.id]);
            if (!deleteItem) return [false, []];
        }

        return [true, []];
    }

    static async addEvidenceToResource(data: { type: string, create: boolean, evidence: { type: string, identifier: string, description: string, cid: number }, identifier: number, source_id: number }): Promise<[boolean, any[]]> {
        //Type: report | incident
        //Source ID: Report ID | Incident ID
        //Create: true | false

        if (data.create) {
            //TODO; Create evidence (Generates a resource_link_id)
            switch (data.type) {
                case "report":
                    break;
                case "incident":
                    const incidentEvidence = await SQL.execute<any[]>("SELECT * FROM _mdt_report_evidence WHERE report_id = ? AND identifier = ?",[data.source_id, data.evidence.identifier]);
                    if (incidentEvidence.length > 0) return [false, []];
                    const incidentEvidenceInsert = await SQL.execute<any>("INSERT INTO _mdt_report_evidence (report_id, cid, type, identifier, description, resource_link_id) VALUES (?, ?, ?, ?, ?, ?)",[data.source_id, data.evidence.cid, data.evidence.type, data.evidence.identifier, data.evidence.description, Math.floor(Math.random() * 999999)]);
                    if (!incidentEvidenceInsert) return [false, []];
                    return [true, []];
            }
        } else {
            //TODO; Add evidence to resource
            switch (data.type) {
                case "report":
                    break;
                case "incident":
                    if (!data.identifier) return [false, []];
                    const incidentEvidence = await SQL.execute<any[]>("SELECT * FROM _mdt_report_evidence WHERE id = ?",[data.identifier]);
                    if (incidentEvidence.length === 0) return [false, []];
                    //update the evidence and assignment (report_id and resource_link_id)
                    const incidentEvidenceUpdate = await SQL.execute<any>("UPDATE _mdt_report_evidence SET report_id = ?, resource_link_id = ? WHERE id = ?",[data.source_id, Math.floor(Math.random() * 999999), data.identifier]);
                    if (!incidentEvidenceUpdate) return [false, []];
                    return [true, []];
            }
        }

        return [true, []];
    }

    static async createEvidenceVehicle(data: { resourceType: string, resourceId: number, vehicle: { plate: string, reason: string } }): Promise<[boolean, any[]]> {
        switch (data.resourceType) {
            case "report":
                const reportVehicle = await SQL.execute<any[]>("SELECT * FROM _mdt_report_vehicles WHERE report_id = ? AND plate = ?",[data.resourceId, data.vehicle.plate]);
                if (reportVehicle.length > 0) return [false, []];
                const reportVehicleData = await SQL.execute<{ cid: number, vin: string, model: string }[]>("SELECT * FROM _vehicle WHERE plate = ?",[data.vehicle.plate]);
                if (reportVehicleData.length === 0) return [false, []];
                const reportVehicleOwner = await SQL.execute<Character[]>("SELECT * FROM characters WHERE id = ?",[reportVehicleData[0].cid]);
                if (reportVehicleOwner.length === 0) return [false, []];
                const reportVehicleInsert = await SQL.execute<SQLResult>("INSERT INTO _mdt_report_vehicles (report_id, vin, plate, model, owner, reason, resource_link_id) VALUES (?, ?, ?, ?, ?, ?, ?)",[data.resourceId, reportVehicleData[0].vin, data.vehicle.plate, reportVehicleData[0].model, `${reportVehicleOwner[0].first_name} ${reportVehicleOwner[0].last_name}`, data.vehicle.reason, Math.floor(Math.random() * 999999)]);
                if (!reportVehicleInsert) return [false, []];
                return [true, []];
            case "incident":
                const incidentVehicle = await SQL.execute<any[]>("SELECT * FROM _mdt_report_vehicles WHERE report_id = ? AND plate = ?",[data.resourceId, data.vehicle.plate]);
                if (incidentVehicle.length > 0) return [false, []];
                const incidentVehicleData = await SQL.execute<{ cid: number, vin: string, model: string }[]>("SELECT * FROM _vehicle WHERE plate = ?",[data.vehicle.plate]);
                if (incidentVehicleData.length === 0) return [false, []];
                const incidentVehicleOwner = await SQL.execute<Character[]>("SELECT * FROM characters WHERE id = ?",[incidentVehicleData[0].cid]);
                if (incidentVehicleOwner.length === 0) return [false, []];
                const vehicleInsert = await SQL.execute<SQLResult>("INSERT INTO _mdt_report_vehicles (report_id, vin, plate, model, owner, reason, resource_link_id) VALUES (?, ?, ?, ?, ?, ?, ?)",[data.resourceId, incidentVehicleData[0].vin, data.vehicle.plate, incidentVehicleData[0].model, `${incidentVehicleOwner[0].first_name} ${incidentVehicleOwner[0].last_name}`, data.vehicle.reason, Math.floor(Math.random() * 999999)]);
                if (!vehicleInsert) return [false, []];
                return [true, []];
        }

        return [true, []];
    }

    //TODO: FIX
    static async addRolePermission(data: { permission: any, roleId: number }): Promise<[boolean, any[]]> {
        //console.log("addRolePermission", data);

        const rolePermissions = await SQL.execute<any[]>("SELECT permissions FROM _mdt_profile_officer_role WHERE id = ?",[data.roleId]);
        if (!rolePermissions) return [false, []];

        //console.log("rolePermissions", rolePermissions);

        //permissions is a json encoded array
        const permissions = JSON.parse(rolePermissions[0].permissions ?? "[]");
        permissions.push(data.permission);

        //console.log("permissions", permissions);

        const updateRolePermissions = await SQL.execute<SQLResult>("UPDATE _mdt_profile_officer_role SET permissions = ? WHERE id = ?",[JSON.stringify(permissions), data.roleId]);
        if (!updateRolePermissions) return [false, []];

        //console.log("updateRolePermissions", updateRolePermissions);

        return [true, []];
    }

    //TODO: FIX
    static async getRolePermissions(data: { roleId: number }): Promise<[boolean, any[]]> {
        //console.log("getRolePermissions", data);

        const rolePermissions = await SQL.execute<any>("SELECT permissions FROM _mdt_profile_officer_role WHERE id = ?",[data.roleId]);
        if (!rolePermissions) return [false, []];

        //console.log("rolePermissions", rolePermissions);

        //console.log("rolePermissions[0].permissions", rolePermissions[0].permissions);

        const permissions = JSON.parse(rolePermissions[0].permissions ?? "[]");

        //console.log("permissions", permissions);

        return [true, permissions];
    }

    static async hasConfigPermission(pSource: number, data: any): Promise<[boolean, string]> {
        const user: User = Base.getModule<PlayerModule>("Player").GetUser(pSource);
        if (!user) return [false, ""];

        const steamId = user.getVar("hexid");

        const configPermission = await SQL.execute<any[]>("SELECT * FROM _mdt_config_access WHERE steam_id = ?",[steamId]);
        if (!configPermission) return [false, ""];
        if (configPermission.length === 0) return [false, ""];

        return [true, steamId];
    }

    static async getAllConfigOptions(data: { table: string, useCharacterId: boolean }): Promise<[boolean, any[]]> {
        if (!data.table || data.table == '') return [false, []];
        if (data.table && !data.table.startsWith("_mdt_")) return [false, []];

        const configOptions = await SQL.execute<any[]>("SELECT * FROM ?? ORDER BY id DESC",[data.table]);
        if (!configOptions) return [false, []];

        return [true, configOptions];
    }

    static async insertConfigOption(data: { data: any, table: string, useCharacterId: boolean }): Promise<[boolean, any[]]> {
        if (!data.table || data.table == '') return [false, []];
        if (data.table && !data.table.startsWith("_mdt_")) return [false, []];

        const columnNames = Object.keys(data.data).join(", ");
        const columnValues = Object.values(data.data).map((value) => JSON.stringify(value)).join(", ");
        const sanitizedColumnValues = columnValues.replace(/"/g, '');

        const insertConfig = await SQL.execute<SQLResult>(
            "INSERT INTO ?? (??) VALUES (?)",
            [data.table, columnNames, sanitizedColumnValues]
        );
        if (!insertConfig) return [false, []];

        return [true, []];
    }

    static async updateConfigOption(data: { data: any, table: string, useCharacterId: boolean }): Promise<[boolean, any[]]> {
        if (!data.table || data.table == '') return [false, []];
        if (data.table && !data.table.startsWith("_mdt_")) return [false, []];

        const columnNames = Object.keys(data.data).join(" = ?, ") + " = ?";
        const columnValues = Object.values(data.data);

        const allowedWhere = [data.useCharacterId ? "character_id" : "id"]; //character_id
        let whereColumnName = '';
        let whereColumnValue;

        for (const [key, value] of Object.entries(data.data)) {
            if (allowedWhere.includes(key)) {
                whereColumnName = key;
                whereColumnValue = value;
                break;
            }
        }

        if (!whereColumnName) return [false, []];

        const updateConfig = await SQL.execute<SQLResult>(
            "UPDATE ?? SET " + columnNames + " WHERE ?? = ?",[data.table, ...columnValues, whereColumnName, whereColumnValue]
        );
        if (!updateConfig) return [false, []];

        return [true, []];
    }

    static async getWarrants(): Promise<[boolean, Warrant[]]> {
        const warrants = await SQL.execute<Warrant[]>(`
            SELECT
                w.incident_id,
                w.warrant_expiry_timestamp,
                r.title AS incident_title,
                c.name AS civ_name,
                c.profile_image_url
            FROM
                _mdt_warrant AS w
                JOIN _mdt_report AS r ON w.incident_id = r.id
                JOIN _mdt_profile_civ AS c ON c.character_id = w.cid;        
        `);
        if (!warrants) return [false, []];

        return [true, warrants];
    }

    static async getBolos(): Promise<[boolean, any[]]> {
        const bolos = await SQL.execute<any[]>('SELECT id, title, description, timestamp FROM _mdt_report WHERE report_category_id = 3'); //ORDER BY id DESC LIMIT 10
        if (!bolos) return [false, []];

        return [true, bolos];
    }

    static async getBulletins(): Promise<[boolean, any[]]> {
        const bulletins = await SQL.execute<any[]>('SELECT id, title, description, timestamp FROM _mdt_report WHERE report_category_id = 8'); //ORDER BY id DESC LIMIT 10
        if (!bulletins) return [false, []];

        return [true, bulletins];
    }

    static async getEvidence(data: { identifier: string }): Promise<[boolean, any[]]> {
        if (!data.identifier || data.identifier == '') {
            const evidence = await SQL.execute<any[]>('SELECT id, type, identifier, description, cid FROM _mdt_report_evidence');
            if (!evidence) return [false, []];

            const mappedEvidence = evidence.length > 0 ? evidence.map((e) => {
                return {
                    ...e,
                    tags: [] //TODO; (Need to create table for evidence tags)
                }
            }) : [];

            return [true, mappedEvidence];
        } else {
            const evidence = await SQL.execute<any[]>('SELECT id, type, identifier, description, cid FROM _mdt_report_evidence WHERE identifier LIKE ?',[`%${data.identifier}%`]);
            if (!evidence) return [false, []];

            const mappedEvidence = evidence.length > 0 ? evidence.map((e) => {
                return {
                    ...e,
                    tags: [] //TODO; (Need to create table for evidence tags)
                }
            }) : [];

            return [true, mappedEvidence];
        }
    }

    static async getSingleEvidence(data: { id: number }): Promise<[boolean, any[]]> {
        const singleEvidence = await SQL.execute<any[]>('SELECT id, type, identifier, description, cid FROM _mdt_report_evidence WHERE id = ?',[data.id]);
        if (!singleEvidence) return [false, []];

        return [true, singleEvidence[0] ?? {}];
    }

    //TODO; Create evidence tags table
    static async editEvidence(data: { id: number, type: string, identifier: string, description: string, tags: any, cid: number }): Promise<[boolean, any[]]> {
        if (!data?.tags) data.tags = [];

        if (data.id !== undefined) {
            const editEvidence = await SQL.execute<SQLResult>('UPDATE _mdt_report_evidence SET type = ?, identifier = ?, description = ?, cid = ? WHERE id = ?',[data.type, data.identifier, data.description, data.cid, data.id]);
            if (!editEvidence) return [false, []];

            return [true, []];
        } else {
            const createEvidence = await SQL.execute<SQLResult>('INSERT INTO _mdt_report_evidence (cid, type, identifier, description) VALUES (?, ?, ?, ?)',[data.cid, data.type, data.identifier, data.description]);
            if (!createEvidence) return [false, []];

            return [true, []];
        }
    }

    static async changeVehicleData(data: { vehicle: { plate: string, vin: string }, type: string, vin: string, value: string }): Promise<[boolean, any[]]> {
        switch (data.type) {
            case "plate":
                const plateUpdate = await SQL.execute<SQLResult>("UPDATE _vehicle SET plate = ? WHERE vin = ?",[data.value, data.vin]);
                if (!plateUpdate) return [false, []];
                break;
            case "engineSound":
                break;
        }

        return [true, []];
    }

    static async updateImpoundData(data: any): Promise<[boolean, any[]]> {
        return [true, []];
    }

    static async expungeCiv(data: { profile_civ_id: number }): Promise<[boolean, any[]]> {
        const expungeCiv = await SQL.execute<SQLResult>("DELETE FROM _mdt_prior WHERE character_id = ?",[data.profile_civ_id]);
        if (!expungeCiv) return [false, []];

        return [true, []];
    }

    static async resetDrivingPoints(data: { id: number }): Promise<[boolean, any[]]> {
        const resetPoints = await SQL.execute<SQLResult>("UPDATE _mdt_profile_civ SET drivers_points = 0 WHERE character_id = ?",[data.id]);
        if (!resetPoints) return [false, []];

        return [true, []];
    }

    static async editCivilianProfile(data: CivilianProfile, ignoreEdit = false): Promise<[boolean, any[]]> {
        const civilianProfile = await SQL.execute<CivilianProfile[]>("SELECT * FROM _mdt_profile_civ WHERE character_id = ?",[data.character_id]);
        if (!civilianProfile) return [false, []];

        if (civilianProfile.length == 0) {
            console.log("Profile does not exist, creating...")
            const createCivilianProfile = await SQL.execute<SQLResult>(`
                INSERT INTO _mdt_profile_civ (character_id, name, profile_image_url, summary) VALUES (?, ?, ?, ?)`,[data.character_id, data.name, data.profile_image_url, data.summary]
            );
            if (!createCivilianProfile) return [false, []];
        } else {
            console.log("Profile exists, updating...")
            if (ignoreEdit) return [true, []];
            console.log("Attempting to update...")
            const editCivilianProfile = await SQL.execute<SQLResult>(`
                UPDATE _mdt_profile_civ SET name = ?, profile_image_url = ?, summary = ? WHERE character_id = ?`,[data.name, data.profile_image_url, data.summary, data.character_id]
            );
            if (!editCivilianProfile) return [false, []];
            console.log("Updated!")
        }

        return [true, []];
    }

    static async getTags(): Promise<[boolean, any[]]> {
        const tags = await SQL.execute<any[]>("SELECT * FROM _mdt_tag");
        if (!tags) return [false, []];

        return [true, tags];
    }

    static async getTagCategories(): Promise<[boolean, any[]]> {
        const tagCategories = await SQL.execute<any[]>("SELECT * FROM _mdt_tag_category");
        if (!tagCategories) return [false, []];

        return [true, tagCategories];
    }

    static async editTag(data: { category_id: number, text: string }): Promise<[boolean, any[]]> {
        const tag = await SQL.execute<any[]>("SELECT * FROM _mdt_tag WHERE category_id = ? AND text = ?",[data.category_id, data.text]);
        if (tag) return [false, []];
        const createTag = await SQL.execute<SQLResult>("INSERT INTO _mdt_tag (category_id, text) VALUES (?, ?)",[data.category_id, data.text]);
        if (!createTag) return [false, []];

        return [true, []];
    }

    static async getCerts(): Promise<[boolean, any[]]> {
        const certs = await SQL.execute<any[]>("SELECT * FROM _mdt_cert");
        if (!certs) return [false, []];

        return [true, certs];
    }

    static async editCert(data: { name: string, description: string }): Promise<[boolean, any[]]> {
        const cert = await SQL.execute<any[]>("SELECT * FROM _mdt_cert WHERE name = ? AND description = ?",[data.name, data.description]);
        if (cert) return [false, []];
        const createCert = await SQL.execute<SQLResult>("INSERT INTO _mdt_cert (name, description) VALUES (?, ?)",[data.name, data.description]);
        if (!createCert) return [false, []];

        return [true, []];
    }

    static async checkExpiredWarrants(): Promise<void> {
        const expiredWarrants = await SQL.execute<any[]>("SELECT * FROM _mdt_warrant WHERE warrant_expiry_timestamp < ?", [Date.now() / 1000]);
        if (!expiredWarrants) return;

        for (const warrant of expiredWarrants) {
            const deleteWarrant = await SQL.execute<SQLResult>("DELETE FROM _mdt_warrant WHERE id = ?",[warrant.id]);
            if (!deleteWarrant) return;
        }

        return;
    }
}