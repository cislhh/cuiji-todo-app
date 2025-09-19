<template>
  <view class="add-page">
    <view class="header">
      <text class="title">添加任务</text>
    </view>

    <view class="form-container">
      <view class="form-item">
        <text class="label">任务标题</text>
        <input
          v-model="taskForm.title"
          class="input"
          placeholder="请输入任务标题"
          maxlength="50"
        />
      </view>

      <view class="form-item">
        <text class="label">任务描述</text>
        <textarea
          v-model="taskForm.description"
          class="textarea"
          placeholder="请输入任务描述"
          maxlength="200"
        />
      </view>

      <view class="form-item">
        <text class="label">优先级</text>
        <picker
          :value="priorityIndex"
          :range="priorityOptions"
          @change="onPriorityChange"
        >
          <view class="picker">
            {{ priorityOptions[priorityIndex] }}
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">截止日期</text>
        <picker mode="date" :value="taskForm.dueDate" @change="onDateChange">
          <view class="picker">
            {{ taskForm.dueDate || "请选择截止日期" }}
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">分类</text>
        <picker
          :value="categoryIndex"
          :range="categoryOptions"
          @change="onCategoryChange"
        >
          <view class="picker">
            {{ categoryOptions[categoryIndex] }}
          </view>
        </picker>
      </view>
    </view>

    <view class="button-group">
      <button class="btn btn-cancel" @click="onCancel">取消</button>
      <button class="btn btn-confirm" @click="onConfirm">确认添加</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

interface TaskForm {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  category: string;
}

const taskForm = reactive<TaskForm>({
  title: "",
  description: "",
  priority: "中等",
  dueDate: "",
  category: "工作",
});

const priorityOptions = ["低", "中等", "高", "紧急"];
const categoryOptions = ["工作", "学习", "生活", "其他"];

const priorityIndex = ref(1);
const categoryIndex = ref(0);

const onPriorityChange = (e: any) => {
  priorityIndex.value = e.detail.value;
  taskForm.priority = priorityOptions[e.detail.value];
};

const onCategoryChange = (e: any) => {
  categoryIndex.value = e.detail.value;
  taskForm.category = categoryOptions[e.detail.value];
};

const onDateChange = (e: any) => {
  taskForm.dueDate = e.detail.value;
};

const onCancel = () => {
  uni.navigateBack();
};

const onConfirm = () => {
  if (!taskForm.title.trim()) {
    uni.showToast({
      title: "请输入任务标题",
      icon: "none",
    });
    return;
  }

  // 这里可以调用API保存任务
  uni.showToast({
    title: "任务添加成功",
    icon: "success",
  });

  // 延迟返回上一页
  setTimeout(() => {
    uni.navigateBack();
  }, 1500);
};
</script>

<style lang="scss" scoped>
.add-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx;
}

.header {
  text-align: center;
  padding: 40rpx 0;

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
}

.form-item {
  margin-bottom: 40rpx;

  .label {
    display: block;
    font-size: 28rpx;
    color: #666;
    margin-bottom: 20rpx;
  }

  .input,
  .textarea {
    width: 100%;
    padding: 20rpx;
    border: 2rpx solid #e0e0e0;
    border-radius: 10rpx;
    font-size: 28rpx;
    background: #fafafa;
    box-sizing: border-box;

    &:focus {
      border-color: #667eea;
      background: white;
    }
  }
  .input {
    height: 90rpx;
  }
  .textarea {
    // height: 120rpx;
    // resize: none;
  }

  .picker {
    padding: 20rpx;
    border: 2rpx solid #e0e0e0;
    border-radius: 10rpx;
    background: #fafafa;
    font-size: 28rpx;
    color: #333;
  }
}

.button-group {
  display: flex;
  gap: 20rpx;

  .btn {
    flex: 1;
    height: 80rpx;
    border-radius: 40rpx;
    font-size: 28rpx;
    border: none;

    &.btn-cancel {
      background: #f0f0f0;
      color: #666;
    }

    &.btn-confirm {
      background: #667eea;
      color: white;
    }
  }
}
</style>
