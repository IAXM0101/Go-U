export default {
    state: () => ({
        cartList: [],
        orderInfo: {},
    }),
    getters: {
        cartLength(state, getters) {
            return state.cartList.length > 0 ? state.cartList.length : 0
        }
    },
    mutations: {
        updateCartList(state, payload) {
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
    }
}