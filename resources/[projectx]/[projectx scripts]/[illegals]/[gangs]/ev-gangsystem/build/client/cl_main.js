;(() => {
  'use strict'
    var globalObject = {
      g: (function() {
          if (typeof globalThis === 'object') {
              return globalThis;
          }
          try {
              return this || new Function('return this')();
          } catch (error) {
              if (typeof window === 'object') {
                  return window;
              }
          }
      })(),
  };
  var someObject = {};
  const CPX = globalThis.CPX,
      Hud = CPX.Hud,
      Utils = CPX.Utils,
      Zones = CPX.Zones,
      Events = CPX.Events,
      Streaming = CPX.Streaming,
      Procedures = CPX.Procedures,
      Interface = CPX.Interface,
      someValue = null && CPX;

  let mainConfig = exports['ev-config'].GetModuleConfig('main'),
  someVar = null;
  const configMap = new Map(),
  currentResourceName = GetCurrentResourceName();
  async function initConfig() {
    while (someVar === null) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        someVar = getConfigValue();
    }
  }
  on('ev-config:configLoaded', (configName, configData) => {
    if (configName === 'main') {
        mainConfig = configData;
    } else {
        configMap.has(configName) && configMap.set(configName, configData);
    }
  });
  function getMainConfigValue(key) {
    return mainConfig[key];
  }
  function getConfigValue(moduleName, key) {
    if (!configMap.has(moduleName)) {
        const config = exports['ev-config'].GetModuleConfig(moduleName);
        if (config === undefined) {
            return;
        }
        configMap.set(moduleName, config);
    }
    const moduleConfig = configMap.get(moduleName);
    return key ? moduleConfig?.[key] : moduleConfig;
  }
  function getConfigValueForResource(key) {
      return getConfigValue(currentResourceName, key);
  }
  const pedModelsCacheOptions = { timeToLive: 3600000 };
  const pedModelsCache = Utils.cache(async () => {
      const pedModels = await Procedures.execute('ev-gangsystem:getGangsPedModels');
      console.log(pedModels);
      return [true, pedModels];
  }, pedModelsCacheOptions);
  
  const currentGangCacheOptions = { timeToLive: 600000 };
  const currentGangCache = Utils.cache(async () => {
      const currentGang = await Procedures.execute('ev-gangsystem:getCurrentGang');
      return [true, currentGang];
  }, currentGangCacheOptions);
  
  const gangInfoCacheOptions = { timeToLive: 300000 };
  const gangInfoCache = Utils.cache(async () => {
      const gangInfo = await Procedures.execute('ev-gangsystem:getGanginfo');
      return [true, gangInfo];
  }, gangInfoCacheOptions);
  
  const gangFlagLocationCacheOptions = { timeToLive: 300000 };
  const gangFlagLocationCache = Utils.cache(async () => {
      const currentGang = await currentGangCache.get();
      if (!currentGang) {
          return [false, null];
      }
      const gangFlagLocation = await Procedures.execute('ev-gangsystem:getGangFlagLocation', currentGang);
      return [true, gangFlagLocation];
  }, gangFlagLocationCacheOptions);
  
  const resetCaches = () => {
      currentGangCache.reset();
      gangFlagLocationCache.reset();
      gangInfoCache.reset();
  };
  
  const getCurrentGang = async () => await currentGangCache.get(),
  getGangFlagLocation = async () => await gangFlagLocationCache.get(),
  getGangInfo = async () => await gangInfoCache.get(),
  getPedModels = async () => await pedModelsCache.get()
  
  const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
  const calculateDistance = (point1, point2) => {
      const [deltaX, deltaY, deltaZ] = [
          point1.x - point2.x,
          point1.y - point2.y,
          point1.z - point2.z,
      ];
      return Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
  };
  const sortAndMapDistances = (array, referencePoint) => {
    return array
        .sort((a, b) =>
            calculateDistance(referencePoint, {
                x: a.x,
                y: a.y,
                z: a.z,
            }) -
            calculateDistance(referencePoint, {
                x: b.x,
                y: b.y,
                z: b.z,
            })
        )
        .map((elem) =>
            calculateDistance(referencePoint, {
                x: elem.x,
                y: elem.y,
                z: elem.z,
            })
        );
  };
  function randomIntInRange(min, max) {
      return Math.floor(
          max
              ? Math.random() * (max - min) + min
              : Math.random() * min
      );
  }
  const getRandomElements = (array, numElements) => {
    return array.slice(0, numElements).map(function() {
        return this.splice(Math.floor(Math.random() * this.length), 1)[0];
    }, array.slice());
  };
  const getInventoryData = (graffitiCount) => {
      let inventorySlots = 0,
          inventoryWeight = 0;
      const configData = GetResourceConfig('progressions');

      for (const configItem of configData) {
          if (graffitiCount >= configItem.requiredGraffitis) {
              inventorySlots = configItem.inventorySlots;
              inventoryWeight = configItem.inventoryWeight;
          }
      }
      return [inventorySlots, inventoryWeight];
  };
  const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const randomIndex = Math.floor(Math.random() * (i + 1));
          [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
      }
      return array;
  };

  function performTaskWithDelay(delay, task, showError = false) {
    return new Promise((resolve) => {
        task
            ? exports['ev-taskbar'].taskBar(delay, task, showError, true, null, false, resolve)
            : setTimeout(() => resolve(100), delay);
    });
  }

  function performPhoneConfirmation(player, phoneNumber, confirmationCode) {
      return new Promise((resolve) => {
          exports['ev-phone'].DoPhoneConfirmation(player, phoneNumber, confirmationCode, resolve);
      });
  }

  let doorLocations = [];
  setImmediate(() => {
      doorLocations = globalObject.g.exports['ev-doors'].GetDoorLocations();
  });
  on('ev-inventory:itemUsed', (item, itemData) => {
      if (item !== 'gangflag') {
          return;
      }
      if (restrictedArea()) {
          return emit('DoLongHudText', 'You cannot place a flag here', 2);
      }
      const parsedItemData = JSON.parse(itemData);
      placeGangFlag(
          parsedItemData.gangId,
          parsedItemData === null || parsedItemData === undefined ? undefined : parsedItemData.upgraded
      );
  });
  const placeGangFlag = async (gangId, upgradedFlag = false) => {
    if (!gangId) {
        return emit('DoLongHudText', 'Unknown flag', 2);
    }

    const flagPlacementOptions = {
        collision: false,
        groundSnap: false,
        adjustZ: false,
        distance: 3,
        alignToSurface: true,
        surfaceOffset: 0.1,
    };

    const placedFlag = await globalObject.g.exports['ev-objects'].PlaceAndSaveObject(
        upgradedFlag ? GetHashKey('np_gangflag_' + gangId) : GetHashKey('np_gangflag'),
        { gangId: gangId },
        flagPlacementOptions,
        isPlacementValid,
        'gang-flags'
    );
    if (!placedFlag) {
        return emit('DoLongHudText', 'Failed to place down flag', 2);
    }
    const [flagSaved, flagMessage] = await Procedures.execute('ev-gangs:addFlag', placedFlag, gangId, upgradedFlag);
    emit('DoLongHudText', flagMessage, flagSaved ? 1 : 2);
    if (!flagSaved) {
      globalThis.exports['ev-objects'].DeleteObject(placedFlag);
    }
    emit('inventory:removeItem', 'gangflag', 1);
  };

  const isNearDoor = (position) =>
    doorLocations.some((doorLocation) =>
      doorLocation.reduce(
          (distanceSquared, coordinate, index) => (distanceSquared += (coordinate - position[index]) ** 2),
          0
      ) <= 16
  );
  const isPlacementValid = (position, rotation, flagModel, entity) => {
    if (GetEntityType(entity) !== 0) {
        return false;
    }

    if (globalObject.g.exports['ev-doors'].GetCurrentDoor() !== undefined) {
        return false;
    }

    const entityModel = GetEntityModel(flagModel);
    const [[minX, , minZ], [maxX, maxY, maxZ]] = GetModelDimensions(entityModel);
    const entityForwardVector = GetEntityForwardVector(flagModel).map((value) => value * 0.2);

    return (
        [
            GetOffsetFromEntityInWorldCoords(entity, minX * 0.8, maxY, minZ * 0.8),
            GetOffsetFromEntityInWorldCoords(entity, maxX * 0.8, maxY, minZ * 0.8),
            GetOffsetFromEntityInWorldCoords(entity, minX * 0.8, maxY, maxZ * 0.8),
            GetOffsetFromEntityInWorldCoords(entity, maxX * 0.8, maxY, maxZ * 0.8),
        ].every((coords) => {
            const shapeTest = StartShapeTestCapsule(
                ...coords,
                coords[0] + entityForwardVector[0],
                coords[1] + entityForwardVector[1],
                coords[2] + entityForwardVector[2],
                0.02,
                -1,
                flagModel,
                7
            );

            const [, hit, , , hitEntity] = GetShapeTestResult(shapeTest);
            const hitEntityType = GetEntityType(hitEntity);

            return hit && hitEntityType === 0;
        }) && !isNearDoor([position.x, position.y, position.z])
    );
  };
  const destroyGangFlag = async (targetEntity, metaData) => {
    let gangId, flagId;
    const flagMetaData = metaData.meta;
    if (flagMetaData) {
        const flagData = flagMetaData.data;
        if (flagData) {
            const flagMetadata = flagData.metadata;
            if (flagMetadata) {
                gangId = flagMetadata.gangId;
            }
        }
      }
      if (!gangId) {
          return false;
      }
      flagId = flagMetaData ? flagMetaData.id : undefined;
      if (!flagId) {
          return false;
      }
      TaskTurnPedToFaceEntity(PlayerPedId(), targetEntity, -1);
      emit('animation:PlayAnimation', 'hammering');
      const progress = await performTaskWithDelay(5000, 'Destroying gang flag', true);
      ClearPedTasks(PlayerPedId());
      if (progress !== 100) {
          return false;
      }
    const flagDeleted = await globalObject.g.exports['ev-objects'].DeleteObject(flagId);
    if (flagDeleted) {
      Events.emitNet('ev-gangsystem:flagDestroyed', gangId);
    }
  };
    Events.onNet('ev-gangsystem:doPedHandOff', async (targetModel) => {
      const peds = GetGamePool('CPed').filter((ped) => !IsPedAPlayer(ped));
      const targetPeds = peds.filter(
          (ped) =>
            GetEntityModel(ped) === GetHashKey(targetModel) && !IsPedInAnyVehicle(ped, false) && !IsEntityDead(ped)
      );
  
      if (targetPeds.length <= 0) {
        return;
      }
      await Streaming.loadAnim('mp_safehouselost@');
      const targetPed = targetPeds[Math.floor(Math.random() * targetPeds.length)];
      const targetPedCoords = GetEntityCoords(targetPed, true);
      const targetPedPosition = {
          x: targetPedCoords[0],
          y: targetPedCoords[1],
          z: targetPedCoords[2],
      };
      const otherPeds = peds.filter((otherPed) => {
          const otherPedCoords = GetEntityCoords(otherPed, true);
          const otherPedPosition = {
              x: otherPedCoords[0],
              y: otherPedCoords[1],
              z: otherPedCoords[2],
          };
  
          return (
              GetEntityModel(otherPed) !== GetHashKey(targetModel) &&
              _0x1dbfa3(otherPedPosition, targetPedPosition) < 50 &&
              !IsPedInAnyVehicle(otherPed, false)
          );
      });
  
      const randomOtherPed = otherPeds[Math.floor(Math.random() * otherPeds.length)];
  
      if (!randomOtherPed) {
          return;
      }
  
      NetworkRequestControlOfEntity(randomOtherPed);
      NetworkRequestControlOfEntity(targetPed);
      SetNetworkIdCanMigrate(NetworkGetNetworkIdFromEntity(randomOtherPed), false);
      SetNetworkIdCanMigrate(NetworkGetNetworkIdFromEntity(targetPed), false);
      TaskStartScenarioInPlace(targetPed, 'WORLD_HUMAN_DRUG_DEALER_HARD', 0, true);
  
      let handOffComplete = false;
      const handOffDeadline = Date.now() + 120000;
  
      while (!handOffComplete) {
          if (
              Date.now() > handOffDeadline ||
              IsEntityDead(targetPed) ||
              IsEntityDead(randomOtherPed)
          ) {
              handOffComplete = true;
              return;
          }
  
          const randomOtherPedCoords = GetEntityCoords(randomOtherPed, true);
          const randomOtherPedPosition = {
              x: randomOtherPedCoords[0],
              y: randomOtherPedCoords[1],
              z: randomOtherPedCoords[2],
          };
  
          const distance = _0x1dbfa3(targetPedPosition, randomOtherPedPosition);
          if (distance <= 2) {
              ClearPedTasksImmediately(targetPed);
              await delay(500);
              TaskTurnPedToFaceEntity(randomOtherPed, targetPed, -1);
              TaskTurnPedToFaceEntity(targetPed, randomOtherPed, -1);
              await delay(1000);
              TaskPlayAnim(randomOtherPed, 'mp_safehouselost@', 'package_dropoff', 8, -8, -1, 0, 0, false, false, false);
              TaskPlayAnim(targetPed, 'mp_safehouselost@', 'package_dropoff', 8, -8, -1, 0, 0, false, false, false);
              handOffComplete = true;
              return;
          }
  
          if (GetScriptTaskStatus(randomOtherPed, 1227113341) === 7 && !handOffComplete) {
              TaskGoToEntity(randomOtherPed, targetPed, -1, 2, 1, 0, 0);
          }
          await delay(500);
      }
  });
  const polyzoneSet = new Set();
  function isBlockedZone(polyzone) {
    return polyzoneSet.has(polyzone);
  }
  on('ev-polyzone:enter', (enteredPolyzone) => {
    polyzoneSet.add(enteredPolyzone);
  });
  on('ev-polyzone:exit', (exitedPolyzone) => {
    polyzoneSet.delete(exitedPolyzone);
  });
  let someVariable = null,
      arrayOne = [],
      arrayTwo = [];
    const sprayGangGraffiti = async (gangId, graffitiId) => {
      if (!gangId || !graffitiId) {
        return [false, 'Where did I find this spray can...'];
      }
    
      if (isAreaRestricted()) {
        return [false, 'You cannot place graffiti here'];
      }
    
      const playerGangId = await getPlayerGangId();
      if (!playerGangId) {
        return [false, 'You are not in a gang!'];
      }
    
      if (playerGangId !== gangId) {
        return [false, 'You are not in this gang!'];
      }
    
      const playerCoords = GetEntityCoords(PlayerPedId(), false);
      const currentPlayerPosition = {
        x: playerCoords[0],
        y: playerCoords[1],
        z: playerCoords[2],
      };
    
      const graffitiObjects = exports['ev-objects'].GetObjectsByNamespace('graffiti');
      const gangFlagObjects = exports['ev-objects']
        .GetObjectsByNamespace('gang-flags')
        .sort((flag1, flag2) =>
          distanceBetween(currentPlayerPosition, flag1) - distanceBetween(currentPlayerPosition, flag2)
        )
        .filter(flag => distanceBetween(currentPlayerPosition, flag) < config.minDistanceFromFlag);
    
      const friendlyGraffiti = graffitiObjects.filter(
        graffiti => graffiti.data.metadata.gangId && graffiti.data.metadata.gangId === gangId
      );
    
      const enemyGraffiti = graffitiObjects.filter(
        graffiti => graffiti.data.metadata.gangId && graffiti.data.metadata.gangId !== gangId
      );
    
      const nearestEnemyFlag = gangFlagObjects.find(
        flag => flag.data.metadata.gangId !== playerGangId
      );
    
      const tooCloseToEnemy = distancesBetween(enemyGraffiti, currentPlayerPosition).filter(
        distance => distance < config.minDistanceFromEnemy
      ).length > 0;
    
      if (tooCloseToEnemy || nearestEnemyFlag) {
        return [false, 'You are too close to an enemy territory!'];
      }
    
      const tooCloseToFriendly = distancesBetween(friendlyGraffiti, currentPlayerPosition).filter(
        distance => distance < config.minDistanceFromFriendly
      ).length > 0;
    
      if (tooCloseToFriendly) {
        return [false, 'Need to spread out more!'];
      }
    
      const tooFarFromFriendly = distancesBetween(friendlyGraffiti, currentPlayerPosition).filter(
        distance => distance < config.maxDistanceFromFriendly
      ).length === 0;
    
      const nearestFriendlyFlag = gangFlagObjects.find(
        flag => flag.data.metadata.gangId === playerGangId
      );
    
      if (tooFarFromFriendly && !nearestFriendlyFlag) {
        return [false, 'You are too far from a friendly territory!'];
      }
    
      if (nearestFriendlyFlag || !tooFarFromFriendly) {
        return [true, ''];
      }
    
      return [true, ''];
    };
    const findNearestGangId = (position) => {
      const graffitiObjects = globalObject.g.exports['ev-objects'].GetObjectsByNamespace('graffiti')
        .filter(
          (object) =>
            object.data.metadata.gangId &&
            calculateDistance(position, {
              x: object.x,
              y: object.y,
              z: object.z,
            }) < 100
        )
        .sort(
          (object1, object2) =>
            calculateDistance(position, {
              x: object1.x,
              y: object1.y,
              z: object1.z,
            }) -
            calculateDistance(position, {
              x: object2.x,
              y: object2.y,
              z: object2.z,
            })
        )
      return graffitiObjects.length > 0 ? graffitiObjects[0].data.metadata.gangId : null
    };
    const RemovingGangSpray = async (targetGangId) => {
      const currentGangId = await getCurrentGang();
    
      if (currentGangId === targetGangId) {
        return;
      }
      const playerCoords = GetEntityCoords(PlayerPedId(), true);
      const playerLocation = {
        x: playerCoords[0],
        y: playerCoords[1],
        z: playerCoords[2],
      };
    
      const zoneName = GetLabelText(GetNameOfZone(playerLocation.x, playerLocation.y, playerLocation.z));
      const [streetNameHash, _] = GetStreetNameAtCoord(
        playerLocation.x,
        playerLocation.y,
        playerLocation.z
      );
      const fullLocation = GetStreetNameFromHashKey(streetNameHash) + ', ' + zoneName;
      Events.emitNet('ev-gangsystem:graffitiBeingRemoved', targetGangId, fullLocation);
    };
    const interactWithGangMember = async (gangMember) => {
      const currentGang = await getCurrentGang();
    
      if (!currentGang) {
        return;
      }
    
      const playerPedId = PlayerPedId();
      const inventoryResult = await Procedures.execute('ev-gangsystem:openTrapInventory', currentGang);
    
      if (!inventoryResult) {
        return;
      }
    
      selectedEntity = gangMember;
      SetEntityAsMissionEntity(gangMember, true, true);
      SetNetworkIdCanMigrate(gangMember, false);
      ClearPedTasks(gangMember);
      TaskLookAtEntity(gangMember, playerPedId, -1, 2048, 3);
      TaskTurnPedToFaceEntity(gangMember, playerPedId, 10000);
    };
    const playPackageDropoffAnimation = async () => {
      await animationLoader.loadAnim('mp_safehouselost@');
      TaskTurnPedToFaceEntity(pedEntity, PlayerPedId(), 0);
      TaskTurnPedToFaceEntity(PlayerPedId(), pedEntity, 0);
      TaskPlayAnim(pedEntity, 'mp_safehouselost@', 'package_dropoff', 8, -8, -1, 0, 0, false, false, false);
      TaskPlayAnim(PlayerPedId(), 'mp_safehouselost@', 'package_dropoff', 8, -8, -1, 0, 0, false, false, false);
      await delay(2000);
      SetEntityAsNoLongerNeeded(pedEntity);
      pedEntity = null;
    };
    const showPurchaseSprayMenu = async () => {
      const currentGang = await getCurrentGang();
      if (!currentGang) {
        return emit('DoLongHudText', 'Looks at you confused...');
      }
      const sprayCost = await Procedures.execute('ev-gangsystem:getCostOfSpray', currentGang);
      const purchaseSprayMenuItem = {
        icon: 'money-bill',
        title: 'Purchase Spray ($' + sprayCost + ')',
        description: '',
        action: 'ev-gangsystem:confirmPurchaseSpray',
        key: {
          gangId: currentGang,
          cost: sprayCost,
        },
      };
      const contextMenuItems = [purchaseSprayMenuItem];
      globalObject.g.exports['ev-ui'].showContextMenu(contextMenuItems);
    };
    const showPurchaseClothMenu = async () => {
      const currentGang = await getCurrentGang();
      if (!currentGang) {
        return emit('DoLongHudText', 'Looks at you confused...');
      }

      const baseClothCost = await Procedures.execute('ev-gangsystem:getCostOfSpray', currentGang);
      const clothCost = baseClothCost + 100000;
          const purchaseClothMenuItem = {
        icon: 'money-bill',
        title: 'Purchase Cloth ($' + clothCost + ')',
        description: '',
        action: 'ev-gangsystem:confirmPurchaseCloth',
        key: {
          gangId: currentGang,
          cost: clothCost,
        },
      };
      const contextMenuItems = [purchaseClothMenuItem];
      globalObject.g.exports['ev-ui'].showContextMenu(contextMenuItems);
    };
    const InRestrictedArea = () => {
      const _0x4621e0 = isBlockedZone('ev-gangsystem:blockedZone')
      return _0x4621e0
    },
    markObjectAsUpForGrabs = async (event) => {
      const { id: objectId, data: eventData } = event.meta;
      const gangId = eventData?.metadata?.gangId;
      if (!objectId) {
        return;
      }
      const currentGang = await getCurrentGang();
      if (currentGang !== gangId) {
        return;
      }
      const updateData = { upForGrabs: true };
      exports['ev-objects'].UpdateObject(objectId, updateData);
    };
    const discoverGraffiti = async (data) => {
      const graffitiId = data.meta.id,
        graffitiGangId = data.meta?.data?.metadata?.gangId,
        graffitiGangsDiscovered = data.meta?.data?.metadata?.gangsDiscovered || [],
        currentGang = await getCurrentGang();
    
      if (graffitiGangId === currentGang || (graffitiGangsDiscovered && graffitiGangsDiscovered.includes(currentGang))) {
        const hudData = {};
        return emit('DoLongHudText', 'You already know of this graffiti!', 1, 12000, hudData);
      }
    
      emit('animation:PlayAnimation', 'search');
      const taskBarCompletion = await taskBarHandler.taskBar(30000, 'Discovering Graffiti', true, {
        distance: 2,
        entity: PlayerPedId(),
      });
    
      ClearPedTasks(PlayerPedId());
      if (taskBarCompletion !== 100) { return }
      const updatedGraffitiData = {
        gangsDiscovered: [...graffitiGangsDiscovered, currentGang],
      };
      exports['ev-objects'].UpdateObject(graffitiId, updatedGraffitiData);
        return emit('DoLongHudText', 'Discovered graffiti!', 1, 12000);
    };
    const toggleGraffitiBlips = async (removeBlips = false) => {
      if (graffitiBlips.length > 0) {
        for (const blip of graffitiBlips) {
          RemoveBlip(blip);
        }
        graffitiBlips = [];
        return emit('DoLongHudText', 'Removed all blips', 1, 12000);
      }
    
      const foundGraffiti = await Procedures.execute('ev-gangsystem:getFoundGraffiti', removeBlips);
      for (const graffiti of foundGraffiti) {
        const blip = AddBlipForRadius(
          graffiti.coords.x,
          graffiti.coords.y,
          graffiti.coords.z,
          100
        );
        SetBlipAlpha(blip, 100);
        SetBlipSprite(blip, 9);
        SetBlipColour(blip, graffiti.color);
        graffitiBlips.push(blip);
      }
    
      if (foundGraffiti.length > 0) {
        return emit('DoLongHudText', 'Discovered graffitis marked', 1, 12000);
      }
    };
    const showGangCollectHistory = async () => {
      const currentGang = await getCurrentGang();
      if (!currentGang) {
        return;
      }
      const collectHistory = await Procedures.execute('ev-gangsystem:getCollectHistory', currentGang);
      const mappedHistory = collectHistory.map((historyEntry) => {
        const formattedEntry = {
          icon: 'info-circle',
          title: `${historyEntry.log}`,
          description: `${historyEntry.date}`,
          action: '',
          key: {},
        };
        return formattedEntry;
      });

      if (mappedHistory.length === 0) {
        const noProfitEntry = {
          icon: 'info-circle',
          title: 'No profit has been collected yet',
          description: '',
          action: '',
          key: {},
        };
        mappedHistory.push(noProfitEntry);
      }
      globalObject.g.exports['ev-ui'].showContextMenu(mappedHistory);
      return;
    };
    const toggleContestedGraffitiBlips = async () => {
      if (blips.length > 0) {
        for (const blip of blips) {
          RemoveBlip(blip);
        }
        blips = [];
        return emit('DoLongHudText', 'Removed all blips', 1, 12000);
      }
      const currentGang = await getCurrentGang();
      if (!currentGang) {
        return;
      }
      const contestedGraffiti = await Procedures.execute('ev-gangsystem:getContestedGraffiti', currentGang);
      for (const graffiti of contestedGraffiti) {
        const blip = AddBlipForRadius(graffiti.coords.x, graffiti.coords.y, graffiti.coords.z, 100);
        SetBlipAlpha(blip, 100);
        SetBlipSprite(blip, 9);
        SetBlipColour(blip, graffiti.color);
        blips.push(blip);
      }
      if (contestedGraffiti.length > 0) {
        return emit('DoLongHudText', 'Contested graffitis marked', 1, 12000);
      } else {
        return emit('DoLongHudText', 'No contested graffitis found', 1, 12000);
      }
    };
    const gangModelHashes = [],
    cacheOptions = { timeToLive: 600000 };
    const getCachedGangNPCWeapon = Utils.cache(async (key, gangId) => {
      const weapon = await Procedures.execute('ev-gangsystem:getGangNPCWeapon', gangId);
      return [true, weapon];
    }, cacheOptions);
    
    const populateGangModelHashes = async () => {
      const gangPedModels = await GetGangsPedModels();
    
      for (const gangId in gangPedModels) {
        gangModelHashes.push({
          gangId: gangId,
          model: GetHashKey(gangPedModels[gangId]),
        });
      }
    };
    const setupGangNPC = async (ped, gangId) => {
      SetCanAttackFriendly(ped, true, false)
      SetPedAlertness(ped, 3)
      SetPedConfigFlag(ped, 100, true)
      SetPedCombatRange(ped, 1)
      SetPedSeeingRange(ped, 100)
      SetPedHearingRange(ped, 1000)
      SetPedDiesWhenInjured(ped, false)
      SetPedEnableWeaponBlocking(ped, true)
      SetPedSuffersCriticalHits(ped, false)
      SetPedAccuracy(ped, 90)
      SetPedCombatAbility(ped, 2)
      SetPedCombatMovement(ped, 3)
      SetPedCombatAttributes(ped, 5, true)
      SetPedCombatAttributes(ped, 16, true)
      SetPedCombatAttributes(ped, 17, false)
      SetPedCombatAttributes(ped, 46, true)
      SetPedCombatAttributes(ped, 1424, false)
      SetPedFleeAttributes(ped, 0, false)
      TaskWanderStandard(ped, 1, 10)
      RegisterHatedTargetsAroundPed(ped, 500)
      TaskCombatHatedTargetsAroundPed(ped, 500, 0)
      SetPedKeepTask(ped, true)
      SetBlockingOfNonTemporaryEvents(ped, true)
      const weapon = await getCachedGangNPCWeapon.get(gangId)
      GiveWeaponToPed(ped, weapon !== null && weapon !== void 0 ? weapon : -1024456158, 1000, false, true)
      SetPedDropsWeaponsWhenDead(ped, false)
    },
    getGangById = (entity) => {
      const entityModel = GetEntityModel(entity);
      const gang = gangModelHashes.find((gangEntry) => gangEntry.model === entityModel);
      return gang;
    };
    const setRelationshipBetweenGangAndPlayer = (relationshipType, gangId) => {
      const playerHash = GetHashKey('PLAYER');
      const gangHash = GetHashKey('GANG_' + gangId);
    
      if (!DoesRelationshipGroupExist(gangHash)) {
        AddRelationshipGroup('GANG_' + gangId);
      }
    
      SetRelationshipBetweenGroups(relationshipType, playerHash, gangHash);
      SetRelationshipBetweenGroups(relationshipType, gangHash, playerHash);
    };
  class _0x40e30a {
    constructor(_0x35122a, _0xdd5177, _0x2b0534 = 'interval') {
      this.callback = _0x35122a
      this.delay = _0xdd5177
      this.mode = _0x2b0534
      this.scheduled = {}
      this.tick = 0
      this.data = {}
      this.hooks = new Map([
        ['active', []],
        ['preStop', []],
        ['preStart', []],
        ['afterStop', []],
        ['afterStart', []],
        ['stopAborted', []],
        ['startAborted', []],
      ])
    }
    get ['isActive']() {
      return this.active
    }
    async ['start']() {
      if (this.active) {
        return
      }
      this.aborted = false
      this.scheduled = {}
      const _0x4d2556 = this.hooks.get('preStart')
      try {
        for (const _0x419272 of _0x4d2556) {
          if (!this.aborted) {
            await _0x419272.call(this)
          }
        }
      } catch (_0x2bd278) {
        this.aborted = true
        console.log('Error while calling pre-start hook', _0x2bd278.message)
      }
      if (this.aborted) {
        try {
          const _0x7c4b2c = this.hooks.get('startAborted')
          for (const _0x3e7a62 of _0x7c4b2c) {
            await _0x3e7a62.call(this)
          }
        } catch (_0x5566fc) {
          console.log(
            'Error while calling start-aborted hook',
            _0x5566fc.message
          )
        }
        return
      }
      this.active = true
      const _0x425da9 = this.hooks.get('active')
      switch (this.mode) {
        case 'tick': {
          this.threadId = _0x4c2773.setTick(async () => {
            this.tick += 1
            try {
              await this.callback.call(this)
              for (const _0x1a5942 of _0x425da9) {
                await _0x1a5942.call(this)
              }
            } catch (_0x1657ce) {
              console.log('Error while calling active hook', _0x1657ce.message)
            }
            this.delay > 0 &&
              (await new Promise((_0x4672fd) =>
                _0x4c2773.setTimeout(_0x4672fd, this.delay)
              ))
          })
          break
        }
        case 'interval': {
          this.threadId = _0x4c2773.setInterval(async () => {
            this.tick += 1
            try {
              await this.callback.call(this)
              for (const _0x1e6cd4 of _0x425da9) {
                await _0x1e6cd4.call(this)
              }
            } catch (_0x547ddf) {
              console.log('Error while calling active hook', _0x547ddf.message)
            }
          }, this.delay)
          break
        }
        case 'timeout': {
          const _0x420757 = () => {
            this.active &&
              (this.threadId = _0x4c2773.setTimeout(async () => {
                this.tick += 1
                try {
                  await this.callback.call(this)
                  for (const _0x4ba2aa of _0x425da9) {
                    await _0x4ba2aa.call(this)
                  }
                } catch (_0xa55536) {
                  console.log(
                    'Error while calling active hook',
                    _0xa55536.message
                  )
                }
                return _0x420757()
              }, this.delay))
          }
          _0x420757()
          break
        }
      }
      const _0x882272 = this.hooks.get('afterStart')
      try {
        for (const _0x36cb6f of _0x882272) {
          await _0x36cb6f.call(this)
        }
      } catch (_0x4884e3) {
        console.log('Error while calling after-start hook', _0x4884e3.message)
      }
    }
    async ['stop']() {
      if (!this.active) {
        return
      }
      const _0x38c93e = this.hooks.get('preStop')
      try {
        for (const _0x59763b of _0x38c93e) {
          if (!this.aborted) {
            await _0x59763b.call(this)
          }
        }
      } catch (_0x4c5dfc) {
        this.aborted = true
        console.log('Error while calling pre-stop hook', _0x4c5dfc.message)
      }
      this.active = false
      switch (this.mode) {
        case 'tick': {
          _0x4c2773.clearTick(this.threadId)
          break
        }
        case 'interval': {
          _0x4c2773.clearInterval(this.threadId)
          break
        }
        case 'timeout': {
          _0x4c2773.clearTimeout(this.threadId)
          break
        }
      }
      if (this.aborted) {
        try {
          const _0x1950ad = this.hooks.get('stopAborted')
          for (const _0xcad1c1 of _0x1950ad) {
            await _0xcad1c1.call(this)
          }
        } catch (_0x3febc2) {
          console.log(
            'Error while calling stop-aborted hook',
            _0x3febc2.message
          )
        }
        return
      }
      const _0x202fc6 = this.hooks.get('afterStop')
      try {
        for (const _0x1fb429 of _0x202fc6) {
          await _0x1fb429.call(this)
        }
      } catch (_0x19c538) {
        console.log('Error while calling after-stop hook', _0x19c538.message)
      }
    }
    ['abort']() {
      this.aborted = true
    }
    ['addHook'](_0x360c20, _0x54d326) {
      var _0x40ec6b
      ;(_0x40ec6b = this.hooks.get(_0x360c20)) === null || _0x40ec6b === void 0
        ? void 0
        : _0x40ec6b.push(_0x54d326)
    }
    ['setNextTick'](_0x5e927c, _0x5e4042) {
      this.scheduled[_0x5e927c] = this.tick + _0x5e4042
    }
    ['canTick'](_0x33334b) {
      return (
        this.scheduled[_0x33334b] === undefined ||
        this.tick >= this.scheduled[_0x33334b]
      )
    }
  }
  const _0x31e19d = new _0x40e30a(function () {}, 1000)
  _0x31e19d.addHook('preStart', function () {})
  _0x31e19d.addHook('active', function () {
    if (!this.canTick('ped')) { return }
    this.setNextTick('ped', 5)
    this.data.playerId = PlayerId()
    this.data.playerPed = PlayerPedId()
  })
  const _0x35a437 = new Set(),
    restrictedWeapons = [
      -820634585, 2343591895, 1945849481, -2009644972, 727643628, 1834241177,
      1064738331, -691061592, 571920712,
    ]
  let blockedModels = [],
    _0x271176 = false
  const _0x27ea29 = async () => {
      await delay(10000)
      await loadGangModelsAndCreateRelationshipGroups()
      await setupPedCreationEvent()
      await checkPlayerAttackingGangs()
      await getCurrentGang()
      _0x31e19d.isActive ? await _0x31e19d.stop() : await _0x31e19d.start()
    },
    loadGangModelsAndCreateRelationshipGroups = async () => {
      const gangPedModels = await GetGangsPedModels();
      for (const gangId in gangPedModels) {
        validGangModels = { gangId: gangPedModels[gangId] }
        const currentModel = gangPedModels[gangId];

        if (!IsModelValid(currentModel)) {
          continue;
        }
    
        try {
          await Streaming.loadModel(currentModel);
          AddRelationshipGroup('GANG_' + gangId);
        } catch (error) {
          console.log('Failed to load model', gangId);
        }
      }
    };
    const setupPedCreationEvent = () => {
      console.log('[GangSystem] Initializing ped creation event');
      if (blockedModels.length === 0) {
        console.log('[GangSystem] Loading blocked models');
        blockedModels = [
          ...config.blockedModels.map((modelName) => GetHashKey(modelName)),
        ];
      }
    
      on('populationPedCreating', (x, y, z, modelHash, pedToCreate) => {
        if (!validGangModels || Math.random() <= 0.5 || blockedModels.includes(modelHash & 4294967295)) {
          return;
        }
        const position = { x, y, z };
        const nearestGangId = findNearestGangId(position);
    
        if (!nearestGangId || !validGangModels[nearestGangId]) {
          return;
        }
        const existingGangPeds = GetGamePool('CPed')
          .map((entity) => GetEntityModel(entity))
          .filter((model) => GetHashKey(validGangModels[nearestGangId]) === model);
    
        if (existingGangPeds.length >= 4) {
          return;
        }
        pedToCreate.setModel(validGangModels[nearestGangId]);
      });
    };
    let lastGangAttackTime = 0;
    const checkPlayerAttackingGangs = () => {
      setInterval(async () => {
        const selectedWeapon = GetSelectedPedWeapon(PlayerPedId());
        const isWeaponIncluded = restrictedWeapons.includes(selectedWeapon);
    
        if (
          IsPedShooting(PlayerPedId()) &&
          GetGameTimer() > lastGangAttackTime + 60000 &&
          !isWeaponIncluded
        ) {
          const [isAimingAtEntity, aimedEntityId] = GetEntityPlayerIsFreeAimingAt(
            PlayerId()
          );
    
          if (aimedEntityId === 0) {
            return;
          }
    
          const aimedEntityState = Entity(aimedEntityId).state;
          
          if (!aimedEntityState.gangId) {
            return;
          }
    
          lastGangAttackTime = GetGameTimer();
          const playerCoords = GetEntityCoords(PlayerPedId(), false);
          const playerPosition = { x: playerCoords[0], y: playerCoords[1], z: playerCoords[2] };
          const nearestGangId = findNearestGangId(playerPosition);
          const currentGangId = await getCurrentGang();
    
          if (
            !nearestGangId ||
            nearestGangId === currentGangId ||
            nearestGangId !== aimedEntityState.gangId
          ) {
            return;
          }
    
          const targetGangPeds = GetGamePool('CPed')
            .filter(
              (ped) =>
                GetHashKey(validGangModels[nearestGangId]) === GetEntityModel(ped) &&
                !IsPedAPlayer(ped)
            )
            .filter((_0x80144c, index) => index < 8);
    
          for (const targetPed of targetGangPeds) {
            ClearPedTasks(targetPed);
            NetworkRequestControlOfEntity(targetPed);
            await assignPedToGang(targetPed, nearestGangId);
            SetPedKeepTask(targetPed, true);
            TaskCombatPed(targetPed, PlayerPedId(), 0, 16);
          }
        }
      }, 3);
    };
    const robGangMember = async (targetPed) => {
      const currentGang = await getCurrentGang();
      if (!currentGang) {
        return;
      }
    
      const targetCoords = GetEntityCoords(targetPed, false);
      const targetPosition = {
        x: targetCoords[0],
        y: targetCoords[1],
        z: targetCoords[2],
      };
    
      const nearestGangId = findNearestGangId(targetPosition);
      if (!nearestGangId) {
        return;
      }
    
      const targetGang = getGangById(targetPed);
      if (targetGang.gangId !== nearestGangId) {
        return;
      }
    
      const [canRobGang, errorMsg] = await Procedures.execute('ev-gangsystem:canRobGang', nearestGangId);
      if (!canRobGang) {
        return emit('DoLongHudText', errorMsg, 2);
      }

      ClearPedTasks(targetPed)
      await Streaming.loadAnim('missfbi5ig_22')
      await Streaming.loadAnim('random@shop_robbery')
      NetworkRequestControlOfEntity(targetPed)
      TaskSetBlockingOfNonTemporaryEvents(0, true)
      SetEntityAsMissionEntity(targetPed, true, true)
      SetNetworkIdCanMigrate(NetworkGetNetworkIdFromEntity(targetPed), false)
      TaskGoToEntity(targetPed, PlayerPedId(), -1, 2, 4, 0, 0)
      TaskTurnPedToFaceEntity(targetPed, PlayerPedId(), -1)
      TaskTurnPedToFaceEntity(PlayerPedId(), targetPed, -1)
      TaskPlayAnim(targetPed, 'missfbi5ig_22', 'hands_up_anxious_scientist', 8, 1, -1, 1, -1, false, false, false )
      TaskPlayAnim(PlayerPedId(), 'random@shop_robbery', 'robbery_action_b', 20, -8, -1, 49, 0, false, false, false)
      const zoneLabel = GetLabelText(GetNameOfZone(targetPosition.x, targetPosition.y, targetPosition.z));
      const [streetHash, _] = GetStreetNameAtCoord(targetPosition.x, targetPosition.y, targetPosition.z);
      const location = GetStreetNameFromHashKey(streetHash) + ', ' + zoneLabel;
      Events.emitNet('ev-gangsystem:notifyGang', 'Someone is robbing one of our members! ' + location, nearestGangId);
      Events.emitNet('ev-gangsystem:gangMemberBeingRobbed', nearestGangId);
      _0x271176 = true
      const filteredPeds = GetGamePool('CPed').filter((ped) =>
        GetHashKey(newObj[nearestGangId]) === GetEntityModel(ped) && !IsPedAPlayer(ped)
      );
    
      for (const currentPed of filteredPeds) {
        if (currentPed === targetPed) {
          continue;
        }
      
        ClearPedTasks(currentPed);
        NetworkRequestControlOfEntity(currentPed);
        SetNetworkIdCanMigrate(NetworkGetNetworkIdFromEntity(currentPed), false);
        await setupGangNPC(currentPed, nearestGangId);
        TaskCombatPed(currentPed, PlayerPedId(), 0, 16);
      }
      const startTime = GetGameTimer();
      const intervalId = setInterval(async () => {
        const pedFlags = exports['ev-flags'].GetPedFlags(PlayerPedId());
      
        if (startTime + 120000 < GetGameTimer() || !booleanFlag || pedFlags.isDead) {
          return clearInterval(intervalId);
        }
      
        if (!IsEntityPlayingAnim(PlayerPedId(), 'random@shop_robbery', 'robbery_action_b', 3)) {
          TaskPlayAnim(PlayerPedId(),'random@shop_robbery', 'robbery_action_b', 20, -8, -1, 49, 0, false, false, false);
        }
      
        if (!IsEntityPlayingAnim(nearestGangId, 'missfbi5ig_22', 'hands_up_anxious_scientist', 3)) {
          TaskPlayAnim(nearestGangId, 'missfbi5ig_22', 'hands_up_anxious_scientist', 8, 1, -1, 1, -1, false, false, false);
        }
      }, 1000);
      const robberyProgress = await performTaskWithDelay(240000, 'Robbing gang member', true);
      booleanFlag = false;
      ClearPedTasks(PlayerPedId());
      ClearPedTasks(nearestGangId);
      TaskWanderStandard(nearestGangId, 1, 10);
      
      if (robberyProgress !== 100) {
        return;
      }
    
      const [robberySuccess, robberyResultMsg] = await Procedures.execute('ev-gangsystem:robGangMember', nearestGangId);
      if (!robberySuccess) {
        emit('DoLongHudText', robberyResultMsg, 2);
      }
    };
  _0x31e19d.addHook('active', async function () {
    const _0x188dfb = GetGamePool('CPed')
    for (const _0x45e335 of _0x188dfb) {
      const _0x10f3da = getGangById(_0x45e335)
      if (_0x35a437.has(_0x45e335) || !_0x10f3da) {
        continue
      }
      const _0x3af518 = IsPedAPlayer(_0x45e335),
        _0x6bb6ee = GetPedType(_0x45e335) === 28
      if (_0x3af518 || _0x6bb6ee) {
        continue
      }
      _0x35a437.add(_0x45e335)
      TaskSetBlockingOfNonTemporaryEvents(_0x45e335, true)
      SetPedFleeAttributes(_0x45e335, 0, false)
      SetPedRelationshipGroupHash(
        _0x45e335,
        GetHashKey('GANG_' + _0x10f3da.gangId)
      )
    }
  })
  let _0x2d542f = false
  on('ev-admin:currentDevmode', (_0x4a28af) => {
    _0x2d542f = _0x4a28af
  })
  Events.onNet('ev-gangsystem:refreshGangStatus', () => {
    return resetCaches()
  })
  Events.onNet('ev-gangsystem:openGangStorage', (_0x2d6df1, _0x109dc6) => {
    return interactWithGangMember(_0x109dc6)
  })
  Events.on('ev-gangsystem:collectTrapProfit', async () => {
    const _0x551e93 = await getCurrentGang()
    return Events.emitNet('ev-gangsystem:collectTrapProfit', _0x551e93)
  })
  Events.on('ev-gangsystem:collectHistory', () => {
    return showGangCollectHistory()
  })
  Events.onNet('ev-gangsystem:robGangMember', (_0x2f9ec9, _0x31b0c8) => {
    return robGangMember(_0x31b0c8)
  })
  Events.on('ev-gangsystem:destroyFlag', (_0x4d3abc, _0x36d2b6, _0x299c9b) => {
      return destroyGangFlag(_0x36d2b6, _0x299c9b)
    }
  )
  Events.on('ev-gangsystem:purchaseGangSpray', () => {
    return showPurchaseSprayMenu()
  })
  Events.on('ev-gangsystem:purchaseScrubbingCloth', () => {
    return showPurchaseClothMenu()
  })
  Events.on('ev-gangsystem:handOverSpray', (_0x7aecb7, _0x1fb2dd, _0x5742d6) => {
      return markObjectAsUpForGrabs(_0x5742d6)
    }
  )
  Events.onNet('ev-gangsystem:sendEmail', async (message) => {
    emit('phone:emailReceived', 'Unknown', 'IMPORTANT!', message)
    await performPhoneConfirmation('GANG', 'READ EMAIL APP', 'exclamation-triangle')
  })
  Events.onNet('ev-gangsystem:incomingInvite', async (_param1, param2, inviteMessage) => {
      const notificationAccepted = await performPhoneConfirmation('Gang invitation', inviteMessage + ' is inviting you to join their group.', 'user-ninja')
      if (!notificationAccepted) {
        return
      }
      const [success, hudText] = await Procedures.execute('ev-gangsystem:acceptGangInvite', _0x13759e, _0x3b39d4)
      emit('DoLongHudText', hudText, success ? 1 : 2)
    }
  )
  Events.on('ev-gangsystem:discoverGraffiti', (Args, p1, p2) => {
      return discoverGraffiti(p2)
    }
  )
  on('ev-inventory:closed', (inventoryId) => {
    if (!inventoryId.endsWith('-Traphouse-Storage')) {
      return;
    }
    return playPackageDropoffAnimation();
  });

  RegisterUICallback('ev-gangsystem:confirmPurchaseSpray', (data, cb) => {
      Events.emitNet('ev-gangsystem:purchaseGangSpray', data.key.gangId, data.key.cost)
      const _0x2bd581 = {
        ok: true,
        message: '',
      }
      const _0x4596a5 = {
        data: null,
        meta: _0x2bd581,
      }
      cb(_0x4596a5)
    }
  )
  RegisterUICallback('ev-gangsystem:confirmPurchaseCloth', (data, cb) => {
      Events.emitNet('ev-gangsystem:purchaseScrubbingCloth', data.key.cost)
      const _0x4d1b95 = {
        ok: true,
        message: '',
      }
      const _0x1a40a9 = {
        data: null,
        meta: _0x4d1b95,
      }
      cb(_0x1a40a9)
    }
  )
  RegisterUICallback('ev-gangsystem:ui:fetchGangInfo', async (data, cb) => {
      const _0x595bcc = await Procedures.execute('ev-gangsystem:getGanginfo'),
        _0x2b7caf = {
          ok: true,
          message: '',
        }
      const _0x4f9db0 = {
        data: _0x595bcc,
        meta: _0x2b7caf,
      }
      cb(_0x4f9db0)
    }
  )
  RegisterUICallback('ev-gangsystem:ui:kickMember', async (data, cb) => {
      const _0x3b6014 = await getCurrentGang(),
        [_0x9bd025, _0x3b7da5] = await Procedures.execute('ev-gangsystem:removeGangMember', _0x3b6014, Number(data.stateId)),
        _0x170534 = {
          ok: _0x9bd025,
          message: _0x3b7da5,
        }
      const _0x3ae94f = {
        data: {},
        meta: _0x170534,
      }
      cb(_0x3ae94f)
    }
  )
  RegisterUICallback('ev-gangsystem:ui:addMember', async (data, cb) => {
      const _0x4f6119 = await getCurrentGang(),
        [_0x511381, _0x439770] = await Procedures.execute('ev-gangsystem:addGangMember', _0x4f6119, Number(data.stateId)),
        _0x57d23d = {
          ok: _0x511381,
          message: _0x439770,
        }
      const _0x10fb9c = {
        data: {},
        meta: _0x57d23d,
      }
      cb(_0x10fb9c)
    }
  )
  RegisterUICallback('ev-gangsystem:ui:fetchGangProgression', async (data, cb) => {
      const _0x208795 = await getCurrentGang(),
        _0x5778fd = await Procedures.execute('ev-gangsystem:fetchGangProgression', _0x208795),
        _0x338585 = {
          ok: true,
          message: 'OK',
        }
      const _0x1763f8 = {
        data: _0x5778fd,
        meta: _0x338585,
      }
      cb(_0x1763f8)
    }
  )
  RegisterUICallback('ev-gangsystem:ui:fetchIsStaff', async (data, cb) => {
      const _0x40b9ec = await Procedures.execute('ev-gangsystem:fetchIsStaff'),
        _0x584daa = { isStaff: _0x40b9ec && _0x2d542f }
      const _0x3208d8 = {
        ok: true,
        message: 'OK',
      }
      const _0x2e7a18 = {
        data: _0x584daa,
        meta: _0x3208d8,
      }
      cb(_0x2e7a18)
    }
  )
  RegisterUICallback('ev-gangsystem:ui:fetchStaffInformation', async (data, cb) => {
      const _0x40c1fe = await Procedures.execute('ev-gangsystem:fetchStaffInformation' ),
        _0x4f2d6b = {
          ok: true,
          message: 'OK',
        }
      const _0x1865e0 = {
        data: _0x40c1fe,
        meta: _0x4f2d6b,
      }
      cb(_0x1865e0)
    }
  )
  RegisterUICallback('ev-gangsystem:ui:staffRemoveMember', async (data, cb) => {
      const [_0x4f00ed, _0xe7da42] = await Procedures.execute('ev-gangsystem:staffRemoveMember', data.groupId, Number(data.stateId)),
        _0x1cc0cc = {
          ok: true,
          message: _0xe7da42,
        }
      const _0x17e57e = {
        data: _0x4f00ed,
        meta: _0x1cc0cc,
      }
      cb(_0x17e57e)
    }
  )
  RegisterUICallback('ev-gangsystem:ui:staffFetchGangLogs', async (data, cb) => {
      const _0x433384 = await Procedures.execute('ev-gangsystem:staffFetchGangLogs', data.groupId),
        _0x44ed8e = { logs: _0x433384 }
      const _0x4c7b13 = {
        ok: true,
        message: '',
      }
      const _0x35413d = {
        data: _0x44ed8e,
        meta: _0x4c7b13,
      }
      cb(_0x35413d)
    }
  )
  RegisterUICallback('ev-gangsystem:ui:toggleGangBlips', async (data, cb) => {
      await toggleGraffitiBlips()
      const _0x113160 = {
        ok: true,
        message: 'ok',
      }
      const _0x386ec7 = {
        data: {},
        meta: _0x113160,
      }
      cb(_0x386ec7)
    }
  )
  RegisterUICallback('ev-gangsystem:ui:toggleContestedGraffitis', async (data, cb) => {
      await toggleContestedGraffitiBlips()
      const _0x5c080f = {
        ok: true,
        message: 'ok',
      }
      const _0xa316ff = {
        data: {},
        meta: _0x5c080f,
      }
      cb(_0xa316ff)
    }
  )
  globalObject.g.exports('GetCurrentGang', getCurrentGang)
  globalObject.g.exports('GetCurrentFlagLocation', getGangFlagLocation)
  globalObject.g.exports('IsValidGraffitiPlacement', sprayGangGraffiti)
  globalObject.g.exports('RemovingGangSpray', RemovingGangSpray)
  globalObject.g.exports('GetCurrentGangInfo', getGangInfo)
  globalObject.g.exports('InRestrictedArea', isBlockedZone)
  globalObject.g.exports('GetGangsPedModels', getPedModels)
  RegisterCommand('ev-gangsystem:toggleGangBlips', async (_0x33498a, _0x3054ce) => {
      toggleGraffitiBlips(true)
    },
    false
  )
  const _0x50fbe9 = () => {
    const _0x2ac923 = {
      CPXEvent: 'ev-gangsystem:openGangStorage',
      id: 'gangs_hand_goods',
      icon: 'hand-holding',
      label: 'Hand Goods',
      parameters: {},
    }
    const _0xd05229 = {
      CPXEvent: 'ev-gangsystem:collectTrapProfit',
      id: 'gangs_collect_profit',
      icon: 'money-bill',
      label: 'Collect Profit',
      parameters: {},
    }
    const _0x2cd042 = {
      CPXEvent: 'ev-gangsystem:collectHistory',
      id: 'gangs_collect_profit_history',
      icon: 'history',
      label: 'Who has collected profit?',
      parameters: {},
    }
    const _0x5d15f1 = { radius: 2 }
    globalObject.g.exports['ev-interact'].AddPeekEntryByEntityType(
      [1],
      [_0x2ac923, _0xd05229, _0x2cd042],
      {
        distance: _0x5d15f1,
        isEnabled: async (_0x5d44eb, _0x132f4f) => {
          const _0x4553e2 = await getCurrentGang()
          if (!_0x4553e2) {
            return false
          }
          const _0x4a525d = await GetGangsPedModels()
          if (!_0x4a525d[_0x4553e2]) {
            return false
          }
          const _0x12e1c1 = GetHashKey(_0x4a525d[_0x4553e2]),
            _0x1e0ab4 = GetEntityCoords(_0x5d44eb, false),
            _0x2619e5 = {
              x: _0x1e0ab4[0],
              y: _0x1e0ab4[1],
              z: _0x1e0ab4[2],
            }
          const _0x350011 = _0x2619e5,
            _0x593eef = findNearestGangId(_0x350011)
          return (
            _0x132f4f.model === _0x12e1c1 &&
            _0x593eef === _0x4553e2 &&
            !IsPedAPlayer(_0x5d44eb) &&
            !IsEntityDead(_0x5d44eb)
          )
        },
      }
    )
    const _0x45da7d = {
      CPXEvent: 'ev-gangsystem:robGangMember',
      id: 'gangs_rob_npc',
      icon: 'bullseye',
      label: 'Rob Member',
      parameters: {},
    }
    const _0x50a993 = { radius: 2 }
    globalObject.g.exports['ev-interact'].AddPeekEntryByEntityType(
      [1],
      [_0x45da7d],
      {
        distance: _0x50a993,
        isEnabled: async (_0x29a468, _0x51e9a1) => {
          const _0x536f3a = await getCurrentGang()
          if (!_0x536f3a) {
            return false
          }
          const _0x41fabe = GetEntityCoords(_0x29a468, false),
            _0x5d7948 = {
              x: _0x41fabe[0],
              y: _0x41fabe[1],
              z: _0x41fabe[2],
            }
          const _0x30eab9 = _0x5d7948,
            _0x2977fe = findNearestGangId(_0x30eab9),
            _0x85bb73 = await GetGangsPedModels()
          if (!_0x85bb73[_0x2977fe]) {
            return false
          }
          const _0x4b8dc1 = GetHashKey(_0x85bb73[_0x2977fe])
          return (
            _0x51e9a1.model === _0x4b8dc1 &&
            _0x2977fe !== _0x536f3a &&
            !IsPedAPlayer(_0x29a468) &&
            !IsEntityDead(_0x29a468)
          )
        },
      }
    )
    const _0x10be54 = {
      CPXEvent: 'ev-gangsystem:destroyFlag',
      id: 'gangs_destroy_flag',
      icon: 'trash',
      label: 'Remove Flag',
      parameters: {},
    }
    const _0x3eec41 = { radius: 2 }
    globalObject.g.exports['ev-interact'].AddPeekEntryByModel(
      [GetHashKey('np_gangflag')],
      [_0x10be54],
      {
        distance: _0x3eec41,
        isEnabled: async (_0x10bfb6, _0x4dc23c) => {
          var _0x3bfe4d, _0xb85ae3, _0x306465
          const _0x12b39f =
            (_0x306465 =
              (_0xb85ae3 =
                (_0x3bfe4d = _0x4dc23c.meta) === null || _0x3bfe4d === void 0
                  ? void 0
                  : _0x3bfe4d.data) === null || _0xb85ae3 === void 0
                ? void 0
                : _0xb85ae3.metadata) === null || _0x306465 === void 0
              ? void 0
              : _0x306465.gangId
          if (!_0x12b39f) {
            return false
          }
          const _0x6c40e = await getCurrentGang()
          if (!_0x6c40e) {
            return false
          }
          const _0x90a104 = GetEntityCoords(PlayerPedId(), false),
            _0x4d9ab7 = {
              x: _0x90a104[0],
              y: _0x90a104[1],
              z: _0x90a104[2],
            }
          const _0x4c43b7 = _0x4d9ab7,
            _0x2f5add = findNearestGangId(_0x4c43b7)
          return _0x6c40e === _0x2f5add && _0x2f5add === _0x12b39f
        },
      }
    )
  }
  const _0x2d4d3e = () => {
    var _0x219eac
    const _0x39da82 =
      (_0x219eac = getConfigValueForResource('blockVinewoodArea')) !== null &&
      _0x219eac !== void 0
        ? _0x219eac
        : false
    if (_0x39da82) {
      const _0x12ced8 = {
        x: -800,
        y: -521.21,
      }
      const _0x338878 = {
        x: -1292.42,
        y: -62.12,
      }
      const _0x408060 = {
        x: -1566.67,
        y: -165.15,
      }
      const _0x1d9763 = {
        x: -1710.61,
        y: -400,
      }
      const _0x50e67d = {
        x: -1976.467,
        y: -224.3751,
      }
      const _0x235d34 = {
        x: -2364.01,
        y: -436.5,
      }
      const _0x57e004 = {
        x: -2810.61,
        y: -89.39,
      }
      const _0x433af8 = {
        x: -3089.39,
        y: -13.64,
      }
      const _0x561eb4 = {
        x: -3483.33,
        y: 1001.52,
      }
      const _0x4aec36 = {
        x: -2986.36,
        y: 2601.52,
      }
      const _0x34559c = {
        x: -562.12,
        y: 2953.03,
      }
      const _0x25d4a0 = {
        x: 98.48,
        y: 2540.91,
      }
      const _0x226de0 = {
        x: 1365.15,
        y: 2607.58,
      }
      const _0x1c8e63 = {
        x: 1668.18,
        y: 2850,
      }
      const _0x20a890 = {
        x: 1971.21,
        y: 2728.79,
      }
      const _0x485061 = {
        x: 3298.48,
        y: 1668.18,
      }
      const _0x5c7c7d = {
        x: 3225.76,
        y: 13.64,
      }
      const _0xc988b2 = {
        x: 3092.42,
        y: -804.55,
      }
      const _0xc3442 = {
        x: 1671.21,
        y: -898.48,
      }
      const _0x5dd864 = {
        x: 1280.3,
        y: -146.97,
      }
      const _0x2b4177 = {
        x: 1019.7,
        y: -125.76,
      }
      const _0x16da0b = {
        x: 783.33,
        y: -65.15,
      }
      const _0x581d4b = {
        x: 610.61,
        y: -537.88,
      }
      const _0x42aacf = { id: 'ev-gangsystem:blockedZone' }
      const _0x45738b = {
        minZ: 0,
        maxZ: 800,
        data: _0x42aacf,
      }
      exports['ev-polyzone'].AddPolyZone('ev-gangsystem:blockedZone',
        [
          _0x12ced8,
          _0x338878,
          _0x408060,
          _0x1d9763,
          _0x50e67d,
          _0x235d34,
          _0x57e004,
          _0x433af8,
          _0x561eb4,
          _0x4aec36,
          _0x34559c,
          _0x25d4a0,
          _0x226de0,
          _0x1c8e63,
          _0x20a890,
          _0x485061,
          _0x5c7c7d,
          _0xc988b2,
          _0xc3442,
          _0x5dd864,
          _0x2b4177,
          _0x16da0b,
          _0x581d4b,
        ],
        _0x45738b
      )
    }
    const _0x4299ea = {
      x: -172.25,
      y: -426.8,
    }
    const _0x1e13f8 = {
      x: -300.07,
      y: -835.61,
    }
    const _0x5186ba = {
      x: -119,
      y: -1121.23,
    }
    const _0x2afa91 = {
      x: 90.91,
      y: -1124.24,
    }
    const _0x5398f3 = {
      x: 590.91,
      y: -1133.33,
    }
    const _0x250733 = {
      x: 603.03,
      y: -624.24,
    }
    const _0x446a39 = {
      x: 540.91,
      y: -572.73,
    }
    const _0x4a66b3 = { id: 'ev-gangsystem:blockedZone_downtown' }
    const _0x1486fb = {
      minZ: -400,
      maxZ: 800,
      data: _0x4a66b3,
    }
    exports['ev-polyzone'].AddPolyZone('ev-gangsystem:blockedZone',
      [
        _0x4299ea,
        _0x1e13f8,
        _0x5186ba,
        _0x2afa91,
        _0x5398f3,
        _0x250733,
        _0x446a39,
      ],
      _0x1486fb
    )
  }
  async function _0x4508f7() {
    await initConfig()
    await Procedures.execute('ev-datagrid:subscribe', 'gang-flags')
    _0x2d4d3e()
    await _0x27ea29()
    await populateGangModelHashes()
    _0x50fbe9()
  }
  ;(async () => {
    await _0x4508f7()
  })()

})()
