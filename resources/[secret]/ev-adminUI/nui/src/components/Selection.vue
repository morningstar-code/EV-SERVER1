<template>
    <div class="notBodyTT">
        <div class="window window--left">
            <div class="headingWrapper" @click="forceOpen()">
                <div class="headingContainer border-gradient" id="forceMe">
                    <ul>
                        <template v-for="(data, index) in headingData">
                            <li :class="data.default ? 'headingSafe' : 'headingNotSafe'" :id="index">
                                <!-- :key="index" -->
                                <template v-if="data.title == 'Name'">
                                    <div class="headingMain">
                                        {{ data.data }}
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="headingSub">
                                        {{ data.title }}: {{ data.data }}
                                    </div>
                                </template>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
            <div class="commandlist">
                <ul class="collapsible commandWrapper">
                    <template v-for="(bodyList, key) in bodyData">
                        <li v-if="bodyList.child != null" :key="key" :id="key">
                            <div class="collapsible-header customHeader">
                                {{ bodyList.title }}
                                <i class="tiny material-icons">expand_less</i>
                            </div>
                            <div class="collapsible-body customBody">
                                <ul class="childInputs" v-if="bodyList.child != null">
                                    <template v-for="(input, idx) in bodyList.child.inputs">
                                        <li :id="idx" v-if="bodyList.title != null">
                                            <!-- :key="idx" -->
                                            <template v-if="input == 'checkbox'">
                                                <input
                                                    :id="idx"
                                                    v-model="bodyInputs[bodyList.title][idx]"
                                                    class="checkBox"
                                                    type="checkbox"
                                                />
                                                <span class="checkBox">
                                                    {{ input }}
                                                </span>
                                            </template>
                                            <template v-else>
                                                <span style="color: white">
                                                    {{ input }}:
                                                </span>
                                                <input v-if="bodyInputs[bodyList.title] != null"
                                                    v-model="bodyInputs[bodyList.title][idx]" class="childInputsInput"
                                                    placeholder="" />
                                            </template>
                                        </li>
                                    </template>
                                </ul>
                                <div class="customCollapsibleInner waves-effect waves-light btn"
                                    @click="runCommand(bodyList.title)">
                                    {{ bodyList.title }}
                                </div>
                            </div>
                        </li>
                    </template>
                    <template v-for="(bodyList, index) in bodyData">
                        <li v-if="bodyList.child == null" :key="index" :id="index">
                            <div class="customCollapsible customHeader waves-effect waves-light btn"
                                @click="runCommand(bodyList.title)">
                                {{ bodyList.title }}
                                <i class="material-icons customIcon">chevron_left</i>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import * as M from 'materialize-css';
import Nui from '../utils/Nui';

export default {
    name: "selection",
    props: ["emitter"],
    components: {},
    data: () => {
        return {
            headingData: [],
            bodyData: [],
            bodyInputs: {},
            forcedOpenVal: false
        }
    },
    mounted() {
        window.addEventListener('message', this.messageHandler);

        //emit fake message to get current interaction menu
        // setTimeout(() => {
        //     window.dispatchEvent(
        //         new MessageEvent("message", {
        //             isTrusted: true,
        //             data: {
        //                 action: "setCurrentInteractionMenu",
        //                 commandUI: [
        //                     {title: 'Burn Entity', child: null, action: 'burnEntity', entityType: -1},
        //                     {title: 'Damage Entity', child: null, action: 'damageEntity', entityType: -1},
        //                     {title: 'Delete Entity', child: null, action: 'deleteEntity', entityType: -1},
        //                     {title: 'Enter Vehicle', child: { inputs: { Seat: 'text' } }, action: 'enterVehicle', entityType: 2},
        //                     {title: 'Explode Entity', child: null, action: 'explodeEntity', entityType: -1},
        //                     {title: 'Pop Tire', child: null, action: 'popTire', entityType: 2},
        //                     {title: 'Telekinesis', child: null, action: 'telekinesis', entityType: -1},
        //                     {title: 'Toggle Engine', child: null, action: 'popTire', entityType: 2},
        //                 ],
        //                 headingData: {
        //                     currentOwner: 1,
        //                     name: "Dilettante",
        //                     passengers: 0,
        //                     seats: 4,
        //                 }
        //             }
        //         })
        //     )
        // }, 1000);

        document.addEventListener('DOMContentLoaded', () => {
            const elements = document.querySelectorAll('.collapsible');
            M.Collapsible.init(elements, { accordion: false });
        });
        M.AutoInit();
    },
    computed: {},
    methods: {
        generateBodyInputs() {
            let newBodyInputs = {};
            for (const key in this.bodyData) {
                const bodyData = this.bodyData[key];

                if (bodyData.child != null) {
                    let inputList = {};
                    for (const input in bodyData.child.inputs) {
                        inputList[bodyData.child.inputs[input]] = '';
                    }
                    newBodyInputs[bodyData.title] = inputList;
                }
            }

            this.$root.log("newBodyInputs", newBodyInputs);

            this.bodyInputs = newBodyInputs;
        },
        generateHeader(data) {
            this.headingData = [];
            for (const key in data) {
                const header = data[key];
                let defaultState = false;
                let headerData = header;

                if (!(key != "name" && key != "vehicleName")) {
                    defaultState = true;
                    headerData = this.capitalizeFirstLetter(headerData);
                }

                this.headingData.push({
                    title: this.capitalizeFirstLetter(key),
                    data: headerData,
                    default: defaultState
                });
            }

            this.$root.log("headingData", this.headingData);
        },
        capitalizeFirstLetter(string) {
            if (isNaN(string)) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            } else {
                return string;
            }
        },
        messageHandler(event) {
            //console.log("Selection messageHandler", event);
            //if (!event.isTrusted) throw "Untrusted event";
            switch (event.data.action) {
                case "setCurrentInteractionMenu":
                    this.$root.log("setCurrentInteractionMenu", event.data.commandUI, event.data.headingData);
                    this.bodyData = event.data.commandUI,

                    this.$root.log("bodyData", this.bodyData);

                    this.generateBodyInputs();
                    this.generateHeader(event.data.headingData);
                    break;
            }
        },
        runCommand(title) {
            this.$root.log("runCommand", title);
            const bodyData = this.bodyData.find((data) => data.title === title);
            this.$root.log("bodyData", bodyData);
            this.$root.log("bodyInputs", this.bodyInputs);
            this.$root.log("bodyInputsTitle", this.bodyInputs[bodyData.title]);

            Nui.post("https://ev-admin/runCommand", JSON.stringify({
                title: bodyData.title,
                Data: this.bodyInputs[bodyData.title],
                Action: bodyData.action
            }));
        },
        toggleSize() {
            this.forcedOpenVal = !this.forcedOpenVal;
        },
        forceOpen() {
            const elements = document.querySelectorAll('#forceMe');
            if (this.forcedOpenVal) {
                this.forcedOpenVal = false;
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i].classList.contains("forced")) {
                        elements[i].classList.remove("forced");
                    }
                }
            } else {
                this.forcedOpenVal = true;
                for (let i = 0; i < elements.length; i++) {
                    if (!elements[i].classList.contains("forced")) {
                        elements[i].classList.add("forced");
                    }
                }
            }
        }
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

