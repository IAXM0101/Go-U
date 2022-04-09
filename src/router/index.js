import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '@/pages/Home'
import Enter from '@/pages/Enter'
import Login from '@/components/enter/Login'
import Register from '@/components/enter/Register'
import Search from '@/pages/Search'
import Goods from '@/pages/Goods'
import Cart from '@/pages/Cart'
import Chat from '@/pages/Chat'
import User from '@/pages/User'
import UserInfo from '@/components/user/UserInfo'
import UserBind from '@/components/user/UserBind'
import UserPassword from '@/components/user/UserPassword'
import UserAddress from '@/components/user/UserAddress'
import Order from '@/pages/Order'

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/enter',
			name: 'enter',
			component: Enter,
			children: [
				{
					path: 'login',
					name: 'login',
					alias: '/login',
					component: Login
				}, {
					path: 'register',
					name: 'register',
					alias: '/register',
					component: Register
				},
			]
		},
		{
			path: '/search',
			name: 'search',
			component: Search
		},
		{
			path: '/goods',
			name: 'goods',
			component: Goods
		},
		{
			path: '/cart',
			name: 'cart',
			component: Cart,
			meta: {
				requiresAuth: true
			},
		},
		{
			path: '/chat',
			name: 'chat',
			component: Chat,
			meta: {
				requiresAuth: true
			},
		},
		{
			path: '/user',
			name: 'user',
			component: User,
			meta: {
				requiresAuth: true
			},
			children: [
				{
					path: 'userInfo',
					name: 'userInfo',
					alias: '/userInfo',
					component: UserInfo
				},
				{
					path: 'userBind',
					name: 'userBind',
					alias: '/userBind', 
					component: UserBind
				},
				{
					path: 'userPassword',
					name: 'userPassword',
					alias: '/userPassword',
					component: UserPassword
				},
				{
					path: 'userAddress',
					name: 'userAddress',
					alias: '/userAddress',
					component: UserAddress
				},
			]
		},
		{
			path: '/order',
			name: 'order',
			component: Order
		},
	]
});


router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (sessionStorage.getItem("token")) {
			next();
		} else {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		}
	} else {
		next();
	}
});

export default router;