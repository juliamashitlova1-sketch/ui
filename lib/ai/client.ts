/**
 * PixelForge AI Client — Zhipu GLM
 *
 * Uses Zhipu's OpenAI-compatible API endpoint.
 * Models:
 *   glm-4v       — Vision model for frame analysis
 *   glm-4-flash  — Fast reasoning for transition labeling
 *   glm-4-plus   — Powerful reasoning for code generation
 *
 * API Docs: https://open.bigmodel.cn/dev/api/normal-model/glm-4
 */

const BASE_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
const API_KEY = process.env.ZHIPU_API_KEY || "";

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };
}

export async function analyzeFrames(
  imageUrls: string[],
  prompt: string,
): Promise<string> {
  // Build messages with images for vision model
  const content: any[] = [{ type: "text", text: prompt }];
  for (const url of imageUrls) {
    content.push({ type: "image_url", image_url: { url } });
  }

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      model: "glm-4v",
      messages: [{ role: "user", content }],
      max_tokens: 4096,
      temperature: 0.3,
    }),
  });

  const data = await res.json();
  if (data.error) {
    console.error("Zhipu vision error:", data.error);
    throw new Error(data.error.message || "Vision model error");
  }
  return data.choices?.[0]?.message?.content || "";
}

export async function reason(prompt: string): Promise<string> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      model: "glm-4-flash",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4096,
      temperature: 0.2,
    }),
  });

  const data = await res.json();
  if (data.error) {
    console.error("Zhipu reasoning error:", data.error);
    throw new Error(data.error.message || "Reasoning model error");
  }
  return data.choices?.[0]?.message?.content || "";
}

export async function generate(prompt: string): Promise<string> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      model: "glm-4-plus",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 8192,
      temperature: 0.2,
    }),
  });

  const data = await res.json();
  if (data.error) {
    console.error("Zhipu generation error:", data.error);
    throw new Error(data.error.message || "Generation model error");
  }
  return data.choices?.[0]?.message?.content || "";
}
