import React, {useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
const {width, height} = Dimensions.get('window');

function AccReady({navigation}) {
  const [showModal, setShowModal] = useState(false);

  // const {userName} = useSelector(reducers => reducers.cartReducer);

  return (
    <SafeAreaView style={[styles.container, {}]}>
      <StatusBar
        barStyle={'dark-content'}
        hidden={true}
        backgroundColor="#0E0A30"
      />
      <View
        style={{
          flex: 1,
          backgroundColor: '#0E0A30',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode="contain"
          source={require('./../../../assets/Images/workCartoon.png')}
          style={styles.img}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        {/* <Text> {userName},your account is almost ready </Text> */}
        <Text style={styles.txt}>Hamza </Text>
        <Text style={styles.txt}>your account is ready now </Text>
        <Text style={styles.txtSub}>Earn by taking orders at few clicks</Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
          style={[styles.loginBtn, {backgroundColor: '#3372e2'}]}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Happy Earning
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default AccReady;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  img: {
    flex: 1,
  },
  txt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  txtSub: {
    fontSize: 17,
    fontWeight: '300',
    color: 'black',
    marginTop: 20,
  },

  loginBtn: {
    width: '70%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
});
