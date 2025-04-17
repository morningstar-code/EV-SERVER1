<!-- COOLIO WAS HERE -->

<template>
  <div>
      <template v-if="showTooltip">
        <div
          v-show="showMain == true"
          v-tooltip="'Expand / Shrink'"
          class="customShrinkButton waves-effect waves-light btn"
          :class="isExpanded ? '' : 'shrinkButton'"
          @click="isExpanded = !isExpanded"
        >
        <i
          class="tiny material-icons"
          :class="isExpanded ? 'nonFlipped' : 'flippedIcon'"
        >chevron_left</i>
        </div>
      </template>
      <template v-if="!showTooltip">
        <div
          v-show="showMain == true"
          class="customShrinkButton waves-effect waves-light btn"
          :class="isExpanded ? '' : 'shrinkButton'"
          @click="isExpanded = !isExpanded"
        >
        <i
          class="tiny material-icons"
          :class="isExpanded ? 'nonFlipped' : 'flippedIcon'"
        >chevron_left</i>
        </div>
      </template>
      <template v-if="this.pinnedTargets.length != 0 && this.showPinnedTargets">
        <div
          class="targetedInfo"
          :class="isExpanded ? '' : 'shrink'"
        >
          <div class="headerBar">
            Targets
          </div>
          <ul :style="{ 'overflow-y': 'scroll', 'overflow-x': 'hidden', height: '94%' }">
            <li
              v-for="(target, index) in this.pinnedTargets"
              :key="index"
              :style="{ width: '100%' }"
              :id="index"
            >
              <div class="targetWrapper">
                <div class="targetHeading">
                  <div class="targetHeadingData">
                    {{ target.playerName }}
                  </div>
                  <div class="targetHeadingData">
                    {{ target.SteamID }}
                  </div>
                  <li
                    v-for="(targetData, targetIndex) in target.data"
                    :key="targetIndex"
                    :style="{ width: '100%' }"
                    :id="targetIndex"
                  >
                  <div class="targetDataWrapper">
                    <div class="targetData">
                      {{ targetIndex }}
                    </div>
                    <div class="targetData">
                      {{ targetData }}
                    </div>
                  </div>
                  </li>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </template>
      <div v-show="showMain == true" class="window" :class="isExpanded ? '' : 'shrinkAdminMenu'">
          <Commands
            v-show="rendering == 'commands'"
            :currentTarget="currentTarget"
            :isExpanded="isExpanded"
            :playerData="playerData"
            :menuData="menuData"
            :itemList="itemList"
            :vehicleList="vehicleList"
            :vehiclePresetList="vehiclePresetList"
            :garageList="garageList"
            :jobList="jobList"
            :licenseList="licenseList"
            :favCommands="favCommands"
            :emitter="emitter"
          />
          <PlayerList
            v-show="rendering == `playerList`"
            :currentTarget="currentTarget"
            :isExpanded="isExpanded"
            :playerData="playerData"
            :disconnectedPlayers="disconnectedPlayers"
            :emitter="emitter"
          />
          <BannedList
            v-show="rendering == `bannedList`"
            :isExpanded="isExpanded"
            :bannedList="bannedList"
            :emitter="emitter"
          />
          <PlayerLogs
            v-show="rendering == `playerLogs`"
            :isExpanded="isExpanded"
            :playerLogs="playerLogs"
            :emitter="emitter"
          />
          <Options
            v-show="rendering == `options`"
            :isExpanded="isExpanded"
            :options="options"
            :emitter="emitter"
          />
          <div v-show="showMain == true" class="sidebar" :class="isExpanded ? '' : 'shrinkSidebar'">
            <div class="buttonWrapper">
              <ul>
                <li
                  v-for="(mList, index) in menuList"
                  :key="index"
                  :style="{ width: '100%' }"
                  :id="index"
                >
                  <template v-if="showTooltip">
                    <div
                      v-show="showMain == true"
                      v-tooltip="mList.displayName"
                      class="sidebarButtons waves-effect waves-light btn"
                      :class="isMenuActive(index) ? 'active' : ''"
                      @click="rendering = changeMenu(true, index)"
                    >
                    <i
                      class="fas"
                      :class="mList.icon"
                    />
                    </div>
                  </template>
                  <template v-if="!showTooltip">
                    <div
                      v-show="showMain == true"
                      class="sidebarButtons waves-effect waves-light btn"
                      :class="isMenuActive(index) ? 'active' : ''"
                      @click="rendering = changeMenu(true, index)"
                    >
                    <i
                      class="fas"
                      :class="mList.icon"
                    />
                    </div>
                  </template>
                </li>
              </ul>
            </div>
            <div class="buttonWrapper adminToggle">
              <template v-if="showTooltip">
                <div
                  v-tooltip="'Admin Mode'"
                  class="sidebarButtons adminToggle waves-effect waves-light btn"
                  :class="[isInAdminMode ? 'inAdmin' : '', isExpanded ? '' : 'shrink']"
                  @click="toggleAdminMode()"
                >
                <i class="fas fa-terminal" />
                </div>
              </template>
              <template v-if="showTooltip">
                <div
                  v-tooltip="'Show / Hide Pinned targets'"
                  class="sidebarButtons adminShowHideTarget waves-effect waves-light btn"
                  :class="[isInAdminMode ? 'inAdmin' : '', isExpanded ? '' : 'shrink']"
                  @click="showPinnedTargets = !showPinnedTargets"
                >
                <i class="fas fa-clipboard-list" />
                </div>
              </template>
              <template v-if="showTooltip">
                <div
                  v-tooltip="'Show / Hide Menu'"
                  class="sidebarButtons adminShowHide waves-effect waves-light btn"
                  :class="[isInAdminMode ? 'inAdmin' : '', isExpanded ? '' : 'shrink']"
                  @click="showHideMenu()"
                >
                <i class="fas fa-compress-arrows-alt" />
                </div>
              </template>
              <template v-if="!showTooltip">
                <div
                  class="sidebarButtons adminToggle waves-effect waves-light btn"
                  :class="[isInAdminMode ? 'inAdmin' : '', isExpanded ? '' : 'shrink']"
                  @click="toggleAdminMode()"
                >
                <i class="fas fa-terminal" />
                </div>
              </template>
              <template v-if="!showTooltip">
                <div
                  class="sidebarButtons adminShowHideTarget waves-effect waves-light btn"
                  :class="[isInAdminMode ? 'inAdmin' : '', isExpanded ? '' : 'shrink']"
                  @click="showPinnedTargets = !showPinnedTargets"
                >
                <i class="fas fa-clipboard-list" />
                </div>
              </template>
              <template v-if="!showTooltip">
                <div
                  class="sidebarButtons adminShowHide waves-effect waves-light btn"
                  :class="[isInAdminMode ? 'inAdmin' : '', isExpanded ? '' : 'shrink']"
                  @click="showHideMenu()"
                >
                <i class="fas fa-compress-arrows-alt" />
                </div>
              </template>
            </div>
          </div>
      </div>
  </div>
