import { createRouter, createWebHistory } from 'vue-router'

var routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
]

// Calculus 3 Section 9.7
const calc_3_s9_7 = await import('../views/calc-3/s9_7/routes')
routes = routes.concat(calc_3_s9_7.default)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
