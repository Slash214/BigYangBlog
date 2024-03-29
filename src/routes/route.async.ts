import { RouteRecordRaw } from "vue-router";

const RouteAsync: Array<RouteRecordRaw> = [
	{
		path: '/',
		meta: { title: '小杨博客', footer: true, header: true, keepAlive: true },
		component: () => import('views/home/index.vue')
	},
	{
		path: '/article/:id',
		meta: { title: '博客-文章详情', footer: true, header: true },
		component: () => import('views/details/index.vue')
	},
	{
		path: '/about',
		meta: { title: '关于博客项目', footer: true, header: true },
		component: () => import('views/about/index.vue')
	},
	{
		path: '/admin/:id',
		meta: { title: '管理员操作面板', footer: false, header: false },
		component: () => import('views/admin/index.vue')
	},
	{
		path: '/tag',
		meta: { title: '博客网站标签管理', footer: false, header: true },
		component: () => import('views/tag/index.vue')
	},
	{
		path: '/laboratory',
		meta: { title: '实验室', footer: true, header: true },
		component: () => import('views/laboratory/index.vue')
	}
]

export default RouteAsync