<script>
import {
  computed,
  defineComponent,
  ref,
  reactive,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";

import { useStore } from "vuex";
import { debounce } from "lodash-es";
import LText from "@/components/LText.vue";
import EditWrapper from "@/components/EditWrapper.vue";
import LayerList from "@/components/LayerList.vue";

import ComponentList from "@/components/ComponentList.vue";
import templates from "@/defaultTemplates";
import propsTable from "@/components/propsTable.vue";

import { generatePosterLayout, getStaticImageBase64 } from "@/utils/ai.js";
import image from "@/assets/img/模版2.png";

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
    const loggerBox = ref(null);

    const list = computed(() => store.state.editor.components);
    const activeComponent = computed(() => store.getters.getActiveComponent);
    const activeKey = ref("1");
    const history = reactive([]);
    let historyIndex = -1;

    const selectComponent = (item) => {
      console.log("---------", item);
      console.log(store.state.editor.components);
      const historyItem = {
        id: item.id,
        data: item,
        type: "add",
      };
      if (historyIndex !== history.length - 1) {
        history.splice(historyIndex + 1, history.length - historyIndex - 1);
      }
      history.push(historyItem);
      historyIndex++;
      console.log(history);
      store.state.editor.components.push(item);
    };
    const setActive = (id) => {
      console.log(id);
      store.state.editor.activeComponentId = id;
    };
    const activeComponentId = computed(
      () => store.state.editor.activeComponentId,
    );
    //关闭开始防抖
    let oldValue = null;
    const handleChangePropsDebounce = debounce((e) => {
      let historyItem = null;
      if (e.key === "position") {
        historyItem = {
          ...e,
        };
        oldValue = historyItem.data.newValue;
        console.log(historyItem.data.newValue);
      } else {
        historyItem = {
          id: activeComponent.value.id,
          type: "change",
          data: {
            oldValue: {
              [e.key]: oldValue.value,
            },
            newValue: {
              [e.key]: e.value,
            },
          },
        };
        oldValue = e.value;
      }
      if (historyIndex !== history.length - 1) {
        history.splice(historyIndex + 1, history.length - historyIndex - 1);
      }
      history.push(historyItem);
      historyIndex++;
      console.log("changeProps--------------------------------", history);
    }, 600);
    const handleChangeProps = (e) => {
      console.log("handleChangeProps", e);
      if (!activeComponent.value) return;

      if (oldValue === null || oldValue.key !== e.key) {
        oldValue = {
          key: e.key,
          value: activeComponent.value.props[e.key],
        };
      }
      if (e.key !== "position") {
        activeComponent.value.props[e.key] = e.value;
      }
      //防抖处理
      handleChangePropsDebounce(e);
    };
    // store.commit.editor.setComponentProps(key, value);
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
    const deleteListItem = () => {
      //取最后一项
      // 有没有方法可以直接取数组最后一项的值，pop不是删除吗？
      // const item = store.state.editor.components[store.state.editor.components.length - 1];
      const lastItem = store.state.editor.components.pop();
      const historyItem = {
        id: lastItem.id,
        type: "delete",
        data: lastItem,
      };
      if (historyIndex !== history.length - 1) {
        history.splice(historyIndex + 1, history.length - historyIndex - 1);
      }
      history.push(historyItem);
      historyIndex++;
      console.log(history);
    };
    const undo = () => {
      if (historyIndex < 0) {
        return;
      }
      const historyItem = history[historyIndex];
      switch (historyItem.type) {
        case "add":
          store.state.editor.components.pop();
          historyIndex--;
          break;
        case "delete":
          store.state.editor.components.push(historyItem.data);
          historyIndex--;
          break;
        case "change":
          const item = store.state.editor.components.find(
            (item) => item.id === historyItem.id,
          );
          const data = historyItem.data;
          item.props = {
            ...item.props,
            ...data.oldValue,
          };
          historyIndex--;
          break;
      }
    };
    const redo = () => {
      if (historyIndex === history.length - 1) {
        return;
      }
      const historyItem = history[historyIndex + 1];
      switch (historyItem.type) {
        case "add":
          store.state.editor.components.push(historyItem.data);
          historyIndex++;
          break;
        case "delete":
          store.state.editor.components.pop();
          historyIndex++;
          break;
        case "change":
          const item = store.state.editor.components.find(
            (item) => item.id === historyItem.id,
          );
          const data = historyItem.data;
          item.props = {
            ...item.props,
            ...data.newValue,
          };
          historyIndex++;
          break;
      }
    };
    // 如果你还没引入 ref，记得在文件顶部引入
    // import { ref } from 'vue';
    // import { useStore } from 'vuex'; // 假设你用了 Vuex
    // import testImg from "@/assets/img/your-image.png";

    // 1. 定义页面响应式状态
    const aiThinkingLog = ref("");
    const isLoading = ref(false);
    // const loggerBox = ref(null); // 记得你之前定义过的，保持保留

    // 🚨 把之前的 thinkingQueue, isTyping, chunkSize, typeWriterEffect 全部删掉！
    // 我们不需要“缓存弹药”了，直接真枪实弹上！

    // 2. 核心大招：触发 AI 海报生成（极速原生流式版）
    const initAIPoster = async () => {
      try {
        isLoading.value = true;
        aiThinkingLog.value =
          "系统：视觉引擎已启动，正在疯狂压缩图片并上传...\n\n";

        // 获取当天的真实日期
        const today = new Date();
        const userSelectedDate = `${today.getFullYear()}年${
          today.getMonth() + 1
        }月${today.getDate()}日`;

        // 这里的 image 变量替换成你实际的图片来源
        const base64 = await getStaticImageBase64(image);

        aiThinkingLog.value += "系统：图片分析中，正在召唤顶薪排版总监...\n\n";
        aiThinkingLog.value += "==== 排版总监的实时推演过程 ====\n";

        // 调用引擎，传入流式回调函数
        const layoutResult = await generatePosterLayout(
          base64,
          userSelectedDate,
          async (textChunk) => {
            // 🚨 极速魔法 1：网络推过来多少，就直接砸到屏幕上！不缓冲，不等待！
            aiThinkingLog.value += textChunk;

            // 🚨 极速魔法 2：每次追加完文字，立刻滚动到底部
            await nextTick();
            if (loggerBox.value) {
              loggerBox.value.scrollTop = loggerBox.value.scrollHeight;
            }
          },
        );

        // 拿到最终排版数据
        if (layoutResult) {
          aiThinkingLog.value +=
            "\n\n系统：✅ 思考推演完毕，正在将排版灵魂注入画布...";

          // 滚一下最后一行
          await nextTick();
          if (loggerBox.value)
            loggerBox.value.scrollTop = loggerBox.value.scrollHeight;

          // 🚨 直接放行！瞬间将排版好的组件打散注入到 Vuex 中渲染到画布
          store.state.editor.components.push(...layoutResult);
        } else {
          // 防断流报警器
          aiThinkingLog.value +=
            "\n\n系统：❌ 哎呀，排版总监掉线了（API 请求报错或中断）！";
        }
      } catch (e) {
        console.error(e);
        aiThinkingLog.value += "\n🚨 翻车了: " + e;
      } finally {
        isLoading.value = false;
      }
    };
    // const initAIPoster = async () => {
    //   try {
    //     isLoading.value = true;
    //     aiThinkingLog.value =
    //       "系统：视觉引擎已启动，正在疯狂压缩图片并上传...\n\n";

    //     const userSelectedDate = "2026年3月27日";
    //     const base64 = await getStaticImageBase64(image);

    //     aiThinkingLog.value += "系统：分析中，正在召唤顶薪排版总监...\n\n";
    //     aiThinkingLog.value += "==== 排版总监的实时思考过程 ====\n";

    //     // 🚨 注意看这里的调用变化！
    //     // 我们把第三个参数传了一个箭头函数进去，ai.js 只要收到一个字，就会触发这里
    //     const layoutResult = await generatePosterLayout(
    //       base64,
    //       userSelectedDate,
    //       (textChunk) => {
    //         // 实时把碎片拼接到页面的 log 变量上，触发 Vue 响应式更新！
    //         aiThinkingLog.value += textChunk;
    //       },
    //     );

    //     if (layoutResult) {
    //       aiThinkingLog.value +=
    //         "\n\n系统：✅ 思考完毕，正在将排版数据注入画布！";
    //       // 渲染海报组件
    //       store.state.editor.components.push(...layoutResult);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //     aiThinkingLog.value += "\n🚨 翻车了: " + e;
    //   } finally {
    //     isLoading.value = false;
    //   }
    // };
    onMounted(() => {
      // initAIPoster();
    });
    // let lll = reactive([
    //   { name: "吃饭", value: false },
    //   { name: "睡觉", value: false },
    //   { name: "学习", value: false },
    // ]);
    // const deleteItem = () => {
    //   //删除第一项
    //   lll.shift();
    //   //删除最后一项
    //   // lll.pop();
    // };
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
      deleteListItem,
      undo,
      redo,
      // lll,
      // deleteItem,
      history,
      historyIndex,
      aiThinkingLog,
      loggerBox,
    };
  },
});
</script>

