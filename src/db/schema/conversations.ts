import { relations } from 'drizzle-orm';
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { messages } from './messages';
import { users } from './users';

export const conversations = pgTable('conversations', {
  id: integer('id').primaryKey(),
  creatorId: integer('creator_id').notNull(), 
  title: varchar('title').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  creator: one(users, {
    fields: [conversations.creatorId],
    references: [users.id],
  }),
  messages: many(messages), 
}));
