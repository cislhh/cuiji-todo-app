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
      username: "用户"
    });
    const stats = common_vendor.reactive({
      totalTasks: 0,
      completedTasks: 0,
      todayTasks: 0,
      overdueTasks: 0
    });
    const aboutModalVisible = common_vendor.ref(false);
    const nicknameModalVisible = common_vendor.ref(false);
    const newNickname = common_vendor.ref("");
    const onMenuClick = (type) => {
      switch (type) {
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
    const onEditNickname = () => {
      newNickname.value = userInfo.username;
      nicknameModalVisible.value = true;
    };
    const onSaveNickname = () => {
      const trimmedNickname = newNickname.value.trim();
      if (!trimmedNickname) {
        common_vendor.index.showToast({
          title: "昵称不能为空",
          icon: "none"
        });
        return;
      }
      if (trimmedNickname.length > 20) {
        common_vendor.index.showToast({
          title: "昵称长度不能超过20个字符",
          icon: "none"
        });
        return;
      }
      userInfo.username = trimmedNickname;
      nicknameModalVisible.value = false;
      common_vendor.index.showToast({
        title: "昵称修改成功",
        icon: "success"
      });
    };
    const onCancelEditNickname = () => {
      newNickname.value = "";
      nicknameModalVisible.value = false;
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
        c: common_vendor.o(onEditNickname),
        d: common_vendor.o(($event) => onMenuClick("notification")),
        e: common_vendor.o(($event) => onMenuClick("backup")),
        f: common_vendor.o(($event) => onMenuClick("about")),
        g: common_vendor.t(stats.totalTasks),
        h: common_vendor.t(stats.completedTasks),
        i: common_vendor.t(stats.todayTasks),
        j: common_vendor.t(stats.overdueTasks),
        k: common_vendor.o(onLogout),
        l: newNickname.value,
        m: common_vendor.o(($event) => newNickname.value = $event.detail.value),
        n: common_vendor.o(onSaveNickname),
        o: common_vendor.o(onCancelEditNickname),
        p: common_vendor.o(($event) => nicknameModalVisible.value = $event),
        q: common_vendor.p({
          ["confirm-text"]: "保存",
          ["cancel-text"]: "取消",
          width: "600rpx",
          visible: nicknameModalVisible.value
        }),
        r: common_assets._imports_1,
        s: common_vendor.o(($event) => aboutModalVisible.value = $event),
        t: common_vendor.p({
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
