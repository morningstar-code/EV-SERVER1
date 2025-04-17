local NPCs = {}

local Created = false

function GetNPCJobData(pId)
    for jobId, data in pairs(NPCs) do
        local id = GetHashKey(data.id)

        if id == pId then
           return {id = data.job}
        end
    end
end

exports('GetNPCJobData', GetNPCJobData)

AddEventHandler('ev:jobs:createNPCs', function(pNPCs)
    if not Created then
        Created = true

        for _, npc in ipairs(pNPCs) do
            local vectors = npc.headquarters
            npc.data.id = npc.jobid
            npc.data.position = {
              coords = vector3(vectors.x, vectors.y, vectors.z - 1.0),
              heading = vectors.h or 0.0
            }
            npc.data.position.heading = npc.data.position.heading
            NPCs[npc.jobid] = exports["ev-npcs"]:RegisterNPC(npc.data, 'ev-jobs')
        end
    end
end)

local NPCsPool = {}

RegisterNetEvent('ev-jobs:npc:added')
AddEventHandler('ev-jobs:npc:added', function(pSpawn)
    local data = pSpawn

    local vectors = data.position.coords

    data.position.coords = vector3(vectors.x, vectors.y, vectors.z)

    NPCsPool[data.id] = exports["ev-npcs"]:RegisterNPC(data, 'ev-jobs')
end);

RegisterNetEvent('ev-jobs:npc:edited')
AddEventHandler('ev-jobs:npc:edited', function(pId, pVectors, pHeading)
    local coords = vector3(pVectors.x, pVectors.y, pVectors.z)
    local heading = pHeading + 0.0

    local position = { coords = coords, heading = heading}

    exports["ev-npcs"]:UpdateNPCData(pId, 'position', position)
end);

RegisterNetEvent('ev-jobs:npc:removed')
AddEventHandler('ev-jobs:npc:removed', function(pId)
    exports["ev-npcs"]:RemoveNPC(pId)
end);

Citizen.CreateThread(function()
    Citizen.Wait(2000)

    NPCs = RPC.execute('ev-jobs:npc:getNPCs')

    for _, npc in ipairs(NPCs) do
        local data = npc

        local vectors = data.position.coords

        data.position.coords = vector3(vectors.x, vectors.y, vectors.z)

        NPCsPool[data.id] = exports["ev-npcs"]:RegisterNPC(data, 'ev-jobs')
    end
end)