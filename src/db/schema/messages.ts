import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { conversations } from './conversations';

export const messages = pgTable('messages', {
  id: integer('id').primaryKey(),
  conversationId: integer('conversation_id').notNull(),
  userMessage: text('user_message').notNull(),
  aiResponse: text('ai_response').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}));
