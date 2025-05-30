import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    // jobs: [],
    allJobs:[],
    adminJobs: [],
    allAdminJobs:[],
    RecruiterJobs: [],
    singleJob: null,
    searchJobByText: "",
    appliedJobs: [],
    searchedQuery: "",
    allAppliedJobs: [],
  },
  reducers: {
    // setJobs: (state, action) => {
    //   state.jobs = action.payload;
    // },
    setAllJobs:(state,action) => {
      state.allJobs = action.payload;
  },

    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs:(state,action) => {
      state.allAdminJobs = action.payload;
  },

    setAdminJobs: (state, action) => {
      state.adminJobs = action.payload;
    },
    setRecruiterJobs: (state, action) => {
      state.RecruiterJobs = action.payload;
    },

    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },

    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
    },

    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
  },

   
  },
});

export const {
  // setJobs,
  setAllJobs,
  setSingleJob,
  setAdminJobs,
  setAllAdminJobs,
  setRecruiterJobs,
  setSearchJobByText,
  setAppliedJobs,
  setSearchedQuery,
  setAllAppliedJobs,
  // clearJobs,
} = jobSlice.actions;

export default jobSlice.reducer;
