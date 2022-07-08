import React, {useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  View,
  Text,
  PermissionsAndroid,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';

import NetworkModal from '../../Components/Modal/NetworkModal';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import LottieView from 'lottie-react-native';
import {
  addUserLcation,
  addLatitude,
  addLontitude,
} from '../../Redux/Action/actions';

function Location({navigation}) {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDAhaR1U_-EQJZu4Ckm0iUQ4gxSWqIMOvY';
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [locationText, setLocationText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [color, setColor] = useState('white');
  const [networkModal, setNetworkModal] = useState(false);
  const dispatch = useDispatch();

  const scaleValue = useRef(new Animated.ValueXY({x: 0, y: 70})).current;
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Mr.Fix needs access to your location',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        _getCurrentLocation();
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const _getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        console.log('location:' + lat, long);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 3600000,
      },
    );

    Geocoder.init(GOOGLE_MAPS_APIKEY, {language: 'en'});
    Geocoder.from(lat, long)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log('address is  here', addressComponent);
        setLocationText(addressComponent);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      _getCurrentLocation();
    }
  }, [lat, long]);

  // const hideModalNetwork = () => {
  //   setNetworkModal(false);
  // };

  // const animateModal = () => {
  //   Animated.timing(scaleValue, {
  //     toValue: {x: 0, y: 0},
  //     duration: 4210,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // const checkConnection = () => {
  //   NetInfo.fetch().then(state => {
  //     if (state.isConnected === true) {
  //       setTimeout(() => {
  //         console.log('Connected');
  //       }, 1700);
  //     } else {
  //       setTimeout(() => {
  //         setNetworkModal(true);
  //       }, 3000);
  //     }
  //     console.log('Is connected?', state.isConnected);
  //   });
  // };

  return (
    <SafeAreaView style={[styles.container, {}]}>
      <StatusBar
        barStyle={'dark-content'}
        hidden={true}
        backgroundColor="#0E0A30"
      />

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={{
          latitude: lat ? lat : 0,
          longitude: long ? long : 0,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <MapView.Marker
          coordinate={{
            latitude: lat ? lat : 0,
            longitude: long ? long : 0,
          }}
        />
      </MapView>

      <View style={styles.subViews}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'grey',
          }}>
          Location
        </Text>
        {locationText !== '' ? (
          <Text
            style={{
              fontFamily: 'RobotoSlab-Bold',
              color: 'black',
              marginTop: 3,
              fontSize: 16,
              fontWeight: '700',
            }}>
            {locationText}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: 'black',
            }}>
            Loading...
          </Text>
        )}
      </View>
      <Pressable
        activeOpacity={0.8}
        onPress={() => {
          dispatch(addUserLcation(locationText));
          dispatch(addLatitude(lat));
          dispatch(addLontitude(long));
          navigation.replace('Home');
        }}
        style={[styles.loginBtn]}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
          }}>
          Confirm Location
        </Text>
      </Pressable>
      {/* <NetworkModal
        networkModal={networkModal}
        hideModalNetwork={hideModalNetwork}
        checkConnection={checkConnection}
        animateModal={animateModal}
      /> */}
    </SafeAreaView>
  );
}
export default Location;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },

  image: {
    width: 70,
    height: 70,
  },
  mapStyle: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    borderRadius: 60,
  },
  loginBtn: {
    width: '70%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#FB5B64',
    elevation: 5,
  },
  subViews: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    width: '90%',
    height: 80,
    paddingHorizontal: '4%',
    backgroundColor: 'white',
    elevation: 5,
  },
});
