<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "LayerList",
  props: {
    list: {
      type: Array,
      required: true,
    },
    activeComponentId: {
      type: String,
      required: true,
    },
  },
  emits: ["changeActive", "changeLock", "changeHidden"],
  setup(props, { emit }) {
    const changeActive = (id) => {
      emit("changeActive", id);
    };
    const changeLock = (id) => {
      emit("changeLock", id);
    };
    const changeHidden = (id) => {
      emit("changeHidden", id);
    };
    const onDrop = (e) => {
      console.log(e);
      // e.preventDefault();
      // const data = e.dataTransfer.getData("text/plain");
      // if (data) {
      //   emit("changeActive", data);
      // }
    };
    // TODO为什么要添加这个方法，才能实现拖拽功能
    const onDragOver = (e) => {
      e.preventDefault();
    };
    return {
      changeActive,
      changeLock,
      changeHidden,
      onDrop,
      onDragOver,
    };
  },
});
</script>

<template>
  <div>
    <div
      :class="{ active: item.id === activeComponentId }"
      v-for="item in list"
      :key="item.id"
      class="layer-item"
      @click="changeActive(item.id)"
      draggable="true"
      @drop="onDrop"
      @dragover="onDragOver"
    >
      {{ item.layerName ?? "未命名图层" }}
      <div class="layer-icon">
        <a-tooltip :title="item.isLocked ? '解锁图层' : '锁定图层'">
          <img
            class="lock-icon"
            @click="changeLock(item.id)"
            :src="
              item.isLocked
                ? require('@/assets/icon/electronic-locks-close.svg')
                : require('@/assets/icon/electronic-locks-open.svg')
            "
          />
        </a-tooltip>
        <a-tooltip :title="item.isHidden ? '显示' : '隐藏'">
          <img
            class="eye-icon"
            @click="changeHidden(item.id)"
            :src="
              item.isHidden
                ? require('@/assets/icon/preview-close.svg')
                : require('@/assets/icon/preview-open.svg')
            "
          />
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 8px;
}

.layer-item:not(.active):hover {
  background-color: #f5f5f5;
}
.active {
  border: 1px solid #1890ff;
  background-color: #e5f4ff;
}
.layer-icon {
  display: flex;
  align-items: center;
  gap: 8px;
}

.eye-icon {
  width: 18px;
  height: 18px;
}
.lock-icon {
  width: 18px;
  height: 18px;
}
</style>
