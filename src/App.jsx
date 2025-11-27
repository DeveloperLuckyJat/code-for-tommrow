import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { deletePostUI, fetchPosts } from './component/postSlice'
import Loading from './component/Loading'
import Card from './component/Card'
import Pagination from './component/Pagination'
import Home from './component/Home'
const PAGE_SIZE = 6
export default function App (){

const dispatch = useDispatch()
const posts =  useSelector((s) => s.posts.items) || []
console.log(posts);

const status = useSelector((s)=> s.posts.status)
const deletedMap = useSelector((s)=>s.posts.deleted)
const error =  useSelector((s)=>s.posts.error)

const [curretPage,setCurrentPage] =  useState(1)
const [showLoading,setShowLoading] = useState(true)

useEffect(()=> {
  const timer = setTimeout(()=>setShowLoading(false),5000)
  return () => clearTimeout(timer)
},[])

useEffect(()=>{
  if(status === 'idle') dispatch(fetchPosts)
}, [status,dispatch])

const enriched  = posts.map((p)=> ({...p,date: p.date || ''}))

const visiable =  enriched.filter((p)=> !deletedMap[p.id])

const totalPages = Math.max(1,Math.ceil(visiable.length /PAGE_SIZE))

const start = (curretPage -1) * PAGE_SIZE
const pageItems = visiable.slice(start,start+PAGE_SIZE)
const handleDelete = (id) => dispatch(deletePostUI(id))
const handlePageChange = (p) => setCurrentPage(p)

if(showLoading) return <Loading/>
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-2xl font-bold mb-4'>Post Listing</h1>
         {status === 'loading' && <div className='mb-4'>Fetching posts...</div>}
         {status === 'failed' && <div className='text-red-600'>Error: {error}</div>}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {pageItems.map((post)=>(<Card  key={post.id} post={post} OnDelete={handleDelete}/>))}
          </div>
          <Pagination currentPage={curretPage} totalPages={totalPages}  onPageChanges={handlePageChange} />
          <Home/>
          
      </div>
    </div>
  )
}
