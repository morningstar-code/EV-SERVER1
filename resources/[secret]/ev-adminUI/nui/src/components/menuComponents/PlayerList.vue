<template>
    <div class="AdminBodyContainer" :class="this.isExpanded ? '' : 'shrinkBodyContainer'">
        <div class="headerBar" :class="[isPlayerListActive(-1) ? 'active' : '', this.isExpanded ? '' : 'flexColumn']">
            <div class="searchContainer" :class="this.isExpanded ? '' : 'shrinkSearchContainer'">
                <span style="color: white;">
                    Search: ServerID
                </span>
                <input
                    v-model="searchServerID"
                    ref="inputContainer_0"
                    class="childInputsInput"
                    placeholder=""
                    @input="event => event.target.composing || (searchServerID = event.target.value)"
                />
            </div>
            <div class="searchContainer" :class="this.isExpanded ? '' : 'shrinkSearchContainer'">
                <span style="color: white;">
                    Search: SteamID
                </span>
                <input
                    v-model="searchSteamID"
                    ref="inputContainer_1"
                    class="childInputsInput"
                    placeholder=""
                    @input="event => event.target.composing || (searchSteamID = event.target.value)"
                />
            </div>
            <div class="searchContainer" :class="this.isExpanded ? '' : 'shrinkSearchContainer'">
                <span style="color: white;">
                    Search: CID
                </span>
                <input
                    v-model="searchStateID"
                    ref="inputContainer_2"
                    class="childInputsInput"
                    placeholder=""
                    @input="event => event.target.composing || (searchStateID = event.target.value)"
                />
            </div>
            <div class="searchContainer" :class="this.isExpanded ? '' : 'shrinkSearchContainer'">
                <span style="color: white;">
                    Search: Character Name
                </span>
                <input
                    v-model="searchCharName"
                    ref="inputContainer_3"
                    class="childInputsInput"
                    placeholder=""
                    @input="event => event.target.composing || (searchCharName = event.target.value)"
                />
            </div>
        </div>
        <template v-if="currentTarget.playerName">
            <div class="currentTarget">
                Current Target: ({{ currentTarget.serverID }}) {{ currentTarget.playerName }} [{{ currentTarget.SteamID }}]
            </div>
        </template>
        <div class="adminBody" :class="isExpanded ? '' : 'shrinkAdminBody'">
            <ul :class="isExpanded ? '' : 'shrinkCollapsible'">
                <template v-for="(player, index) in filteredPlayers">
                    <li
                        :id="index"
                        style="width: 100%;"
                    >
                        <!-- :key="index" -->
                        <div
                            class="customCollapsible"
                            :class="[player.disc ? 'disconnected' : '', currentTarget.playerName == player.name ? 'isTargeted' : '', isPlayerListActive(index) ? 'active' : '']"
                            @click="setTarget(player.disc, player.name, player.SteamID, player.serverID)"
                        >
                            <template v-if="isExpanded">
                                <div class="playerDataText" :class="isExpanded ? '' : 'shrink'">
                                    <div class="ServerID">
                                        ({{ player.serverID }})
                                    </div>
                                    <div class="Name">
                                        {{ player.name }}
                                    </div>
                                    <div class="SteamID">
                                        {{ player.SteamID }}
                                    </div>
                                    <div class="CharName" v-if="!player.disc">
                                        {{ player.charName }} [{{ player.charID }}]
                                    </div>
                                    <div class="CharName" v-if="player.disc">
                                        Disconnected
                                    </div>
                                    <div class="queueType" v-if="!player.disc">
                                        Queue Type: {{ player.queueType }}
                                    </div>
                                    <div
                                        class="pinTarget waves-effect waves-light btn"
                                        v-if="!player.disc"
                                        @click="addRemovePinnedTarget(player.serverID)"
                                    >
                                        <i class="fas fa-map-pin customIcon" />
                                    </div>
                                </div>
                            </template>
                                <template v-if="!isExpanded">
                                    <div class="playerDataText" :class="isExpanded ? '' : 'shrink'">
                                        <div class="shrunkServerNameWrapper">
                                            <div class="ServerID" :class="isExpanded ? '' : 'shrink'">
                                                ({{ player.serverID }})
                                            </div>
                                            <div class="Name" :class="isExpanded ? '' : 'shrink'">
                                                {{ player.name }}
                                            </div>
                                            <div class="CharName" v-if="player.disc">
                                                Disconnected
                                            </div>
                                        </div>
                                        <div class="steamPinWrapper">
                                            <div class="SteamID" :class="isExpanded ? '' : 'shrink'">
                                                {{ player.SteamID }}
                                            </div>
                                            <div
                                                class="pinTarget waves-effect waves-light btn"
                                                :class="isExpanded ? '' : 'shrink'"
                                                v-if="!player.disc"
                                                @click="addRemovePinnedTarget(player.serverID)"
                                            >
                                                <i class="fas fa-map-pin customIcon" />
                                            </div>
                                        </div>
                                    </div>
                                </template>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script lang="js">
