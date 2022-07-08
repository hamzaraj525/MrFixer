import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Platform,
  Modal,
  Animated,
} from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  addItemToCart,
  removeFromCart,
  emptyCart,
} from '../../../src/Redux/Action/actions';

const OrderDone = ({navigation, showOrderModal, hideOrderModal}) => {
  const dispatch = useDispatch();
  const {cartItems} = useSelector(reducers => reducers.cartReducer);
  const scaleValue = useRef(new Animated.Value(0)).current;

  const animateModal = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        hideOrderModal();
      }}
      visible={showOrderModal}>
      <SafeAreaView
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#000000aa',
        }}>
        <Animated.View style={styles.containerr}>
          <View
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1A1E21',
            }}>
            <LottieView
              style={{width: 140, height: 140}}
              source={require('./../../../assets/Animations/done.json')}
              autoPlay
              loop={false}
            />
          </View>
          <View
            style={{
              flex: 3,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Pressable style={{}} onPress={() => {}}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'RobotoSlab-Bold',
                  fontWeight: '400',
                  fontSize: 17,
                }}>
                Order Placed Successfully
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.loginBtn,
                {
                  width: '30%',
                  marginTop: '5%',
                  height: '18%',
                  backgroundColor: 'red',
                },
              ]}
              onPress={() => {
                hideOrderModal();
                navigation.navigate('Home');
                dispatch(emptyCart());
                animateModal();
                showScheduleNotification();
              }}>
              <Text
                style={{
                  fontFamily: 'RobotoSlab-Bold',
                  fontSize: 17,
                  fontWeight: '800',
                  color: 'white',
                }}>
                Ok
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </SafeAreaView>
    </Modal>
    // <Modal
    //   animationType="fade"
    //   transparent={true}
    //   onRequestClose={() => {}}
    //   visible={showOrderModal}>
    //   <SafeAreaView style={styles.showconfirmOrderModal}>
    //     <View style={styles.showconfirmOrderModalInner}>
    //       <View
    //         style={{
    //           position: 'absolute',
    //           right: 2,
    //           top: 2,
    //           padding: '2%',
    //         }}>
    //         <Pressable onPress={() => {}}>
    //           <Entypo name={'cross'} size={32} color={'black'} />
    //         </Pressable>
    //       </View>

    //       <LottieView
    //         style={{marginTop: 10, width: 120, height: 120}}
    //         source={require('./../../../assets/Animations/done.json')}
    //         autoPlay
    //         loop={false}
    //       />

    //       <Text
    //         style={[
    //           styles.textHeader,
    //           {fontSize: 21, marginTop: 15, fontWeight: '700'},
    //         ]}>
    //         Thank you for placing order
    //       </Text>

    //       <View
    //         style={{
    //           marginTop: 10,
    //           height: 0.8,
    //           width: '80%',
    //           backgroundColor: 'red',
    //         }}
    //       />
    //       <Text
    //         style={[
    //           styles.textHeader,
    //           {marginTop: 10, fontWeight: '400', color: '#DA2328'},
    //         ]}>
    //         Your Order Id is
    //       </Text>
    //       <Text
    //         style={[
    //           styles.textHeader,
    //           {
    //             marginBottom: 10,
    //             fontWeight: '400',
    //             marginTop: 10,
    //             color: '#DA2328',
    //           },
    //         ]}>
    //         h
    //       </Text>
    //       <View
    //         style={{
    //           marginBottom: 90,
    //           height: 0.8,
    //           width: '80%',
    //           backgroundColor: 'red',
    //         }}
    //       />
    //     </View>
    //   </SafeAreaView>
    // </Modal>
  );
};
export default OrderDone;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerr: {
    width: '75%',
    height: '50%',
    backgroundColor: '#ffffff',
    borderRadius: 33,
  },
  loginBtn: {
    width: '50%',
    height: 50,
    borderRadius: 30,
    backgroundColor: 'orange',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cartItemsContainer: {
    alignSelf: 'center',
    borderWidth: 0.3,
    borderColor: 'grey',
    borderRadius: 30,
    marginTop: 10,
    padding: '4%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  cartItemImage: {
    borderRadius: 30,
    marginBottom: 10,
    width: 110,
    height: 90,
  },
  cartItemTitle: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 9,
  },
  cartItemPrice: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 9,
  },
  cartRemoveTxt: {
    color: '#DA2328',
    fontSize: 15,
    fontWeight: '500',
  },
  plusContainer: {
    borderWidth: 0.3,
    padding: 8,
    height: 110,
    borderRadius: 35,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  plusbtn: {
    width: 27,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27 / 2,
    backgroundColor: '#DFBC50',
  },
  minusBtn: {
    width: 27,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27 / 2,
    backgroundColor: '#2C2C2C',
  },
  showminimumModal: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  showminimumModalInner: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1E21',
  },
  showconfirmOrderModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  showconfirmOrderModalInner: {
    alignItems: 'center',
    width: '90%',
    padding: 3,
    borderRadius: 33,
    backgroundColor: '#FDD10E',
  },
  showdeleteConfirm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  showdeleteConfirmInner: {
    width: '80%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 13,
    backgroundColor: '#1A1E21',
  },
  totalContainer: {
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 150,
    backgroundColor: '#2C2C2C',
    width: Dimensions.get('window').width,
  },
  subtotalContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  gstContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  TotalContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  checkoutbtn: {
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: '#DFBC50',
  },
  proceedtxt: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },

  containerrr: {
    alignSelf: 'center',
    overflow: 'hidden', // for hide the not important parts from circle
    width: 500,
    height: 270,
  },
  background: {
    // this shape is a circle
    borderRadius: 800, // border borderRadius same as width and height
    width: 700,
    height: 700,
    marginLeft: -100, // reposition the circle inside parent view
    position: 'absolute',
    bottom: 0, // show the bottom part of circle
    overflow: 'hidden', // hide not important part of image
  },
  image: {
    height: 270, // same width and height for the container
    width: 500,
    position: 'absolute', // position it in circle
    bottom: 0, // position it in circle
    marginLeft: 100, // center it in main view same value as marginLeft for circle but positive
  },

  textHeader: {
    fontWeight: '600',
    color: 'black',
    fontSize: 17,
  },
  MenuBtn: {
    alignSelf: 'center',
    marginTop: '5%',
  },
  containerr: {
    width: '75%',
    height: '50%',
    backgroundColor: '#ffffff',
    borderRadius: 33,
  },
  cartBtnBlue: {
    flexDirection: 'row',
    width: '10%',
    borderRadius: 12,
    width: '10%',
    height: 37,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {flexDirection: 'column'},
  plusBtn: {
    width: 25,
    height: 25,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textLinksBold: {
    paddingHorizontal: '5%',
    color: 'black',
    fontWeight: '700',
    marginTop: '8%',
    fontSize: 14,
  },

  loginBtn: {
    width: '50%',
    height: 50,
    borderRadius: 30,
    backgroundColor: 'orange',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  loginBtnBlue: {
    width: '18%',
    height: 35,
    marginRight: '3%',
    borderRadius: 10,
    backgroundColor: '#F1EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {fontWeight: '600', color: 'grey', fontSize: 13},
  titlee: {fontWeight: '700', color: 'white', fontSize: 14},
  Modal: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: '110%',
    backgroundColor: 'white',
  },
  containerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreSection: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  exploreHeader: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
  },
  exploreContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
