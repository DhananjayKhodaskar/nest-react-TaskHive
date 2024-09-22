import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";


export const loginUser = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(`auth/email/login`, payload);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const signupUser = createAsyncThunk(
  "user/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(`auth/email/register`, payload);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getUserDetails = createAsyncThunk(
  "users/user",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`users/user`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      name: "",
      surname: "",
      email: "",
      roles: [],
    },
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;

      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.loading = false;
          state.user = action.payload.data.user; 
          localStorage.setItem(
            "access_token",
            action?.payload?.data?.token?.access_token
          );
          localStorage.setItem(
            "refresh_token",
            action?.payload?.data?.refreshToken
          );
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null; 
        state.token = null; 
      });

 
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
      });


    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.user = action.payload.data.data;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
      });
  },
});


export const { clearState } = userSlice.actions;

export default userSlice.reducer;
