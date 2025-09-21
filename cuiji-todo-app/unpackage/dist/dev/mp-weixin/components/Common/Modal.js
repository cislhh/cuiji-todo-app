"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Modal",
  props: {
    visible: { type: Boolean, default: false },
    maskClosable: { type: Boolean, default: true },
    showFooter: { type: Boolean, default: true },
    showCancel: { type: Boolean, default: true },
    showConfirm: { type: Boolean, default: true },
    cancelText: { default: "取消" },
    confirmText: { default: "确认" },
    width: { default: "600rpx" },
    height: { default: "auto" },
    animation: { type: Boolean, default: true }
  },
  emits: ["update:visible", "close", "cancel", "confirm"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
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
    common_vendor.watch(
      () => props.visible,
      (newVal) => {
        if (newVal) {
          common_vendor.index.pageScrollTo({
            scrollTop: 0,
            duration: 0
          });
        }
      }
    );
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.visible
      }, _ctx.visible ? common_vendor.e({
        b: _ctx.showFooter
      }, _ctx.showFooter ? common_vendor.e({
        c: _ctx.showCancel
      }, _ctx.showCancel ? {
        d: common_vendor.t(_ctx.cancelText),
        e: common_vendor.o(handleCancel)
      } : {}, {
        f: _ctx.showConfirm
      }, _ctx.showConfirm ? {
        g: common_vendor.t(_ctx.confirmText),
        h: common_vendor.o(handleConfirm)
      } : {}) : {}, {
        i: common_vendor.o(() => {
        }),
        j: common_vendor.o(handleOverlayClick)
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6356995c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/Common/Modal.js.map
