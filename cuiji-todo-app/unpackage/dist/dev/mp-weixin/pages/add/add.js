"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "add",
  setup(__props) {
    const taskForm = common_vendor.reactive({
      title: "",
      description: "",
      priority: "中等",
      dueDate: "",
      category: "工作"
    });
    const priorityOptions = ["低", "中等", "高", "紧急"];
    const categoryOptions = ["工作", "学习", "生活", "其他"];
    const priorityIndex = common_vendor.ref(1);
    const categoryIndex = common_vendor.ref(0);
    const onPriorityChange = (e) => {
      priorityIndex.value = e.detail.value;
      taskForm.priority = priorityOptions[e.detail.value];
    };
    const onCategoryChange = (e) => {
      categoryIndex.value = e.detail.value;
      taskForm.category = categoryOptions[e.detail.value];
    };
    const onDateChange = (e) => {
      taskForm.dueDate = e.detail.value;
    };
    const onCancel = () => {
      common_vendor.index.navigateBack();
    };
    const onConfirm = () => {
      if (!taskForm.title.trim()) {
        common_vendor.index.showToast({
          title: "请输入任务标题",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showToast({
        title: "任务添加成功",
        icon: "success"
      });
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 1500);
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
        i: common_vendor.t(taskForm.dueDate || "请选择截止日期"),
        j: taskForm.dueDate,
        k: common_vendor.o(onDateChange),
        l: common_vendor.t(categoryOptions[categoryIndex.value]),
        m: categoryIndex.value,
        n: categoryOptions,
        o: common_vendor.o(onCategoryChange),
        p: common_vendor.o(onCancel),
        q: common_vendor.o(onConfirm)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e8d2fd40"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/add/add.js.map
