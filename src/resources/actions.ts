'use server'

import db from "@/models/db";
import {insertToDoSchema, todos} from "@/models/schema";
import {revalidatePath} from "next/cache";
import {eq} from "drizzle-orm";
import {redirect, RedirectType} from "next/navigation";

export async function createTodo(prevState: any, formData: FormData) {
    const schema = insertToDoSchema;
    const data = schema.parse({
        title: formData.get('title'),
        description: formData.get('description'),
        status: formData.get('status')
    });
    let dbRequest;
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

        dbRequest = await todosDb;
        revalidatePath('/todos/newTodo');
        console.log(JSON.stringify(dbRequest));
    } catch (e) {
        return { message: 'Failed to create todo' }
    }
    redirect(`/todos/${dbRequest[0].id}`, RedirectType.replace);
}


export async function deleteTodo(prevState: any, formData: FormData) {
    const schema = insertToDoSchema;
    const data = schema.parse({
        id: parseInt(formData.get('id') as string,10),
        todo: formData.get('todo')
    })
    try {
        const todosDb = db
            .delete(todos)
            .where(eq(todos.id,data.id as number))
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

export async function updateTodo(prevState: any, formData: FormData) {
    const schema = insertToDoSchema;
    const data = schema.parse({
        id: formData.get('id') ? parseInt(formData.get('id').toString(), 10) : 0, // Default value of 0 if null
        status: formData.get('status'),
        title: formData.get('title'),
        description: formData.get('description')
    });
    const todosDb = await db
            .update(todos)
            .set({
                title: data.title,
                description: data.description,
                status: data.status
            })
            .where(eq(todos.id,data.id as number))
            .returning({
                id: todos.id,
                title: todos.title
            })

        revalidatePath(`/todos/edit/${data.id}`);
        console.log(JSON.stringify(todosDb));
        redirect(`/todos/${data.id}`)
}

export async function getTodoById(id: number) {
    try {
        const todosDb = db
            .select({
                id: todos.id,
                title: todos.title,
                description: todos.description,
                creation_date: todos.creation_date,
                status: todos.status,
            })
            .from(todos)
            .where(eq(todos.id, id));
    const dbRequest = await todosDb;

        return { data: dbRequest[0] }
    } catch (error) {
        return { message: 'Failed to get todo' }
    }
}

export async function changeTodoStatus(id: number, currentStatus: "DONE" | "PENDING") {
    const newStatus = currentStatus === "DONE" ? "PENDING" : "DONE";
    try {
        const todosDb = await db
            .update(todos)
            .set({
                status: newStatus
            })
            .where(eq(todos.id, id))
            .returning({
                id: todos.id,
                status: todos.status
            });

        revalidatePath(`/todos/${id}`);
        console.log(JSON.stringify(todosDb));
        return { message: `Updated todo ${todosDb[0].id} status to ${todosDb[0].status}` };
    } catch (e) {
        return { message: 'Failed to update todo status' };
    }
}