<script>
import { computed, defineComponent, ref } from "vue";
import { pick } from "lodash-es";

export default defineComponent({
  name: "EditWrapper",
  props: {
    id: String,
    active: Boolean,
    props: Object,
  },
  //TODO为什么要接受一个id属性，而不是直接在for循环中使用item的id属性
  emits: ["set-active"],
  setup(props, { emit }) {
    const style = computed(() =>
      pick(props.props, ["top", "left", "width", "height"]),
    );
    const handleClick = () => {
      console.log("-------------");

      emit("set-active", props.id);
    };
    const start = {
      x: 0,
      y: 0,
    };
    const wrapper = ref(null);
    const handleMouseDown = (e) => {
      console.log(wrapper.value);

      e.stopPropagation();
      const parentWidth = wrapper.value.parentElement.offsetWidth;
      const parentHeight = wrapper.value.parentElement.offsetHeight;
      const wrapperWidth = wrapper.value.offsetWidth;
      const wrapperHeight = wrapper.value.offsetHeight;

      const maxLeft = parentWidth - wrapperWidth;
      const maxTop = parentHeight - wrapperHeight;

      start.x = e.clientX;
      start.y = e.clientY;
      // 记录props中top与left
      let startLeft = parseFloat(props.props.left) || 0;
      let startTop = parseFloat(props.props.top) || 0;

      const handleMouseMove = (e) => {
        const move = {
          x: e.clientX - start.x,
          y: e.clientY - start.y,
        };
        console.log(move);
        let newTop = move.y + startTop;
        let newLeft = move.x + startLeft;
        const newTopLimit = Math.max(0, Math.min(newTop, maxTop));
        const newLeftLimit = Math.max(0, Math.min(newLeft, maxLeft));
        if (newLeft !== newLeftLimit) {
          startLeft = newLeftLimit;
          start.x = e.clientX;
        }
        if (newTop !== newTopLimit) {
          startTop = newTopLimit;
          start.y = e.clientY;
        }
        props.props.top = `${newTopLimit}px`;
        props.props.left = `${newLeftLimit}px`;
      };
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    return {
      handleClick,
      style,
      handleMouseDown,
      wrapper,
    };
  },
});
</script>

<template>
  <div
    ref="wrapper"
    class="edit-wrapper"
    :class="{ active: active }"
    @click="handleClick"
    :style="style"
    @mousedown="handleMouseDown"
  >
    <slot></slot>
    <div class="resizers">
      <div class="resizer top-left"></div>
      <div class="resizer top-right"></div>
      <div class="resizer bottom-left"></div>
      <div class="resizer bottom-right"></div>
    </div>
  </div>
</template>

<style scoped>
.edit-wrapper > :not(.resizers) {
  pointer-events: none !important;
}
.edit-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
  box-sizing: content-box !important;
  position: absolute;
  width: max-content;
}
.edit-wrapper > * {
  position: static !important;
}
.edit-wrapper:hover {
  border: 1px dashed #ccc;
}
.edit-wrapper.hidden {
  display: none;
}
.edit-wrapper.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}
.edit-wrapper .resizers {
  display: none;
}
.edit-wrapper.active .resizers {
  display: block;
}
.edit-wrapper.active .resizers .resizer {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #1890ff;
  position: absolute;
}
.edit-wrapper .resizers .resizer.top-left {
  left: -5px;
  top: -5px;
  cursor: nwse-resize;
}
.edit-wrapper .resizers .resizer.top-right {
  right: -5px;
  top: -5px;
  cursor: nesw-resize !important;
}
.edit-wrapper .resizers .resizer.bottom-left {
  left: -5px;
  bottom: -5px;
  cursor: nesw-resize !important;
}
.edit-wrapper .resizers .resizer.bottom-right {
  right: -5px;
  bottom: -5px;
  cursor: nwse-resize !important;
}
</style>
