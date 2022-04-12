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
        mutation_add_cartItem(state, payload) {
            state.cartList.push(payload.params);

            sessionStorage.setItem(
                "cartList",
                JSON.stringify(state.cartList)
            );
        },
        mutation_modify_check_cartItem(state, payload) {
            if (payload.type === "single") {
                state.cartList[payload.index].isCheck = payload.isCheck
            } else {
                state.cartList.forEach(value => {
                    value.isCheck = payload.isCheck;
                });
            }

            sessionStorage.setItem(
                "cartList",
                JSON.stringify(state.cartList)
            );
        },
        mutation_del_cartItem(state, payload) {
            state.cartList.splice(payload.index, 1);

            sessionStorage.setItem(
                "cartList",
                JSON.stringify(state.cartList)
            );
        },
        mutation_clear_cartList(state, payload) {
            state.cartList = [];

            sessionStorage.removeItem("cartList");
        },
        mutation_create_orderInfo(state, payload) {
            state.orderInfo = payload.orderInfo;
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
        },
        add_cartItem({ commit, state }, payload) {
            let params = payload.params
            Vue.axios
                .post(store.state.serverAPI.addCart, qs.stringify({
                    token: store.state.userModule.token,
                    params: JSON.stringify(params)
                }))
                .then(function (res) {
                    if (res.data.state) {
                        params.cartID = res.data.result.insertId;
                        commit({
                            type: "mutation_add_cartItem",
                            params,
                        });
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        modify_check_cartItem({ commit, state }, payload) {
            Vue.axios
                .post(store.state.serverAPI.modifyCart, qs.stringify({
                    token: store.state.userModule.token,
                    params: JSON.stringify(payload)
                }))
                .then(function (res) {
                    if (res.data.state === "succeed") {
                        console.log(666);
                        commit("mutation_modify_check_cartItem", payload)
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        del_cartItem({ commit, state }, payload) {
            Vue.axios
                .post(store.state.serverAPI.deleteCart, qs.stringify({
                    token: store.state.userModule.token,
                    params: JSON.stringify(payload.params)
                }))
                .then(function (res) {
                    if (res.data.state === "succeed") {
                        commit({
                            type: "mutation_del_cartItem",
                            index: payload.params.index,
                        })
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    },
}