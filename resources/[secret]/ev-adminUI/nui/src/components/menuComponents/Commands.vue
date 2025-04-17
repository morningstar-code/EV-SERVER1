<template>
    <div class="AdminBodyContainer" :class="this.isExpanded ? '' : 'shrinkBodyContainer'">
        <div class="headerBar" :class="isCommandActive(header) ? 'active' : ''">
            <ul class="tabs">
                <input
                    type="radio"
                    name="tabs"
                    id="All"
                    checked="checked"
                    @change="event => tabChanged(event, 0)"
                />
                <label for="All">All</label>

                <input
                    type="radio"
                    name="tabs"
                    id="Player"
                    @change="event => tabChanged(event, 1)"
                />
                <label for="Player">Player</label>

                <input
                    type="radio"
                    name="tabs"
                    id="Utility"
                    @change="event => tabChanged(event, 2)"
                />
                <label for="Utility">Utility</label>

                <input
                    type="radio"
                    name="tabs"
                    id="User"
                    @change="event => tabChanged(event, 3)"
                />
                <label for="User">User</label>
            </ul>
            <input
                v-model="searchInputValue"
                id="searchInput"
                class="searchInput"
                placeholder="Begin typing to filter commands"
                @input="handleInput"
                @keydown="handleKeydown"
            />
        </div>
        <template v-if="currentTarget && currentTarget.playerName">
            <div class="currentTarget">
                Current Target: ({{ currentTarget.serverID }}) {{ currentTarget.playerName }} [{{ currentTarget.SteamID }}]
            </div>
        </template>
        <div id="scrollContainer" class="adminBody" :class="isExpanded ? '' : 'shrinkAdminBody'">
            <ul class="collapsible commandWrapper" :class="isExpanded ? '' : 'shrinkCollapsible'">
                <template v-for="(data, i) in menuDataComputed">
                    <li
                        v-if="hasChild(data)"
                        :id="data.command.title"
                        style="width: 100%;"
                        @click="changeTo(data.command.title)"
                    >
                        <div
                            class="collapsible-header customHeader"
                            :class="[isExpanded ? '' : 'shrink', isCommandActive(data.command.title) ? 'active' : '', i % 2 === 1 ? 'odd-cell' : '', i % 2 === 0 ? 'even-cell' : '']"
                        >
                            <template v-if="!isFav(data.command.title)">
                                <i class="favWrapper far fa-star" @click="changeFav(data.command.title)" />
                            </template>
                            <template v-if="isFav(data.command.title)">
                                <i class="favWrapper fas fa-star" style="color: yellow;" @click="changeFav(data.command.title)" />
                            </template>
                            <div class="mainCommandWarraper" :class="isExpanded ? '' : 'shrinkMainCommand'">
                                {{ data.command.title }}
                            </div>
                            <div v-if="isExpanded" class="optionCommandWrapper" />
                            <i class="tiny material-icons customIcon">
                                expand_less
                            </i>
                        </div>
                        <div class="collapsible-body customBody">
                            <div class="inputWrapper" :class="isExpanded ? '' : 'shrink'">
                                <template v-if="data.command.child.inputs || data.command.child.checkBox != null">
                                    <ul class="childInputs" :class="isExpanded ? '' : 'shrink'">
                                        <template v-for="(input, idx) in data.command.child.inputs">
                                            <li
                                                :id="idx"
                                                style="width: 100%;"
                                            >
                                                <template v-if="input != 'TargetNot' && input != 'VehicleOP'">
                                                    <span style="color: white;">
                                                        {{ input }}:
                                                    </span>
                                                </template>
                                                <template v-if="input == 'TargetNot'">
                                                    <span style="color: white;">
                                                        Target (Not Required):
                                                    </span>
                                                </template>
                                                <template v-if="input == 'VehicleOP'">
                                                    <span style="color: white;">
                                                        Vehicle Overwrite:
                                                    </span>
                                                </template>
                                                <template v-if="input == 'Weather'">
                                                    <span style="color: white;">
                                                    </span>
                                                </template>
                                                <div class="inputBody">
                                                    <template v-if="!dropDownList.includes(input) || commandInputs[data.command.title] != null">
                                                        <input
                                                            v-model="commandInputs[data.command.title][input]"
                                                            :ref="idx + 'CInput' + i"
                                                            class="childInputsInput"
                                                            :class="isExpanded ? '' : 'shrink'"
                                                            placeholder=""
                                                            v-if="!dropDownList.includes(input)"
                                                        />
                                                        <div class="dropdownClamp" :class="isExpanded ? '' : 'shrink'">
                                                            <template v-if="input == 'Target'">
                                                                <model-list-select
                                                                    v-model="player"
                                                                    :ref="idx + 'CInput' + i"
                                                                    :list="playerData"
                                                                    optionValue="serverID"
                                                                    :customText="playerText"
                                                                    placeholder="Select Target"
                                                                />
                                                            </template>
                                                            <template v-if="input == 'TargetNot'">
                                                                <model-list-select
                                                                    v-model="player"
                                                                    :ref="idx + 'CInput' + i"
                                                                    :list="playerData"
                                                                    optionValue="serverID"
                                                                    :customText="playerText"
                                                                    placeholder="Select Target (Not Required)"
                                                                />
                                                            </template>
                                                            <template v-if="input == 'Item'">
                                                                <model-list-select
                                                                    v-model="dropDownData.Item"
                                                                    :ref="idx + 'CInput' + i"
                                                                    :list="itemList"
                                                                    optionValue="id"
                                                                    :customText="itemText"
                                                                    placeholder="Select Item"
                                                                />
                                                            </template>
                                                            <template v-if="input == 'Vehicle'">
                                                                <model-list-select
                                                                    v-model="dropDownData.Vehicle"
                                                                    :ref="idx + 'CInput' + i"
                                                                    :list="vehicleList"
                                                                    optionValue="model"
                                                                    :customText="vehicleText"
                                                                    placeholder="Select Vehicle"
                                                                />
                                                            </template>
                                                            <template v-if="input == 'Job'">
                                                                <model-list-select
                                                                    v-model="dropDownData.Job"
                                                                    :ref="idx + 'CInput' + i"
                                                                    :list="jobList"
                                                                    optionValue="job"
                                                                    :customText="jobText"
                                                                    placeholder="Select Job"
                                                                />
                                                            </template>
                                                            <template v-if="input == 'License'">
                                                                <model-list-select
                                                                    v-model="dropDownData.License"
                                                                    :ref="idx + 'CInput' + i"
                                                                    :list="licenseList"
                                                                    optionValue="licenseID"
                                                                    :customText="licenseText"
                                                                    placeholder="Select License"
                                                                />
                                                            </template>
                                                            <template v-if="input == 'Weather'">
                                                                <model-list-select
                                                                    v-model="dropDownData.Weather"
                                                                    :ref="idx + 'CInput' + i"
                                                                    :list="weatherList"
                                                                    optionValue="Name"
                                                                    optionText="Name"
                                                                    placeholder="Select Weather"
                                                                />
                                                            </template>
                                                            <template v-if="input == 'Gang'">
                                                                <model-list-select
                                                                    v-model="dropDownData.Gang"
                                                                    :ref="idx + 'CInput' + i"
                                                                    :list="gangList"
                                                                    optionValue="Id"
                                                                    optionText="Name"
                                                                    placeholder="Select Gang"
                                                                />
                                                            </template>
                                                            <template v-if="input == 'Sound'">
                                                                <model-list-select
                                                                    v-model="dropDownData.Sound"
                                                                    :ref="idx + 'CInput' + i"
                                                                    :list="soundList"
                                                                    optionValue="Id"
                                                                    optionText="Name"
                                                                    placeholder="Select Sound"
                                                                />
                                                            </template>
                                                            <template v-if="input == 'Garage'">
                                                                <model-list-select
                                                                    v-model="dropDownData.Garage"
                                                                    :ref="idx + 'CInput' + i"
                                                                    :list="garageList"
                                                                    optionValue="garage_id"
                                                                    :customText="garageText"
                                                                    placeholder="Select Garage"
                                                                />
                                                            </template>
                                                            <template v-if="input == 'VehiclePreset'">
                                                                <model-list-select
                                                                    v-model="dropDownData.VehiclePreset"
                                                                    :ref="idx + 'CInput' + i"
                                                                    :list="vehiclePresetList"
                                                                    optionValue="preset_id"
                                                                    :customText="vehiclePresetText"
                                                                    placeholder="Select Preset"
                                                                />
                                                            </template>
                                                            <template v-if="input == 'TwatHandler'">
                                                                <model-list-select
                                                                    v-model="dropDownData.TwatHandler"
                                                                    :ref="idx + 'CInput' + i"
                                                                    :list="twatHandlers"
                                                                    optionValue="Id"
                                                                    optionText="Name"
                                                                    placeholder="Select TwatHandler"
                                                                />
                                                            </template>
                                                            <template v-if="input == 'Length'">
                                                                <model-list-select
                                                                    v-model="dropDownData.Length"
                                                                    :ref="idx + 'CInput' + i"
                                                                    :list="banLengthList"
                                                                    optionValue="id"
                                                                    optionText="name"
                                                                    placeholder="Select Length"
                                                                />
                                                            </template>
                                                        </div>
                                                    </template>
                                                </div>
                                            </li>
                                        </template>
                                        <template v-for="(input, idx) in data.command.child.checkBox">
                                            <li
                                                :id="idx + 999"
                                            >
                                                <p>
                                                    <label>
                                                        <input
                                                            :id="input"
                                                            class="checkBox"
                                                            type="checkbox"
                                                        />
                                                        <span
                                                            class="checkBox"
                                                            :class="isCheckboxActive(data.command.title, idx) ? 'active' : ''"
                                                        >
                                                            {{ input }}
                                                        </span>
                                                    </label>
                                                </p>
                                            </li>
                                        </template>
                                        <template v-for="(input, idx) in data.command.child.triggers">
                                            <li
                                                :id="idx + 999"
                                            >
                                                <div
                                                    class="triggerBtn waves-effect waves-light btn"
                                                    :class="[isExpanded ? '' : 'shrink', isTriggerActive(data.command.title, idx) ? 'active' : '']"
                                                    @click="runEvent(input.event)"
                                                >
                                                    {{ input.name }}
                                                </div>
                                            </li>
                                        </template>
                                    </ul>
                                </template>
                            </div>
                            <div
                                    class="customCollapsibleInner waves-effect waves-light btn"
                                    :class="[isExpanded ? '' : 'shrink', isCommandButtonActive(data.command.title) ? 'active' : '']"
                                    @click="runCommand(data.command.title)"
                                >
                                    {{ data.command.title }}
                            </div>
                        </div>
                    </li>
                    <li
                        v-if="!hasChild(data)"
                        :id="data.command.title"
                        style="width: 100%;"
                        @click="changeTo(data.command.title)"
                    >
                        <div
                            class="customCollapsible customHeader"
                            :class="[data.command.child ? 'toggleTrue' : '', isCommandActive(data.command.title) ? 'active' : '', i % 2 === 1 ? 'odd-cell' : '', i % 2 === 0 ? 'even-cell' : '']"
                        >
                            <template v-if="!isFav(data.command.title)">
                                <i class="favWrapperOther far fa-star" :class="isExpanded ? '' : 'shrink'" @click="changeFav(data.command.title)" />
                            </template>
                            <template v-if="isFav(data.command.title)">
                                <i class="favWrapperOther fas fa-star" :class="isExpanded ? '' : 'shrink'" style="color: yellow;" @click="changeFav(data.command.title)" />
                            </template>
                            <div class="otherWrapper">
                                <template v-if="data.command.child != null">
                                    <div
                                        class="customCollapsibleButton mainCommandWarraperButton waves-effect waves-light btn"
                                        :class="isExpanded ? '' : 'shrinkMainCommand'"
                                        @click="updateCommandState(data)"
                                    >
                                        {{ data.command.title }}
                                    </div>
                                </template>
                                <template v-if="data.command.child == null">
                                    <div
                                        class="customCollapsibleButton mainCommandWarraperButton waves-effect waves-light btn"
                                        :class="isExpanded ? '' : 'shrinkMainCommand'"
                                        @click="runCommand(data.command.title)"
                                    >
                                        {{ data.command.title }}
                                    </div>
                                </template>
                                <template v-if="!(!isExpanded || data.command.child == null && data.options.bindKey == null)">
                                    <template v-if="data.options.bindKey != null">
                                        <div class="optionCommandWrapperButton">
                                            <div>
                                                <div class="dropDownOptions">
                                                    <model-list-select
                                                        class="inlineToCommand"
                                                        v-model="dummyMenuDataOptions[data.command.title]"
                                                        :list="menuData.find(x => x.command.title == data.command.title).options.bindKey.options"
                                                        optionValue="text"
                                                        :customText="codeAndNameAndDesc"
                                                        placeholder="Bound to :"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </template>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script lang="js">