.notBodyTT {
    width: 100%;
    height: 100%;
    background-size: cover
}

.notBodyTT,
.window {
    position: absolute;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 .5%;
    overflow-y: hidden
}

.window {
    top: 7.5vh;
    width: 15vw;
    height: 86%;
    font-size: 10.5px
}

.window--left {
    left: 60%
}

.commandlist {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background-color: rgba(77, 62, 62, .288);
    width: 100%;
    padding-left: 5%;
    padding-right: 5%
}

.commandWrapper {
    width: 100%;
    border: none
}

.customHeader {
    padding-top: 4%;
    padding-bottom: 3%;
    padding-left: 5%;
    padding-right: 5%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 40px;
    margin-top: 1%
}

.customBody {
    margin-top: 2%;
    margin-bottom: 1%;
    background: rgba(94, 94, 94, .336);
    border-top: 1px solid rgba(0, 0, 0, .842);
    border-bottom: 0 solid rgba(0, 0, 0, .842)
}

.customCollapsible {
    font-size: 11.5px;
    text-transform: unset;
    background: #fff;
    color: #000;
    padding-top: 1%
}

.customCollapsible:hover {
    font-size: 11.5px;
    text-transform: unset;
    background: hsla(0, 0%, 44.7%, .644);
    color: #000
}

.customIcon {
    margin-top: 15%;
    margin-right: 8.5%
}

.headingSafe {
    display: block
}

.headingNotSafe {
    display: none;
    opacity: 0
}

.headingObjects {
    bottom: 200px;
    display: block;
    -ms-flex-item-align: start;
    align-self: flex-start
}

.headingContainer {
    color: #000;
    padding: 20px;
    width: 100%;
    height: 20%;
    top: 8.5vh;
    padding: 0 .5%;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    background-color: hsla(0, 0%, 100%, .103);
    -ms-flex-item-align: end;
    align-self: flex-end
}

.headingContainer:hover {
    height: 100%;
    -webkit-transition: all .3s ease;
    transition: all .3s ease
}

.headingContainer:hover .headingNotSafe {
    display: block;
    opacity: 1
}

.headingContainer.forced {
    height: 100%;
    -webkit-transition: all .3s ease;
    transition: all .3s ease
}

.headingContainer.forced .headingNotSafe {
    display: block;
    opacity: 1
}

.headingWrapper {
    width: 100%;
    height: 32%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex
}

.headingMain {
    color: #fff;
    font-size: 14px;
    border-bottom: 1.5px solid rgba(0, 0, 0, .842);
    text-align: center;
    margin-bottom: 2%
}

.headingSub {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    color: #fff;
    font-size: 12px;
    background: rgba(90, 90, 90, .26);
    padding-bottom: 1%;
    border-bottom: .1px solid rgba(0, 0, 0, .842);
    padding-left: 5%
}

.border-gradient {
    border-top: 3px solid transparent;
    border-right: 3px solid transparent;
    border-bottom: 3px solid rgba(39, 39, 39, .479);
    border-left: 3px solid transparent;
    border-radius: 10px 10px 0 0;
    -moz-border-radius: 10px 10px 0 0;
    -webkit-border-radius: 10px 10px 0 0
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

.childInputs {
    margin: -13%;
    padding-left: 0;
    color: #fff
}

.childInputsInput {
    background: rgba(158, 157, 157, .479);
    font-size: 12px;
    height: 0%;
    color: #fff
}

.customCollapsibleInner {
    margin: -13%;
    margin-top: 15%;
    font-size: 11.5px;
    text-transform: unset;
    background: #fff;
    color: #000;
    padding-top: 0
}

.customCollapsibleInner:hover {
    font-size: 11.5px;
    text-transform: unset;
    background: hsla(0, 0%, 44.7%, .644);
    color: #000
}

.checkBox {
    color: #fff;
    width: 50%
}

.checkBox.active {
    color: #832525
}
</style>