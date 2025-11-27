import React from 'react'
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const posts = res.data.map((p,idx) => ({
        id: p.id,
        title: p.title,
        body: p.body,
        image: `https://picsum.photos/seed/${idx+1}/400/300`,   
    }))  
    return posts
})
const postSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        status: 'idle',
        error : null,
        deleted: {},
    },
    reducers:{
        deletePostUI(state,action){
            state.deleted[action.payload] = true
        },
        restoreAll(state){
            state.deleted = {}
        }
    },
     extraReducers(builder){
        builder.addCase(fetchPosts.pending,(state)=>{state.status ='loading'})
        .addCase(fetchPosts.fulfilled, (state,action)=>{state.status = 'succeeded'
            state.items = action.payload
        }).addCase(fetchPosts.rejected,(state,action)=>{
            state.status ='failed'
            state.error= action.error.message
        })
     }
})

export const {deletePostUI ,restoreAll} = postSlice.actions
export default postSlice.reducer