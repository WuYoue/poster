<script>
import { defineComponent } from "vue";
import LText from "./LText.vue";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: "ComponentList",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  components: {
    LText,
  },
  emits: ["selectComponent"],
  setup(props, { emit }) {
    const selectComponent = (item) => {
      const component = { id: uuidv4(), name: "l-text", props: item };
      console.log(component);

      emit("selectComponent", component);
    };
    return {
      selectComponent,
    };
  },
});
</script>

<template>
  <div class="sidebar-panel">
    <div class="section-header-main">
      <h2 class="title-main">图层资产</h2>

      <svg
        class="icon-search"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
    <div class="section-header-sub">
      <span class="title-sub">常用文本</span>

      <svg
        class="icon-chevron"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
    <div
      class="component-list"
      style="display: flex; flex-direction: column; gap: 8px"
    >
      <div class="component-item">
        <div class="icon-wrapper">
          <span class="icon-placeholder">T</span>
        </div>
        <div class="text-content">
          <p class="main-title">添加大标题</p>
          <p class="sub-title">Inter Bold 32pt</p>
        </div>
      </div>
      <div class="component-item">
        <div class="icon-wrapper">
          <span class="icon-placeholder">Aa</span>
        </div>
        <div class="text-content">
          <p class="main-title">添加正文内容</p>
          <p class="sub-title">Inter Regular 14pt</p>
        </div>
      </div>
    </div>
  </div>
  <div class="section-shape">
    <div class="section-header-sub">
      <span class="title-sub">形状组件</span>
      <svg
        class="icon-chevron"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>

    <div class="shape-grid">
      <button class="shape-btn">
        <div class="shape-icon-wrapper square-wrapper">
          <svg
            class="shape-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>
        </div>
        <span class="shape-text">矩形</span>
      </button>

      <button class="shape-btn">
        <div class="shape-icon-wrapper circle-wrapper">
          <svg
            class="shape-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </div>
        <span class="shape-text">圆形</span>
      </button>
    </div>
  </div>
  <div class="section-smart-layout">
    <div class="section-header-sub">
      <span class="title-sub">智能排版</span>
      <svg
        class="icon-chevron"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>

    <div class="ai-layout-container">
      <div class="ai-layout-header">
        <svg
          class="icon-magic"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"
          ></path>
        </svg>
        <span class="ai-layout-title">AI 推荐布局</span>
      </div>

      <div class="layout-cards-scroll">
        <div class="layout-card">
          <div class="skel-block" style="height: 50%; border-radius: 4px"></div>
          <div class="skel-line" style="width: 70%; margin-top: 4px"></div>
          <div class="skel-line" style="width: 100%"></div>
        </div>

        <div
          class="layout-card"
          style="justify-content: flex-end; padding-bottom: 12px"
        >
          <div class="skel-line" style="width: 50%"></div>
          <div class="skel-line" style="width: 90%"></div>
          <div class="skel-line" style="width: 70%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ====================
   智能排版 (AI Recommendation)
   ==================== */
.section-smart-layout {
  margin-top: 24px;
}

/* AI 专属浅蓝色底框 */
.ai-layout-container {
  background-color: #f8fafc; /* 极浅灰偏白 */
  border: 1px solid #e6eeff; /* SaaS专属浅蓝边框 */
  border-radius: 12px;
  padding: 12px;
  overflow: hidden;
}

/* 带有魔法感的头部标题 */
.ai-layout-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  color: #2563eb; /* 品牌主色蓝 */
}

.icon-magic {
  width: 14px;
  height: 14px;
}

.ai-layout-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
}

