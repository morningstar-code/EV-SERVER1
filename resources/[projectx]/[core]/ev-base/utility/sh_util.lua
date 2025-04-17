CPX.Util = CPX.Util or {}

function CPX.Util.HexIdToSteamId(self, hexid)
    local cid = self:HexIdToComId(hexid)
    local steam64 = math.floor(tonumber(string.sub( cid, 2)))
	local a = steam64 % 2 == 0 and 0 or 1
	local b = math.floor(math.abs(6561197960265728 - steam64 - a) / 2)
	local sid = "STEAM_0:"..a..":"..(a == 1 and b -1 or b)
    return sid
end

function CPX.Util.HexIdToComId(self, hexid)
    return math.floor(tonumber(string.sub(hexid, 7), 16))
end

function CPX.Util.GetHexId(self, src)
    for k,v in ipairs(GetPlayerIdentifiers(src)) do
        if string.sub(v, 1, 5) == "steam" then
            return v
        end
    end
    
    return false
end

function HexIdToComId(hexid)
    return math.floor(tonumber(string.sub(hexid, 7), 16))
end

function HexIdToSteamId(hexid)
    local cid = HexIdToComId(hexid)
    local steam64 = math.floor(tonumber(string.sub( cid, 2)))
	local a = steam64 % 2 == 0 and 0 or 1
	local b = math.floor(math.abs(6561197960265728 - steam64 - a) / 2)
	local sid = "STEAM_0:"..a..":"..(a == 1 and b -1 or b)
    return sid
end

exports("HexIdToComId", HexIdToComId)
exports("HexIdToSteamId", HexIdToSteamId)

function CPX.Util.GetLicense(self, src)
    for k,v in ipairs(GetPlayerIdentifiers(src)) do
        if string.sub(v, 1, 7) == "license" then
            return v
        end
    end

    return false
end

function CPX.Util.GetFivemId(self, src)
  for k,v in ipairs(GetPlayerIdentifiers(src)) do
      if string.sub(v, 1, 5) == "fivem" then
          return v
      end
  end

  return false
end

function CPX.Util.GetIdType(self, src, type)
    local len = string.len(type)
    
    for k,v in ipairs(GetPlayerIdentifiers(src)) do
        if string.sub(v, 1, len) == type then
            return v
        end
    end

    return false
end

function CPX.Util.Stringsplit(self, inputstr, sep)
    if sep == nil then
        sep = "%s"
    end

    local t={} ; i=1

    for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
        t[i] = str
        i = i + 1
    end

    return t
end

function CPX.Util.IsSteamId(self, id)
    id = tostring(id)
    if not id then return false end
    if string.match(id, "^STEAM_[01]:[01]:%d+$") then return true else return false end
end

function CPX.Util.CommaValue(self, n)
	local left,num,right = string.match(n,'^([^%d]*%d)(%d*)(.-)$')
	return left..(num:reverse():gsub('(%d%d%d)','%1,'):reverse())..right
end

function CPX.Util.Uuid(self)
    math.randomseed(GetGameTimer())
    local template ='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    return string.gsub(template, '[xy]', function (c)
        local v = (c == 'x') and math.random(0, 0xf) or math.random(8, 0xb)
        return string.format('%x', v)
    end)
end
