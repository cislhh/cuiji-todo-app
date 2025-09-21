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
    </view>

    <!-- 任务列表 -->
    <view class="task-list">
      <view v-if="tasks.length === 0" class="empty-state">
        <text class="empty-icon">📝</text>
        <text class="empty-text">暂无任务</text>
        <text class="empty-desc">您还没有任何任务</text>
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
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

// 响应式数据
const searchKeyword = ref("");
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
  margin-bottom: 30rpx;

  .search-input {
    width: 100%;
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
</style>
