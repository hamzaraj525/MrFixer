import React, {useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  Animated,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import NetworkModal from './../../Components/Modal/NetworkModal';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';

function SplashScreen({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [color, setColor] = useState('white');
  const [networkModal, setNetworkModal] = useState(false);
  const dispatch = useDispatch();
  const {userId, Pic1, Pic2, Pic3} = useSelector(
    reducers => reducers.cartReducer,
  );
  const scaleValue = useRef(new Animated.ValueXY({x: 0, y: 70})).current;

  useEffect(() => {
    checkConnection();
  }, []);

  const hideModalNetwork = () => {
    setNetworkModal(false);
  };

  const animateModal = () => {
    Animated.timing(scaleValue, {
      toValue: {x: 0, y: 0},
      duration: 4210,
      useNativeDriver: true,
    }).start();
  };

  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        setTimeout(() => {
          if (userId) {
            navigation.replace('Home');
          } else {
            navigation.replace('OtpStack');
          }
        }, 1700);
      } else {
        setTimeout(() => {
          setNetworkModal(true);
        }, 3000);
      }
      console.log('Is connected?', state.isConnected);
    });
  };

  return (
    <SafeAreaView style={[styles.container, {}]}>
      <StatusBar
        barStyle={'dark-content'}
        hidden={true}
        backgroundColor="#0E0A30"
      />
      <View
        style={{
          width: Dimensions.get('window').width,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={styles.image}
            source={require('./../../../assets/Images/consult.png')}
          />
          <Text
            style={{
              fontFamily: 'RobotoSlab-Bold',
              fontSize: 32,
              color: 'black',
              marginTop: 7,
            }}>
            Mr.Fixer
          </Text>
          <Text
            style={{
              fontFamily: 'RobotoSlab-Bold',
              fontSize: 17,
              color: 'black',
              marginTop: 5,
            }}>
            We Fix it Right
          </Text>
        </View>
      </View>

      <NetworkModal
        networkModal={networkModal}
        hideModalNetwork={hideModalNetwork}
        checkConnection={checkConnection}
        animateModal={animateModal}
      />
    </SafeAreaView>
  );
}
export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 70,
    height: 70,
  },
});
