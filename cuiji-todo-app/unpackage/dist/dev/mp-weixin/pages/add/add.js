"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "add",
  setup(__props) {
    const taskForm = common_vendor.reactive({
      title: "",
      description: "",
      priority: 2,
      category: "默认分类",
      dueDate: ""
    });
    const priorityOptions = ["低优先级", "中优先级", "高优先级"];
    const priorityIndex = common_vendor.ref(1);
    const onPriorityChange = (e) => {
      priorityIndex.value = e.detail.value;
      taskForm.priority = parseInt(e.detail.value) + 1;
    };
    const onDateChange = (e) => {
      taskForm.dueDate = e.detail.value;
    };
    const submitTask = async () => {
      if (!taskForm.title.trim()) {
        common_vendor.index.showToast({
          title: "请输入任务标题",
          icon: "none"
        });
        return;
      }
      try {
        const result = await common_vendor.nr.callFunction({
          name: "task-create",
          data: {
            title: taskForm.title,
            description: taskForm.description,
            priority: taskForm.priority,
            category: taskForm.category,
            dueDate: taskForm.dueDate
          }
        });
        if (result.result.code === 0) {
          common_vendor.index.showToast({
            title: "任务添加成功",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        } else {
          common_vendor.index.showToast({
            title: result.result.message || "添加任务失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/add/add.vue:147", "添加任务失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: taskForm.title,
        b: common_vendor.o(($event) => taskForm.title = $event.detail.value),
        c: taskForm.description,
        d: common_vendor.o(($event) => taskForm.description = $event.detail.value),
        e: common_vendor.t(priorityOptions[priorityIndex.value]),
        f: priorityIndex.value,
        g: priorityOptions,
        h: common_vendor.o(onPriorityChange),
        i: taskForm.category,
        j: common_vendor.o(($event) => taskForm.category = $event.detail.value),
        k: common_vendor.t(taskForm.dueDate || "选择截止日期"),
        l: taskForm.dueDate,
        m: common_vendor.o(onDateChange),
        n: common_vendor.o(goBack),
        o: common_vendor.o(submitTask),
        p: !taskForm.title.trim() ? 1 : ""
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e8d2fd40"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/add/add.js.map
