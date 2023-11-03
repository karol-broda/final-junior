import {NextRequest, NextResponse} from 'next/server';
import type ToDo from "@/resources/toDoInterface";
import db from "@/models/db";
import {todos} from "@/models/schema";
import {NextApiRequest, NextApiResponse} from "next";


/*export async function GET(req: NextRequest, res: NextResponse) {
    const url = new URL(req.url);
    try {
        const todosDb = await db
            .select({
                title: todos.title,
                description: todos.description,
                creationDate: todos.creationDate,
                status: todos.status
            })
            .from(todos);
        //res.status(200).json(todosDb);
        return new Response(JSON.stringify(todosDb), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}*/


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    // ⨯ TypeError: Cannot read properties of undefined (reading 'unsafe')
    const todosDb = await db
        .select({
            title: todos.title,
            description: todos.description,
            creationDate: todos.creationDate,
            status: todos.status
        })
        .from(todos);

    return NextResponse.json(JSON.stringify(todosDb), {
        status: 200,
    });
}