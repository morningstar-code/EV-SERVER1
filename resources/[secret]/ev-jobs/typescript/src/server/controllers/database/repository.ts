import { getPlayerIdByCharacterId } from "server/helpers/tools";
import { seed } from "./seeding";

export const jobs = new Map<string, MappedJob>();
export const npcs = new Map<string, any>();

export abstract class Repository {
    static async getJobs(): Promise<Map<string, MappedJob>> {
        if (jobs.size > 0) return jobs;
        const results = await SQL.execute<Job[]>("SELECT * from _job WHERE enabled = 1");
        if (results) {

            results.forEach((job: Job) => {
                if (!job.enabled) return;

                jobs.set(job.name, {
                    id: job.id,
                    job_id: job.name,
                    icon: job.icon,
                    name: job.label,
                    checkInName: job.checkInName,
                    vpn: job.vpn,
                    headquarters: typeof job.headquarters !== 'string' ? job.headquarters : JSON.parse(job.headquarters),
                    npc: typeof job.npc !== 'string' ? job.npc : JSON.parse(job.npc),
                    acceptPendingTimeout: job.acceptPendingTimeout,
                    capacity: job.capacity
                });
            });

            return jobs;
        }

        return false as any;
    }

    static async getJob(jobId: string): Promise<MappedJob> {
        const jobs = await Repository.getJobs();
        if (!jobs) return false as any;
        const job = jobs.get(jobId);
        if (!job) return false as any;
        return job;
    }

    static async getNpcs(): Promise<any> {
        if (npcs.size > 0) return npcs;
        const results = await SQL.execute<Job[]>("SELECT * from _job WHERE enabled = 1");
        if (results) {
            results.forEach((job: Job) => {
                const npc = typeof job.npc !== 'string' ? job.npc : JSON.parse(job.npc);
                if (npc) {
                    npcs.set(job.name, npc);
                }
            });

            return npcs;
        } else {
            return false as any;
        }
    }

    static async addJob(job: JobSQL): Promise<boolean> {
        const results = await SQL.execute("INSERT INTO _job (name, label, checkInName, icon, headquarters, npc, acceptPendingTimeout, vpn, capacity, enabled) VALUES (:name, :label, :checkInName, :icon, :headquarters, :npc, :acceptPendingTimeout, :vpn, :capacity, :enabled)", {
            name: job.name,
            label: job.label,
            checkInName: job.checkInName,
            icon: job.icon,
            headquarters: JSON.stringify(job.headquarters),
            npc: JSON.stringify(job.npc),
            acceptPendingTimeout: job.acceptPendingTimeout,
            vpn: job.vpn,
            capacity: job.capacity,
            enabled: job.enabled
        });

        return results ? true : false;
    }

    static async updateJob(jobId: string, job: JobSQL): Promise<boolean> {
        const results = await SQL.execute("UPDATE _job SET label = :label, checkInName = :checkInName, icon = :icon, headquarters = :headquarters, npc = :npc, acceptPendingTimeout = :acceptPendingTimeout, vpn = :vpn, capacity = :capacity, enabled = :enabled WHERE name = :name", {
            name: jobId,
            label: job.label,
            checkInName: job.checkInName,
            icon: job.icon,
            headquarters: JSON.stringify(job.headquarters),
            npc: JSON.stringify(job.npc),
            acceptPendingTimeout: job.acceptPendingTimeout,
            vpn: job.vpn,
            capacity: job.capacity,
            enabled: job.enabled
        });

        return results ? true : false;
    }

    static async seedJobs(): Promise<void> {
        console.log("[JOBS] [REPOSITORY] Seeding jobs...");
        await seed();
    }

    static async fetchReasons(): Promise<ImpoundReason[]> {
        const reasons = await SQL.execute<ImpoundReason[]>(`
            SELECT
                reason_id as 'code',
                name,
                description,
                felony,
                strikes,
                fee
            FROM
                _vehicle_impound_reason
        `);
        if (!reasons || reasons.length === 0) return [];
        return reasons;
    }

    static async getImpoundReasonById(reasonId: string): Promise<ImpoundReason> {
        const reason = await SQL.execute<ImpoundReason[]>(`
            SELECT
                reason_id as 'code',
                name,
                description,
                felony,
                strikes,
                fee
            FROM
                _vehicle_impound_reason
            WHERE
                reason_id = ?
        `, [reasonId]);
        if (!reason || reason.length === 0) return null as any;
        return reason[0];
    }

