import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

export const routes = [
    {
        path: '/:pathMatch(.*)*',
        redirect: 'products'
    },
    {
        path: '/auth',
        name: 'auth',
        component: async () => (await import('@/pages/auth/index')).Auth
    },
    {
        path: '/products',
        name: 'products',
        component: async () => (await import('@/pages/products/index')).Products,
        meta: {
            requires_auth: true
        }
    }
]

export const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to) => {
    const is_logged_in = store.getters['auth/is_logged_in']
    if (is_logged_in && to.name === 'auth') {
        return { name: 'products' }
    } else if (to.meta.requires_auth && !is_logged_in) {
        return { name: 'auth' }
    }
})
