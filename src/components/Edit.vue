<template>
  <div class="edit">
    <a-layout class="layout">
      <a-layout-header class="header">海报生成编辑器</a-layout-header>
      <a-layout class="content">
        <a-layout-sider class="sider">
          <ComponentList :list="templates" @selectComponent="selectComponent" />
        </a-layout-sider>
        <a-layout-content class="center-content">
          <!-- 中一个内容操作区,位于容器a-layout-content中间 -->
          <div class="center-box">
            <template v-for="item in list" :key="item.id">
              <component :is="item.name" v-bind="item.props"></component>
            </template>
          </div>
        </a-layout-content>
        <a-layout-sider class="sider">Sider</a-layout-sider>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import LText from "@/components/LText.vue";
import ComponentList from "@/components/ComponentList.vue";
import templates from "@/defaultTemplates";

export default defineComponent({
  name: "Edit",
  props: {
    msg: String,
  },
  components: {
    LText,
    ComponentList,
  },
  setup() {
    const store = useStore();

    const list = computed(() => store.state.editor.components);

    const selectComponent = (item) => {
      console.log("---------", item);
      console.log(store.state.editor.components);

      store.state.editor.components.push(item);
    };
    return {
      list,
      templates,
      selectComponent,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout {
  height: 100vh;
}
.header {
  height: 64px;
  line-height: 64px;
  font-size: 24px;
  font-weight: bold;
  background-color: #fad56e;
}
.edit {
  height: 100vh;
}
.sider {
  height: 100%;
  background-color: #5fa4ff;
}
.center-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.center-box {
  height: 50%;
  width: 80%;
  background-color: #fff;
  position: relative;
}
</style>
