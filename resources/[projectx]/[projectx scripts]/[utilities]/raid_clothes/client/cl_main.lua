local enabled = false
local player = false
local firstChar = false
local cam = false
local customCam = false
local oldPed = false
local startingMenu = false
local currentFadeStyle = 255
local currentTats = {}
local previewTattoos = {}
local purchasingTattoos = {}
local removingTattoos = {}
local currentShop = false

local drawable_names = { "face", "masks", "hair", "torsos", "legs", "bags", "shoes", "neck", "undershirts", "vest", "decals", "jackets" }
local prop_names = { "hats", "glasses", "earrings", "mouth", "lhand", "rhand", "watches", "braclets" }
local head_overlays = { "Blemishes", "FacialHair", "Eyebrows", "Ageing", "Makeup", "Blush", "Complexion", "SunDamage", "Lipstick", "MolesFreckles", "ChestHair",
  "BodyBlemishes", "AddBodyBlemishes" }
local face_features = { "Nose_Width", "Nose_Peak_Hight", "Nose_Peak_Lenght", "Nose_Bone_High", "Nose_Peak_Lowering", "Nose_Bone_Twist", "EyeBrown_High",
  "EyeBrown_Forward", "Cheeks_Bone_High", "Cheeks_Bone_Width", "Cheeks_Width", "Eyes_Openning", "Lips_Thickness", "Jaw_Bone_Width", "Jaw_Bone_Back_Lenght",
  "Chimp_Bone_Lowering", "Chimp_Bone_Lenght", "Chimp_Bone_Width", "Chimp_Hole", "Neck_Thikness" }
local tatCategory = GetTatCategs()
local tattooHashList = CreateHashList()

local isService = false
local passedClothing = true

local currentPrice = 0
local currentPriceWithoutTax = 0

local MenuData = {
  clothing_shop = {
    text = "To buy clothes",
    displayName = "Clothing Store",
    basePrice = 75
  },
  barber_shop = {
    text = "Fix your ugly mug",
    displayName = "Barber Shop",
    basePrice = 75
  },
  tattoo_shop = {
    text = "Become edgy",
    displayName = "Tattoo Parlor",
    basePrice = 50
  }
}

local listening = false

function RefreshUI()
  hairColors = {}
  for i = 0, GetNumHairColors() - 1 do
    local outR, outG, outB = GetPedHairRgbColor(i)
    hairColors[i] = { outR, outG, outB }
  end

  makeupColors = {}
  for i = 0, GetNumMakeupColors() - 1 do
    local outR, outG, outB = GetPedMakeupRgbColor(i)
    makeupColors[i] = { outR, outG, outB }
  end

  SendNUIMessage({
    type = "colors",
    hairColors = hairColors,
    makeupColors = makeupColors,
    hairColor = GetPedHair()
  })
  SendNUIMessage({
    type = "menutotals",
    drawTotal = GetDrawablesTotal(),
    propDrawTotal = GetPropDrawablesTotal(),
    textureTotal = GetTextureTotals(),
    headoverlayTotal = GetHeadOverlayTotals(),
    skinTotal = GetSkinTotal(),
    fadeTotal = GetFadeTotal(),
  })
  SendNUIMessage({
    type = "barber_shop",
    headBlend = GetPedHeadBlendData(),
    headOverlay = GetHeadOverlayData(),
    headStructure = GetHeadStructureData()
  })
  SendNUIMessage({
    type = "clothing_shopdata",
    drawables = GetDrawables(),
    props = GetProps(),
    drawtextures = GetDrawTextures(),
    proptextures = GetPropTextures(),
    skin = GetSkin(),
    currentFade = currentFadeStyle,
    oldPed = oldPed,
  })
  SendNUIMessage({
    type = "tattoo_shop",
    totals = tatCategory,
    values = GetTats()
  })
end

function isNearClothing()
  return currentShop
end

exports('isNearClothing', isNearClothing)

function GetSkin()
  for i = 1, #frm_skins do
    if (GetHashKey(frm_skins[i]) == GetEntityModel(PlayerPedId())) then
      return { name = "skin_male", value = i }
    end
  end
  for i = 1, #fr_skins do
    if (GetHashKey(fr_skins[i]) == GetEntityModel(PlayerPedId())) then
      return { name = "skin_female", value = i }
    end
  end
  return false
end

function GetDrawables()
  drawables = {}
  local model = GetEntityModel(PlayerPedId())
  local mpPed = false
  if (model == `mp_f_freemode_01` or model == `mp_m_freemode_01`) then
    mpPed = true
  end
  for i = 0, #drawable_names - 1 do
    if mpPed and drawable_names[i + 1] == "undershirts" and GetPedDrawableVariation(player, i) == -1 then
      SetPedComponentVariation(player, i, 15, 0, 2)
    end
    drawables[i] = { drawable_names[i + 1], GetPedDrawableVariation(player, i) }
  end
  return drawables
end

function GetProps()
  props = {}
  for i = 0, #prop_names - 1 do
    props[i] = { prop_names[i + 1], GetPedPropIndex(player, i) }
  end
  return props
end

function GetDrawTextures()
  textures = {}
  for i = 0, #drawable_names - 1 do
    table.insert(textures, { drawable_names[i + 1], GetPedTextureVariation(player, i) })
  end
  return textures
end

function GetPropTextures()
  textures = {}
  for i = 0, #prop_names - 1 do
    table.insert(textures, { prop_names[i + 1], GetPedPropTextureIndex(player, i) })
  end
  return textures
end

function GetDrawablesTotal()
  drawables = {}
  for i = 0, #drawable_names - 1 do
    drawables[i] = { drawable_names[i + 1], GetNumberOfPedDrawableVariations(player, i) }
  end
  return drawables
end

function GetPropDrawablesTotal()
  props = {}
  for i = 0, #prop_names - 1 do
    props[i] = { prop_names[i + 1], GetNumberOfPedPropDrawableVariations(player, i) }
  end
  return props
end

function GetTextureTotals()
  local values = {}
  local draw = GetDrawables()
  local props = GetProps()

  for idx = 0, #draw - 1 do
    local name = draw[idx][1]
    local value = draw[idx][2]
    values[name] = GetNumberOfPedTextureVariations(player, idx, value)
  end

  for idx = 0, #props - 1 do
    local name = props[idx][1]
    local value = props[idx][2]
    values[name] = GetNumberOfPedPropTextureVariations(player, idx, value)
  end
  return values
end

function SetClothing(drawables, props, drawTextures, propTextures)
  for i = 1, #drawable_names do
    if drawables[0] == nil then
      if drawable_names[i] == "undershirts" and drawables[tostring(i - 1)][2] == -1 then
        SetPedComponentVariation(player, i - 1, 15, 0, 2)
      else
        SetPedComponentVariation(player, i - 1, drawables[tostring(i - 1)][2], drawTextures[i][2], 2)
      end
    else
      if drawable_names[i] == "undershirts" and drawables[i - 1][2] == -1 then
        SetPedComponentVariation(player, i - 1, 15, 0, 2)
      else
        SetPedComponentVariation(player, i - 1, drawables[i - 1][2], drawTextures[i][2], 2)
      end
    end
  end

  for i = 1, #prop_names do
    local propZ = (drawables[0] == nil and props[tostring(i - 1)][2] or props[i - 1][2])
    ClearPedProp(player, i - 1)
    SetPedPropIndex(
      player,
      i - 1,
      propZ,
      propTextures[i][2], true)
  end
