import { z } from 'zod';

export const messageSchema = z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
});

export const conversationMetadataSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
});

export const conversationSchema = z.object({
    messages: z.array(messageSchema),
    model: z.string(),
    conversationMetadata: conversationMetadataSchema,
});


export const convsScma = {
    createConversation: conversationSchema,
};
