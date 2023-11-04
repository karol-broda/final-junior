'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { deleteTodo } from '@/resources/actions'

const initialState = {
    message: null,
}

function DeleteButton() {
    const { pending } = useFormStatus()
    return (
        <button className="bg-red-600 p-2 rounded-2xl" type="submit" aria-disabled={pending}>
            Delete
        </button>
    )
}

// @ts-ignore
export function DeleteForm({ id }) {
    const [state, formAction] = useFormState(deleteTodo, initialState)
    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <DeleteButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}