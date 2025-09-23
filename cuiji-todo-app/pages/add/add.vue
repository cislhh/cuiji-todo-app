<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="header">
      <text class="title">添加任务</text>
    </view>

    <!-- 表单内容 -->
    <view class="form-container">
      <view class="form-item">
        <text class="form-label">任务标题 *</text>
        <input
          v-model="taskForm.title"
          class="form-input"
          placeholder="请输入任务标题"
          maxlength="100"
        />
      </view>

      <view class="form-item">
        <text class="form-label">任务描述</text>
        <textarea
          v-model="taskForm.description"
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
          v-model="taskForm.category"
          class="form-input"
          placeholder="请输入分类"
          maxlength="50"
        />
      </view>

      <view class="form-item">
        <text class="form-label">截止日期</text>
        <picker mode="date" :value="taskForm.dueDate" @change="onDateChange">
          <view class="picker-view">
            <text>{{ taskForm.dueDate || "选择截止日期" }}</text>
            <text class="picker-arrow">▼</text>
          </view>
        </picker>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="footer">
      <view class="btn cancel-btn" @click="goBack">
        <text>取消</text>
      </view>
      <view
        class="btn confirm-btn"
        @click="submitTask"
        :class="{ disabled: !taskForm.title.trim() }"
      >
        <text>确定</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

// 响应式数据
const taskForm = reactive({
  title: "",
  description: "",
  priority: 2,
  category: "默认分类",
  dueDate: "",
});

// 优先级选项
const priorityOptions = ["低优先级", "中优先级", "高优先级"];
const priorityIndex = ref(1); // 默认中优先级

// 优先级选择
const onPriorityChange = (e) => {
  priorityIndex.value = e.detail.value;
  taskForm.priority = parseInt(e.detail.value) + 1;
};

// 日期选择
const onDateChange = (e) => {
  taskForm.dueDate = e.detail.value;
};

// 提交任务
const submitTask = async () => {
  if (!taskForm.title.trim()) {
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
        title: taskForm.title,
        description: taskForm.description,
        priority: taskForm.priority,
        category: taskForm.category,
        dueDate: taskForm.dueDate,
      },
    });

    if (result.result.code === 0) {
      uni.showToast({
        title: "任务添加成功",
        icon: "success",
      });

      // 延迟跳转，让用户看到成功提示
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
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

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx;
}

.header {
  text-align: center;
  margin-bottom: 40rpx;

  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
  }
}

.form-container {
  background: white;
  border-radius: 20rpx;
  padding: 40rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

  .form-item {
    margin-bottom: 40rpx;

    &:last-child {
      margin-bottom: 0;
    }

    .form-label {
      font-size: 28rpx;
      color: #333;
      display: block;
      margin-bottom: 20rpx;
      font-weight: 500;
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: 24rpx;
      border: 2rpx solid #e0e0e0;
      border-radius: 12rpx;
      font-size: 28rpx;
      box-sizing: border-box;
      transition: border-color 0.3s;

      &:focus {
        border-color: #667eea;
      }
    }

    .form-textarea {
      height: 160rpx;
      resize: none;
    }

    .picker-view {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx;
      border: 2rpx solid #e0e0e0;
      border-radius: 12rpx;
      font-size: 28rpx;
      background: white;
      transition: border-color 0.3s;

      &:active {
        border-color: #667eea;
      }

      .picker-arrow {
        color: #999;
        font-size: 24rpx;
      }
    }
  }
}

.footer {
  display: flex;
  gap: 20rpx;
  padding: 0 20rpx;

  .btn {
    flex: 1;
    height: 88rpx;
    border-radius: 44rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32rpx;
    font-weight: 500;
    transition: all 0.3s;

    &.cancel-btn {
      background: #f5f5f5;
      color: #666;

      &:active {
        background: #e0e0e0;
      }
    }

    &.confirm-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;

      &:active {
        opacity: 0.8;
      }

      &.disabled {
        background: #ccc;
        color: #999;

        &:active {
          opacity: 1;
        }
      }
    }
  }
}
</style>
