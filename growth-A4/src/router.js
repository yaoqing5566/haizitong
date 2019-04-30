import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Layout from './components/Layout.vue'
export default new Router({
    //mode: 'history',
    //base: process.env.BASE_URL,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            console.log("后退")
            return savedPosition
        } else {
            console.log("前进")
            return {x: 0, y: 0}
        }
    },
    routes: [
        {
            path: '/',
            redirect: '/preview'
        },
        {
            path: '/preview',
            redirect: '/preview/index',
            component: Layout,
            meta: {title: '成长档案'},
            children: [
                {
                    path: 'index',
                    name: '成长档案预览',
                    component: () => import('@/views/preview/index.vue'),
                },
                {
                    path: 'pageA4',
                    name: '成长档案打印',
                    component: () => import('@/views/preview/pageA4.vue'),
                }
            ]
        },
        {
            path: '/404',
            meta: {title: '404'},
            name: '404',
            component: () => import('@/views/404.vue'),
        },
        {
            path: '*',
            redirect: '/404'
        }


    ]
})