end

function GetSkinTotal()
  return {
    #frm_skins,
    #fr_skins
  }
end

local toggleClothing = {}
function ToggleProps(data)
  local name = data["name"]

  selectedValue = has_value(drawable_names, name)
  if (selectedValue > -1) then
    if (toggleClothing[name] ~= nil) then
      SetPedComponentVariation(
        player,
        tonumber(selectedValue),
        tonumber(toggleClothing[name][1]),
        tonumber(toggleClothing[name][2]), 2)
      toggleClothing[name] = nil
    else
      toggleClothing[name] = {
        GetPedDrawableVariation(player, tonumber(selectedValue)),
        GetPedTextureVariation(player, tonumber(selectedValue))
      }

      local value = -1
      if name == "undershirts" or name == "torsos" then
        value = 15
        if name == "undershirts" and GetEntityModel(PlayerPedId()) == GetHashKey('mp_f_freemode_01') then
          value = -1
        end
      end
      if name == "legs" then
        value = 14
      end

      SetPedComponentVariation(
        player,
        tonumber(selectedValue),
        value, 0, 2)
    end
  else
    selectedValue = has_value(prop_names, name)
    if (selectedValue > -1) then
      if (toggleClothing[name] ~= nil) then
        SetPedPropIndex(
          player,
          tonumber(selectedValue),
          tonumber(toggleClothing[name][1]),
          tonumber(toggleClothing[name][2]), true)
        toggleClothing[name] = nil
      else
        toggleClothing[name] = {
          GetPedPropIndex(player, tonumber(selectedValue)),
          GetPedPropTextureIndex(player, tonumber(selectedValue))
        }
        ClearPedProp(player, tonumber(selectedValue))
      end
    end
  end
end

function SaveToggleProps()
  for k in pairs(toggleClothing) do
    local name    = k
    selectedValue = has_value(drawable_names, name)
    if (selectedValue > -1) then
      SetPedComponentVariation(
        player,
        tonumber(selectedValue),
        tonumber(toggleClothing[name][1]),
        tonumber(toggleClothing[name][2]), 2)
      toggleClothing[name] = nil
    else
      selectedValue = has_value(prop_names, name)
      if (selectedValue > -1) then
        SetPedPropIndex(
          player,
          tonumber(selectedValue),
          tonumber(toggleClothing[name][1]),
          tonumber(toggleClothing[name][2]), true)
        toggleClothing[name] = nil
      end
    end
  end
end

function LoadPed(data, defaultSkin)
  defaultSkin = defaultSkin == nil and true or defaultSkin
  if defaultSkin then
    SetSkin(data.model, defaultSkin)
  end
  SetClothing(data.drawables, data.props, data.drawtextures, data.proptextures)
  Citizen.Wait(500)
  SetPedHairColor(player, tonumber(data.hairColor[1]), tonumber(data.hairColor[2]))
  SetPedHeadBlend(data.headBlend)
  SetHeadStructure(data.headStructure)
  SetHeadOverlayData(data.headOverlay)
  return
end

exports('LoadPed', LoadPed)

function GetCurrentPed()
  player = PlayerPedId()
  return {
    model = GetEntityModel(PlayerPedId()),
    hairColor = GetPedHair(),
    headBlend = GetPedHeadBlendData(),
    headOverlay = GetHeadOverlayData(),
    headStructure = GetHeadStructure(),
    drawables = GetDrawables(),
    props = GetProps(),
    drawtextures = GetDrawTextures(),
    proptextures = GetPropTextures(),
    fadeStyle = currentFadeStyle
  }
end

exports('GetCurrentPed', GetCurrentPed)

function PlayerModel(data)
  local skins = nil
  if (data['name'] == 'skin_male') then
    skins = frm_skins
  else
    skins = fr_skins
  end
  local skin = skins[tonumber(data['value'])]
  rotation(180.0)
  SetSkin(GetHashKey(skin), true)
  Citizen.Wait(1)
  rotation(180.0)
end

local function ToggleClothingToLoadPed()
  local ped = PlayerPedId()
  local drawables = GetDrawablesTotal()

  for num, _ in pairs(drawables) do
    if drawables[num][2] > 1 then
      component = tonumber(num)
      SetPedComponentVariation(ped, component, 1, 0, 0)
      Wait(250)
      SetPedComponentVariation(ped, component, 0, 0, 0)
      break
    end
  end
end

local inSpawn = false
AddEventHandler("raid_clothes:inSpawn", function(pInSpawn)
  inSpawn = pInSpawn
end)

function SetSkin(model, setDefault)
  -- TODO: If not isCop and model not in copModellist, do below.
  -- Model is a hash, GetHashKey(modelName)
  SetEntityInvincible(PlayerPedId(), true)
  if IsModelInCdimage(model) and IsModelValid(model) then
    RequestModel(model)
    while (not HasModelLoaded(model)) do
      Citizen.Wait(0)
    end
    SetPlayerModel(PlayerId(), model)
    SetModelAsNoLongerNeeded(model)
    player = PlayerPedId()
    FreezePedCameraRotation(player, true)
    SetPedMaxHealth(player, 200)
    ToggleClothingToLoadPed()
    SetPedDefaultComponentVariation(player)
    if inSpawn then
      SetEntityHealth(player, GetEntityMaxHealth(player))
    end
    if setDefault and model ~= nil and not isCustomSkin(model) and (model == `mp_f_freemode_01` or model == `mp_m_freemode_01`) then
      SetPedHeadBlendData(player, 0, 0, 0, 15, 0, 0, 0, 1.0, 0, false)
      SetPedComponentVariation(player, 11, 0, 1, 0)
      SetPedComponentVariation(player, 8, 0, 1, 0)
      SetPedComponentVariation(player, 6, 1, 2, 0)
      SetPedHeadOverlayColor(player, 1, 1, 0, 0)
      SetPedHeadOverlayColor(player, 2, 1, 0, 0)
      SetPedHeadOverlayColor(player, 4, 2, 0, 0)
      SetPedHeadOverlayColor(player, 5, 2, 0, 0)
      SetPedHeadOverlayColor(player, 8, 2, 0, 0)
      SetPedHeadOverlayColor(player, 10, 1, 0, 0)
      SetPedHeadOverlay(player, 1, 0, 0.0)
      SetPedHairColor(player, 1, 1)
    end
  end
  SetEntityInvincible(PlayerPedId(), false)
  TriggerEvent("Animation:Set:Reset")
end

