<template>
  <view class="profile-page">
    <view class="header">
      <view class="avatar-section">
        <image
          class="avatar"
          src="/static/avatar-default.png"
          mode="aspectFill"
        />
        <view class="username-container">
          <text class="username">{{ userInfo.username || "用户" }}</text>
          <text class="edit-icon" @click="onEditNickname">✏️</text>
        </view>
      </view>
    </view>

    <view class="menu-section">
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

    <!-- 昵称修改弹窗 -->
    <Modal
      v-model:visible="nicknameModalVisible"
      confirm-text="保存"
      cancel-text="取消"
      @confirm="onSaveNickname"
      @cancel="onCancelEditNickname"
      width="600rpx"
    >
      <view class="nickname-edit-content">
        <view class="modal-title">修改昵称</view>
        <view class="form-group">
          <text class="form-label">新昵称</text>
          <input
            v-model="newNickname"
            class="form-input"
            placeholder="请输入新昵称"
            maxlength="20"
          />
          <text class="form-tip">昵称长度不超过20个字符</text>
        </view>
      </view>
    </Modal>

    <!-- 关于我们弹窗 -->
    <Modal
      v-model:visible="aboutModalVisible"
      :show-footer="false"
      width="700rpx"
    >
      <view class="about-content">
        <view class="modal-title">关于我们</view>

        <view class="app-info">
          <image class="app-logo" src="/static/logo.png" mode="aspectFit" />
          <text class="app-name">待办事项管理应用</text>
          <text class="app-version">版本 1.0.0</text>
        </view>

        <view class="app-description">
          <text class="description-title">应用简介</text>
          <text class="description-text">
            这是一款基于 uni-app + Vue3 + TypeScript
            开发的跨平台待办事项管理应用。
            帮助您高效管理日常任务，提升工作效率。
          </text>
        </view>

        <view class="app-features">
          <text class="features-title">主要功能</text>
          <view class="features-list">
            <view class="feature-item">
              <text class="feature-icon">📝</text>
              <text class="feature-text">任务创建与管理</text>
            </view>
            <view class="feature-item">
              <text class="feature-icon">📅</text>
              <text class="feature-text">日期提醒与分类</text>
            </view>
            <view class="feature-item">
              <text class="feature-icon">📊</text>
              <text class="feature-text">数据统计与分析</text>
            </view>
            <view class="feature-item">
              <text class="feature-icon">☁️</text>
              <text class="feature-text">云端同步备份</text>
            </view>
          </view>
        </view>

        <view class="contact-info">
          <text class="contact-title">联系我们</text>
          <view class="contact-item">
            <text class="contact-label">开发者：</text>
            <text class="contact-value">cuiji</text>
          </view>
          <view class="contact-item">
            <text class="contact-label">邮箱：</text>
            <text class="contact-value">cuiji@example.com</text>
          </view>
          <view class="contact-item">
            <text class="contact-label">GitHub：</text>
            <text class="contact-value">github.com/cuiji</text>
          </view>
        </view>

        <view class="copyright">
          <text class="copyright-text">© 2024 cuiji. All rights reserved.</text>
        </view>
      </view>
    </Modal>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Modal from "@/components/Common/Modal.vue";

interface UserInfo {
  username: string;
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
});

const stats = reactive<Stats>({
  totalTasks: 0,
  completedTasks: 0,
  todayTasks: 0,
  overdueTasks: 0,
});

// 弹窗状态
const aboutModalVisible = ref(false);
const nicknameModalVisible = ref(false);
const newNickname = ref("");

const onMenuClick = (type: string) => {
  switch (type) {
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
      // 打开关于我们弹窗
      aboutModalVisible.value = true;
      break;
  }
};

// 昵称修改相关方法
const onEditNickname = () => {
  newNickname.value = userInfo.username;
  nicknameModalVisible.value = true;
};

