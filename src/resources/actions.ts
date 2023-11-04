'use server'

import db from "@/models/db";
import { todos } from "@/models/schema";
import { insertToDoSchema } from "@/models/schema";
import { revalidatePath } from "next/cache";
import {eq} from "drizzle-orm";

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
                title: todos.title,
                description: todos.description,
                status: todos.status
            });

        const dbRequest = await todosDb;
        revalidatePath('/todos/newTodo');
        console.log(JSON.stringify(dbRequest));
        return { message: `Added todo ${dbRequest[0].title}}` }
    } catch (e) {
        return { message: 'Failed to create todo' }
    }
}

export async function deleteTodo(prevState: any, formData: FormData) {
    const schema = insertToDoSchema;
    const data = schema.parse({
        id: formData.get('id'),
        todo: formData.get('todo')
    })
    try {
        const todosDb = db
            .delete(todos)
            //@ts-ignore
            .where(eq(Number(data.id),todos.id))
            .returning({
                title: todos.title
            })

        const dbRequest = await todosDb;
        revalidatePath('/todos');
        console.log(JSON.stringify(dbRequest));
        return { message: `Deleted todo ${dbRequest[0].title}}` }
    } catch (e) {
        return { message: 'Failed to Delete todo' }
    }

}