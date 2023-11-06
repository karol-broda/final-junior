'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { deleteTodo } from '@/resources/actions'

const initialState = {
    message: null,
}

function DeleteButton() {
    const { pending } = useFormStatus()
    return (
        <button className="bg-red-600 p-2 rounded-2xl" type="submit" disabled={pending}>
            Delete
        </button>
    )
}

export function DeleteForm({ id }: { id: number }) {
    const [state, formAction] = useFormState(deleteTodo, initialState)
    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <DeleteButton />
        </form>
    )
}