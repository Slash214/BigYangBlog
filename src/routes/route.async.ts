import { RouteRecordRaw } from "vue-router";

const RouteAsync: Array<RouteRecordRaw> = [
	{
		path: '/',
		meta: { title: 'BigYang博客' },
		component: () => import('views/home/index.vue')
	},
	{
		path: '/article/:id',
		meta: { title: '文章详情' },
		component: () => import('views/details/index.vue')
	},
	{
		path: '/about',
		meta: { title: '关于博客项目' },
		component: () => import('views/about/index.vue')
	}
]

export default RouteAsync