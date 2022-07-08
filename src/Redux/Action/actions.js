export const addToCart = payload => {
  console.log('payload', payload);
  return {
    type: 'ADD_TO_CART',
    payload: payload,
  };
};

export const removeFromCart = payload => {
  console.log(payload);
  return {
    type: 'REMOVE_FROM_CART',
    payload: payload,
  };
};
export const emptyCart = payload => {
  console.log(payload);
  return {
    type: 'DO_EMPTY_CART',
    payload: payload,
  };
};
export const addUserid = (payload, userName, userMail, userContact) => {
  console.log(userContact);
  return {
    type: 'ADD_USER_ID',
    payload: payload,
    userName: userName,
    userMail: userMail,
    userContact: userContact,
  };
};
export const updateUserName = userName => {
  console.log(userName);
  return {
    type: 'USER_NAME_UPDATE',
    userName: userName,
  };
};
export const updateUserMail = userMail => {
  console.log(userMail);
  return {
    type: 'USER_MAIL_UPDATE',
    userMail: userMail,
  };
};
export const logoutUser = payload => {
  console.log(payload);
  return {
    type: 'LOGOUT_USER',
    payload: payload,
  };
};
export const addUserLcation = userlocation => {
  console.log('location----' + userlocation);
  return {
    type: 'USER_LOCATION',
    userlocation: userlocation,
  };
};
export const addLatitude = lat => {
  console.log('lat----' + lat);
  return {
    type: 'USER_LAT',
    lat: lat,
  };
};
export const addLontitude = long => {
  console.log('lat----' + long);
  return {
    type: 'USER_LONG',
    long: long,
  };
};
export const confirmOrder = Status => {
  console.log('Confirm_Order----' + Status);
  return {
    type: 'STATUS_CONFIRM_ORDER',
    Status: Status,
  };
};
