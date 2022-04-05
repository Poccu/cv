"use strict";(self.webpackChunkcv=self.webpackChunkcv||[]).push([[779],{3779:function(e,n,t){t.r(n),t.d(n,{default:function(){return Y}});var i=t(3433),r=t(9439),o=t(4942),c=t(1413),s=t(5987),l=t(2791),a=t(6151),d=t(8530),x=t(890),h=t(6445),u=t(3400),f=t(1889),j=t(3767),Z=t(5403),p=t(33),g=t(48),m=t(5126),y=t(4569),b=t.n(y),v=t(9823),S=t(5112),w=t(9658),C=t(8977),k=t(5083),I=t(3896),A=t(4373),P=t(7488),O=t(7237),E=t(493),R=t(5021),z=t(653),F=t(9900),N=t(6278),J=t(4721),_=t(8283),D=t(544),q=t(255),T=t(6125),H=t(184),L=["children","value","index"],B=t(9334),M="//ssl.gstatic.com/dictionary/static/sounds/oxford",U="https://api.dictionaryapi.dev/api/v2/entries/en_US",W=(0,p.ZP)(a.Z)((function(e){var n=e.theme;return{fontSize:16,color:n.palette.button.primary,borderRadius:50,height:44,padding:"0 16px",border:"2px solid",borderColor:(0,g.Fq)(n.palette.search.primary,.1),"&:hover":{border:"2px solid",borderColor:(0,g.Fq)(n.palette.search.primary,0),backgroundColor:(0,g.Fq)(n.palette.search.primary,.1)}}}));function K(e){var n=e.children,t=e.value,i=e.index,r=(0,s.Z)(e,L);return(0,H.jsx)("div",(0,c.Z)((0,c.Z)({role:"tabpanel",hidden:t!==i,id:"simple-tabpanel-".concat(i),"aria-labelledby":"simple-tab-".concat(i)},r),{},{children:t===i&&(0,H.jsx)(d.Z,{sx:{p:3},children:(0,H.jsx)(x.Z,{children:n})})}))}var G=l.forwardRef((function(e,n){return(0,H.jsx)(w.Z,(0,c.Z)({elevation:6,ref:n,variant:"filled"},e))})),Q=(0,p.ZP)("div")((function(e){var n=e.theme;return(0,o.Z)({position:"relative",borderRadius:n.shape.borderRadius,backgroundColor:(0,g.Fq)(n.palette.search.primary,.1),"&:hover":{backgroundColor:(0,g.Fq)(n.palette.search.primary,.14)},marginRight:n.spacing(2),marginLeft:0,width:"100%"},n.breakpoints.up("sm"),{marginLeft:n.spacing(3),width:"400px"})})),V=(0,p.ZP)("div")((function(e){return{padding:e.theme.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"}})),X=(0,p.ZP)(m.ZP)((function(e){var n=e.theme;return{color:"inherit","& .MuiInputBase-input":(0,o.Z)({padding:n.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(n.spacing(4),")"),transition:n.transitions.create("width"),width:"auto"},n.breakpoints.up("sm"),{width:"342px"})}}));function Y(){var e=(0,l.useState)(!1),n=(0,r.Z)(e,2),t=n[0],o=n[1],s=(0,l.useState)(!1),a=(0,r.Z)(s,2),p=a[0],g=a[1],m=(0,l.useState)(!1),y=(0,r.Z)(m,2),w=(y[0],y[1]),L=(0,l.useState)([]),Y=(0,r.Z)(L,2),$=Y[0],ee=Y[1],ne=(0,l.useState)([]),te=(0,r.Z)(ne,2),ie=te[0],re=te[1],oe=(0,l.useState)([]),ce=(0,r.Z)(oe,2),se=ce[0],le=ce[1];(0,l.useEffect)((function(){ee(JSON.parse(window.localStorage.getItem("favs"))),re(JSON.parse(window.localStorage.getItem("phonetics"))),le(JSON.parse(window.localStorage.getItem("audios")))}),[]),(0,l.useEffect)((function(){window.localStorage.setItem("favs",JSON.stringify($)),window.localStorage.setItem("phonetics",JSON.stringify(ie)),window.localStorage.setItem("audios",JSON.stringify(se))}),[$]);var ae=function(){-1===$.indexOf(pe.word)&&(ee((function(e){return[].concat((0,i.Z)(e),[pe.word])})),pe.phonetic?re((function(e){return[].concat((0,i.Z)(e),[pe.phonetic.replace(/[\/\]\[]/g,"")])})):re((function(e){return[].concat((0,i.Z)(e),[void 0])})),le((function(e){return[].concat((0,i.Z)(e),["".concat(M,"/").concat(pe.word,"--_gb_1.mp3")])})))},de=function(){ee((function(e){return e.filter((function(e){return e!==pe.word}))})),re((function(e){return e.filter((function(e){return e!==pe.phonetic.replace(/[\/\]\[]/g,"")}))})),le((function(e){return e.filter((function(e){return e!==pe.phonetics[0].audio}))}))},xe=(0,l.useState)(0),he=(0,r.Z)(xe,2),ue=he[0],fe=he[1],je=(0,l.useState)({}),Ze=(0,r.Z)(je,2),pe=Ze[0],ge=Ze[1],me=(0,l.useState)(""),ye=(0,r.Z)(me,2),be=ye[0],ve=ye[1],Se=(0,l.useState)(""),we=(0,r.Z)(Se,2),Ce=we[0],ke=we[1];(0,l.useEffect)((function(){ge(JSON.parse(window.localStorage.getItem("data"))),ke(JSON.parse(window.localStorage.getItem("audioWord")))}),[]),(0,l.useEffect)((function(){window.localStorage.setItem("data",JSON.stringify(pe))}),[pe]),(0,l.useEffect)((function(){window.localStorage.setItem("audioWord",JSON.stringify(Ce))}),[Ce]);var Ie=function(){new Audio(Ce).play()},Ae=function(){w(!0)},Pe=function(e,n){"clickaway"!==n&&g(!1)},Oe=function(){ge({})},Ee=(0,i.Z)(Array($.length).keys());return(0,l.useEffect)((function(){pe.word?document.title="Dictionary - ".concat(pe.word):document.title="Dictionary"}),[pe.word]),(0,H.jsx)(d.Z,{sx:{mt:14},children:(0,H.jsxs)(h.Z,{maxwidth:"sm",children:[pe.word?null:(0,H.jsx)(x.Z,{variant:"h3",sx:{textAlign:"center"},children:(0,H.jsx)("b",{children:"Enter the word"})}),(0,H.jsxs)(d.Z,{sx:{mt:5},display:"flex",justifyContent:"center",alignItems:"center",children:[(0,H.jsx)(d.Z,{children:(0,H.jsx)(u.Z,{onClick:function(){var e=B();b().get("".concat(U,"/").concat(e)).then((function(n){fe(0),ge(n.data[0]);var t="".concat(M,"/").concat(e,"--_gb_1.mp3");new Audio(t).play(),ke(t)})).catch((function(e){o(!0),g(!0),console.error("THIS IS ERROR ---\x3e",e)})),o(!1),ve("")},color:"inherit",size:"large",title:"Random",children:(0,H.jsx)(A.Z,{style:{fontSize:30}})})}),(0,H.jsxs)(Q,{children:[(0,H.jsx)(V,{children:(0,H.jsx)(Z.Z,{})}),(0,H.jsx)(X,{placeholder:"Search",inputProps:{"aria-label":"search"},value:be,onChange:function(e){return ve(e.target.value)},onKeyPress:function(e){var n="".concat(U,"/").concat(be);"Enter"===e.key&&(b().get(n).then((function(e){fe(0),ge(e.data[0]);var n="".concat(M,"/").concat(be.toLowerCase(),"--_gb_1.mp3");new Audio(n).play(),ke(n)})).catch((function(e){o(!0),g(!0),console.error("THIS IS ERROR ---\x3e",e)})),o(!1),ve(""))}})]}),(0,H.jsx)(d.Z,{children:t?(0,H.jsx)(S.Z,{open:p,autoHideDuration:3e3,onClose:Pe,children:(0,H.jsx)(G,{onClose:Pe,severity:"error",sx:{width:"100%"},children:"Enter the correct word!"})}):null})]}),(0,H.jsx)("br",{}),pe.word?(0,H.jsxs)(d.Z,{children:[(0,H.jsxs)(f.ZP,{container:!0,direction:"row",justifyContent:"center",alignItems:"center",children:[(0,H.jsx)(f.ZP,{item:!0,xs:12,md:3,sx:{textAlign:"center"},children:(0,H.jsx)(d.Z,{sx:{display:{xs:"none",md:"block"}},children:(0,H.jsx)(u.Z,{onClick:Ie,color:"inherit",title:"Audio",children:(0,H.jsx)(C.Z,{style:{fontSize:40}})})})}),(0,H.jsx)(f.ZP,{item:!0,xs:12,md:6,sx:{textAlign:"center"},children:(0,H.jsxs)(d.Z,{children:[(0,H.jsx)("br",{}),(0,H.jsx)(d.Z,{display:"flex",justifyContent:"center",width:"100%",children:(0,H.jsxs)(x.Z,{variant:"h1",sx:{textAlign:"center"},children:[pe.word.length>16?(0,H.jsx)("b",{children:pe.word.substr(-150,13)+"\u2026"}):(0,H.jsx)("b",{children:pe.word}),pe.phonetic?(0,H.jsx)(d.Z,{children:(0,H.jsxs)(x.Z,{variant:"h5",color:"textSecondary",children:["[ ",pe.phonetic.replace(/[\/\]\[]/g,"")," ]"]})}):(0,H.jsx)(d.Z,{children:(0,H.jsx)(x.Z,{variant:"h5",color:"textSecondary",children:"[ - ]"})})]})}),(0,H.jsx)("br",{}),(0,H.jsx)("br",{})]})}),(0,H.jsxs)(f.ZP,{item:!0,xs:12,md:3,sx:{textAlign:"center"},children:[(0,H.jsx)(d.Z,{sx:{display:{xs:"none",md:"block"}},children:(0,H.jsx)(u.Z,{onClick:Oe,color:"inherit",title:"Clear",children:(0,H.jsx)(v.Z,{style:{fontSize:40}})})}),(0,H.jsx)(d.Z,{sx:{display:{xs:"none",md:"block"}},children:$.includes(pe.word)?(0,H.jsx)(u.Z,{onClick:de,color:"error",title:"Delete from Favourites",children:(0,H.jsx)(O.Z,{style:{fontSize:40}})}):(0,H.jsx)(u.Z,{onClick:ae,color:"inherit",title:"Add to Favourites",children:(0,H.jsx)(P.Z,{style:{fontSize:40}})})})]})]}),(0,H.jsxs)(d.Z,{sx:{display:{xs:"block",md:"none"}},children:[(0,H.jsxs)(j.Z,{justifyContent:"center",direction:"row",spacing:5,children:[(0,H.jsx)(u.Z,{onClick:Ie,color:"inherit",title:"Audio",children:(0,H.jsx)(C.Z,{style:{fontSize:50}})}),$.includes(pe.word)?(0,H.jsx)(u.Z,{onClick:de,color:"error",title:"Delete from Favourites",children:(0,H.jsx)(O.Z,{style:{fontSize:80}})}):(0,H.jsx)(u.Z,{onClick:ae,color:"inherit",title:"Add to Favourites",children:(0,H.jsx)(P.Z,{style:{fontSize:80}})}),(0,H.jsx)(u.Z,{onClick:Oe,color:"inherit",title:"Clear",children:(0,H.jsx)(v.Z,{style:{fontSize:50}})})]}),(0,H.jsx)("br",{})]}),(0,H.jsxs)(d.Z,{children:[(0,H.jsx)(d.Z,{display:"flex",justifyContent:"center",width:"100%",children:(0,H.jsx)(k.Z,{value:ue,onChange:function(e,n){fe(n)},"aria-label":"tabs",textColor:"inherit",indicatorColor:"secondary",variant:"scrollable",scrollButtons:"auto",allowScrollButtonsMobile:!0,children:[0,1,2,3,4].map((function(e){var n,t;return pe.meanings[e]?(0,l.createElement)(I.Z,(0,c.Z)((0,c.Z)({label:(0,H.jsx)(x.Z,{variant:"h6",children:(0,H.jsx)("b",{children:null===(n=pe.meanings[e])||void 0===n?void 0:n.partOfSpeech})})},{id:"simple-tab-".concat(t=0),"aria-controls":"simple-tabpanel-".concat(t)}),{},{key:e})):null}))})}),[0,1,2,3,4].map((function(e){var n;return(0,H.jsx)(K,{value:ue,index:e,children:pe.meanings[e]?(0,H.jsxs)(d.Z,{children:[(0,H.jsx)(x.Z,{variant:"h3",color:"textSecondary",children:(0,H.jsx)("b",{children:null===(n=pe.meanings[e])||void 0===n?void 0:n.partOfSpeech})}),(0,H.jsx)("br",{}),(0,H.jsx)(x.Z,{variant:"h5",children:(0,H.jsx)("b",{children:"Definition"})}),(0,H.jsx)(x.Z,{color:"textSecondary",children:pe.meanings[e].definitions[0].definition[0].toUpperCase()+pe.meanings[e].definitions[0].definition.slice(1)}),pe.meanings[e].definitions[0].example?(0,H.jsxs)(d.Z,{children:[(0,H.jsx)("br",{}),(0,H.jsx)(x.Z,{variant:"h5",children:(0,H.jsx)("b",{children:"Example"})}),(0,H.jsx)(x.Z,{color:"textSecondary",children:(0,H.jsxs)("i",{children:["'",pe.meanings[e].definitions[0].example,"'"]})})]}):null]}):null},e)}))]}),(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)("br",{}),(0,H.jsx)(J.Z,{children:(0,H.jsx)(x.Z,{variant:"h3",sx:{textAlign:"center"},children:(0,H.jsx)(_.Z,{badgeContent:$.length,color:"secondary",max:99,children:(0,H.jsx)("b",{children:"Favourites"})})})}),(0,H.jsx)("br",{})]}),$.length>0?(0,H.jsxs)(f.ZP,{container:!0,children:[(0,H.jsx)(f.ZP,{item:!0,xs:12,md:3}),(0,H.jsxs)(f.ZP,{item:!0,xs:12,md:6,sx:{textAlign:"center"},children:[(0,H.jsx)(d.Z,{children:(0,H.jsx)(E.Z,{children:(0,H.jsx)(q.Z,{children:Ee.map((function(e){return(0,H.jsx)(T.Z,{children:(0,H.jsx)(R.ZP,{secondaryAction:(0,H.jsx)(u.Z,{onClick:function(){ee((function(n){return n.filter((function(n){return n!==$[e]}))})),re((function(n){return n.filter((function(n){return n!==ie[e]}))})),le((function(n){return n.filter((function(n){return n!==se[e]}))}))},edge:"end","aria-label":"delete",color:"inherit",title:"Delete",children:(0,H.jsx)(v.Z,{style:{fontSize:30}})}),children:(0,H.jsxs)(N.Z,{onClick:se[e]?function(){new Audio(se[e]).play()}:Ae,children:[(0,H.jsx)(z.Z,{children:(0,H.jsx)(u.Z,{onClick:function(){window.scrollTo(0,0),b().get("".concat(U,"/").concat($[e])).then((function(n){fe(0),ge(n.data[0]);var t="".concat(M,"/").concat($[e],"--_gb_1.mp3");new Audio(t);ke(t)})).catch((function(e){o(!0),g(!0),console.error("THIS IS ERROR ---\x3e",e)})),o(!1),ve("")},color:"inherit",title:"Search",children:(0,H.jsx)(Z.Z,{style:{fontSize:30}})})}),(0,H.jsx)(F.Z,{disableTypography:!0,primary:(0,H.jsx)(x.Z,{variant:"h4",color:"textPrimary",children:$[e].length>16?(0,H.jsx)("b",{children:$[e].substr(-150,13)+"\u2026"}):(0,H.jsx)("b",{children:$[e]})}),secondary:(0,H.jsx)(x.Z,{variant:"p",color:"textSecondary",children:ie[e]?"[ "+ie[e]+" ]":"[ - ]"})})]})})},e)}))})})}),(0,H.jsxs)(d.Z,{sx:{textAlign:"right"},children:[(0,H.jsx)("br",{}),(0,H.jsx)(W,{variant:"outlined",endIcon:(0,H.jsx)(D.Z,{style:{fontSize:30}}),onClick:function(){ee([]),re([]),le([])},children:"Clear All"})]})]}),(0,H.jsx)(f.ZP,{item:!0,xs:12,md:3})]}):(0,H.jsxs)(H.Fragment,{children:[(0,H.jsxs)(x.Z,{variant:"h4",sx:{textAlign:"center"},color:"textSecondary",children:[(0,H.jsx)("br",{}),(0,H.jsx)("b",{children:"No favourite words yet \ud83d\ude1e"})]}),(0,H.jsx)(x.Z,{variant:"h5",sx:{textAlign:"center"},color:"textSecondary",children:(0,H.jsx)("b",{children:"Please, add some!"})}),(0,H.jsx)("br",{})]})]}):(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(d.Z,{sx:{display:{xs:"none",md:"block"}},children:(0,H.jsx)(d.Z,{sx:{mt:-1},display:"flex",justifyContent:"center",alignItems:"center",children:(0,H.jsx)("img",{src:"".concat("/cv","/assets/images/dictionary-bg.png"),alt:"dictionary",draggable:!1})})}),(0,H.jsx)(d.Z,{sx:{mt:-1,display:{md:"none"}},display:"flex",justifyContent:"center",alignItems:"center",children:(0,H.jsx)("img",{src:"".concat("/cv","/assets/images/dictionary-bg.png"),alt:"dictionary",height:"100%",width:"100%",draggable:!1})})]})]})})}}}]);
//# sourceMappingURL=779.09ce8981.chunk.js.map