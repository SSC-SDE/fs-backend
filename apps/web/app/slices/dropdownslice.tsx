import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action to fetch options from the backend
export const fetchDropdownOptions = createAsyncThunk(
    "dropdown/fetchOptions",
    async () => {
      const response = await fetch("http://localhost:5000/api/options/getOptions"); // Ensure the endpoint is correct
      if (!response.ok) {
        throw new Error('Failed to fetch dropdown options');
      }
      return response.json();
    }
  );
  

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: {
    options: {
      venueOptions: [] as string[],
      colorOptions: [] as string[],
      styleOptions: [] as string[],
      sizeOptions: [] as string[],
      moodOptions: [] as string[],
    },
    isTextMode: false,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    toggleTextMode(state) {
      state.isTextMode = !state.isTextMode;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDropdownOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDropdownOptions.fulfilled, (state, action) => {
        state.options = action.payload;
        state.loading = false;
      })
      .addCase(fetchDropdownOptions.rejected, (state, action) => {
        state.loading = false;
        // Use fallback empty string if action.error.message is undefined
        state.error = action.error.message ?? "An error occurred while fetching options";
      });
  },
});

export const { toggleTextMode } = dropdownSlice.actions;
export default dropdownSlice.reducer;
