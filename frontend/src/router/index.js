import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/users',
            name: 'users',
            component: () => import('../components/Users.vue')
        },
        {
            path: '/users/:id',
            name: 'user',
            component: () => import('../components/User.vue')
        },
        {
            path: '/documents',
            name: 'documents',
            component: () => import('../components/Documents.vue')
        }
    ]
})

export default router
