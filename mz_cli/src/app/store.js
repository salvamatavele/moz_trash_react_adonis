import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice';

const store = combineReducers({
    user:userSlice,
});

export default store
