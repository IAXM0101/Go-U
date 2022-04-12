import Vue from 'vue';
import store from '@/vuex/store';
import qs from "Qs";

export default {
    state: () => ({
        wsip: null,
        currentChat: null,
        chatList: []
    }),
    getters: {
        chatCount(state, getters) {
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
        getChatAvatar(state, getters) {
            if (state.currentChat) {
                let avatar;
                if (getters.getUserID === state.currentChat.talker1) {
                    avatar = state.currentChat.avatar2
                } else {
                    avatar = state.currentChat.avatar1
                }
                return avatar
            }
        },
    },
    mutations: {
        mutation_get_chatList(state, payload) {
            state.chatList = payload.chatList
            state.currentChat = payload.chatList[0]
        },
        mutation_check_chatTarget(state, payload) {
            state.currentChat = payload
        }
    },
    actions: {
        get_chatList({ commit, state }, payload) {
            return new Promise((resolve, reject) => {
                Vue.axios
                    .post(
                        store.state.serverAPI.chat,
                        qs.stringify({
                            token: store.state.userModule.token,
                        })
                    )
                    .then(function (res) {
                        commit({
                            type: "mutation_get_chatList",
                            chatList: res.data.result.chatList,
                        });
                        resolve(res.data.result)
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            })

        }
    }
}