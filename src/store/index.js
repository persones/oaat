import { createStore } from 'vuex';



export default createStore({
  state: {
    data: Object,
    currentItem: Object,
    viewMode: 'all'
  },
  getters: {
  },
  mutations: {
    setCurrentItem(state, item) {
      state.currentItem = item
    },
    toggleViewMode(state) {
      state.viewMode = ((state.viewMode == 'all' ? 'top' : 'all'));
    },
    addChildToCurrentItem(state, child) {
      state.currentItem.push(child);
    },
    setCurrentItemType(state, type) {
      state.currentItem.type = type;
    },
    updateCurrentItem(state, item) {
      Object.assign(state.currentItem, item)
      state.writeData(state, state.data);
    },
    updateItem(state, item) {
      console.log('updating')
      state.nodeDict[item.id]= item;
      this.commit("writeData");
    },
    writeData(state) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state.data)
      };
      fetch("/data", requestOptions)
        .then(response => response.text())
        .then(data => console.log);
    },
    deleteChild(state, id, idx) {
      state.nodeDict[id].items.splice(idx, 1);
      delete state.nodeDict[id];
      this.commit("writeData");
      
    }
  },
  actions: {
  },
  modules: {
  }
})
