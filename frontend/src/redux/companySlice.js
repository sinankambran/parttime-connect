import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    company: null,
    singleCompany: null,
    companies: [],
    searchCompanyByText: "",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      if (state.singleCompany?._id !== action.payload?._id) {
        state.singleCompany = action.payload;
      }
    },
    setCompanies: (state, action) => {
      if (JSON.stringify(state.companies) !== JSON.stringify(action.payload)) {
        state.companies = action.payload;
      }
    },
    setCompany: (state, action) => {
      if (JSON.stringify(state.company) !== JSON.stringify(action.payload)) {
        state.company = action.payload;
      }
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload.trim();
    },
    resetCompanyState: (state) => {
      state.singleCompany = null;
      state.companies = [];
      state.searchCompanyByText = "";
    },
  },
});

export const {
  setSingleCompany,
  setCompanies,
  setCompany,
  setSearchCompanyByText,
  resetCompanyState,
} = companySlice.actions;
export default companySlice.reducer;
