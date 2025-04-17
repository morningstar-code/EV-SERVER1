CPX = nil

Await = Citizen.Await

local function getProxy(pK)
    return setmetatable({}, {
        __call = function(t, ...)
            local args = {...}

            local p = promise:new()

            Citizen.CreateThread(function()
                local lib = CPX

                for k in string.gmatch(pK, "([^|]+)") do
                    if lib['__cfx_functionReference'] then return error("Invalid Element: " .. k) end

                    lib = lib[k]
                end

                local result = lib(table.unpack(args))

                p:resolve(result)
            end)

            return p
        end,

        __index = function (t, k)
            return getProxy((pK and pK .. "|" or "") .. k)
        end
    })
end

CPX = getProxy()

Citizen.CreateThread(function()
    Citizen.Wait(5)
    if(IsDuplicityVersion()) then
        print("GetLibrary: SERVER")
        CPX = exports["cpx"]:GetLibrary()
    else
        print("GetLibrary: CLIENT")
        CPX = exports["cpx"]:GetLibrary()
    end
end)