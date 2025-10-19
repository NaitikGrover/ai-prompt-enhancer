import { GoogleGenAI } from "@google/genai";

const baseSystemInstruction = `You are an expert in AI prompt engineering. Your task is to take a user's simple prompt and transform it into a highly detailed, effective, and structured prompt for a generative AI model.

Follow these rules for enhancement:
1.  **Clarify the Goal:** Identify the core objective of the user's prompt.
2.  **Add Context:** Provide relevant background information that the AI might need.
3.  **Define the Persona/Role:** Specify the role the AI should adopt (e.g., "You are a marketing expert," "Act as a senior software engineer").
4.  **Specify the Format:** Clearly define the desired output format (e.g., JSON, markdown table, a list of bullet points, a formal report).
5.  **Include Constraints:** Add any limitations or rules the AI must follow (e.g., "use a friendly tone," "avoid technical jargon," "the response must be under 500 words").
6.  **Provide Examples:** Where helpful, include a brief example of the desired input and output.
7.  **Structure the Prompt:** Organize the prompt into logical sections like "Role," "Task," "Context," "Format," and "Constraints."`;

export const enhancePrompt = async (
    prompt: string, 
    promptType: string,
    promptLength: string,
    apiKey: string,
): Promise<string> => {
    
  if (!apiKey) {
    throw new Error("API Key is missing. Please provide your API key.");
  }

  const ai = new GoogleGenAI({ apiKey });
    
  let formatInstruction = `The final output should be a single block of text formatted as a **${promptType}**.`;
  if (promptType === 'Default') {
      formatInstruction = 'The final output should be a well-structured, enhanced prompt.';
  } else if (promptType.toLowerCase() === 'json') {
      formatInstruction = 'The final output MUST be only the raw JSON text content as requested by the user\'s original intent. Do not include any other explanatory text or markdown formatting.'
  }
    
  let dynamicInstruction = `${baseSystemInstruction}\n\nBased on the user's request, you will generate ONLY the enhanced prompt text. Do not add any extra explanations, greetings, or sign-offs. Your response should be ready to be copied and pasted directly into another AI tool.\n\nThe response should have a **${promptLength}** level of detail. ${formatInstruction}`;
    
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: `Enhance this prompt: "${prompt}"`,
      config: {
        systemInstruction: dynamicInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            localStorage.removeItem('gemini-api-key');
            throw new Error('The provided API Key is invalid. Please refresh and enter a valid key.');
        }
        throw new Error(`Failed to enhance prompt with Gemini API: ${error.message}`);
    }
    throw new Error("An unknown error occurred while enhancing the prompt.");
  }
};