</template>

<script lang="js">
import Nui from "../utils/Nui";
import Commands from "./menuComponents/Commands.vue";
import PlayerList from "./menuComponents/PlayerList.vue";
import BannedList from "./menuComponents/BannedList.vue";
import PlayerLogs from "./menuComponents/PlayerLogs.vue";
import Options from "./menuComponents/Options.vue";

export default {
  name: "menu",
  props: ["emitter"],
  components: {
    Commands: Commands,
    PlayerList: PlayerList,
    BannedList: BannedList,
    PlayerLogs: PlayerLogs,
    Options: Options
  },
  data() {
    return {
      isExpanded: true,
      showTooltip: true,
      showMain: true,
      rendering: "commands",
      currentTarget: {
        playerName: "",
        SteamID: "",
        serverID: ""
        // playerName: "RandomCoder Is a Bozo",
        // SteamID: "STEAM:0:1_1_1_1",
        // serverID: "1"
      },
      showPinnedTargets: true,
      pinnedTargets: [ //Remove in production
        // {
        //   playerName: "RandomCoder Is a Bozo",
        //   SteamID: "STEAM:0:1_1_1_1",
        //   data: ["Loves anal beads"]
        // }
      ],
      isInAdminMode: false,
      pinnedTargetInterval: null,
      pinnedTargetIntervalTime: 6e3,
      menuList: [
        {
          item: "commands",
          icon: "fa-hat-wizard",
          displayName: "Commands"
        }, {
          item: "playerList",
          icon: "fa-list",
          displayName: "Player List"
        }, {
          item: "bannedList",
          icon: "fa-gavel",
          displayName: "Recently Banned"
        }, {
          item: "playerLogs",
          icon: "fa-book-open",
          displayName: "Player Logs"
        }, {
          item: "options",
          icon: "fa-cogs",
          displayName: "Options"
        }
      ],
      menuListPos: 0,
      playerData: [
        {
          serverID: 1,
          name: "Cool",
          SteamID: "STEAM_0:1:193827491",
          charID: 1,
          charName: "Kevin Malagnaggi",
          disc: false,
          queueType: 'Admin'
        }
      ],
      options: [ //Remove in production
        // {
        //   optionName: "toggleBlockEmotes",
        //   displayName: "Block Emotes",
        //   optionType: "toggle",
        //   data: false
        // }, {
        //   optionName: "toggleDefaultMenu",
        //   displayName: "Large menu is default",
        //   optionType: "toggle",
        //   data: true
        // }, {
        //   optionName: "expandedOnPass",
        //   displayName: "Large menu on 'Pass' menu is default",
        //   optionType: "toggle",
        //   data: false
        // }, {
        //   optionName: "showTooltips",
        //   displayName: "Show Tooltips",
        //   optionType: "toggle",
        //   data: true
        // }, {
        //   optionName: "openDefaultMenu",
        //   displayName: "Open Normal Menu with Bind",
        //   optionType: "toggle",
        //   data: true
        // }
      ],
      menuData: [
        // {
        //   command: {
        //     title: "Give Item",
        //     cat: "Utility",
        //     child: {
        //       inputs: ["TargetNot", "Item"]
        //     },
        //     action: "ev-admin:giveItem"
        //   },
        //   options: {
        //     bindKey: {
        //       value: undefined,
        //       options: {}
        //     }
        //   }
        // },
        // {
        //   command: {
        //     title: "Create Business",
        //     cat: "Utility",
        //     child: {
        //       inputs: ["ID", "Name", "Owner"]
        //     },
        //     action: "ev-admin:createBusiness"
        //   },
        //   options: {
        //     bindKey: {
        //       value: undefined,
        //       options: {}
        //     }
        //   }
        // },
        // {
        //   command: {
        //     title: "Fix Vehicle",
        //     cat: "Player",
        //     child: null,
        //     action: "ev-admin:fixVehicle"
        //   },
        //   options: {
        //     bindKey: {
        //       value: "T",
        //       options: {}
        //     }
        //   }
        // }
      ],
      playerLogs: [
        // {
        //   type: "Admin",
        //   steamid: "STEAM_0:1:193827491",
        //   log: "Spawned item",
        //   date: "2020-03-01 00:00:00",
        //   cid: 1,
        //   data: `{"amount":"1", "item":"Sandwich"}`
        // }
      ],
      itemList: [],
      vehicleList: [],
      vehiclePresetList: [],
      garageList: [],
      jobList: [],
      licenseList: [],
      favCommands: [],
      disconnectedPlayers: [],
      bannedList: [
        // {
        //   from: "2023-03-01 00:00:00",
        //   until: "2023-04-01 00:00:00",
        //   admin: "Cool",
        //   name: "RandomCoder",
        //   SteamID: "STEAM:0:1_1_1_1",
        //   reason: "Being a bozo"
        // }
      ]
    }
  },
  mounted() {
    const thisKeyWord = this;

    this.emitter.on("currentTarget", function(e) {
      thisKeyWord.currentTarget = e.currentTarget;
    });
    this.emitter.on("updateOptions", function(e) {
      thisKeyWord.options = e.options;
    });
    this.emitter.on("addPinnedTargets", (e) => {
      thisKeyWord.addRemovePinnedTarget(e.targetSource);
    }); //, this
    this.emitter.on("clearInputsOnExit", function() {
      thisKeyWord.clearInputsOnExit();
    });
    this.emitter.on("changeFavCommands", function(e) {
      thisKeyWord.changeFavCommands(e.fav);
    });

    window.addEventListener("message", (event) => {
      //console.log("Menu messageHandler", event);
      //if (!event.isTrusted) throw "Untrusted event";
      switch (event.data.action) {
        case "setCurrentMainMenu":
          this.menuData = this.forceReactivityTable(event.data.menuData);
          this.playerData = this.forceReactivityTable(event.data.playerData).sort((a, b) => a.serverID - b.serverID);
          this.disconnectedPlayers = this.forceReactivityTable(event.data.disconnectedPlayers).sort((a, b) => a.serverID - b.serverID);
          this.bannedList = this.forceReactivityTable(event.data.bannedList);
          this.options = this.forceReactivityTable(event.data.options);
          this.playerLogs = this.forceReactivityTable(event.data.playerLogs);
          this.itemList = this.forceReactivityTable(event.data.itemList);
          this.vehicleList = this.forceReactivityTable(event.data.vehicleList);
          this.vehiclePresetList = event.data.vehiclePresetList;
          this.garageList = event.data.garageList;
          this.jobList = this.forceReactivityTable(event.data.jobList);
          this.licenseList = this.forceReactivityTable(event.data.licenseList);
          this.favCommands = this.forceReactivityTable(event.data.favCommands);
          this.isInAdminMode = event.data.adminMode;
          this.isExpanded = event.data.startExpanded;
          this.showTooltip = this.getOptionState("showTooltips");
          this.showMain = true;
          this.$forceUpdate();
          this.emitter.emit("generateCommandInputs", {});
          break;
        case "updatePlayerLogs":
          this.playerLogs = this.forceReactivityTable(event.data.playerLogs);
          this.$forceUpdate();
          break;
        case "updateMenuData":
          this.menuData = this.forceReactivityTable(event.data.menuData);
          this.$forceUpdate();
          break;
        case "updateDefinedNames":
          this.pinnedTargets = this.forceReactivityTable(this.linkDefinedNames(event.data.data));
          this.$forceUpdate();
          break;
        case "updateAdminMode":
          this.isInAdminMode = event.data.adminMode;
          this.$forceUpdate();
          break;
      }
    });
    window.addEventListener("keydown", this.keyManger);
  },
  computed: {},
  methods: {
    getOptionState(option) {
      let data = true;
      const foundOption = this.options.find(o => o.optionName === option);

      if (foundOption) {
        data = foundOption.data;
      }

      return data;
    },
    clearInputsOnExit() {
      this.playerData = [];
      this.options = [];
      this.menuData = [];
      this.playerLogs = [];
      this.itemList = [];
      this.vehicleList = [];
      this.vehiclePresetList = [];
      this.garageList = [];
      this.jobList = [];
      this.showPinnedTargets = true;
      this.isInAdminMode = false
    },
    toggleAdminMode() {
      //this.isInAdminMode = !this.isInAdminMode; //Remove in production
      Nui.post("https://ev-admin/adminMenu", JSON.stringify({
        action: "toggleAdminMode"
      }));
    },
    messageHandler(event) {
      //console.log("Menu messageHandler", event);
      //if (!event.isTrusted) throw "Untrusted event";
      switch (event.data.action) {
        case "setCurrentMainMenu":
          this.menuData = this.forceReactivityTable(event.data.menuData);
          this.playerData = this.forceReactivityTable(event.data.playerData).sort((a, b) => a.serverID - b.serverID);
          this.disconnectedPlayers = this.forceReactivityTable(event.data.disconnectedPlayers).sort((a, b) => a.serverID - b.serverID);
          this.bannedList = this.forceReactivityTable(event.data.bannedList);
          this.options = this.forceReactivityTable(event.data.options);
          this.playerLogs = this.forceReactivityTable(event.data.playerLogs);
          this.itemList = this.forceReactivityTable(event.data.itemList);
          this.vehicleList = this.forceReactivityTable(event.data.vehicleList);
          this.vehiclePresetList = event.data.vehiclePresetList;
          this.garageList = event.data.garageList;
          this.jobList = this.forceReactivityTable(event.data.jobList);
          this.licenseList = this.forceReactivityTable(event.data.licenseList);
          this.favCommands = this.forceReactivityTable(event.data.favCommands);
          this.isInAdminMode = event.data.adminMode;
          this.isExpanded = event.data.startExpanded;
          this.showTooltip = this.getOptionState("showTooltips");
          this.showMain = true;
          this.$forceUpdate();
          this.emitter.emit("generateCommandInputs", {});
          break;
        case "updatePlayerLogs":
          this.playerLogs = this.forceReactivityTable(event.data.playerLogs);
          this.$forceUpdate();
          break;
        case "updateMenuData":
          this.menuData = this.forceReactivityTable(event.data.menuData);
          this.$forceUpdate();
          break;
        case "updateDefinedNames":
          this.pinnedTargets = this.forceReactivityTable(this.linkDefinedNames(event.data.data));
          this.$forceUpdate();
          break;
        case "updateAdminMode":
          this.isInAdminMode = event.data.adminMode;
          this.$forceUpdate();
          break;
      }
    },
    forceReactivityTable(table) {
      return table ? table.filter((t) => t) : null;
    },
    linkDefinedNames(data) {
      const definedNames = [];

      const linkName = (key) => {
        const player = data[key];
        const foundPlayer = this.playerData.find(p => p.serverID === player.source);
        if (foundPlayer != null) {
          definedNames.push({
            SteamID: foundPlayer.SteamID,
            source: foundPlayer.serverID,
            playerName: foundPlayer.name,
            data: player.data
          });
        }
      }

      for (const key in data) linkName(key);

      return definedNames;
    },
    addRemovePinnedTarget(source) {
      this.$root.log("addRemovePinnedTarget", source);
      this.$root.log("this.pinnedTargets before", this.pinnedTargets);

      const foundTarget = this.pinnedTargets.findIndex(t => t.source.toString() === source.toString());
      this.$root.log("foundTarget", foundTarget);

      if (foundTarget >= 0) {
        //console.log("Found target, removing");
        this.pinnedTargets.splice(foundTarget, 1);
        // this.currentTarget = {
          
        // }
      } else {
        //console.log("Target not found, adding");
        const foundPlayer = this.playerData.find(p => p.serverID === source);
        if (foundPlayer != null) {
          this.pinnedTargets.push({
            SteamID: foundPlayer.SteamID,
            source: source,
            playerName: foundPlayer.name,
            data: null
          });

          this.$root.log("this.pinnedTargets after", this.pinnedTargets);
        }
      }
    },
    keyManger(event) {
      //console.log("Menu keyManger", event);
      const key = event.key.toLowerCase();
      const which = event.which;

      if ([37, 38, 40, 13, 33, 34].includes(which) || this.rendering === "playerList" && which === 37 || event.target.tagName !== "INPUT") {
        switch (key) {
          case "pagedown":
              this.changeMenu(true);
              break;
          case "pageup":
              this.changeMenu(false);
              break;
          case "1":
          case "2":
          case "3":
          case "4":
              this.emitToAllKeys(event.key, "changeTab");
              break;
          case "arrowdown":
          case "arrowup":
              this.emitToAllKeys(event.key, "changeMain");
              break;
          case "arrowright":
              this.emitToAllKeys(event.key, "changeInto");
              break;
          case "arrowleft":
              this.emitToAllKeys(event.key, "changeOut");
              break;
          case "enter":
              this.emitToAllKeys(event.key, "selectCurrent");
              break;
          case "tab":
              this.isExpanded = !this.isExpanded;
              break;
          case "end":
              this.toggleAdminMode();
              event.preventDefault();
              break;
          default:
              this.emitToAllKeys(key, "keyInput", event);
              break;
        }
      }
    },
    emitToAllKeys(key, event, data) {
      this.emitter.emit("controlTriggered", {
        key: key.toLowerCase(),
        event: event,
        rendering: this.rendering,
        data: data
      });
    },
    changeMenu(bool, index) {
      if (index || index === 0) {
        this.menuListPos = index;
        return this.menuList[index].item;
      }
      if (bool) {
        this.menuListPos++;
        if (this.menuListPos > this.menuList.length - 1) {
          this.menuListPos = 0;
        }
      } else {
        this.menuListPos--;
        if (this.menuListPos < 0) {
          this.menuListPos = this.menuList.length - 1;
        }
      }
      this.rendering = this.menuList[this.menuListPos].item;
    },
    buildAndSendTargetSource() {
      let playerList = [];

      for (const target in this.pinnedTargets) {
        const player = this.pinnedTargets[target];
        playerList.push(player.source);
      }

      if (playerList.length === 0) {
        playerList = "empty";
      }

      Nui.post("https://ev-admin/adminMenu", JSON.stringify({
        action: "getDefinedNames",
        playerList: playerList
      }));
    },
    showHideMenu() {
      if (this.pinnedTargets.length <= 0 || 0 == this.showPinnedTargets) {
        Nui.post("https://ev-admin/adminMenu", JSON.stringify({
          action: "clearDefinedNames"
        }));
        this.emitter.emit("closeMenu", {});
      } else {
        this.showMain = false;
        this.isExpanded = false;
        Nui.post("https://ev-adminUI/hideMenu", JSON.stringify({}));
      }
    },
    isMenuActive(pos) {
      return this.menuListPos === pos;
    },
    changeFavCommands(favCommand) {
      const favCommandIndex = this.favCommands.indexOf(favCommand);
      
      if (favCommandIndex === -1) {
        this.favCommands.push(favCommand);
      } else {
        this.favCommands.splice(favCommandIndex, 1);
      }

      Nui.post("https://ev-admin/adminMenu", JSON.stringify({
          action: "updateFavCommands",
          favCommands: this.favCommands
      }));
    }
  },
  watch: {
    pinnedTargets() { //FIX
      // const t = this;
      // if (this.pinnedTargets.length != 0) {
      //   this.emitter.emit("targetMenu", {
      //     isRunning: true
      //   });
      //   if (this.pinnedTargetInterval != null) return;
      //   this.buildAndSendTargetSource();
      //   this.pinnedTargetInterval = setInterval(() => {
      //     t.buildAndSendTargetSource();
      //   }, this.pinnedTargetIntervalTime);
      // } else {
      //   this.emitter.emit("targetMenu", {
      //     isRunning: false
      //   });
      // }
      // this.buildAndSendTargetSource();
      // clearInterval(this.pinnedTargetInterval);
      // this.pinnedTargetInterval = null;
    },
    showMain() {
      Nui.post("https://ev-adminUI/insideCommand", JSON.stringify({
        inside: this.showMain
      }));
    }
  }
};
</script>

