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
        layerName: "图层1",
        isHidden: false,
        isLocked: false,
        props: {
          text: "早安",
          fontSize: "24px",
          top: "20px", // 👈 往下挪一点
          left: "20px",
          lineHeight: "1.5",
          textAlign: "center",
          fontFamily: "",
          height: "60px",
          width: "100px",
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingTop: "10px",
          paddingBottom: "10px",
          borderStyle: "solid",
          borderColor: "#000",
          borderWidth: "1px",
          borderRadius: "10px",
          opacity: "0.5",
        },
      },
      // {
      //   id: "2",
      //   name: "LText",
      //   layerName: "图层2",
      //   isHidden: false,
      //   isLocked: false,
      //   props: {
      //     text: "星斗堂艺术品",
      //     fontSize: "14px",
      //     color: "red",
      //     top: "60px", // 👈 再往下挪一点
      //     left: "20px",
      //     textAlign: "center",
      //     fontFamily: "",
      //   },
      // },
      // {
      //   id: "3",
      //   name: "LText",
      //   layerName: "图层3",
      //   isHidden: false,
      //   isLocked: false,
      //   props: {
      //     text: "中国风",
      //     fontSize: "18px",
      //     color: "blue",
      //     top: "100px", // 👈 挪到最下面
      //     actionType: "url",
      //     url: "https://www.baidu.com",
      //   },
      // },
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
