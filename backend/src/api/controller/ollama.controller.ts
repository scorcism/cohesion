import { Request, Response } from 'express';
import { ollamaService } from '../services/ollama.service';

const getTags = async (request: Request, response: Response) => {
  const res = await ollamaService.getTags();
  response.status(res.success ? 200 : 400).json({ ...res });
};

export const ollamaController = { getTags };
