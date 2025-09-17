<template>
  <view class="statistics-container">
    <!-- 总体统计 -->
    <view class="overview-section">
      <view class="overview-card">
        <text class="overview-title">任务完成情况</text>
        <view class="completion-rate">
          <text class="rate-number">{{ completionRate }}%</text>
          <text class="rate-label">完成率</text>
        </view>
        <view class="progress-bar">
          <view
            class="progress-fill"
            :style="{ width: completionRate + '%' }"
          ></view>
        </view>
      </view>
    </view>

    <!-- 详细统计 -->
    <view class="stats-section">
      <view class="stat-item">
        <text class="stat-icon">📝</text>
        <view class="stat-info">
          <text class="stat-number">{{ taskStats.total }}</text>
          <text class="stat-label">总任务数</text>
        </view>
      </view>

      <view class="stat-item">
        <text class="stat-icon">✅</text>
        <view class="stat-info">
          <text class="stat-number">{{ taskStats.completed }}</text>
          <text class="stat-label">已完成</text>
        </view>
      </view>

      <view class="stat-item">
        <text class="stat-icon">⏳</text>
        <view class="stat-info">
          <text class="stat-number">{{ taskStats.pending }}</text>
          <text class="stat-label">待完成</text>
        </view>
      </view>

      <view class="stat-item">
        <text class="stat-icon">⚠️</text>
        <view class="stat-info">
          <text class="stat-number">{{ overdueTasks }}</text>
          <text class="stat-label">逾期任务</text>
        </view>
      </view>
    </view>

    <!-- 分类统计 -->
    <view class="category-section">
      <text class="section-title">分类统计</text>
      <view class="category-list">
        <view
          v-for="category in categoryStats"
          :key="category.name"
          class="category-item"
        >
          <view class="category-info">
            <view
              class="category-color"
              :style="{ backgroundColor: category.color }"
            ></view>
            <text class="category-name">{{ category.name }}</text>
          </view>
          <view class="category-stats">
            <text class="category-count">{{ category.count }}</text>
            <text class="category-percent">{{ category.percent }}%</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 时间统计 -->
    <view class="time-section">
      <text class="section-title">时间统计</text>
      <view class="time-stats">
        <view class="time-item">
          <text class="time-label">今日完成</text>
          <text class="time-value">{{ todayCompleted }}</text>
        </view>
        <view class="time-item">
          <text class="time-label">本周完成</text>
          <text class="time-value">{{ weekCompleted }}</text>
        </view>
        <view class="time-item">
          <text class="time-label">本月完成</text>
          <text class="time-value">{{ monthCompleted }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

// 模拟数据
const taskStats = ref({
  total: 15,
  completed: 9,
  pending: 6,
});

const categoryStats = ref([
  { name: "工作", count: 8, percent: 53, color: "#1890ff" },
  { name: "生活", count: 4, percent: 27, color: "#52c41a" },
  { name: "学习", count: 3, percent: 20, color: "#faad14" },
]);

const overdueTasks = ref(2);
const todayCompleted = ref(3);
const weekCompleted = ref(8);
const monthCompleted = ref(9);

// 计算属性
const completionRate = computed(() => {
  if (taskStats.value.total === 0) return 0;
  return Math.round((taskStats.value.completed / taskStats.value.total) * 100);
});

onMounted(() => {
  console.log("统计页面加载完成");
  loadStatistics();
});

const loadStatistics = () => {
  // 这里可以从本地存储或云函数获取统计数据
  console.log("加载统计数据");
};
</script>

<style lang="scss" scoped>
.statistics-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx 20rpx 160rpx 20rpx; /* 底部留出导航栏空间 */
}

.overview-section {
  margin-bottom: 30rpx;

  .overview-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20rpx;
    padding: 40rpx;
    text-align: center;
    color: white;

    .overview-title {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 30rpx;
      display: block;
    }

    .completion-rate {
      margin-bottom: 30rpx;

      .rate-number {
        font-size: 80rpx;
        font-weight: bold;
        display: block;
        margin-bottom: 10rpx;
      }

      .rate-label {
        font-size: 28rpx;
        opacity: 0.9;
      }
    }

    .progress-bar {
      height: 12rpx;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 6rpx;
      overflow: hidden;

      .progress-fill {
        height: 100%;
        background-color: white;
        border-radius: 6rpx;
        transition: width 0.3s ease;
      }
    }
  }
}

.stats-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
  margin-bottom: 30rpx;

  .stat-item {
    background: white;
    border-radius: 16rpx;
    padding: 30rpx;
    display: flex;
    align-items: center;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);

    .stat-icon {
      font-size: 48rpx;
      margin-right: 20rpx;
    }

    .stat-info {
      .stat-number {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
        display: block;
        margin-bottom: 5rpx;
      }

      .stat-label {
        font-size: 24rpx;
        color: #666;
      }
    }
  }
}

.category-section,
.time-section {
  margin-bottom: 30rpx;

  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
    display: block;
  }
}

.category-list {
  background: white;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);

  .category-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #f0f0f0;

    &:last-child {
      border-bottom: none;
    }

    .category-info {
      display: flex;
      align-items: center;

      .category-color {
        width: 20rpx;
        height: 20rpx;
        border-radius: 50%;
        margin-right: 15rpx;
      }

      .category-name {
        font-size: 28rpx;
        color: #333;
      }
    }

    .category-stats {
      text-align: right;

      .category-count {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        display: block;
        margin-bottom: 5rpx;
      }

      .category-percent {
        font-size: 24rpx;
        color: #666;
      }
    }
  }
}

.time-stats {
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);

  .time-item {
    text-align: center;

    .time-label {
      font-size: 24rpx;
      color: #666;
      display: block;
      margin-bottom: 10rpx;
    }

    .time-value {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
    }
  }
}
</style>
