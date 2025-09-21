/**
 * 弹窗组件相关类型定义
 */

// 弹窗组件 Props 接口
export interface ModalProps {
  /** 是否显示弹窗 */
  visible: boolean;
  /** 点击遮罩层是否关闭弹窗 */
  maskClosable?: boolean;
  /** 是否显示底部按钮区域 */
  showFooter?: boolean;
  /** 是否显示取消按钮 */
  showCancel?: boolean;
  /** 是否显示确认按钮 */
  showConfirm?: boolean;
  /** 取消按钮文字 */
  cancelText?: string;
  /** 确认按钮文字 */
  confirmText?: string;
  /** 弹窗宽度 */
  width?: string;
  /** 弹窗高度 */
  height?: string;
  /** 是否启用动画 */
  animation?: boolean;
}

// 弹窗组件 Emits 接口
export interface ModalEmits {
  /** 更新 visible 状态 */
  (e: "update:visible", value: boolean): void;
  /** 关闭弹窗事件 */
  (e: "close"): void;
  /** 取消按钮点击事件 */
  (e: "cancel"): void;
  /** 确认按钮点击事件 */
  (e: "confirm"): void;
}

// 弹窗组件实例方法接口
export interface ModalInstance {
  /** 打开弹窗 */
  open: () => void;
  /** 关闭弹窗 */
  close: () => void;
  /** 切换弹窗显示状态 */
  toggle: () => void;
}

// 弹窗内容插槽接口
export interface ModalSlots {
  /** 默认内容插槽 */
  default: () => any;
  /** 底部按钮区域插槽 */
  footer: () => any;
}

// 弹窗配置选项
export interface ModalOptions {
  /** 弹窗标题 */
  title?: string;
  /** 弹窗内容 */
  content?: string;
  /** 是否显示取消按钮 */
  showCancel?: boolean;
  /** 取消按钮文字 */
  cancelText?: string;
  /** 确认按钮文字 */
  confirmText?: string;
  /** 确认按钮颜色 */
  confirmColor?: string;
  /** 点击遮罩层是否关闭 */
  maskClosable?: boolean;
  /** 成功回调 */
  success?: (result: { confirm: boolean; cancel: boolean }) => void;
  /** 失败回调 */
  fail?: (error: any) => void;
  /** 完成回调 */
  complete?: () => void;
}

// 弹窗类型枚举
export enum ModalType {
  /** 信息提示 */
  INFO = "info",
  /** 成功提示 */
  SUCCESS = "success",
  /** 警告提示 */
  WARNING = "warning",
  /** 错误提示 */
  ERROR = "error",
  /** 确认对话框 */
  CONFIRM = "confirm",
  /** 自定义内容 */
  CUSTOM = "custom",
}

// 弹窗位置枚举
export enum ModalPosition {
  /** 居中 */
  CENTER = "center",
  /** 顶部 */
  TOP = "top",
  /** 底部 */
  BOTTOM = "bottom",
  /** 左侧 */
  LEFT = "left",
  /** 右侧 */
  RIGHT = "right",
}
