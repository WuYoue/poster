<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "LayerList",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    return {};
  },
});
</script>

<template>
  <div>
    <div v-for="item in list" :key="item.id" class="layer-item">
      {{ item.layerName ?? "未命名图层" }}
      <img class="lock-icon" src="@/assets/icon/解锁.svg" />
      <img
        class="eye-icon"
        :src="
          item.isHidden ? '@/assets/icon/闭眼睛.svg' : '@/assets/icon/眼睛.svg'
        "
      />
    </div>
  </div>
</template>

<style scoped>
.layer-item {
  display: flex;
  align-items: center;
}
.eye-icon {
  width: 20px;
  height: 20px;
}
.lock-icon {
  width: 20px;
  height: 20px;
}
</style>
