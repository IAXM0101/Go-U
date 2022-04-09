import Vue from 'vue';
import Vuex from 'vuex';

import serverAPI from './serverAPI';
import userModule from './userModule';
import cartModule from './cartModule';
import chat from './chat';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        serverAPI, userModule, cartModule, chat
    }
});

export default store;