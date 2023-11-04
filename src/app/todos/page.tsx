import Card from "@/components/Card";
import {todos} from "@/models/schema";
import db from "@/models/db";

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
            <div className="p-2">
                <h1>ToDos</h1>
                <div className="flex flex-wrap gap-3.5">
                {dbRequest.map((todo) => (
                    <Card
                        key={todo.id}
                        title={todo.title}
                        status={todo.status}
                        id={todo.id}
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