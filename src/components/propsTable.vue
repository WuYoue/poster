<script>
import { defineComponent, computed } from "vue";
import propsMap from "@/propsMap";
import { reduce } from "lodash-es";

export default defineComponent({
  name: "propsTable",
  props: {
    componentProps: {
      type: Object,
      required: true,
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    console.log(props.componentProps);
    console.log(propsMap);
    const propsMapList = computed(() => {
      return reduce(
        props.componentProps,
        (acc, value, key) => {
          console.log(acc, value, key);
          const item = propsMap[key];
          if (item) {
            const {
              valueProp = "value",
              eventName = "change",
              initialTransform,
              afterTransform,
            } = item;

            const newItem = {
              ...item,
              value: initialTransform ? initialTransform(value) : value,
              eventName,
              valueProp,
              events: {
                [eventName]: (value) => {
                  emit("change", {
                    key,
                    value: afterTransform ? afterTransform(value) : value,
                  });
                },
              },
            };
            // item.value = item.initialTransform
            //   ? item.initialTransform(value)
            //   : value;
            // item.valueProp = item.valueProp ? item.valueProp : "value";
            acc.push(newItem);
          }
          return acc;
        },
        [],
      );
    });

    return {
      propsMapList,
    };
  },
});
</script>

<template>
  <div>
    <a-form>
      <template v-for="(item, key) in propsMapList" :key="key">
        <a-form-item :label="item.label">
          <component
            :is="item.component"
            :[item.valueProp]="item.value"
            v-bind="item.extraProps"
            v-on="item.events"
          >
            <template v-for="value in item.options">
              <component :is="item.subComponent" :value="value.value">
                {{ value.label }}
              </component>
            </template>
          </component>
        </a-form-item>
      </template>
    </a-form>
  </div>
</template>

<style scoped></style>
