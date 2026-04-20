import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import axiosInstance from '../api/axiosInstance';
import { FaS } from 'react-icons/fa6';

const initialState = {
  token: '',
  user: {},
  isAuthorized: false,
  loading: true,
  checkingAuth: true
}



export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/users/current");
      return response.data;
    } catch (error) {
      console.log("error.response", error.response);

      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("credentials", credentials);

      const response = await axiosInstance.post(
        "/api/users/login"
        , credentials,
        // {
        //   withCredentials: true,  // If needed for cookies or session management
        // }
      )
      console.log('Api Resaaaaaaaaaxxxxxxx', response)
      return response?.data
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message); // Pass error message
      }
      return rejectWithValue(error.message); // Handle other errors (e.g., network)
    }

  }
);



export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("credentials", credentials);
      debugger
      const response = await axios.post(
        `${import.meta.env.VITE_JOB_APP_API_URL}/api/users/registerUser`, credentials,
        {
          withCredentials: true,  // If needed for cookies or session management
        }
      )
      console.log('Api Resaaaaaaaaaxxxxxxx', response)
      return response?.data
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message); // Pass error message
      }
      return rejectWithValue(error.message); // Handle other errors (e.g., network)
    }

  }
);



export const getAllJobs = createAsyncThunk(
  'auth/getAllJobs',
  async (_, { rejectWithValue }) => {
    try {
      debugger
      const response = await axiosInstance.get(
        "/api/getAllJobs")
      console.log('Api Resaaaaaaaaaxxxxxxx', response)
      return response?.data
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.message); // Handle other errors (e.g., network)
    }

  }
);


export const getJobById = createAsyncThunk(
  'auth/getJobById',
  async (id, { rejectWithValue }) => {
    try {
      debugger
      console.log("idslice", id);

      const response = await axiosInstance.get(
        `/api/getJob/${id}`)
      console.log('Api Resaaaaaaaaaxxxxxxx', response)
      return response?.data
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message); // Pass error message
      }
      return rejectWithValue(error.message) // Handle other errors (e.g., network)
    }

  }
);


export const postApplication = createAsyncThunk(
  "auth/postApplication",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
debugger
      console.log("data", data);

      //      Object.keys(data.values).forEach((key) => {
      //   formData.append(key, data.values[key]); // ✅ correct
      // });
      Object.keys(data).forEach((key) => {
        if (key === "file") {
          formData.append("resume", data.file); // 👈 backend-friendly name
        } else {
          formData.append(key, data[key]);
        }
      });

      console.log("formData", formData);

      const res = await axiosInstance.post("/api/application", formData);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || err.message
      );
    }
  }
);




const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthorized = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthorized = false;
      state.user = null;
    },
    checkUser: (state, action) => {
      state.isAuthorized = action.payload.isAuthorized;
      state.user = action.payload.user;
    },
    setAuthFinished: (state) => {
      debugger
      state.checkingAuth = false;
      state.isAuthorized = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        debugger
        state.isAuthorized = true;
        state.user = action.payload;
        state.loading = false
        state.token = action.payload.token
        localStorage.setItem("token", action.payload.token);
        // Set the user data after successful loginz
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.checkingAuth = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        console.log("action.payload.user;", action.payload);

        state.isAuthorized = true;
        state.user = action.payload.user;
        state.checkingAuth = false
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isAuthorized = false;
        state.error = action.payload || 'Error fetching user.';
        state.user = null
        state.checkingAuth = false
      });
  },

})


export const { logout } = authSlice.actions;
export default authSlice.reducer;
