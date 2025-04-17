import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { isEnvBrowser } from './utils/misc';
import { ConfigObject } from './base-app-config';
import { updateCharacterState } from './main/character/actions';
import { getNuiLog, nuiAction } from 'lib/nui-comms';
import { RestartInterface, storeObj } from 'lib/redux';
import { devData } from 'main/dev-data';
import { Snackbar } from '@mui/material';
import AlertComponent from 'main/snackbar/components/alert/alert';
import HudCompass from 'main/hud.compass/container';
import { library } from '@fortawesome/fontawesome-svg-core';

//pro packages
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fat } from '@fortawesome/pro-thin-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fass } from '@fortawesome/sharp-solid-svg-icons';

library.add(fas as any, far as any, fal as any, fat as any, fad as any, fass as any);

const darkTheme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          margin: '0'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          "&.Mui-selected": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            "&.Mui-focusVisible": { background: "rgba(0, 0, 0, 0.3)" }
          },
          "&.Mui-selected:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          }
        }
      }
    },
    MuiCircularProgress: {
      styleOverrides: {
        circle: {
          strokeLinecap: 'butt'
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "& .MuiInput-root": {
            color: "white !important",
            fontSize: '1.3vmin !important'
          },
          "& label.Mui-focused": {
            color: "darkgray !important"
          },
          "& Mui-focused": {
            color: "darkgray !important"
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderColor: "darkgray !important"
          },
          "& .MuiInput-underline:before": {
            borderColor: "darkgray !important",
            color: "darkgray !important"
          },
          "& .MuiInput-underline:after": {
            borderColor: "white !important",
            color: "darkgray !important"
          },
          "& .Mui-focused:after": {
            color: "darkgray !important",
            fontSize: '1.5vmin !important'
          },
          "& .MuiInputAdornment-root": {
            color: "darkgray !important",
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1em",
          maxWidth: "1000px"
        },
      }
    }
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#95ef77'
    },
    secondary: {
      main: '#f2a365'
    },
    success: {
      main: '#95ef77'
    },
    warning: {
      main: '#f2a365'
    },
    error: {
      main: '#f44336',
      dark: '#f44336'
    },
  },
});

const savedEventData = [];
let printsEnabled = false;

class App extends React.Component<{}, { hasError: boolean, restart: boolean, errorHandle: boolean }>{
  constructor(props: any) {
    super(props);

    this.state = {
      hasError: false,
      restart: false,
      errorHandle: false
    };
  }

