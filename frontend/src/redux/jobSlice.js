import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    adminJobs: [],
    singleJob: null,
    searchJobByText: "",
    appliedJobs: [],
    searchedQuery: "",
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },

    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },

    setAdminJobs: (state, action) => {
      state.adminJobs = action.payload;
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

    clearJobs: (state) => {
      state.jobs = [];
      state.adminJobs = [];
      state.singleJob = null;
      state.searchJobByText = "";
      state.appliedJobs = [];
      state.searchedQuery = "";
    },
  },
});

export const {
  setJobs,
  setAllJobs,
  setSingleJob,
  setAdminJobs,
  setAllAdminJobs,
  setSearchJobByText,
  setAppliedJobs,
  setSearchedQuery,
  clearJobs,
} = jobSlice.actions;

export default jobSlice.reducer;