import * as M from 'materialize-css';

export default {
    name: "PlayerList",
    props: ["currentTarget", "isExpanded", "playerData", "disconnectedPlayers", "emitter"],
    components: {},
    data() {
        return {
            searchServerID: "",
            searchSteamID: "",
            searchStateID: "",
            searchCharName: "",
            playerPos: 0,
            inputPos: 0,
            isInside: false
        }
    },
    mounted() {
        this.emitter.on("controlTriggered", function(data) {
            const key = data.key;
            switch (data.event) {
                case "changeMain":
                    this.changeMain(key);
                    break;
                case "selectCurrent":
                    this.selectCurrent(key);
                    break;
                case "changeInto":
                    this.changeInto(key);
                    break;
                default:
            }
        });
        document.addEventListener('DOMContentLoaded', () => {
            const elements = document.querySelectorAll('.collapsible');
            M.Collapsible.init(elements, { accordion: false });
        });
        M.AutoInit();
    },
    computed: {
        filteredPlayers() {
            return this.playerData;
            // var t = this;
            // var e = null;
            // return e = this.disconnectedPlayers.length >= 0 ? this.playerData.concat(this.disconnectedPlayers) : this.playerData, this.searchServerID || this.searchSteamID || this.searchStateID || this.searchCharName ? e.filter((function (e) {
            //     var n, i, o, r, s, a, c, l, u, d, h, f, p = null === (n = e.serverID) || void 0 === n || null === (i = n.toString()) || void 0 === i ? void 0 : i.toLowerCase(),
            //         v = null === (o = e.SteamID) || void 0 === o || null === (r = o.toString()) || void 0 === r ? void 0 : r.toLowerCase(),
            //         m = null === (s = e.charID) || void 0 === s || null === (a = s.toString()) || void 0 === a ? void 0 : a.toLowerCase(),
            //         y = null === (c = e.charName) || void 0 === c || null === (l = c.toString()) || void 0 === l ? void 0 : l.toLowerCase();
            //     return !("" !== t.searchServerID && !(null === p || void 0 === p ? void 0 : p.includes(null === (u = t.searchServerID) || void 0 === u ? void 0 : u.toLowerCase()))) && (!("" !== t.searchSteamID && !(null === v || void 0 === v ? void 0 : v.includes(null === (d = t.searchSteamID) || void 0 === d ? void 0 : d.toLowerCase()))) && (!("" !== t.searchStateID && !(null === m || void 0 === m ? void 0 : m.includes(null === (h = t.searchStateID) || void 0 === h ? void 0 : h.toLowerCase()))) && !("" !== t.searchCharName && !(null === y || void 0 === y ? void 0 : y.includes(null === (f = t.searchCharName) || void 0 === f ? void 0 : f.toLowerCase())))))
            // })) : e
        }
    },
    methods: {
        setTarget(bool, playerName, steamId, serverId) {
            bool || this.emitter.emit("currentTarget", {
                currentTarget: {
                    playerName: playerName,
                    SteamID: steamId,
                    serverID: serverId
                }
            });
        },
        addRemovePinnedTarget(source) {
            //console.log("playerList addRemovePinnedTarget", source);
            this.emitter.emit("addPinnedTargets", {
                targetSource: source
            });
        },
        changeMain(key) {
            if (key != null) {
                if (key == "arrowdown") {
                    this.playerPos++;
                    if (this.playerPos > this.playerData.length - 1) {
                        this.playerPos = -1;
                    }
                } else {
                    this.playerPos--;
                    if (this.playerPos < -1) {
                        this.playerPos = this.playerData.length - 1;
                    }
                }
                this.isInside = false;
            }
        },
        selectCurrent(data) {
            if (data != null && this.playerPos != -1) {
                const player = this.playerData[this.playerPos];
                if (!player) return;
                this.emitter.emit("currentTarget", {
                    currentTarget: {
                        playerName: player.name,
                        SteamID: player.SteamID,
                        serverID: player.serverID
                    }
                });
            }
        },
        changeInto(key) {
            if (key != null) {
                if (this.playerPos == -1) {
                    if (key == "arrowright" && this.isInside) {
                        this.inputPos++;
                        if (this.inputPos > 1) this.inputPos = 0;
                    } else {
                        this.isInside = true;
                    }

                    const input = "inputContainer_" + this.inputPos;
                    this.$refs[input].focus();
                } else {
                    this.addRemovePinnedTarget(this.playerData[this.playerPos].serverID)
                }
            }
        },
        isPlayerListActive(player) {
            return this.playerPos === player;
        },
    }
};
</script>

