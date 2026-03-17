import { pick } from "lodash-es";
import { computed } from "vue";

const useComponentCommon = (props, pickProps) => {
  const styleProps = computed(() => pick(props, pickProps));
  const toClick = (e) => {
    if (props.actionType === "url" && props.url) {
      window.open(props.url);
    }
  };
  return {
    styleProps,
    toClick,
  };
};

export default useComponentCommon;
