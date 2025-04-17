local StationsList = {
  "RADIO_01_CLASS_ROCK", 
  "RADIO_02_POP", 
  "RADIO_03_HIPHOP_NEW",
  "RADIO_04_PUNK", 
  "RADIO_05_TALK_01", 
  "RADIO_06_COUNTRY",
  "RADIO_07_DANCE_01", 
  "RADIO_08_MEXICAN", 
  "RADIO_09_HIPHOP_OLD",
  "RADIO_12_REGGAE", 
  "RADIO_13_JAZZ", 
  "RADIO_14_DANCE_02", 
  "RADIO_15_MOTOWN",
  "RADIO_16_SILVERLAKE",
  "RADIO_17_FUNK", 
  "RADIO_18_90S_ROCK",
  "RADIO_20_THELAB", 
  "RADIO_21_DLC_XM17", 
  "RADIO_22_DLC_BATTLE_MIX1_RADIO",
  "RADIO_23_DLC_XM19_RADIO", 
  "RADIO_34_DLC_HEI4_KULT",
  "RADIO_35_DLC_HEI4_MLR", 
  "RADIO_36_AUDIOPLAYER"
}

local WantedStations = {
  "RADIO_NIKEZ_RAP",
  "RADIO_NIKEZ_ELECTRONIC",
  "RADIO_NIKEZ_POP",
  "RADIO_NIKEZ_MIX",
  "RADIO_NIKEZ_ALTERNATIVE",
  "RADIO_NIKEZ_ROCK",
}

Citizen.CreateThread(function()
    for i = 1, #StationsList do 
      SetRadioStationIsVisible(StationsList[i], 0)
      LockRadioStation(StationsList[i], 0)
     end
     for x = 1, #WantedStations do
      
      -- SetRadioStationIsVisible(WantedStations[x], 1)
      SetRadioStationMusicOnly(WantedStations[x], true)
    end
  end)
  
RegisterCommand("radio", function(source, pArgs)
  -- if pArgs[1] == 1 then
    -- local Genre = GetPlayerRadioStationGenre()
    -- local Index = GetPlayerRadioStationIndex()
    -- local name = GetPlayerRadioStationName()
    -- local Fade = IsRadioFadedOut()
    -- local VehicleRadio = IsPlayerVehRadioEnable()
    -- local Num = GetNumUnlockedRadioStations()
    -- local isRadio = DoesPlayerVehHaveRadio()
    -- print("VehicleRadio" , VehicleRadio , " Num " , Num, " isRadio in Vehicle ", isRadio)
    -- print("Genre is:" ,Genre ," Index is:",Index," Radio Station Name is:",name)
    -- print("Radio Fade : " , Fade)
    -- SetFrontendRadioActive()
    -- local radioEnabled = IsVehicleRadioEnabled(GetVehiclePedIsIn(PlayerPedId(), false))
  -- else
    local radioIndex = FindRadioStationIndex()
    local RadioName = GetRadioStationName()
    -- local radioIndex = GetPlayerRadioStationIndex()
    -- local RadioName = GetPlayerRadioStationName()
    local RadioGenre = GetPlayerRadioStationGenre()

    print("ev-radioStations | Radio Index |", radioIndex)
    -- print("ev-radioStations | Current Radio Station Name |", RadioName)
    print("ev-radioStations | Radio Station Genre |", RadioGenre)
    -- SetRadioToStationIndex(250)
    -- end
end)

local thisObject = nil
local power = false

AddEventHandler("ev-radio:ChangeStation", function()
  local MenuData = {
    {
      title = "Change Station",
      disabled = false,
      children = {
        {
          title = "Radio Rhodinium Rap", 
          action = "ev-radio:SwitchRadio", 
          key = "RADIO_NIKEZ_RAP", 
          disabled = false
        },
        {
          title = "Radio Rhodinium Electronic", 
          action = "ev-radio:SwitchRadio", 
          key = "RADIO_NIKEZ_ELECTRONIC", 
          disabled = false
        },
        {
          title = "Radio Rhodinium Pop", 
          action = "ev-radio:SwitchRadio", 
          key = "RADIO_NIKEZ_POP", 
          disabled = false
        },
        {
          title = "Radio Rhodinium Mix", 
          description = " ", 
          action = "ev-radio:SwitchRadio", 
          key = "RADIO_NIKEZ_MIX", 
          disabled = false
        },
        {
          title = "Radio Rhodinium Alternative", 
          action = "ev-radio:SwitchRadio", 
          key = "RADIO_NIKEZ_ALTERNATIVE", 
          disabled = false
        },
        {
          title = "Radio Rhodinium Rock", 
          action = "ev-radio:SwitchRadio", 
          key = "RADIO_NIKEZ_ROCK", 
          disabled = false
        },
      },
    },
    {
      title = "Power Off",
      action = "ev-radio:PowerOff",
      key = not power,
      disabled = power,
    },
  }
  exports["ev-ui"]:showContextMenu(MenuData)
end)

-- -1622336178
-- 11067572/
RegisterUICallback("ev-radio:SwitchRadio", function(data, cb)
  local station = data.key
  local em = {
    'se_nopixel_nmansion_beach_01',
    'se_nopixel_nmansion_beach_02',
  }

  for i = 1, #em do 
    SetEmitterRadioStation(em[i], station)
  end
  cb({ data = {}, meta = { ok = true, message = "done" } })

end)

RegisterUICallback("ev-radio:PowerOff", function(data, cb)
  power = data.key
  local em = {
    'se_nopixel_nmansion_beach_01',
    'se_nopixel_nmansion_beach_02',
  }
  
  for i = 1, #em do 
    SetStaticEmitterEnabled(em[i], power)
  end

  cb({ data = {}, meta = { ok = true, message = "done" } })
end)
