import React from "react";
import CardProps from "../resources/toDoInterface";
import Link from "next/link";

export default function Card({id , title, description, creation_date , status}: CardProps) {
    return (
        <Link href={id?"/todos":`/todos/${id}`}>
            <div className="max-w-full mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="p-8">
                        <div className={status==="DONE"?"uppercase tracking-wide text-sm text-green-500 font-semibold":"uppercase tracking-wide text-sm text-indigo-500 font-semibold"}>
                            {status}
                        </div>
                        <h1 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                            {title}
                        </h1>
                        <p className="mt-2 text-gray-700">
                            {description}
                        </p>
                        <p className="mt-2 text-gray-700">
                            Created on: {creation_date?.toLocaleDateString() ?? "No date"}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};