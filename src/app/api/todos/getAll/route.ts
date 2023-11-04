import {NextRequest, NextResponse} from 'next/server';
import db from "@/models/db";
import {todos} from "@/models/schema";
import {NextApiRequest, NextApiResponse} from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const todosDb   = await db
            .select({
                id: todos.id,
                title: todos.title,
                description: todos.description,
                creation_date: todos.creation_date,
                status: todos.status
            })
            .from(todos)

        return NextResponse.json({ data: todosDb }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
