"use strict";(self.webpackChunkreact_monkey_blogging_boilerplate=self.webpackChunkreact_monkey_blogging_boilerplate||[]).push([[706],{9296:function(n,r,t){var e,i=t(168),o=(t(2791),t(3504)),a=t(6031),s=t(184),c=a.ZP.section(e||(e=(0,i.Z)(["\n  width: 100%;\n  min-height: 100vh;\n  .heading {\n    color: ",";\n    text-align: center;\n    font-weight: 600;\n    font-size: 36px;\n    margin-bottom: 60px;\n  }\n  .logo {\n    margin: 0 auto 20px;\n  }\n  .auth-question {\n    font-size: 20px;\n    & * {\n      color: ",";\n    }\n  }\n  & form {\n    max-width: 700px;\n    margin-left: auto;\n    margin-right: auto;\n  }\n"])),(function(n){return n.theme.primary}),(function(n){return n.theme.primary}));r.Z=function(n){var r=n.children;return(0,s.jsx)(c,{children:(0,s.jsxs)("div",{className:"container",children:[(0,s.jsx)(o.OL,{to:"/",children:(0,s.jsx)("img",{srcSet:"/logo.png 3x",alt:"",className:"logo"})}),(0,s.jsx)("h1",{className:"heading",children:"Monkey Blogging"}),r]})})}},9646:function(n,r,t){t.d(r,{Z:function(){return g}});var e,i,o,a,s=t(1413),c=t(4925),d=t(168),l=(t(2791),t(6031)),u=t(3504),h=t(184),p=l.ZP.div(e||(e=(0,d.Z)(["\n  width: ",";\n  height: ",";\n  border-radius: 100rem;\n  border: "," solid white;\n  border-top: "," solid transparent;\n  border-bottom: "," solid transparent;\n  animation: spinner infinite 1s;\n  @keyframes spinner {\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n"])),(function(n){return n.size}),(function(n){return n.size}),(function(n){return n.borderSize}),(function(n){return n.borderSize}),(function(n){return n.borderSize})),m=function(n){var r=n.size,t=void 0===r?"32px":r,e=n.borderSize,i=void 0===e?"4px":e;return(0,h.jsx)(p,{size:t,borderSize:i})},f=["type","children","kind"],x=l.ZP.button(i||(i=(0,d.Z)(["\n  margin: 0 auto;\n  cursor: pointer;\n  padding: 0 25px;\n  line-height: 1;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 18px;\n  height: ",";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: all 0.25s linear;\n  ",";\n  ",";\n  &:disabled {\n    opacity: 0.5;\n    pointer-events: none;\n  }\n  &:hover {\n    opacity: 0.8;\n  }\n"])),(function(n){return n.height||"66px"}),(function(n){return"secondary"===n.kind&&(0,l.iv)(o||(o=(0,d.Z)(["\n      color: ",";\n      background-color: white;\n    "])),(function(n){return n.theme.primary}))}),(function(n){return"primary"===n.kind&&(0,l.iv)(a||(a=(0,d.Z)(["\n      color: white;\n      background-image: linear-gradient(\n        to right bottom,\n        ",",\n        ","\n      );\n    "])),(function(n){return n.theme.primary}),(function(n){return n.theme.secondary}))})),g=function(n){var r=n.type,t=void 0===r?"button":r,e=n.children,i=n.kind,o=void 0===i?"primary":i,a=(0,c.Z)(n,f),d=a.isLoading,l=a.to,p=d?(0,h.jsx)(m,{}):e;return""!==l&&"string"===typeof l?(0,h.jsx)(u.OL,{to:l,children:(0,h.jsx)(x,(0,s.Z)((0,s.Z)({type:t,kind:o},a),{},{children:p}))}):(0,h.jsx)(x,(0,s.Z)((0,s.Z)({type:t,kind:o},a),{},{children:p}))}},6356:function(n,r,t){var e,i=t(168),o=(t(2791),t(6031)),a=t(184),s=o.ZP.div(e||(e=(0,i.Z)(["\n  display: flex;\n  flex-direction: column;\n  row-gap: 20px;\n  align-items: flex-start;\n  margin-bottom: 40px;\n  margin-left: auto;\n  margin-right: auto;\n  width: 100%;\n  &:last-child {\n    margin-bottom: 0;\n  }\n"])));r.Z=function(n){var r=n.children;return(0,a.jsx)(s,{children:r})}},9248:function(n,r,t){var e,i=t(1413),o=t(4925),a=t(168),s=(t(2791),t(6031)),c=t(1134),d=t(184),l=["name","control","type","children"],u=s.ZP.div(e||(e=(0,a.Z)(["\n  position: relative;\n  width: 100%;\n  .input {\n    width: 100%;\n    padding: ",";\n    background-color: ",";\n    border-radius: 8px;\n    border: 1px solid transparent;\n    transition: all 0.2s linear;\n  }\n  .input:focus {\n    border: 1px solid ",";\n    background-color: white;\n  }\n  .input::-webkit-input-placeholder {\n    color: ",";\n    opacity: 0.5;\n  }\n  .input::-moz-input-placeholder {\n    color: ",";\n    opacity: 0.5;\n  }\n  .input-icon {\n    position: absolute;\n    right: 20px;\n    top: 50%;\n    transform: translateY(-50%);\n    cursor: pointer;\n  }\n"])),(function(n){return n.hasIcon?"20px 60px 20px 20px":"20px"}),(function(n){return n.theme.grayLight}),(function(n){return n.theme.primary}),(function(n){return n.theme.grayDark}),(function(n){return n.theme.grayDark}));r.Z=function(n){var r=n.name,t=n.control,e=n.type,a=void 0===e?"text":e,s=n.children,h=(0,o.Z)(n,l),p=(0,c.bc)({control:t,name:r,defaultValue:""}).field;return(0,d.jsxs)(u,{children:[(0,d.jsx)("input",(0,i.Z)((0,i.Z)((0,i.Z)({type:a,id:r},p),h),{},{className:"input"})),(0,d.jsx)("div",{className:"input-icon",children:s})]})}},3453:function(n,r,t){var e,i=t(1413),o=t(4925),a=t(168),s=(t(2791),t(6031)),c=t(184),d=["htmlFor","children"],l=s.ZP.label(e||(e=(0,a.Z)(["\n  color: ",";\n  cursor: pointer;\n  font-weight: 600;\n"])),(function(n){return n.theme.grayDark}));r.Z=function(n){var r=n.htmlFor,t=void 0===r?"":r,e=n.children,a=(0,o.Z)(n,d);return(0,c.jsx)(l,(0,i.Z)((0,i.Z)({htmlFor:t},a),{},{children:e}))}},8184:function(n,r,t){t.d(r,{k:function(){return i},L:function(){return o}});t(2791);var e=t(184),i=function(n){var r=n.className,t=void 0===r?"":r,i=n.onClick,o=void 0===i?function(){}:i;return(0,e.jsx)("div",{className:t,onClick:o,children:(0,e.jsxs)("svg",{width:"22",height:"20",viewBox:"0 0 22 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,e.jsx)("path",{d:"M13.5356 8.46454C13.7677 8.69669 13.9519 8.97229 14.0775 9.27561C14.2032 9.57892 14.2678 9.90401 14.2678 10.2323C14.2678 10.5606 14.2031 10.8857 14.0775 11.189C13.9518 11.4923 13.7677 11.7679 13.5355 12.0001C13.3034 12.2322 13.0278 12.4164 12.7245 12.542C12.4211 12.6676 12.0961 12.7323 11.7678 12.7323C11.4394 12.7323 11.1144 12.6676 10.811 12.5419C10.5077 12.4163 10.2321 12.2322 10 12",stroke:"#999999",strokeWidth:"1.5",strokeLinecap:"round"}),(0,e.jsx)("path",{d:"M11 4C7.04003 4 4.01115 6.27449 1.4755 9.39738C1.19014 9.74883 1.19009 10.2511 1.47544 10.6025C2.18711 11.479 2.93763 12.2887 3.73669 13M6.74043 15.0348C8.03446 15.6495 9.44549 16 11 16C11.2884 16 11.5719 15.9879 11.8507 15.9643L12.2607 15.9122M15.7029 5.18844C17.5178 6.15443 19.0991 7.64187 20.5245 9.39741C20.8099 9.74885 20.8099 10.2512 20.5245 10.6026C19.1774 12.2617 17.6911 13.6813 16 14.6476",stroke:"#999999",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"}),(0,e.jsx)("path",{d:"M19.1217 1.11547L1.9998 18.9996",stroke:"#999999",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]})})},o=function(n){var r=n.className,t=void 0===r?"":r,i=n.onClick,o=void 0===i?function(){}:i;return(0,e.jsx)("div",{className:t,onClick:o,children:(0,e.jsxs)("svg",{width:"22",height:"14",viewBox:"0 0 22 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,e.jsx)("path",{d:"M14.5 1.62156C16.8312 2.50868 18.7928 4.24569 20.5245 6.37837C20.8098 6.72982 20.8099 7.23217 20.5245 7.58361C17.9889 10.7065 14.96 12.981 11 12.981C7.04003 12.981 4.01115 10.7065 1.4755 7.58361C1.19014 7.23216 1.19016 6.72981 1.47551 6.37837C3.69735 3.64197 6.29789 1.55697 9.5717 1.0828C9.75303 1.05654 9.93641 1.03522 10.1219 1.019L10.561 1",stroke:"#999999",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"}),(0,e.jsx)("path",{d:"M13.5 6.98096C13.5 8.36167 12.3807 9.48096 11 9.48096C9.61929 9.48096 8.5 8.36167 8.5 6.98096C8.5 5.60025 9.61929 4.48096 11 4.48096C12.3807 4.48096 13.5 5.60025 13.5 6.98096Z",stroke:"#999999",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})]})})}},7706:function(n,r,t){t.r(r);var e=t(5861),i=t(9439),o=t(7757),a=t.n(o),s=t(2791),c=t(9296),d=t(6356),l=t(9248),u=t(3453),h=t(1134),p=t(8184),m=t(9646),f=t(6871),x=t(3504),g=t(7707),k=t(9559),v=t(1224),j=t(184);r.default=function(){var n=(0,s.useState)(!1),r=(0,i.Z)(n,2),t=r[0],o=r[1],Z=(0,f.s0)(),b=(0,v.a)(),y=(0,i.Z)(b,2),w=y[0],C=y[1],L=(0,h.cI)({mode:"onChange"}),z=L.control,S=L.handleSubmit,N=L.formState.isSubmitting,M=function(){var n=(0,e.Z)(a().mark((function n(r){return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,g.e5)(k.I,r.email,r.password);case 3:(0,g.Aj)(k.I,(function(n){C(n)})),Z("/"),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),console.log(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})));return function(r){return n.apply(this,arguments)}}();return(0,s.useEffect)((function(){null!==w&&void 0!==w&&w.email&&Z("/")}),[]),(0,j.jsx)(c.Z,{children:(0,j.jsxs)("form",{onSubmit:S(M),children:[(0,j.jsxs)(d.Z,{children:[(0,j.jsx)(u.Z,{htmlFor:"email",children:"Email"}),(0,j.jsx)(l.Z,{type:"email",name:"email",placeholder:"Enter your email address",control:z})]}),(0,j.jsxs)(d.Z,{children:[(0,j.jsx)(u.Z,{htmlFor:"password",children:"Password"}),(0,j.jsx)(l.Z,{type:t?"text":"password",name:"password",placeholder:"Enter your password",control:z,children:t?(0,j.jsx)(p.L,{onClick:function(){return o(!1)}}):(0,j.jsx)(p.k,{onClick:function(){return o(!0)}})})]}),(0,j.jsxs)("span",{className:"auth-question",children:["Need an account? ",(0,j.jsx)(x.OL,{to:"/sign-up",children:"Register"})]}),(0,j.jsx)(m.Z,{primary:!0,type:"submit",disabled:N,isLoading:N,children:"Sign In"})]})})}}}]);
//# sourceMappingURL=706.601ccd4d.chunk.js.map