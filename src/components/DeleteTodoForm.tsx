'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { deleteTodo } from '@/resources/actions'

const initialState = {
    message: null,
}

function DeleteButton() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" aria-disabled={pending}>
            Delete
        </button>
    )
}

export function DeleteForm({ id }) {
    const [state, formAction] = useFormState(deleteTodo, initialState)
    const numId = parseInt(id,10)
    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={numId} />
            <DeleteButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}