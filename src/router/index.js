import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateTask from '../views/CreateTask'
import Tasks from '../views/Tasks'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/new',
    name: 'CreateTask',
    component: CreateTask
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
