<template>
  <view class="container">
    <view class="header">
      <text class="title">云开发诊断</text>
    </view>

    <view class="diagnosis-section">
      <view class="diagnosis-item">
        <text class="diagnosis-label">1. 检查云开发环境</text>
        <view class="btn" @click="checkCloudEnv">
          <text>检查</text>
        </view>
      </view>

      <view class="diagnosis-item">
        <text class="diagnosis-label">2. 检查云函数列表</text>
        <view class="btn" @click="checkCloudFunctions">
          <text>检查</text>
        </view>
      </view>

      <view class="diagnosis-item">
        <text class="diagnosis-label">3. 测试云函数调用</text>
        <view class="btn" @click="testCloudCall">
          <text>测试</text>
        </view>
      </view>
    </view>

    <view class="result-section">
      <text class="result-title">诊断结果：</text>
      <text class="result-text">{{ diagnosisResult }}</text>
    </view>

    <view class="help-section">
      <text class="help-title">解决步骤：</text>
      <text class="help-text">1. 在微信开发者工具中开通云开发服务</text>
      <text class="help-text">2. 在HBuilderX中关联云服务空间</text>
      <text class="help-text">3. 上传云函数到云端</text>
      <text class="help-text">4. 初始化数据库集合</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const diagnosisResult = ref("等待诊断...");

// 检查云开发环境
const checkCloudEnv = async () => {
  diagnosisResult.value = "正在检查云开发环境...";

  try {
    // 检查uniCloud是否可用
    if (typeof uniCloud === "undefined") {
      diagnosisResult.value = "❌ uniCloud未初始化，请检查manifest.json配置";
      return;
    }

    // 尝试获取云开发信息
    const info = uniCloud.getCloudInfo();
    diagnosisResult.value = `✅ 云开发环境正常\n环境ID: ${
      info.envId || "未设置"
    }`;
  } catch (error) {
    diagnosisResult.value = `❌ 云开发环境检查失败: ${error.message}`;
  }
};

// 检查云函数列表
const checkCloudFunctions = async () => {
  diagnosisResult.value = "正在检查云函数列表...";

  try {
    // 尝试调用一个简单的云函数
    const result = await uniCloud.callFunction({
      name: "init-database",
    });

    diagnosisResult.value = `✅ 云函数调用成功\n返回: ${JSON.stringify(
      result.result
    )}`;
  } catch (error) {
    if (
      error.message.includes("not found") ||
      error.message.includes("未匹配")
    ) {
      diagnosisResult.value = `❌ 云函数未找到\n错误: ${error.message}\n\n解决方案:\n1. 确保已上传云函数到云端\n2. 检查云函数名称是否正确\n3. 确认云服务空间已关联`;
    } else {
      diagnosisResult.value = `❌ 云函数调用失败: ${error.message}`;
    }
  }
};

// 测试云函数调用
const testCloudCall = async () => {
  diagnosisResult.value = "正在测试云函数调用...";

  try {
    // 测试多个云函数
    const functions = ["init-database", "task-list", "task-create"];
    const results = [];

    for (const funcName of functions) {
      try {
        const result = await uniCloud.callFunction({
          name: funcName,
          data: funcName === "task-list" ? { page: 1, pageSize: 1 } : {},
        });
        results.push(`✅ ${funcName}: 成功`);
      } catch (error) {
        results.push(`❌ ${funcName}: ${error.message}`);
      }
    }

    diagnosisResult.value = `云函数测试结果:\n${results.join("\n")}`;
  } catch (error) {
    diagnosisResult.value = `❌ 云函数测试失败: ${error.message}`;
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

.diagnosis-section {
  background: white;
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 40rpx;

  .diagnosis-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 0;
    border-bottom: 1rpx solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .diagnosis-label {
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
  margin-bottom: 40rpx;

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
    white-space: pre-line;
  }
}

.help-section {
  background: #fff7e6;
  border-radius: 20rpx;
  padding: 40rpx;

  .help-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #fa8c16;
    display: block;
    margin-bottom: 20rpx;
  }

  .help-text {
    font-size: 24rpx;
    color: #fa8c16;
    line-height: 1.8;
    display: block;
    margin-bottom: 10rpx;
  }
}
</style>