RegisterNUICallback('updateclothes', function(data, cb)
  toggleClothing[data["name"]] = nil
  selectedValue = has_value(drawable_names, data["name"])
  if (selectedValue > -1) then
    if data["name"] == "face" and tonumber(data["value"]) == -1 then
      return
    end
    SetPedComponentVariation(player, tonumber(selectedValue), tonumber(data["value"]), tonumber(data["texture"]), 2)
    cb({
      GetNumberOfPedTextureVariations(player, tonumber(selectedValue), tonumber(data["value"]))
    })
  else
    selectedValue = has_value(prop_names, data["name"])
    if (tonumber(data["value"]) == -1) then
      ClearPedProp(player, tonumber(selectedValue))
    else
      SetPedPropIndex(
        player,
        tonumber(selectedValue),
        tonumber(data["value"]),
        tonumber(data["texture"]), true)
    end
    cb({
      GetNumberOfPedPropTextureVariations(
        player,
        tonumber(selectedValue),
        tonumber(data["value"])
      )
    })
  end
end)

RegisterNUICallback('customskin', function(data, cb)
  if canUseCustomSkins() then
    local valid_model = isInSkins(data)
    if valid_model then
      SetSkin(GetHashKey(data), true)
    end
  end
end)

RegisterNUICallback('setped', function(data, cb)
  PlayerModel(data)
  RefreshUI()
  cb('ok')
end)

RegisterNUICallback('resetped', function(data, cb)
  LoadPed(oldPed)
  cb('ok')
end)


------------------------------------------------------------------------------------------
-- Barber

function GetPedHeadBlendData()
  local blob = string.rep("\0\0\0\0\0\0\0\0", 6 + 3 + 1)                     -- Generate sufficient struct memory.
  if not Citizen.InvokeNative(0x2746BD9D88C5C5D0, player, blob, true) then   -- Attempt to write into memory blob.
    return nil
  end

  return {
    shapeFirst = string.unpack("<i4", blob, 1),
    shapeSecond = string.unpack("<i4", blob, 9),
    shapeThird = string.unpack("<i4", blob, 17),
    skinFirst = string.unpack("<i4", blob, 25),
    skinSecond = string.unpack("<i4", blob, 33),
    skinThird = string.unpack("<i4", blob, 41),
    shapeMix = string.unpack("<f", blob, 49),
    skinMix = string.unpack("<f", blob, 57),
    thirdMix = string.unpack("<f", blob, 65),
    hasParent = string.unpack("b", blob, 73) ~= 0,
  }
end

function SetPedHeadBlend(data)
  if data ~= nil then
    SetPedHeadBlendData(player,
      tonumber(data['shapeFirst']),
      tonumber(data['shapeSecond']),
      tonumber(data['shapeThird']),
      tonumber(data['skinFirst']),
      tonumber(data['skinSecond']),
      tonumber(data['skinThird']),
      tonumber(data['shapeMix']),
      tonumber(data['skinMix']),
      tonumber(data['thirdMix']),
      false)
  end
end

function GetHeadOverlayData()
  local headData = {}
  for i = 1, #head_overlays do
    local retval, overlayValue, colourType, firstColour, secondColour, overlayOpacity = GetPedHeadOverlayData(player, i - 1)
    if retval then
      headData[i] = {}
      headData[i].name = head_overlays[i]
      headData[i].overlayValue = overlayValue
      headData[i].colourType = colourType
      headData[i].firstColour = firstColour
      headData[i].secondColour = secondColour
      headData[i].overlayOpacity = overlayOpacity
    end
  end
  return headData
end

function SetHeadOverlayData(data)
  if json.encode(data) ~= "[]" then
    for i = 1, #head_overlays do
      SetPedHeadOverlay(player, i - 1, tonumber(data[i].overlayValue), tonumber(data[i].overlayOpacity))
      -- SetPedHeadOverlayColor(player, i-1, data[i].colourType, data[i].firstColour, data[i].secondColour)
    end

    SetPedHeadOverlayColor(player, 0, 0, tonumber(data[1].firstColour), tonumber(data[1].secondColour))
    SetPedHeadOverlayColor(player, 1, 1, tonumber(data[2].firstColour), tonumber(data[2].secondColour))
    SetPedHeadOverlayColor(player, 2, 1, tonumber(data[3].firstColour), tonumber(data[3].secondColour))
    SetPedHeadOverlayColor(player, 3, 0, tonumber(data[4].firstColour), tonumber(data[4].secondColour))
    SetPedHeadOverlayColor(player, 4, 2, tonumber(data[5].firstColour), tonumber(data[5].secondColour))
    SetPedHeadOverlayColor(player, 5, 2, tonumber(data[6].firstColour), tonumber(data[6].secondColour))
    SetPedHeadOverlayColor(player, 6, 0, tonumber(data[7].firstColour), tonumber(data[7].secondColour))
    SetPedHeadOverlayColor(player, 7, 0, tonumber(data[8].firstColour), tonumber(data[8].secondColour))
    SetPedHeadOverlayColor(player, 8, 2, tonumber(data[9].firstColour), tonumber(data[9].secondColour))
    SetPedHeadOverlayColor(player, 9, 0, tonumber(data[10].firstColour), tonumber(data[10].secondColour))
    SetPedHeadOverlayColor(player, 10, 1, tonumber(data[11].firstColour), tonumber(data[11].secondColour))
    SetPedHeadOverlayColor(player, 11, 0, tonumber(data[12].firstColour), tonumber(data[12].secondColour))
  end
end

function GetHeadOverlayTotals()
  local totals = {}
  for i = 1, #head_overlays do
    totals[head_overlays[i]] = GetNumHeadOverlayValues(i - 1)
  end
  return totals
end

function GetPedHair()
  local hairColor = {}
  hairColor[1] = GetPedHairColor(player)
  hairColor[2] = GetPedHairHighlightColor(player)
  return hairColor
end

function GetHeadStructureData()
  local structure = {}
  for i = 1, #face_features do
    structure[face_features[i]] = GetPedFaceFeature(player, i - 1)
  end
  return structure
end

function GetHeadStructure(data)
  local structure = {}
  for i = 1, #face_features do
    structure[i] = GetPedFaceFeature(player, i - 1)
  end
  return structure
end

function SetHeadStructure(data)
  for i = 1, #face_features do
    SetPedFaceFeature(player, i - 1, data[i])
  end
end

RegisterNUICallback('saveheadblend', function(data, cb)
  SetPedHeadBlendData(player,
    tonumber(data.shapeFirst),
    tonumber(data.shapeSecond),
    tonumber(data.shapeThird),
    tonumber(data.skinFirst),
    tonumber(data.skinSecond),
    tonumber(data.skinThird),
    tonumber(data.shapeMix) / 100,
    tonumber(data.skinMix) / 100,
    tonumber(data.thirdMix) / 100, false)
  cb('ok')
end)

RegisterNUICallback('savehaircolor', function(data, cb)
  SetPedHairColor(player, tonumber(data['firstColour']), tonumber(data['secondColour']))
end)

RegisterNUICallback('savefacefeatures', function(data, cb)
  local index = has_value(face_features, data["name"])
  if (index <= -1) then return end
  local scale = tonumber(data["scale"]) / 100
  SetPedFaceFeature(player, index, scale)
  cb('ok')
end)

RegisterNUICallback('saveheadoverlay', function(data, cb)
  if data["name"] == "fadeStyle" then
    -- setFacialDecoration(tonumber(data["value"]))
    setTattoosAndFacial(nil, tonumber(data["value"]))
  else
    local index = has_value(head_overlays, data["name"])
    SetPedHeadOverlay(player, index, tonumber(data["value"]), tonumber(data["opacity"]) / 100)
  end
  cb('ok')
end)

