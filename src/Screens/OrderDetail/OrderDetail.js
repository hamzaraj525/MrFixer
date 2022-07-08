import React, {useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Dimensions,
  Animated,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import NetworkModal from '../../Components/Modal/NetworkModal';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import MapViewDirections from 'react-native-maps-directions';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import database from '@react-native-firebase/database';
import {confirmOrder, addLontitude} from '../../Redux/Action/actions';

function OrderDetail({navigation, route}) {
  const {dLat, dLong, Item} = route.params;
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDAhaR1U_-EQJZu4Ckm0iUQ4gxSWqIMOvY';
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [locationText, setLocationText] = useState('');
  const [orderLocationTxt, setOrderLocationText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [networkModal, setNetworkModal] = useState(false);

  const origin = {latitude: lat, longitude: long};
  const destination = {latitude: dLat, longitude: dLong};

  const dispatch = useDispatch();
  const {userId, userName, userMail, userContact, Status} = useSelector(
    reducers => reducers.cartReducer,
  );

  const updateStatusStarted = Item => {
    dispatch(confirmOrder('Work Started'));
    database()
      .ref('cartItems/' + Item.key)
      .update({
        Status: 'Work Started',
      })
      .then(() => console.log('Status Work stated.'));
  };
  const updateStatusWorkEnd = Item => {
    dispatch(confirmOrder('Work End'));
    database()
      .ref('cartItems/' + Item.key)
      .update({
        Status: 'Work End',
      })
      .then(() => console.log('Status work end.'));
  };
  const updateStatusWorkDone = Item => {
    dispatch(confirmOrder('Completed'));
    database()
      .ref('cartItems/' + Item.key)
      .update({
        Status: 'Completed',
      })
      .then(() => console.log('Status work Completed.'));
  };

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
        console.log('location--' + lat, long);
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

    Geocoder.from(dLat, dLong)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log('address is  here', addressComponent);
        setOrderLocationText(addressComponent);
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

  return (
    <SafeAreaView style={[styles.container, {}]}>
      {console.log(lat, long)}
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
          <Text
            style={{
              fontFamily: 'RobotoSlab-Bold',
              fontSize: 30,
              color: 'black',
              marginTop: 7,
            }}>
            Details
          </Text>
          {lat || long ? (
            <View
              style={{
                height: 380,
                width: Dimensions.get('window').width - 50,
                borderRadius: 10,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MapView
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                  latitude: origin.latitude,
                  longitude: origin.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}>
                <MapView.Marker
                  pinColor={'orange'}
                  coordinate={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                  }}
                  title="Your Current Location"
                  description={locationText}
                />
                <MapView.Marker
                  coordinate={{
                    latitude: destination.latitude,
                    longitude: destination.longitude,
                  }}
                  title="Order Location"
                  description={orderLocationTxt}
                />
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={6}
                  strokeColor="red"
                />
              </MapView>
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (Status === 'Confirmed') {
            updateStatusStarted(Item);
          } else if (Status === 'Work Started') {
            updateStatusWorkEnd(Item);
          } else if (Status === 'Work End') {
            updateStatusWorkDone(Item);
          } else if (Status === 'Completed') {
            navigation.navigate('Home');
          }
        }}
        style={styles.loginBtn}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
          }}>
          {Status === 'Confirmed'
            ? 'Start Work'
            : Status === 'Work Started'
            ? 'End Work'
            : Status === 'Work End'
            ? 'Completed'
            : 'Done'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default OrderDetail;
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
  map: {
    height: 380,
    width: Dimensions.get('window').width - 50,
    borderRadius: 10,
  },
  loginBtn: {
    width: '70%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FB5B64',
  },
});
