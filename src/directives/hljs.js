import Vue from "vue";

const bus = new Vue();

let styleStatus = 0;
let jsStatus = 0;

// 注册一个全局自定义指令 `v-hljs`
Vue.directive("hljs", {
  bind() {
    if (styleStatus <= 0) {
      loadStyle().then(
        () => {
          styleStatus = 1;
          if (jsStatus === 1) bus.$emit("ready");
        },
        () => {}
      );
    }
    if (jsStatus <= 0) {
      loadJs().then(
        () => {
          jsStatus = 1;
          if (styleStatus === 1) bus.$emit("ready");
        },
        () => {}
      );
    }
  },
  inserted(el) {
    if (styleStatus === 1 && jsStatus === 1) {
      render(el);
    } else {
      bus.$once("ready", () => {
        render(el);
      });
    }
  },
  componentUpdated(el) {
    if (styleStatus === 1 && jsStatus === 1) {
      render(el);
    } else {
      bus.$once("ready", () => {
        render(el);
      });
    }
  }
});

function render(el) {
  if (el.__hljsDOM__) {
    el.__hljsDOM__.remove();
    el.__hljsDOM__ = null;
  }

  el.style.display = "none";
  const copy = el.cloneNode(true);
  if (el.nextSibling) {
    el.parentNode.insertBefore(copy, el.nextSibling);
  } else {
    el.parentNode.appendChild(copy);
  }

  copy.style.display = "";
  el.__hljsDOM__ = copy;
  window.hljs.highlightBlock(copy);
}

function loadStyle() {
  return new Promise((res, rej) => {
    const link = document.createElement("link");
    link.href =
      "https://cdn.staticfile.org/highlight.js/10.2.0/styles/vs2015.min.css";
    link.rel = "stylesheet";
    link.addEventListener("load", res);
    link.addEventListener("error", rej);
    document.head.appendChild(link);
  });
}

function loadJs() {
  return new Promise((res, rej) => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.staticfile.org/highlight.js/10.2.0/highlight.min.js";
    script.addEventListener("load", res);
    script.addEventListener("error", rej);
    document.body.appendChild(script);
  });
}
