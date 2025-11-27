import React from "react";


export  default function Card({post,OnDelete}){
  return(
    <div className="bg-white rounded shadow p-3 flex flex-col">
        <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg leading-snug">
                {post.title}
            </h3>
            <button
             onClick={()=>OnDelete(post.id)}
             aria-label= "delete"
             className="text-res-500 hover:text-red-700 ml-2"
            >
               cancel
            </button>
        </div>
           <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.body}</p>
           <div className="mt-auto pt-3">
            <img src={post.image} alt="post"  className="w-full h-36 object-cover  rounded" />
             <div className="text-xs text-gray-500 mt-2">{post.date || ''}</div>
           </div>
    </div>
  )
}