    static async fetchRequestInfo(netId: number): Promise<ImpoundRequestInfo> {
        const request = await SQL.execute<ImpoundRequestInfo[]>("SELECT * FROM _vehicle_impound_request WHERE netId = ?", [netId]);
        if (!request) return null as any;
        return request[0];
    }

    static async impoundLookup(pType: ImpoundLookupType, pPlate: string, pStateId: number): Promise<ImpoundVehicleLookup[]> {
        /*
        Types:
        1) recent - last 10 impounds
        2) personal - list of owned vehicles currently impounded
        3) plate - list of vehicles impounded with the given plate (uses pPlate)
        4) owner - list of vehicles impounded with the given state id (uses pStateId)
        */

        //Need to re-write this statement. sucks balls. TELL CHATGPT
        // let query = `
        //     SELECT
        //         v.model AS name,
        //         v.plate,
        //         v.strikes,
        //         vir.fee,
        //         0 AS tax,
        //         CONCAT(ic.first_name, ' ', ic.last_name) AS issuer,
        //         CONCAT(wc.first_name, ' ', wc.last_name) AS worker,
        //         v.state
        //     FROM
        //         _vehicle_impound_record vir
        //         LEFT JOIN characters_cars v ON v.id = vir.vin
        //         LEFT JOIN _vehicle_impound_reason r ON r.reason_id = vir.reason_id
        //         LEFT JOIN characters ic ON ic.id = vir.issuer_id
        //         LEFT JOIN characters wc ON wc.id = vir.worker_id
        // `;

        // let query = `
        //     SELECT
        //         record.*,
        //         reason.reason_id AS reason
        //     FROM
        //         _vehicle_impound_record record
        //         INNER JOIN _vehicle_impound_reason reason ON reason.reason_id = record.reason_id
        //         INNER JOIN characters_cars v ON v.vin = record.vin
        //         WHERE record.vin = :vin
        //     ORDER BY id DESC
        // `;

        let query = `
            SELECT
                vir.reason_id,
                vir.vin,
                vir.issuer_id,
                vir.worker_id,
                vir.fee,
                v.model AS name,
                v.plate,
                v.strikes,
                v.state,
                0 AS tax,
                CONCAT(ic.first_name, ' ', ic.last_name) AS issuer,
                CONCAT(wc.first_name, ' ', wc.last_name) AS worker,
                JSON_OBJECT(
                    'code', r.reason_id,
                    'name', r.name,
                    'description', r.description,
                    'felony', r.felony,
                    'strikes', r.strikes,
                    'fee', r.fee
                ) AS reason,
                JSON_OBJECT(
                    'id', vir.id,
                    'impoundDate' , vir.impound_date,
                    'lockedUntil', vir.locked_until,
                    'paid', vir.paid,
                    'released', vir.released
                ) AS record
            FROM
                _vehicle_impound_record AS vir
                INNER JOIN characters_cars AS v ON v.vin = vir.vin
                INNER JOIN _vehicle_impound_reason AS r ON r.reason_id = vir.reason_id
                INNER JOIN characters AS ic ON ic.id = vir.issuer_id
                INNER JOIN characters AS wc ON wc.id = vir.worker_id
        `;

        let params = {} as any;

        switch (pType) {
            case "recent":
                query += "ORDER BY vir.impound_date DESC LIMIT 10";
                break;
            case "owner":
            case "personal":
                query += "WHERE v.cid = @cid ORDER BY vir.id DESC";
                params = {
                    cid: pStateId || 0
                };
                break;
            case "plate":
                query += "WHERE v.plate = @plate ORDER BY vir.id DESC";
                params = {
                    plate: pPlate || ""
                };
                break;
        }

        const results = await SQL.execute<ImpoundVehicleLookup[]>(query, params);
        if (!results) return [];

        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            if (result.reason) {
                result.reason = JSON.parse(result.reason as any);
            }
            if (result.record) {
                result.record = JSON.parse(result.record as any);
            }
        }

