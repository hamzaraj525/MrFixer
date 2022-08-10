const initialState = {
  cartItems: [],
  userId: '',
  userContact: '',
  userlocation: '',
  userName: '',
  userMail: '',
  Status: '',
  lat: null,
  long: null,
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: state.cartItems.concat(action.payload),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.key !== action.payload.key,
        ),
      };
    case 'DO_EMPTY_CART':
      return {
        ...state,
        cartItems: [],
      };
    case 'ADD_USER_ID':
      return {
        ...state,
        userId: action.userId,
        userContact: action.userContact,
      };
    case 'USER_NAME_UPDATE':
      return {
        ...state,
        userName: action.userName,
      };
    case 'USER_MAIL_UPDATE':
      return {
        ...state,
        userMail: action.userMail,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        userId: null,
        userContact: null,
      };
    case 'USER_LOCATION':
      return {
        ...state,
        userlocation: action.userlocation,
      };
    case 'USER_LAT':
      return {
        ...state,
        lat: action.lat,
      };
    case 'USER_LONG':
      return {
        ...state,
        long: action.long,
      };
    case 'USER_STATUS':
      return {
        ...state,
        Status: action.Status,
      };
  }
  return state;
};
export default cartReducer;
