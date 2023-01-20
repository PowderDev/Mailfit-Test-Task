import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Task from "../views/Task/index.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/:id", component: Task },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
