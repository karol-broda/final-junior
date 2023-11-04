'use server'

import db from "@/models/db";
import { todos } from "@/models/schema";
import { insertToDoSchema } from "@/models/schema";
import { revalidatePath } from "next/cache";

export async function createTodo(prevState: any, formData: FormData) {

    const schema = insertToDoSchema;
    const data = schema.parse({
        title: formData.get('title'),
        description: formData.get('description'),
        status: formData.get('status')
    })
    try {

        const todosDb = db
            .insert(todos)
            .values({
                title: data.title,
                description: data.description,
                status: data.status
            })
            .returning({
                id: todos.id,
            });

        const dbRequest = await todosDb;

        revalidatePath('/todos/newTodo');

        const toDoId = dbRequest[0].id;
        return { id: toDoId }
    } catch (error) {
        return { error: error }
    }

}