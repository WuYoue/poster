<template>
  <div class="edit">
    <a-layout class="layout">
      <a-layout-header class="header">海报生成编辑器</a-layout-header>
      <a-layout class="content">
        <a-layout-sider class="sider">Sider</a-layout-sider>
        <a-layout-content class="center-content">
          <!-- 中一个内容操作区,位于容器a-layout-content中间 -->
          <div class="center-box">
            <template v-for="item in list">
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

export default defineComponent({
  name: "Edit",
  props: {
    msg: String,
  },
  components: {
    LText,
  },
  setup() {
    const list = [
      {
        name: "LText",
        props: {
          text: "hello world",
          fontSize: "24px",
          top: "20px", // 👈 往下挪一点
        },
      },
      {
        name: "LText",
        props: {
          text: "星斗堂艺术品",
          fontSize: "14px",
          color: "red",
          top: "60px", // 👈 再往下挪一点
        },
      },
      {
        name: "LText",
        props: {
          text: "中国风",
          fontSize: "18px",
          color: "blue",
          top: "100px", // 👈 挪到最下面
          actionType: "url",
          url: "https://www.baidu.com",
        },
      },
    ];
    const store = useStore();
    const poster = computed(() => store.state.editor.poster);
    const wx = computed(() => store.getters.wx(0.5));
    return {
      poster,
      wx,
      list,
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
