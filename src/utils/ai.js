import OpenAI from "openai";

// 🚨 注意：在前端直接写 API Key 极其危险，会被别人偷走！
// 真实项目中应该把这段代码放在 Node.js/Java 后端，前端只负责传图片。
// 但为了本地 MVP 测试，我们先开启 dangerouslyAllowBrowser 允许前端调用。
const client = new OpenAI({
  apiKey: "sk-FYi6jWzUz8JUc4IcOQVGIacIDYKwmDNOuJWY1ZoD5CH3vK45", // 请替换为你实际有效的 Key
  baseURL: window.location.origin + "/moonshot-api/v1", // 🚨 核心：把网关地址换成 Kimi 的！
  dangerouslyAllowBrowser: true,
});

// 预设模板库：我们在这里设立不可侵犯的安全边距（30px）
const PRESET_TEMPLATES = `
【模板A：右侧留白排版（文字靠右对齐）】
[
  { "id": "t1", "name": "l-text", "props": { "text": "早安", "fontSize": "72px", "color": "#1a1a1a", "fontFamily": "'SimSun', 'STSong', serif", "fontWeight": "bold", "right": "30px", "top": "90px", "textAlign": "right", "letterSpacing": "8px", "width": "auto" } },
  { "id": "t2", "name": "l-text", "props": { "text": "【占位：大标】", "fontSize": "20px", "color": "#333333", "fontFamily": "'SimSun', 'STSong', serif", "fontWeight": "bold", "right": "30px", "top": "200px", "textAlign": "right", "lineHeight": "1.5", "width": "188px" } },
  { "id": "t3", "name": "l-text", "props": { "text": "【占位：农历与节日】", "fontSize": "14px", "color": "#ffffff", "backgroundColor": "#8b2c20", "borderRadius": "2px", "paddingLeft": "10px", "paddingRight": "10px", "paddingTop": "4px", "paddingBottom": "4px", "right": "30px", "top": "440px", "textAlign": "center", "width": "auto" } },
  { "id": "t4", "name": "l-text", "props": { "text": "【占位：商家文案】", "fontSize": "12px", "color": "#4a4a4a", "fontFamily": "'PingFang SC', '-apple-system', sans-serif", "right": "30px", "top": "480px", "textAlign": "right", "lineHeight": "1.8", "width": "280px" } },
  { "id": "t5", "name": "l-text", "props": { "text": "【占位：用户文案】", "fontSize": "12px", "color": "#4a4a4a", "fontFamily": "'PingFang SC', '-apple-system', sans-serif", "right": "30px", "top": "560px", "textAlign": "right", "lineHeight": "1.8", "width": "280px" } }
]

【模板B：左侧留白排版（文字靠左对齐，强制左边距30px）】
[
  { "id": "t1", "name": "l-text", "props": { "text": "早安", "fontSize": "72px", "color": "#1a1a1a", "fontFamily": "'SimSun', 'STSong', serif", "fontWeight": "bold", "left": "30px", "top": "90px", "textAlign": "left", "letterSpacing": "8px", "width": "auto" } },
  { "id": "t2", "name": "l-text", "props": { "text": "【占位：大标】", "fontSize": "20px", "color": "#333333", "fontFamily": "'SimSun', 'STSong', serif", "fontWeight": "bold", "left": "30px", "top": "200px", "textAlign": "left", "lineHeight": "1.5", "width": "188px" } },
  { "id": "t3", "name": "l-text", "props": { "text": "【占位：农历与节日】", "fontSize": "14px", "color": "#ffffff", "backgroundColor": "#8b2c20", "borderRadius": "2px", "paddingLeft": "10px", "paddingRight": "10px", "paddingTop": "4px", "paddingBottom": "4px", "left": "30px", "top": "440px", "textAlign": "center", "width": "auto" } },
  { "id": "t4", "name": "l-text", "props": { "text": "【占位：商家文案】", "fontSize": "12px", "color": "#4a4a4a", "fontFamily": "'PingFang SC', '-apple-system', sans-serif", "left": "30px", "top": "480px", "textAlign": "left", "lineHeight": "1.8", "width": "280px" } },
  { "id": "t5", "name": "l-text", "props": { "text": "【占位：用户文案】", "fontSize": "12px", "color": "#4a4a4a", "fontFamily": "'PingFang SC', '-apple-system', sans-serif", "left": "30px", "top": "560px", "textAlign": "left", "lineHeight": "1.8", "width": "280px" } }
]
`;

