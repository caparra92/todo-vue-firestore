import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    db: {},
    tasks: []
  },
  getters: {
    database : state => state.db,
    tasks: state => state.tasks
  },
  mutations: {
    'SET_DATABASE': (state,db) => {
      state.db = db
    },
    'ADD_TASK': (state, task) => {
      state.tasks.push(task)
    },
    'MODIFY_TASK': (state, task) => {
      let taskFinded = state.tasks.find(item => task.id === item.id)
      taskFinded.title = task.title
      taskFinded.description = task.description
      taskFinded.status = task.status
    },
    'DELETE_TASK': (state, taskId) => {
      state.tasks = state.tasks.filter(item => item.id !== taskId)
    },
    'RESET_TASKS': (state) => {
      state.tasks = []
    }
  },
  actions: {
  },
  modules: {
  }
})
