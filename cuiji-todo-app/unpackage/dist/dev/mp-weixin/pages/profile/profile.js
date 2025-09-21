"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  Modal();
}
const Modal = () => "../../components/Common/Modal.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "profile",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      username: "用户",
      email: "user@example.com"
    });
    const stats = common_vendor.reactive({
      totalTasks: 0,
      completedTasks: 0,
      todayTasks: 0,
      overdueTasks: 0
    });
    const aboutModalVisible = common_vendor.ref(false);
    const onMenuClick = (type) => {
      switch (type) {
        case "settings":
          common_vendor.index.showToast({
            title: "设置功能开发中",
            icon: "none"
          });
          break;
        case "theme":
          common_vendor.index.showToast({
            title: "主题设置功能开发中",
            icon: "none"
          });
          break;
        case "notification":
          common_vendor.index.showToast({
            title: "通知设置功能开发中",
            icon: "none"
          });
          break;
        case "backup":
          common_vendor.index.showToast({
            title: "数据备份功能开发中",
            icon: "none"
          });
          break;
        case "about":
          aboutModalVisible.value = true;
          break;
      }
    };
    const onLogout = () => {
      common_vendor.index.showModal({
        title: "确认退出",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "已退出登录",
              icon: "success"
            });
          }
        }
      });
    };
    const loadStats = () => {
      stats.totalTasks = 25;
      stats.completedTasks = 18;
      stats.todayTasks = 5;
      stats.overdueTasks = 2;
    };
    loadStats();
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(userInfo.username || "用户"),
        c: common_vendor.t(userInfo.email || "user@example.com"),
        d: common_vendor.o(($event) => onMenuClick("settings")),
        e: common_vendor.o(($event) => onMenuClick("theme")),
        f: common_vendor.o(($event) => onMenuClick("notification")),
        g: common_vendor.o(($event) => onMenuClick("backup")),
        h: common_vendor.o(($event) => onMenuClick("about")),
        i: common_vendor.t(stats.totalTasks),
        j: common_vendor.t(stats.completedTasks),
        k: common_vendor.t(stats.todayTasks),
        l: common_vendor.t(stats.overdueTasks),
        m: common_vendor.o(onLogout),
        n: common_assets._imports_1,
        o: common_vendor.o(($event) => aboutModalVisible.value = $event),
        p: common_vendor.p({
          ["show-footer"]: false,
          width: "700rpx",
          visible: aboutModalVisible.value
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd383ca2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
