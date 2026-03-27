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
  emits: ["set-active", "change"],
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
    //TODO每个组件都可以获取一个wrapper元素，不用去获取当前激活的组件
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
      let newTopLimit = 0;
      let newLeftLimit = 0;
      const handleMouseMove = (e) => {
        const move = {
          x: e.clientX - start.x,
          y: e.clientY - start.y,
        };
        console.log(move);
        let newTop = move.y + startTop;
        let newLeft = move.x + startLeft;
        newTopLimit = Math.max(0, Math.min(newTop, maxTop));
        newLeftLimit = Math.max(0, Math.min(newLeft, maxLeft));
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
        emit("change", {
          id: props.id,
          type: "change",
          key: "position",
          data: {
            oldValue: {
              top: startTop + "px",
              left: startLeft + "px",
            },
            newValue: {
              top: newTopLimit + "px",
              left: newLeftLimit + "px",
            },
          },
        });
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };
    const setRightBottomMouseDown = (e) => {
      //TODO添加右侧空气墙限制
      e.stopPropagation();
      console.log(e);
      const start = {
        x: e.clientX,
        y: e.clientY,
      };
      const wrapperWidth = wrapper.value.offsetWidth;
      const wrapperHeight = wrapper.value.offsetHeight;
      let newWidth = wrapperWidth;
      let newHeight = wrapperHeight;

      const setRightBottomMouseMove = (e) => {
        e.stopPropagation();
        const move = {
          x: e.clientX - start.x,
          y: e.clientY - start.y,
        };

        newWidth = Math.max(0, move.x + wrapperWidth);
        newHeight = Math.max(0, move.y + wrapperHeight);

        props.props.width = `${newWidth}px`;
        props.props.height = `${newHeight}px`;
        console.log(move);
      };
      const setRightBottomMouseUp = () => {
        emit("change", {
          id: props.id,
          type: "change",
          key: "position",
          data: {
            oldValue: {
              width: wrapperWidth + "px",
              height: wrapperHeight + "px",
            },
            newValue: {
              width: newWidth + "px",
              height: newHeight + "px",
            },
          },
        });
        document.removeEventListener("mousemove", setRightBottomMouseMove);
        document.removeEventListener("mouseup", setRightBottomMouseUp);
      };
      document.addEventListener("mousemove", setRightBottomMouseMove);
      document.addEventListener("mouseup", setRightBottomMouseUp);
    };

    const setLeftBottomMouseDown = (e) => {
      e.stopPropagation();
      const start = {
        x: e.clientX,
        y: e.clientY,
      };
      const wrapperWidth = wrapper.value.offsetWidth;
      const wrapperHeight = wrapper.value.offsetHeight;
      const wrapperLeft = parseFloat(props.props.left) || 0;
      let newWidth = wrapperWidth;
      let newHeight = wrapperHeight;
      let newLeft = wrapperLeft;

      const setLeftBottomMouseMove = (e) => {
        e.stopPropagation();
        const move = {
          x: e.clientX - start.x,
          y: e.clientY - start.y,
        };

        newWidth = Math.max(0, wrapperWidth - move.x);
        newHeight = Math.max(0, wrapperHeight + move.y);
        newLeft = wrapperLeft + Math.min(wrapperWidth, move.x);
        props.props.width = `${newWidth}px`;
        props.props.height = `${newHeight}px`;
        props.props.left = `${newLeft}px`;
      };

      const setLeftBottomMouseUp = () => {
        emit("change", {
          id: props.id,
          type: "change",
          key: "position",
          data: {
            oldValue: {
              width: wrapperWidth + "px",
              height: wrapperHeight + "px",
              left: wrapperLeft + "px",
            },
            newValue: {
              width: newWidth + "px",
              height: newHeight + "px",
              left: newLeft + "px",
            },
          },
        });
        document.removeEventListener("mousemove", setLeftBottomMouseMove);
        document.removeEventListener("mouseup", setLeftBottomMouseUp);
      };
      document.addEventListener("mousemove", setLeftBottomMouseMove);
      document.addEventListener("mouseup", setLeftBottomMouseUp);
    };
    const setLeftTopMouseDown = (e) => {
      e.stopPropagation();
      const start = {
        x: e.clientX,
        y: e.clientY,
      };
      const wrapperWidth = wrapper.value.offsetWidth;
      const wrapperHeight = wrapper.value.offsetHeight;
      const wrapperLeft = parseFloat(props.props.left) || 0;
      const wrapperTop = parseFloat(props.props.top) || 0;
      let newWidth = wrapperWidth;
      let newHeight = wrapperHeight;
      let newLeft = wrapperLeft;
      let newTop = wrapperTop;

      const setLeftTopMouseMove = (e) => {
        e.stopPropagation();
        const move = {
          x: e.clientX - start.x,
          y: e.clientY - start.y,
        };
        console.log(move);
        newWidth = Math.max(
          0,
          Math.min(wrapperWidth - move.x, wrapperWidth + wrapperLeft),
        );
        newHeight = Math.max(
          0,
          Math.min(wrapperHeight - move.y, wrapperHeight + wrapperTop),
        );
        newLeft = Math.max(0, wrapperLeft + Math.min(wrapperWidth, move.x));
        newTop = Math.max(0, wrapperTop + Math.min(wrapperHeight, move.y));
        props.props.width = `${newWidth}px`;
        props.props.height = `${newHeight}px`;
        props.props.left = `${newLeft}px`;
        props.props.top = `${newTop}px`;
      };

      const setLeftTopMouseUp = () => {
        emit("change", {
          id: props.id,
          type: "change",
          key: "position",
          data: {
            oldValue: {
              width: wrapperWidth + "px",
              height: wrapperHeight + "px",
              left: wrapperLeft + "px",
              top: wrapperTop + "px",
            },
            newValue: {
              width: newWidth + "px",
              height: newHeight + "px",
              left: newLeft + "px",
              top: newTop + "px",
            },
          },
        });
        document.removeEventListener("mousemove", setLeftTopMouseMove);
        document.removeEventListener("mouseup", setLeftTopMouseUp);
      };
      document.addEventListener("mousemove", setLeftTopMouseMove);
      document.addEventListener("mouseup", setLeftTopMouseUp);
    };
    return {
      handleClick,
      style,
      handleMouseDown,
      wrapper,
      setRightBottomMouseDown,
      setLeftBottomMouseDown,
      setLeftTopMouseDown,
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
      <div class="resizer top-left" @mousedown="setLeftTopMouseDown"></div>
      <div class="resizer top-right"></div>
      <div
        class="resizer bottom-left"
        @mousedown="setLeftBottomMouseDown"
      ></div>
      <div
        class="resizer bottom-right"
        @mousedown="setRightBottomMouseDown"
      ></div>
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
