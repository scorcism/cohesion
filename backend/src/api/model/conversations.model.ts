import { and, eq, sql } from 'drizzle-orm';
import { db } from '../../db';
import { conversations } from '../../db/schema/conversations';
import { messages } from '../../db/schema/messages';
import { ApiError } from '../../utils/ApiError';

type NewConversation = typeof conversations.$inferInsert;
type NewMessage = typeof messages.$inferInsert;

class ConversationModel {
    async createConversation(id: string, title: string, userId: string) {
        // Create new converation with id and title and return the id
        try {
            const _create = await db.insert(conversations).values({
                id: id,
                title: title,
                creatorId: userId,
            } as NewConversation);

            return !!_create;
        } catch (error: any) {
            console.log({ createConversation: error });
            throw new ApiError(500, 'Error while creating conversation');
        }
    }

    async getConversations(userId: string) {
        try {
            const _conversations = await db
                .select({
                    title: conversations.title,
                    id: conversations.id,
                    createdAt: conversations.createdAt,
                })
                .from(conversations)
                .orderBy(sql`${conversations.createdAt} desc`)
                .where(eq(conversations.creatorId, userId));

            return _conversations;
        } catch (error: any) {
            console.log({ createConversation: error });
            throw new ApiError(500, 'Error while creating conversation');
        }
    }

    async getMessages(convId: string) {
        try {
            const _messages = await db
                .select({
                    id: messages.id,
                    role: messages.role,
                    content: messages.content,
                    model: messages.model,
                    createdAt: messages.createdAt,
                })
                .from(messages)
                .orderBy(sql`${messages.createdAt} asc`)
                .where(eq(messages.conversationId, convId));
            return _messages;
        } catch (error: any) {
            console.log({ createConversation: error });
            throw new ApiError(500, 'Error while creating messages');
        }
    }

    async deleteConversation(userId: string, convId: string) {
        try {
            await db.transaction(async (trx) => {
                await trx.delete(messages).where(eq(messages.conversationId, convId));

                await trx
                    .delete(conversations)
                    .where(and(eq(conversations.id, convId), eq(conversations.creatorId, userId)));
            });

            return true;
        } catch (error: any) {
            console.log({ deleteConversation: error });
            throw new ApiError(500, 'Error while deleting conversation');
        }
    }

    async updateConversationName(userId: string, convId: string, newTitle: string) {
        try {
            const updatedConversation = await db
                .update(conversations)
                .set({ title: newTitle })
                .where(and(eq(conversations.id, convId), eq(conversations.creatorId, userId)));

            return !!updatedConversation;
        } catch (error: any) {
            console.log({ updateConversationName: error });
            throw new ApiError(500, 'Error while updating conversation name');
        }
    }

    async saveMessage(role: string, content: string, model: string, conversationId: string) {
        // save message to db
        try {
            const _create = await db.insert(messages).values({
                content: content,
                conversationId: conversationId,
                model: model,
                role: role,
            } as NewMessage);

            return !!_create;
        } catch (error) {
            console.log({ saveMessage: error });
            throw new ApiError(500, 'Error while adding message to db');
        }
    }
}

export const conversationModel = new ConversationModel();
