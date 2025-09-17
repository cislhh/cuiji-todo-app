<template>
  <view class="tasks-container">
    <!-- 顶部统计卡片 -->
    <view class="stats-cards">
      <view class="stat-card">
        <text class="stat-number">{{ taskStats.total }}</text>
        <text class="stat-label">总任务</text>
      </view>
      <view class="stat-card">
        <text class="stat-number">{{ taskStats.completed }}</text>
        <text class="stat-label">已完成</text>
      </view>
      <view class="stat-card">
        <text class="stat-number">{{ taskStats.pending }}</text>
        <text class="stat-label">待完成</text>
      </view>
    </view>

    <!-- 搜索和筛选 -->
    <view class="search-section">
      <u-search
        v-model="searchKeyword"
        placeholder="搜索任务..."
        @search="handleSearch"
        @clear="handleClearSearch"
        class="search-input"
      ></u-search>
      <u-button
        type="primary"
        size="mini"
        @click="showAddTask = true"
        class="add-btn"
      >
        添加任务
      </u-button>
    </view>

    <!-- 任务列表 -->
    <view class="task-list">
      <view v-if="tasks.length === 0" class="empty-state">
        <text class="empty-icon">📝</text>
        <text class="empty-text">暂无任务</text>
        <text class="empty-desc">点击上方按钮添加您的第一个任务</text>
      </view>

      <view v-else>
        <view
          v-for="task in filteredTasks"
          :key="task.id"
          class="task-item"
          :class="{ completed: task.completed }"
        >
          <view class="task-content">
            <view class="task-header">
              <text class="task-title">{{ task.title }}</text>
              <view class="task-priority" :class="task.priority">
                {{ getPriorityText(task.priority) }}
              </view>
            </view>

            <text v-if="task.description" class="task-desc">
              {{ task.description }}
            </text>

            <view class="task-meta">
              <text v-if="task.dueDate" class="task-due">
                📅 {{ formatDate(task.dueDate) }}
              </text>
              <text class="task-category">{{ task.category }}</text>
            </view>
          </view>

          <view class="task-actions">
            <u-button
              type="primary"
              size="mini"
              @click="toggleTaskComplete(task.id)"
            >
              {{ task.completed ? "未完成" : "完成" }}
            </u-button>
            <u-button type="error" size="mini" @click="deleteTask(task.id)">
              删除
            </u-button>
          </view>
        </view>
      </view>
    </view>

    <!-- 添加任务弹窗 -->
    <u-popup v-model="showAddTask" mode="bottom" height="80%">
      <view class="add-task-popup">
        <view class="popup-header">
          <text class="popup-title">添加任务</text>
          <u-button type="text" @click="showAddTask = false" class="close-btn">
            ✕
          </u-button>
        </view>

        <view class="popup-content">
          <u-form :model="newTask" label-position="top">
            <u-form-item label="任务标题">
              <u-input
                v-model="newTask.title"
                placeholder="请输入任务标题"
                maxlength="50"
              ></u-input>
            </u-form-item>

            <u-form-item label="任务描述">
              <u-textarea
                v-model="newTask.description"
                placeholder="请输入任务描述（可选）"
                maxlength="200"
                :auto-height="true"
              ></u-textarea>
            </u-form-item>

            <u-form-item label="优先级">
              <u-select
                v-model="newTask.priority"
                :options="priorityOptions"
                placeholder="选择优先级"
              ></u-select>
            </u-form-item>

            <u-form-item label="截止日期">
              <u-datetime-picker
                v-model="newTask.dueDate"
                mode="datetime"
                placeholder="选择截止日期（可选）"
              ></u-datetime-picker>
            </u-form-item>

            <u-form-item label="分类">
              <u-input
                v-model="newTask.category"
                placeholder="输入分类（可选）"
                maxlength="20"
              ></u-input>
            </u-form-item>
          </u-form>
        </view>

        <view class="popup-actions">
          <u-button @click="showAddTask = false">取消</u-button>
          <u-button type="primary" @click="addTask">保存</u-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";

// 响应式数据
const searchKeyword = ref("");
const showAddTask = ref(false);
const tasks = ref([
  {
    id: 1,
    title: "完成项目文档",
    description: "编写API文档和用户手册",
    completed: false,
    priority: "high",
    dueDate: "2024-01-30",
    category: "工作",
    createTime: new Date(),
  },
  {
    id: 2,
    title: "购买生活用品",
    description: "去超市购买日用品",
    completed: true,
    priority: "medium",
    dueDate: "2024-01-28",
    category: "生活",
    createTime: new Date(),
  },
]);

// 新任务表单
const newTask = reactive({
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
  category: "",
});

// 优先级选项
const priorityOptions = [
  { label: "低", value: "low" },
  { label: "中", value: "medium" },
  { label: "高", value: "high" },
  { label: "紧急", value: "urgent" },
];

