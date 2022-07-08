import {createSlice, PayloadAction} from '@reduxjs/toolkit';
const initialState = {
  cartItems: [],
  userId: '',
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems = state.cartItems.concat(action.payload);
    },
    removeFromCart(state, action) {
      state.cartItems.filter(cartItems => cartItems.key !== action.payload.key);
    },
    addUserid(state, action) {
      state.userId = action.payload;
    },
  },
});

export const {addToCart, removeFromCart, addUserid} = cartSlice.actions;
export default cartSlice.reducer;
