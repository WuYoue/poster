import { createStore } from "vuex";
import editor from "./editor.js";

const store = createStore({
  modules: {
    editor,
  },
});

export default store;
