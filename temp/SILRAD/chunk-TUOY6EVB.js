import{a as q,b as U}from"./chunk-6PPFOR23.js";import{Ca as M,ra as n,za as D}from"./chunk-UVTSTIH3.js";import{Db as N,Fb as V,Gb as o,Hb as z,Ib as x,Mc as H,Na as A,Pc as R,Qa as s,Rb as B,Sb as k,T as v,Tb as O,U as d,Yc as I,Z as m,Zb as C,ab as u,bb as f,da as F,ea as j,eb as y,ga as l,gb as b,ma as T,nb as w,ob as r,oc as E,qb as L,rb as h,sb as S,uc as P,xb as c,yb as p,zb as _}from"./chunk-UUVLSZQE.js";var Q=["*"],W=({dt:e})=>`
.p-overlaybadge {
    position: relative;
}

.p-overlaybadge .p-badge {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
    margin: 0;
    outline-width: ${e("overlaybadge.outline.width")};
    outline-style: solid;
    outline-color: ${e("overlaybadge.outline.color")};
}
`,X={root:"p-overlaybadge"},G=(()=>{class e extends D{name="overlaybadge";theme=W;classes=X;static \u0275fac=(()=>{let a;return function(t){return(a||(a=l(e)))(t||e)}})();static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})(),Y=(()=>{class e extends M{styleClass;style;badgeSize;severity;value;badgeDisabled=!1;set size(a){this._size=a,!this.badgeSize&&this.size&&console.log("size property is deprecated and will removed in v18, use badgeSize instead.")}get size(){return this._size}_size;_componentStyle=m(G);constructor(){super()}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=u({type:e,selectors:[["p-overlayBadge"],["p-overlay-badge"],["p-overlaybadge"]],inputs:{styleClass:"styleClass",style:"style",badgeSize:"badgeSize",severity:"severity",value:"value",badgeDisabled:[2,"badgeDisabled","badgeDisabled",P],size:"size"},features:[C([G]),y],ngContentSelectors:Q,decls:3,vars:7,consts:[[1,"p-overlaybadge"],[3,"styleClass","badgeSize","severity","value","badgeDisabled"]],template:function(i,t){i&1&&(z(),c(0,"div",0),x(1),_(2,"p-badge",1),p()),i&2&&(s(2),h(t.style),r("styleClass",t.styleClass)("badgeSize",t.badgeSize)("severity",t.severity)("value",t.value)("badgeDisabled",t.badgeDisabled))},dependencies:[I,U,q,n],encapsulation:2,changeDetection:0})}return e})(),ze=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=f({type:e});static \u0275inj=d({imports:[Y,n,n]})}return e})();var Z=["*"];function ee(e,g){if(e&1&&(c(0,"span",3),k(1),p()),e&2){let a=o();s(),O(a.label)}}function ae(e,g){if(e&1&&_(0,"span",5),e&2){let a=o(2);S(a.icon),r("ngClass","p-avatar-icon")}}function te(e,g){if(e&1&&b(0,ae,1,3,"span",4),e&2){let a=o(),i=B(5);r("ngIf",a.icon)("ngIfElse",i)}}function ie(e,g){if(e&1){let a=N();c(0,"img",7),V("error",function(t){F(a);let $=o(2);return j($.imageError(t))}),p()}if(e&2){let a=o(2);r("src",a.image,A),w("aria-label",a.ariaLabel)}}function re(e,g){if(e&1&&b(0,ie,1,2,"img",6),e&2){let a=o();r("ngIf",a.image)}}var ne=({dt:e})=>`
.p-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${e("avatar.width")};
    height: ${e("avatar.height")};
    font-size: ${e("avatar.font.size")};
    color: ${e("avatar.color")};
    background: ${e("avatar.background")};
    border-radius: ${e("avatar.border.radius")};
}

.p-avatar-image {
    background: transparent;
}

.p-avatar-circle {
    border-radius: 50%;
}

.p-avatar-circle img {
    border-radius: 50%;
}

.p-avatar-icon {
    font-size: ${e("avatar.icon.size")};
    width: ${e("avatar.icon.size")};
    height: ${e("avatar.icon.size")};
}

.p-avatar img {
    width: 100%;
    height: 100%;
}

.p-avatar-lg {
    width: ${e("avatar.lg.width")};
    height: ${e("avatar.lg.width")};
    font-size: ${e("avatar.lg.font.size")};
}

.p-avatar-lg .p-avatar-icon {
    font-size: ${e("avatar.lg.icon.size")};
    width: ${e("avatar.lg.icon.size")};
    height: ${e("avatar.lg.icon.size")};
}

.p-avatar-xl {
    width: ${e("avatar.xl.width")};
    height: ${e("avatar.xl.width")};
    font-size: ${e("avatar.xl.font.size")};
}

.p-avatar-xl .p-avatar-icon {
    font-size: ${e("avatar.xl.font.size")};
    width: ${e("avatar.xl.icon.size")};
    height: ${e("avatar.xl.icon.size")};
}

.p-avatar-group {
    display: flex;
    align-items: center;
}

.p-avatar-group .p-avatar + .p-avatar {
    margin-inline-start: ${e("avatar.group.offset")};
}

.p-avatar-group .p-avatar {
    border: 2px solid ${e("avatar.group.border.color")};
}

.p-avatar-group .p-avatar-lg + .p-avatar-lg {
    margin-inline-start: ${e("avatar.lg.group.offset")};
}

.p-avatar-group .p-avatar-xl + .p-avatar-xl {
    margin-inline-start: ${e("avatar.xl.group.offset")};
}
`,oe={root:({props:e})=>["p-avatar p-component",{"p-avatar-image":e.image!=null,"p-avatar-circle":e.shape==="circle","p-avatar-lg":e.size==="large","p-avatar-xl":e.size==="xlarge"}],label:"p-avatar-label",icon:"p-avatar-icon"},J=(()=>{class e extends D{name="avatar";theme=ne;classes=oe;static \u0275fac=(()=>{let a;return function(t){return(a||(a=l(e)))(t||e)}})();static \u0275prov=v({token:e,factory:e.\u0275fac})}return e})();var le=(()=>{class e extends M{label;icon;image;size="normal";shape="square";style;styleClass;ariaLabel;ariaLabelledBy;onImageError=new T;_componentStyle=m(J);imageError(a){this.onImageError.emit(a)}get hostClass(){return this.styleClass}static \u0275fac=(()=>{let a;return function(t){return(a||(a=l(e)))(t||e)}})();static \u0275cmp=u({type:e,selectors:[["p-avatar"]],hostVars:19,hostBindings:function(i,t){i&2&&(w("data-pc-name","avatar")("aria-label",t.ariaLabel)("aria-labelledby",t.ariaLabelledBy),h(t.style),S(t.hostClass),L("p-avatar",!0)("p-component",!0)("p-avatar-circle",t.shape==="circle")("p-avatar-lg",t.size==="large")("p-avatar-xl",t.size==="xlarge")("p-avatar-image",t.image!=null))},inputs:{label:"label",icon:"icon",image:"image",size:"size",shape:"shape",style:"style",styleClass:"styleClass",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy"},outputs:{onImageError:"onImageError"},features:[C([J]),y],ngContentSelectors:Z,decls:6,vars:2,consts:[["iconTemplate",""],["imageTemplate",""],["class","p-avatar-text",4,"ngIf","ngIfElse"],[1,"p-avatar-text"],[3,"class","ngClass",4,"ngIf","ngIfElse"],[3,"ngClass"],[3,"src","error",4,"ngIf"],[3,"error","src"]],template:function(i,t){if(i&1&&(z(),x(0),b(1,ee,2,1,"span",2)(2,te,1,2,"ng-template",null,0,E)(4,re,1,1,"ng-template",null,1,E)),i&2){let $=B(3);s(),r("ngIf",t.label)("ngIfElse",$)}},dependencies:[I,H,R,n],encapsulation:2,changeDetection:0})}return e})(),Ne=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=f({type:e});static \u0275inj=d({imports:[le,n,n]})}return e})();export{Y as a,ze as b,le as c,Ne as d};
