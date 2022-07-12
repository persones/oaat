import { createApp, markRaw } from 'vue'
import App from './App.vue'
import store from './store'
import { v4 as uuidv4 } from 'uuid';

var nodeDict = {};
function mapNode(node) {
  if (typeof node == 'string') { return };
  if (!('id' in node)) {
    node.id = uuidv4();
  }1
  
  nodeDict[node.id] = node;
  console.log(node);
  if ('items' in node) {
    node.items.map(item => {mapNode(item)});
  }
}

fetch('/data').then(res => {
  console.log(res);
  res.json().then(data => {
    console.log(data);
    mapNode(data[0]);
    store.state.data = markRaw(data);
    store.state.nodeDict = nodeDict;  
    store.state.currentItem = data[0];
    createApp(App).use(store).mount('#app')
  });
});
/*import data from./assets/oaat.jsonon'
store.state.data = data;
/store.state.currentItem = data[0];*/
