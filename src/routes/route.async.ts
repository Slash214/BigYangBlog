import { RouteRecordRaw } from "vue-router";

const RouteAsync: Array<RouteRecordRaw> = [
	{
		path: '/',
		meta: { title: 'BigYang博客', footer: true, header: true },
		component: () => import('views/home/index.vue')
	},
	{
		path: '/article/:id',
		meta: { title: '文章详情', footer: true, header: true },
		component: () => import('views/details/index.vue')
	},
	{
		path: '/about',
		meta: { title: '关于博客项目', footer: true, header: true },
		component: () => import('views/about/index.vue')
	},
	{
		path: '/admin',
		meta: { title: '管理员操作面板', footer: false, header: false },
		component: () => import('views/admin/index.vue')
	}
]

export default RouteAsync