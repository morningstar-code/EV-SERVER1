<template>
    <div class="AdminBodyContainer" :class="this.isExpanded ? '' : 'shrinkBodyContainer'">
        <div class="headerBar">
            <div class="searchContainer" :class="this.isExpanded ? '' : 'shrinkSearchContainer'">
                <span style="color: white;">
                    Search: SteamID
                </span>
                <input
                    v-model="searchSteamID"
                    ref="inputContainer_1"
                    class="childInputsInput"
                    placeholder=""
                    @input="event => (searchSteamID = event.target.value)"
                />
            </div>
        </div>
        <div class="adminBody" :class="isExpanded ? '' : 'shrinkAdminBody'">
            <ul :class="isExpanded ? '' : 'shrinkCollapsible'">
                <template v-for="(data, index) in filteredBans">
                    <li
                        :id="index"
                        style="width: 100%;"
                    >
                        <!-- :key="index" -->
                        <div class="customCollapsible">
                            <template v-if="isExpanded">
                                <div class="playerDataText" :class="isExpanded ? '' : 'shrink'">
                                    <div class="issue">
                                        Issue Date: {{ data.from }}
                                    </div>
                                    <div class="unban">
                                        Unban Date: {{ data.until }}
                                    </div>
                                    <div class="Admin">
                                        Admin: {{ data.admin }}
                                    </div>
                                    <div class="Name">
                                        Player: {{ data.name }}
                                    </div>
                                    <div class="SteamID">
                                        {{ data.SteamID }}
                                    </div>
                                    <div class="reason">
                                        Reason: {{ data.reason }}
                                    </div>
                                </div>
                            </template>
                            <template v-if="!isExpanded">
                                <div class="playerDataText" :class="isExpanded ? '' : 'shrink'">
                                    <div class="shrunkServerNameWrapper">
                                        <div class="Name" :class="isExpanded ? '' : 'shrink'">
                                            {{ data.name }}
                                        </div>
                                    </div>
                                    <div class="steamPinWrapper">
                                        <div class="SteamID" :class="isExpanded ? '' : 'shrink'">
                                            {{ data.SteamID }}
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
    name: "BannedList",
    props: ["isExpanded", "bannedList", "emitter"],
    components: {},
    data() {
        return {
            searchSteamID: ""
        }
    },
    mounted() {
        document.addEventListener('DOMContentLoaded', () => {
            const elements = document.querySelectorAll('.collapsible');
            M.Collapsible.init(elements, { accordion: false });
        });
        M.AutoInit();
    },
    computed: {
        filteredBans() {
            const bannedList = this.bannedList;
            return this.searchSteamID ? bannedList.filter((b) => {
                const steamID = b.SteamID.toString();
                if (steamID.includes(this.searchSteamID) && this.searchSteamID !== "") {
                    return true;
                }
            }) : bannedList;
        }
    },
    methods: {}
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
    height: 5%;
    width: 100%
}

.headerBar.active {
    background: #32475c
}

.searchContainer {
    margin: .4%
}

.shrinkSearchContainer {
    width: 30%
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
    background: hsla(0, 0%, 87.5%, .644);
    color: #000
}

.playerDataText {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    text-transform: capitalize;
    width: 100%
}

.SteamID {
    width: 13%;
    border: 1px solid rgba(0, 0, 0, .247);
    text-align: center;
    background: hsla(0, 0%, 50.2%, .192);
    margin-right: 1%
}

.Name {
    display: block;
    width: 15%;
    padding-right: 1%;
    margin-right: 1%
}

.reason {
    width: 20%
}

.Admin,
.issue,
.unban {
    margin-right: 1%;
    width: 15%
}

.playerDataText.shrink {
    display: grid;
    font-size: 11px
}

.Name.shrink {
    width: 15%;
    margin-right: 4%
}

.SteamID.shrink {
    width: 38%
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