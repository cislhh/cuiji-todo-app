"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_u_search = common_vendor.resolveComponent("u-search");
  const _component_u_button = common_vendor.resolveComponent("u-button");
  const _component_u_input = common_vendor.resolveComponent("u-input");
  const _component_u_form_item = common_vendor.resolveComponent("u-form-item");
  const _component_u_textarea = common_vendor.resolveComponent("u-textarea");
  const _component_u_select = common_vendor.resolveComponent("u-select");
  const _component_u_datetime_picker = common_vendor.resolveComponent("u-datetime-picker");
  const _component_u_form = common_vendor.resolveComponent("u-form");
  const _component_u_popup = common_vendor.resolveComponent("u-popup");
  (_component_u_search + _component_u_button + _component_u_input + _component_u_form_item + _component_u_textarea + _component_u_select + _component_u_datetime_picker + _component_u_form + _component_u_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tasks",
  setup(__props) {
    const searchKeyword = common_vendor.ref("");
    const showAddTask = common_vendor.ref(false);
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
    const newTask = common_vendor.reactive({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      category: ""
    });
    const priorityOptions = [
      { label: "低", value: "low" },
      { label: "中", value: "medium" },
      { label: "高", value: "high" },
      { label: "紧急", value: "urgent" }
    ];
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
    const addTask = () => {
      if (!newTask.title.trim()) {
        common_vendor.index.showToast({
          title: "请输入任务标题",
          icon: "none"
        });
        return;
      }
      const task = {
        id: Date.now(),
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        completed: false,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        category: newTask.category.trim() || "未分类",
        createTime: /* @__PURE__ */ new Date()
      };
      tasks.value.unshift(task);
      Object.assign(newTask, {
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        category: ""
      });
      showAddTask.value = false;
      common_vendor.index.showToast({
        title: "添加成功",
        icon: "success"
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
      common_vendor.index.__f__("log", "at pages/tasks/tasks.vue:302", "任务页面加载完成");
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const options = currentPage.options;
      if (options.action === "create") {
        setTimeout(() => {
          showAddTask.value = true;
        }, 300);
      }
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
        h: common_vendor.o(($event) => showAddTask.value = true),
        i: common_vendor.p({
          type: "primary",
          size: "mini"
        }),
        j: tasks.value.length === 0
      }, tasks.value.length === 0 ? {} : {
        k: common_vendor.f(filteredTasks.value, (task, k0, i0) => {
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
            k: "027feebf-2-" + i0,
            l: common_vendor.o(($event) => deleteTask(task.id), task.id),
            m: "027feebf-3-" + i0,
            n: task.id,
            o: task.completed ? 1 : ""
          });
        }),
        l: common_vendor.p({
          type: "primary",
          size: "mini"
        }),
        m: common_vendor.p({
          type: "error",
          size: "mini"
        })
      }, {
        n: common_vendor.o(($event) => showAddTask.value = false),
        o: common_vendor.p({
          type: "text"
        }),
        p: common_vendor.o(($event) => newTask.title = $event),
        q: common_vendor.p({
          placeholder: "请输入任务标题",
          maxlength: "50",
          modelValue: newTask.title
        }),
        r: common_vendor.p({
          label: "任务标题"
        }),
        s: common_vendor.o(($event) => newTask.description = $event),
        t: common_vendor.p({
          placeholder: "请输入任务描述（可选）",
          maxlength: "200",
          ["auto-height"]: true,
          modelValue: newTask.description
        }),
        v: common_vendor.p({
          label: "任务描述"
        }),
        w: common_vendor.o(($event) => newTask.priority = $event),
        x: common_vendor.p({
          options: priorityOptions,
          placeholder: "选择优先级",
          modelValue: newTask.priority
        }),
        y: common_vendor.p({
          label: "优先级"
        }),
        z: common_vendor.o(($event) => newTask.dueDate = $event),
        A: common_vendor.p({
          mode: "datetime",
          placeholder: "选择截止日期（可选）",
          modelValue: newTask.dueDate
        }),
        B: common_vendor.p({
          label: "截止日期"
        }),
        C: common_vendor.o(($event) => newTask.category = $event),
        D: common_vendor.p({
          placeholder: "输入分类（可选）",
          maxlength: "20",
          modelValue: newTask.category
        }),
        E: common_vendor.p({
          label: "分类"
        }),
        F: common_vendor.p({
          model: newTask,
          ["label-position"]: "top"
        }),
        G: common_vendor.o(($event) => showAddTask.value = false),
        H: common_vendor.o(addTask),
        I: common_vendor.p({
          type: "primary"
        }),
        J: common_vendor.o(($event) => showAddTask.value = $event),
        K: common_vendor.p({
          mode: "bottom",
          height: "80%",
          modelValue: showAddTask.value
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-027feebf"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/tasks/tasks.js.map