RegisterNUICallback('saveheadoverlaycolor', function(data, cb)
  local index = has_value(head_overlays, data["name"])
  local success, overlayValue, colourType, firstColour, secondColour, overlayOpacity = GetPedHeadOverlayData(player, index)
  local sColor = tonumber(data['secondColour'])
  if (sColor == nil) then
    sColor = tonumber(data['firstColour'])
  end
  SetPedHeadOverlayColor(player, index, colourType, tonumber(data['firstColour']), sColor) 
  cb('ok')
end)


----------------------------------------------------------------------------------
-- UTIL SHIT


function has_value(tab, val)
  for index = 1, #tab do
    if tab[index] == val then
      return index - 1
    end
  end
  return -1
end

function EnableGUI(enable, menu, pPriceText, pPrice, disableDestroyCams)
  enabled = enable
  SetCustomNuiFocus(enable, enable)
  SendNUIMessage({
    type = "enableclothing_shop",
    enable = enable,
    menu = menu,
    priceText = pPriceText,
    price = pPrice,
    isService = isService
  })

  if (not enable and not startingMenu) then
    SaveToggleProps()
    oldPed = {}
    DestroyAllCams(true)
    RenderScriptCams(false, true, 1, true, true)
  end
end

function CustomCamera(position, ending)
  if startingMenu and position == "torso" then return end
  if not enabled then return end
  if customCam then
    FreezePedCameraRotation(player, false)
    SetCamActive(cam, false)
    if not ending and not startingMenu then
      RenderScriptCams(false, false, 0, true, true)
      if (DoesCamExist(cam)) then
        DestroyCam(cam, false)
      end
    end
    customCam = false
  else
    if (DoesCamExist(cam)) then
      DestroyCam(cam, false)
    end

    local pos = GetEntityCoords(player, true)
    if not startingMenu then
      SetEntityRotation(player, 0.0, 0.0, 0.0, 1, true)
    end

    FreezePedCameraRotation(player, true)

    cam = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
    SetCamCoord(cam, player)
    SetCamRot(cam, 0.0, 0.0, 0.0)

    SetCamActive(cam, true)
    RenderScriptCams(true, false, 0, true, true)

    SwitchCam(position)
    customCam = true
  end
end

function rotation(dir)
  local pedRot = GetEntityHeading(PlayerPedId()) + dir
  SetEntityHeading(PlayerPedId(), pedRot % 360)
end

function TogRotation()
  local pedRot = GetEntityHeading(PlayerPedId()) + 90 % 360
  SetEntityHeading(PlayerPedId(), math.floor(pedRot / 90) * 90.0)
end

function SwitchCam(name)
  if name == "cam" then
    TogRotation()
    return
  end

  local pos = GetEntityCoords(player, true)
  local bonepos = false
  if (name == "head") then
    bonepos = GetPedBoneCoords(player, 31086)
    if startingMenu then
      bonepos = vector3(bonepos.x - 0.7, bonepos.y + 0.0, bonepos.z + 0.05)
    else
      bonepos = vector3(bonepos.x - 0.1, bonepos.y + 0.4, bonepos.z + 0.05)
    end
  end
  if (name == "torso") then
    bonepos = GetPedBoneCoords(player, 11816)
    bonepos = vector3(bonepos.x - 0.4, bonepos.y + 2.2, bonepos.z + 0.2)
  end
  if (name == "leg") then
    bonepos = GetPedBoneCoords(player, 46078)

    if startingMenu then
      bonepos = vector3(bonepos.x - 0.9, bonepos.y + 0.0, bonepos.z - 0.2)
    else
      bonepos = vector3(bonepos.x - 0.1, bonepos.y + 1, bonepos.z)
    end
  end

  SetCamCoord(cam, bonepos.x, bonepos.y, bonepos.z)
  if startingMenu and name ~= "torso" then
    SetCamRot(cam, 0.0, 0.0, 250.0)
  else
    SetCamRot(cam, 0.0, 0.0, 180.0)
  end
end

RegisterNetEvent("clothing:close")
AddEventHandler("clothing:close", function()
  EnableGUI(false, false)
end)

RegisterNetEvent("raid_clothes:admin:open")
AddEventHandler("raid_clothes:admin:open", function(pType)
  OpenMenu(pType)
end)

RegisterNUICallback('escape', function(data, cb)
  local shouldSave = data['save'] or false
  local newFadeStyle = data["fadeStyle"] or 255
  local paymentType = data["paymentType"] or "cash"
  if shouldSave and currentPrice > 0 then
    local purchaseSuccess = RPC.execute("clothing:purchase", currentPrice, currentPriceWithoutTax, paymentType)
    if not purchaseSuccess then
      TriggerEvent("DoLongHudText", "You don't have enough money!")
      shouldSave = false
    end
  end
  if not startingMenu then
    TriggerServerEvent("Police:getMeta")
  end
  Save(shouldSave, true, newFadeStyle)
  cb('ok')
end)

RegisterNUICallback('togglecursor', function(data, cb)
  if not startingMenu then
    CustomCamera("torso")
    SetCustomNuiFocus(false, false)
    FreezePedCameraRotation(player, false)
  end
  cb('ok')
end)

RegisterNUICallback('rotate', function(data, cb)
  if (data["key"] == "left") then
    rotation(20)
  else
    rotation(-20)
  end
  cb('ok')
end)

RegisterNUICallback('switchcam', function(data, cb)
  CustomCamera(data['name'])
  cb('ok')
end)

RegisterNUICallback('toggleclothes', function(data, cb)
  ToggleProps(data)
  cb('ok')
end)


------------------------------------------------------------------------
-- Tattooooooos


-- currentTats [[collectionHash, tatHash], [collectionHash, tatHash]]
-- loop tattooHashList [categ] find [tatHash, collectionHash]

function GetTats()
  local tempTats = {}
  if currentTats == nil then return {} end
  for i = 1, #currentTats do
    for key in pairs(tattooHashList) do
      for j = 1, #tattooHashList[key] do
        if tattooHashList[key][j][1] == currentTats[i][2] then
          tempTats[key] = j
        end
      end
    end
  end
  return tempTats
end

function SetTats(data)
  currentTats = {}
  for k, v in pairs(data) do
    for categ in pairs(tattooHashList) do
      if k == categ then
        local something = tattooHashList[categ][tonumber(v)]
        if something ~= nil then
          table.insert(currentTats, { something[2], something[1] })
        end
      end
    end
  end
  ClearPedDecorations(PlayerPedId())
  for i = 1, #currentTats do
    ApplyPedOverlay(PlayerPedId(), currentTats[i][1], currentTats[i][2])
  end
end

function mergePurchasingTattoosAndCurrTats(pMyTats, pPurchasingTats)
  local mergedTats = {}
  for k, v in pairs(pMyTats) do
    mergedTats[k] = v
  end
  for k, v in pairs(pPurchasingTats) do
    mergedTats[k] = v
  end
  return mergedTats
end

