import { createRouter, createWebHashHistory } from 'vue-router'

export const routes = [
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    },
    {
        path: '/auth',
        name: 'auth',
        component: async () => (await import('@/pages/auth/index')).Auth
    },
    {
        path: '/products',
        name: 'products',
        component: async () => (await import('@/pages/products/index')).Products
    }

]

export const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

// router.beforeEach(async (to) => {
//     if (isLoggedIn.value && to.name === 'auth') {
//         return { name: 'main-page' }
//     } else if (to.meta.requiresAuth && !isLoggedIn.value) {
//         return { name: 'auth' }
//     }
// })
