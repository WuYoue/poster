const editor = {
  state: () => ({
    poster: {
      width: 1000,
      height: 1000,
      background: "#fff",
      elements: [],
    },
    activeComponentId: null,
    components: [
      {
        id: "1",
        name: "LText",
        props: {
          text: "hello world",
          fontSize: "24px",
          top: "20px", // 👈 往下挪一点
          lineHeight: "1.5",
          textAlign: "center",
          fontFamily: "",
        },
      },
      {
        id: "2",
        name: "LText",
        props: {
          text: "星斗堂艺术品",
          fontSize: "14px",
          color: "red",
          top: "60px", // 👈 再往下挪一点
          textAlign: "center",
          fontFamily: "",
        },
      },
      {
        id: "3",
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
    ],
  }),
  getters: {
    getActiveComponent(state) {
      return state.components.find(
        (item) => item.id === state.activeComponentId,
      );
    },
  },
};

export default editor;
