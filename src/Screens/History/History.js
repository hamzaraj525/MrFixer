import React, {useState, useEffect} from 'react';
import style from './style';
import database from '@react-native-firebase/database';
import {
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import {useDispatch, useSelector} from 'react-redux';
function History({navigation}) {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDAhaR1U_-EQJZu4Ckm0iUQ4gxSWqIMOvY';
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [color, setColor] = useState(0);
  const [list, setList] = useState([]);
  const {userId, userContact} = useSelector(reducers => reducers.cartReducer);

  useEffect(() => {
    setLoader(true);
    database()
      .ref('/cartItems')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          li.push({
            key: child.key,
            OrderTime: child.val().OrderTime,
            FixerId: child.val().FixerId,
            userContact: child.val().userContact,
            userName: child.val().userName,
            userMail: child.val().userMail,
            userId: child.val().userId,
            latitude: child.val().latitude,
            longitude: child.val().longitude,
            userLocation: child.val().userLocation,
            TotalPrice: child.val().TotalPrice,
            Status: child.val().Status,
            reservation: child.val().reservation,
            FixerLat: child.val().FixerLat,
            FixerLong: child.val().FixerLong,
          });
        });
        setLoader(false);
        setList(li);
      });
  }, []);

  const OrderHistory = () => {
    return list.map((item, index) => {
      if (userId === item.FixerId) {
        return (
          <View key={index}>
            <View key={item.key} style={style.cartItemsContainer}>
              <View
                style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style={{fontSize: 14, color: 'grey'}}>
                  {item.reservation}
                </Text>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#000'}}>
                  {item.TotalPrice}
                </Text>
              </View>

              <MapView
                showsMyLocationButton={false}
                zoomTapEnabled={false}
                zoomEnabled={false}
                scrollEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
                provider={PROVIDER_GOOGLE}
                style={style.map}
                region={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}>
                <MapView.Marker
                  pinColor={'red'}
                  coordinate={{
                    latitude: item.FixerLat,
                    longitude: item.FixerLong,
                  }}
                />
                <MapView.Marker
                  pinColor={'orange'}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                />

                <MapViewDirections
                  origin={{
                    latitude: item.FixerLat,
                    longitude: item.FixerLong,
                  }}
                  destination={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor="red"
                />
              </MapView>
            </View>
          </View>
        );
      }
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          marginTop: 10,
          marginBottom: 10,
          paddingHorizontal: 15,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 26,
            fontWeight: '800',
          }}>
          Your order history
        </Text>
      </View>
      {loader ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '10%'}}
          style={{marginTop: '2%'}}>
          {OrderHistory()}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default History;
