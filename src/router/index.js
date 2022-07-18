import { createRouter, createWebHashHistory } from 'vue-router'
import { useConfigStore } from "@/pinia/modules/config.js";

const routes = [
    {
        path: '/',
        name: 'Index',
        meta: {
            header: true,
            footer: false,
            title: '首页'
        },
        component: () => import('@/view/index.vue')
    },
    {
        path: '/third/:id?',
        name: 'Third',
        meta: {
            header: true,
            footer: true,
            title: 'third'
        },
        component: () => import('@/view/third.vue')
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            header: false,
            footer: false,
            title: '登录'
        },
        component: () => import('@/view/login.vue')
    },
    {
        path: '/:catchAll(.*)', meta: {
            header: false,
            footer: false,
        }, name: '404', component: () => import("@/view/404.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const store = useConfigStore();
    const { title = '官方网站', header = true, footer = true, auth = false } = to.meta;
    document.title = title;
    store.updateHeaderShow(header)
    store.updateFooterShow(footer)
    next()
})
export default router