import * as M from 'materialize-css';
import Nui from '../../utils/Nui';
import "vue-search-select/dist/VueSearchSelect.css";
import { ModelListSelect } from "vue-search-select";

function c(t, e, n, i, o, r, s) {
    try {
        var a = t[r](s),
            c = a.value
    } catch (l) {
        return void n(l)
    }
    a.done ? e(c) : Promise.resolve(c).then(i, o)
}

function l(t) {
    return function () {
        var e = this,
            n = arguments;
        return new Promise((function (i, o) {
            var r = t.apply(e, n);

            function s(t) {
                c(r, i, o, s, a, "next", t)
            }

            function a(t) {
                c(r, i, o, s, a, "throw", t)
            }
            s(void 0)
        }))
    }
}

export default {
    name: "Commands",
    //props: ["currentTarget", "isExpanded", "playerData", "menuData", "itemList", "vehicleList", "jobList", "licenseList", "favCommands", "garageList", "vehiclePresetList", "emitter"],
    props: {
        currentTarget: {
            type: Object
        },
        isExpanded: {
            type: Boolean
        },
        playerData: {
            type: Array
        },
        menuData: {
            type: Array
        },
        itemList: {
            type: Array
        },
        vehicleList: {
            type: Array
        },
        jobList: {
            type: Array
        },
        licenseList: {
            type: Array
        },
        favCommands: {
            type: Array
        },
        garageList: {
            type: Array
        },
        vehiclePresetList: {
            type: Array
        },
        emitter: {
            type: Object
        }
    },
    components: {
        ModelListSelect
    },
    data() {
        return {
            player: "",
            currentTab: "All",
            commandInputs: {},
            dummyMenuDataOptions: {},
            lastGeneration: {},
            tabNames: [{
                Name: "All"
            }, {
                Name: "Player"
            }, {
                Name: "Utility"
            }, {
                Name: "User"
            }],
            tabPos: 0,
            commandPos: 0,
            commandLastCmTable: [],
            commandLastTab: "",
            searchInputValue: "",
            menuDataFiltered: [],
            insideCommand: false,
            insidePos: -1,
            lastRef: ["", ""],
            weatherList: [{
                Name: "Very Sunny"
            }, {
                Name: "Mostly Clear"
            }, {
                Name: "Partly Cloudy"
            }, {
                Name: "Murky Skies"
            }, {
                Name: "Overcast"
            }, {
                Name: "Heavy Fog"
            }, {
                Name: "Mostly Cloudy"
            }, {
                Name: "Misty"
            }, {
                Name: "Windy"
            }, {
                Name: "Drizzling"
            }, {
                Name: "Rain Showers"
            }, {
                Name: "Downpour"
            }, {
                Name: "Thunderstorms"
            }, {
                Name: "Heavy Thunderstorms"
            }, {
                Name: "Light Thunderstorms"
            }, {
                Name: "Clearing"
            }, {
                Name: "Light Snow"
            }, {
                Name: "Heavy Snow"
            }, {
                Name: "Snow Blizzard"
            }, {
                Name: "Snowy"
            }, {
                Name: "Snow"
            }, {
                Name: "Heavy Snowstorm"
            }, {
                Name: "Light Snowfall"
            }, {
                Name: "Snowfall"
            }, {
                Name: "Halloween"
            }],
            gangList: [{
                Name: "Ballas",
                Id: "ballas"
            }, {
                Name: "Chang Gang",
                Id: "cg"
            }, {
                Name: "GSF",
                Id: "gsf"
            }, {
                Name: "Kingz",
                Id: "kingz"
            }, {
                Name: "Mandem",
                Id: "mandem"
            }, {
                Name: "Vagos",
                Id: "vagos"
            }, {
                Name: "BBMC",
                Id: "bbmc"
            }, {
                Name: "BSK",
                Id: "bsk"
            }, {
                Name: "HOA",
                Id: "hoa"
            }, {
                Name: "NBC",
                Id: "nbc"
            }, {
                Name: "Seaside",
                Id: "seaside"
            }, {
                Name: "Angels",
                Id: "angels"
            }, {
                Name: "Lost MC",
                Id: "lostmc"
            }, {
                Name: "Hydra",
                Id: "hydra"
            }, {
                Name: "St",
                Id: "st"
            }, {
                Name: "Guild",
                Id: "guild"
            }, {
                Name: "Ron Corp",
                Id: "ron"
            }, {
                Name: "Michael was here",
                Id: "michael"
            }, {
                Name: "Dice God",
                Id: "dicegod"
            }, {
                Name: "Gulag Gang",
                Id: "gg"
            }, {
                Name: "Street Crime Unit",
                Id: "scu"
            }, {
                Name: "Mayhem",
                Id: "mayhem"
            }, {
                Name: "BCF",
                Id: "bcf"
            }, {
                Name: "RUST",
                Id: "rust"
            }, {
                Name: "Pitchers",
                Id: "pitchers"
            }, {
                Name: "Marabunta",
                Id: "marabunta"
            }, {
                Name: "Yokai",
                Id: "yokai"
            }, {
                Name: "Ratboi",
                Id: "ratboi"
            }, {
                Name: "Pride",
                Id: "pride"
            }, {
                Name: "Royal Mafia",
                Id: "rm"
            }, {
                Name: "The Hidden",
                Id: "hidden"
            }, {
                Name: "SAINTS",
                Id: "saints"
            }, {
                Name: "Baba Yaga",
                Id: "baba_yaga"
            }, {
                Name: "(P) bowlcutgang",
                Id: "public_bowlcutgang"
            }, {
                Name: "(P) dirtybois",
                Id: "public_dirtybois"
            }, {
                Name: "(P) eastsidekingz",
                Id: "public_eastsidekingz"
            }, {
                Name: "(P) innercircle",
                Id: "public_innercircle"
            }, {
                Name: "(P) lafamilia",
                Id: "public_lafamilia"
            }, {
                Name: "(P) northsidelegion",
                Id: "public_northsidelegion"
            }, {
                Name: "(P) royalblack",
                Id: "public_royalblack"
            }, {
                Name: "(P) saints",
                Id: "public_saints"
            }, {
                Name: "(P) sinistersoulsmc",
                Id: "public_sinistersoulsmc"
            }, {
                Name: "(P) skullgang",
                Id: "public_skullgang"
            }, {
                Name: "(P) spanonis",
                Id: "public_spanonis"
            }, {
                Name: "(P) thecontientalfamily",
                Id: "public_thecontientalfamily"
            }, {
                Name: "(P) thelegion",
                Id: "public_thelegion"
            }, {
                Name: "(P) theroadmen",
                Id: "public_theroadmen"
            }, {
                Name: "(P) yokai",
                Id: "public_yokai"
            }, {
                Name: "(P) blackdogs",
                Id: "public_blackdogs"
            }, {
                Name: "(P) bubblebois",
                Id: "public_bubblebois"
            }, {
                Name: "(P) aztecas",
                Id: "public_aztecas"
            }, {
                Name: "(SPA) Royal Mafia",
                Id: "spain_rm"
            }, {
                Name: "(SPA) Gambino",
                Id: "spain_gambino"
            }, {
                Name: "(TEMP) Placeholder 1",
                Id: "placeholder_01"
            }, {
                Name: "(TEMP) Placeholder 2",
                Id: "placeholder_02"
            }, {
                Name: "(TEMP) Placeholder 3",
                Id: "placeholder_03"
            }, {
                Name: "(TEMP) Placeholder 4",
                Id: "placeholder_04"
            }, {
                Name: "(TEMP) Placeholder 5",
                Id: "placeholder_05"
            }],
            soundList: [{
                Name: "Reverby Fart",
                Id: "fart",
                Bank: "GENERAL_GENERAL"
            }, {
                Name: "Fart",
                Id: "variant-fart",
                Bank: "GENERAL_GENERAL"
            }, {
                Name: "Wet Fart",
                Id: "wet-fart",
                Bank: "GENERAL_GENERAL"
            }, {
                Name: "Snake",
                Id: "hiss",
                Bank: "GENERAL_SNAKE"
            }, {
                Name: "Snake Variant",
                Id: "hiss-variant",
                Bank: "GENERAL_SNAKE"
            }, {
                Name: "Snake Rattle",
                Id: "rattle",
                Bank: "GENERAL_SNAKE"
            }],
            twatHandlers: [{
                Name: "All",
                Id: "all"
            }, {
                Name: "Russians",
                Id: "russians"
            }],
            banLengthList: [{
                id: "1",
                name: "1 Day"
            }, {
                id: "5",
                name: "5 Days"
            }, {
                id: "10",
                name: "10 Days"
            }, {
                id: "30",
                name: "30 Days"
            }, {
                id: "60",
                name: "60 Days"
            }, {
                id: "90",
                name: "90 Days"
            }],
            dropDownList: ["Weather", "Gang", "License", "TargetNot", "Job", "Vehicle", "VehiclePreset", "Item", "Target", "Fart", "Garage", "Sound", "TwatHandler", "Length"],
            dropDownData: {
                Item: "",
                Vehicle: "",
                VehiclePreset: "",
                Job: "",
                License: "",
                Weather: "",
                Gang: "",
                Fart: "",
                Garage: "",
                Sound: "",
                TwatHandler: "",
                Length: "",
            }
        }
    },
    mounted() {
        const thisKeyWord = this;
        this.$root.log("Commands mounted", this.menuData);
        this.emitter.on("clearInputsOnExit", function() {
            thisKeyWord.clearInputsOnExit();
        });
        this.emitter.on("controlTriggered", (data) => {
            //console.log("Commands controlTriggered");
            if (data.rendering === "commands") {
                const key = data.key;
                switch (data.event) {
                    case "changeTab":
                        this.changeTab(key);
                        break;
                    case "changeMain":
                        this.changeMain(key);
                        break;
                    case "changeInto":
                        this.changeInto(key);
                        break;
                    case "changeOut":
                        this.changeOut(key);
                        break;
                    case "selectCurrent":
                        this.selectCurrent(key);
                        break;
                    case "keyInput":
                        this.keyInput(key, false, data.data);
                        break;
                    default:
                }
            }
        });
        const elements = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elements, { accordion: false });
        this.menuDataComputed = this.filterMenuData();
    },
    computed: {
        menuDataComputed: {
            get() {
                //console.log("menuDataComputed get");
                if (Object.keys(this.commandInputs).length === 0 && Object.keys(this.menuData).length > 0) {
                    //console.log("menuDataComputed commandInputs empty");
                    this.sortMenu();
                    this.generateDummyOptions();
                    this.generateCommandInputs();
                    this.changeMain();
                }
                return this.menuDataFiltered;
            },
            set(value) {
                //console.log("menuDataComputed set");
                this.menuDataFiltered = value;
            }
        },
        console: () => console
    },
    methods: {
        handleInput(event) {
            if (!event.target.composing) {
                this.searchInputValue = event.target.value;
            }
            this.searchHandle(event);
        },
        handleKeydown(event) {
            this.searchInput(event);
        },
        filterMenuData() {
            this.commandLastCmTable = this.commandLastCmTable.filter((c) => {
                return !this.searchInputValue || c.title.toLowerCase().includes(this.searchInputValue.toLowerCase());
            });
            return this.menuData.filter((m) => {
                return this.searchInputValue ? m.command.title.toLowerCase().includes(this.searchInputValue.toLowerCase()) : this.currentTab == "All" || (m.command.cat == this.currentTab || void 0);
            }).sort((a, b) => {
                return this.isFav(b.command.title) - this.isFav(a.command.title);
            });
        },
        clearInputsOnExit() {
            this.commandInputs = {};
            this.dummyMenuDataOptions = {};
            this.lastGeneration = {};
            this.tabPos = 0;
            this.commandPos = 0;
            this.commandLastCmTable = [];
            this.commandLastTab = "";
            this.insideCommand = false;
            this.insidePos = -1;
            this.sortedMenu = null;
            this.searchInputValue = "";
            document.getElementById("searchInput").value = "";
        },
        generateDummyOptions() {
            if (!(Object.keys(this.dummyMenuDataOptions).length > 1 && JSON.stringify(this.dummyMenuDataOptions) === JSON.stringify(this.lastGeneration))) {
                const dummyMenuDataOptions = {};
                for (const key in this.sortedMenu) {
                    const command = this.sortedMenu[key].options;
                    if (command != null && command.bindKey != null) {
                        dummyMenuDataOptions[this.sortedMenu[key].command.title] = command.bindKey.value
                    }
                }
                this.dummyMenuDataOptions = dummyMenuDataOptions;
            }
        },
        generateCommandInputs() {
            const commandInputs = {};

            this.$root.log("sortedMenu", this.sortedMenu);

            for (const key in this.sortedMenu) {
                //console.log("looping sorted menu", key);
                const command = this.sortedMenu[key].command;
                if (this.hasChild(this.sortedMenu[key])) {
                    const commandChildInputs = {};
                    for (const idx in command.child.inputs) commandChildInputs[command.child.inputs[idx]] = "";
                    commandInputs[command.title] = commandChildInputs;
                }
            }

            this.$root.log("generateCommandInputs", commandInputs);

            this.commandInputs = commandInputs;
        },
        codeAndNameAndDesc(data) {
            return `Bound to : ${data.text}`;
        },
        playerText(data) {
            return `(${data.serverID}) ${data.name} [${data.SteamID}]`;
        },
        itemText(data) {
            return `${data.id} [${data.name}]`;
        },
        vehicleText(data) {
            return `${data.model} [${data.name}]`;
        },
        jobText(data) {
            return `${data.job} [${data.name}]`;
        },
        licenseText(data) {
            return `${data.licenseID} [${data.name}]`;
        },
        garageText(data) {
            return `${data.name} [${data.garage_id}]`;
        },
        vehiclePresetText(data) {
            return `${data.preset_id} [${data.vehicle_model}]`;
        },
        banLengthText(data) {
            return `${data.name}`;
        },
        tabChanged(event, id) {
            this.tabPos = id;
            this.currentTab = event.target.id;
            this.menuDataComputed = this.filterMenuData();
        },
        searchInput(event) {
            if ("escape" === event.key.toLowerCase()) return event.preventDefault(), void document.getElementById("searchInput").blur();
        },
        searchHandle() {
            this.keyInput("", true);
        },
        hasChild(data) {
            const child = data.command.child;
            return child != null && (child.inputs != null || child.checkBox != null);
        },
        updateCommandState(data) {
            data.command.child = !data.command.child;
            Nui.post("https://ev-admin/adminMenu", JSON.stringify({
                action: "updateCommandState",
                commandAction: data.command.action,
                commandData: {
                    toggle: data.command.child
                }
            }));
        },
        runCommand(command) {
            //console.log("runCommand", command);

            const foundCommand = this.menuData.find((m) => {
                return m.command.title == command;
            }).command;

            this.$root.log("foundCommand", foundCommand);

            const commandInput = this.commandInputs[foundCommand.title];

            this.$root.log("commandInput before", commandInput);

            this.$root.log("commandInputs", this.commandInputs);

            this.$root.log("playerData", this.playerData);
            
            if (foundCommand.child && foundCommand.child.inputs && (foundCommand.child.inputs.includes("Target") || foundCommand.child.inputs.includes("TargetNot"))) {
                const foundTarget = this.playerData.find((p) => {
                    return parseInt(p.serverID, 10) == parseInt(this.currentTarget.serverID, 10);
                });
                foundTarget && (commandInput.Target = {
                    source: foundTarget.serverID,
                    steamid: foundTarget.SteamID,
                    name: foundTarget.name,
                    queueType: foundTarget.queueType
                }); //foundTarget.SteamID
            }

            //error is in this if statement
            if (foundCommand.child && foundCommand.child.inputs) {
                const r = (t) => {
                    var o, r, s = foundCommand.child.inputs[t];
                    "Target" != s && "TargetNot" != s && this.dropDownData[s] && (this.dropDownData[s].length > 0 && (commandInput[s] = this.dropDownData[s], "Sound" === s && (commandInput["Bank"] = null !== (o = null === (r = this.soundList.find((function (t) {
                        return t.Id === this.dropDownData[s]
                    }))) || void 0 === r ? void 0 : r.Bank) && void 0 !== o ? o : "GENERAL_GENERAL")))
                };
                for (var s in foundCommand.child.inputs) r(s)
            }

            if (foundCommand.child && foundCommand.child.checkBox) {
                for (const key in foundCommand.child.checkBox) {
                    const checkBox = foundCommand.child.checkBox[key];

                    //console.log("checkBox", checkBox);

                    commandInput[checkBox] = document.getElementById(checkBox).checked
                }
            }

            this.$root.log("commandInput after", commandInput);

            Nui.post("https://ev-admin/runCommandMenu", JSON.stringify({
                data: commandInput,
                action: foundCommand.action
            }));
        },
        runEvent(event) {
            Nui.post("https://ev-admin/adminMenu", JSON.stringify({
                action: "runEvent",
                event: event
            }));
        },
        changeTab(pos) {
            this.tabPos = Number(pos - 1);
            const name = this.tabNames[this.tabPos].Name;
            document.getElementById(name).checked = true;
            this.currentTab = name;
            this.menuDataComputed = this.filterMenuData();
            this.insideCommand = false;
        },
        changeMain(key) {
            if (this.insideCommand) {
                this.changeInside(key);
            } else {
                if (this.currentTab !== this.commandLastTab) {
                    this.commandLastTab = this.currentTab;
                    this.commandLastCmTable = [];
                    for (const key in this.sortedMenu) {
                        const m = this.sortedMenu[key];
                        if (m.command.cat == this.currentTab || this.currentTab == "All") {
                            let type = 0;
                            const hasTarget = [];
                            if (this.hasChild(m) && (type = 1, m.command.child.inputs)) {
                                for (const idx in m.command.child.inputs) {
                                    const input = m.command.child.inputs[idx];
                                    switch (input) {
                                        case "Target":
                                        case "TargetNot":
                                        case "Item":
                                        case "Vehicle":
                                        case "VehiclePreset":
                                        case "Job":
                                        case "Garage":
                                        case "License":
                                            hasTarget.push(idx);
                                            break;
                                        default:
                                    }
                                }
                            }

                            this.commandLastCmTable.push({
                                title: m.command.title,
                                type: type,
                                hasTarget: hasTarget
                            });
                        }
                    }
                }
                if (key != null) {
                    if (key == "arrowdown") {
                        this.commandPos++;
                        if (this.commandPos > this.commandLastCmTable.length - 1) {
                            this.commandPos = 0;
                        }
                    } else {
                        this.commandPos--;
                        if (this.commandPos < 0) {
                            this.commandPos = this.commandLastCmTable.length - 1
                        }
                    }
                    const element = document.getElementById(this.commandLastCmTable[this.commandPos].title);
                    if (element) {
                        const offsetTop = element.offsetTop;
                        document.getElementById("scrollContainer").scrollTop = offsetTop - document.getElementById("scrollContainer").offsetHeight / 4;
                    }
                }
            }
        },
        sortMenu() {
            this.$root.log("sortMenu menuData", this.menuData);

            const filtered = this.menuData.filter((m) => {
                return this.currentTab == "All" || (m.command.cat == this.currentTab);
            });

            this.$root.log("sortMenu filtered", filtered);

            const sorted = filtered.sort((a, b) => {
                return this.isFav(b.command.title) - this.isFav(a.command.title);
            });

            this.$root.log("sortMenu sorted", sorted);

            this.sortedMenu = sorted;
            return this.sortedMenu;
        },
        hasTarget() {
            return !!this.commandLastCmTable[this.commandPos].hasTarget.includes("" + this.insidePos)
        },
        changeInto(key) {
            if (key != null) {
                const elements = document.querySelectorAll("ul.collapsible");

                for (const element of elements) {
                    const el = elements[element];
                    if (el != null) {
                        const instance = M.Collapsible.getInstance(el);
                        if (instance != null && this.commandLastCmTable[this.commandPos].type == 1) {
                            instance.open(this.commandPos);
                        }
                    }
                }

                const ref = "0CInput" + this.commandPos;
                this.insidePos = 0;
                if (this.$refs[ref]) {
                    if (this.hasTarget()) {
                        this.$refs[ref][0].$children[0].$refs["input"].focus();
                        this.lastRef = [ref, "dropdown"]
                    } else {
                        this.$refs[ref][0].focus();
                        this.lastRef = [ref, "dropdown"]
                    }
                }
                this.insideCommand = true;
            }
        },
        changeInside(key) {
            if (key != null) {
                let ref = this.insidePos + "CInput" + this.commandPos;
                if (!this.hasTarget() || !this.$refs[ref][0].$children[0].$el.children[3].classList.contains("visible")) {
                    const title = this.commandLastCmTable[this.commandPos].title;
                    const command = this.menuData.find((m) => {
                        return m.command.title.toLowerCase() == title.toLowerCase();
                    }).command;
                    if (command.child != null && command.child.inputs != null) {
                        if (key == "arrowdown") {
                            this.insidePos++;
                            if (this.insidePos > this.inputsLength(command)) {
                                this.insidePos = 0;
                            }
                        } else {
                            this.insidePos--;
                            if (this.insidePos < 0) {
                                this.insidePos = this.inputsLength(command);
                            }
                        }

                        ref = this.insidePos + "CInput" + this.commandPos;

                        switch (this.inputType(command)) {
                            case "inputs":
                                if (this.$refs[ref]) {
                                    if (this.hasTarget()) {
                                        this.lastRef = [ref, "dropdown"];
                                        this.$refs[ref][0].$children[0].$refs["input"].focus();
                                    } else {
                                        this.lastRef = [ref, "simple"];
                                        this.$refs[ref][0].focus();
                                    }
                                }
                                break;
                            case "triggers":
                            case "checkBox":
                                this.clearPastFocus();
                                break;
                            default:
                        }
                    }
                }
            }
        },
        clearPastFocus() {
            if (this.lastRef[0].length > 0) {
                if (this.lastRef[1] == "dropdown") {
                    this.$refs[this.lastRef[0]][0].$children[0].$refs["input"].blur();
                } else {
                    this.$refs[this.lastRef[0]][0].blur()
                }
                this.lastRef = ["", ""];
            }
        },
        inputsLength(t) { //inputs
            var e = 0;
            if (null != t && null != t.child) return t.child.inputs && (e += t.child.inputs.length), t.child.checkBox && 0 != t.child.checkBox.length && (e += t.child.checkBox.length), t.child.triggers && 0 != Object.keys(t.child.triggers).length && (e += Object.keys(t.child.triggers).length), e
        },
        inputType(t) { //input
            if (this.insidePos <= t.child.inputs.length - 1) return "inputs";
            var e = t.child.inputs.length - 1;
            return t.child.checkBox && (e += t.child.checkBox.length, t.child.checkBox && t.child.checkBox.length > 0 && this.insidePos <= e) ? "checkBox" : t.child.triggers && (e += Object.keys(t.child.triggers).length, Object.keys(t.child.triggers).length > 0 && this.insidePos <= e) ? "triggers" : this.insidePos > e ? "end" : void 0
        },
        inputRange(t) { //input
            var e = 0,
                n = [0, 0],
                i = [0, 0];
            return t.child.inputs && (e = t.child.inputs.length - 1), t.child.checkBox && (i[0] = e + 1, i[1] = e + t.child.checkBox.length, e += t.child.checkBox.length), t.child.triggers && (n[0] = e + 1, n[1] = e + Object.keys(t.child.triggers).length, e += Object.keys(t.child.triggers).length), {
                inputs: e,
                triggers: n,
                checkbox: i
            }
        },
        changeOut(key) {
            if (key != null) {
                const elements = document.querySelectorAll("ul.collapsible");
                const instance = M.Collapsible.getInstance(elements[1]);
                for (const key in this.commandLastCmTable) {
                    const command = this.commandLastCmTable[key];
                    command.type == 1 && instance.close(key);
                }
                this.insideCommand = false;
                this.insidePos = -1;
            }
        },
        selectCurrent() {
            const title = this.commandLastCmTable[this.commandPos].title;
            const foundCommand = this.menuData.find((c) => {
                return c.command.title.toLowerCase() == title.toLowerCase();
            });

            if (foundCommand.command.child != null && foundCommand.command.child != 0 && foundCommand.command.child != 1) {
                if (this.insideCommand) {
                    const inputRange = this.inputRange(foundCommand.command);
                    const inputs = inputRange.inputs;
                    switch (this.inputType(foundCommand.command)) {
                        case "end":
                            if (foundCommand.command.child.inputs != null && this.insidePos == inputs + 1) return void this.runCommand(foundCommand.command.title);
                            break;
                        case "triggers":
                            const trigger = foundCommand.command.child.triggers[this.getCurrentPositionCorrect("triggers", foundCommand.command)];
                            this.runEvent(trigger.event);
                            break;
                        case "checkBox":
                            const checkBox = foundCommand.command.child.checkBox[this.getCurrentPositionCorrect("checkBox", foundCommand.command)];
                            const element = document.getElementById(checkBox);
                            element.checked = !element.checked;
                            break;
                        default:
                    }
                } else {
                    this.changeInto("arrowright");
                }
            } else {
                if (foundCommand.command.child != null) return void this.updateCommandState(foundCommand);
                if (foundCommand.command.child == null) return void this.runCommand(foundCommand.command.title);
            }
        },
        keyInput(t, e, n) {
            var i = this;
            return l(regeneratorRuntime.mark((function o() {
                var r;
                return regeneratorRuntime.wrap((function (o) {
                    while (1) switch (o.prev = o.next) {
                        case 0:
                            r = document.getElementById("searchInput"), e ? i.searchInputValue = r.value : (n.ctrlKey && 90 === n.keyCode ? document.execCommand("undo", false, null) : n.ctrlKey && 89 === n.keyCode ? document.execCommand("redo", false, null) : n.ctrlKey && 65 === n.keyCode ? (r.focus(), r.select()) : "backspace" === t ? i.searchInputValue = i.searchInputValue.slice(0, -1) : 1 === t.length && (i.searchInputValue = i.searchInputValue + t), r.value = i.searchInputValue), 0 === i.searchInputValue.length && setTimeout((function () {
                                i.menuDataComputed = i.filterMenuData()
                            }), 100), i.menuDataComputed = i.filterMenuData();
                        case 4:
                        case "end":
                            return o.stop()
                    }
                }), o)
            })))()
        },
        getCurrentPositionCorrect(type, input) {
            const inputRanges = this.inputRange(input);
            const inputs = (inputRanges.inputs, inputRanges.triggers);
            const checkbox = inputRanges.checkbox;
            const curPos = 0;

            switch (type) {
                case "triggers":
                    curPos = checkbox > 0 ? this.insidePos - checkbox[1] - inputs[0] : this.insidePos - inputs[0];
                    break;
                case "checkBox":
                    curPos = this.insidePos - checkbox[0];
                    break;
                default:
            }

            return curPos;
        },
        isCommandActive(title) {
            return this.commandLastCmTable[this.commandPos] != null && this.commandLastCmTable[this.commandPos].title === title;
        },
        isCommandButtonActive(title) {
            if (this.commandLastCmTable[this.commandPos] == null) return false;
            const foundCommand = this.menuData.find((c) => {
                return c.command.title.toLowerCase() === title.toLowerCase();
            }).command;
            const inputRange = this.inputRange(foundCommand);
            const inputs = inputRange.inputs;
            return this.insidePos == inputs + 1;
        },
        isCheckboxActive(title) {
            if (this.commandLastCmTable[this.commandPos] == null || title != this.commandLastCmTable[this.commandPos].title) return false;
            const foundCommand = this.menuData.find((c) => {
                return c.command.title.toLowerCase() === title.toLowerCase();
            }).command;
            const inputRange = this.inputRange(foundCommand);
            const inputs = (inputRange.inputs, inputRange.triggers, inputRange.checkbox);
            return inputs[0] != 0 ? this.insidePos >= inputs[0] && this.insidePos <= inputs[1] : false;
        },
        isTriggerActive(title) {
            if (this.commandLastCmTable[this.commandPos] == null || title != this.commandLastCmTable[this.commandPos].title) return false;
            const foundCommand = this.menuData.find((c) => {
                return c.command.title.toLowerCase() === title.toLowerCase();
            }).command;
            const inputRange = this.inputRange(foundCommand);
            const inputs = (inputRange.inputs, inputRange.triggers);
            return inputs[0] != 0 ? this.insidePos >= inputs[0] && this.insidePos <= inputs[1] : false;
        },
        updateInsidePos() {
            if (this.insideCommand) {
                const title = this.commandLastCmTable[this.commandPos].title;
                const foundCommand = this.menuData.find((c) => {
                    return c.command.title.toLowerCase() === title.toLowerCase();
                });
                if (this.insidePos + 1 > this.inputsLength(foundCommand) - 1) return;
                this.insidePos = ++this.insidePos;
                const ref = this.insidePos + "CInput" + this.commandPos;
                const type = this.inputType(foundCommand.command);
                if (type == "inputs") {
                    if (this.hasTarget()) {
                        this.$refs[ref][0].$children[0].$refs["input"].focus();
                        this.lastRef = [ref, "dropdown"]
                    } else {
                        this.$refs[ref][0].focus();
                        this.lastRef = [ref, "simple"]
                    }
                } else {
                    this.clearPastFocus();
                }
            }
        },
        changeTo(title) {
            const foundCommandIdx = this.commandLastCmTable.findIndex((c) => {
                return c.title.toLowerCase() === title.toLowerCase();
            });

            this.commandPos = foundCommandIdx;

            const elements = document.querySelectorAll("ul.collapsible");
            const instance = M.Collapsible.getInstance(elements[1]);

            for (const key in this.commandLastCmTable) {
                const command = this.commandLastCmTable[key];
                command.type == 1 && key != foundCommandIdx && instance.close(key);
            }
        },
        changeFav(fav) {
            this.emitter.emit("changeFavCommands", {
                fav: fav
            });
        },
        isFav(fav) {
            if (this.favCommands == null || this.favCommands.length == 0) return false;
            const favCommand = this.favCommands.indexOf(fav);
            return favCommand != -1;
        },
    },
    watch: {
        player() {
            const foundPlayer = this.playerData.find((p) => {
                return parseInt(p.serverID, 10) === parseInt(this.player, 10);
            });

            this.updateInsidePos();

            if (foundPlayer) {
                this.emitter.emit("currentTarget", {
                    currentTarget: {
                        playerName: foundPlayer.name,
                        SteamID: foundPlayer.SteamID,
                        serverID: foundPlayer.serverID
                    }
                });
            }
        },
        insidePos() {
            if (this.insidePos != -1) {
                const title = this.commandLastCmTable[this.commandPos].title;
                if (title) {
                    const foundCommand = this.menuData.find((m) => {
                        return m.command.title.toLowerCase() === title.toLowerCase();
                    });
                    if (foundCommand) {
                        const type = this.inputType(foundCommand.command);
                        if (type == "inputs") {
                            this.emitter.emit("changeFocus", {
                                focus: false
                            });
                        } else {
                            this.emitter.emit("changeFocus", {
                                focus: true
                            });
                        }
                    }
                }
            } else {
                this.emitter.emit("changeFocus", {
                    focus: true
                });
            }
        },
        itemInput() {
            this.updateInsidePos();
        },
        vehicleInput() {
            this.updateInsidePos();
        },
        jobInput() {
            this.updateInsidePos();
        },
        licenseInput() {
            this.updateInsidePos();
        },
        menuData() {
            this.sortMenu();
            this.generateDummyOptions();
            this.generateCommandInputs();
            this.menuDataComputed = this.filterMenuData();
        },
        dummyMenuDataOptions: {
            handler() {
                this.lastGeneration = this.dummyMenuDataOptions;
                Nui.post("https://ev-admin/adminMenu", JSON.stringify({
                    action: "updateKeybinds",
                    keyBinds: this.dummyMenuDataOptions
                }));
            },
            deep: true
        },
    }
};
</script>

