import { Repository } from "./repository";
import { isEqual } from "lodash";

function compareJSON(obj1: any, obj2: any) {
    return isEqual(obj1, obj2);
}

function getFileNameOnly(filePath: any) {
    return filePath.split('/').pop().split('.').shift();
}

function loadJobs() {
    const requireContext = require.context('../../../../../seeding/jobs', false, /\.json$/);
    const json: any = {};
    requireContext.keys().forEach((key: any) => {
        const obj = requireContext(key);
        const simpleKey = getFileNameOnly(key);
        json[simpleKey] = obj;
    });
    return json;
}

export async function seed() {
    const jobs: JobSQL[] = loadJobs();
    if (!jobs) return console.log("No jobs to seed!");

    const jobIds = Object.values(jobs).map((jobData: JobSQL) => jobData.name);

    const existingJobs = await SQL.execute<JobSQL[]>(
        "SELECT * FROM _job WHERE name IN (?)",
        [jobIds]
    );

    if (!existingJobs) return console.log("No existing jobs found!");

    const existingJobsMap = new Map(existingJobs.map((row) => [row.name, row]));

    for (const [jobId, jobData] of Object.entries(jobs)) {
        const existingJob = existingJobsMap.get(jobId);

        if (existingJob) {
            existingJob.headquarters = JSON.parse(existingJob?.headquarters as any);
            existingJob.npc = JSON.parse(existingJob?.npc as any);
            delete existingJob.id;
        }

        if (!existingJob) {
            console.log(`Job is not in the database, seeding job with ID: ${jobId}`);

            // Perform the necessary operations for seeding the job
            await Repository.addJob(jobData);

            console.log(`Seeded job with ID: ${jobId}`);
        } else if (!compareJSON(jobData, existingJob)) {
            console.log(`Job in the database is different from JSON, updating job with ID: ${jobId}`);

            // Perform the necessary operations for updating the job
            await Repository.updateJob(jobId, jobData);

            console.log(`Updated job with ID: ${jobId}`);
        } else {
            console.log(`Job is already in the database, skipping`);
        }
    }
}