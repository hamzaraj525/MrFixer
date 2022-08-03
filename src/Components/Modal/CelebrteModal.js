import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  Animated,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';
import Images from '../../Constraints/Images';

const CelebrteModal = props => {
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.loaderLotie}>
        <View style={styles.container}>
          {props.loaderLotie ? (
            <LottieView
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              }}
              source={Images.celebrateLottie}
              autoPlay
              loop={true}
            />
          ) : null}
        </View>
      </Modal>
    </>
  );
};
export default CelebrteModal;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  whiteContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  passwordContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    backgroundColor: '#F6F3F5',
    borderRadius: 25,
    padding: 12,
    width: '80%',
    height: 45,
    alignItems: 'center',
    alignSelf: 'center',
  },
  TiName: {
    fontFamily: 'RobotoSlab-Bold',
    width: '90%',
    height: 50,
    marginLeft: 6,
  },
  loginBtn: {
    marginTop: '5%',
    paddingHorizontal: 60,
    paddingVertical: 13,
    backgroundColor: 'red',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 1,
  },

  containerr: {
    width: '80%',
    height: '44%',
    backgroundColor: '#ffffff',
    borderRadius: 33,
  },

  okBtnTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  clientName: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
});
