<template>
  <view class="custom-tab-bar">
    <!-- 左侧：首页 -->
    <view
      class="tab-item"
      :class="{ active: currentIndex === 0 }"
      @click="switchTab(0, '/pages/index/index')"
    >
      <view class="tab-icon">
        <image
          v-if="currentIndex === 0"
          src="/static/tab-home-active.png"
          class="icon-image active"
        />
        <image v-else src="/static/tab-home.png" class="icon-image" />
      </view>
      <text class="tab-text">首页</text>
    </view>

    <!-- 中间：创建任务按钮（突出显示） -->
    <view class="create-task-btn" @click="createTask">
      <view class="btn-inner">
        <text class="add-icon">+</text>
      </view>
    </view>

    <!-- 右侧：统计 -->
    <view
      class="tab-item"
      :class="{ active: currentIndex === 1 }"
      @click="switchTab(1, '/pages/statistics/statistics')"
    >
      <view class="tab-icon">
        <image
          v-if="currentIndex === 1"
          src="/static/tab-stats-active.png"
          class="icon-image active"
        />
        <image v-else src="/static/tab-stats.png" class="icon-image" />
      </view>
      <text class="tab-text">统计</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 当前选中的标签页索引
const currentIndex = ref(0);

// 切换标签页
const switchTab = (index: number, url: string) => {
  currentIndex.value = index;
  uni.switchTab({ url });
};

// 创建任务
const createTask = () => {
  uni.navigateTo({
    url: "/pages/tasks/tasks?action=create",
  });
};
</script>

<style lang="scss" scoped>
.custom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 40rpx;
  box-shadow: 0 -4rpx 20rpx rgba(102, 126, 234, 0.3);
  z-index: 999;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10rpx 20rpx;
  border-radius: 16rpx;
  transition: all 0.3s ease;
  min-width: 120rpx;

  &.active {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-4rpx);

    .tab-icon {
      transform: scale(1.1);
    }

    .tab-text {
      color: #ffffff;
      font-weight: bold;
    }
  }

  .tab-icon {
    margin-bottom: 4rpx;
    transition: transform 0.3s ease;

    .icon-image {
      width: 36rpx;
      height: 36rpx;
      opacity: 0.8;
      transition: all 0.3s ease;

      &.active {
        opacity: 1;
      }
    }
  }

  .tab-text {
    font-size: 20rpx;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease;
  }
}

.create-task-btn {
  position: relative;
  z-index: 10;

  .btn-inner {
    width: 100rpx;
    height: 100rpx;
    background: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;

    &:active {
      transform: scale(0.95);
    }

    .add-icon {
      font-size: 48rpx;
      color: #667eea;
      font-weight: bold;
      line-height: 1;
    }
  }

  &:hover .btn-inner {
    transform: translateY(-4rpx);
    box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.2);
  }
}

/* 适配安全区域 */
.custom-tab-bar {
  padding-bottom: env(safe-area-inset-bottom);
  height: calc(120rpx + env(safe-area-inset-bottom));
}
</style>
