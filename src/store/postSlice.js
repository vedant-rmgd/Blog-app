import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
  selectedPost: null,
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.action = action.payload;
    },
  },
});

export const { setPosts, setSelectedPost, setLoading, setError } = postSlice.actions;
export default postSlice.reducer;
