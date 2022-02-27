// import userApi from 'api/userApi';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/UserApi';
import StorageKeys from 'constants/storage-keys';

export const register = createAsyncThunk('user/register', async (payload) => {
  const data = await userApi.register(payload);

  localStorage.setItem(StorageKeys.TOKEN, data.data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data.user));

  return data.data.user;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  const data = await userApi.login(payload);
  // console.log(data);

  localStorage.setItem(StorageKeys.TOKEN, data.data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data.user));
  return data.data.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    // current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    current: {},
    setting: {},
  },
  reducers: {
    logout(state) {
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      state.current = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