<style lang="css" scoped>
.collapsible li.active i.customIcon {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    top: 8%;
    -webkit-transition: all .2s;
    transition: all .2s
}

.collapsible li i.customIcon {
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
    color: #000;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif
}

.headerBar {
    -webkit-box-shadow: 5px 1px 21px 3px #000;
    box-shadow: 5px 1px 21px 3px #000;
    background: var(--bgPrimary);
    width: 100%;
    margin-bottom: 0
}

.tabs {
    -ms-flex-negative: 1;
    flex-shrink: 1;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    overflow: hidden;
    background: transparent
}

.tabs,
.tabs label {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex
}

.tabs label {
    color: #fff;
    -webkit-box-ordinal-group: 2;
    -ms-flex-order: 1;
    order: 1;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 1rem 2rem;
    margin-right: .2rem;
    cursor: pointer;
    background-color: transparent;
    font-weight: 700;
    -webkit-transition: background .3s ease;
    transition: background .3s ease
}

.tabs .tab {
    -webkit-box-ordinal-group: 10;
    -ms-flex-order: 9;
    order: 9;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    display: none;
    padding: 1rem;
    background: transparent;
    padding: 20px;
    -webkit-box-shadow: -10px 10px 0 0 #000;
    box-shadow: -10px 10px 0 0 #000
}