function previewTats(pTattoos)
  local fadeStyle = currentFadeStyle
  local playerPed = PlayerPedId()
  local playerModel = GetEntityModel(playerPed)

  if pTattoos and next(pTattoos) ~= nil then
    previewTattoos = {}

    for k, v in pairs(pTattoos) do
      for category in pairs(tattooHashList) do
        if k == category then
          local tattoo = tattooHashList[category][tonumber(v)]
          if tattoo ~= nil then
            previewTattoos[tattoo[1]] = { category = category, collection = tattoo[2], overlay = tattoo[1] }
          end
        end
      end
    end
    local tempMergedTats = mergePurchasingTattoosAndCurrTats(currentTats, purchasingTattoos)
    setTattoosAndFacial(currentTats, tonumber(fadeStyle), tempMergedTats)
    for k, v in pairs(previewTattoos) do
      AddPedDecorationFromHashes(playerPed, v.collection, v.overlay)
    end
  end
end

function addTattooToZone(pZone, pTattoo)
  local playerPed = PlayerPedId()
  local playerModel = GetEntityModel(playerPed)

  if isFreemodeModel(playerModel) then
    local tattoo = tattooHashList[pZone][tonumber(pTattoo)]
    if tattoo ~= nil then
      local tattooOverlay = tostring(tattoo[1])
      local tattooCollection = tattoo[2]
      if currentTats[tattooOverlay] then return end --!Don't need to re-apply an already existing tattoo
      if purchasingTattoos[tattooOverlay] then return end --!Don't need to re-apply an already existing tattoo
      purchasingTattoos[tattooOverlay] = { category = pZone, collection = tattooCollection, overlay = tattooOverlay }
      AddPedDecorationFromHashes(playerPed, tattoo[2], tattoo[1])
    end
  end
end

function removeTattooFromZone(pZone, pTattoo)
  local playerPed = PlayerPedId()
  local playerModel = GetEntityModel(playerPed)

  local tempTattoos = currentTats

  if isFreemodeModel(playerModel) then
    for k, v in pairs(currentTats) do
      if v.category == pZone then
        removingTattoos[k] = true
        tempTattoos[k] = nil
      end
    end
    setTattoosAndFacial(tempTattoos, currentFadeStyle)
  end
end

RegisterNUICallback('settats', function(data, cb)
  -- SetTats(data["tats"])
  setTattoosAndFacial(data["tats"], currentFadeStyle)
  cb('ok')
end)

RegisterNUICallback('previewtats', function(data, cb)
  previewTats(data["tats"])
  cb('ok')
end)

RegisterNUICallback('addTattoo', function(data, cb)
  -- previewTats(data["tats"])
  addTattooToZone(data["tattooZone"], data["tattooID"])
  cb('ok')
end)

RegisterNUICallback('removeTattoo', function(data, cb)
  -- previewTats(data["tats"])
  removeTattooFromZone(data["tattooZone"], data["tattooID"])
  cb('ok')
end)


--------------------------------------------------------------------
-- Main menu

function OpenMenu(name, pPriceText, pPrice)
  player = PlayerPedId()
  oldPed = GetCurrentPed()
  local isAllowed = false
  if (oldPed.model == 1885233650 or oldPed.model == -1667301416) then isAllowed = true end
  if ((oldPed.model ~= 1885233650 or oldPed.model ~= -1667301416) and (name == "clothing_shop" or name == "tattoo_shop")) then isAllowed = true end
  if isAllowed then
    local fetchMyTats = RPC.execute('tattoos:fetchMyTats')
    currentTats = fetchMyTats
    FreezePedCameraRotation(player, true)
    RefreshUI()
    EnableGUI(true, name, pPriceText, pPrice)
    TriggerEvent("inmenu", true)
    TriggerEvent('attachedItems:block', true)
  else
    TriggerEvent("DoLongHudText", "You are not welcome here!");
  end
end

function Save(save, close, newFadeStyle)
  if save then
    currentFadeStyle = tonumber(newFadeStyle)
    -- setTattoosAndFacial(currentTats, newFadeStyle)
    data = GetCurrentPed()
    if (GetCurrentPed().model == GetHashKey("mp_f_freemode_01") or GetCurrentPed().model == GetHashKey("mp_m_freemode_01")) and startingMenu then
      -- nothing
    else
      passedClothing = true
    end

    if not startingMenu or passedClothing then
      TriggerServerEvent("raid_clothes:insert_character_current", data)
      TriggerServerEvent("raid_clothes:insert_character_face", data)
      if next(purchasingTattoos) ~= nil or next(removingTattoos) ~= nil then
        TriggerServerEvent("raid_clothes:set_tats", currentTats, purchasingTattoos)
      else
        TriggerServerEvent("raid_clothes:set_tats", currentTats, {})
      end
      TriggerEvent("ev-spawn:finishedClothing", "Finished")
    elseif not passedClothing then
      passedClothing = true
      Wait(2000)
      OpenMenu("barber_shop")
      return
    end
  else
    TriggerEvent("ev-spawn:finishedClothing", "Old")
    LoadPed(oldPed)
  end

  if close then
    EnableGUI(false, false)
  end
  
  -- Wait(1000)
  Wait(100)
  TriggerServerEvent("tattoos:retrieve")
  -- TriggerServerEvent("Blemishes:retrieve")
  TriggerEvent("inmenu", false)
  TriggerEvent("ressurection:relationships:norevive")
  TriggerEvent("gangs:setDefaultRelations")
  TriggerEvent("facewear:update")
  TriggerEvent('ev-weapons:getAmmo')
  CustomCamera('torso', true)
  TriggerEvent("e-blips:updateAfterPedChange", exports["isPed"]:isPed("myjob"))
  TriggerEvent('attachedItems:block', false)
  startingMenu = false
  purchasingTattoos = {}
  removingTattoos = {}
end

local showBarberShopBlips = false
local showTattooShopBlips = false

RegisterNetEvent('raid_clothes:saveCharacterClothes')
AddEventHandler('raid_clothes:saveCharacterClothes', function()
  local data = GetCurrentPed()
  TriggerServerEvent("raid_clothes:insert_character_current", data)
end)

RegisterNetEvent('hairDresser:ToggleHair')
AddEventHandler('hairDresser:ToggleHair', function()
  showBarberShopBlips = not showBarberShopBlips
  for _, item in pairs(barberShops) do
    if not showBarberShopBlips then
      if item.blip ~= nil then
        RemoveBlip(item.blip)
      end
    else
      item.blip = AddBlipForCoord(item[1], item[2], item[2])
      SetBlipSprite(item.blip, 71)
      SetBlipColour(item.blip, 1)
      SetBlipAsShortRange(item.blip, true)
      BeginTextCommandSetBlipName("STRING")
      AddTextComponentString("Barber Shop")
      EndTextCommandSetBlipName(item.blip)
    end
  end
end)

RegisterNetEvent('tattoo:ToggleTattoo')
AddEventHandler('tattoo:ToggleTattoo', function()
  showTattooShopBlips = not showTattooShopBlips
  for _, item in pairs(tattoosShops) do
    if not showTattooShopBlips then
      if item.blip ~= nil then
        RemoveBlip(item.blip)
      end
    else
      item.blip = AddBlipForCoord(item[1], item[2], item[2])
      SetBlipSprite(item.blip, 75)
      SetBlipColour(item.blip, 1)
      SetBlipAsShortRange(item.blip, true)
      BeginTextCommandSetBlipName("STRING")
      AddTextComponentString("Tattoo Shop")
      EndTextCommandSetBlipName(item.blip)
    end
  end
end)

