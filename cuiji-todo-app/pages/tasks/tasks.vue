<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="header">
      <text class="title">任务管理</text>
      <view class="add-btn" @click="goToAddPage">
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
  </view>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { onShow } from "@dcloudio/uni-app";

// 响应式数据
const loading = ref(false);
const currentFilter = ref("all");
const tasks = ref([]);

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

// 跳转到添加页面
const goToAddPage = () => {
  uni.navigateTo({
    url: "/pages/add/add",
  });
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
</style>
