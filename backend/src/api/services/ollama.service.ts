import ollama, { ListResponse } from 'ollama';
import { CustomResponse, Message } from '../../types/common';

const getTags = async (): Promise<CustomResponse> => {
    try {
        const _res = await ollama.list();
        return {
            data: _res as ListResponse,
            message: 'List of avaible tags',
            success: true,
        };
    } catch (error) {
        return {
            message: 'Erorr while get tags',
            success: true,
            error: JSON.stringify(error),
        };
    }
};

// any as types issue: https://github.com/ollama/ollama-js/issues/135
const chat = async (model: string, messages: Message[]): Promise<any> => {
    try {
        const response = await ollama.chat({
            model: model,
            messages: messages,
            stream: true,
        });

        return response;
    } catch (error) {
        console.log({ error });
        return {};
    }
};

export const ollamaService = { getTags, chat };
