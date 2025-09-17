"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_u_input = common_vendor.resolveComponent("u-input");
  const _component_u_form_item = common_vendor.resolveComponent("u-form-item");
  const _component_u_form = common_vendor.resolveComponent("u-form");
  const _component_u_button = common_vendor.resolveComponent("u-button");
  (_component_u_input + _component_u_form_item + _component_u_form + _component_u_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const formData = common_vendor.reactive({
      email: "",
      password: ""
    });
    const rules = {
      email: [
        { required: true, message: "请输入邮箱地址", trigger: "blur" },
        { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 20, message: "密码长度在6到20个字符", trigger: "blur" }
      ]
    };
    const formRef = common_vendor.ref();
    const loading = common_vendor.ref(false);
    const handleLogin = async () => {
      try {
        const valid = await formRef.value.validate();
        if (!valid)
          return;
        loading.value = true;
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }, 1500);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/login/login.vue:109", "登录失败:", error);
        common_vendor.index.showToast({
          title: "登录失败",
          icon: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    const goToRegister = () => {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(($event) => formData.email = $event),
        c: common_vendor.p({
          placeholder: "请输入邮箱地址",
          type: "email",
          clearable: true,
          modelValue: formData.email
        }),
        d: common_vendor.p({
          label: "邮箱",
          prop: "email"
        }),
        e: common_vendor.o(($event) => formData.password = $event),
        f: common_vendor.p({
          placeholder: "请输入密码",
          type: "password",
          clearable: true,
          ["show-password"]: true,
          modelValue: formData.password
        }),
        g: common_vendor.p({
          label: "密码",
          prop: "password"
        }),
        h: common_vendor.sr(formRef, "e4e4508d-0", {
          "k": "formRef"
        }),
        i: common_vendor.p({
          model: formData,
          rules,
          ["label-position"]: "top"
        }),
        j: common_vendor.o(handleLogin),
        k: common_vendor.p({
          type: "primary",
          loading: loading.value
        }),
        l: common_vendor.o(goToRegister)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
