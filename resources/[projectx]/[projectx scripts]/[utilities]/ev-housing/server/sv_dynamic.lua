
RPC.register("housing:addProperty", function(src, pStreet, pPrice, pStreetType, pPos)

end)

-- RPC.register("housing:getNewestPropertyList", function(src)
--     return
-- end)

-- RPC.register("housing:getCurrentHousingList", function(src)
--     return
-- end)


RegisterCommand('checkHousing', function(source, args, RawCommand)
    local housing = exports["ev-housing"]:getCurrentOwned(source)
    print(Housing.info[1][1])
end)