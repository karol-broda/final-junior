import CardProps from "../resources/toDoInterface";

export default function Card({title, description, creation_date , status}: CardProps) {
    const getStatusClass = (status:string|any) => {
        switch(status) {
            case 'DONE':
                return "uppercase tracking-wide text-sm text-green-500 font-semibold";
            default:
                return "uppercase tracking-wide text-sm text-indigo-500 font-semibold";
        }
    };

    return (
        <div className="flex flex-col md:flex-row max-w-full mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden md:max-w-2xl">
            <div className="p-8">
                <div className={getStatusClass(status)}>
                    {status}
                </div>
                <h1 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline mb-2">
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
    );
};
