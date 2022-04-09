import Vue from 'vue'
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
        UPDATE_CART_LIST(state, payload) {
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
        GET_CART_LIST({ commit, state }, payload) {
            Vue.axios
                .post(
                    payload.api,
                    qs.stringify(payload.data)
                )
                .then(function (res) {
                    commit({
                        type: "UPDATE_CART_LIST",
                        cartList: res.data,
                    });
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    },
}