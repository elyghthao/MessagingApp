import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    name: "Anon"
}
export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: { 
    setUser: (state, action) => {
        state.name = action.payload
    }
  }
});

// Action creators are generated for each case reducer function
export const {setUser } = userSlice.actions;

export default userSlice.reducer;