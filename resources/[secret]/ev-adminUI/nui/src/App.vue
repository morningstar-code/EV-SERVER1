<template>
  <div :class="{ hidden: this.show }" :style="cssVars">
    <Selection v-show="renderSelction == true" :emitter="emitter" />
    <Menu v-show="renderMenu == true" :emitter="emitter" />
  </div>
</template>

<script lang="js">
import Menu from './components/Menu.vue';
import Selection from './components/Selection.vue';
import Nui from './utils/Nui';
var Emitter = require('tiny-emitter');
const instance = new Emitter();
let thisKeyWord = null;

export default {
  name: "app",
  components: {
    Menu,
    Selection
  },
  data() {
    return {
      renderMenu: false,
      renderSelction: false,
      show: false,
      selectionKey: "g",
      selectionMainkey: "h",
      selectionMainKeyIsDown: false,
      isRunningTargetMenu: false,
      baseStyles: {
        bgPrimary: "#222831",
        bgSecondary: "#30475e",
        bgTertiary: "#1e3a56",
        bgInput: "#aaaaaa",
        bgTarget: "#2b527a",
        button: "#848486",
        buttonHover: "#d8d8db",
        textColor: "white",
        textColorGrey: "#E0E0E0",
        colorCurrencyIn: "#95ef77",
        colorCurrencyOut: "#f2a365",
        colorTwat: "#2c4563",
        colorWarning: "#FFA726",
        colorYellow: "#FFEE58",
        blueText: "#4DD0E1",
        greenText: "#AED581",
        redText: "#FF4081",
        cashGreen: "green",
        cashRed: "red"
      },
      emitter: instance
    };
  },
  mounted() {
    //console.log("App mounted");

    thisKeyWord = this;

    window.addEventListener("message", (event) => {
      //console.log("App messageHandler", event);
      //if (!event.isTrusted) throw "Untrusted event";
      switch (event.data.action) {
        case "show":
          //console.log("Event: Show");
          this.renderSelction = event.data.selection;
          this.isRunningTargetMenu ? this.renderMenu = true : this.renderMenu = event.data.menu;
          break;
        case "setKeyBinds":
          this.selectionKey = event.data.selectionMenu;
          this.selectionMainkey = event.data.selectionKey;
          break;
        default:
      }
    });
    window.addEventListener("keydown", (event) => {
      //console.log("App keydownHandler", event);
      if (event.target.tagName !== "INPUT") {
        event.keyCode == 9 && event.preventDefault();
        switch (event.key.toLowerCase()) {
          case "escape":
            //console.log("pressed escape");
            this.renderMenu = false;
            this.emitter.emit("clearInputsOnExit", {});
            Nui.post("https://ev-adminUI/closeMenu", JSON.stringify({
              toSelect: false
            }));
            Nui.post("https://ev-adminUI/insideCommand", JSON.stringify({
              inside: false
            }));
            break;
        }
      }
    });
    window.addEventListener("keyup", (event) => {
      //console.log("App keyupHandler", event);
      if (event.target.tagName !== "INPUT") {
        switch (event.key.toLowerCase()) {
          case this.selectionMainkey.toLowerCase().toString():
            this.selectionMainKeyIsDown = false;
            break;
        }
      }
    });
    this.emitter.on("closeMenu", function() {
      thisKeyWord.renderMenu = false;
      thisKeyWord.emitter.emit("clearInputsOnExit", {});
      Nui.post("https://ev-adminUI/closeMenu", JSON.stringify({
        toSelect: false
      }));
    });
    this.emitter.on("targetMenu", function(e) {
      thisKeyWord.isRunningTargetMenu = e.isRunning
    });
    this.emitter.on("changeFocus", function(e) {
      thisKeyWord.changeFocus(e.focus);
    });
  },
  created() {
    this.$root.log = function log() {
      for (let i = 0; i < arguments.length; i += 1) {
        if (typeof (arguments[i]) === 'object') {
          try {
            arguments[i] = JSON.parse(JSON.stringify(arguments[i]));
          } catch (e) {
            console.error(e);
          }
        }
      }
      //console.log(...arguments);
    };
  },
  beforeDestroy() { },
  computed: {
    cssVars() {
      return {
        "--bgPrimary": this.baseStyles.bgPrimary,
        "--bgSecondary": this.baseStyles.bgSecondary,
        "--bgTertiary": this.baseStyles.bgTertiary,
        "--bgInput": this.baseStyles.bgInput,
        "--bgTarget": this.baseStyles.bgTarget,
        "--btn": this.baseStyles.button,
        "--btnHover": this.baseStyles.buttonHover,
        "--textColor": this.baseStyles.textColor,
        "--textColorGrey": this.baseStyles.textColorGrey,
        "--colorCurrencyIn": this.baseStyles.colorCurrencyIn,
        "--colorCurrencyOut": this.baseStyles.colorCurrencyOut,
        "--colorTwat": this.baseStyles.colorTwat,
        "--blueText": this.baseStyles.blueText,
        "--greenText": this.baseStyles.greenText,
        "--redText": this.baseStyles.redText
      }
    }
  },
  watch: {
    renderMenu() {
      Nui.post("https://ev-adminUI/insideCommand", JSON.stringify({
        inside: this.renderMenu
      }));
    }
  },
  methods: {
    changeFocus(t) {
      if (this.renderMenu) {
        t = false;
      }
      Nui.post("https://ev-adminUI/changeInputFocus", JSON.stringify({
        focus: t
      }));
    },
    // keydownHandler(event) {
    //   console.log("App keydownHandler", event);
    //   if (event.target.tagName !== "INPUT") {
    //     event.keyCode == 9 && event.preventDefault();
    //     switch (event.key.toLowerCase()) {
    //       case "escape":
    //         console.log("pressed escape");
    //         this.renderMenu = false;
    //         this.emitter.emit("clearInputsOnExit", {});
    //         Nui.post("https://ev-adminUI/closeMenu", JSON.stringify({
    //           toSelect: false
    //         }));
    //         Nui.post("https://ev-adminUI/insideCommand", JSON.stringify({
    //           inside: false
    //         }));
    //         break;
    //     }
    //   }
    // }
  },
  // keyupHandler(event) {
  //   console.log("App keyupHandler", event);
  //   if (event.target.tagName !== "INPUT") {
  //     switch (event.key.toLowerCase()) {
  //       case this.selectionMainkey.toLowerCase().toString():
  //         this.selectionMainKeyIsDown = false;
  //         break;
  //     }
  //   }
  // },
  // messageHandler(event) { //!0 = false, !1 = true
  //   console.log("App messageHandler", event);
  //   //if (!event.isTrusted) throw "Untrusted event";
  //   switch (event.data.action) {
  //     case "show":
  //       console.log("Event: Show");
  //       this.renderSelction = event.data.selection;
  //       this.isRunningTargetMenu ? this.renderMenu = true : this.renderMenu = event.data.menu;
  //       break;
  //     case "setKeyBinds":
  //       this.selectionKey = event.data.selectionMenu;
  //       this.selectionMainkey = event.data.selectionKey;
  //       break;
  //     default:
  //   }
  // },
};
</script>

