import { Request, Response } from 'express';
import { extractTextFromFile } from '../services/extractor.service';
import { getAzureAIResponse } from '../services/azure-openai.service';
export const handleUpload = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const text = await extractTextFromFile(file);
    const answer = await getAzureAIResponse(text);

    res.json({ extracted: text.slice(0, 500), answer });
  } catch (error: any) {
    console.error('❌ Error in handleUpload:', error);
    res.status(500).json({
      message: 'Failed to process file',
      error: error.message || 'Unknown error'
    });
  }
};
