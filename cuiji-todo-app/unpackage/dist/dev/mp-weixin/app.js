"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const common_assets = require("./common/assets.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/tasks/tasks.js";
  "./pages/add/add.js";
  "./pages/statistics/statistics.js";
  "./pages/profile/profile.js";
}
const version = "1.0.0";
const _sfc_main$1 = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "CustomTabBar",
  setup(__props) {
    const currentIndex = common_vendor.ref(0);
    const switchTab = (index, url) => {
      currentIndex.value = index;
      common_vendor.index.switchTab({ url });
    };
    const createTask = () => {
      common_vendor.index.navigateTo({
        url: "/pages/tasks/tasks?action=create"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentIndex.value === 0
      }, currentIndex.value === 0 ? {
        b: common_assets._imports_0
      } : {
        c: common_assets._imports_1
      }, {
        d: currentIndex.value === 0 ? 1 : "",
        e: common_vendor.o(($event) => switchTab(0, "/pages/index/index")),
        f: common_vendor.o(createTask),
        g: currentIndex.value === 1
      }, currentIndex.value === 1 ? {
        h: common_assets._imports_2
      } : {
        i: common_assets._imports_3
      }, {
        j: currentIndex.value === 1 ? 1 : "",
        k: common_vendor.o(($event) => switchTab(1, "/pages/statistics/statistics"))
      });
    };
  }
});
const _easycom_CustomTabBar = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$1, [["__scopeId", "data-v-208a9ade"]]);
const _sfc_main = {
  components: {
    CustomTabBar: _easycom_CustomTabBar
  },
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:18", "待办事项管理应用启动", `v${version}`);
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:21", "应用显示");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:24", "应用隐藏");
  },
  globalData: {
    // 全局数据
  }
};
if (!Array) {
  const _easycom_CustomTabBar2 = common_vendor.resolveComponent("CustomTabBar");
  _easycom_CustomTabBar2();
}
if (!Math) {
  _easycom_CustomTabBar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  app.use(common_vendor.createPinia());
  app.config.globalProperties.$adpid = "1111111111";
  app.config.globalProperties.$backgroundAudioData = {
    playing: false,
    playTime: 0,
    formatedPlayTime: "00:00:00"
  };
  return {
    app,
    Vuex: common_vendor.index$1,
    // 如果 nvue 使用 vuex 的各种map工具方法时，必须 return Vuex
    Pinia: common_vendor.Pinia
    // 此处必须将 Pinia 返回
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
