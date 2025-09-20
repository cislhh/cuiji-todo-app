"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/tasks/tasks.js";
  "./pages/add/add.js";
  "./pages/statistics/statistics.js";
  "./pages/profile/profile.js";
}
const version = "1.0.0";
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:12", "待办事项管理应用启动", `v${version}`);
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:15", "应用显示");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:18", "应用隐藏");
  },
  globalData: {
    // 全局数据
  }
};
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
