(window.webpackJsonpDelete=window.webpackJsonpDelete||[]).push([[59],{126:function(t,e,i){"use strict";var n=i(0),s=i.n(n),o=i(1),r=i.n(o),c=i(19),a=i.n(c),u=i(35),h=i(22),b=i(106),l=i(72);function p(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}class d extends b.a{constructor(t){super(t),p(this,"_init",()=>{h.a.isMobile?window.addEventListener("touchstart",this._onMove):Object(l.a)(window,"mousemove",this._onMove)}),p(this,"_onMove",t=>{let e=!1;Object.keys(this._subscribers).forEach(i=>{e||(e=this._subscribers[i](t))})}),this._init()}}const f=new d;function m(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}class v extends s.a.Component{constructor(t){super(t),m(this,"_onMouseMove",t=>{if(!this.buttonSize)return;const{isActive:e}=this.state,i=this._checkIfInsideElement(t);return i&&requestAnimationFrame(()=>{this._updatePosition(t)}),e!==i&&this.setState({isActive:i}),i}),m(this,"_checkIfInsideElement",({clientX:t,clientY:e})=>{const i=this.containerRef.current.getBoundingClientRect(),n=h.a.isMobile?0:this.buttonSize.width/2,s=h.a.isMobile?0:this.buttonSize.height/2;return t>=i.left+n&&t<=i.right-n&&e>=i.top+s&&e<=i.bottom-s}),m(this,"_onTouchStart",t=>{const e=this._checkIfInsideElement(t.touches[0]);return e&&(this.setState({isActive:!1}),f.unsubscribe(this.id)),e}),this.containerRef=s.a.createRef(),this.buttonRef=s.a.createRef(),this.state={isActive:h.a.isMobile},this.id=a()(10)}_updatePosition(t){const{pageX:e,pageY:i}=t,{left:n,top:s}=this.containerRef.current.getBoundingClientRect(),o=e-this.buttonSize.width/2-n-window.pageXOffset,r=i-this.buttonSize.height/2-s-window.pageYOffset;this.buttonRef.current.style.transform=`translate(${o}px, ${r}px)`}render(){const{isActive:t}=this.state,{text:e,bemList:i}=this.props,n=Object(u.a)("prompt-button",i);return s.a.createElement("div",{className:"prompt-button-canvas",ref:this.containerRef},s.a.createElement("div",{ref:this.buttonRef,className:`${n}${t?" is-active":""}`},s.a.createElement("div",{className:"prompt-button__inner"},e)))}componentDidMount(){this.buttonSize={width:this.buttonRef.current.clientWidth,height:this.buttonRef.current.clientHeight},f.subscribe(this.id,h.a.isMobile?this._onTouchStart:this._onMouseMove)}componentWillUnmount(){f.unsubscribe(this.id)}}v.propTypes={text:r.a.string},e.a=v}}]);