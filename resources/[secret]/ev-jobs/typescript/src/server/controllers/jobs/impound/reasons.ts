import { Repository } from "server/controllers/database/repository";

export async function InitImpoundReasons(): Promise<any> {}

export async function fetchReasons(): Promise<ImpoundReason[]> {
    return await Repository.fetchReasons();
}