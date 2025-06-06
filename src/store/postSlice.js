import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  savedPosts: [],
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
    addSavedPosts: (state, action) => {
      const postExist = state.savedPosts.find(
        (post) => post.$id === action.payload.$id
      );
      if (!postExist) {
        state.savedPosts.push(action.payload);
      }
    },
    removeSavedPosts: (state, action) => {
      state.savedPosts = state.savedPosts.filter(
        (post) => post.$id !== action.payload
      );
    },
    setSavedPosts: (state, action) => {
      state.savedPosts = action.payload;
    },
    unsetSavedPost: (state, action) => {
      state.savedPosts = state.savedPosts.filter(
        (post) => post.$id !== action.payload
      );
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
      state.loading = false;
      state.error = null;
    },
    setAllSavedPosts: (state, action) => {
      state.savedPosts = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPosts,
  setSelectedPost,
  addSavedPosts,
  removeSavedPosts,
  setSavedPosts,
  unsetSavedPost,
  setAllSavedPosts,
  setLoading,
  setError,
} = postSlice.actions;

export default postSlice.reducer;
