let currentSubscription = null;

on("ev-music:showBroadcastContextMenu", (channel) => {

  const items = exports["ev-inventory"].getItemsOfType("musictape", 20, true)
    .reduce((acc, musictape) => {
      const { title, artist, url } = JSON.parse(musictape.information);
      acc.push({
        title,
        description: artist,
        action: "ev-ui:music:setBroadcast",
        key: { channel, url }
      })
      return acc;
    }, [{
      title: "Stop broadcasting",
      description: "",
      action: "ev-ui:music:setBroadcast",
      key: { channel, url: null }
    }]);

  if (items.length === 0) {    
    TriggerEvent("DoLongHudText", "You have no music tapes.", 2)
    return;
  }

  exports["ev-ui"].showContextMenu(items);
});

RegisterUICallback("ev-ui:music:setBroadcast", (data, cb) => {
  cb({ data: {}, meta: { ok: true, message: '' } });
  const { channel, url } = data.key;
  RPC.execute("ev-music:setBroadcast", channel, url);
});

onNet("ev-music:updateBroadcast", (channel, channelData) => {
  if (channel === currentSubscription) {
    if (!channelData) {
      exports["ev-ui"].closeApplication("musicplayer", {});
      return;
    }
    openBroadcast(channelData);
  }
});

const openBroadcast = (channelData) => {
  exports["ev-ui"].closeApplication("musicplayer", {});
  exports["ev-ui"].openApplication("musicplayer", channelData, false);
}

on("ev-music:subscribe", async (channel) => {
  currentSubscription = channel;
  const channelData = await RPC.execute("ev-music:getChannel", channel);
  if (channelData) {
    openBroadcast(channelData);
  }
});

on("ev-music:unsubscribe", () => {
  exports["ev-ui"].closeApplication("musicplayer", {});
  currentSubscription = null;
});
