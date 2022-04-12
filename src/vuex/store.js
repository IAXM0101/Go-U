import Vue from 'vue';
import Vuex from 'vuex';

import serverAPI from './serverAPI';
import userModule from './userModule';
import cartModule from './cartModule';
import chatModule from './chatModule';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        serverAPI, userModule, cartModule, chatModule
    }
});

export default store;