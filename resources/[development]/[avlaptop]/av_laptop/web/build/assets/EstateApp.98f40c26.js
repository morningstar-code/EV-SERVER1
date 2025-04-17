import{E as j,F,G as D,K as f,j as s,a as e,L as T,r,aq as I,a5 as y,aE as K,ad as Q,q as W,ah as X,aF as Y}from"./index.75547906.js";import{d as Z}from"./Home.146c2670.js";import{F as ee,I as te}from"./FormControl.ee184ca9.js";import{S as q,I as ae}from"./Select.4a83c0db.js";import{M as O}from"./MenuItem.a42a82cb.js";import{d as le,a as oe}from"./LocationOn.5c5bb029.js";import{d as se}from"./Add.57b35495.js";import{B}from"./Box.f78ee465.js";import{F as re}from"./Fab.aab5fa96.js";import{B as R}from"./Button.359114d2.js";import{T as L}from"./Typography.891e39a8.js";import{I as ne}from"./InputAdornment.d747a7ec.js";import{G as A}from"./Grid2.7ffaa2a9.js";var E={},ie=F.exports;Object.defineProperty(E,"__esModule",{value:!0});var V=E.default=void 0,ce=ie(j()),de=D,pe=(0,ce.default)((0,de.jsx)("path",{d:"M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"}),"LocalHotel");V=E.default=pe;var N={},he=F.exports;Object.defineProperty(N,"__esModule",{value:!0});var H=N.default=void 0,ue=he(j()),fe=D,ge=(0,ue.default)((0,fe.jsx)("path",{d:"M22 21V7L12 3 2 7v14h5v-9h10v9h5zm-11-2H9v2h2v-2zm2-3h-2v2h2v-2zm2 3h-2v2h2v-2z"}),"Warehouse");H=N.default=ge;const $={display:"block",width:"100%",textAlign:"center",justifyContent:"center"},M={fontSize:"14px"},me=({setCurrentTab:n,currentTab:l})=>{const{lang:i}=f(t=>t.lang),{permissions:d}=f(t=>t.realestate);return s("div",{className:"navbar",children:[s("span",{className:"navbar-title",style:{backgroundColor:l===1&&"rgba(156, 173, 190,0.05)",color:l===1&&"rgba(255,255,255,1)",borderStyle:l===1&&"none none none solid",borderColor:l===1&&"rgba(30, 96, 215,1)"},onClick:()=>{n(1)},children:[e(Z,{fontSize:"medium",sx:$}),e("a",{style:M,children:i.realestate.home_navbar})]}),d.motelsTab&&s("span",{className:"navbar-title",style:{backgroundColor:l===2&&"rgba(156, 173, 190,0.05)",color:l===2&&"rgba(255,255,255,1)",borderStyle:l===2&&"none none none solid",borderColor:l===2&&"rgba(30, 96, 215,1)"},onClick:()=>{n(2)},children:[e(V,{fontSize:"medium",sx:$}),e("a",{style:M,children:i.realestate.motels_navbar})]}),d.storageTab&&s("span",{className:"navbar-title",style:{backgroundColor:l===3&&"rgba(156, 173, 190,0.05)",color:l===3&&"rgba(255,255,255,1)",borderStyle:l===3&&"none none none solid",borderColor:l===3&&"rgba(30, 96, 215,1)"},onClick:()=>{n(3)},children:[e(H,{fontSize:"medium",sx:$}),e("a",{style:M,children:i.realestate.storages_navbar})]})]})},xe=({title:n,itemList:l,handleChange:i,showMenu:d=!1})=>{const{lang:t}=f(u=>u.lang),{categories:h}=f(u=>u.realestate);return s("span",{style:{display:"block",height:"60px",backgroundColor:"rgba(21,26,32,1)",color:"white"},children:[e("a",{style:{display:"inline-block",fontFamily:"Roboto",justifyContent:"center",marginTop:"15px",marginLeft:"10px",fontSize:"28px",fontWeight:"500",fontStyle:"italic"},children:n}),d&&s(ee,{sx:{m:1,width:"150px",marginTop:"10px",float:"right",overflow:"hide"},size:"small",children:[e(te,{id:"demo-select-small-label",style:{color:"white"},children:t.realestate.categories}),s(q,{labelId:"demo-select-small-label",id:"demo-select-small",value:l,label:t.realestate.categories,onChange:i,variant:"outlined",sx:{display:"inline-flex",color:"white",borderColor:"white",".MuiSelect-iconOutlined":{color:"white"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"rgba(255,255,255,0.25)"},overflow:"hide"},children:[e(O,{value:"all",children:t.realestate.all}),h.map((u,p)=>e(O,{value:u.name,children:u.label}))]})]})]})};var P={},ve=F.exports;Object.defineProperty(P,"__esModule",{value:!0});var G=P.default=void 0,ye=ve(j()),be=D,we=(0,ye.default)((0,be.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"}),"Info");G=P.default=we;const Se=({setShowInfo:n,setShowInput:l,setInputOptions:i,catalogue:d=[]})=>{const t=T(),{permissions:h}=f(a=>a.realestate),{isAdmin:u}=f(a=>a.laptop),{lang:p}=f(a=>a.lang),[w,S]=r.exports.useState("all"),[z,x]=r.exports.useState(d),_=({target:a})=>{S(a.value);const c=a.value.toLowerCase(),o=d.filter(g=>c=="all"?d:g.type.toLowerCase().includes(c));x(o)},v=async a=>{const c=await y.post("https://av_realestate/delete",{item:a});x(c.data)},m=(a,c)=>{switch(a){case"info":n(!0,c);break;case"gps":y.post("https://av_realestate/gps",{gps:JSON.parse(c.coords)});break;case"delete":v(c);break;case"new":l(!0);break}};return r.exports.useEffect(()=>{(async()=>{const c=await y.post("https://av_realestate/getData");t(K({categories:c.data.categories})),x(c.data.ads)})()},[d]),s("div",{style:{top:0},children:[e(xe,{itemList:w,handleChange:_,showMenu:!0,title:p.realestate.available_properties}),e(B,{alignSelf:"center",sx:{display:"block"},children:z.map((a,c)=>s("div",{style:{position:"relative",display:"inline-block",backgroundColor:"green",height:"240px",width:"240px",marginLeft:"5px",marginTop:"5px",borderRadius:"4px"},children:[e("img",{src:`${a.img}?w=164&h=164&fit=crop&auto=format`,srcSet:`${a.img}?w=164&h=164&fit=crop&auto=format&dpr=2 1x`,width:240,height:240,style:{borderRadius:"4px"}}),s("div",{style:{position:"absolute",backgroundColor:"rgba(45,45,45,0.5)",width:"100%",height:"50px",marginBottom:"5px",bottom:"0",right:"0"},children:[s("span",{style:{marginTop:"13px",marginRight:"2px",float:"right",color:"rgba(255,255,255,0.9)"},children:[e(I,{title:p.realestate.info,children:e(G,{fontSize:"small",onClick:()=>{m("info",a)}})}),e(I,{title:p.realestate.gps,children:e(le,{fontSize:"small",onClick:()=>{m("gps",a)}})}),u||h.deleteAds?e(I,{title:p.realestate.delete,children:e(oe,{fontSize:"small",onClick:()=>{m("delete",a)}})}):null]}),s("span",{style:{color:"white",display:"block",marginLeft:"5px",marginTop:"5px",fontSize:"14px",textOverflow:"ellipsis",whiteSpace:"nowrap",textShadow:"1.5px 1.5px 2px rgba(0, 0, 0, 0.45)"},children:[e("a",{style:{display:"block",fontWeight:"500",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:a.title}),e("a",{style:{position:"relative",display:"block",overflow:"hidden",height:"20px",textOverflow:"ellipsis",whiteSpace:"nowrap",fontStyle:"italic"},children:a.location})]})]})]},c))}),h.createAds&&e(B,{alignSelf:"right",sx:{position:"fixed",bottom:"0",right:"0",marginBottom:"5px"},children:e(re,{color:"primary","aria-label":"add",variant:"extended",onClick:()=>{i([{name:"title",title:p.realestate.title,icon:"fa-solid fa-pen-to-square",type:"text"},{name:"description",title:p.realestate.description,icon:"fa-solid fa-circle-info",type:"text"},{name:"image",title:p.realestate.image,icon:"fa-regular fa-image",type:"text"},{name:"rent",title:p.realestate.duration,icon:"fa-solid fa-calendar-days",type:"text"},{name:"price",title:p.realestate.price,icon:"fa-solid fa-hand-holding-dollar",type:"text"}]),m("new")},style:{float:"right",right:"0",marginRight:"15px",marginBottom:"10px"},children:e(se,{})})})]})},_e=({data:n=[],setShowInfoBox:l})=>{const{lang:i}=f(t=>t.lang),d=({data:t,action:h})=>{h==="copy"&&y.post("https://av_realestate/copy",{data:t})};return e("div",{className:"menubackground",children:s("div",{className:"inputMenu",children:[e("span",{style:{display:"block",textAlign:"center",fontSize:"24px",fontWeight:"500",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:n.title}),e("span",{style:{display:"block",textAlign:"center",fontSize:"14px",fontWeight:"400",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:n.location}),n.details&&n.details[0]?e(Q,{children:n.details.map((t,h)=>s("span",{style:{display:"block",textAlign:"center"},children:[e("hr",{style:{borderColor:"rgba(255,255,255,0.25)"}}),e("span",{children:e("i",{className:t.icon})}),t.action=="copy"?e(I,{title:i.realestate.add_clipboard,placement:"top",children:e("span",{style:{marginLeft:"7px"},onClick:()=>{d(t)},children:t.data})}):e("span",{style:{marginLeft:"7px"},onClick:()=>{d(t)},children:t.data})]},h))}):null,e("hr",{style:{borderColor:"rgba(255,255,255,0.25)"}}),e(R,{color:"warning",variant:"contained",size:"small",sx:{display:"block",textAlign:"center",marginLeft:"auto",marginRight:"auto",marginTop:"20px"},onClick:()=>{l(!1)},children:i.realestate.close_button})]})})},ke={fontWeight:"400",fontSize:"12px",color:"rgba(255,255,255,1)",textAlign:"left",marginLeft:"20px"},Ce={display:"block",marginTop:"8px",textAlign:"center"},ze=({header:n="Create Ad",subheader:l="",options:i=[],closeCallback:d,acceptCallback:t,showType:h,extraData:u})=>{const{lang:p}=f(o=>o.lang),{categories:w}=f(o=>o.realestate),[S,z]=r.exports.useState(u),[x,_]=r.exports.useState("motels"),[v,m]=r.exports.useState({type:"motels"}),a=({target:o})=>{_(o.value);const g={...v,type:o.value};m(g)},c=(o,g)=>{const k={...v,[o]:g};m(k)};return e("div",{className:"menubackground",children:s("div",{className:"inputMenu",children:[e("span",{style:{display:"block",marginTop:"10px",textAlign:"center"},children:e(L,{variant:"h5",display:"block",sx:{fontWeight:"500"},children:n})}),e("span",{style:{display:"block",fontSize:"14px",fontStyle:"italic",textAlign:"center"},children:l}),i.map((o,g)=>e("div",{children:s("span",{style:Ce,children:[e(L,{variant:"subtitle1",display:"block",sx:ke,children:o.title}),o.type!=="message"&&e(ae,{id:"input-with-icon-adornment",type:o.type,onChange:k=>{c(o.name,k.target.value)},sx:{fontSize:"14px",width:"85%",fontWeight:"400",input:{color:"white"},borderBottom:"1px solid white"},disableUnderline:!0,startAdornment:e(ne,{position:"start",sx:{fontSize:"18px",color:"rgba(255,255,255,0.5)"},children:e("i",{className:o.icon})})})]})},g)),h&&s("span",{style:{display:"block",marginTop:"10px",width:"100%",marginLeft:"auto",marginRight:"auto"},children:[e(L,{variant:"subtitle1",sx:{width:"100%",fontWeight:"400",fontSize:"12px",color:"rgba(255,255,255,1)",textAlign:"left",marginLeft:"20px"},children:"Type"}),e(q,{id:"adtype",variant:"standard",value:x,label:"Class",onChange:a,size:"medium",disableUnderline:!0,sx:{display:"flex",color:"white",width:"84%",marginLeft:"auto",marginRight:"auto",textAlign:"center",".MuiSvgIcon-root ":{fill:"white !important"},borderBottom:"1px solid white"},children:w.map((o,g)=>e(O,{value:o.name,children:o.label}))})]}),s("span",{style:{display:"block",marginTop:"15px",textAlign:"center"},children:[e(R,{variant:"contained",size:"small",onClick:()=>{t(v,S)},children:p.realestate.confirm_button}),e(R,{variant:"contained",size:"small",color:"warning",style:{marginLeft:"10px"},onClick:()=>{d()},children:p.realestate.close_button})]})]})})},Ie=r.exports.lazy(()=>W(()=>import("./Storages.0ca339c4.js"),["./Storages.0ca339c4.js","./index.75547906.js","./index.897ea0bc.css","./Accordion.5228cd23.js","./KeyboardArrowDown.6a3641ed.js","./TableRow.11ed307c.js","./Paper.2c015233.js","./Collapse.8bcacb9a.js","./Box.f78ee465.js","./extendSxProp.03d0c3b1.js","./Home.146c2670.js","./FormControl.ee184ca9.js","./InputBase.c44c9015.js","./Select.4a83c0db.js","./MenuItem.a42a82cb.js","./LocationOn.5c5bb029.js","./Add.57b35495.js","./Fab.aab5fa96.js","./Button.359114d2.js","./Typography.891e39a8.js","./InputAdornment.d747a7ec.js","./Grid2.7ffaa2a9.js","./styled.b460346a.js"],import.meta.url)),Le=r.exports.lazy(()=>W(()=>import("./Motels.535b0c57.js"),["./Motels.535b0c57.js","./index.75547906.js","./index.897ea0bc.css","./Accordion.5228cd23.js","./KeyboardArrowDown.6a3641ed.js","./TableRow.11ed307c.js","./Paper.2c015233.js","./Collapse.8bcacb9a.js","./Box.f78ee465.js","./extendSxProp.03d0c3b1.js","./Home.146c2670.js","./FormControl.ee184ca9.js","./InputBase.c44c9015.js","./Select.4a83c0db.js","./MenuItem.a42a82cb.js","./LocationOn.5c5bb029.js","./Add.57b35495.js","./Fab.aab5fa96.js","./Button.359114d2.js","./Typography.891e39a8.js","./InputAdornment.d747a7ec.js","./Grid2.7ffaa2a9.js","./styled.b460346a.js"],import.meta.url)),Ae=()=>{const n=T(),{lang:l}=f(b=>b.lang),[i,d]=r.exports.useState(1),[t,h]=r.exports.useState(!1),[u,p]=r.exports.useState(!1),[w,S]=r.exports.useState([]),[z,x]=r.exports.useState([]),[_,v]=r.exports.useState(!1),[m,a]=r.exports.useState(0),[c,o]=r.exports.useState([]),g=(b,C)=>{S(C),p(b)},k=()=>{h(!1)},U=async b=>{h(!1);const C=await y.post("https://av_realestate/newPost",{data:b});o(C.data)};return r.exports.useEffect(()=>{(async()=>{const C=await y.post("https://av_realestate/getPermissions"),J=await y.post("https://av_realestate/getData");n(Y({permissions:C.data})),o(J.data.ads),v(!0)})()},[]),s("div",{style:{height:"96%",display:"flexbox",flexDirection:"column"},children:[t&&e(ze,{header:l.realestate.create_ad,subheader:l.realestate.ad_subheader,closeCallback:k,acceptCallback:U,options:z,showType:!0}),u&&e(_e,{data:w,setShowInfoBox:p}),_&&s(A,{container:!0,spacing:0,children:[e(A,{xs:1,children:e(me,{setCurrentTab:d,currentTab:i})}),e(A,{xs:11,style:{backgroundColor:"rgba(255,255,255,0.95)",height:"70vh",overflow:"auto"},children:s(r.exports.Suspense,{fallback:e("div",{children:e(X,{})}),children:[i===1&&e(Se,{setShowInfo:g,setShowInput:h,setInputOptions:x,refresh:m,catalogue:c}),i===2&&e(Le,{}),i===3&&e(Ie,{})]})})]})]})},qe=Object.freeze(Object.defineProperty({__proto__:null,default:Ae},Symbol.toStringTag,{value:"Module"}));export{qe as E,xe as H,ze as I};