<template>
  <div class="edit">
    <!-- {{ historyIndex }}
    {{ history }} -->
    <!-- <a-button @click="deleteItem">删除项</a-button>
    <div v-for="(item, index) in lll" :key="index">
      {{ item.name }}
      <a-checkbox v-model="item.value" />
    </div> -->
    <div class="ai-logger" ref="loggerBox">
      <pre>{{ aiThinkingLog }}</pre>
    </div>
    <a-layout class="layout">
      <a-layout-header class="header">
        <img src="@/assets/WyLogo.svg" alt="无忧" />
        <div class="title">星图</div>
        <img
          class="icon"
          src="@/assets/icon/Container.svg"
          alt="撤销"
          @click="undo"
        />
        <img
          class="icon"
          src="@/assets/icon/Container-1.svg"
          alt="重做"
          @click="redo"
        />
        <img
          class="icon"
          src="@/assets/icon/Container-2.svg"
          alt="删除"
          @click="deleteListItem"
        />
      </a-layout-header>
      <a-layout class="content">
        <a-layout-sider width="280px" class="sider">
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
                :props="item.props"
                v-show="!item?.isHidden"
                @set-active="setActive"
                @change="handleChangeProps"
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout {
  height: 100vh;
}
.ai-logger {
  background-color: #fff;
  color: #5f5f5f;
  padding: 15px;
  border-radius: 8px;
  height: 300px;
  overflow-y: auto;

  /* 👇 1. 暴力切断：即使是一个没空格的长串，到边缘也必须给我强制换行！ */
  word-break: break-all;

  /* 👇 2. 物理封锁：彻底封死横向溢出的可能性 */
  overflow-x: hidden;

  font-family: monospace;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.ai-logger::-webkit-scrollbar {
  display: none;
}
.ai-logger::-webkit-scrollbar:horizontal {
  height: 0px; /* 把横向滑动条的高度设为 0，直接隐身！ */
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
  background-color: #f7f9ff;
  padding: 20px;
  /* border-top: 1px solid #ccc; */
}
.sider:nth-child(3) {
  border-left: 2px solid #e2e8f080;
}
.center-content {
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #eff6ff;
  align-items: center;
}
.center-box {
  width: 375px;
  height: 800px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 加个阴影，立体感拉满 */
  background-color: #fff;
  position: relative;
  background-image: url("../assets/img/模版2.png");
  background-size: cover;
  background-position: center;
}
.ant-empty {
  margin-top: 200px;
}
.title {
  margin-right: 160px;

  font-size: 24px;
}

.header .icon {
  width: 16px;
  margin-right: 10px;
}
</style>
