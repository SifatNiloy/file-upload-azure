import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const endpoint = `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_MODEL_DEPLOYMENT_NAME}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;

export const getAzureAIResponse = async (text: string): Promise<string> => {
  try {
    const response = await axios.post(
      endpoint,
      {
        messages: [
          { role: 'system', content: 'You are a helpful assistant. Extract relevant info from document.' },
          { role: 'user', content: text.slice(0, 3000) },
        ],
        temperature: 0.2
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_OPENAI_API_KEY!,
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (err: any) {
    console.error('❌ Error calling Azure API:', err.response?.data || err.message);
    throw err;
  }
};
