var X=Object.defineProperty,Z=Object.defineProperties;var ee=Object.getOwnPropertyDescriptors;var F=Object.getOwnPropertySymbols;var te=Object.prototype.hasOwnProperty,re=Object.prototype.propertyIsEnumerable;var O=(e,s,r)=>s in e?X(e,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[s]=r,_=(e,s)=>{for(var r in s||(s={}))te.call(s,r)&&O(e,r,s[r]);if(F)for(var r of F(s))re.call(s,r)&&O(e,r,s[r]);return e},P=(e,s)=>Z(e,ee(s));import{j as Y,r as u,R as se,a as ne}from"./vendor.1530fac7.js";const oe=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}};oe();function j(e){return[...e].sort(()=>Math.random()-.5)}function le(e,s,r,o){const t=[...e][s],n=e.map(C=>C[r]),a=[],d=s-s%3,S=r-r%3;for(let C=d;C<d+3;C++)for(let m=S;m<S+3;m++)a.push(e[C][m]);const k=o!==void 0?[...t.concat(n,a).filter(C=>C!==o&&C!==0)]:[...t.concat(n,a).filter(C=>C!==0)];return[1,2,3,4,5,6,7,8,9].filter(C=>!k.includes(C))}function G(e,s){return Math.floor(Math.random()*(s-e)+e)}const ae=9;function V(e,s,r,o){for(let d=0;d<e.length;d++)if(e[s][d]==o)return!1;for(let d=0;d<e.length;d++)if(e[d][r]==o)return!1;const t=Math.floor(Math.sqrt(e.length)),n=s-s%t,a=r-r%t;for(let d=n;d<n+t;d++)for(let S=a;S<a+t;S++)if(e[d][S]==o)return!1;return!0}function q(e,s){let r=-1,o=-1,t=!0;for(let n=0;n<s;n++)for(let a=0;a<s;a++){if(e[n][a]===0){r=n,o=a,t=!1;break}if(!t)break}if(t)return!0;for(let n=1;n<=s;n++)if(V(e,r,o,n)){if(e[r][o]=n,q(e,s))return!0;e[r][o]=0}return!1}function U(e){const s=Math.floor(Math.random()*81),r=Math.floor(s/9),o=s%9,t=j(le(e,r,o));if(!t.length)U(e);else for(let n=0;n<t.length;n++)if(V(e,r,o,t[n])){e[r][o]=t[n];return}}function ce(){const e=[j([1,2,3,4,5,6,7,8,9]),new Array(9).fill(0),new Array(9).fill(0),new Array(9).fill(0),new Array(9).fill(0),new Array(9).fill(0),new Array(9).fill(0),new Array(9).fill(0),new Array(9).fill(0)];for(let s=0;s<19;s++)try{U(e)}catch(r){return console.log(r),e}return e}function K(){const e=ce();if(q(e,ae))return[...e];throw new Error("Could not generate board...")}function ie(e){return e.map(r=>r.map(o=>({value:o,candidates:[],isLocked:!0,isCorrect:!0,showCorrectness:!1,isHighlighted:!1})))}function ue(e,s){const r=[...e];let o=0;for(;o<s;){const t=G(0,9),n=G(0,5);r[t][n].value!==0&&(t===4&&n===4?(r[t][n].value=0,r[t][n].isLocked=!1,r[t][n].isCorrect=!1,o++):(r[t][n].value=0,r[t][n].isLocked=!1,r[t][n].isCorrect=!1,r[8-t][8-n].value=0,r[8-t][8-n].isLocked=!1,r[8-t][8-n].isCorrect=!1,o+=2))}return r}const l=Y.exports.jsx,N=Y.exports.jsxs,I=u.exports.createContext(null),fe=({children:e})=>{const[s,r]=u.exports.useState("IN_SELECT_DIFFICULTY"),[o,t]=u.exports.useState("normal"),[n,a]=u.exports.useState(40),[d,S]=u.exports.useState([]),[k,C]=u.exports.useState(""),[m,y]=u.exports.useState([]),[x,w]=u.exports.useState(0),[$,L]=u.exports.useState(0),[H,A]=u.exports.useState(0),[B,T]=u.exports.useState(!1);function M(v){switch(v){case"very easy":a(16);break;case"easy":a(26);break;case"normal":a(36);break;case"hard":a(46);break;case"very hard":a(56);break;default:a(36);break}return t(v)}function R(){S(K())}function D(v){let i=0;return v.forEach(c=>c.forEach(g=>{g.value||i++})),i}function h(v){const i=ie([...v]),c=ue(i,n);let g=D(c);a(g),y(c)}function b(v){w(c=>c+=1);const i=[...v];for(let c in i)for(let g in i[c])i[c][g].isLocked||(i[c][g].showCorrectness=!0,i[c][g].value!==d[c][g]?(i[c][g].isCorrect=!1,L(E=>E+=1)):i[c][g].isCorrect=!0);i.every((c,g)=>c.every((E,J)=>E.value===d[g][J]))&&T(!0),y(i)}function f(v,i,c){const g=i*v,E=c/g*100;A(100-E)}function p(){S([]),y([]),M("normal"),w(0),A(0),L(0),T(!1)}return u.exports.useEffect(()=>{switch(s){case"IN_SELECT_DIFFICULTY":{p();break}case"IN_GAME":const v=performance.now();let i=!1,c=1;for(;!i&&c<10;)try{const g=K(),E=performance.now();C((E-v).toPrecision(3)),console.log(`Success on attempt ${c}`),S(g),h(g),i=!0}catch(g){c++}break}},[s]),u.exports.useEffect(()=>{x&&f(x,n,$)},[x]),l(I.Provider,{value:{gameState:s,setGameState:r,difficulty:o,selectDifficulty:M,board:m,generationTime:k,generateSolvedBoard:R,checkCorrectness:b,attempts:x,isCorrectSolution:B,accuracy:H,numOfHoles:n},children:e})},de=[{name:"VERY EASY",value:"very easy"},{name:"EASY",value:"easy"},{name:"NORMAL",value:"normal"},{name:"HARD",value:"hard"},{name:"VERY HARD",value:"very hard"}],he=()=>{const{difficulty:e,selectDifficulty:s,setGameState:r}=u.exports.useContext(I);return N("div",{className:"select-difficulty-screen",children:[l("h4",{children:"Select difficulty:"}),l("div",{className:"difficulty-btn-container",children:de.map((o,t)=>l("button",{className:`btn difficulty-btn ${e===o.value?"selected":""}`,onClick:()=>s(o.value),children:o.name},t))}),l("button",{className:"btn start-btn",onClick:()=>r("IN_GAME"),children:"START"})]})};function Q(e){const s=Math.floor(e/60/60),r=Math.floor(e/60)%60,o=Math.floor(e-r*60);let t="";return t+=s?`${s}h `:"",t+=r?`${r}min `:"",t+=`${o}s`,t}function W(e){return Intl.NumberFormat("en-GB",{style:"percent",maximumFractionDigits:2}).format(e/100)}const me=({generationTime:e,difficulty:s,timer:r,numOfFilled:o,numOfHoles:t,attempts:n,accuracy:a})=>N("div",{className:"info-screen",children:[N("p",{className:"info",children:[l("b",{children:"Difficulty"}),": ",l("span",{className:"info-difficulty",children:s})]}),N("p",{className:"info",children:[l("b",{children:"Filled cells"}),": ",o," of ",t]}),N("p",{className:"info",children:[l("b",{children:"Elapsed time"}),": ",Q(r)]}),N("p",{className:"info",children:[l("b",{children:"Number of attempts"}),": ",n]}),N("p",{className:"info",children:[l("b",{children:"Accuracy"}),": ",n?W(a):"No attempts"]}),N("p",{className:"generation-time",children:["This board was generated in ",l("b",{children:e})," ms"]})]}),pe=({difficulty:e,timer:s,attempts:r,accuracy:o})=>N("div",{className:"result-screen",children:[l("h3",{className:"result-title",children:"WELL DONE!"}),N("p",{className:"result-info",children:["You completed this ",l("b",{children:e})," board"]}),N("p",{className:"result-info",children:["with ",l("b",{children:W(o)})," accuracy in"," ",N("b",{children:[r," ",r>1?"attempts":"attempt"]}),"."]}),N("p",{className:"result-info",children:["The game lasted for ",l("b",{children:Q(s)})]})]}),z=[1,2,3,4,5,6,7,8,9],ge=({value:e,candidates:s,rowIndex:r,colIndex:o,onClose:t,onCellChange:n})=>{const[a,d]=u.exports.useState(e),[S,k]=u.exports.useState(s);function C(y){k(x=>x.includes(y)?x.filter(w=>w!==y):[...x,y])}function m(){d(0),k([])}return u.exports.useEffect(()=>{n(a,S,r,o)},[a,S]),u.exports.useEffect(()=>{d(e),k(s)},[r,o]),N("div",{className:"cell-editor",children:[N("div",{className:"editor-btn-container",children:[l("button",{className:"btn close-btn",onClick:()=>t(),children:"Close"}),l("button",{className:"btn reset-btn",onClick:()=>m(),children:"Reset"})]}),l("ul",{className:"cell-value-list",children:z.map((y,x)=>l("button",{className:`btn val-btn ${y===a?"selected":""}`,onClick:()=>d(y===a?0:y),children:y},x))}),l("div",{className:"candidates-row",children:l("ul",{className:"cell-candidates-list",children:z.map((y,x)=>l("button",{className:`btn candidate-btn ${S.includes(y)?"selected":""}`,onClick:()=>C(y),children:y},x))})})]})},Ce=()=>{const{board:e,generationTime:s,checkCorrectness:r,attempts:o,isCorrectSolution:t,difficulty:n,accuracy:a,numOfHoles:d,setGameState:S}=u.exports.useContext(I),[k,C]=u.exports.useState([]),[m,y]=u.exports.useState(null),[x,w]=u.exports.useState(0),[$,L]=u.exports.useState(0),[H,A]=u.exports.useState(!0);function B(h){return h.map(f=>f.map(p=>P(_({},p),{isHighlighted:!1})))}function T(h,b){C(f=>{const p=B(f);p[h].forEach(c=>c.isHighlighted=!0),p.forEach(c=>c[b].isHighlighted=!0);const v=h-h%3,i=b-b%3;for(let c=v;c<v+3;c++)for(let g=i;g<i+3;g++)p[c][g].isHighlighted=!0;return p[h][b].isHighlighted=!1,p})}function M(h,b,f,p){T(f,p),y({value:h,candidates:b,rowIndex:f,colIndex:p})}function R(){y(null),C(h=>B(h))}function D(h,b,f,p){C(v=>{const i=[...v];return i[f][p].value=h,i[f][p].candidates=b,i[f][p].showCorrectness=!1,i[f][p].isCorrect=!1,i})}return u.exports.useEffect(()=>{let h;return t?clearInterval(h):h=setInterval(()=>{w(b=>b+=1)},1e3),()=>clearInterval(h)},[t]),u.exports.useEffect(()=>{let h=0;k.forEach(b=>{b.forEach(f=>{!f.isLocked&&f.value&&(h+=1)})}),L(h),A(h===d)},[k]),u.exports.useEffect(()=>{C([...e])},[e]),N("div",{className:"sudoku-game-screen",children:[l("table",{className:"sudoku-board",cellPadding:"0",cellSpacing:"0",children:k.length?l("tbody",{children:k.map((h,b)=>l("tr",{className:"board-row",children:h.map((f,p)=>l("td",{className:`board-cell ${f.isLocked?"locked":""} ${t?"done":""} ${b===(m==null?void 0:m.rowIndex)&&p===m.colIndex?"selected":""} ${f.isHighlighted?"highlight":""}`,onClick:f.isLocked?void 0:()=>(m==null?void 0:m.rowIndex)===b&&m.colIndex===p?R():M(f.value,f.candidates,b,p),children:l("p",{className:`cell-value ${!f.isLocked&&f.showCorrectness?f.isCorrect?"correct":"incorrect":""}`,children:f.value?f.value:null})},p))},b))}):null}),N("div",{className:"bottom-container",children:[l("div",{className:`info-wrapper ${m?"":"open"}`,children:t?l(pe,{difficulty:n,timer:x,attempts:o,accuracy:a}):l(me,{generationTime:s,difficulty:n,timer:x,numOfFilled:$,numOfHoles:d,attempts:o,accuracy:a})}),l("div",{className:`cell-editor-wrapper ${m?"open":""}`,children:m&&l(ge,{value:m.value,candidates:m.candidates,rowIndex:m.rowIndex,colIndex:m.colIndex,onClose:R,onCellChange:D})})]}),N("div",{className:"game-btn-container",children:[l("button",{className:`btn ${t?"play-again-btn":"quit-btn"}`,onClick:()=>S("IN_SELECT_DIFFICULTY"),children:t?"Play Again":"Quit"}),!t&&l("button",{className:"btn try-solution-btn",onClick:()=>r(k),disabled:t||!H,children:"Try Solution"})]})]})},be=()=>{const{board:e,gameState:s}=u.exports.useContext(I);return N("div",{className:"App",children:[s==="IN_SELECT_DIFFICULTY"?l(he,{}):null,e.length?l(Ce,{}):null]})};se.render(l(ne.StrictMode,{children:l(fe,{children:l(be,{})})}),document.getElementById("root"));