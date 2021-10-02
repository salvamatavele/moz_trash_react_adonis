import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState:{
        user:'',
        token:'',
        isLogged:false,
    },
    reducers:{
        login:(state, action)=>{
            return {...state, isLogged:true, user:action.payload.user, token: action.payload.token }
        },
        logout:(state)=>{
            return{...state,isLogged:false,user:'',token:''}
        }
    }
})
export const {login, logout} = userSlice.actions
export const selectUser = state => state
export default userSlice.reducer
