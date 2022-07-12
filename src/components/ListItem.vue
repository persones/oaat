<template>
  <div draggable="true" class="item" @dragstart="dragStart" @dragend="dragEnd">
    <div v-if="typeof item == 'object'">
      <div v-if="item  == currentItem">
        <button @click="toggleItemType" v-html="currentItem.type"></button>
        <button @click="rename">rename</button>
      </div>
      <div class="list-title" @click="setCurrentItem(item)">{{ item.name }}</div>
      <div :class="item.type" class="item-list-container">
        <div class="child-container" v-for="(child, idx) in childrenToShow" :key="idx">
          <div class="buttons">
            <div v-if="item.items.length > 0" class="item-button" @click="deleteChild(item.id, idx)">x</div>
            <div v-if="(item.type=='serial') && (idx > 0)" class="item-button" @click="childUp(idx)">&uarr;</div>
            <div v-if="(item.type=='serial') && (idx < item.items.length - 1)" class="item-button" @click="childDown(idx)">&darr;</div>
          </div>
          <div v-if="typeof child == 'string'" class="item-header"><em>{{ child }}</em></div>      
          <ListItem v-else :item="child" :childIndex="idx" />
        </div>
        <div class="child-container">
          <div class="buttons"></div>
          <div contenteditable="true" class="new-item" @input="newItemNameEntered" @click="newItemEntered" @keypress="keyPressedOnNewItem">+</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: "ListItem",
  props: {
    item: null,
    childIndex: null
  },
  computed: {
    ...mapState(['viewMode', 'currentItem']),
    isList() {
      return ((typeof this.item == "object") && ('items' in this.item))
    },
    childrenToShow() {
      return (this.viewMode == 'all' || this.item.type == 'parallel') ? this.item.items : [this.item.items[0]];
    },
  },
  methods: {
    ...mapMutations(['setCurrentItem', 'updateCurrentItem', 'deleteChild', 'updateItem']),
    toggleItemType() {
      this.item.type = (this.currentItem.type == 'serial' ? 'parallel' : 'serial');
      this.updateItem(this.item);
    },
    newItemEntered(ev) {
      ev.target.innerHTML = "";
    },
    keyPressedOnNewItem(ev) {
      let key = ev.which || ev.keyCode;
      console.log(key);
      if (key === 13) { // 13 is enter
        this.item.items.push({
          name: ev.target.innerHTML,
          type: 'serial',
          items: []
        });
        ev.target.blur();
        ev.target.innerHTML = '+';
      }
      
      this.updateItem(this.item);
    },
    rename() {
      let newName = window.prompt('item name:');
      if (newName) {
        this.item.name = newName;
      }
      this.updateItem(this.item);
    },
    childUp(idx) {
      this.item.items.splice(idx - 1, 2, this.item.items[idx], this.item.items[idx - 1]);
      this.updateItem(this.item);
    },
    childDown(idx) {
      this.item.items.splice(idx, 2, this.item.items[idx + 1], this.item.items[idx]); 
      this.updateItem(this.item);
    }
  }
};
</script>

<style>
  .item {
    margin: 0 0.5em;
    text-align: left;
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
  }

  .item-button {
    width: 1em;
    height: 1em;
    font-size: 1em;
    color: black;
    background: white;
    margin: .2em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .child-container {
    display: flex;
    font-size: 0.8em;
  }
  .item-header {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .item-list-container {
    display: flex;
  }

  .list-title {
    border-bottom: 1px solid black;
  }

  .parallel {
    flex-direction: row;
    
  }

  .serial {
    flex-direction: column;
    align-items: flex-start;
  }
  .new-item {
    opacity: 0.5;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    width:3em;
    font-size: 0.7em;
  }

</style>