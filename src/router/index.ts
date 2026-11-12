import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Home from '../views/Home.vue'
import Work from '../views/Work.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (_to, _from, savedPosition) => savedPosition ?? { top: 0 },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/work',
      name: 'work',
      component: Work,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
  ],
})

export default router
