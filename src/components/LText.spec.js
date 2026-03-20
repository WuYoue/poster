import { shallowMount } from "@vue/test-utils";
import LText from "./LText.vue";

describe("LText.vue", () => {
  it("默认渲染正确的标签和文本", () => {
    // 1. 准备传入的 props 数据
    const msg = "这是一段测试文本";
    const props = {
      actionType: "",
      url: "",
      text: msg,
      tag: "div", // 假设你的 LText 默认渲染为 div
      fontSize: "14px",
    };

    // 2. 挂载组件 (shallowMount 意味着只挂载 LText 本身，不挂载它的子组件)
    const wrapper = shallowMount(LText, {
      props: props,
    });

    // 3. 断言 (期望值与实际值的比对)
    // 期望组件内部能找到这段文字
    expect(wrapper.text()).toMatch(msg);
    // 期望组件渲染出来的 HTML 标签确实是 div
    expect(wrapper.element.tagName).toBe("DIV");
    // 期望组件的 style 里包含了传入的字体大小
    expect(wrapper.element.style.fontSize).toBe("14px");
  });
});
