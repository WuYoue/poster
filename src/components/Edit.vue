<template>
  <div class="edit">
    <a-layout class="layout">
      <a-layout-header class="header">
        <img src="@/assets/WyLogo.svg" alt="无忧" />
        海报生成编辑器
      </a-layout-header>
      <a-layout class="content">
        <a-layout-sider width="260px" class="sider">
          <p>组件列表</p>
          <ComponentList :list="templates" @selectComponent="selectComponent" />
        </a-layout-sider>
        <a-layout-content class="center-content">
          <!-- 中一个内容操作区,位于容器a-layout-content中间 -->
          <div class="center-box">
            <template v-for="item in list" :key="item.id">
              <!-- TODO为什么外层要套一个EditWrapper组件？为什么要把ID传递给EditWrapper组件，然后又用set-active传出来？ -->
              <EditWrapper
                :id="item.id"
                :active="activeComponentId === item.id"
                v-show="!item?.isHidden"
                @set-active="setActive"
              >
                <component :is="item.name" v-bind="item.props"></component>
              </EditWrapper>
            </template>
          </div>
        </a-layout-content>
        <a-layout-sider width="300px" class="sider">
          <a-tabs v-model:activeKey="activeKey" :animated="false">
            <a-tab-pane key="1" tab="属性面板">
              <propsTable
                v-if="activeComponent && !activeComponent.isLocked"
                :componentProps="activeComponent.props"
                @change="handleChangeProps"
              />
              <a-empty
                v-else
                :description="
                  activeComponent?.isLocked
                    ? '该元素被锁定，无法编辑'
                    : '暂无属性'
                "
              ></a-empty>
              <div>{{ activeComponent }}</div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="图层设置">
              <LayerList
                :list="list"
                :activeComponentId="activeComponentId ?? ''"
                @changeActive="setActive"
                @changeLock="changeLock"
                @changeHidden="changeHidden"
              />
            </a-tab-pane>
          </a-tabs>
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import LText from "@/components/LText.vue";
import EditWrapper from "@/components/EditWrapper.vue";
import LayerList from "@/components/LayerList.vue";

import ComponentList from "@/components/ComponentList.vue";
import templates from "@/defaultTemplates";
import propsTable from "@/components/propsTable.vue";

export default defineComponent({
  name: "Edit",
  props: {
    msg: String,
  },
  components: {
    LText,
    ComponentList,
    EditWrapper,
    propsTable,
    LayerList,
  },
  setup() {
    const store = useStore();

    const list = computed(() => store.state.editor.components);
    const activeComponent = computed(() => store.getters.getActiveComponent);
    const activeKey = ref("1");

    const selectComponent = (item) => {
      console.log("---------", item);
      console.log(store.state.editor.components);

      store.state.editor.components.push(item);
    };
    const setActive = (id) => {
      console.log(id);
      store.state.editor.activeComponentId = id;
    };
    const activeComponentId = computed(
      () => store.state.editor.activeComponentId,
    );
    const handleChangeProps = (e) => {
      console.log(e);
      if (activeComponent.value) {
        activeComponent.value.props[e.key] = e.value;
      }
      // store.commit.editor.setComponentProps(key, value);
    };
    const changeLock = (id) => {
      console.log(id);
      list.value.forEach((item) => {
        if (item.id === id) {
          item.isLocked = !item.isLocked;
        }
      });
    };
    const changeHidden = (id) => {
      console.log(id);
      list.value.forEach((item) => {
        if (item.id === id) {
          item.isHidden = !item.isHidden;
        }
      });
    };
    return {
      list,
      templates,
      selectComponent,
      setActive,
      activeComponentId,
      activeComponent,
      handleChangeProps,
      activeKey,
      changeLock,
      changeHidden,
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
  font-size: 16px;
  font-weight: 500;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
}
.ant-layout-header {
  padding: 20px;
}
.header img {
  width: 32px;
  margin-right: 10px;
}
.edit {
  height: 100vh;
}
.sider {
  width: 300px;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  /* border-top: 1px solid #ccc; */
}
.center-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.center-box {
  height: 80%;
  width: 80%;
  background-color: #fff;
  position: relative;
}
.ant-empty {
  margin-top: 200px;
}
</style>