const onSaveNickname = () => {
  const trimmedNickname = newNickname.value.trim();

  if (!trimmedNickname) {
    uni.showToast({
      title: "昵称不能为空",
      icon: "none",
    });
    return;
  }

  if (trimmedNickname.length > 20) {
    uni.showToast({
      title: "昵称长度不能超过20个字符",
      icon: "none",
    });
    return;
  }

  // 保存昵称
  userInfo.username = trimmedNickname;
  nicknameModalVisible.value = false;

  uni.showToast({
    title: "昵称修改成功",
    icon: "success",
  });
};

const onCancelEditNickname = () => {
  newNickname.value = "";
  nicknameModalVisible.value = false;
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

  .username-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15rpx;

    .username {
      font-size: 32rpx;
      font-weight: bold;
    }

    .edit-icon {
      font-size: 24rpx;
      padding: 8rpx;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      cursor: pointer;
      transition: all 0.3s ease;

      &:active {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0.95);
      }
    }
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

// 昵称修改弹窗样式
.nickname-edit-content {
  .modal-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 30rpx;
    padding-bottom: 20rpx;
    border-bottom: 2rpx solid #f0f0f0;
  }

  .form-group {
    .form-label {
      display: block;
      font-size: 28rpx;
      color: #333;
      margin-bottom: 15rpx;
      font-weight: 500;
    }

    .form-input {
      width: 100%;
      height: 80rpx;
      padding: 0 20rpx;
      border: 2rpx solid #e0e0e0;
      border-radius: 10rpx;
      font-size: 28rpx;
      color: #333;
      background: #fff;
      box-sizing: border-box;

      &:focus {
        border-color: #667eea;
        outline: none;
      }

      &::placeholder {
        color: #999;
      }
    }

    .form-tip {
      display: block;
      font-size: 22rpx;
      color: #999;
      margin-top: 10rpx;
    }
  }
}

// 关于我们弹窗样式
.about-content {
  .modal-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 30rpx;
    padding-bottom: 20rpx;
    border-bottom: 2rpx solid #f0f0f0;
  }

  .app-info {
    text-align: center;
    padding: 20rpx 0 40rpx;
    border-bottom: 1rpx solid #f0f0f0;
    margin-bottom: 30rpx;

    .app-logo {
      width: 120rpx;
      height: 120rpx;
      border-radius: 20rpx;
      margin-bottom: 20rpx;
      background: #f5f5f5;
    }

    .app-name {
      display: block;
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 10rpx;
    }

    .app-version {
      display: block;
      font-size: 24rpx;
      color: #666;
    }
  }

  .app-description {
    margin-bottom: 30rpx;

    .description-title {
      display: block;
      font-size: 28rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 15rpx;
    }

    .description-text {
      display: block;
      font-size: 26rpx;
      color: #666;
      line-height: 1.6;
    }
  }

  .app-features {
    margin-bottom: 30rpx;

    .features-title {
      display: block;
      font-size: 28rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
    }

    .features-list {
      .feature-item {
        display: flex;
        align-items: center;
        padding: 15rpx 0;
        border-bottom: 1rpx solid #f8f8f8;

        &:last-child {
          border-bottom: none;
        }

        .feature-icon {
          font-size: 28rpx;
          margin-right: 20rpx;
          width: 40rpx;
          text-align: center;
        }

        .feature-text {
          font-size: 26rpx;
          color: #666;
        }
      }
    }
  }

  .contact-info {
    margin-bottom: 30rpx;

    .contact-title {
      display: block;
      font-size: 28rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
    }

    .contact-item {
      display: flex;
      align-items: center;
      padding: 10rpx 0;

      .contact-label {
        font-size: 26rpx;
        color: #666;
        width: 140rpx;
      }

      .contact-value {
        font-size: 26rpx;
        color: #333;
        flex: 1;
      }
    }
  }

  .copyright {
    text-align: center;
    padding-top: 20rpx;
    border-top: 1rpx solid #f0f0f0;

    .copyright-text {
      font-size: 22rpx;
      color: #999;
    }
  }
}
</style>
