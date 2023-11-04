import Card from "@/components/Card";
import {todos} from "@/models/schema";
import db from "@/models/db";
import {eq} from "drizzle-orm";
import {DeleteForm} from "@/components/DeleteTodoForm";
import {redirect} from "next/navigation";

export default async function Page({params}: { params: { id: string } }) {
    try {
        const byId = Number(params.id);
        console.log(byId);
        console.log(typeof byId);
        const todosDb = db
            .select({
                id: todos.id,
                title: todos.title,
                description: todos.description,
                creation_date: todos.creation_date,
                status: todos.status
            })
            .from(todos)
            .where(eq(todos.id, byId));
        const todosArray = await todosDb;
        const dbRequest = todosArray[0];
        // @ts-ignore
        return (
            <main className="bg-gray-100 min-h-screen p-4">
                <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-4 text-center">ToDo</h1>
                    <div className="flex flex-wrap gap-4">
                        <div key={dbRequest.id} className="card p-4 bg-gray-50 rounded-md shadow w-full">
                            <h1 className="text-xl font-semibold mb-2">{dbRequest.title}</h1>
                            <p className="mb-1">Status: {dbRequest.status}</p>
                            <p className="mb-1">Description: {dbRequest.description}</p>
                            {/* @ts-ignore */}
                            <p className="mb-1">Creation Date: {dbRequest.creation_date.toLocaleDateString()}</p>
                            <DeleteForm id={dbRequest.id} />
                        </div>
                    </div>
                </div>
            </main>
        );

    } catch (error) {
        console.error(error);
        redirect("/todos");
    }
}
