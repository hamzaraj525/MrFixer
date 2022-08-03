import React, {useState, useRef, useEffect} from 'react';
import {
  TouchableOpacity,
  Easing,
  FlatList,
  PermissionsAndroid,
  Text,
  Pressable,
  Animated,
  View,
} from 'react-native';
import style from './style';
import Sound from 'react-native-sound';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {confirmOrder} from './../../Redux/Action/actions';
import {getPreciseDistance} from 'geolib';
import FastImage from 'react-native-fast-image';
import Images from '../../Constraints/Images';
import OrderDetail from '../OrderDetail/OrderDetail';
import Maps from '../../Components/Maps';
import GoBtn from '../../Components/GoBtn';
import GoingOrder from '../../Components/GoingOrder';
import TopLocBar from '../../Components/TopLocBar';

const HomeScreen = ({navigation}) => {
  const [lat, setLat] = useState();
  const [order, setOrder] = useState(false);
  const [orderKey, setOrderKey] = useState();
  const [statusUser, setStatus] = useState('');
  const [userPhone, setUsrPhone] = useState();
  const [long, setLong] = useState();
  const [list, setList] = useState([]);
  const [locationText, setLocationText] = useState('');
  const [userNameTxt, setUserName] = useState('');
  const [userLocTxt, setUserlocTxt] = useState('');
  const [showText, setShowTxt] = useState(true);
  const [loader, setLoader] = useState(false);
  const [color, setColor] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [dataList, setDataList] = useState(false);
  const [hideMap, setHideMap] = useState(false);
  const [showGngOdr, setShowGngOrd] = useState(false);
  const [userLat, setUserLat] = useState();
  const [userLong, setUserLong] = useState();
  const dispatch = useDispatch();
  const translateY = useRef(new Animated.Value(0)).current;
  const verticalVal = useRef(new Animated.Value(0)).current;
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const {userId, userName, userMail, userContact, Status} = useSelector(
    reducers => reducers.cartReducer,
  );

  const updateStatus = item => {
    dispatch(confirmOrder('Confirmed'));
    database()
      .ref('cartItems/' + item.key)
      .update({
        Status: 'Confirmed',
      })
      .then(() => console.log('Status Confirmed.'));
  };

  const handleSound = sound => {
    sound.play();
    setTimeout(() => {
      sound.stop();
    }, 1000);
  };

  const getOrders = () => {
    const sound = new Sound('simplenotification.mp3');
    setTimeout(() => {
      database()
        .ref('/cartItems')
        .limitToFirst(1)
        .on('value', snapshot => {
          var li = [];
          snapshot.forEach(child => {
            console.log(child.val());
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
              userLocation: child.val().userLocation,
              Status: child.val().Status,
            });
          });
          setList(li);
          setStatus(li[0].Status);
          console.log('ssssss---' + li[0].Status);
          setUserlocTxt(li[0].userLocation);
          console.log('Loc---' + li[0].userLocation);
          setUserLat(li[0].latitude);
          setUserLong(li[0].longitude);
          setUsrPhone(li[0].userContact);
          setOrderKey(li[0].key);
          setUserName(li[0].userName);
          handleSound(sound);
        });
    }, 2300);
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
    if (toggle) {
      getOrders();
    } else {
      console.log('not toggle');
    }

    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      _getCurrentLocation();
    }
    Animated.timing(verticalVal, {
      toValue: 10,
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
    }).start();
    verticalVal.addListener(({value}) => {
      if (value == 10) {
        Animated.timing(verticalVal, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
        }).start();
      } else if (value == 0) {
        Animated.timing(verticalVal, {
          toValue: 10,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
        }).start();
      }
      Animated.loop(
        Animated.sequence([
          Animated.timing(slideAnimation, {
            toValue: 255,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });
  }, [lat, long, toggle]);

  const goOnline = () => {
    setOrder(false);
    setLoader(true);
    setTimeout(() => {
      setToggle(!toggle);
      setLoader(false);
      setColor(true);
      setDataList(true);

      setTimeout(() => {
        setTimeout(() => {
          setOrder(true);
          setDataList(false);
        }, 1600);
        setColor(false);
      }, 1000);
    }, 2000);
  };

  const renderOrders = ({item, index}) => {
    var pdis = getPreciseDistance(
      {latitude: item.latitude, longitude: item.longitude},
      {latitude: lat, longitude: long},
    );
    const distance = pdis / 1000;
    if (distance < 10) {
      return (
        <View style={style.orderCard}>
          <View style={style.orderSubCard}>
            <View style={style.orderCardText}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                source={require('./../../../assets/Images/profile.png')}
                style={{
                  width: 45,
                  height: 45,
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
          <View style={style.acceBtnContaner}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={style.acceptBtn}
              onPress={() => {
                setOrder(!order);
                setTimeout(() => {
                  setShowGngOrd(true);
                }, 1000);
                updateStatus(item);
              }}>
              <Text style={{fontSize: 15, color: 'white'}}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const showOrders = () => {
    return (
      <Animatable.View
        delay={800}
        animation="slideInUp"
        style={{
          position: 'absolute',
          bottom: 20,
        }}>
        <FlatList
          data={list}
          renderItem={renderOrders}
          keyExtractor={item => item.key}
        />
      </Animatable.View>
    );
  };

  const hideMapScreen = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setHideMap(true);
    }, 2000);
  };

  const doHideMap = () => {
    setOrder(false);
    setToggle(!toggle);
    setShowGngOrd(false);
    setDataList(false);
    setHideMap(false);
    setColor(false);
  };

  return (
    <View style={style.container}>
      {hideMap ? (
        <OrderDetail
          Status={statusUser}
          Item={orderKey}
          hideMap={hideMap}
          doHideMap={doHideMap}
          userNameTxt={userNameTxt}
          order={order}
        />
      ) : (
        <>
          <Maps
            lat={lat}
            long={long}
            userLat={userLat}
            userLong={userLong}
            showGngOdr={showGngOdr}
          />

          {!toggle ? (
            <Pressable
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <FastImage
                resizeMode="cover"
                style={style.profileImg}
                source={Images.profileImgHome}
              />
            </Pressable>
          ) : null}

          {!toggle ? (
            <GoBtn
              loader={loader}
              goOnline={goOnline}
              verticalVal={verticalVal}
            />
          ) : null}

          {!toggle ? (
            <View
              style={[
                style.botomContainer,
                {backgroundColor: color ? '#82168D' : 'white'},
              ]}>
              <Animatable.Text
                delay={800}
                animation="slideInUp"
                style={[style.txtItems, {color: color ? '#82168D' : 'black'}]}>
                Your're Offline
              </Animatable.Text>
            </View>
          ) : null}

          {dataList === true ? (
            <Animated.View
              style={[
                style.botomContainerTwo,
                {
                  backgroundColor: color ? '#82168D' : 'white',
                  justifyContent: 'center',
                },
              ]}>
              <Animatable.Text
                delay={800}
                animation="slideInUp"
                style={[style.txtItems, {color: color ? '#82168D' : 'black'}]}>
                Finding Orders
              </Animatable.Text>
            </Animated.View>
          ) : null}

          {showGngOdr === true ? (
            <GoingOrder
              loader={loader}
              doHideMap={doHideMap}
              userPhone={userPhone}
              color={color}
              hideMapScreen={hideMapScreen}
            />
          ) : null}

          {order ? showOrders() : null}

          {showGngOdr ? <TopLocBar userLocTxt={userLocTxt} /> : null}
        </>
      )}
    </View>
  );
};

export default HomeScreen;