<style lang="css" scoped>
ul {
    list-style: none
}

ul li {
    margin-left: .8%;
    margin-right: .8%;
    background-color: hsla(0, 0%, 100%, 0);
    color: #000;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif
}

.headerBar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-shadow: 5px 1px 21px 3px #000;
    box-shadow: 5px 1px 21px 3px #000;
    background: var(--bgPrimary);
    width: 100%
}

.headerBar.active {
    background: #32475c
}

.flexColumn {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column
}

.searchContainer {
    margin: .4%
}

.shrinkSearchContainer {
    width: 95%
}

.childInputsInput {
    background: var(--bgInput);
    font-size: 12px;
    color: #fff;
    height: 50%
}

.currentTarget {
    width: 100%;
    color: var(--textColor);
    -webkit-box-shadow: 5px 1px 21px 3px #202a35;
    box-shadow: 5px 1px 21px 3px #202a35;
    background: var(--bgTarget);
    text-align: center;
    font-size: 15px
}

.customCollapsible {
    width: 98.2%;
    text-align: left;
    text-transform: unset;
    background: #fff;
    color: #000;
    margin-left: 1%;
    padding-bottom: .5%;
    padding-top: .5%;
    padding-left: .5%;
    margin: 0;
    margin-top: .6%;
    font-size: 13px;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex
}

.customCollapsible:hover {
    text-align: left;
    text-transform: unset;
    background: hsla(0, 0%, 44.7%, .644);
    color: #000
}

.customCollapsible.isTargeted {
    background: grey
}

.customCollapsible.active {
    background: #8d98a3
}

.customCollapsible.disconnected {
    background: #272727;
    color: #fff
}

.playerDataText {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    text-transform: capitalize;
    width: 100%
}

.SteamID {
    width: 18%;
    border: 1px solid rgba(0, 0, 0, .247);
    text-align: center;
    background: hsla(0, 0%, 50.2%, .192);
    margin-right: 1%
}

.ServerID {
    width: 5%
}

.Name {
    display: block;
    width: 10%;
    padding-right: 25%;
    margin-right: 1%
}

.CharName {
    width: 20%
}

.queueType {
    margin-left: 1%;
    margin-right: 1%;
    width: 20%
}

.playerDataText.shrink {
    display: grid;
    font-size: 11px
}

.ServerID.shrink {
    width: 5%;
    margin-right: 3.4%
}

.Name.shrink {
    width: 15%;
    margin-right: 4%
}

.SteamID.shrink {
    width: 38%
}

.CharName.shrink {
    width: 25%
}

.steamPinWrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex
}

.pinTarget {
    background: transparent;
    padding: .3%;
    margin: 0;
    line-height: normal;
    height: 100%;
    border: 1px solid rgba(70, 68, 68, .205);
    background: hsla(0, 0%, 50.2%, .493);
    border-radius: none
}

.pinTarget,
.pinTarget:hover {
    text-align: left;
    text-transform: unset;
    color: #000;
    -webkit-box-shadow: none;
    box-shadow: none
}

.pinTarget:hover {
    border: 1px solid rgba(70, 68, 68, .205);
    background: transparent
}

.pinTarget.shrink {
    width: 3.2%
}

.customIcon {
    text-transform: unset;
    font-size: 1rem
}

.shrunkServerNameWrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex
}

.playerDataButtons {
    width: 30%;
    height: 30%;
    float: right;
    margin: 0
}

.dataButtons {
    text-transform: uppercase;
    font-size: 10.5px;
    float: right;
    background: #a7a7a7;
    color: #000;
    margin-right: 5%;
    width: 25%;
    text-align: center;
    padding: 1%;
    border-radius: 4px
}

.dataButtons.shrinkDataButtons {
    width: 40%
}

.dataButtons:hover {
    font-size: 10.5px;
    background: hsla(0, 1.3%, 69%, .644);
    color: #000
}

.dataButtonsInner {
    text-transform: uppercase;
    font-size: 10.5px;
    float: left;
    background: #a7a7a7;
    color: #000;
    text-align: center;
    padding: 4.1%;
    border-radius: 4px
}

.dataButtonsInner:hover {
    font-size: 10.5px;
    background: hsla(0, 1.3%, 69%, .644);
    color: #000
}

.customHeader {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 97.6%;
    padding: .5%;
    margin-bottom: .5%;
    margin-top: .5%;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between
}

.adminBody {
    height: 92%;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden
}

.AdminBodyContainer {
    background: transparent;
    height: 100%;
    width: 96%;
    margin-left: 4%
}

.AdminBodyContainer.shrinkBodyContainer {
    width: 91%;
    margin-left: 9%
}
</style>