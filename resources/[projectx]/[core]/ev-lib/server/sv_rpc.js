const Promises = new Map();
const Resource = GetCurrentResourceName();
let CallIdentifier = 0;

function TriggerNetEvent(pEvent, pSrc, ...params) {
    //console.log("[RPC] Triggering net event", pEvent, pSrc);
    const payload = msgpack_pack(params)
    payload.length < 5000
        ? TriggerClientEventInternal(pEvent, pSrc, payload, payload.length)
        : TriggerLatentClientEventInternal(
            pEvent,
            pSrc,
            payload,
            payload.length,
            128000
        )
}

function ParamPacker(...params) {
    const packed = []
    for (let idx = 0; idx < params.length; idx += 1) {
        packed[idx] = { param: params[idx] }
    }
    return packed
}

function ParamUnpacker(params) {
    const unpacked = [];
    params.forEach((p) => unpacked.push(p.param));
    for (let i = 0; i < unpacked.length; i++) {
        if (unpacked[i] == null) {
            unpacked.splice(i, 1);
            i--;
        }
    }
    return unpacked;
}

async function register(name, func) {
    //console.log("[RPC] Registering", name);
    onNet(
        'rpc:request:' + name,
        async function (origin, callID, params, success) {
            //console.log("[RPC] Request", name, origin, callID, success);
            const src = source;
            let response
            success && (params = ParamUnpacker(params))
            try {
                response = await func(src, ...params)
            } catch (error) {
                emit(
                    'rpc:client:error',
                    Resource,
                    origin,
                    name,
                    error.message
                )
            }
            if (typeof response === 'undefined') {
                response = []
            } else {
                success && (response = ParamPacker(response))
            }
            TriggerNetEvent('rpc:response', src, origin, callID, response, success)
        }
    )
}

async function execute(name, src, ...params) {
    //console.log("[RPC] Executing", name, src);
    const callID = CallIdentifier;
    CallIdentifier++;
    
    const pPromise1 = new Promise((resolve, reject) => {
        Promises.set(callID, {
            resolve: resolve,
            reject: reject,
        });
    });
    
    TriggerNetEvent('rpc:request:' + name, src, Resource, callID, params, false);
    
    const pPromise2 = new Promise((resolve) => {
        setTimeout(() => {
            if (Promises.has(callID)) {
                Promises.delete(callID);
            }
            return resolve([]);
        }, 20000)
    });

    return await Promise.race([pPromise1, pPromise2]);
}

function response(origin, callID, response, state) {
    //console.log("[RPC] Response", origin, callID, response, state);
    if (Resource == origin && Promises.has(callID)) {
        state && (response = ParamUnpacker(response));
        Promises.get(callID).resolve(response);
        Promises.delete(callID);
    }
}

const RPC = {
    register: register,
    execute: execute,
}

onNet('rpc:response', response);