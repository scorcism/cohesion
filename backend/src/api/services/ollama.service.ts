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
            success: false,
            error: JSON.stringify(error),
        };
    }
};

export const ollamaService = { getTags };