/**
 * 核心引擎：根据背景图和指定日期生成海报 JSON 与 AI 思考过程 (支持流式打字机效果！)
 * @param {string} base64Image - 背景图的 Base64 编码
 * @param {string} userDate - 用户输入的日期
 * @param {Function} onThinking - 【新增】流式接收思考过程的回调函数
 * @returns {Promise<Array>} - 最终只返回解析好的排版数组 layoutData
 */
export async function generatePosterLayout(
  base64Image,
  userDate = "今天",
  onThinking,
) {
  try {
    const response = await client.chat.completions.create({
      model: "kimi-k2.5",
      temperature: 1,
      stream: true, // 🚨 核心魔法：开启流式输出！
      messages: [
        {
          role: "system",
          content: `你是一个拿着顶薪的海报排版总监，同时精通中国传统历法。你的任务是分析图片构图，并在我提供的预设模板中选择最匹配的进行文案填空。

      【极度重要：安全边距锁定】
      由于之前的排版文字贴靠左边过于拥挤，你现在必须设立一个“不可侵犯的安全边距”！
      所有使用 left 属性的组件，其 left 值必须强制在 "30px" 到 "40px" 之间！绝不能设置低于 30px 的值！
      同理，所有使用 right 属性的组件，其 right 值也必须在 "30px" 到 "40px" 之间！

      【核心工作流】
      1. 观察背景图片留白区域，从以下预设模板中挑选【唯一一个】最匹配的模板：
      ${PRESET_TEMPLATES}
      
      2. 🚨 极其重要（防 Bug 指令）：印章和短标题必须保留 "width": "auto"；大标必须保留 "width": "188px"；长段落正文必须保留 "width": "280px"。
      3. **日期换算引擎**：根据用户提供的公历日期(${userDate})，推算对应的星期（如周五）、农历日期（如二月初九）以及当天的节气或传统节日（如果有，如春分）。
      4. 将推算出的日期格式化为：“公历日期 星期 农历 节日”这样的格式（例如："2026.3.27 周五 二月初九 春分"），填入【占位：农历与节日】的小标签中。
      5. 根据图片明暗，可微调 color。
      6. 严格将下方用户提供的【完整长文案】分别填入对应的【占位】符中，对于长文案，请使用 "\\n" 进行优雅的换行处理！
         
      【强制输出格式】
      直接输出修改后的 JSON 数组，绝不要包含 \`\`\`json 等任何多余字符！`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `请分析这张图的构图和明暗，生成排版。
              当前用户指定的日期为：${userDate}。请推算农历和节日。
              
              文案要求：
              【大标】：诚邀体验「星斗堂」文化艺术新生态！
              【商家文案】：商家用户：下载「星斗堂商家」APP，开店0费用入驻，享全程指导与资源支持！现在行动，开启文化艺术之旅！
              【用户文案】：普通用户：微信小程序搜「星斗堂」，或在应用宝、手机应用商城、百度搜索下载APP，畅享文化艺术，交流展示，文创好物。`,
            },
            { type: "image_url", image_url: { url: base64Image } },
          ],
        },
      ],
    });

    let finalJsonString = ""; // 用来在后台悄悄拼接 JSON 的字符串

    // 🚨 魔法循环：像接水滴一样，一滴一滴接住 Kimi 返回的数据
    for await (const chunk of response) {
      // 1. 提取思考过程的碎片（脑电波）
      const thinkingDelta = chunk.choices[0]?.delta?.reasoning_content || "";
      if (thinkingDelta && onThinking) {
        // 只要有思考碎片，立刻丢给 Vue 页面去实时渲染！
        onThinking(thinkingDelta);
      }

      // 2. 提取 JSON 排版数据的碎片
      const contentDelta = chunk.choices[0]?.delta?.content || "";
      if (contentDelta) {
        // JSON 绝对不能立刻渲染，只能在后台默默拼接着...
        finalJsonString += contentDelta;
      }
    }

    // 🚨 循环结束！说明水滴完了，Kimi 已经完整输出了。
    // 这时候我们再开始清洗并解析完整的 JSON
    const cleanJson = finalJsonString
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const layoutData = JSON.parse(cleanJson);

    return layoutData; // 最终把解析好的组件数组交出去
  } catch (error) {
    console.error("AI 排版引擎翻车了:", error);
    return null;
  }
}

/**
 * 将本地图片转换为 Base64，并强制压缩提速！
 */
export async function getStaticImageBase64(imagePath, maxWidth = 800) {
  // ... （这部分代码保持不变，你原来的逻辑是完美的）
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = maxWidth / img.width;
        const width = img.width > maxWidth ? maxWidth : img.width;
        const height = img.width > maxWidth ? img.height * scale : img.height;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
        resolve(compressedBase64);
      };
      img.onerror = reject;
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("图片压缩转换失败:", error);
    return null;
  }
}
