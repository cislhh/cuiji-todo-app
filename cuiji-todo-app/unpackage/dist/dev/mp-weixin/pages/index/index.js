"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const todayDate = common_vendor.ref("");
    const showCreateShare = common_vendor.ref(false);
    const createSharePopup = common_vendor.ref();
    const todayStats = common_vendor.reactive({
      totalTasks: 12,
      completedTasks: 8,
      completionRate: 67
    });
    const newShare = common_vendor.reactive({
      content: "",
      selectedTags: []
    });
    const achievementTags = [
      { id: "1", text: "早起达人" },
      { id: "2", text: "任务完成" },
      { id: "3", text: "学习进步" },
      { id: "4", text: "运动健身" },
      { id: "5", text: "工作效率" },
      { id: "6", text: "生活规律" },
      { id: "7", text: "目标达成" },
      { id: "8", text: "坚持打卡" }
    ];
    const shareCards = common_vendor.ref([
      {
        id: "1",
        user: {
          id: "user1",
          name: "小明同学",
          avatar: "https://via.placeholder.com/60x60/667eea/ffffff?text=小",
          isFollowed: false
        },
        content: "今天完成了8个任务，感觉很有成就感！坚持早起让我的一天更加充实 🎉",
        time: "2小时前",
        achievements: [
          { id: "1", text: "早起达人", color: "#ff6b6b" },
          { id: "2", text: "任务完成", color: "#4ecdc4" }
        ],
        stats: {
          tasksCompleted: 8,
          goalsAchieved: 3
        },
        isLiked: false,
        likeCount: 12,
        commentCount: 5
      },
      {
        id: "2",
        user: {
          id: "user2",
          name: "学习小能手",
          avatar: "https://via.placeholder.com/60x60/f093fb/ffffff?text=学",
          isFollowed: true
        },
        content: "坚持学习新技能的第30天，今天掌握了Vue3的Composition API，离目标又近了一步！",
        time: "4小时前",
        achievements: [
          { id: "3", text: "学习进步", color: "#a8edea" },
          { id: "8", text: "坚持打卡", color: "#d299c2" }
        ],
        stats: {
          tasksCompleted: 5,
          goalsAchieved: 2
        },
        isLiked: true,
        likeCount: 28,
        commentCount: 12
      },
      {
        id: "3",
        user: {
          id: "user3",
          name: "健身达人",
          avatar: "https://via.placeholder.com/60x60/43e97b/ffffff?text=健",
          isFollowed: false
        },
        content: "今天的运动目标超额完成！跑步5公里 + 力量训练，身体状态越来越好 💪",
        time: "6小时前",
        achievements: [
          { id: "4", text: "运动健身", color: "#43e97b" },
          { id: "7", text: "目标达成", color: "#fa709a" }
        ],
        stats: {
          tasksCompleted: 6,
          goalsAchieved: 4
        },
        isLiked: false,
        likeCount: 35,
        commentCount: 8
      }
    ]);
    const completionRate = common_vendor.computed(() => {
      if (todayStats.totalTasks === 0)
        return 0;
      return Math.round(todayStats.completedTasks / todayStats.totalTasks * 100);
    });
    const formatDate = () => {
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const getRandomColor = () => {
      const colors = [
        "#ff6b6b",
        "#4ecdc4",
        "#45b7d1",
        "#96ceb4",
        "#feca57",
        "#ff9ff3",
        "#54a0ff",
        "#5f27cd"
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    const viewShareDetail = (share) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:342", "查看分享详情:", share);
    };
    const toggleFollow = (userId) => {
      const user = shareCards.value.find((share) => share.user.id === userId);
      if (user) {
        user.user.isFollowed = !user.user.isFollowed;
        common_vendor.index.showToast({
          title: user.user.isFollowed ? "关注成功" : "取消关注",
          icon: "success"
        });
      }
    };
    const toggleLike = (shareId) => {
      const share = shareCards.value.find((s) => s.id === shareId);
      if (share) {
        share.isLiked = !share.isLiked;
        share.likeCount += share.isLiked ? 1 : -1;
      }
    };
    const showComments = (shareId) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:366", "显示评论:", shareId);
      common_vendor.index.showToast({
        title: "评论功能开发中",
        icon: "none"
      });
    };
    const shareToSocial = (shareId) => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:374", "分享到社交平台:", shareId);
      common_vendor.index.showActionSheet({
        itemList: ["分享到微信", "分享到朋友圈", "复制链接"],
        success: (res) => {
          const actions = ["分享到微信", "分享到朋友圈", "复制链接"];
          common_vendor.index.showToast({
            title: actions[res.tapIndex],
            icon: "success"
          });
        }
      });
    };
    const toggleTag = (tagId) => {
      const index = newShare.selectedTags.indexOf(tagId);
      if (index > -1) {
        newShare.selectedTags.splice(index, 1);
      } else {
        newShare.selectedTags.push(tagId);
      }
    };
    const createShare = () => {
      if (!newShare.content.trim()) {
        common_vendor.index.showToast({
          title: "请输入分享内容",
          icon: "none"
        });
        return;
      }
      const selectedAchievements = achievementTags.filter((tag) => newShare.selectedTags.includes(tag.id)).map((tag) => ({
        id: tag.id,
        text: tag.text,
        color: getRandomColor()
      }));
      const newShareCard = {
        id: Date.now().toString(),
        user: {
          id: "current_user",
          name: "我",
          avatar: "https://via.placeholder.com/60x60/667eea/ffffff?text=我",
          isFollowed: false
        },
        content: newShare.content,
        time: "刚刚",
        achievements: selectedAchievements,
        stats: {
          tasksCompleted: todayStats.completedTasks,
          goalsAchieved: Math.floor(todayStats.completedTasks / 2)
        },
        isLiked: false,
        likeCount: 0,
        commentCount: 0
      };
      shareCards.value.unshift(newShareCard);
      closeCreateShare();
      common_vendor.index.showToast({
        title: "分享成功",
        icon: "success"
      });
    };
    const closeCreateShare = () => {
      createSharePopup.value.close();
      newShare.content = "";
      newShare.selectedTags = [];
    };
    common_vendor.onMounted(() => {
      todayDate.value = formatDate();
      todayStats.completionRate = completionRate.value;
      common_vendor.index.__f__("log", "at pages/index/index.vue:452", "首页加载完成");
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.t(todayDate.value),
        c: common_vendor.t(todayStats.totalTasks),
        d: common_vendor.t(todayStats.completedTasks),
        e: common_vendor.t(todayStats.completionRate),
        f: common_vendor.f(shareCards.value, (share, index, i0) => {
          return {
            a: share.user.avatar,
            b: common_vendor.t(share.user.name),
            c: common_vendor.t(share.time),
            d: common_vendor.t(share.user.isFollowed ? "已关注" : "关注"),
            e: common_vendor.o(($event) => toggleFollow(share.user.id), index),
            f: common_vendor.t(share.content),
            g: common_vendor.f(share.achievements, (badge, k1, i1) => {
              return {
                a: common_vendor.t(badge.text),
                b: badge.id,
                c: badge.color
              };
            }),
            h: common_vendor.t(share.stats.tasksCompleted),
            i: common_vendor.t(share.stats.goalsAchieved),
            j: common_vendor.t(share.isLiked ? "❤️" : "🤍"),
            k: common_vendor.t(share.likeCount),
            l: common_vendor.o(($event) => toggleLike(share.id), index),
            m: common_vendor.t(share.commentCount),
            n: common_vendor.o(($event) => showComments(share.id), index),
            o: common_vendor.o(($event) => shareToSocial(share.id), index),
            p: index,
            q: common_vendor.o(($event) => viewShareDetail(share), index)
          };
        }),
        g: common_vendor.o(($event) => showCreateShare.value = true),
        h: common_vendor.o(closeCreateShare),
        i: newShare.content,
        j: common_vendor.o(($event) => newShare.content = $event.detail.value),
        k: common_vendor.t(newShare.content.length),
        l: common_vendor.f(achievementTags, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag.text),
            b: tag.id,
            c: newShare.selectedTags.includes(tag.id) ? 1 : "",
            d: common_vendor.o(($event) => toggleTag(tag.id), tag.id)
          };
        }),
        m: common_vendor.o(closeCreateShare),
        n: common_vendor.o(createShare),
        o: common_vendor.sr(createSharePopup, "1cf27b2a-0", {
          "k": "createSharePopup"
        }),
        p: common_vendor.p({
          type: "bottom"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
