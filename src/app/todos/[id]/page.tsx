'use client'

import { DeleteForm } from "@/components/DeleteTodoForm";
import { redirect } from "next/navigation";
import { UpdateForm } from "@/components/ChangeTodoForm";
import {useEffect, useState} from "react";

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const [todo, setTodo] = useState({} as any);
        const [edit, setEdit] = useState(false);
        const byId = Number(params.id);
        useEffect(()=>{
            fetch(`/api/todos/${byId}`)
                .then(res => res.json())
                .then(data => setTodo(data))
                .catch(err => console.error(err))
        }, [])
        return (
            <div className="p-2">
                <div className="flex flex-wrap gap-3.5 justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                        {!edit ? <>
                                <h2 className="text-xl font-bold mb-2">{todo.title}</h2><p
                                className="text-gray-700 mb-2">{todo.description}</p>
                                {/* @ts-ignore */}
                                <p className="text-gray-500">Created on: {todo.creation_date.toLocaleDateString()}</p>
                                <p className="text-green-500">{todo.status}</p>
                            </>
                            :
                            <UpdateForm todo={todo}/>
                        }
                        <p onClick={() => setEdit(!edit)}>Toggle Edit</p>

                        <DeleteForm
                            id={todo.id}
                            todo={todo.title}
                        />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error(error);
        redirect("/todos");
    }
}