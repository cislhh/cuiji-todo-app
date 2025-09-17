"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "statistics",
  setup(__props) {
    const taskStats = common_vendor.ref({
      total: 15,
      completed: 9,
      pending: 6
    });
    const categoryStats = common_vendor.ref([
      { name: "工作", count: 8, percent: 53, color: "#1890ff" },
      { name: "生活", count: 4, percent: 27, color: "#52c41a" },
      { name: "学习", count: 3, percent: 20, color: "#faad14" }
    ]);
    const overdueTasks = common_vendor.ref(2);
    const todayCompleted = common_vendor.ref(3);
    const weekCompleted = common_vendor.ref(8);
    const monthCompleted = common_vendor.ref(9);
    const completionRate = common_vendor.computed(() => {
      if (taskStats.value.total === 0)
        return 0;
      return Math.round(taskStats.value.completed / taskStats.value.total * 100);
    });
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/statistics/statistics.vue:128", "统计页面加载完成");
      loadStatistics();
    });
    const loadStatistics = () => {
      common_vendor.index.__f__("log", "at pages/statistics/statistics.vue:134", "加载统计数据");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(completionRate.value),
        b: completionRate.value + "%",
        c: common_vendor.t(taskStats.value.total),
        d: common_vendor.t(taskStats.value.completed),
        e: common_vendor.t(taskStats.value.pending),
        f: common_vendor.t(overdueTasks.value),
        g: common_vendor.f(categoryStats.value, (category, k0, i0) => {
          return {
            a: category.color,
            b: common_vendor.t(category.name),
            c: common_vendor.t(category.count),
            d: common_vendor.t(category.percent),
            e: category.name
          };
        }),
        h: common_vendor.t(todayCompleted.value),
        i: common_vendor.t(weekCompleted.value),
        j: common_vendor.t(monthCompleted.value)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fc23ec97"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/statistics/statistics.js.map
