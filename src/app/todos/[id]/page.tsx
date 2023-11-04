import Card from "@/components/Card";
import {todos} from "@/models/schema";
import db from "@/models/db";
import {eq} from "drizzle-orm";
import {DeleteForm} from "@/components/DeleteTodoForm";


export default async function Page({params}: { params: { id: string } }) {
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
            .where(eq(todos.id, byId))
        const dbRequest = await todosDb
        return (
            <div className="p-2">
                <h1 className="m-1">ToDo</h1>
                <div className="flex flex-wrap gap-3.5">
                    <Card
                        key={dbRequest[0].id}
                        title={dbRequest[0].title}
                        status={dbRequest[0].status}
                        description={dbRequest[0].description}
                        creation_date={dbRequest[0].creation_date}
                    />
                    <DeleteForm
                        id={dbRequest[0].id}
                        todo={dbRequest[0].title}
                    />
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