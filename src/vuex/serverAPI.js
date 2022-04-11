const serverIp = 'http://localhost:6100';

export default {
    state: () => ({
        login: serverIp + '/login.do',
        register: serverIp + '/register.do',
        modifyInfo: serverIp + '/modifyInfo.do',
        modifyPsw: serverIp + '/modifyPsw.do',
        getAddrList: serverIp + '/getAddrList.do',
        addAddr: serverIp + '/addAddr.do',
        editAddr: serverIp + '/editAddr.do',
        editDefaultAddr: serverIp + '/editDefaultAddr.do',
        delAddr: serverIp + '/delAddr.do',
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