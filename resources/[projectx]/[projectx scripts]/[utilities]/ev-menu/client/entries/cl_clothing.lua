local GeneralEntries, SubMenu = MenuEntries["general"], {}

local Clothing = {
    {
        id = "clothing:hat",
        title = "Chapeu",
        icon = "#clothing-hat",
        event = "ev-facewear:radial",
        parameters = "hat",
    },
    {
        id = "clothing:googles",
        title = "Oculos",
        icon = "#clothing-googles",
        event = "ev-facewear:radial",
        parameters = "googles",
    },
    {
        id = "clothing:mask",
        title = "Mascara",
        icon = "#clothing-mask",
        event = "ev-facewear:radial",
        parameters = "mask",
    },
    {
        id = "clothing:chain",
        title = "Colar",
        icon = "#clothing-chain",
        event = "ev-facewear:radial",
        parameters = "chain",
    },
    {
        id = "clothing:jacket",
        title = "Jaqueta",
        icon = "#clothing-jacket",
        event = "ev-facewear:radial",
        parameters = "jacket",
    },
    {
        id = "clothing:vest",
        title = "Colete",
        icon = "#clothing-vest",
        event = "ev-facewear:radial",
        parameters = "vest",
    },
    {
        id = "clothing:backpack",
        title = "Mochila",
        icon = "#clothing-backpack",
        event = "ev-facewear:radial",
        parameters = "backpack",
    },
    {
        id = "clothing:pants",
        title = "Calça",
        icon = "#clothing-pants",
        event = "ev-facewear:radial",
        parameters = "pants",
    },
    {
        id = "clothing:shoes",
        title = "Tênis",
        icon = "#clothing-shoes",
        event = "ev-facewear:radial",
        parameters = "shoes",
    },
}

Citizen.CreateThread(function()
    for index, data in ipairs(Clothing) do
        SubMenu[index] = data.id
        MenuItems[data.id] = {data = data}
    end

    GeneralEntries[#GeneralEntries+1] = {
        data = {
            id = "clothing",
            icon = "#clothing",
            title = "Clothes",
            event = "ev-facewear:clothesMenu",
        },
        -- subMenus = SubMenu,
        isEnabled = function()
            return not isDead
        end,
    }
end)