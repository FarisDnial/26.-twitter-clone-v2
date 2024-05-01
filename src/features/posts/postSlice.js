import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const BASE_URL = "https://32d43193-7d8c-4ad2-985c-308ac3a183c4-00-l9x9qx90f8vn.worf.replit.dev/";

// Async thunk for fetching a user's posts
export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByUser",
    async (userId) => {
        const response = await fetch(`${BASE_URL}posts/user/${userId}`);
        return response.json();
    }
);

export const savePost = createAsyncThunk(
    "posts/savePost",
    async (postContent) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        const data = {
            title: "Post Title",
            content: postContent,
            user_id: userId,
        };

        const response = await axios.post(`${BASE_URL}posts`, data);
        return response.data;
    })

// Slice
const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true },
    reducers: {},// reducers to manage sync action
    // extraReducers is to hanlde async action
    extraReducers: (builder) => {
        // whenever fetchPostsByUser finished running (fulfilled), the state data is updated
        builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
            state.posts = action.payload; //updated with fetched data
            state.loading = false; // loading status set to false
        }),
            builder.addCase(savePost.fulfilled, (state, action) => {
                state.posts = [action.payload, ...state.posts];
            });
    },
});

export default postsSlice.reducer;