function addBlips()
  showBarberShopBlips = true
  TriggerEvent('hairDresser:ToggleHair')
end

AddEventHandler("ev-base:initialSpawnModelLoaded", function()
  TriggerServerEvent("clothing:checkIfNew")
end)

RegisterNetEvent("raid_clothes:inService")
AddEventHandler("raid_clothes:inService", function(service)
  isService = service
end)

RegisterNetEvent("raid_clothes:hasEnough")
AddEventHandler("raid_clothes:hasEnough", function(menu)
  if menu == "tattoo_shop" then
    TriggerServerEvent("tattoos:retrieve")
    -- while currentTats == nil do
    --   Citizen.Wait(1)
    -- end
  end

  OpenMenu(menu)
end)

local healthBuffModels = {
  [`a_c_raccoon_01`] = true,
  [`a_c_racoon_01`] = true,
  [`a_c_seagull`] = true,
  [`a_c_pigeon`] = true,
  [`a_c_rat`] = true,
  [`a_c_cormorant`] = true,
  [`a_c_hen`] = true,
  [`a_c_chickenhawk`] = true,
  [`a_c_boar`] = true,
  [`a_c_rabbit_01`] = true,
  [`a_c_pigeon`] = true,
  [`a_c_mtlion`] = true,
  [`a_c_seagull`] = true,
}

local speedBuffModels = {
  [`a_c_raccoon_01`] = true,
  [`a_c_racoon_01`] = true,
  [`a_c_hen`] = true,
  [`a_c_cat`] = true,
}

RegisterNetEvent("raid_clothes:setclothes")
AddEventHandler("raid_clothes:setclothes", function(data, alreadyExist)
  player = PlayerPedId()
  playerId = PlayerId()

  print(data.model, alreadyExist)
  if not data.model and alreadyExist <= 0 then return end
  if not data.model and alreadyExist >= 1 then return end
  model = data.model
  model = model ~= nil and tonumber(model) or false
  if not IsModelInCdimage(model) or not IsModelValid(model) then return end
  SetSkin(model, false)
  Citizen.Wait(500)
  SetClothing(data.drawables, data.props, data.drawtextures, data.proptextures)
  Citizen.Wait(500)
  TriggerEvent("facewear:update")
  TriggerServerEvent("raid_clothes:get_character_face", nil, data.fadeStyle)
  TriggerServerEvent("tattoos:retrieve")
  TriggerServerEvent("Police:getMeta")
  TriggerEvent("Animation:Set:Reset")
  TriggerEvent("e-blips:updateAfterPedChange", exports["isPed"]:isPed("myjob"))
  if healthBuffModels[model] then
    SetPedMaxHealth(PlayerPedId(), 200)
    SetEntityMaxHealth(PlayerPedId(), 200)
    SetEntityHealth(PlayerPedId(), 200)
  end
  if speedBuffModels[model] then
    Citizen.CreateThread(function()
      while GetEntityModel(player) == model do
        ResetPlayerStamina(playerId)
        Wait(2000)
      end
    end)
  end
end)

RegisterNetEvent("raid_clothes:AdminSetModel")
AddEventHandler("raid_clothes:AdminSetModel", function(model)
  local hashedModel = GetHashKey(model)
  if not IsModelInCdimage(hashedModel) or not IsModelValid(hashedModel) then return end
  SetSkin(hashedModel, true)
end)

RegisterNetEvent("raid_clothes:defaultReset")
AddEventHandler("raid_clothes:defaultReset", function()
  local LocalPlayer = exports["ev-base"]:getModule("LocalPlayer")
  local gender = LocalPlayer:getCurrentCharacter().gender
  Citizen.Wait(1000)
  if gender ~= 0 then
    SetSkin(`mp_f_freemode_01`, true)
  else
    SetSkin(`mp_m_freemode_01`, true)
  end
  OpenMenu("clothing_shop")
  startingMenu = true
  passedClothing = false
end)

RegisterNetEvent("raid_clothes:settattoos")
AddEventHandler("raid_clothes:settattoos", function(playerTattoosList)
  currentTats = playerTattoosList
  setTattoosAndFacial(currentTats, currentFadeStyle)
end)

RegisterNetEvent("raid_clothes:setpedfeatures")
AddEventHandler("raid_clothes:setpedfeatures", function(data)
  player = PlayerPedId()
  if data == false then
    SetSkin(GetEntityModel(PlayerPedId()), true)
    return
  end
  local head = data.headBlend
  local haircolor = data.hairColor
  SetPedHeadBlendData(player,
    tonumber(head['shapeFirst']),
    tonumber(head['shapeSecond']),
    tonumber(head['shapeThird']),
    tonumber(head['skinFirst']),
    tonumber(head['skinSecond']),
    tonumber(head['skinThird']),
    tonumber(head['shapeMix']),
    tonumber(head['skinMix']),
    tonumber(head['thirdMix']),
    false)
  SetHeadStructure(data.headStructure)
  SetPedHairColor(player, tonumber(haircolor[1]), tonumber(haircolor[2]))
  SetHeadOverlayData(data.headOverlay)
  currentFadeStyle = tonumber(data.fadeStyle)
  setTattoosAndFacial(currentTats, currentFadeStyle)
end)

function isFreemodeModel(pModelHash)
  return pModelHash == `mp_f_freemode_01` or pModelHash == `mp_m_freemode_01`
end

function GetFadeTotal()
  local data = getFacialDecorationsData()
  return #data
end

function getFacialDecorationsData()
  local playerPed = PlayerPedId()
  local playerModel = GetEntityModel(playerPed)
  if isFreemodeModel(playerModel) then
    return FADE_CONFIGURATIONS[playerModel == `mp_m_freemode_01` and "male" or "female"]
  else
    return {}
  end
end

function setFacialDecoration(pFadeStyle)
  local fadeStyle = tonumber(pFadeStyle) or 255
  local playerPed = PlayerPedId()
  local playerModel = GetEntityModel(playerPed)
  ClearPedFacialDecorations(playerPed)
  if fadeStyle and fadeStyle > 0 and fadeStyle ~= 255 and isFreemodeModel(playerModel) then
    local facialDecoration = FADE_CONFIGURATIONS[playerModel == `mp_m_freemode_01` and "male" or "female"][fadeStyle]
    Wait(1)
    SetPedFacialDecoration(playerPed, facialDecoration[1], facialDecoration[2])
  end
end

function setTattoosAndFacial(pTattoos, pFadeStyle, pMergedTats)
  local fadeStyle = tonumber(pFadeStyle) or 255
  local playerPed = PlayerPedId()
  local playerModel = GetEntityModel(playerPed)

  ClearPedFacialDecorations(playerPed)

  if fadeStyle and fadeStyle > 0 and fadeStyle ~= 255 and isFreemodeModel(playerModel) then
    local facialDecoration = FADE_CONFIGURATIONS[playerModel == `mp_m_freemode_01` and "male" or "female"][fadeStyle]
    SetPedFacialDecoration(playerPed, facialDecoration[1], facialDecoration[2])
  end

  if pTattoos and not pMergedTats then
    currentTats = pTattoos
  end
  local tattoosToAdd = pMergedTats or currentTats
  for k, v in pairs(tattoosToAdd) do
    AddPedDecorationFromHashes(playerPed, v.collection, tonumber(v.overlay))
  end
