import { h } from "vue";

const propsMap = {
  text: {
    component: "a-textarea",
    label: "文本",
    extraProps: {
      rows: 3,
    },
    afterTransform: (value) => value.target.value,
  },
  fontSize: {
    component: "a-input-number",
    label: "字体大小",
    initialTransform: (value) => parseFloat(value),
    afterTransform: (value) => `${value}px`,
  },
  lineHeight: {
    component: "a-slider",
    label: "行高",
    extraProps: {
      min: 0.5,
      max: 3,
      step: 0.1,
    },
    initialTransform: (value) => parseFloat(value),
    afterTransform: (value) => `${value}`,
  },
  textAlign: {
    component: "a-radio-group",
    label: "对齐方式",
    subComponent: "a-radio-button",
    options: [
      {
        label: "左",
        value: "left",
      },
      {
        label: "中",
        value: "center",
      },
      {
        label: "右",
        value: "right",
      },
    ],
    extraProps: {},
    afterTransform: (value) => value.target.value,
  },
  fontFamily: {
    component: "a-select",
    label: "字体",
    subComponent: "a-select-option",
    // 记得顶部依然保留 import { h } from "vue";

    options: [
      {
        label: "无",
        value: "",
      },
      // --- 🍎 苹果/现代系统主流字体 ---
      {
        label: h(
          "span",
          {
            style: {
              fontFamily:
                "'PingFang SC', '-apple-system', 'BlinkMacSystemFont', 'Microsoft YaHei'",
            },
          },
          "苹方 (黑体/默认)",
        ),
        // 苹方是 Mac 和 iOS 的默认中文字体，Windows 下会自动降级找后面的字体
        value:
          "'PingFang SC', '-apple-system', 'BlinkMacSystemFont', 'Microsoft YaHei', sans-serif",
      },

      // --- 🎨 适合海报的艺术/经典中文字体 ---
      {
        label: h(
          "span",
          { style: { fontFamily: "'SimHei','STHeiti'" } },
          "微软雅黑",
        ),
        value: "'SimHei','STHeiti'",
      },
      {
        label: h(
          "span",
          { style: { fontFamily: "'SimSun','STSong'" } },
          "宋体",
        ),
        value: "'SimSun','STSong'",
      },
      {
        label: h(
          "span",
          { style: { fontFamily: "'FangSong','STFangSong'" } },
          "仿宋",
        ),
        value: "'FangSong','STFangSong'",
      },
      {
        label: h(
          "span",
          { style: { fontFamily: "'KaiTi','STKaiTi'" } },
          "楷体",
        ),
        value: "'KaiTi','STKaiTi'",
      },
      {
        label: h("span", { style: { fontFamily: "'LiSu', 'STLiti'" } }, "隶书"),
        value: "'LiSu', 'STLiti'",
      },
      {
        label: h("span", { style: { fontFamily: "'YouYuan'" } }, "幼圆"),
        value: "'YouYuan'",
      },
      {
        label: h(
          "span",
          { style: { fontFamily: "'STXingkai', 'Xingkai SC'" } },
          "华文行楷",
        ),
        value: "'STXingkai', 'Xingkai SC'",
      },

      // --- 🔠 海报常用经典英文字体 ---
      {
        label: h(
          "span",
          { style: { fontFamily: "Arial, sans-serif" } },
          "Arial (无衬线)",
        ),
        value: "Arial, sans-serif",
      },
      {
        label: h(
          "span",
          { style: { fontFamily: "'Times New Roman', serif" } },
          "Times New Roman (衬线)",
        ),
        value: "'Times New Roman', serif",
      },
      {
        label: h(
          "span",
          { style: { fontFamily: "'Comic Sans MS', cursive" } },
          "Comic Sans (手写体)",
        ),
        value: "'Comic Sans MS', cursive",
      },
      {
        label: h(
          "span",
          { style: { fontFamily: "Impact, charcoal, sans-serif" } },
          "Impact (海报粗体)",
        ),
        value: "Impact, charcoal, sans-serif",
      },
    ],
    extraProps: { optionLabelProp: "label" },
  },
  paddingLeft: {
    component: "a-input-number",
    label: "内边距左",
    initialTransform: (value) => parseFloat(value),
    afterTransform: (value) => `${value}px`,
    extraProps: { min: 0 },
  },
  paddingRight: {
    component: "a-input-number",
    label: "内边距右",
    initialTransform: (value) => parseFloat(value),
    afterTransform: (value) => `${value}px`,
    extraProps: { min: 0 },
  },
  paddingTop: {
    component: "a-input-number",
    label: "内边距上",
    initialTransform: (value) => parseFloat(value),
    afterTransform: (value) => `${value}px`,
    extraProps: { min: 0 },
  },
  paddingBottom: {
    component: "a-input-number",
    label: "内边距下",
    initialTransform: (value) => parseFloat(value),
    afterTransform: (value) => `${value}px`,
    extraProps: { min: 0 },
  },
  borderStyle: {
    component: "a-radio-group",
    label: "边框样式",
    subComponent: "a-radio-button",
    options: [
      {
        label: "无",
        value: "none",
      },
      {
        label: "实线",
        value: "solid",
      },
      {
        label: "虚线",
        value: "dashed",
      },
      {
        label: "点线",
        value: "dotted",
      },
    ],
    extraProps: {},
    afterTransform: (value) => value.target.value,
  },
  borderWidth: {
    component: "a-input-number",
    label: "边框宽度",
    initialTransform: (value) => parseFloat(value),
    afterTransform: (value) => `${value}px`,
    extraProps: { min: 0 },
  },
  borderRadius: {
    component: "a-input-number",
    label: "圆角半径",
    initialTransform: (value) => parseFloat(value),
    afterTransform: (value) => `${value}px`,
    extraProps: { min: 0 },
  },
  opacity: {
    component: "a-input-number",
    label: "透明度%",
    initialTransform: (value) => Math.round(value * 100),
    afterTransform: (value) => `${value / 100}`,
    extraProps: { min: 0, max: 100 },
  },
};

export default propsMap;
