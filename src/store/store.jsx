import { configureStore } from "@reduxjs/toolkit";
import postsReducer  from '../component/postSlice'
const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
})


export default store