// 计算属性
const taskStats = computed(() => {
  const total = tasks.value.length;
  const completed = tasks.value.filter((task) => task.completed).length;
  const pending = total - completed;
  return { total, completed, pending };
});

const filteredTasks = computed(() => {
  if (!searchKeyword.value) return tasks.value;
  return tasks.value.filter(
    (task) =>
      task.title.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      task.description.toLowerCase().includes(searchKeyword.value.toLowerCase())
  );
});

// 方法
const handleSearch = () => {
  // 搜索逻辑已在计算属性中处理
};

const handleClearSearch = () => {
  searchKeyword.value = "";
};

const toggleTaskComplete = (taskId: number) => {
  const task = tasks.value.find((t) => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
  }
};

const deleteTask = (taskId: number) => {
  uni.showModal({
    title: "确认删除",
    content: "确定要删除这个任务吗？",
    success: (res) => {
      if (res.confirm) {
        tasks.value = tasks.value.filter((t) => t.id !== taskId);
        uni.showToast({
          title: "删除成功",
          icon: "success",
        });
      }
    },
  });
};

const addTask = () => {
  if (!newTask.title.trim()) {
    uni.showToast({
      title: "请输入任务标题",
      icon: "none",
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
    createTime: new Date(),
  };

  tasks.value.unshift(task);

  // 重置表单
  Object.assign(newTask, {
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    category: "",
  });

  showAddTask.value = false;
  uni.showToast({
    title: "添加成功",
    icon: "success",
  });
};

const getPriorityText = (priority: string) => {
  const map: Record<string, string> = {
    low: "低",
    medium: "中",
    high: "高",
    urgent: "紧急",
  };
  return map[priority] || "中";
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("zh-CN");
};

onMounted(() => {
  console.log("任务页面加载完成");

  // 检查是否从导航栏创建任务按钮进入
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const options = currentPage.options;

  if (options.action === "create") {
    // 延迟显示创建任务弹窗，确保页面完全加载
    setTimeout(() => {
      showAddTask.value = true;
    }, 300);
  }
});
</script>

<style lang="scss" scoped>
.tasks-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx 20rpx 160rpx 20rpx; /* 底部留出导航栏空间 */
}

.stats-cards {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;

  .stat-card {
    flex: 1;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16rpx;
    padding: 30rpx 20rpx;
    text-align: center;
    color: white;

    .stat-number {
      display: block;
      font-size: 48rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }

    .stat-label {
      font-size: 24rpx;
      opacity: 0.9;
    }
  }
}

.search-section {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
  align-items: center;

  .search-input {
    flex: 1;
  }

  .add-btn {
    white-space: nowrap;
  }
}

.task-list {
  .empty-state {
    text-align: center;
    padding: 100rpx 0;
    color: #999;

    .empty-icon {
      font-size: 80rpx;
      display: block;
      margin-bottom: 20rpx;
    }

    .empty-text {
      font-size: 32rpx;
      font-weight: bold;
      display: block;
      margin-bottom: 10rpx;
    }

    .empty-desc {
      font-size: 24rpx;
      display: block;
    }
  }

  .task-item {
    background: white;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    &.completed {
      opacity: 0.6;

      .task-title {
        text-decoration: line-through;
      }
    }

    .task-content {
      flex: 1;
      margin-right: 20rpx;

      .task-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15rpx;

        .task-title {
          font-size: 32rpx;
          font-weight: bold;
          color: #333;
        }

        .task-priority {
          padding: 8rpx 16rpx;
          border-radius: 20rpx;
          font-size: 20rpx;
          color: white;

          &.low {
            background-color: #52c41a;
          }

          &.medium {
            background-color: #faad14;
          }

          &.high {
            background-color: #ff4d4f;
          }

          &.urgent {
            background-color: #722ed1;
          }
        }
      }

      .task-desc {
        font-size: 26rpx;
        color: #666;
        line-height: 1.5;
        margin-bottom: 15rpx;
        display: block;
      }

      .task-meta {
        display: flex;
        gap: 20rpx;
        font-size: 22rpx;
        color: #999;

        .task-due {
          color: #ff4d4f;
        }

        .task-category {
          background-color: #f0f0f0;
          padding: 4rpx 12rpx;
          border-radius: 12rpx;
        }
      }
    }

    .task-actions {
      display: flex;
      flex-direction: column;
      gap: 10rpx;
    }
  }
}

.add-task-popup {
  height: 100%;
  display: flex;
  flex-direction: column;

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #eee;

    .popup-title {
      font-size: 36rpx;
      font-weight: bold;
    }

    .close-btn {
      font-size: 32rpx;
    }
  }

  .popup-content {
    flex: 1;
    padding: 30rpx;
    overflow-y: auto;
  }

  .popup-actions {
    display: flex;
    gap: 20rpx;
    padding: 30rpx;
    border-top: 1rpx solid #eee;

    u-button {
      flex: 1;
    }
  }
}
</style>
