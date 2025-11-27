import React from "react"

export default function Pagination({currentPage,totalPages,onPageChanges}){
    const pages = Array.from({length: totalPages}, (_,i)=> i+1)
    return(
        <div className="flex items-center gap-2 justify-center mt-6">
            {pages.map((p)=> (
                <button 
                  key={p}
                  onClick={()=> onPageChanges(p)}
                  className={`px-3 py-1 rounded ${p === currentPage ? 'bg-gray-800 text-white' :  'bg-gray-200'}`}
                  >
                    {p}
                  </button>
            ))}
        </div>
    )
}