        return results;
    }

    static async getImpoundRequestByNetId(netId: number): Promise<ImpoundRequestInfo> {
        const request = await SQL.execute<ImpoundRequestInfo[]>("SELECT * FROM _vehicle_impound_request WHERE netId = ?", [netId]);
        if (!request) return null as any;
        return request[0];
    }

    static async addImpoundRequest(issuer_id: number, netId: number, reasonId: string, type: string, strikes: number, reportId: number): Promise<boolean> {
        const reason = await Repository.getImpoundReasonById(reasonId);
        if (!reason) return false;
        
        const results = await SQL.execute("INSERT INTO _vehicle_impound_request (netId, reason_id, retention, issuer_id) VALUES (?, ?, ?, ?)", [netId, reasonId, reason.retention, issuer_id]);
        return results ? true : false;
    }

    static async removeImpoundReqeust(netId: number): Promise<boolean> {
        const results = await SQL.execute("DELETE FROM _vehicle_impound_request WHERE netId = ?", [netId]);
        return results ? true : false;
    }

    static async addImpoundRecord(vin: string, reasonId: string, issuer_id: number, worker_id: number) {
        const reason = await Repository.getImpoundReasonById(reasonId);
        if (!reason) return false;

        const updated = await SQL.execute<SQLInsertResult>("UPDATE characters_cars SET state = ? WHERE vin = ?", ["impounded", vin]);
        if (updated.affectedRows === 0) return false;
        
        const results = await SQL.execute("INSERT INTO _vehicle_impound_record (reason_id, vin, impound_date, locked_until, paid, released, issuer_id, worker_id, fee, strike) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [reasonId, vin, Date.now(), 0, false, false, issuer_id, worker_id, reason.fee, reason.strikes]);
        return results ? true : false;
    }

    static async removeImpoundRecord(vin: string) {
        return true;
    }

    static async getImpoundRecordById(recordId: number): Promise<SQLImpoundVehicleRecord> {
        const results = await SQL.execute<SQLImpoundVehicleRecord[]>("SELECT * FROM _vehicle_impound_record WHERE id = ?", [recordId]);
        if (!results || results.length === 0) return null as any;

        return results[0];
    }

    static async getCharacterIdByVehicleVin(vin: string): Promise<number> {
        const results = await SQL.execute<any[]>("SELECT cid FROM characters_cars WHERE vin = ?", [vin]);
        if (!results || results.length === 0) return null as any;

        return results[0].cid;
    }

    static async updateVehicleGarageState(vin: string): Promise<boolean> {
        const results = await SQL.execute("UPDATE characters_cars SET state = ? WHERE vin = ?", ["out", vin]);
        return results ? true : false;
    }

    static async removeVinScratchedVehicle(vin: string): Promise<boolean> {
        const results = await SQL.execute("DELETE FROM characters_cars WHERE vin = ?", [vin]); 
        return results ? true : false;
    }

    static async updateImpoundRecordById(recordId: number, record: SQLImpoundVehicleRecord): Promise<boolean> {
        const results = await SQL.execute("UPDATE _vehicle_impound_record SET reason_id = :reason_id, vin = :vin, impound_date = :impound_date, locked_until = :locked_until, paid = :paid, released = :released, issuer_id = :issuer_id, worker_id = :worker_id, fee = :fee WHERE id = :id", {
            id: recordId,
            reason_id: record.reason_id,
            vin: record.vin,
            impound_date: record.impound_date,
            locked_until: record.locked_until,
            paid: record.paid,
            released: record.released,
            issuer_id: record.issuer_id,
            worker_id: record.worker_id,
            fee: record.fee
        });

        return results ? true : false;
    }

    static async hasVpn(characterId: number): Promise<boolean> { 
        const result = await SQL.execute<any[]>("SELECT * FROM inventory WHERE (item_id = 'vpnxj' OR item_id = 'vpnxja') AND name = @name", {
            name: `ply-${characterId}`
        });

        if (!result || result.length === 0) return false;

        return true;
    }

    static async hasItem(characterId: number, itemId: string, qualityCheck = false): Promise<[boolean, string]> {
        let query = `
            SELECT
                *
            FROM
                inventory
            WHERE
                item_id = @itemId
                AND name = @name
        `;

        const result = await SQL.execute<any[]>(query, {
            itemId,
            name: `ply-${characterId}`
        });

        if (!result || result.length === 0) return [false, "You do not have this item."];

        if (qualityCheck) {
            if (result[0].quality < 1) return [false, "Go get a new one, brokie."];
        }

        return [true, "Success"];
    }

    static async getCharacterById(characterId: number): Promise<Character> {
        const result = await SQL.execute<Character[]>("SELECT * FROM characters WHERE id = ?", [characterId]);
        if (!result || result.length === 0) return null as any;
        return result[0];
    }
}