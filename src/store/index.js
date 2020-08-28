import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    db: {},
    tasks: []
  },
  getters: {
    database: state => state.db,
    tasks: state => state.tasks
  },
  mutations: {
    'SET_DATABASE': (state, db) => {
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
    getListenerRealTime(context) {
      context.getters.database.collection("tasks").onSnapshot( snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
              const source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";
              if (source == "Server") {
                context.commit('ADD_TASK', {
                  id: change.doc.id,
                  title: change.doc.data().title,
                  description: change.doc.data().description,
                  status: change.doc.data().status
                })
              } 
              console.log("local changes: ", change.doc.data());
            }
            if (change.type === "modified") {
              context.commit('MODIFY_TASK',{
                id: change.doc.id,
                title: change.doc.data().title,
                description: change.doc.data().description,
                status: change.doc.data().status
              })
            }
            if (change.type === "removed") {
              context.commit('DELETE_TASK',change.doc.id)
            }
          });
        });
    },
    getTasks(context) {
      return new Promise((resolve, reject) => {
        if(context.getters.tasks > 0){
          return
        }
        
        context.getters.database
          .collection("tasks")
          .get()
          .then((querySnapshot) => {
            resolve(querySnapshot)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    createTask(context, value) {
      context.getters.database.collection('tasks').add(value)
    },
    editTask({ getters }, value) {

      return new Promise((resolve, reject) => {
        let task = getters.database.collection("tasks").doc(value.id).get()
        task
          .then((doc) => {
            resolve(doc)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateTask({ getters }, value) {

      return new Promise(() => {
        let task = getters.database.collection("tasks").doc(value.id)
        task.update({
          title: value.title,
          description: value.description,
          status: value.status
        })
      })
    },
    updateStatus(context, value) {
      let task = context.getters.database.collection('tasks').doc(value.id)
      task.update({
        status: value.done
      })
    }
  },
  modules: {
  }
})
