import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const endpoint = `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_MODEL_DEPLOYMENT_NAME}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;

export const getAzureAIResponse = async (text: string): Promise<string> => {
  const prompt = `
Here is the content from a document:
"""${text.slice(0, 3000)}"""

🔹 Generate 3 quiz questions  
🔹 Generate 3 MCQs with 4 options (indicate the correct one)  
🔹 Generate 3 flashcards in Q&A format  
`;

  try {
    const response = await axios.post(
      endpoint,
      {
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates educational content like quizzes, MCQs, and flashcards.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_OPENAI_API_KEY!,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err: any) {
    console.error('❌ Azure OpenAI API Error:', err.response?.data || err.message);
    throw err;
  }
};
