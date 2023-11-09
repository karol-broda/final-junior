import { UpdateForm } from '@/components/ChangeTodoForm'
import db from "@/models/db";
import {todos} from "@/models/schema";
import {eq} from "drizzle-orm";

export default async function Page({ params }: { params: { id: string }}){
    const byId = Number(params.id);
    console.debug(byId)
    const todosDb = await db
        .select()
        .from(todos)
        .where(eq(todos.id, byId));
    return(
        <main>
            <UpdateForm todo={todosDb[0]} />
        </main>
    )
}