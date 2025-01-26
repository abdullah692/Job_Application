import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    token:'',
    user:{}
}


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
      try {
        console.log("credentials",credentials);
        
        const response = await axios.post(
            `${import.meta.env.VITE_JOB_APP_API_URL}/api/users/login`,credentials,
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
      console.log("credentials",credentials);
      debugger
      const response = await axios.post(
          `${import.meta.env.VITE_JOB_APP_API_URL}/api/users/registerUser`,credentials,
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
  async (data,{ rejectWithValue }) => {
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




const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login: (state, action) => {
            state.isAuthorized = true;
            state.user = action.payload;
          },
          logout: (state) => {
            state.isAuthorized = false;
            state.user = null;
          },
    },
    extraReducers: (builder) => {
        builder
          .addCase(loginUser.fulfilled, (state, action) => {
            state.isAuthorized = true;
            state.user = action.payload; // Set the user data after successful loginz
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.error = action.payload;
          });
      },
    
})


export const { logout } = authSlice.actions;
export default authSlice.reducer;
