export default {
	// namespaced: true,
	state: () => ({
		isLogin: false,
		userID: null,	// ID
		account: null,	// 账号
		password: null, // 密码
		nick: null, 	// 昵称
		avatar: null,	// 头像
		phone: null,	// 手机号码
		email: null,	// 邮箱地址
		address: [],	// 收货地址
	}),
	getters: {
		getUserID(state, getters) {
			return state.userID
		}
	},
	mutations: {
		addAllInfo(state, payload) {
			state.isLogin = true;

			for (const key in payload.userInfo) {
				if (Object.hasOwnProperty.call(payload.userInfo, key)) {
					state[key] = payload.userInfo[key];
				}
			}

			sessionStorage.setItem("isLogin", "true");
			sessionStorage.setItem(
				"userInfo",
				JSON.stringify(payload.userInfo)
			);
		},
		removeUserInfo(state) {
			for (const key in state) {
				if (Object.hasOwnProperty.call(state, key)) {
					if (key === "isLogin") {
						state[key] = false;
					} else {
						state[key] = null;
					}
				}
			}

			sessionStorage.removeItem("isLogin");
			sessionStorage.removeItem("userInfo");
		},
	}
}