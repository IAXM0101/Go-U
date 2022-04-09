const serverIp = 'http://localhost:6100';

export default {
    state: () => ({
        login: serverIp + '/login.do',
        register: serverIp + '/register.do',
        modifyInfo: serverIp + '/modifyInfo.do',
        chat: serverIp + '/chat.do',
        getAllGoods: serverIp + '/getAllGoods.do',
        searchGoods: serverIp + '/searchGoods.do',
        getGoods: serverIp + '/getGoods.do',
        getCart: serverIp + '/getCart.do',
        addCart: serverIp + '/addCart.do',
        modifyCart: serverIp + '/modifyCart.do',
        deleteCart: serverIp + '/deleteCart.do',
        createOrder: serverIp + '/createOrder.do',
    })
}