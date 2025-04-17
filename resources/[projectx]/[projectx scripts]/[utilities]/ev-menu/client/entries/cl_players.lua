local PedEntries = MenuEntries['peds']

PedEntries[#PedEntries + 1] = {
    data = {
        id = "peds-escort",
        title = "Escort",
        icon = "#general-escort",
        event = "ev-police:drag:attempt"
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and not isEscorting and pEntity and pContext.flags['isPlayer']
    end
}

PedEntries[#PedEntries+1] = {
    data = {
        id = "peds-cuff",
        title = "Cuff",
        icon = "#cuffs-cuff",
        event = "ev-police:cuffs:attempt"
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and not pContext.flags['isCuffed'] and ((exports["ev-inventory"]:hasEnoughOfItem("cuffs",1,false) or (isPolice or isDoc))) and pContext.distance <= 2.0
    end
}

PedEntries[#PedEntries + 1] = {
    data = {
        id = "peds-ucuff",
        title = "Uncuff",
        icon = "#cuffs-uncuff",
        event = "ev-police:cuffs:uncuff"
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and pContext.flags['isCuffed'] and ((exports["ev-inventory"]:hasEnoughOfItem("cuffs", 1, false) or (isPolice or isDoc)))
    end
}

PedEntries[#PedEntries + 1] = {
    data = {
        id = "peds-unblindfold",
        title = "Remove Blindfold",
        icon = "#blindfold",
        event = "blindfold:blindfold",
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and pContext.flags['isBlindfolded']
    end
}

PedEntries[#PedEntries + 1] = {
    data = {
        id = "cuffs:gag",
        title = "Remove gag",
        icon = "#gag",
        event = "gag:toggle",
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and pContext.flags['isGagged']
    end
}

PedEntries[#PedEntries + 1] = {
    data = {
        id = "peds-cuffActions",
        title = "Cuff Actions",
        icon = "#cuffs",
    },
    subMenus = {"cuffs:remmask", "cuffs:beatmode", "cuffs:blindfold", "cuffs:gag", "cuffs:checkphone"},
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and pContext.flags['isCuffed'] and ((exports["ev-inventory"]:hasEnoughOfItem("cuffs", 1, false) or (isPolice or isDoc)))
    end
}

PedEntries[#PedEntries + 1] = {
    data = {
        id = "peds-revive",
        title = "Revive",
        icon = "#medic-revive",
        event = "revive",
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and pContext.flags['isDead'] and (isPolice or isDoc or isMedic or isDoctor)
    end
}

PedEntries[#PedEntries + 1] = {
    data = {
        id = "peds-revive-var",
        title = "Revive",
        icon = "#medic-revive",
        event = "ev-heists:serverroom:revivePlayer",
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled()
        and (IN_SERVER_FARM or not InDefaultWorld())
        and pEntity
        and pContext.flags['isPlayer']
        and pContext.flags['isDead']
        and exports["ev-inventory"]:hasEnoughOfItem("varmedkit", 1, false, true)
    end
}

PedEntries[#PedEntries + 1] = {
    data = {
        id = "peds-heal",
        title = "Heal",
        icon = "#medic-heal",
        event = "ems:heal",
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and not pContext.flags['isDead'] and (isMedic or isDoctor or isDoc)
    end
}

PedEntries[#PedEntries + 1] = {
    data = {
        id = "peds-medicActions",
        title = "Medical Actions",
        icon = "#medic",
    },
    subMenus = {"medic:checktargetstates", "medic:stomachpump", "medic:bloodtest"},
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and (isMedic or isDoctor)
    end
}

PedEntries[#PedEntries + 1] = {
    data = {
        id = "police-action",
        title = "Police Actions",
        icon = "#police-action",
    },
    subMenus = {"police:frisk", "police:search", "police:fingerprint", "police:checkBank", "police:gsr", "medic:checktargetstates", "police:seizeItems"},
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and (isPolice or isDoc) and pContext.distance <= 2.0
    end
}

PedEntries[#PedEntries + 1] = {
    data = {
        id = "steal",
        title = "Steal",
        icon = "#steal",
        event = "police:rob" 
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and not (isPolice or isDoc) and pEntity and pContext.flags['isPlayer'] and (isPersonBeingHeldUp(pEntity) or pContext.flags['isDead']) and not isOutbreakRunning
    end
}

PedEntries[#PedEntries + 1] = {
    data = {
        id = "steal-shoes",
        title = "Steal shoes",
        icon = "#shoes",
        event = "shoes:steal"
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and not (isPolice or isDoc) and pEntity and pContext.flags['isPlayer'] and (pContext.flags['isCuffed'] or pContext.flags['isDead'] or isPersonBeingHeldUp(pEntity))
    end
}

PedEntries[#PedEntries + 1] = {
    data = {
        id = "prison-action",
        title = "Prison Actions",
        icon = "#prison-action",
    },
    subMenus = {"prison:attachCollar", "prison:currentInfo", "prison:assignTask", "prison:assignGroup", "prison:getCell"},
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isPlayer'] and (isPolice or isDoc) and pContext.distance <= 2.0 and polyChecks.prison.isInside
    end
}

MenuItems['police:frisk'] = {
    data = {
        id = "peds-frisk",
        title = "Frisk",
        icon = "#police-action-frisk",
        event = "police:checkInventory",
        parameters = {true}
    }
}

MenuItems['police:cufflog'] = {
    data = {
        id = "peds-cuff-log",
        title = "Recent Cuff Actions",
        icon = "#cuffs-cuff",
        event = "ev-police:openRecentCuffsMenu",
        parameters = {}
    }
}

MenuItems['police:search'] = {
    data = {
        id = "peds-search",
        title = "Search",
        icon = "#cuffs-check-inventory",
        event = "police:checkInventory"
    }
}

MenuItems['cuffs:remmask'] = {
    data = {
        id = "cuffs:remmask",
        title = "Remove Mask Hat",
        icon = "#cuffs-remove-mask",
        event = "police:remmask"
    }
}

MenuItems['police:seizeItems'] = {
    data = {
        id = "police:seizeItems",
        title = "Seize Possessions",
        icon = "#steal",
        event = "ev-police:client:seizeItems"
    },
    isEnabled = function(pEntity, pContext)
        return polyChecks.police.isInside
    end
}

MenuItems['cuffs:checkphone'] = {
    data = {
        id = "cuffs:checkphone",
        title = "Read Phone",
        icon = "#cuffs-check-phone",
        event = "police:checkPhone"
    }
}

MenuItems['cuffs:beatmode'] = {
    data = {
        id = "cuffs:beatmode",
        title = "Beat Mode",
        icon = "#cuffs-beatmode",
        event = "police:startPutInBeatMode"
    }
}

MenuItems['cuffs:blindfold'] = {
    data = {
        id = "cuffs:blindfold",
        title = "Blindfold",
        icon = "#blindfold",
        event = "blindfold:blindfold"
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isCuffed'] and pContext.flags['isPlayer'] and not pContext.flags['isBlindfolded'] and ((exports["ev-inventory"]:hasEnoughOfItem("blindfold", 1, false)))
    end
}

MenuItems['cuffs:gag'] = {
    data = {
        id = "cuffs:gag",
        title = "Gag",
        icon = "#gag",
        event = "gag:toggle"
    },
    isEnabled = function(pEntity, pContext)
        return not IsDisabled() and pEntity and pContext.flags['isCuffed'] and pContext.flags['isPlayer'] and not pContext.flags['isGagged'] and ((exports["ev-inventory"]:hasEnoughOfItem("gag_sock", 1, false)))
    end
}

MenuItems['medic:stomachpump'] = {
    data = {
        id = "medic:stomachpump",
        title = "Stomach pump",
        icon = "#medic-stomachpump",
        event = "ems:stomachpump"
    },
    isEnabled = function(pEntity, pContext)
        return isDoctor
    end
}

MenuItems['medic:bloodtest'] = {
    data = {
        id = "medic:bloodtest",
        title = "Blood Test",
        icon = "#general-check-over-target",
        event = "ems:bloodtest"
    },
    isEnabled = function(pEntity, pContext)
        return isDoctor
    end
}

MenuItems['medic:checktargetstates'] = {
    data = {
        id = "medic:checktargetstates",
        title = "Examine Target",
        icon = "#general-check-over-target",
        event = "requestWounds"
    }
}

MenuItems['police:dna'] = {
    data = {
        id = "police:dna", 
        icon = "#police-action-dna",
        title = "Swab DNA",
        event = "evidence:dnaSwab" 
    },
    isEnabled = function(pEntity, pContext)
        return not isDead and pContext.flags and isPolice or isDoc
    end
}

MenuItems['police:checkBank'] = {
    data = {
        id = "police:checkBank",
        icon = "#police-check-bank",
        title = "Check Bank",
        event = "police:checkBank"
    },
    isEnabled = function(pEntity, pContext)
        return not isDead and pContext.flags and isPolice
    end
}

MenuItems['police:gsr'] = {
    data = {
        id = "police:gsr",
        icon = "#police-action-gsr",
        title = "Check GSR",
        event = "police:gsr"
    },
    isEnabled = function(pEntity, pContext)
        return not isDead and pContext.flags and isPolice
    end
}

MenuItems['prison:attachCollar'] = {
    data = {
        id = "prison:attachCollar",
        title = "Attach GPS Collar",
        icon = "#prisoner-collar",
        event = "ev-jail:attachCollar"
    }
}

MenuItems['prison:currentInfo'] = {
    data = {
        id = "prison:currentInfo",
        title = "Get Prisoner Info",
        icon = "#prisoner-info",
        event = "ev-jail:showPrisonerInfo"
    }
}

MenuItems['prison:assignTask'] = {
    data = {
        id = "prison:assignTask",
        title = "Assign Group Task",
        icon = "#prisoner-task",
        event = "ev-jail:assignTask"
    }
}

MenuItems['prison:assignGroup'] = {
    data = {
        id = "prison:assignGroup",
        title = "Assign Group",
        icon = "#prisoner-group",
        event = "ev-jail:assignGroup"
    }
}

MenuItems['prison:getCell'] = {
    data = {
        id = "prison:getCell",
        title = "View Assigned Cell",
        icon = "#prisoner-info",
        event = "ev-jail:getOthersCell"
    }
}
