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
    },
    mutations: {
        mutation_get_chatList(state, payload) {
            state.chatList = payload.chatList
            state.currentChat = payload.chatList[0]
        },
        updateCurrentChat(state, payload) {
            state.currentChat = payload.currentChat
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