<template>
  <div id="app">
    <Edit msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Edit from "./components/Edit.vue";

export default defineComponent({
  name: "App",
  components: {
    Edit,
  },
  setup() {
    return {};
  },
});
</script>

<style>
#app {
  height: 100vh;
}
</style>
