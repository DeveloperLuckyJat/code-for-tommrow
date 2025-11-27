import React from "react"

export default function Loading() {
    return (
        <div className="h-screen flex items-cnter justify-cnter">
             <div className="text-center">
                <div className="text-2xl font-semobold"> Loading...</div>
                <div className="text-sm mt-2"> Preparing content - please wait</div>
             </div>
        </div>
    )
}
