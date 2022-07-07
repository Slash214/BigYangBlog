import { RouteRecordRaw } from "vue-router";

const System: Array<RouteRecordRaw> = [
	{
		path: '/404',
		meta: { title: 'Ops！页面不存在', footer: false },
		component: () => import('views/system/404.vue')
	},
	{
		path: '/:pathMatch(.*)',
		redirect: '/404',
	}
]

export default System