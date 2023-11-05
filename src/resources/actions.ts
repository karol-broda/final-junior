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
        id: parseInt(<string>formData.get('id'),10),
        todo: formData.get('todo')
    })
    try {
        const todosDb = db
            .delete(todos)
            //@ts-ignore
            .where(eq(data.id,todos.id))
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
        id: parseInt(<string>formData.get('id'),10),
        status: formData.get('status'),
        title: formData.get('title'),
        description: formData.get('description')
    })
    try {
        const todosDb = db
            .update(todos)
            .set({
                title: data.title,
                description: data.description,
                status: data.status
            })
            //@ts-ignore
            .where(eq(data.id,todos.id))
            .returning({
                id: todos.id,
                title: todos.title
            })

        const dbRequest = await todosDb;
        revalidatePath(`/todos/${data.id}`);
        console.log(JSON.stringify(dbRequest));
        return { message: `Updated todo ${dbRequest[0].title}}` }
    } catch (e) {
        return { message: 'Failed to Update todo' }
    }
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
        const todosDb = db
            .update(todos)
            .set({
                status: newStatus
            })
            .where(eq(todos.id, id))
            .returning({
                id: todos.id,
                status: todos.status
            });

        const dbRequest = await todosDb;
        revalidatePath(`/todos/${id}`);
        console.log(JSON.stringify(dbRequest));
        return { message: `Updated todo status to ${dbRequest[0].status}` };
    } catch (e) {
        return { message: 'Failed to update todo status' };
    }
}