  componentDidMount() {
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        nuiAction('ev-ui:closeApp', {});
      }
    });

    window.addEventListener('message', (eventData) => {
      if (eventData && eventData.data && eventData.data.source === 'ev-nui') {
        for (
          savedEventData.unshift(JSON.stringify(eventData.data));
          savedEventData.length > 10;
        ) {
          savedEventData.pop();
        }

        if (printsEnabled) {
          console.log(
            Math.floor(Date.now() / 1000),
            JSON.stringify(eventData.data)
          )
        }

        if (eventData.data.app === 'main') {
          if (eventData.data.action === 'enable-prints') {
            printsEnabled = true;
          } else if (eventData.data.action === 'restart') {
            nuiAction('ev-ui:closeApp', {});
            this.setState({ restart: true });

            RestartInterface();

            setTimeout(() => {
              this.setState({ restart: false });
              nuiAction('ev-ui:resetApp', {});
            }, 2500);
          }
        }
      }
    });


    if (isEnvBrowser()) {
      updateCharacterState(devData.init().character);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "phone",
      //         data: {
      //           action: "view-document",
      //           id: 1,
      //           type_id: 1
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "hasino-lower-login",
      //         show: true,
      //         data: {}
      //       }
      //     })
      //   )
      // }, 1000);

      //setTimeout(() => {
      //  window.dispatchEvent(
      //    new MessageEvent("message", {
      //      data: {
      //        source: "ev-nui",
      //        app: "san-andreas-state",
      //        show: true,
      //        data: {}
      //      }
      //    })
      //  )
      //}, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "lsc",
      //         show: true,
      //         data: {}
      //       }
      //     })
      //   )
      // }, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "minigame-flip",
      //         show: true,
      //         data: {}
      //       }
      //     })
      //   )
      // }, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "minigame-captcha",
      //         show: true,
      //         data: {}
      //       }
      //     })
      //   )
      // }, 1000);

       /* setTimeout(() => {
         window.dispatchEvent(
           new MessageEvent("message", {
             data: {
               source: "ev-nui",
               app: "minigame-untangle",
               show: true,
               data: {
                 numPoints: 10,
                 gameTimeoutDuration: 237452786345
               }
             }
           })
         )
       }, 1000); */

       /* setTimeout(() => {
         window.dispatchEvent(
           new MessageEvent("message", {
             data: {
               source: "ev-nui",
               app: "vehicle-menu",
               show: true,
               data: {
                 settings: {
                   seats: [],
                   doorAccess: false,
                   engine: false,
                   windows: {},
                   doors: {},
                   extLights: false,
                   intLights: false,
                   hazard: false,
                   nitrous: "Boost",
                   neons: {},
                 },
                 show: true
               }
             }
           })
         )
       }, 1000); */

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "minigame-maze",
      //         show: true,
      //         data: {
      //           withDebug: true,
      //           useChessPieces: false,
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "minigame-sequence",
      //         show: true,
      //         data: {
      //           tempShow: false,
      //           upsideDown: false,
      //           type: 'symbols',
      //           timeToComplete: 30000,
      //           gameCompletedEvent: 'ev-ui:minigame-sequence-completed:boosting',
      //           parameters: {}
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "memorygame",
      //         show: true,
      //         data: {
      //           gameFinishedEndpoint: "ev-storage:crackStorage",
      //           gameTimeoutDuration: 14000,
      //           coloredSquares: 21,
      //           gridSize: 8
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

       /* setTimeout(() => {
           window.dispatchEvent(
             new MessageEvent("message", {
               data: {
                 source: "ev-nui",
                 app: "contextmenu",
                 show: true,
                 data: {
                   position: 'right',
                   options: [
                     {
                       //header: "Header Title",
                       title: "Police Vehicle",
                       description: "I like chickens do you?",
                       icon: "user-secret",
                       children: [
                         {
                           title: "Ford Crown Victoria",
                           description: "Spawn Vehicle",
                           icon: "user",
                           disabled: false,
                           image: 'https://i.imgur.com/X1zdcAa.gif'
                         },
                         {
                          title: "Ford Challenger",
                          description: "Spawn Vehicle",
                          icon: "user",
                          disabled: false,
                          image: 'https://i.imgur.com/X1zdcAa.gif'
                        },
                        {
                          title: "Ford Explorer",
                          description: "Spawn Vehicle",
                          icon: "user",
                          disabled: false,
                          image: 'https://i.imgur.com/X1zdcAa.gif'
                        }
                       ]
                     }
                   ]
                 }
               }
             })
           )
       }, 1000); */

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "clothing",
      //         show: true,
      //         data: {
      //           type: 'clothing',
      //           data: {},
      //           isFree: true,
      //           isDev: true
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "atm",
      //         show: true,
      //         data: {
      //           isAtm: false
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "laptop",
      //         show: true,
      //         data: {
      //           enabledApps: ['boostingApp', 'bennysApp', 'streetApp', 'hoimportsApp', 'seedAnalyzerApp', 'dodoApp', 'methApp', 'towApp', 'herbsApp', 'casinoApp'], // gamblingApp
      //           enabledFeatures: ['bozoweb:showBrowserTab', 'hoimportsApp:secretShop', 'hoimportsApp:managerRole', 'dodoApp:showManagement'],
      //           overwriteSettings: null
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      //setTimeout(() => {
      //  window.dispatchEvent(
      //    new MessageEvent("message", {
      //      data: {
      //        source: "ev-nui",
      //        app: "musicplayer",
      //        show: true,
      //        data: {}
      //      }
      //    })
      //  )
      //}, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "tcg-binder",
      //         show: true,
      //         data: {}
      //       }
      //     })
      //   )
      // }, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "tcg-packopening",
      //         show: true,
      //         data: {
      //           printSets: [],
      //           prints: [],
      //           cards: [
      //             {
      //               _name: 'Cronus',
      //               _description: 'Cronus',
      //               _image_url: '',
      //               id: 2555,
      //               printId: 0,
      //               printSetId: 0,
      //               rarity: 'holo',
      //               holo: true,
      //               protection: 'none',
      //               graded: false,
      //               qualityGeneral: 10,
      //               qualityCentering: 10,
      //               qualitySurface: 10,
      //               qualityEdge: 10,
      //               qualityCorners: 10,
      //               burnt: false
      //             },
      //             {
      //               _name: 'Cronus',
      //               _description: 'Cronus',
      //               _image_url: '',
      //               id: 2555,
      //               printId: 0,
      //               printSetId: 0,
      //               rarity: 'holo',
      //               holo: true,
      //               protection: 'none',
      //               graded: false,
      //               qualityGeneral: 10,
      //               qualityCentering: 10,
      //               qualitySurface: 10,
      //               qualityEdge: 10,
      //               qualityCorners: 10,
      //               burnt: false
      //             },
      //             {
      //               _name: 'Cronus',
      //               _description: 'Cronus',
      //               _image_url: '',
      //               id: 2555,
      //               printId: 0,
      //               printSetId: 0,
      //               rarity: 'holo',
      //               holo: true,
      //               protection: 'none',
      //               graded: false,
      //               qualityGeneral: 10,
      //               qualityCentering: 10,
      //               qualitySurface: 10,
      //               qualityEdge: 10,
      //               qualityCorners: 10,
      //               burnt: false
      //             },
      //             {
      //               _name: 'Cronus',
      //               _description: 'Cronus',
      //               _image_url: '',
      //               id: 2555,
      //               printId: 0,
      //               printSetId: 0,
      //               rarity: 'holo',
      //               holo: true,
      //               protection: 'none',
      //               graded: false,
      //               qualityGeneral: 10,
      //               qualityCentering: 10,
      //               qualitySurface: 10,
      //               qualityEdge: 10,
      //               qualityCorners: 10,
      //               burnt: false
      //             },
      //             {
      //               _name: 'Cronus',
      //               _description: 'Cronus',
      //               _image_url: '',
      //               id: 2555,
      //               printId: 0,
      //               printSetId: 0,
      //               rarity: 'holo',
      //               holo: true,
      //               protection: 'none',
      //               graded: false,
      //               qualityGeneral: 10,
      //               qualityCentering: 10,
      //               qualitySurface: 10,
      //               qualityEdge: 10,
      //               qualityCorners: 10,
      //               burnt: false
      //             },
      //             {
      //               _name: 'Cronus',
      //               _description: 'Cronus',
      //               _image_url: '',
      //               id: 2555,
      //               printId: 0,
      //               printSetId: 0,
      //               rarity: 'holo',
      //               holo: true,
      //               protection: 'none',
      //               graded: false,
      //               qualityGeneral: 10,
      //               qualityCentering: 10,
      //               qualitySurface: 10,
      //               qualityEdge: 10,
      //               qualityCorners: 10,
      //               burnt: false
      //             },
      //           ],
      //           printSetId: 0,
      //           canOpenAnother: false,
      //           sfx: {
      //             baseUrl: 'https://npgtav.b-cdn.net/tcg-sfx/',
      //             specific: {},
      //             pack: {
      //               cronus: {},
      //               ott: {},
      //               cathfawr: {},
      //               '_no-vo': {},
      //               'leslie-lingberg': {}
      //             }
      //           },
      //           //settings: {}
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "drpager",
      //         show: true,
      //         data: {
      //           hospital: 'central',
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      //setTimeout(() => {
      //  window.dispatchEvent(
      //    new MessageEvent("message", {
      //      data: {
      //        source: "ev-nui",
      //        app: "ballot",
      //        show: true,
      //        data: {}
      //      }
      //    })
      //  )
      //}, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "cinema-control",
      //         show: true,
      //         data: {
      //           show: true,
      //           isAllowed: true,
      //           volume: 1,
      //           playlist: [],
      //           type: 'public',
      //           mode: 'youtube',
      //           canMap: true,
      //           currentVideo: null
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "newscam",
      //         show: true,
      //         data: {
      //           show: true,
      //           text: "BREAKING NEWS: Slump is now gay!",
      //           recording: true
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "mdt",
      //         show: true,
      //         data: {
      //           publicApp: false
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "showroom",
      //         show: true,
      //         data: {
      //           shop: "pdm"
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      //setTimeout(() => {
      //  window.dispatchEvent(
      //    new MessageEvent("message", {
      //      data: {
      //        source: "ev-nui",
      //        app: "newsarchive",
      //        show: true,
      //        data: {}
      //      }
      //    })
      //  )
      //}, 1000);

      //setTimeout(() => {
      //  window.dispatchEvent(
      //    new MessageEvent("message", {
      //      data: {
      //        source: "ev-nui",
      //        app: "halloween",
      //        show: true,
      //        data: {}
      //      }
      //    })
      //  )
      //}, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "badge",
      //         show: true,
      //         data: {
      //           name: "Bozo Da Clown",
      //           badge: "123",
      //           rank: "Chief Of Police",
      //           department: "LSPD",
      //           image: "https://i.imgur.com/QL4UJy9.png"
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      //setTimeout(() => {
      //  window.dispatchEvent(
      //    new MessageEvent("message", {
      //      data: {
      //        source: "ev-nui",
      //        app: "laptop",
      //        show: true,
      //        data: {
      //          enabledApps: ['heistApp'],
      //          enabledFeatures: [],
      //          overwriteSettings: {
      //            personal: false,
      //            isHeistPc: true,
      //            additionalFolders: ['Gay stuff'],
      //            additionalTextFiles: ['Slump dox'],
      //            additionalZipFiles: ['AstralRP - src'],
      //            gameData: { code: '101100-12' }
      //          }
      //        }
      //      }
      //    })
      //  )
      //}, 1000);

       /* setTimeout(() => {
         window.dispatchEvent(
           new MessageEvent("message", {
             data: {
               source: "ev-nui",
               app: "textbox",
               show: true,
               data: {
                 callbackUrl: "ev-books:ui:createBook",
                 key: {
                   id: "ev-books:ui:createBook",
                   ignorePaperRequirement: false,
                 },
                 items: [
                   {
                     icon: "user-edit",
                     label: "Book title",
                     name: "title",
                 },
                 {
                     icon: "image",
                     label: "Icon (imgur image link)",
                     name: "icon",
                 },
                 {
                     icon: "edit",
                     label: "Pages (imgur image links, one per page)",
                     name: "pagesUrls",
                     _type: "imagelist",
                     minWidth: 200,
                     minHeight: 200,
                 },
                 ],
                 show: true
               }
             }
           })
         )
       }, 1000); */

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "case-opening",
      //         show: true,
      //         data: {
      //           images: [
      //             {
      //               visible: true,
      //               url: "https://allpixel.dev/images/karambit.png",
      //               //img.colors.join(', ')
      //               colors: [
      //                 255,
      //                 0,
      //                 0
      //               ],
      //               alpha: 0.5
      //             },
      //             {
      //               visible: true,
      //               url: "https://allpixel.dev/images/karambit.png",
      //               //img.colors.join(', ')
      //               colors: [
      //                 0,
      //                 255,
      //                 0
      //               ],
      //               alpha: 0.5
      //             },
      //             {
      //               visible: true,
      //               url: "https://allpixel.dev/images/karambit.png",
      //               //img.colors.join(', ')
      //               colors: [
      //                 0,
      //                 0,
      //                 255
      //               ],
      //               alpha: 0.5
      //             },
      //           ],
      //           correctImageIndex: 2
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "interactions",
      //         show: true,
      //         data: {
      //           message: "[E] Leave Bed; [F] Dismiss; [G] Become Bozo Da Clown",
      //           show: true,
      //           type: "info"
      //         }
      //       }
      //     })
      //   )
      //   setTimeout(() => {
      //     window.dispatchEvent(
      //       new MessageEvent("message", {
      //         data: {
      //           source: "ev-nui",
      //           app: "interactions",
      //           show: true,
      //           data: {
      //             message: "[E] Leave Bed; [F] Dismiss; [G] Become Bozo Da Clown",
      //             show: false,
      //             type: "info"
      //           }
      //         }
      //       })
      //     )
      //   }, 1500);
      // }, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "book",
      //         show: true,
      //         data: {
      //           pages: ["https://i.imgur.com/A26wAo1.png", "https://i.imgur.com/kwskDAz.png", "https://i.imgur.com/CjVomBp.png", "https://i.imgur.com/dsukOFa.png"],
      //           width: 1200,
      //           height: 1500
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      // setTimeout(() => {
      //   console.log("SEND PHONE OPEN")
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "minigame-ddr",
      //         show: true,
      //         data: {
      //           letters: ["w", "a", "s", "d"],
      //           gameTimeoutDuration: 35000,
      //           failureCount: 5,
      //           timeBetweenLetters: 550,
      //           timeToTravel: 1200,
      //           columns: 4
      //         }
      //       }
      //     })
      //   )
      // }, 1000);

      // setTimeout(() => {
      //   window.dispatchEvent(
      //     new MessageEvent("message", {
      //       data: {
      //         source: "ev-nui",
      //         app: "dispatch",
      //         data: {
      //           action: "initLoad",
      //           data: { active: true }
      //         }
      //       }
      //     })
      //   )
      //   setTimeout(() => {
      //     window.dispatchEvent(
      //       new MessageEvent("message", {
      //         data: {
      //           source: "ev-nui",
      //           app: "dispatch",
      //           show: true,
      //           data: {
      //             action: "addPing",
      //             data: {
      //               ctxId: 2, //this gets generated in server-side most likely.
      //               dispatchMessage: 'Robbery in progress',
      //               dispatchCode: '10-37',
      //               firstStreet: 'Sandy Shores',
      //               eventId: 'c0a80163-7b7d-4bad-9bdd-2a87ae2ba6e5',
      //               origin: {
      //                 x: 881.40808,
      //                 y: -2256.678,
      //                 z: 30.541444
      //               }
      //             },
      //             showWithMap: true
      //           }
      //         }
      //       })
      //     )
      //   }, 2500);
      // }, 1000);
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.state.errorHandle || this.setState({ errorHandle: true });

    setTimeout(() => {
      this.setState({ hasError: false, restart: false });
      nuiAction('ev-ui:resetApp', {});
      this.setState({ errorHandle: false });
    }, 5000);

    console.log('---- EV INTERFACE CATASTROPHIC ERROR -----');
    console.log(error.message);
    console.log(errorInfo.componentStack.split('\n')[0]);
    console.log('----- ----- ----- ----- ----- -----');

    setTimeout(() => {
      nuiAction('ev-ui:crashAction', {
        title: `catastrophic ui error: ${error.message}`,
        stack: errorInfo.componentStack,
        json: '\n          state\n          '
          .concat(
            JSON.stringify(storeObj.getState(), null, 4),
            '\n          --\n          last 10 events\n          '
          )
          .concat(
            savedEventData.join('\n'),
            '\n          --\n          last 10 nui calls\n          '
          )
          .concat(getNuiLog(), '\n        ')
          .trim()
      });
    }, 32);

    nuiAction('ev-ui:closeApp', {});
    RestartInterface();
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', () => { });
    document.removeEventListener('message', () => { });
  }

  render() {

    return (
      <div id="main-app-container" style={isEnvBrowser() ? { backgroundColor: '#aaa' } : {}}>
        <ThemeProvider theme={darkTheme}>
          {!this.state.hasError && !this.state.restart && (
            <>
              {
                ConfigObject().map((app: UIApp) => {
                  return (
                    app.render && (
                      <app.render key={app.name} />
                    )
                  )
                })
              }
            </>
          )}
          {this.state.hasError && (
            <Snackbar
              open={true}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <div>
                <AlertComponent
                  severity="error"
                >
                  Catastrophic UI Error Occurred (F8) - Restarting...
                </AlertComponent>
              </div>
            </Snackbar>
          )}
          {this.state.restart && (
            <Snackbar
              open={true}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <div>
                <AlertComponent severity="info">
                  Full restart in progress...
                </AlertComponent>
              </div>
            </Snackbar>
          )}
          <HudCompass />
        </ThemeProvider>
      </div>

    )
  }
}

export default App;