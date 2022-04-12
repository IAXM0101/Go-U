import Vue from 'vue';
import store from '@/vuex/store';
import qs from "Qs";

export default {
    state: () => ({
        cartList: [],
        orderInfo: {},
    }),
    getters: {
        cartCount(state, getters) {
            return state.cartList.length > 0 ? state.cartList.length : 0
        }
    },
    mutations: {
        mutation_get_cartList(state, payload) {
            state.cartList = payload.cartList;

            sessionStorage.setItem(
                "cartList",
                JSON.stringify(state.cartList)
            );
        },
        addCartList(state, payload) {
            state.cartList.push(payload.params);

            sessionStorage.setItem(
                "cartList",
                JSON.stringify(state.cartList)
            );
        },
        updateOrderInfo(state, payload) {
            state.orderInfo = payload.orderInfo;
        },
        removeCartList(state, payload) {
            state.cartList = [];

            sessionStorage.removeItem("cartList");
        },
    },
    actions: {
        get_cartList({ commit, state }, payload) {
            Vue.axios
                .post(
                    store.state.serverAPI.getCart,
                    qs.stringify({
                        token: payload.token
                    })
                )
                .then(function (res) {
                    commit({
                        type: "mutation_get_cartList",
                        cartList: res.data,
                    });
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    },
}