.tabs input[type=radio] {
    display: none
}

.tabs input[type=radio]:checked+label {
    background: #141414
}

.favWrapper {
    text-transform: unset;
    text-align: center;
    font-size: 14px;
    margin: 0;
    height: 0%;
    line-height: 25px
}

.favWrapper.active {
    background: #ff0
}

.favWrapperOther {
    width: 27px
}

.favWrapperOther.shrink,
.favWrapperOther {
    text-transform: unset;
    text-align: center;
    font-size: 14px;
    padding: 0;
    margin: 0;
    line-height: 35px
}

.favWrapperOther.shrink {
    width: 33px /* 37px */
}

.favWrapperOther.active {
    background: #ff0
}

.otherWrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-left: 0;
    width: 100%
}

.currentTarget {
    color: var(--textColor);
    -webkit-box-shadow: 5px 1px 21px 3px #202a35;
    box-shadow: 5px 1px 21px 3px #202a35;
    background: var(--bgTarget);
    width: 100%;
    text-align: center;
    font-size: 15px;
    margin-bottom: 1%
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
    background: transparent;
    height: 91%;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden
}

.adminBody.shrinkAdminBody {
    margin-top: -2%
}

.customHeader {
    padding: .5%;
    overflow: visible
}

.customHeader.shrink,
.customHeader {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 97.6%;
    margin-bottom: .5%;
    margin-top: .5%
}

