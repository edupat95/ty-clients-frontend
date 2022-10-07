import { User } from '../../models/user.model';
import { createSlice } from '@reduxjs/toolkit';

export const UserEmptyState: User = {
  id_token: '',
  id: 0,
  login: '',
  firstName: '',
  lastName: '',
  email: '',
  imageUrl: '',
  activated: false,
  langKey: '',
  club: {
    id: 0,
    nombre: '',
    direccion: '',
    estado: false
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState: UserEmptyState,
  reducers: {
    createUser: (state, action) => action.payload,
    modifyUser: (state, action) => ({ ...state, ...action.payload }),
    resetUser: () => UserEmptyState
  }
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