end


function DisplayHelpText(str)
  SetTextComponentFormat("STRING")
  AddTextComponentString(str)
  DisplayHelpTextFromStringLabel(0, 0, 1, -1)
end

RegisterNetEvent('raid_clothes:outfits')
AddEventHandler('raid_clothes:outfits', function(pAction, pId, pName)
  if pAction == 1 then
    TriggerServerEvent("raid_clothes:set_outfit", pId, pName, GetCurrentPed())
  elseif pAction == 2 then
    TriggerServerEvent("raid_clothes:remove_outfit", pId)
  elseif pAction == 3 then
    TriggerEvent("hud:saveCurrentMeta")
    TriggerEvent('item:deleteClothesDna')
    TriggerEvent('InteractSound_CL:PlayOnOne', 'Clothes1', 0.6)
    TriggerServerEvent("raid_clothes:get_outfit", pId)
  else
    TriggerServerEvent("raid_clothes:list_outfits")
  end
end)

RegisterUICallback("ev-ui:raid_clothes:addOutfitPromptVehicle", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = '' } })
  Wait(1)   --wait to fix ui bug?
  exports['ev-ui']:openApplication('textbox', {
    callbackUrl = 'ev-ui:raid_clothes:addOutfitVeh',
    inputKey = 1,
    items = {
      {
        icon = "pencil-alt",
        label = "Outfit Number [ID]",
        name = "outfitSlot",
      },
      {
        icon = "pencil-alt",
        label = "Outfit Name",
        name = "outfitName",
      },
    },
    show = true,
  })
end)

RegisterUICallback("ev-ui:raid_clothes:changeOutfit", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
  TriggerEvent('hotel:outfit', { true, data.key }, 3)
end)

RegisterUICallback("ev-ui:raid_clothes:deleteOutfit", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
  TriggerEvent('hotel:outfit', { true, data.key }, 2)
end)

-- LoadPed(data) Sets clothing based on the data structure given, the same structure that GetCurrentPed() returns
-- GetCurrentPed() Gives you the data structure of the currently worn clothes

function SetCustomNuiFocus(hasKeyboard, hasMouse)
  HasNuiFocus = hasKeyboard or hasMouse
  SetNuiFocus(hasKeyboard, hasMouse)
  --SetNuiFocusKeepInput(HasNuiFocus)

  -- TriggerEvent("ev-voice:focus:set", HasNuiFocus, hasKeyboard, hasMouse)
end

Citizen.CreateThread(function()
  addBlips()
  SetCustomNuiFocus(false, false)

  Wait(1000)

  local build = GetGameBuildNumber()

  local offsets = RPC.execute('ev-clothes:getBuildOffsets', build)

  SendNUIMessage({ type = "build", offsets = offsets })

  while true do
    Wait(0)
    if enabled then
      if (IsControlJustReleased(1, 25)) then
        SetCustomNuiFocus(true, true)
        FreezePedCameraRotation(player, true)
      end
      if (IsControlJustReleased(1, 202)) then
        SetCustomNuiFocus(true, true)
        FreezePedCameraRotation(player, true)
      end
      InvalidateIdleCam()
    end
  end
end)

local function listenForKeypress(zoneName, zoneData, isFree)
  listening = true
  Citizen.CreateThread(function()
    local priceWithTax = RPC.execute("PriceWithTaxString", zoneData.basePrice, "Services")
    local currentCash = RPC.execute("GetCurrentCash")
    while listening do
      if IsControlJustReleased(0, 244) then
        if zoneName == "tattoo_shop" then
          -- TODO: Make this not retarded, use RPC please FOR THE LOVE OF FUCKING GOD
          TriggerServerEvent("tattoos:retrieve")
          while currentTats == nil do
            Citizen.Wait(0)
          end
        end
        currentPrice = isFree and 0 or priceWithTax.total
        currentPriceWithoutTax = zoneData.basePrice
        TotalWithTax = isFree and 0 or priceWithTax.total .. " with tax" .. priceWithTax.text
        OpenMenu(zoneName, TotalWithTax, currentPrice)

        exports["ev-ui"]:hideInteraction()
      end
      Wait(0)
    end
  end)
end

RegisterNetEvent('raid_clothes:openClothing')
AddEventHandler('raid_clothes:openClothing', function(pDontShowBarber, pShouldCost, pStartingMenu)
  if pShouldCost ~= nil and pShouldCost then
    local priceWithTax = RPC.execute("PriceWithTaxString", MenuData.clothing_shop.basePrice, "Services")
    currentPrice = priceWithTax.total
    currentPriceWithoutTax = MenuData.clothing_shop.basePrice
    TotalWithTax = isFree and 0 or priceWithTax.total .. " with tax" .. priceWithTax.text
    OpenMenu("clothing_shop", TotalWithTax, currentPrice)
    startingMenu = pStartingMenu
  else
    currentPrice = 0
    currentPriceWithoutTax = 0
    OpenMenu("clothing_shop", '', 0)
    startingMenu = pStartingMenu
  end
  passedClothing = pDontShowBarber or false
end)

RegisterNetEvent('raid_clothes:openBarber', function(pShouldCost)
  if pShouldCost ~= nil and pShouldCost then
    local priceWithTax = RPC.execute("PriceWithTaxString", MenuData.barber_shop.basePrice, "Services")
    currentPrice = priceWithTax.total
    currentPriceWithoutTax = MenuData.barber_shop.basePrice
    TotalWithTax = isFree and 0 or priceWithTax.total .. " with tax" .. priceWithTax.text
    OpenMenu("barber_shop", TotalWithTax, currentPrice)
    startingMenu = pStartingMenu
  else
    OpenMenu("barber_shop", '', 0)
  end
end)

local isInClothing = false
AddEventHandler("ev-polyzone:enter", function(zone, data)
  local currentZone = MenuData[zone]
  if currentZone then
    isInClothing = true
    exports["ev-ui"]:showInteraction(("[M] %s"):format(currentZone.text))
    listenForKeypress(zone, currentZone, ((data and data.isFree) and true or false))
  end
end)

AddEventHandler("ev-polyzone:exit", function(zone)
  local currentZone = MenuData[zone]
  if currentZone then
    isInClothing = false
    listening = false
    exports["ev-ui"]:hideInteraction()
  end
end)

exports("isInClothing", function()
  return isInClothing
end)

local hairTied = false
local currentHairStyle = nil
local supportedModels = {
  [`mp_f_freemode_01`] = 4,
  [`mp_m_freemode_01`] = 2,
}
AddEventHandler("ev-inventory:itemUsed", function(item)
  if item ~= "hairtie" then return end
  local hairValue = supportedModels[GetEntityModel(PlayerPedId())]
  if hairValue == nil then return end
  TriggerEvent("animation:PlayAnimation", "hairtie")
  Wait(1000)
  if not hairTied then
    hairTied = true
    local draw = GetPedDrawableVariation(PlayerPedId(), 2)
    local text = GetPedTextureVariation(PlayerPedId(), 2)
    local pal = GetPedPaletteVariation(PlayerPedId(), 2)
    currentHairStyle = { draw, text, pal }
    SetPedComponentVariation(PlayerPedId(), 2, hairValue, text, pal)
  else
    hairTied = false
    SetPedComponentVariation(PlayerPedId(), 2, currentHairStyle[1], currentHairStyle[2], currentHairStyle[3])
  end
end)