.customHeader.shrink {
    padding: 1.5%
}

.customHeader.active {
    background: #585f66
}

.customHeader:hover {
    background: hsla(0, 0%, 44.7%, .644)
}

.odd-cell {
    background: #cecfd1;
    border: none
}

.even-cell {
    background: #8d98a3;
    border: none
}

.customBody {
    background: rgba(94, 94, 94, .336);
    border: none;
    width: 97.6%
}

.customIcon {
    margin-left: 1%;
    margin-right: .2%;
    right: 0
}

.commandWrapper {
    padding-top: .5%;
    width: 100%;
    background: transparent;
    border: none;
    padding-bottom: 1%
}

.commandWrapper.shrinkCollapsible {
    padding-top: .7%;
    width: 99.9%;
    background: transparent;
    border: none
}

.mainCommandWarraper {
    padding: .2%;
    padding-left: .4%;
    font-size: 14px;
    width: 35%
}

.mainCommandWarraper.shrinkMainCommand {
    width: 90.5%
}

.optionCommandWrapper {
    width: 60%;
    margin-left: 5%;
    color: #000
}

.optionCommandWrapperButton {
    width: 30%;
    margin-left: 37%;
    margin-right: 3%;
    overflow: visible
}

.mainCommandWarraperButton {
    padding: .2%;
    padding-left: .4%;
    font-size: 14px;
    width: 35%;
    background: #b8860b
}

