import {pgTable, pgEnum, serial, text, timestamp, varchar, check} from 'drizzle-orm/pg-core';
import {sql} from "drizzle-orm";
import { createInsertSchema, createSelectSchema} from "drizzle-zod";

export const todoStatus = pgEnum('todo_status', ['DONE', 'PENDING']);

export const todos = pgTable('todos', {
    id: serial('id').primaryKey(),
    title: varchar('title', {length: 255}),
    description: text('description'),
    creation_date: timestamp('creation_date').default(sql`now()`),
    status: todoStatus('status').default("PENDING"),
});

export const insertToDoSchema = createInsertSchema(todos);
