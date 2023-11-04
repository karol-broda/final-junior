'use client'

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'
import { useFormStatus } from "react-dom";
import { createTodo } from "@/app/todos/newTodo/actions";

const initialState:{id: null | number, error: null | string} = {
    error: null,
    id: null
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <div className="mt-6">
            <button aria-disabled={pending} type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add Todo</button>
        </div>
    )
}

export default function NewTodoForm() {
    const [state, formAction] = useFormState(createTodo, initialState)

    return (
        <form id="todoForm" action={formAction}>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-600 font-medium">Title</label>
                <input type="text" id="title" name="title" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" required />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-600 font-medium">Description</label>
                <textarea id="description" name="description" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 rows-4"></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="block text-gray-600 font-medium">Status</label>
                <select id="status" name="status" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
                    <option value="PENDING">Pending</option>
                    <option value="DONE">Done</option>
                </select>
            </div>
            <SubmitButton />
            <p aria-live="polite" className={state?.error ? "sr-only" : "sr-only invisible"} role="status">
                {state?.error}
            </p>
        </form>

    )
}