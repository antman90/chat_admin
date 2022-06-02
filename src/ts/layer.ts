class Layer {
  public msg: string;
  public interval: number;
  public dom: HTMLElement | null;
  static layer_css: HTMLStyleElement;
  constructor(msg: string, interval: number = 2000) {
    this.msg = msg;
    this.interval = interval;
    this.dom = null;
  }
  init() {
    this.setStyle();
    this.life();
    return this;
  }
  setStyle() {
    if (Layer.layer_css) return;
    var _style = document.createElement("style");
    _style.innerText =
      ".mf-layer-hint{z-index:910250000000;position:fixed;left:50%;bottom:30%;height:30px;padding:0 12px;-webkit-transform:translate(-50%,0);-ms-transform:translate(-50%,0);transform:translate(-50%,0);line-height:30px;font-size:14px;color:#fff;background-color:rgb(237, 153, 33);border-radius:4px}.mf-layer-in{-webkit-animation:mf-layer-in .1s ease-in-out;animation:mf-layer-in .1s ease-in-out}.mf-layer-out{-webkit-animation:mf-layer-out .25s linear;animation:mf-layer-out .25s linear}@-webkit-keyframes mf-layer-in{from{bottom:10%}to{bottom:30%}}@keyframes mf-layer-in{from{bottom:10%}to{bottom:30%}}@-webkit-keyframes mf-layer-out{from{opacity:1;-webkit-transform:translate(-50%,0);transform:translate(-50%,0)}to{opacity:0;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}}@keyframes mf-layer-out{from{opacity:1;-webkit-transform:translate(-50%,0);transform:translate(-50%,0)}to{opacity:0;-webkit-transform:translate(-50%,100%);transform:translate(-50%,100%)}}";
    const headDom = document.querySelector("head") as HTMLHeadElement;
    headDom.appendChild(_style);
    Layer.layer_css = _style;
  }
  create() {
    var dom = document.createElement("div");
    dom.className = "mf-layer-hint mf-layer-in";
    dom.innerText = this.msg;
    document.body.appendChild(dom);
    this.dom = dom;
  }
  life() {
    this.create();
    setTimeout(() => {
      var el = this.dom;
      if (el) {
        el.className = el.className.replace("-in", "-out");
        setTimeout(() => {
          this.destory();
        }, 200);
      }
    }, this.interval);
  }
  destory() {
    if (this.dom) {
      document.body.removeChild(this.dom);
      this.dom = null;
    }
  }
}

const layer = (function () {
  var instance: any;
  return function (msg: string, interval?: number) {
    if (instance && instance.dom) instance.destory();
    instance = new Layer(msg, interval).init();
    return instance;
  };
})();

export default layer;
