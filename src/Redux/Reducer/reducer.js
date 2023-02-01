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
  time: '',
  Pic1: '',
  Pic2: '',
  Pic3: '',
  orderUid: '',
  orderKey: '',
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
    case 'ORDER_TIME':
      return {
        ...state,
        Time: action.Time,
      };
    case 'FIXER_PICS_1':
      return {
        ...state,
        Pic1: action.Pic1,
      };
    case 'FIXER_PICS_2':
      return {
        ...state,
        Pic2: action.Pic2,
      };
    case 'FIXER_PICS_3':
      return {
        ...state,
        Pic3: action.Pic3,
      };
    case 'ORDER_UID':
      return {
        ...state,
        orderUid: action.orderUid,
      };
    case 'ORDER_KEY':
      return {
        ...state,
        orderKey: action.orderKey,
      };
    case 'USER_PIC':
      return {
        ...state,
        userPic: action.userPic,
      };
    case 'MR_FIX_USER_ID':
      return {
        ...state,
        mrFixUserId: action.mrFixUserId,
      };
  }
  return state;
};
export default cartReducer;
