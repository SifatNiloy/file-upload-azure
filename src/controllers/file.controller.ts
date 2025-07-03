import fs from 'fs';
import { Request, Response } from 'express';
import { extractTextFromFile } from '../services/extractor.service';
import { getAzureAIResponse } from '../services/azure-openai.service';
export const handleUpload = async (req: Request, res: Response): Promise<void> => {
  const file = req.file;

  try {
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
  } finally {
    // ✅ Always clean up the file
    if (file?.path) {
      fs.unlink(file.path, (err: any) => {
        if (err) console.error('❌ Failed to delete file:', err);
        else console.log('🧹 File deleted:', file.path);
      });
    }
  }
};