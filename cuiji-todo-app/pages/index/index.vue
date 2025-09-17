<template>
  <view class="container">
    <view class="header">
      <image class="logo" src="/static/uni.png" mode="aspectFit"></image>
      <text class="title">待办事项管理应用</text>
      <text class="subtitle">基于 uni-app + Vue3 + TypeScript</text>
    </view>

    <view class="content">
      <view class="welcome-section">
        <text class="welcome-title">欢迎使用待办事项管理</text>
        <text class="welcome-desc">高效管理您的日常任务，让生活更有序</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 页面逻辑
console.log("首页加载完成");
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx 40rpx 160rpx 40rpx; /* 底部留出导航栏空间 */
}

.header {
  text-align: center;
  margin-bottom: 60rpx;

  .logo {
    width: 120rpx;
    height: 120rpx;
    margin-bottom: 20rpx;
  }

  .title {
    display: block;
    font-size: 48rpx;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 10rpx;
  }

  .subtitle {
    display: block;
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.8);
  }
}

.content {
  .welcome-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20rpx;
    padding: 40rpx;
    margin-bottom: 40rpx;
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);

    .welcome-text {
      display: block;
      font-size: 36rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20rpx;
    }

    .description {
      display: block;
      font-size: 28rpx;
      color: #666666;
      line-height: 1.6;
    }
  }

  .welcome-section {
    text-align: center;
    padding: 60rpx 40rpx;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20rpx;
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);

    .welcome-title {
      display: block;
      font-size: 40rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20rpx;
    }

    .welcome-desc {
      display: block;
      font-size: 28rpx;
      color: #666666;
      line-height: 1.6;
    }
  }
}
</style>