.mainCommandWarraperButton.shrinkMainCommand {
    width: 88.3%
}

.customCollapsible {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: left;
    text-transform: unset;
    color: #000;
    margin-left: 1%;
    padding-bottom: 0;
    padding-top: 0;
    margin: 0;
    margin-bottom: .5%
}

.customCollapsible:hover {
    text-align: left;
    text-transform: unset;
    background: hsla(0, 0%, 44.7%, .644);
    color: #000
}

.customCollapsible.toggleTrue {
    background: #81b38d
}

.customCollapsibleButton {
    padding-bottom: 3.4%;
    padding-right: 0;
    padding-top: 0;
    padding-left: 1%;
    margin: 0;
    margin-left: -.5%;
    margin-right: -37%;
    border: none;
    border-radius: none;
    width: 100%
}

.customCollapsibleButton,
.customCollapsibleButton:hover {
    text-align: left;
    text-transform: unset;
    background: transparent;
    color: #000;
    -webkit-box-shadow: none;
    box-shadow: none
}

.customCollapsibleButton:hover {
    border: none
}

.childInputs {
    padding: 0;
    width: 100%;
    color: #fff
}

.childInputs.shrink {
    width: 100%
}

.inputWrapper {
    margin: -2%;
    width: 103%;
    display: inline-block
}

