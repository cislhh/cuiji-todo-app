<template>
  <view v-if="visible" class="modal-overlay" @click="handleOverlayClick">
    <view class="modal-container" @click.stop>
      <view class="modal-body">
        <slot></slot>
      </view>

      <view class="modal-footer" v-if="showFooter">
        <slot name="footer">
          <button
            class="modal-btn modal-btn-cancel"
            @click="handleCancel"
            v-if="showCancel"
          >
            {{ cancelText }}
          </button>
          <button
            class="modal-btn modal-btn-confirm"
            @click="handleConfirm"
            v-if="showConfirm"
          >
            {{ confirmText }}
          </button>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { watch } from "vue";

interface ModalProps {
  visible: boolean;
  maskClosable?: boolean;
  showFooter?: boolean;
  showCancel?: boolean;
  showConfirm?: boolean;
  cancelText?: string;
  confirmText?: string;
  width?: string;
  height?: string;
  animation?: boolean;
}

interface ModalEmits {
  (e: "update:visible", value: boolean): void;
  (e: "close"): void;
  (e: "cancel"): void;
  (e: "confirm"): void;
}

const props = withDefaults(defineProps<ModalProps>(), {
  visible: false,
  maskClosable: true,
  showFooter: true,
  showCancel: true,
  showConfirm: true,
  cancelText: "取消",
  confirmText: "确认",
  width: "600rpx",
  height: "auto",
  animation: true,
});

const emit = defineEmits<ModalEmits>();

const handleCancel = () => {
  emit("update:visible", false);
  emit("cancel");
};

const handleConfirm = () => {
  emit("confirm");
};

const handleOverlayClick = () => {
  if (props.maskClosable) {
    emit("update:visible", false);
    emit("close");
  }
};

// 监听 visible 变化，控制页面滚动
watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      // 禁止页面滚动
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0,
      });
    }
  }
);
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;
}

.modal-container {
  background: white;
  border-radius: 20rpx;
  max-width: 90vw;
  max-height: 80vh;
  overflow: hidden;
  animation: slideIn 0.3s ease-out;
  box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.1);
}

.modal-body {
  padding: 40rpx;
  max-height: 60vh;
  overflow-y: auto;
}

.modal-footer {
  display: flex;
  gap: 20rpx;
  padding: 20rpx 40rpx 40rpx;
  border-top: 1rpx solid #f0f0f0;
}

.modal-btn {
  flex: 1;
  height: 80rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  border: none;

  &:active {
    opacity: 0.8;
  }
}

.modal-btn-cancel {
  background: #f5f5f5;
  color: #666;
}

.modal-btn-confirm {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

// 动画效果
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50rpx) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

// 响应式设计
@media (max-width: 750rpx) {
  .modal-container {
    margin: 40rpx;
    max-width: calc(100vw - 80rpx);
  }

  .modal-body,
  .modal-footer {
    padding-left: 30rpx;
    padding-right: 30rpx;
  }
}
</style>
