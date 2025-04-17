import { now } from "@shared/utils/tools";

export abstract class Repository {
    static async getObjects(): Promise<PlacedObject[]> {
        const results = await SQL.execute<PlacedObjectSQL[]>('SELECT * FROM _world_object');
        if (!results) return [];
        return results.map(result => {
            return {
                id: result.id,
                model: result.model,
                ns: result.ns,
                coords: {
                    x: result.x,
                    y: result.y,
                    z: result.z
                },
                rotation: {
                    x: result.rotX,
                    y: result.rotY,
                    z: result.rotZ
                },
                persistent: result.persistent,
                public: JSON.parse(result.public || '{}'),
                private: JSON.parse(result.private || '{}'),
                createdAt: result.createdAt,
                expiresAt: result.expiresAt ?? null,
                updatedAt: result.updatedAt,
                world: result.world
            }
        });
    }

    static async getObject(id: string): Promise<PlacedObject> {
        const results = await SQL.execute<PlacedObjectSQL[]>('SELECT * FROM _world_object WHERE id = ?', [id]);
        if (!results || !results[0]) return null as any;
        const result = results[0];
        return {
            id: result.id,
            model: result.model,
            ns: result.ns,
            coords: {
                x: result.x,
                y: result.y,
                z: result.z
            },
            rotation: {
                x: result.rotX,
                y: result.rotY,
                z: result.rotZ
            },
            persistent: result.persistent,
            public: JSON.parse(result.public || '{}'),
            private: JSON.parse(result.private || '{}'),
            createdAt: result.createdAt,
            expiresAt: result.expiresAt ?? null,
            updatedAt: result.updatedAt,
            world: result.world
        };
    }

    static async addObject(object: PlacedObject): Promise<void> {
        await SQL.execute('INSERT INTO _world_object (id, model, ns, x, y, z, rotX, rotY, rotZ, persistent, public, private, world, createdAt, updatedAt, expiresAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            object.id,
            object.model,
            object.ns,
            object.coords.x,
            object.coords.y,
            object.coords.z,
            object.rotation.x,
            object.rotation.y,
            object.rotation.z,
            object.persistent,
            JSON.stringify(object.public),
            JSON.stringify(object.private),
            object.world,
            object.createdAt,
            object.updatedAt,
            object.expiresAt
        ]);
    }

    static async updateObject(id: string, _public: any, _private: any, model: string | number | null, expiryTime: number | null, coords: Vector3Format | null, rotation: Vector3Format | null) {
        const results = await SQL.execute<SQLInsertResult>('UPDATE _world_object SET public = ?, private = ?, model = ?, expiresAt = ?, x = ?, y = ?, z = ?, rotX = ?, rotY = ?, rotZ = ? WHERE id = ?', [
            JSON.stringify(_public),
            JSON.stringify(_private),
            model,
            expiryTime,
            coords?.x,
            coords?.y,
            coords?.z,
            rotation?.x,
            rotation?.y,
            rotation?.z,
            id
        ]);
        return results.affectedRows > 0;
    }

    static async removeObject(id: string) {
        const results = await SQL.execute<SQLInsertResult>('DELETE FROM _world_object WHERE id = ?', [id]);
        return results.affectedRows > 0;
    }

    static async removeExpired() {
        const objects = await this.getObjects();

        for (const object of objects) {
            if (object.expiresAt && object.expiresAt < now()) {
                await this.removeObject(object.id);
            }
        }
    }
}