<template>
  <view class="container">
    <view class="header">
      <!-- <image class="logo" src="/static/uni.png" mode="aspectFit"></image> -->
      <text class="title">待办事项管理应用</text>
      <text class="subtitle">基于 uni-app + Vue3 + TypeScript</text>
    </view>

    <view class="content">
      <!-- 今日概览卡片 -->
      <view class="overview-card">
        <view class="card-header">
          <text class="card-title">今日概览</text>
          <text class="date">{{ todayDate }}</text>
        </view>
        <view class="stats-grid">
          <view class="stat-item">
            <text class="stat-number">{{ todayStats.totalTasks }}</text>
            <text class="stat-label">总任务</text>
          </view>
          <view class="stat-item">
            <text class="stat-number">{{ todayStats.completedTasks }}</text>
            <text class="stat-label">已完成</text>
          </view>
          <view class="stat-item">
            <text class="stat-number">{{ todayStats.completionRate }}%</text>
            <text class="stat-label">完成率</text>
          </view>
        </view>
      </view>

      <!-- 分享功能区域 -->
      <view class="share-section">
        <view class="section-header">
          <text class="section-title">今日分享</text>
          <text class="section-subtitle">记录你的成长足迹</text>
        </view>

        <!-- 分享卡片列表 -->
        <view class="share-cards">
          <view
            v-for="(share, index) in shareCards"
            :key="index"
            class="share-card"
            @click="viewShareDetail(share)"
          >
            <view class="card-content">
              <view class="user-info">
                <image
                  class="avatar"
                  :src="share.user.avatar"
                  mode="aspectFill"
                ></image>
                <view class="user-details">
                  <text class="username">{{ share.user.name }}</text>
                  <text class="share-time">{{ share.time }}</text>
                </view>
                <view
                  class="follow-btn"
                  @click.stop="toggleFollow(share.user.id)"
                >
                  <text class="follow-text">{{
                    share.user.isFollowed ? "已关注" : "关注"
                  }}</text>
                </view>
              </view>

              <view class="share-content">
                <text class="share-text">{{ share.content }}</text>
                <view class="achievement-badges">
                  <view
                    v-for="badge in share.achievements"
                    :key="badge.id"
                    class="badge"
                    :style="{ backgroundColor: badge.color }"
                  >
                    <text class="badge-text">{{ badge.text }}</text>
                  </view>
                </view>
              </view>

              <view class="share-stats">
                <view class="stat-item">
                  <text class="stat-icon">📊</text>
                  <text class="stat-text"
                    >{{ share.stats.tasksCompleted }} 任务完成</text
                  >
                </view>
                <view class="stat-item">
                  <text class="stat-icon">🎯</text>
                  <text class="stat-text"
                    >{{ share.stats.goalsAchieved }} 目标达成</text
                  >
                </view>
              </view>

              <view class="card-actions">
                <view class="action-item" @click.stop="toggleLike(share.id)">
                  <text class="action-icon">{{
                    share.isLiked ? "❤️" : "🤍"
                  }}</text>
                  <text class="action-text">{{ share.likeCount }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 创建分享按钮 -->
      <view class="create-share-btn" @click="showCreateShare = true">
        <text class="btn-icon">✍️</text>
        <text class="btn-text">分享今日成就</text>
      </view>
    </view>

    <!-- 创建分享弹窗 -->
    <uni-popup ref="createSharePopup" type="bottom">
      <view class="create-share-popup">
        <view class="popup-header">
          <text class="popup-title">分享今日成就</text>
          <text class="close-btn" @click="closeCreateShare">×</text>
        </view>
        <view class="popup-content">
          <view class="input-section">
            <text class="input-label">分享内容</text>
            <textarea
              v-model="newShare.content"
              class="share-input"
              placeholder="记录今天的成长和收获..."
              maxlength="200"
            ></textarea>
            <text class="char-count">{{ newShare.content.length }}/200</text>
          </view>

          <view class="achievement-section">
            <text class="section-label">选择成就标签</text>
            <view class="achievement-tags">
              <view
                v-for="tag in achievementTags"
                :key="tag.id"
                class="tag-item"
                :class="{ selected: newShare.selectedTags.includes(tag.id) }"
                @click="toggleTag(tag.id)"
              >
                <text class="tag-text">{{ tag.text }}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="popup-footer">
          <button class="btn cancel" @click="closeCreateShare">取消</button>
          <button class="btn confirm" @click="createShare">发布</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";

// 声明 uni-app 全局对象
declare const uni: any;

// 接口定义
interface User {
  id: string;
  name: string;
  avatar: string;
  isFollowed: boolean;
}

interface ShareStats {
  tasksCompleted: number;
  goalsAchieved: number;
}

interface Achievement {
  id: string;
  text: string;
  color: string;
}

interface ShareCard {
  id: string;
  user: User;
  content: string;
  time: string;
  achievements: Achievement[];
  stats: ShareStats;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
}

interface AchievementTag {
  id: string;
  text: string;
}

// 响应式数据
const todayDate = ref("");
const showCreateShare = ref(false);
const createSharePopup = ref();

// 今日统计数据
const todayStats = reactive({
  totalTasks: 12,
  completedTasks: 8,
  completionRate: 67,
});

// 新分享数据
const newShare = reactive({
  content: "",
  selectedTags: [] as string[],
});

// 成就标签选项
const achievementTags: AchievementTag[] = [
  { id: "1", text: "早起达人" },
  { id: "2", text: "任务完成" },
  { id: "3", text: "学习进步" },
  { id: "4", text: "运动健身" },
  { id: "5", text: "工作效率" },
  { id: "6", text: "生活规律" },
  { id: "7", text: "目标达成" },
  { id: "8", text: "坚持打卡" },
];

// 分享卡片数据
const shareCards = ref<ShareCard[]>([
  {
    id: "1",
    user: {
      id: "user1",
      name: "小明同学",
      avatar: "https://via.placeholder.com/60x60/667eea/ffffff?text=小",
      isFollowed: false,
    },
    content: "今天完成了8个任务，感觉很有成就感！坚持早起让我的一天更加充实 🎉",
    time: "2小时前",
    achievements: [
      { id: "1", text: "早起达人", color: "#ff6b6b" },
      { id: "2", text: "任务完成", color: "#4ecdc4" },
    ],
    stats: {
      tasksCompleted: 8,
      goalsAchieved: 3,
    },
    isLiked: false,
    likeCount: 12,
    commentCount: 5,
  },
  {
    id: "2",
    user: {
      id: "user2",
      name: "学习小能手",
      avatar: "https://via.placeholder.com/60x60/f093fb/ffffff?text=学",
      isFollowed: true,
    },
    content:
      "坚持学习新技能的第30天，今天掌握了Vue3的Composition API，离目标又近了一步！",
    time: "4小时前",
    achievements: [
      { id: "3", text: "学习进步", color: "#a8edea" },
      { id: "8", text: "坚持打卡", color: "#d299c2" },
    ],
    stats: {
      tasksCompleted: 5,
      goalsAchieved: 2,
    },
    isLiked: true,
    likeCount: 28,
    commentCount: 12,
  },
  {
    id: "3",
    user: {
      id: "user3",
      name: "健身达人",
      avatar: "https://via.placeholder.com/60x60/43e97b/ffffff?text=健",
      isFollowed: false,
    },
    content:
      "今天的运动目标超额完成！跑步5公里 + 力量训练，身体状态越来越好 💪",
    time: "6小时前",
    achievements: [
      { id: "4", text: "运动健身", color: "#43e97b" },
      { id: "7", text: "目标达成", color: "#fa709a" },
    ],
    stats: {
      tasksCompleted: 6,
      goalsAchieved: 4,
    },
    isLiked: false,
    likeCount: 35,
    commentCount: 8,
  },
]);

// 计算属性
const completionRate = computed(() => {
  if (todayStats.totalTasks === 0) return 0;
  return Math.round((todayStats.completedTasks / todayStats.totalTasks) * 100);
});

// 方法
const formatDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getRandomColor = (): string => {
  const colors = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#96ceb4",
    "#feca57",
    "#ff9ff3",
    "#54a0ff",
    "#5f27cd",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const viewShareDetail = (share: ShareCard) => {
  console.log("查看分享详情:", share);
  // 这里可以跳转到分享详情页
};

const toggleFollow = (userId: string) => {
  const user = shareCards.value.find((share) => share.user.id === userId);
  if (user) {
    user.user.isFollowed = !user.user.isFollowed;
    uni.showToast({
      title: user.user.isFollowed ? "关注成功" : "取消关注",
      icon: "success",
    });
  }
};

const toggleLike = (shareId: string) => {
  const share = shareCards.value.find((s) => s.id === shareId);
  if (share) {
    share.isLiked = !share.isLiked;
    share.likeCount += share.isLiked ? 1 : -1;
  }
};

const toggleTag = (tagId: string) => {
  const index = newShare.selectedTags.indexOf(tagId);
  if (index > -1) {
    newShare.selectedTags.splice(index, 1);
  } else {
    newShare.selectedTags.push(tagId);
  }
};

const createShare = () => {
  if (!newShare.content.trim()) {
    uni.showToast({
      title: "请输入分享内容",
      icon: "none",
    });
    return;
  }

  const selectedAchievements: Achievement[] = achievementTags
    .filter((tag) => newShare.selectedTags.includes(tag.id))
    .map((tag) => ({
      id: tag.id,
      text: tag.text,
      color: getRandomColor(),
    }));

  const newShareCard: ShareCard = {
    id: Date.now().toString(),
    user: {
      id: "current_user",
      name: "我",
      avatar: "https://via.placeholder.com/60x60/667eea/ffffff?text=我",
      isFollowed: false,
    },
    content: newShare.content,
    time: "刚刚",
    achievements: selectedAchievements,
    stats: {
      tasksCompleted: todayStats.completedTasks,
      goalsAchieved: Math.floor(todayStats.completedTasks / 2),
    },
    isLiked: false,
    likeCount: 0,
    commentCount: 0,
  };

  shareCards.value.unshift(newShareCard);
  closeCreateShare();

  uni.showToast({
    title: "分享成功",
    icon: "success",
  });
};

const closeCreateShare = () => {
  createSharePopup.value.close();
  newShare.content = "";
  newShare.selectedTags = [];
};

// 生命周期
onMounted(() => {
  todayDate.value = formatDate();
  todayStats.completionRate = completionRate.value;
  console.log("首页加载完成");
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx 40rpx 160rpx 40rpx; /* 底部留出导航栏空间 */
}

.header {
  text-align: center;
  margin-bottom: 40rpx;

  .logo {
    width: 80rpx;
    height: 80rpx;
    margin-bottom: 15rpx;
  }

  .title {
    display: block;
    font-size: 36rpx;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 8rpx;
  }

  .subtitle {
    display: block;
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.8);
  }
}

.content {
  // 今日概览卡片
  .overview-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;

      .card-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
      }

      .date {
        font-size: 24rpx;
        color: #999;
      }
    }

    .stats-grid {
      display: flex;
      justify-content: space-around;

      .stat-item {
        text-align: center;

        .stat-number {
          display: block;
          font-size: 36rpx;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 8rpx;
        }

        .stat-label {
          font-size: 24rpx;
          color: #666;
        }
      }
    }
  }

  // 分享功能区域
  .share-section {
    margin-bottom: 30rpx;

    .section-header {
      text-align: center;
      margin-bottom: 20rpx;

      .section-title {
        display: block;
        font-size: 32rpx;
        font-weight: bold;
        color: #ffffff;
        margin-bottom: 8rpx;
      }

      .section-subtitle {
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.8);
      }
    }

    .share-cards {
      .share-card {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20rpx;
        margin-bottom: 20rpx;
        box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
        overflow: hidden;

        .card-content {
          padding: 30rpx;

          .user-info {
            display: flex;
            align-items: center;
            margin-bottom: 20rpx;

            .avatar {
              width: 60rpx;
              height: 60rpx;
              border-radius: 50%;
              margin-right: 20rpx;
            }

            .user-details {
              flex: 1;

              .username {
                display: block;
                font-size: 28rpx;
                font-weight: bold;
                color: #333;
                margin-bottom: 4rpx;
              }

              .share-time {
                font-size: 22rpx;
                color: #999;
              }
            }

            .follow-btn {
              padding: 8rpx 20rpx;
              background: #667eea;
              border-radius: 20rpx;

              .follow-text {
                font-size: 22rpx;
                color: white;
              }
            }
          }

          .share-content {
            margin-bottom: 20rpx;

            .share-text {
              display: block;
              font-size: 28rpx;
              color: #333;
              line-height: 1.6;
              margin-bottom: 15rpx;
            }

            .achievement-badges {
              display: flex;
              flex-wrap: wrap;
              gap: 10rpx;

              .badge {
                padding: 6rpx 16rpx;
                border-radius: 20rpx;

                .badge-text {
                  font-size: 20rpx;
                  color: white;
                }
              }
            }
          }

          .share-stats {
            display: flex;
            gap: 30rpx;
            margin-bottom: 20rpx;
            padding: 15rpx;
            background: #f8f9fa;
            border-radius: 10rpx;

            .stat-item {
              display: flex;
              align-items: center;

              .stat-icon {
                font-size: 24rpx;
                margin-right: 8rpx;
              }

              .stat-text {
                font-size: 22rpx;
                color: #666;
              }
            }
          }

          .card-actions {
            display: flex;
            justify-content: center;
            padding-top: 20rpx;
            border-top: 1rpx solid #eee;

            .action-item {
              display: flex;
              align-items: center;
              padding: 10rpx 20rpx;
              border-radius: 20rpx;
              background: #f8f9fa;

              .action-icon {
                font-size: 24rpx;
                margin-right: 8rpx;
              }

              .action-text {
                font-size: 22rpx;
                color: #666;
              }
            }
          }
        }
      }
    }
  }

  // 创建分享按钮
  .create-share-btn {
    position: fixed;
    bottom: 120rpx;
    right: 40rpx;
    display: flex;
    align-items: center;
    background: #667eea;
    border-radius: 50rpx;
    padding: 20rpx 30rpx;
    box-shadow: 0 8rpx 32rpx rgba(102, 126, 234, 0.3);
    z-index: 100;

    .btn-icon {
      font-size: 28rpx;
      margin-right: 10rpx;
    }

    .btn-text {
      font-size: 24rpx;
      color: white;
      font-weight: bold;
    }
  }
}

