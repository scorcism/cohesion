import { z } from 'zod';
import { conversationMetadataSchema, messageSchema } from '../validations/conversations.validation';

export type CustomResponse = {
    message: string;
    success: boolean;
    data?: any;
    error?: any;
};

export type Message = z.infer<typeof messageSchema>;

export type ConversationMetadata = z.infer<typeof conversationMetadataSchema>;

export type User = {
    userId: string;
    email: string;
    iat: number;
    exp: number;
} | null;
