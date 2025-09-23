"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "test-cloud",
  setup(__props) {
    const testResult = common_vendor.ref("等待测试...");
    const initDatabase = async () => {
      testResult.value = "正在初始化数据库...";
      try {
        const result = await common_vendor.nr.callFunction({
          name: "init-database"
        });
        if (result.result.code === 0) {
          testResult.value = `数据库初始化成功：${result.result.message}`;
        } else {
          testResult.value = `数据库初始化失败：${result.result.message}`;
        }
      } catch (error) {
        testResult.value = `数据库初始化错误：${error.message}`;
      }
    };
    const testTaskList = async () => {
      testResult.value = "正在测试获取任务列表...";
      try {
        const result = await common_vendor.nr.callFunction({
          name: "task-list",
          data: {
            page: 1,
            pageSize: 10
          }
        });
        if (result.result.code === 0) {
          testResult.value = `获取任务列表成功：找到${result.result.data.list.length}个任务`;
        } else {
          testResult.value = `获取任务列表失败：${result.result.message}`;
        }
      } catch (error) {
        testResult.value = `获取任务列表错误：${error.message}`;
      }
    };
    const testCreateTask = async () => {
      testResult.value = "正在测试创建任务...";
      try {
        const result = await common_vendor.nr.callFunction({
          name: "task-create",
          data: {
            title: "测试任务",
            description: "这是一个测试任务",
            priority: 2,
            category: "测试分类"
          }
        });
        if (result.result.code === 0) {
          testResult.value = `创建任务成功：${result.result.message}`;
        } else {
          testResult.value = `创建任务失败：${result.result.message}`;
        }
      } catch (error) {
        testResult.value = `创建任务错误：${error.message}`;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(initDatabase),
        b: common_vendor.o(testTaskList),
        c: common_vendor.o(testCreateTask),
        d: common_vendor.t(testResult.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d6e0b106"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/test-cloud/test-cloud.js.map
