<script>
import { defineComponent, computed } from "vue";
import {
  textStylePropNames,
  transformToComponentProps,
  textDefaultProps,
} from "@/defaultProps";
import { pick } from "lodash-es";
import useComponentCommon from "@/hooks/useComponentCommon";

const defaultProps = transformToComponentProps(textDefaultProps);

export default defineComponent({
  name: "LText",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    ...defaultProps,
  },
  setup(props) {
    console.log(props);
    const { styleProps, toClick } = useComponentCommon(
      props,
      textStylePropNames,
    );

    return {
      styleProps,
      toClick,
    };
  },
});
</script>

<template>
  <component :is="tag" :style="styleProps" @click="toClick" class="l-text">
    {{ text }}
  </component>
</template>

<style scoped></style>
