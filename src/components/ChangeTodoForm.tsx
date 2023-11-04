'use client'

import {useFormState, useFormStatus} from 'react-dom'
import {updateTodo} from '@/resources/actions'
import ToDo from "@/resources/toDoInterface";
import {useState} from "react";

const initialState = {
    message: null,
}

function UpdateButton() {
    const { pending } = useFormStatus()
    return (
        <button className="bg-green-600 p-2 rounded-2xl" type="submit" aria-disabled={pending}>
            Update
        </button>
    )
}

export function UpdateForm({todo}: { todo: ToDo }) {
    const [state, formAction] = useFormState(updateTodo, initialState)
    return (
        <form>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-600 font-medium">Title</label>
                <input type="text" id="title" name="title"
                       className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                       value={todo.title}
                       />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-600 font-medium">Description</label>
                <textarea id="description" name="description"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 rows-4"
                value={todo.description}></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="block text-gray-600 font-medium">Status</label>
                <select id="status" name="status"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                defaultValue={String(todo.status)}>
                    <option value="PENDING">Pending</option>
                    <option value="DONE">Done</option>
                </select>
            </div>
            <UpdateButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}