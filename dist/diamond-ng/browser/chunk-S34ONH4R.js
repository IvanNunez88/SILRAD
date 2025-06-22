import{a as K}from"./chunk-D6ZGY7EW.js";import{c as X}from"./chunk-HWEWO7NO.js";import{Ca as m,qa as J,ra as n,za as b}from"./chunk-UVTSTIH3.js";import{$b as H,Cb as Q,Db as z,Fb as A,Gb as P,Hb as k,Ib as C,Lb as L,Mb as R,Mc as q,Nb as x,Ob as D,Qa as F,Qc as U,Rc as W,S as G,T as r,U as p,Yc as f,Z as s,Zb as h,ab as c,bb as u,da as I,ea as S,eb as d,ga as l,gb as B,ma as N,nb as g,ob as y,qb as _,rb as v,sb as $,tb as O,uc as V,vc as Y,xb as T,yb as j}from"./chunk-UUVLSZQE.js";var le=["handle"],ae=["input"],re=e=>({checked:e});function pe(e,M){e&1&&Q(0)}function se(e,M){if(e&1&&B(0,pe,1,0,"ng-container",4),e&2){let o=P();y("ngTemplateOutlet",o.handleTemplate||o._handleTemplate)("ngTemplateOutletContext",H(2,re,o.checked()))}}var ce=({dt:e})=>`
.p-toggleswitch {
    display: inline-block;
    width: ${e("toggleswitch.width")};
    height: ${e("toggleswitch.height")};
}

.p-toggleswitch-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border-radius: ${e("toggleswitch.border.radius")};
}

.p-toggleswitch-slider {
    display: inline-block;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-width: ${e("toggleswitch.border.width")};
    border-style: solid;
    border-color: ${e("toggleswitch.border.color")};
    background: ${e("toggleswitch.background")};
    transition: background ${e("toggleswitch.transition.duration")}, color ${e("toggleswitch.transition.duration")}, border-color ${e("toggleswitch.transition.duration")}, outline-color ${e("toggleswitch.transition.duration")}, box-shadow ${e("toggleswitch.transition.duration")};
    border-radius: ${e("toggleswitch.border.radius")};
    outline-color: transparent;
    box-shadow: ${e("toggleswitch.shadow")};
}

.p-toggleswitch-handle {
    position: absolute;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${e("toggleswitch.handle.background")};
    color: ${e("toggleswitch.handle.color")};
    width: ${e("toggleswitch.handle.size")};
    height: ${e("toggleswitch.handle.size")};
    inset-inline-start: ${e("toggleswitch.gap")};
    margin-block-start: calc(-1 * calc(${e("toggleswitch.handle.size")} / 2));
    border-radius: ${e("toggleswitch.handle.border.radius")};
    transition: background ${e("toggleswitch.transition.duration")}, color ${e("toggleswitch.transition.duration")}, inset-inline-start ${e("toggleswitch.slide.duration")}, box-shadow ${e("toggleswitch.slide.duration")};
}

.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
    background: ${e("toggleswitch.checked.background")};
    border-color: ${e("toggleswitch.checked.border.color")};
}

.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-handle {
    background: ${e("toggleswitch.handle.checked.background")};
    color: ${e("toggleswitch.handle.checked.color")};
    inset-inline-start: calc(${e("toggleswitch.width")} - calc(${e("toggleswitch.handle.size")} + ${e("toggleswitch.gap")}));
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
    background: ${e("toggleswitch.hover.background")};
    border-color: ${e("toggleswitch.hover.border.color")};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-handle {
    background: ${e("toggleswitch.handle.hover.background")};
    color: ${e("toggleswitch.handle.hover.color")};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
    background: ${e("toggleswitch.checked.hover.background")};
    border-color: ${e("toggleswitch.checked.hover.border.color")};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-handle {
    background: ${e("toggleswitch.handle.checked.hover.background")};
    color: ${e("toggleswitch.handle.checked.hover.color")};
}

.p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
    box-shadow: ${e("toggleswitch.focus.ring.shadow")};
    outline: ${e("toggleswitch.focus.ring.width")} ${e("toggleswitch.focus.ring.style")} ${e("toggleswitch.focus.ring.color")};
    outline-offset: ${e("toggleswitch.focus.ring.offset")};
}

.p-toggleswitch.p-invalid > .p-toggleswitch-slider {
    border-color: ${e("toggleswitch.invalid.border.color")};
}

.p-toggleswitch.p-disabled {
    opacity: 1;
}

.p-toggleswitch.p-disabled .p-toggleswitch-slider {
    background: ${e("toggleswitch.disabled.background")};
}

.p-toggleswitch.p-disabled .p-toggleswitch-handle {
    background: ${e("toggleswitch.handle.disabled.background")};
}

/* For PrimeNG */

p-toggleswitch.ng-invalid.ng-dirty > .p-toggleswitch > .p-toggleswitch-slider {
    border-color: ${e("toggleswitch.invalid.border.color")};
}`,ue={root:{position:"relative"}},de={root:({instance:e})=>({"p-toggleswitch p-component":!0,"p-toggleswitch-checked":e.checked(),"p-disabled":e.disabled,"p-invalid":e.invalid}),input:"p-toggleswitch-input",slider:"p-toggleswitch-slider",handle:"p-toggleswitch-handle"},Z=(()=>{class e extends b{name="toggleswitch";theme=ce;classes=de;inlineStyles=ue;static \u0275fac=(()=>{let o;return function(t){return(o||(o=l(e)))(t||e)}})();static \u0275prov=r({token:e,factory:e.\u0275fac})}return e})();var ge={provide:K,useExisting:G(()=>ee),multi:!0},ee=(()=>{class e extends m{style;styleClass;tabindex;inputId;name;disabled;readonly;trueValue=!0;falseValue=!1;ariaLabel;ariaLabelledBy;autofocus;onChange=new N;input;handleTemplate;_handleTemplate;modelValue=!1;focused=!1;onModelChange=()=>{};onModelTouched=()=>{};_componentStyle=s(Z);templates;ngAfterContentInit(){this.templates.forEach(o=>{switch(o.getType()){case"handle":this._handleTemplate=o.template;break;default:this._handleTemplate=o.template;break}})}onClick(o){!this.disabled&&!this.readonly&&(this.modelValue=this.checked()?this.falseValue:this.trueValue,this.onModelChange(this.modelValue),this.onChange.emit({originalEvent:o,checked:this.modelValue}),this.input.nativeElement.focus())}onFocus(){this.focused=!0}onBlur(){this.focused=!1,this.onModelTouched()}writeValue(o){this.modelValue=o,this.cd.markForCheck()}registerOnChange(o){this.onModelChange=o}registerOnTouched(o){this.onModelTouched=o}setDisabledState(o){this.disabled=o,this.cd.markForCheck()}checked(){return this.modelValue===this.trueValue}static \u0275fac=(()=>{let o;return function(t){return(o||(o=l(e)))(t||e)}})();static \u0275cmp=c({type:e,selectors:[["p-toggleswitch"],["p-toggleSwitch"],["p-toggle-switch"]],contentQueries:function(i,t,a){if(i&1&&(L(a,le,4),L(a,J,4)),i&2){let w;x(w=D())&&(t.handleTemplate=w.first),x(w=D())&&(t.templates=w)}},viewQuery:function(i,t){if(i&1&&R(ae,5),i&2){let a;x(a=D())&&(t.input=a.first)}},inputs:{style:"style",styleClass:"styleClass",tabindex:[2,"tabindex","tabindex",Y],inputId:"inputId",name:"name",disabled:[2,"disabled","disabled",V],readonly:[2,"readonly","readonly",V],trueValue:"trueValue",falseValue:"falseValue",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",autofocus:[2,"autofocus","autofocus",V]},outputs:{onChange:"onChange"},features:[h([ge,Z]),d],decls:6,vars:23,consts:[["input",""],[3,"click","ngClass","ngStyle"],["type","checkbox","role","switch",3,"focus","blur","ngClass","checked","disabled","pAutoFocus"],[3,"ngClass"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(i,t){if(i&1){let a=z();T(0,"div",1),A("click",function(ne){return I(a),S(t.onClick(ne))}),T(1,"input",2,0),A("focus",function(){return I(a),S(t.onFocus())})("blur",function(){return I(a),S(t.onBlur())}),j(),T(3,"span",3)(4,"div",3),B(5,se,1,4,"ng-container"),j()()()}i&2&&(v(t.sx("root")),$(t.styleClass),y("ngClass",t.cx("root"))("ngStyle",t.style),g("data-pc-name","toggleswitch")("data-pc-section","root"),F(),y("ngClass",t.cx("input"))("checked",t.checked())("disabled",t.disabled)("pAutoFocus",t.autofocus),g("id",t.inputId)("aria-checked",t.checked())("aria-labelledby",t.ariaLabelledBy)("aria-label",t.ariaLabel)("name",t.name)("tabindex",t.tabindex)("data-pc-section","hiddenInput"),F(2),y("ngClass",t.cx("slider")),g("data-pc-section","slider"),F(),y("ngClass",t.cx("handle")),F(),O(t.handleTemplate||t._handleTemplate?5:-1))},dependencies:[f,q,W,U,X,n],encapsulation:2,changeDetection:0})}return e})(),Pe=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=u({type:e});static \u0275inj=p({imports:[ee,n,n]})}return e})();var he=["*"],fe=({dt:e})=>`
.p-floatlabel {
    display: block;
    position: relative;
}

.p-floatlabel label {
    position: absolute;
    pointer-events: none;
    top: 50%;
    transform: translateY(-50%);
    transition-property: all;
    transition-timing-function: ease;
    line-height: 1;
    font-weight: ${e("floatlabel.font.weight")};
    inset-inline-start: ${e("floatlabel.position.x")};
    color: ${e("floatlabel.color")};
    transition-duration: ${e("floatlabel.transition.duration")};
}

.p-floatlabel:has(.p-textarea) label {
    top: ${e("floatlabel.position.y")};
    transform: translateY(0);
}

.p-floatlabel:has(.p-inputicon:first-child) label {
    inset-inline-start: calc((${e("form.field.padding.x")} * 2) + ${e("icon.size")});
}

.p-floatlabel:has(.ng-invalid.ng-dirty) label {
    color: ${e("floatlabel.invalid.color")};
}

.p-floatlabel:has(input:focus) label,
.p-floatlabel:has(input.p-filled) label,
.p-floatlabel:has(input:-webkit-autofill) label,
.p-floatlabel:has(textarea:focus) label,
.p-floatlabel:has(textarea.p-filled) label,
.p-floatlabel:has(.p-inputwrapper-focus) label,
.p-floatlabel:has(.p-inputwrapper-filled) label {
    top: ${e("floatlabel.over.active.top")};
    transform: translateY(0);
    font-size: ${e("floatlabel.active.font.size")};
    font-weight: ${e("floatlabel.label.active.font.weight")};
}

.p-floatlabel:has(input.p-filled) label,
.p-floatlabel:has(textarea.p-filled) label,
.p-floatlabel:has(.p-inputwrapper-filled) label {
    color: ${e("floatlabel.active.color")};
}

.p-floatlabel:has(input:focus) label,
.p-floatlabel:has(input:-webkit-autofill) label,
.p-floatlabel:has(textarea:focus) label,
.p-floatlabel:has(.p-inputwrapper-focus) label {
    color: ${e("floatlabel.focus.color")};
}

.p-floatlabel-in .p-inputtext,
.p-floatlabel-in .p-textarea,
.p-floatlabel-in .p-select-label,
.p-floatlabel-in .p-multiselect-label-container,
.p-floatlabel-in .p-autocomplete-input-multiple,
.p-floatlabel-in .p-cascadeselect-label,
.p-floatlabel-in .p-treeselect-label {
    padding-top: ${e("floatlabel.in.input.padding.top")};
}

.p-floatlabel-in:has(input:focus) label,
.p-floatlabel-in:has(input.p-filled) label,
.p-floatlabel-in:has(input:-webkit-autofill) label,
.p-floatlabel-in:has(textarea:focus) label,
.p-floatlabel-in:has(textarea.p-filled) label,
.p-floatlabel-in:has(.p-inputwrapper-focus) label,
.p-floatlabel-in:has(.p-inputwrapper-filled) label {
    top: ${e("floatlabel.in.active.top")};
}

.p-floatlabel-on:has(input:focus) label,
.p-floatlabel-on:has(input.p-filled) label,
.p-floatlabel-on:has(input:-webkit-autofill) label,
.p-floatlabel-on:has(textarea:focus) label,
.p-floatlabel-on:has(textarea.p-filled) label,
.p-floatlabel-on:has(.p-inputwrapper-focus) label,
.p-floatlabel-on:has(.p-inputwrapper-filled) label {
    top: 0;
    transform: translateY(-50%);
    border-radius: ${e("floatlabel.on.border.radius")};
    background: ${e("floatlabel.on.active.background")};
    padding: ${e("floatlabel.on.active.padding")};
}
`,be={root:({instance:e,props:M})=>["p-floatlabel",{"p-floatlabel-over":M.variant==="over","p-floatlabel-on":M.variant==="on","p-floatlabel-in":M.variant==="in"}]},te=(()=>{class e extends b{name="floatlabel";theme=fe;classes=be;static \u0275fac=(()=>{let o;return function(t){return(o||(o=l(e)))(t||e)}})();static \u0275prov=r({token:e,factory:e.\u0275fac})}return e})();var me=(()=>{class e extends m{_componentStyle=s(te);variant="over";static \u0275fac=(()=>{let o;return function(t){return(o||(o=l(e)))(t||e)}})();static \u0275cmp=c({type:e,selectors:[["p-floatlabel"],["p-floatLabel"],["p-float-label"]],hostVars:8,hostBindings:function(i,t){i&2&&_("p-floatlabel",!0)("p-floatlabel-over",t.variant==="over")("p-floatlabel-on",t.variant==="on")("p-floatlabel-in",t.variant==="in")},inputs:{variant:"variant"},features:[h([te]),d],ngContentSelectors:he,decls:1,vars:0,template:function(i,t){i&1&&(k(),C(0))},dependencies:[f,n],encapsulation:2,changeDetection:0})}return e})(),ot=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=u({type:e});static \u0275inj=p({imports:[me,n,n]})}return e})();var we=["*"],ye=({dt:e})=>`
.p-inputgroup,
.p-inputgroup .p-floatlabel,
.p-inputgroup .p-iftalabel {
    display: flex;
    align-items: stretch;
    width: 100%;
}

.p-inputgroup .p-inputtext,
.p-inputgroup .p-inputwrapper {
    flex: 1 1 auto;
    width: 1%;
}

.p-inputgroupaddon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${e("inputgroup.addon.padding")};
    background: ${e("inputgroup.addon.background")};
    color: ${e("inputgroup.addon.color")};
    border-block-start: 1px solid ${e("inputgroup.addon.border.color")};
    border-block-end: 1px solid ${e("inputgroup.addon.border.color")};
    min-width: ${e("inputgroup.addon.min.width")};
}

.p-inputgroupaddon:first-child,
.p-inputgroupaddon + .p-inputgroupaddon {
    border-inline-start: 1px solid ${e("inputgroup.addon.border.color")};
}

.p-inputgroupaddon:last-child {
    border-inline-end: 1px solid ${e("inputgroup.addon.border.color")};
}

.p-inputgroupaddon:has(.p-button) {
    padding: 0;
    overflow: hidden;
}

.p-inputgroupaddon .p-button {
    border-radius: 0;
}

.p-inputgroup > .p-component,
.p-inputgroup > .p-inputwrapper > .p-component,
.p-inputgroup:first-child > p-button > .p-button,
.p-inputgroup > .p-floatlabel > .p-component,
.p-inputgroup > .p-floatlabel > .p-inputwrapper > .p-component,
.p-inputgroup > .p-iftalabel > .p-component,
.p-inputgroup > .p-iftalabel > .p-inputwrapper > .p-component {
    border-radius: 0;
    margin: 0;
}

.p-inputgroupaddon:first-child,
.p-inputgroup > .p-component:first-child,
.p-inputgroup > .p-inputwrapper:first-child > .p-component,
.p-inputgroup > .p-floatlabel:first-child > .p-component,
.p-inputgroup > .p-floatlabel:first-child > .p-inputwrapper > .p-component,
.p-inputgroup > .p-iftalabel:first-child > .p-component,
.p-inputgroup > .p-iftalabel:first-child > .p-inputwrapper > .p-component {
    border-start-start-radius: ${e("inputgroup.addon.border.radius")};
    border-end-start-radius: ${e("inputgroup.addon.border.radius")};
}

.p-inputgroupaddon:last-child,
.p-inputgroup > .p-component:last-child,
.p-inputgroup > .p-inputwrapper:last-child > .p-component,
.p-inputgroup > .p-floatlabel:last-child > .p-component,
.p-inputgroup > .p-floatlabel:last-child > .p-inputwrapper > .p-component,
.p-inputgroup > .p-iftalabel:last-child > .p-component,
.p-inputgroup > .p-iftalabel:last-child > .p-inputwrapper > .p-component {
    border-start-end-radius: ${e("inputgroup.addon.border.radius")};
    border-end-end-radius: ${e("inputgroup.addon.border.radius")};
}

.p-inputgroup .p-component:focus,
.p-inputgroup .p-component.p-focus,
.p-inputgroup .p-inputwrapper-focus,
.p-inputgroup .p-component:focus ~ label,
.p-inputgroup .p-component.p-focus ~ label,
.p-inputgroup .p-inputwrapper-focus ~ label {
    z-index: 1;
}

.p-inputgroup > .p-button:not(.p-button-icon-only) {
    width: auto;
}

/*For PrimeNG*/

.p-inputgroup p-button:first-child, .p-inputgroup p-button:last-child {
    display: inline-flex;
}

.p-inputgroup:has(> p-button:first-child) .p-button{
    border-start-start-radius: ${e("inputgroup.addon.border.radius")};
    border-end-start-radius: ${e("inputgroup.addon.border.radius")};
}

.p-inputgroup:has(> p-button:last-child) .p-button {
    border-start-end-radius: ${e("inputgroup.addon.border.radius")};
    border-end-end-radius: ${e("inputgroup.addon.border.radius")};
}
`,ve={root:({props:e})=>["p-inputgroup",{"p-inputgroup-fluid":e.fluid}]},oe=(()=>{class e extends b{name="inputgroup";theme=ye;classes=ve;static \u0275fac=(()=>{let o;return function(t){return(o||(o=l(e)))(t||e)}})();static \u0275prov=r({token:e,factory:e.\u0275fac})}return e})();var $e=(()=>{class e extends m{style;styleClass;_componentStyle=s(oe);static \u0275fac=(()=>{let o;return function(t){return(o||(o=l(e)))(t||e)}})();static \u0275cmp=c({type:e,selectors:[["p-inputgroup"],["p-inputGroup"],["p-input-group"]],hostAttrs:[1,"p-inputgroup"],hostVars:5,hostBindings:function(i,t){i&2&&(g("data-pc-name","inputgroup"),v(t.style),$(t.styleClass))},inputs:{style:"style",styleClass:"styleClass"},features:[h([oe]),d],ngContentSelectors:we,decls:1,vars:0,template:function(i,t){i&1&&(k(),C(0))},dependencies:[f,n],encapsulation:2})}return e})(),gt=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=u({type:e});static \u0275inj=p({imports:[$e,n,n]})}return e})();var ke=["*"],Ce={root:"p-inputgroupaddon"},ie=(()=>{class e extends b{name="inputgroupaddon";classes=Ce;static \u0275fac=(()=>{let o;return function(t){return(o||(o=l(e)))(t||e)}})();static \u0275prov=r({token:e,factory:e.\u0275fac})}return e})(),Me=(()=>{class e extends m{style;styleClass;_componentStyle=s(ie);get hostStyle(){return this.style}static \u0275fac=(()=>{let o;return function(t){return(o||(o=l(e)))(t||e)}})();static \u0275cmp=c({type:e,selectors:[["p-inputgroup-addon"],["p-inputGroupAddon"]],hostVars:7,hostBindings:function(i,t){i&2&&(g("data-pc-name","inputgroupaddon"),v(t.hostStyle),$(t.styleClass),_("p-inputgroupaddon",!0))},inputs:{style:"style",styleClass:"styleClass"},features:[h([ie]),d],ngContentSelectors:ke,decls:1,vars:0,template:function(i,t){i&1&&(k(),C(0))},dependencies:[f],encapsulation:2})}return e})(),Ft=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=u({type:e});static \u0275inj=p({imports:[Me,n,n]})}return e})();export{ee as a,Pe as b,me as c,ot as d,$e as e,gt as f,Me as g,Ft as h};
