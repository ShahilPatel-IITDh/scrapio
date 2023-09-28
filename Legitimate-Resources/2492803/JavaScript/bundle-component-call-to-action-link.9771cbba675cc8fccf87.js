"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[8686],{63640:function(e,t,n){var r,i,o,a,c,l,s=n(27378),d=n(40),u=n(56123),f=n(39166),h=n(61932),p=n(85433),v=n(92371),m=n(71056),b=n(7192),g=n(59529),y=n(68442),x=n(10043),O=n(6284),P=["emphasis","width","iconType","iconOnly","iconPosition","href","children","trackRef","target","onClick","alignContent"];function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},k.apply(this,arguments)}function S(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function I(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var _=(0,y.default)("span",{target:"esxl4sy2",label:"TextWrapper"})(""),E=e=>{var{theme:t}=e;return(0,x.iv)(r||(r=I(["\n  background: transparent;\n  color: ",";\n"])),t.colourPalette.primary)},w=e=>{var{theme:t}=e;return(0,x.iv)(i||(i=I(["\n  background: transparent;\n  border-color: ",";\n  color: ",";\n\n  :hover,\n  :focus,\n  :active {\n    border-color: transparent;\n  }\n"])),t.colourPalette.primary,t.colourPalette.primary)},C=e=>{var{theme:t}=e;return(0,x.iv)(o||(o=I(["\n  background: ",";\n  color: ",";\n  box-shadow: 0 0 0 0 ",";\n"])),t.colourPalette.states.interaction,t.colourPalette.states.onInteraction,t.colourPalette.states.interaction)},W=e=>{var{emphasis:t}=e;switch(t){case"medium":return w;case"low":return E;default:return C}},A=e=>{var{theme:t}=e;return"0 0 0 ".concat((0,d.s)(2)," ").concat(t.colourPalette.states.interactionHover)},j=(0,y.default)("a",{target:"esxl4sy1",label:"CallToActionLink"})("font-family:",u.Z.sans,";font-weight:",f.Z.bold,";",h.o$," ",p.xE," box-sizing:border-box;display:inline-flex;align-items:center;justify-content:",(e=>{var{alignContent:t,fullWidth:n}=e;return"start"===t&&n?"flex-start":"center"}),";",(e=>{var{fullWidth:t}=e;return t&&(0,x.iv)(a||(a=I(["\n      width: 100%;\n    "])))})," padding:calc(",v.SPACING_2," - 2px) calc(",v.SPACING_3," - 2px);border:2px solid transparent;min-height:",(0,d.s)(m.zs),"!important;text-align:center;text-decoration:none;line-height:1.375!important;transition:0.2s;",_,"{border-bottom:2px solid transparent;transition:border-bottom 0.2s;@supports (text-underline-offset: 0.25em){border-bottom:none;text-decoration:underline transparent;text-decoration-thickness:2px;text-decoration-skip-ink:none;text-underline-offset:0.3125em;transition:text-decoration 0.2s;}}:hover,:focus,:active{cursor:pointer;background:",(e=>{var{theme:t}=e;return t.colourPalette.states.interactionHover}),";color:",(e=>{var{theme:t}=e;return t.colourPalette.states.onInteractionHover}),";box-shadow:",A,";",_,"{border-bottom:2px solid currentcolor;@supports (text-underline-offset: 0.25em){border-bottom:none;text-decoration:underline currentcolor;text-decoration-thickness:2px;text-decoration-skip-ink:none;text-underline-offset:0.3125em;}}}:focus{",p.kN," ",(e=>{var{theme:t}=e;return(0,p.z9)({theme:t,offset:(0,d.s)(2),boxShadow:A({theme:t})})}),";}",W,";"),N=(0,y.default)("span",{target:"esxl4sy0",label:"IconWrapper"})("display:inline-block;width:",(e=>{var{isWithServiceIdentifier:t}=e;return t?(0,d.s)(24):(0,d.s)(18)}),";height:",(e=>{var{isWithServiceIdentifier:t}=e;return t?(0,d.s)(24):(0,d.s)(18)}),";",(e=>{var{iconOnly:t,iconPosition:n,isWithServiceIdentifier:r}=e;return!t&&(r||"start"===n)&&(0,x.iv)(c||(c=I(["\n      padding-right: ",";\n    "])),v.SPACING_2)}),";",(e=>{var{iconOnly:t,iconPosition:n,isWithServiceIdentifier:r}=e;return!t&&!r&&"end"===n&&(0,x.iv)(l||(l=I(["\n      padding-left: ",";\n    "])),v.SPACING_2)}),";min-width:",v.SPACING_5,";vertical-align:middle;"),L=e=>{var{isWithServiceIdentifier:t,children:n}=e;return t?s.createElement(g.Z,{on:"background"},n):n},Z=e=>{var{icon:t,iconOnly:n,iconPosition:r,isWithServiceIdentifier:i,children:o}=e;if(t&&n&&!i&&o)return s.createElement(N,{"data-testid":t,iconOnly:!0},s.createElement(O.Z,{type:t},o));if(t&&o){var a=[s.createElement(N,{key:"icon",iconPosition:r,isWithServiceIdentifier:i,"data-testid":t},s.createElement(O.Z,{type:t})),s.createElement(s.Fragment,{key:"content"},o)];return i||"end"!==r?a:a.reverse()}return o};t.Z=e=>{var{emphasis:t="high",width:n="content-length",iconType:r,iconOnly:i,iconPosition:o="start",href:a,children:c,trackRef:l,target:d,onClick:u,alignContent:f="centre"}=e,h=S(e,P),p=(e=>"string"==typeof e&&e.startsWith("service-identifiers:"))(r);return s.createElement(L,{isWithServiceIdentifier:p},s.createElement(j,k({ref:l,target:d,emphasis:t,fullWidth:"full"===n,iconOnly:i,href:a,onClick:u,alignContent:f},(0,b.Z)(h)),s.createElement(Z,{icon:r,iconOnly:i,iconPosition:o,isWithServiceIdentifier:p},s.createElement(_,null,c))))}}}]);