<style lang="css">
.ui.search.dropdown>input.search {
  width: 90%;
  height: 40%
}

.ui.selection.dropdown {
  padding: f; /* 2.1% */
  margin-bottom: 1.6%
}

.ui.selection.dropdown.inlineToCommand {
  background: #fff;
  padding: 3.1%;
  margin-bottom: 0
}

.dropDownOptions {
  padding-top: 1%
}

body,
html {
  margin: 0;
  padding: 0;
  background-color: transparent /* 333 */
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px
}

::-webkit-scrollbar-thumb {
  background: rgba(95, 94, 95, .13);
  border-radius: 9px
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(95, 94, 95, .56)
}

::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 10px;
  -webkit-box-shadow: inset 7px 10px 12px #f0f0f0;
  box-shadow: inset 7px 10px 12px #f0f0f0
}

.tooltip {
  display: block !important;
  z-index: 10000
}

.tooltip .tooltip-inner {
  background: rgba(94, 93, 93, .486);
  color: #fff;
  border-radius: 16px;
  padding: 5px 10px 4px
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: #000;
  z-index: 1
}

.tooltip[x-placement^=top] {
  margin-bottom: 5px
}

.tooltip[x-placement^=top] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0
}

.tooltip[x-placement^=bottom] {
  margin-top: 5px
}

.tooltip[x-placement^=bottom] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0
}

.tooltip[x-placement^=right] {
  margin-left: 5px
}

.tooltip[x-placement^=right] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0
}

.tooltip[x-placement^=left] {
  margin-right: 5px
}

.tooltip[x-placement^=left] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: #000;
  padding: 24px;
  border-radius: 5px;
  -webkit-box-shadow: 0 5px 30px rgba(black, .1);
  box-shadow: 0 5px 30px rgba(black, .1)
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9
}

.tooltip[aria-hidden=true] {
  visibility: hidden;
  opacity: 0;
  -webkit-transition: opacity .15s, visibility .15s;
  transition: opacity .15s, visibility .15s
}

.tooltip[aria-hidden=false] {
  visibility: visible;
  opacity: 1;
  -webkit-transition: opacity .15s;
  transition: opacity .15s
}

/* html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
} */
</style>