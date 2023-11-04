import { NextApiRequest, NextApiResponse } from 'next';
import db from "@/models/db";
import { todos } from "@/models/schema";
import { eq } from "drizzle-orm";
import {NextResponse} from "next/server";

export async function POST(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { title, description, status } = req.body;

    try {
        const todosDb = await db
            .insert(todos)
            .values({
                title: title,
                description: description,
                status: status
            })
            .returning({
                id: todos.id,
            });

        const dbRequest = await todosDb;
        const id = dbRequest[0].id;

    } catch (error) {
        res.status(500).json({ error: error });
    }
}
