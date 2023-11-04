import {NextRequest, NextResponse} from 'next/server';
import db from "@/models/db";
import {todos} from "@/models/schema";
import {eq} from "drizzle-orm";

export async function GET(
    request: Request,
    { params }: { params: { ID: string } }
) {
    const byId = params.ID
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
            .where(eq(todos.id, Number(byId)))

        return NextResponse.json({ data: todosDb }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}