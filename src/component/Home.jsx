import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deletePostUI, fetchPosts } from './postSlice';
import Card from './Card';
import Pagination from './Pagination';

const Home = () => {

    const dispatch = useDispatch();
    const {items,loading,error,page ,limit} = useSelector((state)=> state.posts);

     useEffect(()=> {
        dispatch(fetchPosts());
     },[dispatch])
     
     const start = (page-1)*limit;
     const paginated = items.slice(start,start+limit);
     const totalPages = Math.ceil(items.length/limit)


     if(loading) return <h2 className='text-center mt-10 text-xl'> Loading ...</h2>
     if(error)   return <h2 className='text-center text-res-600  mt-10 text-xl'> Loading ...</h2>

  return (
    <div className='max-w-3xl mx-auto py-6'>
        {paginated.map((post)=> (
            <Card key={post.id}
              title= {post.title}
              body= {post.body}
              onDelete={()=> dispatch(deletePostUI(post.id))}
            />
        )
        )}
        <Pagination currentPage={page} totalPages={totalPages} onPageChanges={(num)=>dispatch(setPage(num))} />
    </div>
  )
}

export default Home