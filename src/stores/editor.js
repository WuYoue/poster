const editor = {
  state: () => ({
    poster: {
      width: 1000,
      height: 1000,
      background: "#fff",
      elements: [],
    },
  }),
  getters: {
    wx: (state) => (x) => state.poster.width * x,
  },
};

export default editor;