/* 横向滑动容器 */
.layout-cards-scroll {
  padding-top: 6px;
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px; /* 给下方留点阴影空间 */
  margin-bottom: -8px; /* 抵消 padding 带来的空白 */

  /* 隐藏丑陋的滚动条，但保留滑动功能 */
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.layout-cards-scroll::-webkit-scrollbar {
  display: none;
}

/* 单个排版缩略图卡片 */
.layout-card {
  flex: 0 0 76px; /* 锁定宽度，禁止挤压变形 */
  aspect-ratio: 3 / 4; /* 强制海报 3:4 比例 */
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* 卡片悬浮交互（SaaS高级感） */
.layout-card:hover {
  border-color: #3b82f6; /* 边框变蓝 */
  background-color: #eff6ff; /* 背景微蓝 */
  transform: translateY(-2px); /* 微微上浮 */
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1); /* 蓝色微阴影 */
}

/* ====================
   卡片内部骨架屏 (Skeletons)
   ==================== */
/* 模拟图片色块 */
.skel-block {
  background-color: #e2e8f0;
  width: 100%;
}

/* 模拟文字线条 */
.skel-line {
  background-color: #cbd5e1;
  height: 4px;
  border-radius: 2px;
}

/* 模拟圆形头像/图形 */
.skel-circle {
  background-color: #e2e8f0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

/* 悬浮时让内部的骨架也产生一点颜色联动 */
.layout-card:hover .skel-block {
  background-color: #bfdbfe;
}
.layout-card:hover .skel-line {
  background-color: #93c5fd;
}
.layout-card:hover .skel-circle {
  background-color: #bfdbfe;
}
/* ====================
   形状组件网格布局
   ==================== */
.section-shape {
  margin-top: 24px; /* 与上一个模块（常用文本）拉开距离 */
}

/* 核心：两列网格布局，中间留 8px 缝隙 */
.shape-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

/* 形状按钮的基础样式 */
.shape-btn {
  aspect-ratio: 1 / 1; /* 魔法属性：强制让高度等于宽度，变成完美的正方形 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #ffffff;
  border: 1px solid #e6eeff; /* 极简蓝的极浅边框 */
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

/* 按钮悬浮时的优雅交互 */
.shape-btn:hover {
  border-color: #93c5fd; /* 边框变成清爽的蓝色 */
  background-color: #f8fafc; /* 背景微微变灰 */
}

/* ====================
   内部虚线框与图标
   ==================== */
.shape-icon-wrapper {
  width: 40px;
  height: 40px;
  background-color: #f8fafc; /* 极浅灰背景 */
  border: 2px dashed #e2e8f0; /* 高级感来源：虚线边框 */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 矩形的虚线框是小圆角 */
.square-wrapper {
  border-radius: 8px;
}

/* 圆形的虚线框是全圆 */
.circle-wrapper {
  border-radius: 50%;
}

/* SVG 图标样式 */
.shape-icon {
  width: 20px;
  height: 20px;
  color: #cbd5e1; /* 灰白色，保持图标弱化，突出外面的虚线框 */
}

/* 底部文字 */
.shape-text {
  font-size: 11px;
  color: #475569;
  font-weight: 500;
}
/* 整个按钮容器 */
.component-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #ffffff;
  border: 1px solid #e6eeff; /* Stitch配置的淡蓝色边框 */
  border-radius: 12px;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* 悬浮时的微微浮起和阴影效果（SaaS高级感来源） */
.component-item:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-color: #c0c7d6;
}

/* 左侧图标的蓝色小方块 */
.icon-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: #eff6ff; /* blue-50 */
  color: #2563eb; /* blue-600 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* 文字区域排版 */
.text-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.main-title {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: #0f172a; /* 深灰黑，比纯黑更护眼 */
}

.sub-title {
  margin: 0;
  font-size: 10px;
  color: #94a3b8; /* 浅灰色，弱化辅助信息 */
}
/* ====================
   1. 图层资产 (主标题)
   ==================== */
.section-header-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px; /* 距离下方的距离 */
}

.title-main {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #0f172a; /* 深灰黑，极其专业 */
}

.icon-search {
  width: 18px;
  height: 18px;
  color: #94a3b8; /* 浅灰色 */
  cursor: pointer;
  transition: color 0.2s ease;
}

.icon-search:hover {
  color: #3b82f6; /* 鼠标悬浮时变成品牌蓝，提升交互感 */
}

/* ====================
   2. 常用文本 (折叠分类)
   ==================== */
.section-header-sub {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  cursor: pointer;
  padding: 4px 0; /* 增加一点点击区域 */
}

.title-sub {
  font-size: 12px;
  /* font-weight: 600; */
  color: #64748b; /* 中等灰 */
  text-transform: uppercase; /* 字母大写（如果有英文的话） */
  letter-spacing: 0.05em; /* 微微拉开字间距，更有呼吸感 */
}

.icon-chevron {
  width: 16px;
  height: 16px;
  color: #94a3b8;
  transition: transform 0.2s ease, color 0.2s ease;
}

/* 折叠分类悬浮时的微动画效果：箭头微微向下沉 */
.section-header-sub:hover .title-sub,
.section-header-sub:hover .icon-chevron {
  color: #334155; /* 悬浮时整体颜色加深 */
}

.section-header-sub:hover .icon-chevron {
  /* transform: translateY(2px); 箭头微动效果，Stitch 高级感的来源 */
}
/* 
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
.component-item > * {
  position: static !important;
} */
</style>
