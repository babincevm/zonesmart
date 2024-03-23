import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    },
    {
        path: '/auth',
        name: 'auth',
        component: async () => (await import('@/pages/auth/index')).Auth
    }
    // {
    //     path: '/',
    //     name: 'main-page',
    //     component: async () => (await import('@/pages/main')).Main,
    //     meta: {
    //         icon: 'main-page',
    //         mobileIcon: 'home',
    //         mobileIconActive: 'home-filled',
    //         showInDesktopNav: true,
    //         showInMobileNav: true,
    //         navName: 'Главная',
    //         requiresAuth: true
    //     } as RouteMeta
    // },

]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// router.beforeEach(async (to) => {
//     if (isLoggedIn.value && to.name === 'auth') {
//         return { name: 'main-page' }
//     } else if (to.meta.requiresAuth && !isLoggedIn.value) {
//         return { name: 'auth' }
//     }
// })
