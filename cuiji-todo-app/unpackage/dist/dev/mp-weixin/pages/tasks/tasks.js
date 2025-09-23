"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  Modal();
}
const Modal = () => "../../components/Common/Modal.js";
const _sfc_main = {
  __name: "tasks",
  setup(__props) {
    const loading = common_vendor.ref(false);
    const showAddModal = common_vendor.ref(false);
    const currentFilter = common_vendor.ref("all");
    const tasks = common_vendor.ref([]);
    const newTask = common_vendor.reactive({
      title: "",
      description: "",
      priority: 2,
      category: "默认分类",
      dueDate: ""
    });
    const priorityOptions = ["低优先级", "中优先级", "高优先级"];
    const priorityIndex = common_vendor.ref(1);
    common_vendor.computed(() => {
      if (currentFilter.value === "all") {
        return tasks.value;
      } else if (currentFilter.value === "pending") {
        return tasks.value.filter((task) => !task.completed);
      } else if (currentFilter.value === "completed") {
        return tasks.value.filter((task) => task.completed);
      }
      return tasks.value;
    });
    const setFilter = (filter) => {
      currentFilter.value = filter;
    };
    const getPriorityText = (priority) => {
      const texts = ["", "低", "中", "高"];
      return texts[priority] || "中";
    };
    const formatTime = (time) => {
      const date = new Date(time);
      const now = /* @__PURE__ */ new Date();
      const diff = now - date;
      if (diff < 6e4) {
        return "刚刚";
      } else if (diff < 36e5) {
        return Math.floor(diff / 6e4) + "分钟前";
      } else if (diff < 864e5) {
        return Math.floor(diff / 36e5) + "小时前";
      } else {
        return date.toLocaleDateString();
      }
    };
    const getTaskList = async () => {
      loading.value = true;
      try {
        const result = await common_vendor.nr.callFunction({
          name: "task-list",
          data: {
            page: 1,
            pageSize: 50
          }
        });
        if (result.result.code === 0) {
          tasks.value = result.result.data.list;
        } else {
          common_vendor.index.showToast({
            title: result.result.message || "获取任务列表失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/tasks/tasks.vue:247", "获取任务列表失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    const deleteTask = async (taskId) => {
      common_vendor.index.showModal({
        title: "确认删除",
        content: "确定要删除这个任务吗？",
        success: async (res) => {
          if (res.confirm) {
            try {
              const result = await common_vendor.nr.callFunction({
                name: "task-delete",
                data: { taskId }
              });
              if (result.result.code === 0) {
                common_vendor.index.showToast({
                  title: "删除成功",
                  icon: "success"
                });
                getTaskList();
              } else {
                common_vendor.index.showToast({
                  title: result.result.message || "删除失败",
                  icon: "none"
                });
              }
            } catch (error) {
              common_vendor.index.__f__("error", "at pages/tasks/tasks.vue:283", "删除任务失败:", error);
              common_vendor.index.showToast({
                title: "网络错误",
                icon: "none"
              });
            }
          }
        }
      });
    };
    const onPriorityChange = (e) => {
      priorityIndex.value = e.detail.value;
      newTask.priority = parseInt(e.detail.value) + 1;
    };
    const onDateChange = (e) => {
      newTask.dueDate = e.detail.value;
    };
    const addTask = async () => {
      if (!newTask.title.trim()) {
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
            title: newTask.title,
            description: newTask.description,
            priority: newTask.priority,
            category: newTask.category,
            dueDate: newTask.dueDate
          }
        });
        if (result.result.code === 0) {
          common_vendor.index.showToast({
            title: "任务添加成功",
            icon: "success"
          });
          closeAddModal();
          getTaskList();
        } else {
          common_vendor.index.showToast({
            title: result.result.message || "添加任务失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/tasks/tasks.vue:341", "添加任务失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "none"
        });
      }
    };
    const opD = () => {
      showAddModal.value = true;
      common_vendor.index.__f__("log", "at pages/tasks/tasks.vue:351", "opD", showAddModal.value);
    };
    const closeAddModal = () => {
      showAddModal.value = false;
      newTask.title = "";
      newTask.description = "";
      newTask.priority = 2;
      newTask.category = "默认分类";
      newTask.dueDate = "";
      priorityIndex.value = 1;
    };
    common_vendor.onMounted(() => {
      getTaskList();
    });
    common_vendor.onShow(() => {
      getTaskList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(opD),
        b: currentFilter.value === "all" ? 1 : "",
        c: common_vendor.o(($event) => setFilter("all")),
        d: currentFilter.value === "pending" ? 1 : "",
        e: common_vendor.o(($event) => setFilter("pending")),
        f: currentFilter.value === "completed" ? 1 : "",
        g: common_vendor.o(($event) => setFilter("completed")),
        h: loading.value
      }, loading.value ? {} : tasks.value.length === 0 ? {} : {
        j: common_vendor.f(tasks.value, (task, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(task.title),
            b: common_vendor.o(($event) => deleteTask(task._id), task._id),
            c: task.description
          }, task.description ? {
            d: common_vendor.t(task.description)
          } : {}, {
            e: common_vendor.t(task.category),
            f: common_vendor.t(getPriorityText(task.priority)),
            g: common_vendor.n("priority-" + task.priority),
            h: common_vendor.t(formatTime(task.createTime)),
            i: task._id,
            j: task.completed ? 1 : ""
          });
        })
      }, {
        i: tasks.value.length === 0,
        k: newTask.title,
        l: common_vendor.o(($event) => newTask.title = $event.detail.value),
        m: newTask.description,
        n: common_vendor.o(($event) => newTask.description = $event.detail.value),
        o: common_vendor.t(priorityOptions[priorityIndex.value]),
        p: priorityIndex.value,
        q: priorityOptions,
        r: common_vendor.o(onPriorityChange),
        s: newTask.category,
        t: common_vendor.o(($event) => newTask.category = $event.detail.value),
        v: common_vendor.t(newTask.dueDate || "选择截止日期"),
        w: newTask.dueDate,
        x: common_vendor.o(onDateChange),
        y: common_vendor.o(closeAddModal),
        z: common_vendor.o(closeAddModal),
        A: common_vendor.o(addTask),
        B: common_vendor.p({
          visible: showAddModal.value,
          ["mask-closable"]: false,
          ["show-footer"]: true,
          ["show-cancel"]: true,
          ["show-confirm"]: true,
          ["cancel-text"]: "取消",
          ["confirm-text"]: "确定"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-027feebf"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/tasks/tasks.js.map
