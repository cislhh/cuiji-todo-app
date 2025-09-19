<template>
  <view class="profile-page">
    <view class="header">
      <view class="avatar-section">
        <image
          class="avatar"
          src="/static/avatar-default.png"
          mode="aspectFill"
        />
        <text class="username">{{ userInfo.username || "用户" }}</text>
        <text class="email">{{ userInfo.email || "user@example.com" }}</text>
      </view>
    </view>

    <view class="menu-section">
      <view class="menu-item" @click="onMenuClick('settings')">
        <view class="menu-icon">
          <text class="icon">⚙️</text>
        </view>
        <text class="menu-text">设置</text>
        <text class="menu-arrow">></text>
      </view>

      <view class="menu-item" @click="onMenuClick('theme')">
        <view class="menu-icon">
          <text class="icon">🎨</text>
        </view>
        <text class="menu-text">主题设置</text>
        <text class="menu-arrow">></text>
      </view>

      <view class="menu-item" @click="onMenuClick('notification')">
        <view class="menu-icon">
          <text class="icon">🔔</text>
        </view>
        <text class="menu-text">通知设置</text>
        <text class="menu-arrow">></text>
      </view>

      <view class="menu-item" @click="onMenuClick('backup')">
        <view class="menu-icon">
          <text class="icon">💾</text>
        </view>
        <text class="menu-text">数据备份</text>
        <text class="menu-arrow">></text>
      </view>

      <view class="menu-item" @click="onMenuClick('about')">
        <view class="menu-icon">
          <text class="icon">ℹ️</text>
        </view>
        <text class="menu-text">关于我们</text>
        <text class="menu-arrow">></text>
      </view>
    </view>

    <view class="stats-section">
      <view class="stats-title">使用统计</view>
      <view class="stats-grid">
        <view class="stats-item">
          <text class="stats-number">{{ stats.totalTasks }}</text>
          <text class="stats-label">总任务数</text>
        </view>
        <view class="stats-item">
          <text class="stats-number">{{ stats.completedTasks }}</text>
          <text class="stats-label">已完成</text>
        </view>
        <view class="stats-item">
          <text class="stats-number">{{ stats.todayTasks }}</text>
          <text class="stats-label">今日任务</text>
        </view>
        <view class="stats-item">
          <text class="stats-number">{{ stats.overdueTasks }}</text>
          <text class="stats-label">逾期任务</text>
        </view>
      </view>
    </view>

    <view class="logout-section">
      <button class="logout-btn" @click="onLogout">退出登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

interface UserInfo {
  username: string;
  email: string;
  avatar?: string;
}

interface Stats {
  totalTasks: number;
  completedTasks: number;
  todayTasks: number;
  overdueTasks: number;
}

const userInfo = reactive<UserInfo>({
  username: "用户",
  email: "user@example.com",
});

const stats = reactive<Stats>({
  totalTasks: 0,
  completedTasks: 0,
  todayTasks: 0,
  overdueTasks: 0,
});

const onMenuClick = (type: string) => {
  switch (type) {
    case "settings":
      uni.showToast({
        title: "设置功能开发中",
        icon: "none",
      });
      break;
    case "theme":
      uni.showToast({
        title: "主题设置功能开发中",
        icon: "none",
      });
      break;
    case "notification":
      uni.showToast({
        title: "通知设置功能开发中",
        icon: "none",
      });
      break;
    case "backup":
      uni.showToast({
        title: "数据备份功能开发中",
        icon: "none",
      });
      break;
    case "about":
      uni.showToast({
        title: "关于我们功能开发中",
        icon: "none",
      });
      break;
  }
};

const onLogout = () => {
  uni.showModal({
    title: "确认退出",
    content: "确定要退出登录吗？",
    success: (res) => {
      if (res.confirm) {
        // 这里可以清除用户数据
        uni.showToast({
          title: "已退出登录",
          icon: "success",
        });
        // 可以跳转到登录页面
        // uni.reLaunch({
        //   url: '/pages/login/login'
        // })
      }
    },
  });
};

// 模拟加载统计数据
const loadStats = () => {
  // 这里可以从API获取统计数据
  stats.totalTasks = 25;
  stats.completedTasks = 18;
  stats.todayTasks = 5;
  stats.overdueTasks = 2;
};

// 页面加载时获取数据
loadStats();
</script>

<style lang="scss" scoped>
.profile-page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60rpx 40rpx 40rpx;
  color: white;
}

.avatar-section {
  text-align: center;

  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 60rpx;
    border: 4rpx solid rgba(255, 255, 255, 0.3);
    margin-bottom: 20rpx;
  }

  .username {
    display: block;
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }

  .email {
    display: block;
    font-size: 24rpx;
    opacity: 0.8;
  }
}

.menu-section {
  background: white;
  margin: 20rpx;
  border-radius: 20rpx;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 30rpx 40rpx;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: #f8f8f8;
  }

  .menu-icon {
    width: 60rpx;
    text-align: center;
    margin-right: 20rpx;

    .icon {
      font-size: 32rpx;
    }
  }

  .menu-text {
    flex: 1;
    font-size: 28rpx;
    color: #333;
  }

  .menu-arrow {
    font-size: 24rpx;
    color: #999;
  }
}

.stats-section {
  background: white;
  margin: 20rpx;
  border-radius: 20rpx;
  padding: 40rpx;
}

.stats-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30rpx;
}

.stats-item {
  text-align: center;
  padding: 20rpx;
  background: #f8f9fa;
  border-radius: 15rpx;

  .stats-number {
    display: block;
    font-size: 36rpx;
    font-weight: bold;
    color: #667eea;
    margin-bottom: 10rpx;
  }

  .stats-label {
    font-size: 24rpx;
    color: #666;
  }
}

.logout-section {
  padding: 40rpx;

  .logout-btn {
    width: 100%;
    height: 80rpx;
    background: #ff4757;
    color: white;
    border: none;
    border-radius: 40rpx;
    font-size: 28rpx;

    &:active {
      background: #ff3742;
    }
  }
}
</style>
