// uni-app 类型声明
declare const uni: {
  navigateTo: (options: { url: string }) => void;
  showToast: (options: { title: string; icon?: string }) => void;
  showModal: (options: {
    title: string;
    content: string;
    success?: (res: any) => void;
  }) => void;
  switchTab: (options: { url: string }) => void;
};

// Vue 3 全局类型
declare global {
  const uni: typeof uni;
}
