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
    options: [
      {
        label: "无",
        value: "",
      },
      {
        label: "微软雅黑",
        value: "'SimHei','STHeiti'",
      },
      {
        label: "宋体",
        value: "'SimSun','STSong'",
      },
      {
        label: "仿宋",
        value: "'FangSong','STFangSong'",
      },
      {
        label: "楷体",
        value: "'KaiTi','STKaiTi'",
      },
    ],
    extraProps: {},
  },
};

export default propsMap;
