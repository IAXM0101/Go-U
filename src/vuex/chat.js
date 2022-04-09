export default {
    state: () => ({
        wsip: null,
        currentChat: null,
        chatList: []
    }),
    getters: {
        chatLength(state, getters) {
            return state.chatList.length > 0 ? state.chatList.length : 0
        },
        getTalker(state, getters) {
            if (state.currentChat) {
                let talker;
                if (getters.getUserID === state.currentChat.talker1) {
                    talker = state.currentChat.talker2
                } else {
                    talker = state.currentChat.talker1
                }
                return talker
            }
        },
    },
    mutations: {
        updateChatList(state, payload) {
            state.chatList = payload.chatList
            state.currentChat = payload.chatList[0]
        },
        updateCurrentChat(state, payload) {
            state.currentChat = payload.currentChat
        }
    }
}