<style lang="css" scoped>
ul {
    list-style: none
}

.window {
    width: 60vw;
    left: 20%;
    overflow-x: hidden
}

.window.shrinkAdminMenu,
.window {
    position: absolute;
    top: 7.5vh;
    height: 86%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow-y: hidden;
    font-size: 12px;
    background-color: var(--bgSecondary);
    -webkit-transition: all .5s ease;
    transition: all .5s ease
}

.window.shrinkAdminMenu {
    width: 20vw;
    left: 78%
}

.customShrinkButton {
    position: absolute;
    top: 7.5vh;
    left: 19%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow-y: hidden;
    font-size: 12px;
    background-color: var(--btn);
    color: var(--textColor);
    width: 1%;
    padding-left: 0;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    margin: 0
}

.headerBar {
    -webkit-box-shadow: 5px 1px 21px 3px #000;
    box-shadow: 5px 1px 21px 3px #000;
    background: var(--bgPrimary);
    width: 100%;
    margin-bottom: 0;
    height: 5%;
    font-size: 18px;
    text-align: center;
    padding: 3%;
    font-weight: 700
}

.targetWrapper {
    margin: 2%;
    margin-bottom: 3%;
    text-transform: uppercase;
    font-size: 10.5px;
    background: #fff;
    color: #000;
    margin-left: 1%;
    font-size: 13px;
    padding-bottom: 2%
}