.inputWrapper.shrink {
    margin: -8%;
    width: 115%
}

.childInputsInput {
    background: rgba(158, 157, 157, .479);
    font-size: 16px;
    height: 0%;
    color: #fff;
    padding-left: .4%;
    padding-bottom: 0;
    margin-bottom: 0;
    margin-top: 0;
    width: 30%
}

.childInputsInput.shrink,
.inputBody {
    width: 100%
}

.dropdownClamp {
    width: 70%
}

.dropdownClamp.shrink {
    width: 90%
}

.customCollapsibleInner {
    margin-top: 2%;
    margin-bottom: -2%;
    margin-left: -1.1%;
    font-size: 11.5px;
    text-transform: unset;
    background: #fff;
    color: #000;
    padding-top: 0
}

.customCollapsibleInner.shrink {
    margin-top: 5.5%;
    margin-bottom: -7%;
    margin-left: -7%
}

.customCollapsibleInner:hover {
    font-size: 11.5px;
    text-transform: unset;
    background: hsla(0, 0%, 44.7%, .644);
    color: #000
}

.customCollapsibleInner.active {
    background: hsla(0, 0%, 44.7%, .644)
}

.triggerBtn {
    font-size: 11.5px;
    text-transform: unset;
    background: #fff;
    color: #000;
    padding-top: 0;
    margin-top: 1%;
    margin-bottom: 1%
}

.triggerBtn:hover {
    font-size: 11.5px;
    text-transform: unset;
    background: hsla(0, 0%, 44.7%, .644);
    color: #000
}

.triggerBtn.active {
    background: hsla(0, 0%, 44.7%, .644)
}

.checkBox {
    color: #fff;
    width: 100%
}

.checkBox.active {
    color: #832525
}

.searchInput {
    height: 3vh;
    color: #fff;
    text-align: left;
    vertical-align: center;
    padding-left: 2%;
    font-size: 1rem
}
</style>