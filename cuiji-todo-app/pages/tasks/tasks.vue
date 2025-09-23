<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="header">
      <text class="title">任务管理</text>
      <view class="add-btn" @click="opD">
        <text class="add-icon">+</text>
      </view>
    </view>

    <!-- 筛选栏 -->
    <view class="filter-bar">
      <view
        class="filter-item"
        :class="{ active: currentFilter === 'all' }"
        @click="setFilter('all')"
      >
        <text>全部</text>
      </view>
      <view
        class="filter-item"
        :class="{ active: currentFilter === 'pending' }"
        @click="setFilter('pending')"
      >
        <text>待完成</text>
      </view>
      <view
        class="filter-item"
        :class="{ active: currentFilter === 'completed' }"
        @click="setFilter('completed')"
      >
        <text>已完成</text>
      </view>
    </view>

    <!-- 任务列表 -->
    <view class="task-list">
      <view v-if="loading" class="loading">
        <text>加载中...</text>
      </view>

      <view v-else-if="tasks.length === 0" class="empty">
        <text class="empty-text">暂无任务</text>
        <text class="empty-tip">点击右上角 + 号添加任务</text>
      </view>

      <view v-else>
        <view
          v-for="task in tasks"
          :key="task._id"
          class="task-item"
          :class="{ completed: task.completed }"
        >
          <view class="task-content">
            <view class="task-header">
              <text class="task-title">{{ task.title }}</text>
              <view class="task-actions">
                <view
                  class="action-btn delete-btn"
                  @click="deleteTask(task._id)"
                >
                  <text class="action-icon">🗑️</text>
                </view>
              </view>
            </view>

            <view v-if="task.description" class="task-description">
              <text>{{ task.description }}</text>
            </view>

            <view class="task-meta">
              <text class="task-category">{{ task.category }}</text>
              <text class="task-priority" :class="'priority-' + task.priority">
                {{ getPriorityText(task.priority) }}
              </text>
              <text class="task-time">{{ formatTime(task.createTime) }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 添加任务弹窗 -->
    <Modal
      :visible="showAddModal"
      :mask-closable="false"
      :show-footer="true"
      :show-cancel="true"
      :show-confirm="true"
      cancel-text="取消"
      confirm-text="确定"
      @close="closeAddModal"
      @cancel="closeAddModal"
      @confirm="addTask"
    >
      <view class="modal-content">
        <view class="modal-header">
          <text class="modal-title">添加任务</text>
        </view>

        <view class="modal-body">
          <view class="form-item">
            <text class="form-label">任务标题 *</text>
            <input
              v-model="newTask.title"
              class="form-input"
              placeholder="请输入任务标题"
              maxlength="100"
            />
          </view>

          <view class="form-item">
            <text class="form-label">任务描述</text>
            <textarea
              v-model="newTask.description"
              class="form-textarea"
              placeholder="请输入任务描述"
              maxlength="500"
            />
          </view>

          <view class="form-item">
            <text class="form-label">优先级</text>
            <picker
              :value="priorityIndex"
              :range="priorityOptions"
              @change="onPriorityChange"
            >
              <view class="picker-view">
                <text>{{ priorityOptions[priorityIndex] }}</text>
                <text class="picker-arrow">▼</text>
              </view>
            </picker>
          </view>

          <view class="form-item">
            <text class="form-label">分类</text>
            <input
              v-model="newTask.category"
              class="form-input"
              placeholder="请输入分类"
              maxlength="50"
            />
          </view>

          <view class="form-item">
            <text class="form-label">截止日期</text>
            <picker mode="date" :value="newTask.dueDate" @change="onDateChange">
              <view class="picker-view">
                <text>{{ newTask.dueDate || "选择截止日期" }}</text>
                <text class="picker-arrow">▼</text>
              </view>
            </picker>
          </view>
        </view>
      </view>
    </Modal>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { onShow } from "@dcloudio/uni-app";
import Modal from "@/components/Common/Modal.vue";

// 响应式数据
const loading = ref(false);
const showAddModal = ref(false);
const currentFilter = ref("all");
const tasks = ref([]);

// 新任务数据
const newTask = reactive({
  title: "",
  description: "",
  priority: 2,
  category: "默认分类",
  dueDate: "",
});

// 优先级选项
const priorityOptions = ["低优先级", "中优先级", "高优先级"];
const priorityIndex = ref(1); // 默认中优先级

// 计算属性
const filteredTasks = computed(() => {
  if (currentFilter.value === "all") {
    return tasks.value;
  } else if (currentFilter.value === "pending") {
    return tasks.value.filter((task) => !task.completed);
  } else if (currentFilter.value === "completed") {
    return tasks.value.filter((task) => task.completed);
  }
  return tasks.value;
});

// 方法
const setFilter = (filter) => {
  currentFilter.value = filter;
};

const getPriorityText = (priority) => {
  const texts = ["", "低", "中", "高"];
  return texts[priority] || "中";
};

const formatTime = (time) => {
  const date = new Date(time);
  const now = new Date();
  const diff = now - date;

  if (diff < 60000) {
    // 1分钟内
    return "刚刚";
  } else if (diff < 3600000) {
    // 1小时内
    return Math.floor(diff / 60000) + "分钟前";
  } else if (diff < 86400000) {
    // 1天内
    return Math.floor(diff / 3600000) + "小时前";
  } else {
    return date.toLocaleDateString();
  }
};

// 获取任务列表
const getTaskList = async () => {
  loading.value = true;
  try {
    const result = await uniCloud.callFunction({
      name: "task-list",
      data: {
        page: 1,
        pageSize: 50,
      },
    });

    if (result.result.code === 0) {
      tasks.value = result.result.data.list;
    } else {
      uni.showToast({
        title: result.result.message || "获取任务列表失败",
        icon: "none",
      });
    }
  } catch (error) {
    console.error("获取任务列表失败:", error);
    uni.showToast({
      title: "网络错误",
      icon: "none",
    });
  } finally {
    loading.value = false;
  }
};

// 删除任务
const deleteTask = async (taskId) => {
  uni.showModal({
    title: "确认删除",
    content: "确定要删除这个任务吗？",
    success: async (res) => {
      if (res.confirm) {
        try {
          const result = await uniCloud.callFunction({
            name: "task-delete",
            data: { taskId },
          });

          if (result.result.code === 0) {
            uni.showToast({
              title: "删除成功",
              icon: "success",
            });
            getTaskList(); // 重新获取任务列表
          } else {
            uni.showToast({
              title: result.result.message || "删除失败",
              icon: "none",
            });
          }
        } catch (error) {
          console.error("删除任务失败:", error);
          uni.showToast({
            title: "网络错误",
            icon: "none",
          });
        }
      }
    },
  });
};

// 优先级选择
const onPriorityChange = (e) => {
  priorityIndex.value = e.detail.value;
  newTask.priority = parseInt(e.detail.value) + 1;
};

// 日期选择
const onDateChange = (e) => {
  newTask.dueDate = e.detail.value;
};

// 添加任务
const addTask = async () => {
  if (!newTask.title.trim()) {
    uni.showToast({
      title: "请输入任务标题",
      icon: "none",
    });
    return;
  }

  try {
    const result = await uniCloud.callFunction({
      name: "task-create",
      data: {
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        category: newTask.category,
        dueDate: newTask.dueDate,
      },
    });

    if (result.result.code === 0) {
      uni.showToast({
        title: "任务添加成功",
        icon: "success",
      });
      closeAddModal();
      getTaskList(); // 重新获取任务列表
    } else {
      uni.showToast({
        title: result.result.message || "添加任务失败",
        icon: "none",
      });
    }
  } catch (error) {
    console.error("添加任务失败:", error);
    uni.showToast({
      title: "网络错误",
      icon: "none",
    });
  }
};

const opD = () => {
  showAddModal.value = true;
  console.log("opD", showAddModal.value);
};
// 关闭添加弹窗
const closeAddModal = () => {
  showAddModal.value = false;
  // 重置表单
  newTask.title = "";
  newTask.description = "";
  newTask.priority = 2;
  newTask.category = "默认分类";
  newTask.dueDate = "";
  priorityIndex.value = 1;
};

// 生命周期
onMounted(() => {
  getTaskList();
});

// 页面显示时刷新
onShow(() => {
  getTaskList();
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;

  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }

  .add-btn {
    width: 80rpx;
    height: 80rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    .add-icon {
      color: white;
      font-size: 40rpx;
      font-weight: bold;
    }
  }
}

.filter-bar {
  display: flex;
  background: white;
  border-radius: 20rpx;
  padding: 10rpx;
  margin-bottom: 30rpx;

  .filter-item {
    flex: 1;
    text-align: center;
    padding: 20rpx;
    border-radius: 15rpx;
    transition: all 0.3s;

    &.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    text {
      font-size: 28rpx;
    }
  }
}

.task-list {
  .loading,
  .empty {
    text-align: center;
    padding: 100rpx 0;

    .empty-text {
      font-size: 32rpx;
      color: #999;
      display: block;
      margin-bottom: 20rpx;
    }

    .empty-tip {
      font-size: 24rpx;
      color: #ccc;
    }
  }
}

.task-item {
  background: white;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

  &.completed {
    opacity: 0.6;

    .task-title {
      text-decoration: line-through;
    }
  }

  .task-content {
    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20rpx;

      .task-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        flex: 1;
        margin-right: 20rpx;
      }

      .task-actions {
        .action-btn {
          padding: 10rpx;

          .action-icon {
            font-size: 32rpx;
          }
        }
      }
    }

    .task-description {
      margin-bottom: 20rpx;

      text {
        font-size: 28rpx;
        color: #666;
        line-height: 1.5;
      }
    }

    .task-meta {
      display: flex;
      align-items: center;
      gap: 20rpx;

      text {
        font-size: 24rpx;
        color: #999;
      }

      .task-category {
        background: #f0f0f0;
        padding: 8rpx 16rpx;
        border-radius: 20rpx;
      }

      .task-priority {
        padding: 8rpx 16rpx;
        border-radius: 20rpx;

        &.priority-1 {
          background: #e8f5e8;
          color: #52c41a;
        }

        &.priority-2 {
          background: #fff7e6;
          color: #fa8c16;
        }

        &.priority-3 {
          background: #fff1f0;
          color: #ff4d4f;
        }
      }
    }
  }
}

