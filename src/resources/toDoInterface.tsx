import { timestamp } from "drizzle-orm/pg-core"

type ToDo = {
    id?: number | null,
    title: string | null
    description: string | null,
    creation_date: Date | null,
    status: string | null
};

export default ToDo;
