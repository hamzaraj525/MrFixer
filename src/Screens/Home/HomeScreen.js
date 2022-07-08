import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
  PermissionsAndroid,
  Alert,
  Text,
  View,
} from 'react-native';
import style from './style';
import auth from '@react-native-firebase/auth';
import {connect, useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import geolib from 'geolib';
import {logoutUser, confirmOrder} from './../../Redux/Action/actions';
import {getDistance, getPreciseDistance} from 'geolib';
import FastImage from 'react-native-fast-image';

const HomeScreen = ({navigation}) => {
  const [list, setList] = useState([]);
  const [locationText, setLocationText] = useState('');
  const dispatch = useDispatch();
  const {userId, userName, userMail, userContact, userlocation, lat, long} =
    useSelector(reducers => reducers.cartReducer);

  const updateStatus = item => {
    dispatch(confirmOrder('Confirmed'));
    database()
      .ref('cartItems/' + item.key)
      .update({
        Status: 'Confirmed',
      })
      .then(() => console.log('Status Confirmed.'));
  };

  useEffect(() => {
    database()
      .ref('/cartItems')
      // .limitToFirst(1)
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          // console.log(child.val());
          li.push({
            key: child.key,
            TotalPrice: child.val().TotalPrice,
            reservation: child.val().reservation,
            message: child.val().message,
            OrderTime: child.val().OrderTime,
            Order: child.val().Order,
            type: child.val().type,
            userName: child.val().userName,
            userMail: child.val().userMail,
            userContact: child.val().userContact,
            userIdd: child.val().userId,
            latitude: child.val().latitude,
            longitude: child.val().longitude,
            userlocation: child.val().userlocation,
            Status: child.val().Status,
          });
        });

        setList(li);
      });
  }, []);

  const calculateDistance = item => {
    var pdis = getPreciseDistance(
      {latitude: item.latitude, longitude: item.longitude},
      {latitude: lat, longitude: long},
    );
    const distance = pdis / 1000;
    alert('dist------' + distance.toFixed(0) + 'km');
  };

  const renderOrders = ({item, index}) => {
    var pdis = getPreciseDistance(
      {latitude: item.latitude, longitude: item.longitude},
      {latitude: lat, longitude: long},
    );
    const distance = pdis / 1000;
    if (distance > 1) {
      return (
        <View
          style={{
            borderWidth: 0.4,
            borderRadius: 10,
            borderColor: 'grey',
            marginTop: '4%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            alignSelf: 'center',
            padding: '2%',
            width: '90%',
          }}>
          <View
            onPress={() => {
              calculateDistance(item);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '2%',
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <FastImage
                source={require('./../../../assets/Images/profile.png')}
                style={{
                  width: 45,
                  height: 45,
                  resizeMode: 'contain',
                }}
                priority={FastImage.priority.normal}
              />
              <View style={{left: 10}}>
                {item.Order.map((item, index) => {
                  return (
                    <Text key={index} style={style.txtItems}>
                      {item.type}
                    </Text>
                  );
                })}
                <Text style={style.kmTxt}>{item.userName}</Text>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={style.priceTxt}>Rs {item.TotalPrice}</Text>
              <Text style={style.kmTxt}>{distance.toFixed(1)} Km</Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                borderRadius: 25,
                backgroundColor: 'pink',
                alignItems: 'center',
                justifyContent: 'center',
                height: 42,
                width: '47%',
              }}
              onPress={() => {}}>
              <Text style={{fontSize: 15, color: 'black'}}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                borderRadius: 25,
                backgroundColor: '#FB5B64',
                alignItems: 'center',
                justifyContent: 'center',
                height: 42,
                width: '47%',
              }}
              onPress={() => {
                updateStatus(item);
                navigation.navigate('OrderDetail', {
                  dLat: item.latitude,
                  dLong: item.longitude,
                  Status: item.Status,
                  Item: item,
                });
              }}>
              <Text style={{fontSize: 15, color: 'white'}}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={style.container}>
      <MapView
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={style.map}
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
          title="Your Current Location"
          description={userlocation}
        />
      </MapView>
      <TouchableOpacity>
        <Text
          style={{
            color: 'black',
            marginTop: 3,
            alignSelf: 'center',
            fontSize: 24,
          }}>
          Orders
        </Text>
      </TouchableOpacity>

      <FlatList
        data={list}
        renderItem={renderOrders}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

export default HomeScreen;