.modal-content {
  width: 100%;
  min-width: 600rpx;
  max-width: 700rpx;
  background: white;
  border-radius: 20rpx;
  overflow: hidden;

  .modal-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40rpx 30rpx;
    border-bottom: 1rpx solid #eee;

    .modal-title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
    }
  }

  .modal-body {
    padding: 40rpx 30rpx;

    .form-item {
      margin-bottom: 40rpx;

      &:last-child {
        margin-bottom: 0;
      }

      .form-label {
        font-size: 30rpx;
        color: #333;
        display: block;
        margin-bottom: 20rpx;
        font-weight: 500;
      }

      .form-input {
        width: 100%;
        height: 80rpx;
        padding: 0 24rpx;
        border: 2rpx solid #e0e0e0;
        border-radius: 12rpx;
        font-size: 30rpx;
        box-sizing: border-box;
        line-height: 80rpx;
        transition: border-color 0.3s;

        &:focus {
          border-color: #667eea;
          outline: none;
        }
      }

      .form-textarea {
        width: 100%;
        min-height: 160rpx;
        padding: 24rpx;
        border: 2rpx solid #e0e0e0;
        border-radius: 12rpx;
        font-size: 30rpx;
        box-sizing: border-box;
        resize: none;
        line-height: 1.5;
        transition: border-color 0.3s;

        &:focus {
          border-color: #667eea;
          outline: none;
        }
      }

      .picker-view {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80rpx;
        padding: 0 24rpx;
        border: 2rpx solid #e0e0e0;
        border-radius: 12rpx;
        font-size: 30rpx;
        background: white;
        transition: border-color 0.3s;

        &:active {
          border-color: #667eea;
        }

        text {
          line-height: 80rpx;
        }

        .picker-arrow {
          color: #999;
          font-size: 24rpx;
        }
      }
    }
  }
}
</style>
