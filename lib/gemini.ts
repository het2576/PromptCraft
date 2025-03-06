// Alternative implementation using fetch API directly
export async function generatePrompt(category: string, context: string = ''): Promise<string> {
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  
  const prompts = {
    chatgpt: "Generate a detailed, well-structured ChatGPT prompt that",
    art: "Create a detailed Midjourney art prompt that",
    coding: "Write a technical programming prompt that",
    marketing: "Generate a marketing/SEO prompt that"
  };

  const basePrompt = `${prompts[category as keyof typeof prompts]} ${context}. Make it detailed and specific.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: basePrompt }]
        }]
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating prompt:', error);
    throw new Error('Failed to generate prompt');
  }
}