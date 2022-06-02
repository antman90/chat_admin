class Loading {
  public dom: HTMLElement | null;
  constructor() {
    this.dom = null;
  }
  init() {
    this.create();
    return this;
  }
  create() {
    const dom = document.createElement("div");
    dom.className = "m-loading";
    const oUl = document.createElement("ul");
    oUl.className = "m-loading-wrap";
    for (let i = 0; i < 9; i++) {
      const oLi = document.createElement("li");
      oLi.className = `m-loading-item-${i}`;
      oUl.appendChild(oLi);
    }
    dom.appendChild(oUl);
    document.body.appendChild(dom);
    this.dom = dom;
  }
  destory() {
    if (this.dom) {
      document.body.removeChild(this.dom);
      this.dom = null;
    }
  }
  show() {
    if (this.dom) {
      this.dom.classList.remove("hide");
      this.dom.classList.add("show");
    }
  }
  hide() {
    if (this.dom) {
      this.dom.classList.remove("show");
      this.dom.classList.add("hide");
    }
  }
}

const loading = (function () {
  var instance: any;
  return function () {
    if (instance && instance.dom) instance.destory();
    instance = new Loading().init();
    return instance;
  };
})();

export default loading;
