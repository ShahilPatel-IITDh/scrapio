(window.webpackJsonpDelete=window.webpackJsonpDelete||[]).push([[72],{31:function(e,t,o){"use strict";var s=o(0),n=o.n(s),i=o(3),p=o.n(i),l=o(1),a=o.n(l),r=o(125);class h extends n.a.Component{constructor(e){var t,o;super(e),o=()=>{const{onClose:e}=this.props;e&&e()},(t="onModalClose")in this?Object.defineProperty(this,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):this[t]=o,this.modal=null,this.container=document.createElement("div")}componentDidMount(){this.props.isOpen&&this.open()}open(){this.modal||(this.modal=r.a.create(this.container,{bemList:[this.props.theme],onClose:this.onModalClose,title:this.props.title})),this.modal.open()}close(){this.modal.close()}componentDidUpdate(e){e.isOpen!==this.props.isOpen&&(this.props.isOpen?this.open():this.close())}componentWillUnmount(){this.modal&&this.modal.destroy()}render(){return p.a.createPortal(this.props.children,this.container)}}h.propTypes={isOpen:a.a.bool,onClose:a.a.func,theme:a.a.string,children:a.a.node,title:a.a.string},t.a=h}}]);