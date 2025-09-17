// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
// #endif

// #ifdef VUE3
import { createStore } from 'vuex'
const store = createStore({
// #endif
	state: {
		// 待办事项相关状态
		todos: [],
		filter: 'all', // all, active, completed
		
		// 应用状态
		theme: 'light' // light, dark
	},
	mutations: {
		// 待办事项相关
		addTodo(state, todo) {
			state.todos.push(todo);
		},
		updateTodo(state, { id, updates }) {
			const index = state.todos.findIndex(todo => todo.id === id);
			if (index !== -1) {
				state.todos.splice(index, 1, { ...state.todos[index], ...updates });
			}
		},
		deleteTodo(state, id) {
			state.todos = state.todos.filter(todo => todo.id !== id);
		},
		setFilter(state, filter) {
			state.filter = filter;
		},
		clearCompleted(state) {
			state.todos = state.todos.filter(todo => !todo.completed);
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
				case 'active':
					return state.todos.filter(todo => !todo.completed);
				case 'completed':
					return state.todos.filter(todo => todo.completed);
				default:
					return state.todos;
			}
		},
		// 统计信息
		todoStats(state) {
			const total = state.todos.length;
			const completed = state.todos.filter(todo => todo.completed).length;
			const active = total - completed;
			return { total, completed, active };
		}
	},
	actions: {
		// 可以在这里添加其他异步操作
	}
})

export default store