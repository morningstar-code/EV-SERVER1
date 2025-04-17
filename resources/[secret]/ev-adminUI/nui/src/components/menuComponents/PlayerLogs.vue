<template>
    <div class="AdminBodyContainer" :class="isExpanded ? '' : 'shrinkBodyContainer'">
        <div class="headerBar" v-if="isExpanded">
            <div class="searchContainer" :class="isExpanded ? '' : 'shrinkSearchContainer'">
                <span style="color: white;">
                    Type
                </span>
                <input
                    v-model="searchType"
                    class="childInputsInput"
                    placeholder=""
                    @input="event => event.target.composing || (searchType = event.target.value)"
                />
            </div>
            <div class="searchContainer" :class="isExpanded ? '' : 'shrinkSearchContainer'">
                <span style="color: white;">
                    SteamID
                </span>
                <input
                    v-model="searchSteamID"
                    class="childInputsInput"
                    placeholder=""
                    @input="event => event.target.composing || (searchSteamID = event.target.value)"
                />
            </div>
            <div class="searchContainer" :class="isExpanded ? '' : 'shrinkSearchContainer'">
                <span style="color: white;">
                    CID
                </span>
                <input
                    v-model="searchCID"
                    class="childInputsInput"
                    placeholder=""
                    @input="event => event.target.composing || (searchCID = event.target.value)"
                />
            </div>
            <div class="playerDataButtons">
                <div class="searchButtons waves-effect waves-light btn" @click="cleanSearch()">
                    Search
                </div>
                <div class="searchButtons waves-effect waves-light btn" @click="previousPage()">
                    Previous
                </div>
                <span class="logsPage">
                    {{ currentPage + 1 }}
                </span>
                <div class="searchButtons waves-effect waves-light btn" @click="nextPage()">
                    Next
                </div>
            </div>
        </div>
        <div v-if="isExpanded" ref="adminBody" class="adminBody" :class="isExpanded ? '' : 'shrinkAdminBody'">
            <table :class="isExpanded ? '' : 'shrinkCollapsible'">
                <tr>
                    <th>
                        Type
                    </th>
                    <th>
                        SteamID
                    </th>
                    <th>
                        Log
                    </th>
                    <th>
                        Date
                    </th>
                    <th>
                        CID
                    </th>
                    <th>
                        DATA
                    </th>
                </tr>
                <template v-for="(data, index) in playerLogs">
                    <tr
                        :id="index"
                        style="width: 100%;"
                    >
                        <!-- :key="index" -->
                        <td>
                            {{ data.type }}
                        </td>
                        <td>
                            {{ data.steamid }}
                        </td>
                        <td>
                            {{ data.log }}
                        </td>
                        <td>
                            {{ data.date }}
                        </td>
                        <td>
                            {{ data.cid }}
                        </td>
                        <td>
                            {{ data.data }}
                        </td>
                    </tr>
                </template>
            </table>
        </div>
        <div class="LogsErrorText" :class="isExpanded ? 'hide' : ''">
            Sorry, No logs in this format, could not get it to display nicely with all the information. Maybe a future date.
        </div>
    </div>
</template>

<script lang="js">
import { nextTick } from '@vue/runtime-core';
import * as M from 'materialize-css';
import Nui from '../../utils/Nui';

function V(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: true,
        configurable: true,
        writable: true
    }) : t[e] = n, t
}

function z(t, e) {
    var n = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(t);
        e && (i = i.filter((function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
        }))), n.push.apply(n, i)
    }
    return n
}

function q(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2 ? z(Object(n), true).forEach((function (e) {
            V(t, e, n[e])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : z(Object(n)).forEach((function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
        }))
    }
    return t
}

export default {
    name: "PlayerLogs",
    props: ["isExpanded", "playerLogs", "emitter"],
    components: {},
    data: () => {
        return {
            searchType: "",
            searchSteamID: "",
            searchCID: "",
            currentPage: 0,
            currentSearchParams: null
        }
    },
    watch: {
        playerLogs: {
            immediate: true,
            handler() {
                nextTick(() => {
                    this.$refs.adminBody.scrollTop = 0;
                });
            }
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
        hasNextPage() {
            return this.playerLogs.length === 100 && this.currentPage < 9;
        },
        hasPreviousPage() {
            return this.currentPage > 0;
        }
    },
    methods: {
        cleanSearch() {
            this.currentPage = 0;
            this.currentSearchParams = {
                type: this.searchType,
                steamid: this.searchSteamID,
                cid: this.searchCID,
                limit: 100,
                offset: 100 * this.currentPage
            };
            this.search();
        },
        search() {
            const searchParam = q(q({}, this.currentSearchParams), {}, {
                offset: 100 * this.currentPage
            });
            Nui.post("https://ev-admin/adminMenu", JSON.stringify({
                action: "updatePlayerLogs",
                searchParam: searchParam
            }));
        },
        nextPage() {
            this.currentPage++;
            this.search();
        },
        previousPage() {
            this.currentPage--;
            this.search();
        }
    }
};
</script>

<style lang="css" scoped>
table,
td,
th {
    border: 1px solid #000;
    padding: .2%;
    padding-left: .4%
}

table {
    color: #fff;
    width: 100%;
    border-collapse: collapse
}

.collapsible li.active i {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    top: 8%;
    -webkit-transition: all .2s;
    transition: all .2s
}

.collapsible li i {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    top: 20%;
    -webkit-transition: all .2s;
    transition: all .2s
}

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

.playerLogText {
    text-transform: capitalize
}

.LogsErrorText {
    font-size: 20px;
    text-align: center;
    color: #fff;
    top: 50%
}

.dataButtons:hover {
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

.adminBody {
    overflow-y: scroll;
    height: 95%
}

.customIcon {
    margin-left: 1%;
    margin-right: .2%;
    bottom: 0
}

.playerDataButtons {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    gap: 8px;
    right: 0
}

.searchButtons {
    padding: 0 2%;
    font-size: 11.5px;
    text-transform: unset;
    background: var(--btn);
    color: #000
}

.searchButtons:hover {
    text-transform: unset;
    background: var(--btnHover);
    color: #000
}

.logsPage {
    color: #fff
}
</style>