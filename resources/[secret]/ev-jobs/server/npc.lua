RPC.register("ev-jobs:npc:getNPCs", function(pSource)
    local mappedNpcs = {}

    local jobs = Await(SQL.execute("SELECT * FROM _job WHERE enabled = 1"))
    if not jobs then return {} end

    -- need to loop the job and then get the npc data for each job
    for _, job in pairs(jobs) do
        local npc = json.decode(job.npc or "{}")
        if npc then
            mappedNpcs[#mappedNpcs + 1] = {
                id = npc.jobid,
                pedType = npc.data.pedType,
                model = npc.data.model,
                distance = npc.data.distance,
                settings = npc.data.settings,
                flags = npc.data.flags,
                position = {
                    coords = {
                        x = npc.headquarters.x,
                        y = npc.headquarters.y,
                        z = npc.headquarters.z
                    },
                    heading = npc.headquarters.h
                }
            }
        end
    end

    return mappedNpcs
end)