import { ReactElement } from "react";

export default function Description(): ReactElement {
    return (
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Manage your task with <span className="font-semibold text-blue-600 dark:text-blue-400">efficiency</span>,
            Monitor progress <span className="font-semibold text-purple-600 dark:text-purple-400">visually</span>,
            dan achieve maximum productivity every day
        </p>

    )
}