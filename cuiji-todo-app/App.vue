<template>
  <view id="app">
    <!-- 应用内容 -->
  </view>
  <!-- 自定义底部导航栏 -->
  <CustomTabBar />
</template>

<script>
import { version } from "./package.json";
import CustomTabBar from "@/components/CustomTabBar/CustomTabBar.vue";

export default {
  components: {
    CustomTabBar,
  },
  onLaunch: function () {
    console.log("待办事项管理应用启动", `v${version}`);
  },
  onShow: function () {
    console.log("应用显示");
  },
  onHide: function () {
    console.log("应用隐藏");
  },
  globalData: {
    // 全局数据
  },
};
</script>

<style lang="scss">
@import "@/uni_modules/uni-scss/index.scss";

/* 全局样式 */
page {
  background-color: #f5f5f5;
  height: 100%;
  font-size: 28rpx;
}

/* H5 兼容 PC */
/* #ifdef H5 */
@media screen and (min-width: 768px) {
  body {
    overflow-y: scroll;
  }
}
/* #endif */
</style>
