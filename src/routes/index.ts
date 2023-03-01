/**
 * @description 路由配置
 * @author 爱呵呵
 */

import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'
import NProgress from '@/utils/nprogress'
import System from '@/routes/system'
import RouteAsync from '@/routes/route.async'

const routes: Array<RouteRecordRaw> = [
	...System,
	...RouteAsync,
]

const router: Router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

/**
 * @descrion 如果你需要添加token 可以在 beforeEach去判断token 控制路由
 */
router.beforeEach((to, _from, next) => {
	NProgress.start()
	document.title = (to.meta.title as string) || import.meta.env.BASE_URL
	next()
})

router.afterEach((to, from) => {
    document.body.scrollTop = 0
	document.documentElement.scrollTop = 0
    NProgress.done()
})

export default router