import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { FaS } from 'react-icons/fa6';

const initialState = {
  token: '',
  user: {},
  isAuthorized: false,
  loading: true
}



export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (id, { rejectWithValue }) => {
    try {
      debugger
      const response = await axios.get(
        `${import.meta.env.VITE_JOB_APP_API_URL}/api/users/current`,
        {
          withCredentials: true,  // If needed for cookies or session management
        }
      )
      console.log('Api Resaaaaaaaaaxxxxxxx', response)
      return response?.data
    } catch (error) {
      if (error.response && error.response.data)
        return rejectWithValue(error.message); // Handle other errors (e.g., network)
    }

  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("credentials", credentials);

      const response = await axios.post(
        `${import.meta.env.VITE_JOB_APP_API_URL}/api/users/login`, credentials,
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
  async (data, { rejectWithValue }) => {
    try {
      // debugger
      const response = await axios.get(
        `${import.meta.env.VITE_JOB_APP_API_URL}/api/getAllJobs`,
        {
          withCredentials: true,  // If needed for cookies or session management
        }
      )
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
      const response = await axios.get(
        `http://localhost:5000/api/getJob/${id}`,

        // `${import.meta.env.VITE_JOB_APP_API_URL}/api/getJob/${id}`,
        {
          headers: {
            Authorization: `Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjVhM2U2ZjVjMGI4MDEwMmU4YzFlNSIsInJvbGUiOiJFbXBsb3llciIsImlhdCI6MTczODAxMjkzNywiZXhwIjoxNzM4MDEyOTk3fQ.n5keeP49OaJ4Q0eLrrrQyicLrMTKTinayRFFUH3Goj8`, // Add Authorization header
          },
          withCredentials: true, // If cookies are required
        }
      )
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthorized = true;
        state.user = action.payload;
        state.loading = false
        // Set the user data after successful loginz
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isAuthorized = true;
        state.user = action.payload;
        state.loading=false
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isAuthorized = false;
        state.error = action.payload || 'Error fetching user.';
        state.user=null
        state.loading=false
      });
  },

})


export const { logout } = authSlice.actions;
export default authSlice.reducer;
