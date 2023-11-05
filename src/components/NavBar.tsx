'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();

    return (
        <div className="bg-gradient-to-r from-ultramarine-500 to-primary-500 p-4 pl-11 rounded-2xl m-[0.5rem] shadow-lg">
            <div className="flex justify-between">
                <div className="flex space-x-5">
                    <Link href="/todos" passHref className={`py-2 px-4 font-bold rounded-lg shadow-md text-white hover:bg-primary-300 hover:text-ultramarine-500 transition duration-300 ${pathname === '/todos' ? 'bg-primary-300 text-ultramarine-500' : ''}`}>
                        All Todos
                    </Link>
                    <Link href="/todos/newTodo" passHref className={`py-2 px-4 font-bold rounded-lg shadow-md text-white hover:bg-primary-300 hover:text-ultramarine-500 transition duration-300 ${pathname === '/todos/newTodo' ? 'bg-primary-300 text-ultramarine-500' : ''}`}>
                        New Todo
                    </Link>
                </div>
            </div>
        </div>
    )
}
