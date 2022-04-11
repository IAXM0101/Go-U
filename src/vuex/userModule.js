import Vue from 'vue'
import store from '@/vuex/store'
import qs from "Qs";

export default {
	state: () => ({
		token: null,
		userInfo: {
			userID: null,	// ID
			account: null,	// 账号
			nick: null, 	// 昵称
			avatar: null,	// 头像
			sex: null,		// 性别
			birthday: null,	// 生日
			phone: null,	// 手机号码
			email: null,	// 邮箱地址
			address: [],	// 收货地址
		},
		addrList: []// 收货地址
	}),
	getters: {
		isLogin(state, getters) {
			return state.token ? true : false
		},
		getUserInfo(state, getters) {
			return state.userInfo
		},
		getUserID(state, getters) {
			return state.userInfo.userID
		},
		getAvatar(state, getters) {
			return state.userInfo.avatar ? state.userInfo.avatar : "https://tse1-mm.cn.bing.net/th/id/OIP-C.JPaFw0vH2f6Qy44aUfZ4jgAAAA?pid=ImgDet&rs=1"
		},
		getAddrList(state, getters) {
			return state.addrList
		},
		getDefaultAddr(state, getters) {
			return state.addrList.findIndex(value => value.isDefault == "true")
		},
	},
	mutations: {
		addAllInfo(state, payload) {
			state.token = payload.token
			state.userInfo = payload.userInfo

			sessionStorage.setItem("token", state.token);
			sessionStorage.setItem(
				"userInfo",
				JSON.stringify(state.userInfo)
			);
		},
		update_userInfo(state, payload) {
			for (const key in payload) {
				if (Object.hasOwnProperty.call(payload, key)) {
					state.userInfo[key] = payload[key];
				}
			}
			sessionStorage.setItem(
				"userInfo",
				JSON.stringify(state.userInfo)
			);
		},
		removeUserInfo(state) {
			for (const key in state) {
				if (Object.hasOwnProperty.call(state, key)) {
					state[key] = null;
				}
			}
			sessionStorage.removeItem("token");
			sessionStorage.removeItem("userInfo");
		},
		update_addrList(state, payload) {
			state.addrList = payload;
		},
		update_addr(state, payload) {
			state.addrList.push(payload);
		},
	},
	actions: {
		send_login({ commit, state }, payload) {
			return new Promise((resolve, reject) => {
				Vue.axios
					.post(
						payload.api,
						qs.stringify(payload.data)
					)
					.then(function (res) {
						commit("addAllInfo", {
							token: res.data.token,
							userInfo: res.data.userInfo
						});
						resolve(res.data)
					})
					.catch(function (err) {
						reject(err)
					});
			})

		},
		modify_userInfo({ commit, state }, payload) {
			Vue.axios
				.post(
					store.state.serverAPI.modifyInfo,
					qs.stringify({
						token: state.token,
						data: JSON.stringify(payload)
					})
				)
				.then(function (res) {
					if (res.data.state) {
						commit("update_userInfo", payload);
					}
				})
				.catch(function (err) {
					console.log(err);
				});
		},
		modify_password({ commit, state }, payload) {
			return new Promise((resolve, reject) => {
				Vue.axios
					.post(
						store.state.serverAPI.modifyPsw,
						qs.stringify({
							token: state.token,
							password: payload
						})
					)
					.then(function (res) {
						if (res.data.state) {
							resolve();
						}
					})
					.catch(function (err) {
						reject(err);
					});
			})
		},
		get_addrList({ commit, state }) {
			Vue.axios
				.post(
					store.state.serverAPI.getAddrList,
					qs.stringify({
						token: state.token,
					})
				)
				.then(function (res) {
					if (res.data.state) {
						commit("update_addrList", res.data.result);
					}
				})
				.catch(function (err) {
					console.log(err);
				});
		},
		add_addr({ commit, state }, payload) {
			return new Promise((resolve,reject) => {
				Vue.axios
					.post(
						store.state.serverAPI.addAddr,
						qs.stringify({
							token: state.token,
							isDefault: payload.isDefault,
							name: payload.name,
							region: payload.region,
							addr: payload.addr,
							phone: payload.phone,
							email: payload.email,
							nickAddr: payload.nickAddr,
						})
					)
					.then(function (res) {
						if (res.data.state) {
							commit("update_addr", payload);
							resolve();
						}
					})
					.catch(function (err) {
						reject(err);
					});
			})
		}
	}
}