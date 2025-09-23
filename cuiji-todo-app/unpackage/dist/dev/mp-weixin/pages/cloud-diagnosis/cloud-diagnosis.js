"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "cloud-diagnosis",
  setup(__props) {
    const diagnosisResult = common_vendor.ref("等待诊断...");
    const checkCloudEnv = async () => {
      diagnosisResult.value = "正在检查云开发环境...";
      try {
        if (typeof common_vendor.nr === "undefined") {
          diagnosisResult.value = "❌ uniCloud未初始化，请检查manifest.json配置";
          return;
        }
        const info = common_vendor.nr.getCloudInfo();
        diagnosisResult.value = `✅ 云开发环境正常
环境ID: ${info.envId || "未设置"}`;
      } catch (error) {
        diagnosisResult.value = `❌ 云开发环境检查失败: ${error.message}`;
      }
    };
    const checkCloudFunctions = async () => {
      diagnosisResult.value = "正在检查云函数列表...";
      try {
        const result = await common_vendor.nr.callFunction({
          name: "init-database"
        });
        diagnosisResult.value = `✅ 云函数调用成功
返回: ${JSON.stringify(
          result.result
        )}`;
      } catch (error) {
        if (error.message.includes("not found") || error.message.includes("未匹配")) {
          diagnosisResult.value = `❌ 云函数未找到
错误: ${error.message}

解决方案:
1. 确保已上传云函数到云端
2. 检查云函数名称是否正确
3. 确认云服务空间已关联`;
        } else {
          diagnosisResult.value = `❌ 云函数调用失败: ${error.message}`;
        }
      }
    };
    const testCloudCall = async () => {
      diagnosisResult.value = "正在测试云函数调用...";
      try {
        const functions = ["init-database", "task-list", "task-create"];
        const results = [];
        for (const funcName of functions) {
          try {
            const result = await common_vendor.nr.callFunction({
              name: funcName,
              data: funcName === "task-list" ? { page: 1, pageSize: 1 } : {}
            });
            results.push(`✅ ${funcName}: 成功`);
          } catch (error) {
            results.push(`❌ ${funcName}: ${error.message}`);
          }
        }
        diagnosisResult.value = `云函数测试结果:
${results.join("\n")}`;
      } catch (error) {
        diagnosisResult.value = `❌ 云函数测试失败: ${error.message}`;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(checkCloudEnv),
        b: common_vendor.o(checkCloudFunctions),
        c: common_vendor.o(testCloudCall),
        d: common_vendor.t(diagnosisResult.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-36df5f3d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cloud-diagnosis/cloud-diagnosis.js.map
