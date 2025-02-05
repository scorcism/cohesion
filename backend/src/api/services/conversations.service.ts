import { Response } from 'express';
import ollama from 'ollama';
import { ConversationMetadata, Message } from '../../types/common';
import { conversationModel } from '../model/conversations.model';

const saveMessage = async (role: string, content: string, model: string, convId: string) => {
    try {
        return !!(await conversationModel.saveMessage(role, content, model, convId));
    } catch (error) {
        console.error('Error saving message:', error);
        throw error;
    }
};

const createNewConversation = async (
    response: Response,
    messages: Message[],
    model: string,
    conversationMetadata: ConversationMetadata,
    userId: string | null,
) => {
    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');

    try {

        if (userId) {
            const { id, title } = conversationMetadata;
            const lastMessage = messages[messages.length - 1];

            await Promise.all([
                conversationModel.createConversation(id, title, userId),
                saveMessage(lastMessage.role, lastMessage.content, model, id),
            ]);
        }
        if(userId) response.write(`metadata: ${JSON.stringify(conversationMetadata)}`);
        await streamChatResponse(response, model, messages, conversationMetadata.id, userId);
    } catch (error) {
        console.error('Error while creating new conversation:', error);
        return {
            message: 'Error while creating new conversation',
            success: false,
            error: JSON.stringify(error),
        };
    }
};

const streamChatResponse = async (
    res: Response,
    model: string,
    messages: Message[],
    convId: string,
    userId: string | null,
) => {
    try {
        const response = await ollama.chat({
            model: model,
            messages: messages,
            stream: true,
        });
        let aiResponse = ``;
        for await (const chunk of response) {
            aiResponse += chunk.message.content;
            res.write(`data: ${JSON.stringify(chunk)}\n\n`);
        }   

        res.write('data: [DONE]\n\n');
        res.end();
        if (convId && userId) {
            // save ai respons to db
            saveMessage('assistent', aiResponse, model, convId);
        }
    } catch (error) {
        console.error('Streaming error:', error);
        res.write('data: Error while processing\n\n');
        res.end();
    }
};

const chat = async (
    response: Response,
    model: string,
    messages: Message[],
    convId: string,
    userId: string | null,
) => {
    try {
        response.setHeader('Content-Type', 'text/event-stream');
        response.setHeader('Cache-Control', 'no-cache');
        response.setHeader('Connection', 'keep-alive');

        const lastMessage = messages[messages.length - 1];

        if (userId) {
            await saveMessage(lastMessage.role, lastMessage.content, model, convId);
        }
        await streamChatResponse(response, model, messages, convId, userId);
    } catch (error) {
        console.error('Error during chat conversation:', error);
        return {
            message: 'Error while processing chat conversation',
            success: false,
            error: JSON.stringify(error),
        };
    }
};

const getConversations = async (userId: string) => {
    try {
        const _convsList = await conversationModel.getConversations(userId);

        return {
            message: '',
            success: true,
            data: _convsList,
        };
    } catch (error) {
        return {
            message: 'Erorr while getting conversations list',
            success: false,
            error: JSON.stringify(error),
        };
    }
};

const getMessages = async (convId: string, userId: string | null) => {
    try {
        const _messages = await conversationModel.getMessages(convId);

        return {
            message: '',
            success: true,
            data: _messages,
        };
    } catch (error) {
        return {
            message: 'Erorr while getting conversations list',
            success: false,
            error: JSON.stringify(error),
        };
    }
};

export const conversationsService = {
    chat,
    getConversations,
    getMessages,
    createNewConversation,
    streamChatResponse,
};