.targetHeading {
    background: rgba(171, 171, 177, .664);
    padding-bottom: 1%;
    padding-top: 1%;
    border-bottom: 3px solid rgba(0, 0, 0, .247);
    -webkit-box-shadow: 5px 1px 17px 3px #000;
    box-shadow: 5px 1px 17px 3px #000;
    margin-bottom: 4%
}

.targetHeadingData {
    text-align: center;
    font-weight: 700;
    text-transform: capitalize;
    border: 1px solid rgba(0, 0, 0, .247);
    background: hsla(0, 0%, 50.2%, .527);
    margin: 1%
}

.targetData {
    text-align: center;
    font-weight: 700;
    text-transform: capitalize;
    padding-left: 6%;
    padding-right: 6%
}

.targetDataWrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    background: rgba(218, 206, 210, .445);
    margin: 1%
}

.customShrinkButton.shrinkButton {
    left: 77%
}

.customShrinkButton:hover {
    background: var(--btnHover);
    color: var(--textColor)
}

.nonFlipped {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-transition: all .2s;
    transition: all .2s
}

.flippedIcon {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: all .2s;
    transition: all .2s
}

.targetedInfo {
    position: absolute;
    top: 7.5vh;
    left: 81%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow-y: hidden;
    font-size: 12px;
    background-color: var(--bgSecondary);
    color: var(--textColor);
    width: 12vw;
    height: 86%;
    padding-left: 0;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    margin: 0
}