local hasCgChainOn = false
local equippingChain = false
local chainModels = {
  ["cgchain"] = "cg_chain",
  ["gsfchain"] = "gsf_chain",
  ["cerberuschain"] = "cerberus_chain",
  ["mdmchain"] = "mdm_chain",
  ["vagoschain"] = "esv_chain",
  ["koilchain"] = "koil_chain",
}
AddEventHandler("ev-inventory:itemUsed", function(pItem, pInfo)
  local model = chainModels[pItem]
  if not model then return end
  if equippingChain then return end
  local info = json.decode(pInfo)
  equippingChain = true
  TriggerEvent("animation:PlayAnimation", "veston")
  Wait(2600)
  if not hasCgChainOn then
    hasCgChainOn = true
    -- SetPedComponentVariation(PlayerPedId(), 7, chainValue, 0, 0)
    TriggerEvent("ev-props:attachProp", model, 10706, -0.02, 0.02, -0.06, -366.0, 19.0, -163.0, true, true)
    Citizen.CreateThread(function()
      while hasCgChainOn do
        Citizen.Wait(math.random(10000, 120000))
        if info.diamond then
          local gemInfo = exports['raid_clothes']:getGemData(info.diamond)
          TriggerServerEvent("ev-fx:chain:blingDiamonds", GetEntityCoords(PlayerPedId()), "diamonds", gemInfo.count, 100)
        end
        Citizen.Wait(math.random(10000, 60000))
      end
    end)
    Citizen.CreateThread(function()
      while hasCgChainOn do
        Citizen.Wait(math.random(10000, 120000))
        if info.ruby then
          local gemInfo = exports['raid_clothes']:getGemData(info.ruby)
          TriggerServerEvent("ev-fx:chain:blingDiamonds", GetEntityCoords(PlayerPedId()), "ruby", gemInfo.count, 100)
        end
      end
    end)
    Citizen.CreateThread(function()
      while hasCgChainOn do
        Citizen.Wait(math.random(10000, 120000))
        if info.tanzanite then
          local gemInfo = exports['raid_clothes']:getGemData(info.tanzanite)
          TriggerServerEvent("ev-fx:chain:blingDiamonds", GetEntityCoords(PlayerPedId()), "tanzanite", gemInfo.count, 100, 0.25)
        end
      end
    end)
  else
    hasCgChainOn = false
    -- SetPedComponentVariation(PlayerPedId(), 7, -1, 0, 0)
    TriggerEvent("ev-props:removeProp")
  end
  equippingChain = false
end)

local hasSquidMaskOn = false
local equippingMask = false
local maskModels = {
  ["squidmask"] = { model = "np_squid_vip", x = 0.017, y = 0.015, z = -0.005 },
  ["varhelmet"] = { model = "np_vr_headset", x = 0.11, y = 0.04, z = 0.0 },
}
AddEventHandler("ev-inventory:itemUsed", function(pItem, pInfo)
  local model = maskModels[pItem]
  if not model then return end
  if equippingMask then return end
  local info = json.decode(pInfo)
  equippingMask = true
  TriggerEvent("animation:PlayAnimation", "veston")
  Wait(2600)
  if not hasSquidMaskOn then
    hasSquidMaskOn = true
    -- SetPedComponentVariation(PlayerPedId(), 7, chainValue, 0, 0)
    TriggerEvent("ev-props:attachProp", model.model, 31086, model.x, model.y, model.z, -13.0, -86.0, -165.0, true, true)
  else
    hasSquidMaskOn = false
    TriggerEvent("ev-props:removeProp")
  end
  equippingMask = false
end)

RegisterNetEvent("ev-inventory:itemCheck", function(item)
  local model = chainModels[item]
  if not model then return end
  local qty = exports["ev-inventory"]:hasEnoughOfItem(item, 1)
  if qty then return end
  hasCgChainOn = false
  TriggerEvent("ev-props:removeProp")
end)
local function hasChainAccess()
  local characterId = exports["isPed"]:isPed("cid")
  local jobAccess = RPC.execute("IsEmployedAtBusiness", { character = { id = characterId }, business = { id = "wuchang" } })
  if not jobAccess then
    TriggerEvent("DoLongHudText", "They do not recognize you", 2)
    return false
  end
  local craftAccess = RPC.execute("ev-business:hasPermission", "wuchang", "craft_access", characterId)
  if not craftAccess then
    TriggerEvent("DoLongHudText", "They do not recognize you", 2)
    return false
  end
  return true
end
AddEventHandler("ev-clothing:openCGChainCrafting", function()
  if not hasChainAccess() then return end
  TriggerEvent("server-inventory-open", "42087", "Craft")
end)
AddEventHandler("ev-clothing:infuseChainWithGems", function()
  if not hasChainAccess() then return end
  local cid = exports["isPed"]:isPed("cid")
  RPC.execute("ev-clothing:infuseCGChain", cid)
end)

-- Citizen.CreateThread(function()
--   TriggerEvent("ev-props:attachProp", "np_squid_vip", 31086, 0.03, 0.03, 0.0, -13.0, -86.0, -165.0, true, true)
-- end)

--veh outtfits

function GetNearestVehicleOutfit()
  local playerPed = PlayerPedId()
  local coords    = GetEntityCoords(playerPed)
  local vehicle   = GetClosestVehicle(coords.x, coords.y, coords.z, 5.0, 0, 71)
  local plate     = GetVehicleNumberPlateText(vehicle)
  if vehicle ~= 0 and vehicle then
    local ped = PlayerPedId()
    local pos = GetEntityCoords(ped)
    local vehpos = GetEntityCoords(vehicle)
    if #(pos - vehpos) < 5.0 and not IsPedInAnyVehicle(ped) then
      return plate
    end
  end
end

RegisterNetEvent('raid_clothes:outfitsVeh', function()
  local plate = GetNearestVehicleOutfit()
  TriggerServerEvent("raid_clothes:list_outfitsVeh", plate)
end)

RegisterUICallback("ev-ui:raid_clothes:changeOutfitVeh", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
  print("hello?")
  local plate = GetNearestVehicleOutfit()
  print(plate)
  TriggerServerEvent("raid_clothes:get_outfitVeh", data.key, plate)

  Citizen.Wait(100)
  TriggerEvent("raid_clothes:outfitsVeh")
end)

RegisterUICallback("ev-ui:raid_clothes:deleteOutfitVeh", function(data, cb)
  cb({ data = {}, meta = { ok = true, message = 'done' } })
  local plate = GetNearestVehicleOutfit()
  TriggerServerEvent('raid_clothes:remove_outfitVeh', data.key, plate)
  Citizen.Wait(100)
  TriggerEvent("raid_clothes:outfitsVeh")
end)