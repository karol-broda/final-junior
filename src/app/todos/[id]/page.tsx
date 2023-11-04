import Card from "@/components/Card";
import {todos} from "@/models/schema";
import db from "@/models/db";
import {eq} from "drizzle-orm";


export default async function Page({ params }: { params: { id: string } }) {
    try {

    const byId = Number(params.id)
    console.log(byId)
    console.log(typeof byId)
    const todosDb = db
        .select({
            id: todos.id,
            title: todos.title,
            description: todos.description,
            creation_date: todos.creation_date,
            status: todos.status
        })
        .from(todos)
        .where(eq(todos.id,byId))
        const dbRequest = await todosDb
        return (
            <div className="p-2">
                <h1>ToDo {byId}</h1>
                <div className="flex flex-wrap gap-3.5">
                    {dbRequest.map((todo) => (
                        <Card key={todo.id}
                              title={todo.title}
                              status={todo.status}
                              description={todo.description}
                              creation_date={todo.creation_date}

                        />
                    ))}
                </div>
            </div>
        )
    } catch (error) {
        console.error(error)
        return <div>
            <h1>Something went wrong</h1>
            <p>{String(error)}</p>
        </div>
    }
}