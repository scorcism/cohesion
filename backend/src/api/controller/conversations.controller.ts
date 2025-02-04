import { Request, Response } from 'express';
import { convsScma } from '../../validations/conversations.validation';
import { validate } from '../../validations/validate';
import { conversationsService } from '../services/conversations.service';

const createNewConversation = async (request: Request, response: Response) => {
    const _validate = await validate(request.body, convsScma.createConversation);
    const { messages, model, conversationMetadata } = _validate;

    const user: any = request.user;

    await conversationsService.createNewConversation(
        response,
        messages,
        model,
        conversationMetadata,
        user ? user.userId : null,
    );
};

const getConversations = async (request: Request, response: Response) => {
    const user: any = request.user;
    const _res = await conversationsService.getConversations(user ? user.userId : null);
    response.status(_res.success ? 200 : 400).json(_res);
};

const getMessages = async (request: Request, response: Response) => {
    const { convId } = request.params;

    const user: any = request.user;

    const _res = await conversationsService.getMessages(convId, user ? user.userId : null);
    response.status(_res.success ? 200 : 400).json(_res);
};

const chat = async (request: Request, response: Response) => {
    const { messages, model, convId } = request.body;
    const user: any = request.user;

    await conversationsService.chat(response, model, messages, convId, user ? user.userId : null);
};

export const conversationsController = {
    chat,
    createNewConversation,
    getConversations,
    getMessages,
};
