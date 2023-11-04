import Card from "@/components/Card";
import {todos} from "@/models/schema";
import db from "@/models/db";
import Link from "next/link";
import {DeleteForm} from "@/components/DeleteTodoForm";

export default async function Page() {
    const todosDb = db
        .select({
            id: todos.id,
            title: todos.title,
            description: todos.description,
            creation_date: todos.creation_date,
            status: todos.status
        })
        .from(todos)
    try {
        const dbRequest = await todosDb
        return (
                <main>
                <h1 className="m-1">All Todos</h1>
                <div className="flex flex-wrap gap-3.5">
                    {dbRequest.map((todo) => (
                        <div key={todo.id} className="m-4">
                            <Link href={`/todos/${todo.id}`}>
                                    <Card
                                        title={todo.title}
                                        status={todo.status}
                                        description={todo.description}
                                        creation_date={todo.creation_date}
                                    />
                            </Link>
                        </div>
                    ))}
                </div>
                </main>
        )
    } catch (error) {
        console.error(error)
        return <div>
            <h1>Something went wrong</h1>
            <p>{String(error)}</p>
        </div>
    }
}