.targetedInfo.shrink {
    top: 11.9vh;
    left: 65.5%;
    height: 81.7%
}

.sidebar {
    border-right: 2px solid var(--colorTwat);
    border-radius: 0 0 20px 0;
    -webkit-box-shadow: 0 0 14px -4px rgba(0, 0, 0, .76);
    box-shadow: 0 0 14px -4px rgba(0, 0, 0, .76);
    position: absolute;
    background: var(--bgTertiary);
    height: 100%;
    width: 4%;
    left: 0;
    top: 0
}

.sidebar.shrinkSidebar {
    width: 9%
}

.buttonWrapper {
    position: absolute;
    margin: 6%;
    width: 86%;
    top: 37%
}

.sidebarButtons {
    margin-top: 30%;
    width: 100%;
    font-size: 11.5px;
    text-transform: unset;
    background: var(--btn);
    color: var(--textColor);
    padding: 0
}

.sidebarButtons:hover {
    font-size: 11.5px;
    text-transform: unset;
    background: var(--btnHover);
    color: var(--textColor)
}

.sidebarButtons.active {
    background: var(--bgTarget)
}

.sidebarButtons.adminToggle {
    height: 40px;
    width: 40px
}

.sidebarButtons.adminToggle.shrink {
    height: 33px;
    width: 33px
}

.sidebarButtons.adminToggle.inAdmin {
    color: red
}

.sidebarButtons.adminShowHideTarget {
    height: 40px;
    width: 40px
}

.sidebarButtons.adminShowHideTarget.shrink {
    height: 33px;
    width: 33px
}

.sidebarButtons.adminShowHide {
    font-size: 20px;
    height: 40px;
    width: 40px;
    padding: 0
}

.sidebarButtons.adminShowHide.shrink {
    font-size: 2px;
    height: 33px;
    width: 33px;
    padding: 0
}

.buttonWrapper.adminToggle {
    margin: 6%;
    top: 80%
}
</style>