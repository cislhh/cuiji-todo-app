"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_u_search = common_vendor.resolveComponent("u-search");
  const _component_u_button = common_vendor.resolveComponent("u-button");
  (_component_u_search + _component_u_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tasks",
  setup(__props) {
    const searchKeyword = common_vendor.ref("");
    const tasks = common_vendor.ref([
      {
        id: 1,
        title: "完成项目文档",
        description: "编写API文档和用户手册",
        completed: false,
        priority: "high",
        dueDate: "2024-01-30",
        category: "工作",
        createTime: /* @__PURE__ */ new Date()
      },
      {
        id: 2,
        title: "购买生活用品",
        description: "去超市购买日用品",
        completed: true,
        priority: "medium",
        dueDate: "2024-01-28",
        category: "生活",
        createTime: /* @__PURE__ */ new Date()
      }
    ]);
    const taskStats = common_vendor.computed(() => {
      const total = tasks.value.length;
      const completed = tasks.value.filter((task) => task.completed).length;
      const pending = total - completed;
      return { total, completed, pending };
    });
    const filteredTasks = common_vendor.computed(() => {
      if (!searchKeyword.value)
        return tasks.value;
      return tasks.value.filter(
        (task) => task.title.toLowerCase().includes(searchKeyword.value.toLowerCase()) || task.description.toLowerCase().includes(searchKeyword.value.toLowerCase())
      );
    });
    const handleSearch = () => {
    };
    const handleClearSearch = () => {
      searchKeyword.value = "";
    };
    const toggleTaskComplete = (taskId) => {
      const task = tasks.value.find((t) => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    };
    const deleteTask = (taskId) => {
      common_vendor.index.showModal({
        title: "确认删除",
        content: "确定要删除这个任务吗？",
        success: (res) => {
          if (res.confirm) {
            tasks.value = tasks.value.filter((t) => t.id !== taskId);
            common_vendor.index.showToast({
              title: "删除成功",
              icon: "success"
            });
          }
        }
      });
    };
    const getPriorityText = (priority) => {
      const map = {
        low: "低",
        medium: "中",
        high: "高",
        urgent: "紧急"
      };
      return map[priority] || "中";
    };
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("zh-CN");
    };
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/tasks/tasks.vue:176", "任务页面加载完成");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(taskStats.value.total),
        b: common_vendor.t(taskStats.value.completed),
        c: common_vendor.t(taskStats.value.pending),
        d: common_vendor.o(handleSearch),
        e: common_vendor.o(handleClearSearch),
        f: common_vendor.o(($event) => searchKeyword.value = $event),
        g: common_vendor.p({
          placeholder: "搜索任务...",
          modelValue: searchKeyword.value
        }),
        h: tasks.value.length === 0
      }, tasks.value.length === 0 ? {} : {
        i: common_vendor.f(filteredTasks.value, (task, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(task.title),
            b: common_vendor.t(getPriorityText(task.priority)),
            c: common_vendor.n(task.priority),
            d: task.description
          }, task.description ? {
            e: common_vendor.t(task.description)
          } : {}, {
            f: task.dueDate
          }, task.dueDate ? {
            g: common_vendor.t(formatDate(task.dueDate))
          } : {}, {
            h: common_vendor.t(task.category),
            i: common_vendor.t(task.completed ? "未完成" : "完成"),
            j: common_vendor.o(($event) => toggleTaskComplete(task.id), task.id),
            k: "027feebf-1-" + i0,
            l: common_vendor.o(($event) => deleteTask(task.id), task.id),
            m: "027feebf-2-" + i0,
            n: task.id,
            o: task.completed ? 1 : ""
          });
        }),
        j: common_vendor.p({
          type: "primary",
          size: "mini"
        }),
        k: common_vendor.p({
          type: "error",
          size: "mini"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-027feebf"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/tasks/tasks.js.map
