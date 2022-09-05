export const addToCart = payload => {
  // console.log('payload', payload);
  return {
    type: 'ADD_TO_CART',
    payload: payload,
  };
};

export const removeFromCart = payload => {
  // console.log(payload);
  return {
    type: 'REMOVE_FROM_CART',
    payload: payload,
  };
};
export const emptyCart = payload => {
  // console.log(payload);
  return {
    type: 'DO_EMPTY_CART',
    payload: payload,
  };
};
export const addUserid = (userId, userContact) => {
  // console.log('user Id redux' + userId);
  return {
    type: 'ADD_USER_ID',
    userId: userId,
    userContact: userContact,
  };
};
export const updateUserName = userName => {
  // console.log(userName);
  return {
    type: 'USER_NAME_UPDATE',
    userName: userName,
  };
};
export const updateUserMail = userMail => {
  // console.log(userMail);
  return {
    type: 'USER_MAIL_UPDATE',
    userMail: userMail,
  };
};
export const logoutUser = (userId, userContact) => {
  // console.log('user Redux id  sign Out ' + userId);
  return {
    type: 'LOGOUT_USER',
    userId: userId,
    userContact: userContact,
  };
};
export const addUserLcation = userlocation => {
  // console.log('location----' + userlocation);
  return {
    type: 'USER_LOCATION',
    userlocation: userlocation,
  };
};
export const addLatitude = lat => {
  // console.log('lat----' + lat);
  return {
    type: 'USER_LAT',
    lat: lat,
  };
};
export const addLontitude = long => {
  // console.log('lat----' + long);
  return {
    type: 'USER_LONG',
    long: long,
  };
};
export const confirmOrder = Status => {
  // console.log('lat----' + Status);
  return {
    type: 'USER_STATUS',
    Status: Status,
  };
};
export const addTimeOfOrder = Time => {
  // console.log('lat----' + Time);
  return {
    type: 'ORDER_TIME',
    Time: Time,
  };
};
export const addFixerPic1 = Pic1 => {
  // console.log('fixerpic1----------' + Pic1);
  return {
    type: 'FIXER_PICS_1',
    Pic1: Pic1,
  };
};
export const addFixerPic2 = Pic2 => {
  // console.log('fixerpic2----------' + Pic2);
  return {
    type: 'FIXER_PICS_2',
    Pic2: Pic2,
  };
};
export const addFixerPic3 = Pic3 => {
  // console.log('fixerpic3----------' + Pic3);
  return {
    type: 'FIXER_PICS_3',
    Pic3: Pic3,
  };
};
export const addOrderUid = orderUid => {
  // console.log('orderUid--------------------------------' + orderUid);
  return {
    type: 'ORDER_UID',
    orderUid: orderUid,
  };
};
export const addOrderKey = orderKey => {
  // console.log('orderKey--------------------------------' + orderKey);
  return {
    type: 'ORDER_KEY',
    orderKey: orderKey,
  };
};
export const userProfilePic = userPic => {
  // console.log('user Pic----' + userPic);
  return {
    type: 'USER_PIC',
    userPic: userPic,
  };
};
