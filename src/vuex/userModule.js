import Vue from 'vue'
import qs from "Qs";

export default {
	state: () => ({
		token: null,
		userInfo: {
			userID: null,	// ID
			account: null,	// 账号
			nick: null, 	// 昵称
			avatar: null,	// 头像
			phone: null,	// 手机号码
			email: null,	// 邮箱地址
			address: [],	// 收货地址
		}
	}),
	getters: {
		isLogin(state, getters) {
			return state.token ? true : false
		},
		getUserID(state, getters) {
			return state.userInfo.userID
		},
		getAvatar(state, getters) {
			return state.userInfo.avatar ? state.userInfo.avatar : "https://tse1-mm.cn.bing.net/th/id/OIP-C.JPaFw0vH2f6Qy44aUfZ4jgAAAA?pid=ImgDet&rs=1"
		}
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
		removeUserInfo(state) {
			for (const key in state) {
				if (Object.hasOwnProperty.call(state, key)) {
					state[key] = null;
				}
			}

			sessionStorage.removeItem("token");
			sessionStorage.removeItem("userInfo");
		},
	},
	actions: {
		SEND_LOGIN({ commit, state }, payload) {
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

		}
	}
}