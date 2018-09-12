
export default {
  namespaced: true,
  state: {
    sock: {}
  },
  getters: {
  },
  actions: {
    startSocket({ commit }, obj) {
      // let lockReconnect = false;
      // reconnect = function(url) {
      //   if (!lockReconnect) {
      //     lockReconnect = true;
      //     setTimeout
      //   }
      // }
      let createWebSocket = function(url) {
        let ws = null;
        // try {
        //   ws = new WebSocket(url);
        // } catch (e) {
        //   ws = reconnect(url);
        // }
        ws = new WebSocket(url);
        return ws;
      };
      let sock = createWebSocket('ws://10.40.138.154:9080/customer_care/websocket');


      // let sock = new SockJS('ws://10.40.138.154:9080/customer_care/websocket');
      sock.onopen = function() {
        window.$logger.log('open');
        sock.send('test');
      };
       
      sock.onmessage = function(e) {
        window.$logger.log('message', e.data);
        sock.close();
      };
       
      sock.onclose = function() {
        window.$logger.log('close');
      };
      commit("REGIST_WEBSOCKET", sock);
    },
    stopSocket({ commit }, obj) {
      
    }
  },
  mutations: {
    REGIST_WEBSOCKET(state, payload) {
      state.sock = payload;
    }
  }
};