// 创建分享弹窗样式
.create-share-popup {
  background: white;
  border-radius: 20rpx 20rpx 0 0;
  max-height: 80vh;

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #eee;

    .popup-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
    }

    .close-btn {
      font-size: 40rpx;
      color: #999;
    }
  }

  .popup-content {
    padding: 30rpx;

    .input-section {
      margin-bottom: 30rpx;

      .input-label {
        display: block;
        font-size: 28rpx;
        color: #333;
        margin-bottom: 15rpx;
      }

      .share-input {
        width: 100%;
        min-height: 120rpx;
        padding: 20rpx;
        border: 1rpx solid #ddd;
        border-radius: 10rpx;
        font-size: 28rpx;
        line-height: 1.6;
      }

      .char-count {
        display: block;
        text-align: right;
        font-size: 22rpx;
        color: #999;
        margin-top: 10rpx;
      }
    }

    .achievement-section {
      .section-label {
        display: block;
        font-size: 28rpx;
        color: #333;
        margin-bottom: 15rpx;
      }

      .achievement-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 15rpx;

        .tag-item {
          padding: 12rpx 24rpx;
          border: 1rpx solid #ddd;
          border-radius: 20rpx;
          background: #f8f9fa;

          &.selected {
            background: #667eea;
            border-color: #667eea;

            .tag-text {
              color: white;
            }
          }

          .tag-text {
            font-size: 24rpx;
            color: #666;
          }
        }
      }
    }
  }

  .popup-footer {
    display: flex;
    gap: 20rpx;
    padding: 30rpx;
    border-top: 1rpx solid #eee;

    .btn {
      flex: 1;
      height: 80rpx;
      border-radius: 10rpx;
      font-size: 28rpx;
      border: none;

      &.cancel {
        background: #f5f5f5;
        color: #666;
      }

      &.confirm {
        background: #667eea;
        color: white;
      }
    }
  }
}
</style>
