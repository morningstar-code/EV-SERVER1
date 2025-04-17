<template>
    <div class="AdminBodyContainer" :class="this.isExpanded ? '' : 'shrinkBodyContainer'">
        <div class="adminBody" :class="this.isExpanded ? '' : 'shrinkAdminBody'">
            <ul class="commandWrapper" :class="this.isExpanded ? '' : 'shrinkCollapsible'">
                <template v-for="(optionData, index) in this.options">
                    <li
                        :id="index"
                        style="width: 100%;"
                    >
                        <!-- :key="index" -->
                        <div class="customDisplay" :class="isOptionActive(index) ? 'active' : ''">
                            <div class="displayName">
                                {{ optionData.displayName }}
                            </div>
                            <div class="displayOptionWrapper">
                                <template v-if="optionData.optionType == 'toggle'">
                                    <div style="float: right;">
                                        <div class="switch">
                                            <label>
                                                <input
                                                    :id="optionData.optionName"
                                                    type="checkbox"
                                                    v-model="optionData.data"
                                                    @change="optionChanged"
                                                >
                                                <span class="lever" />
                                            </label>
                                        </div>
                                    </div>
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

export default {
    name: "Options",
    props: ["isExpanded", "options", "emitter"],
    components: {},
    data() {
        return {
            optionPos: 0
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
                default:
            }
        });

        document.addEventListener('DOMContentLoaded', () => {
            const elements = document.querySelectorAll('.collapsible');
            M.Collapsible.init(elements, { accordion: false });
        });
        M.AutoInit();
    },
    computed: {},
    methods: {
        optionChanged(option) {
            const options = this.options;
            const foundOption = options.find((o) => o.optionName === option.target.id);
            foundOption.data = option.target.checked;

            this.emitter.emit("updateOptions", {
                options: options
            });

            Nui.post("https://ev-admin/adminMenu", JSON.stringify({
                action: "updateOptions",
                options: this.options
            }));
        },
        changeMain(key) {
            if (key != null) {
                if (key == "arrowdown") {
                    this.optionPos++;
                    if (this.optionPos > this.options.length - 1) {
                        this.optionPos = 0;
                    }
                } else {
                    this.optionPos--;
                    if (this.optionPos < 0) {
                        this.optionPos = this.options.length - 1;
                    }
                }
            }
        },
        selectCurrent() {
            const options = this.options;
            const option = options[this.optionPos];
            option.data = !document.getElementById(options[this.optionPos].optionName).checked;

            this.emitter.emit("updateOptions", {
                options: options
            });

            Nui.post("https://ev-admin/adminMenu", JSON.stringify({
                action: "updateOptions",
                options: this.options
            }));
        },
        isOptionActive(option) {
            return this.optionPos === option;
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

.adminBody {
    height: 100%;
    width: 100%;
    margin-top: -1%
}

.adminBody.shrinkAdminBody {
    margin-top: -3.4%
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

.customDisplay {
    padding: .5%;
    overflow: visible;
    background: var(--bgPrimary);
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    color: var(--textColor)
}

.customDisplay.shrink,
.customDisplay {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 97.6%;
    margin-bottom: .5%;
    margin-top: .5%
}

.customDisplay.shrink {
    padding: 1.5%
}

.customDisplay.active {
    background: #8d98a3
}

.displayName {
    width: 70%
}

.displayOptionWrapper {
    width: 30%
}
</style>