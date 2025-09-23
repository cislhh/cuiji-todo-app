<template>
  <view class="container">
    <view class="header">
      <text class="title">云函数测试</text>
    </view>

    <view class="test-section">
      <view class="test-item">
        <text class="test-label">1. 初始化数据库</text>
        <view class="btn" @click="initDatabase">
          <text>初始化</text>
        </view>
      </view>

      <view class="test-item">
        <text class="test-label">2. 测试获取任务列表</text>
        <view class="btn" @click="testTaskList">
          <text>测试</text>
        </view>
      </view>

      <view class="test-item">
        <text class="test-label">3. 测试创建任务</text>
        <view class="btn" @click="testCreateTask">
          <text>测试</text>
        </view>
      </view>
    </view>

    <view class="result-section">
      <text class="result-title">测试结果：</text>
      <text class="result-text">{{ testResult }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const testResult = ref("等待测试...");

// 初始化数据库
const initDatabase = async () => {
  testResult.value = "正在初始化数据库...";
  try {
    const result = await uniCloud.callFunction({
      name: "init-database",
    });

    if (result.result.code === 0) {
      testResult.value = `数据库初始化成功：${result.result.message}`;
    } else {
      testResult.value = `数据库初始化失败：${result.result.message}`;
    }
  } catch (error) {
    testResult.value = `数据库初始化错误：${error.message}`;
  }
};

// 测试获取任务列表
const testTaskList = async () => {
  testResult.value = "正在测试获取任务列表...";
  try {
    const result = await uniCloud.callFunction({
      name: "task-list",
      data: {
        page: 1,
        pageSize: 10,
      },
    });

    if (result.result.code === 0) {
      testResult.value = `获取任务列表成功：找到${result.result.data.list.length}个任务`;
    } else {
      testResult.value = `获取任务列表失败：${result.result.message}`;
    }
  } catch (error) {
    testResult.value = `获取任务列表错误：${error.message}`;
  }
};

// 测试创建任务
const testCreateTask = async () => {
  testResult.value = "正在测试创建任务...";
  try {
    const result = await uniCloud.callFunction({
      name: "task-create",
      data: {
        title: "测试任务",
        description: "这是一个测试任务",
        priority: 2,
        category: "测试分类",
      },
    });

    if (result.result.code === 0) {
      testResult.value = `创建任务成功：${result.result.message}`;
    } else {
      testResult.value = `创建任务失败：${result.result.message}`;
    }
  } catch (error) {
    testResult.value = `创建任务错误：${error.message}`;
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 40rpx;
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;

  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }
}

.test-section {
  background: white;
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 40rpx;

  .test-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 0;
    border-bottom: 1rpx solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .test-label {
      font-size: 28rpx;
      color: #333;
      flex: 1;
    }

    .btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20rpx 40rpx;
      border-radius: 20rpx;
      font-size: 24rpx;

      &:active {
        opacity: 0.8;
      }
    }
  }
}

.result-section {
  background: white;
  border-radius: 20rpx;
  padding: 40rpx;

  .result-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
    display: block;
    margin-bottom: 20rpx;
  }

  .result-text {
    font-size: 24rpx;
    color: #666;
    line-height: 1.5;
  }
}
</style>
