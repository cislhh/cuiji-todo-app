<template>
  <view class="login-container">
    <view class="login-header">
      <image class="logo" src="/static/uni.png" mode="aspectFit"></image>
      <text class="app-title">待办事项管理应用</text>
      <text class="app-subtitle">高效管理您的日常任务</text>
    </view>

    <view class="login-form">
      <u-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-position="top"
      >
        <u-form-item label="邮箱" prop="email">
          <u-input
            v-model="formData.email"
            placeholder="请输入邮箱地址"
            type="email"
            :clearable="true"
          ></u-input>
        </u-form-item>

        <u-form-item label="密码" prop="password">
          <u-input
            v-model="formData.password"
            placeholder="请输入密码"
            type="password"
            :clearable="true"
            :show-password="true"
          ></u-input>
        </u-form-item>
      </u-form>

      <view class="form-actions">
        <u-button
          type="primary"
          :loading="loading"
          @click="handleLogin"
          class="login-btn"
        >
          登录
        </u-button>

        <view class="register-link">
          <text>还没有账号？</text>
          <text class="link-text" @click="goToRegister">立即注册</text>
        </view>
      </view>
    </view>

    <view class="login-footer">
      <text class="footer-text">使用即表示同意用户协议和隐私政策</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

// 表单数据
const formData = reactive({
  email: "",
  password: "",
});

// 表单验证规则
const rules = {
  email: [
    { required: true, message: "请输入邮箱地址", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度在6到20个字符", trigger: "blur" },
  ],
};

// 响应式数据
const formRef = ref();
const loading = ref(false);

// 登录处理
const handleLogin = async () => {
  try {
    // 表单验证
    const valid = await formRef.value.validate();
    if (!valid) return;

    loading.value = true;

    // 模拟登录请求
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 登录成功
    uni.showToast({
      title: "登录成功",
      icon: "success",
    });

    // 跳转到首页
    setTimeout(() => {
      uni.switchTab({
        url: "/pages/index/index",
      });
    }, 1500);
  } catch (error) {
    console.error("登录失败:", error);
    uni.showToast({
      title: "登录失败",
      icon: "error",
    });
  } finally {
    loading.value = false;
  }
};

// 跳转到注册页面
const goToRegister = () => {
  uni.navigateTo({
    url: "/pages/register/register",
  });
};
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60rpx 40rpx;
  display: flex;
  flex-direction: column;
}

.login-header {
  text-align: center;
  margin-bottom: 80rpx;

  .logo {
    width: 120rpx;
    height: 120rpx;
    margin-bottom: 30rpx;
  }

  .app-title {
    display: block;
    font-size: 48rpx;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 10rpx;
  }

  .app-subtitle {
    display: block;
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.8);
  }
}

.login-form {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20rpx;
  padding: 60rpx 40rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.form-actions {
  margin-top: 60rpx;

  .login-btn {
    width: 100%;
    height: 88rpx;
    border-radius: 44rpx;
    font-size: 32rpx;
    font-weight: bold;
  }

  .register-link {
    text-align: center;
    margin-top: 30rpx;
    font-size: 28rpx;
    color: #666;

    .link-text {
      color: #667eea;
      font-weight: bold;
      margin-left: 10rpx;
    }
  }
}

.login-footer {
  text-align: center;
  margin-top: auto;

  .footer-text {
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
