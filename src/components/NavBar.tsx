import Link from "next/link";

export default function NavBar() {
    return (
        <div className="bg-gray-800 p-4 rounded-2xl m-[0.5rem]">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        <div className="flex space-x-5">
                            <Link href="/todos" className="text-white">
                                All Todos
                            </Link>
                            <Link href="/todos/newTodo" className="text-white">
                                New Todo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
