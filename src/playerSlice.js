import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSong: '',
}

const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state,action) => {
            state.currentSong = action.payload
        }
    }

})

