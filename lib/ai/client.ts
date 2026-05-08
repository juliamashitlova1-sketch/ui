type AIModel = {
  provider: 'openai' | 'anthropic'
  apiKey: string
  visionModel: string  // gpt-4o or claude-3-5-sonnet
  reasoningModel: string  // gpt-4o or claude-3-5-sonnet
}

function getModel(): AIModel {
  // Default to OpenAI, can override via env vars
  const provider = (process.env.AI_PROVIDER || 'openai') as 'openai' | 'anthropic'
  return {
    provider,
    apiKey: provider === 'openai'
      ? process.env.OPENAI_API_KEY!
      : process.env.ANTHROPIC_API_KEY!,
    visionModel: provider === 'openai' ? 'gpt-4o' : 'claude-3-5-sonnet-20241022',
    reasoningModel: provider === 'openai' ? 'gpt-4o' : 'claude-3-5-sonnet-20241022',
  }
}

export async function analyzeFrames(imageUrls: string[], prompt: string): Promise<string> {
  const model = getModel()

  if (model.provider === 'openai') {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${model.apiKey}` },
      body: JSON.stringify({
        model: model.visionModel,
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            ...imageUrls.map(url => ({ type: 'image_url' as const, image_url: { url } }))
          ]
        }],
        max_tokens: 4096,
        temperature: 0.3,
      })
    })
    const data = await res.json()
    return data.choices[0].message.content
  }

  // Anthropic
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': model.apiKey, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: model.visionModel,
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          ...imageUrls.map(url => ({ type: 'image' as const, source: { type: 'url' as const, url } }))
        ]
      }]
    })
  })
  const data = await res.json()
  return data.content[0].text
}

export async function reason(prompt: string): Promise<string> {
  const model = getModel()

  if (model.provider === 'openai') {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${model.apiKey}` },
      body: JSON.stringify({
        model: model.reasoningModel,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4096,
        temperature: 0.2,
      })
    })
    const data = await res.json()
    return data.choices[0].message.content
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': model.apiKey, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: model.reasoningModel,
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }]
    })
  })
  const data = await res.json()
  return data.content[0].text
}
