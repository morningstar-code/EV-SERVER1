
RPC.register("ev-casino:poker:playerAction", function(src, pTableId, pAction, pAmount)
    print(src, pTableId, pAction, pAmount)

end)

RPC.register("ev-poker:leaveChair", function(src, pCoords, pTableId)
    print(pCoords, pTableId)

end)


RPC.register("ev-casino:getDealerPedSeeds", function()
    return seeds
end)