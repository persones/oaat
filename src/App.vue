<template>
  <div>
    <div>OAAT</div>
    <div v-if="currentItem">
      <div class="nav">
        <button @click="setCurrentItem(data[0])">home</button>
        <button @click="toggleViewMode" v-html="viewMode"></button>
      </div>
      <ListItem :item="currentItem" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import ListItem from "./components/ListItem.vue";

export default {
  name: "app",
  components: {
    ListItem 
  },
  computed: {
    ...mapState(['currentItem', 'data', 'viewMode']),
  },
  watch: {
    data() {
      this.writeData();
    },
  },
  methods: {
    ...mapMutations([
      'setCurrentItem', 
      'toggleViewMode', 
      'writeData']),
    
  }
}
</script>

<style>
  body {
    font-size: 70px;
    font-family: sans-serif;
    background: black;
    color: white;
  }
</style>
