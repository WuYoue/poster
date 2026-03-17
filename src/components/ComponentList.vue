<script>
import { defineComponent } from "vue";
import LText from "./LText.vue";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: "ComponentList",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  components: {
    LText,
  },
  emits: ["selectComponent"],
  setup(props, { emit }) {
    const selectComponent = (item) => {
      const component = { id: uuidv4(), name: "l-text", props: item };
      console.log(component);

      emit("selectComponent", component);
    };
    return {
      selectComponent,
    };
  },
});
</script>

<template>
  <div class="component-list">
    <div
      class="component-item"
      v-for="item in list"
      @click="selectComponent(item)"
    >
      <!-- TODO为什么要在外层加div，并且在div上添加click -->
      <LText v-bind="item" />
    </div>
  </div>
</template>

<style scoped>
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
.component-item > * {
  position: static !important;
}
</style>
