"use client"

import {useState} from "react";
import {changeTodoStatus} from "@/resources/actions";

// TodoCheckbox.jsx

export default function TodoCheckbox({ id, initialStatus }: { id: number, initialStatus: "DONE" | "PENDING" | null }) {
    const [status, setStatus] = useState(initialStatus);

    const handleStatusChange = async () => {
        // @ts-ignore
        const response = await changeTodoStatus(id, status);
        if (response.message.includes('Updated')) {
            setStatus(status === "DONE" ? "PENDING" : "DONE");
        } else {
            console.error(response.message);
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                checked={status === "DONE"}
                onChange={handleStatusChange}
                className="form-checkbox text-blue-500 h-5 w-5"
                id="statusChange"
            />
            <label className="text-gray-700" htmlFor="statusChange">Change Status</label>
        </div>
    );
}
