"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    // 用户登录状态
    hasLogin: false,
    loginProvider: "",
    openid: null,
    // 待办事项相关状态
    todos: [],
    filter: "all",
    // all, active, completed
    // 应用状态
    theme: "light"
    // light, dark
  },
  mutations: {
    // 用户登录相关
    login(state, provider) {
      state.hasLogin = true;
      state.loginProvider = provider;
    },
    logout(state) {
      state.hasLogin = false;
      state.openid = null;
    },
    setOpenid(state, openid) {
      state.openid = openid;
    },
    // 待办事项相关
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    updateTodo(state, { id, updates }) {
      const index = state.todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.todos.splice(index, 1, { ...state.todos[index], ...updates });
      }
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    setFilter(state, filter) {
      state.filter = filter;
    },
    clearCompleted(state) {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    // 主题切换
    setTheme(state, theme) {
      state.theme = theme;
    }
  },
  getters: {
    // 过滤后的待办事项
    filteredTodos(state) {
      switch (state.filter) {
        case "active":
          return state.todos.filter((todo) => !todo.completed);
        case "completed":
          return state.todos.filter((todo) => todo.completed);
        default:
          return state.todos;
      }
    },
    // 统计信息
    todoStats(state) {
      const total = state.todos.length;
      const completed = state.todos.filter((todo) => todo.completed).length;
      const active = total - completed;
      return { total, completed, active };
    }
  },
  actions: {
    // 异步获取用户openid
    getUserOpenId: async function({ commit, state }) {
      return await new Promise((resolve, reject) => {
        if (state.openid) {
          resolve(state.openid);
        } else {
          common_vendor.index.login({
            success: (data) => {
              commit("login");
              const openid = "mock_openid_" + Date.now();
              commit("setOpenid", openid);
              resolve(openid);
            },
            fail: (err) => {
              common_vendor.index.__f__("log", "at store/index.js:100", "登录失败", err);
              reject(err);
            }
          });
        }
      });
    }
  }
});
exports.store = store;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/index.js.map
