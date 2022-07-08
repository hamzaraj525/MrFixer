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
import Entypo from 'react-native-vector-icons/Entypo';
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';

import {connect, useDispatch, useSelector} from 'react-redux';

const NetworkModal = props => {
  const dispatch = useDispatch();
  const {cartItems, userId} = useSelector(reducers => reducers.cartReducer);
  const scaleValue = useRef(new Animated.Value(0)).current;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        props.hideModalNetwork();
      }}
      visible={props.networkModal}>
      <SafeAreaView
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#000000aa',
        }}>
        <Animated.View
          style={[
            styles.containerr,
            {
              transform: [{translateX: scaleValue}],
            },
          ]}>
          <Text
            style={{
              fontSize: 47,
            }}>
            😐
          </Text>

          <Text
            style={{
              color: 'black',
              fontFamily: 'RobotoSlab-Bold',
              fontWeight: '700',
              fontSize: 20,
            }}>
            Network Error
          </Text>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'RobotoSlab-Bold',
                fontWeight: '200',
                fontSize: 14,
              }}>
              Your requested action could not be completed
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'RobotoSlab-Bold',
                fontWeight: '200',
                fontSize: 14,
              }}>
              due to connectivity issues
            </Text>
          </View>
          <Pressable
            style={[
              styles.loginBtn,
              {
                width: '60%',
                height: 55,
                backgroundColor: 'red',
              },
            ]}
            onPress={() => {
              props.hideModalNetwork();
              props.checkConnection();
            }}>
            <Text
              style={{
                fontFamily: 'RobotoSlab-Bold',
                fontSize: 17,
                fontWeight: '800',
                color: 'white',
              }}>
              Try Again
            </Text>
            <Entypo name={'cross'} size={29} color={'white'} />
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};
export default NetworkModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerr: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    height: 330,
    paddingVertical: '6%',
  },

  loginBtn: {
    width: '60%',
    height: 50,
    borderRadius: 30,
    backgroundColor: 'orange',
    justifyContent: 'space-between',
    paddingHorizontal: '7%',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    elevation: 16,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
