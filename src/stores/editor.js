const editor = {
  state: () => ({
    poster: {
      width: 1000,
      height: 1000,
      background: "#fff",
      elements: [],
    },
    components: [
      {
        id: "1",
        name: "LText",
        props: {
          text: "hello world",
          fontSize: "24px",
          top: "20px", // 👈 往下挪一点
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
    ]
  }),
  getters: {
    wx: (state) => (x) => state.poster.width * x,
  },
};

export default editor;
