import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Animated,
  Pressable,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';
import Constraints from '../../Constraints/Constraints';
import CelebrteModal from './CelebrteModal';

const RateModal = props => {
  const [starCount, setStart] = useState(4);
  const [loaderLotie, setLoLotte] = useState(false);

  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
    setStart(rating);
  };

  const celebrateView = () => {
    setLoLotte(true);
    setTimeout(() => {
      setLoLotte(false);
      props.hideRateModal();
      props.doHideMap();
    }, 3000);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.showRateModal}>
        <SafeAreaView style={styles.container}>
          <Animated.View style={styles.containerr}>
            <View style={styles.whiteContainer}>
              <Text
                style={[styles.clientName, {fontSize: 15, fontWeight: '400'}]}>
                How was your Client?
              </Text>
              <Text style={styles.clientName}>{props.userNameTxt}</Text>

              <Rating
                rating={starCount}
                type="star"
                ratingColor="gold"
                ratingBackgroundColor="#c8c7c8"
                ratingCount={5}
                onFinishRating={ratingCompleted}
                style={{paddingVertical: 10}}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.loginBtn}
                onPress={() => {
                  celebrateView();
                }}>
                <Text style={styles.okBtnTxt}>{Constraints.RATE_RIDER}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </SafeAreaView>
      </Modal>

      <CelebrteModal loaderLotie={loaderLotie} />
    </>
  );
};
export default RateModal;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  whiteContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
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
    backgroundColor: 'red',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 44,
    width: '70%',
    height: 48,
  },

  containerr: {
    width: '80%',
    height: '44%',
    backgroundColor: '#ffffff',
    borderRadius: 33,
  },

  okBtnTxt: {
    fontSize: 17,
    fontWeight: '700',
    color: 'white',
  },
  clientName: {
    color: 'black',
    fontSize: 22,
    fontWeight: '500',
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
    height: 300,
    paddingVertical: '6%',
  },
});
