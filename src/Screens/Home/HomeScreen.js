import React, {useState, useEffect, useCallback, useRef, useId} from 'react';
import {
  TouchableOpacity,
  Easing,
  FlatList,
  PermissionsAndroid,
  Text,
  Pressable,
  Animated,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import style from './style';
import moment from 'moment';
import Sound from 'react-native-sound';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {
  confirmOrder,
  addTimeOfOrder,
  addOrderUid,
  addOrderKey,
  addLatitude,
  addLontitude,
} from './../../Redux/Action/actions';
import {getPreciseDistance} from 'geolib';
import FastImage from 'react-native-fast-image';
import Images from '../../Constraints/Images';
import OrderDetail from '../OrderDetail/OrderDetail';
import Maps from '../../Components/Maps';
import GoBtn from '../../Components/GoBtn';
import GoingOrder from '../../Components/GoingOrder';
import TopLocBar from '../../Components/TopLocBar';
import BottomSheet from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const sound = new Sound('simplenotification.mp3');
const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [lat, setLat] = useState();
  const [order, setOrder] = useState(false);
  const [go, setGo] = useState(false);
  const [orderKey, setOrderKey] = useState();
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [statusUser, setStatus] = useState('');
  const [userPhone, setUsrPhone] = useState();
  const [long, setLong] = useState();
  const [list, setList] = useState([]);
  const [earnList, setEarnList] = useState([]);
  const [doL, setDo] = useState([]);
  const [locationText, setLocationText] = useState('');
  const [userNameTxt, setUserName] = useState('');
  const [userLocTxt, setUserlocTxt] = useState('');
  const [showText, setShowTxt] = useState(true);
  const [loader, setLoader] = useState(false);
  const [radarLoader, setRadarLoader] = useState(false);
  const [earningModal, setEaringModal] = useState(false);
  const [color, setColor] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [dataList, setDataList] = useState(false);
  const [hideMap, setHideMap] = useState(false);
  const [showGngOdr, setShowGngOrd] = useState(false);
  const [userLat, setUserLat] = useState();
  const [userLong, setUserLong] = useState();
  const [aginOrder, setAgainOrder] = useState(false);
  const dispatch = useDispatch();
  const verticalVal = useRef(new Animated.Value(0)).current;
  const timeDuration = useState(10);
  const slideAnimation = React.useRef(new Animated.Value(width)).current;
  const {userId} = useSelector(reducers => reducers.cartReducer);

  const filteredList = earnList.filter(item => item.FixerId === userId);
  const Total = filteredList
    ?.map(item => Number(item.TotalPrice))
    .reduce((prev, curr) => prev + curr, 0);

  const updateStatus = item => {
    setUserName(item.userName);
    setUsrPhone(item.userContact);
    setUserlocTxt(item.userLocation);
    setUserLat(item.latitude);
    setUserLong(item.longitude);
    setOrder(!order);
    setTimeout(() => {
      setShowGngOrd(true);
    }, 1000);
    dispatch(confirmOrder('Confirmed'));
    dispatch(addOrderUid(item.userKey));
    dispatch(addOrderKey(item.key));

    database()
      .ref('cartItems/' + item.key)
      .update({
        Status: 'Confirmed',
        OrderDone: true,
      })
      .then(() => {
        console.log('Status Confirmed.');
      });
  };

  const handleSound = sound => {
    sound.play();
    setTimeout(() => {
      sound.stop();
    }, 1000);
  };

  const getEarnList = () => {
    database()
      .ref('/cartItems')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          console.log(child.val());
          li.push({
            key: child.key,
            TotalPrice: child.val().TotalPrice,
            FixerId: child.val().FixerId,
          });
        });
        setEarnList(li);
      });
  };

  const getOrders = () => {
    setTimeout(() => {
      database()
        .ref('/cartItems')
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
              OrderDone: child.val().OrderDone,
              userId: child.val().userId,
              userKey: child.val().userKey,
              FixerId: child.val().FixerId,
            });
          });
          setList(li);
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
        dispatch(addLatitude(position.coords.latitude));
        dispatch(addLontitude(position.coords.longitude));
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
        var addressComponent = json.results[3].formatted_address;
        console.log('address is  here', addressComponent);
        setLocationText(addressComponent);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getEarnList();
    database()
      .ref('/users')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          li.push({
            key: child.key,
            Rating: child.val().Rating,
          });
        });
        setDo(li);
      });

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
    });
  }, [lat, long, toggle]);

  const goOnline = () => {
    setLoader(true);
    setTimeout(() => {
      setEaringModal(!earningModal);
      setToggle(!toggle);
      setLoader(false);
      setColor(true);
      setDataList(true);
      setTimeout(() => {
        setRadarLoader(true);
        setTimeout(() => {
          setOrder(!order);
          setDataList(false);
          setRadarLoader(false);
        }, 4000);

        setColor(false);
      }, 1000);
    }, 2000);
  };

  const getTimeandDuration = item => {
    fetch(
      'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' +
        lat +
        ',' +
        long +
        '&destinations=' +
        item.latitude +
        ',' +
        item.longitude +
        '&key=' +
        GOOGLE_MAPS_APIKEY,
    )
      .then(response => response.json())
      .then(json => {
        console.log('json---', json);
        setDistance(json.rows[0].elements[0].distance.text);
        setDuration(json.rows[0].elements[0].duration.text);
      });
  };

  const ColorAnimation = () => {
    Animated.sequence([
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 1,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnimation, {
        toValue: width,
        duration: 15 * 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // setTimeout(() => {
    //   setOrder(!order);
    //   setTimeout(() => {
    //     setAgainOrder(!aginOrder);
    //   }, 500);
    // }, 15 * 1000);
  };

  const renderOrders = ({item, index}) => {
    // getTimeandDuration(item, index);

    // var pdis = getPreciseDistance(
    //   {latitude: item.latitude, longitude: item.longitude},
    //   {latitude: lat, longitude: long},
    // );

    // const distancee = pdis / 1000;
    if (item.OrderDone === false) {
      return (
        <View style={style.orderCard}>
          {ColorAnimation()}
          {handleSound(sound)}
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                borderRadius: 7,
                backgroundColor: 'red',
                height: 3,
                width: width,
                transform: [{translateX: slideAnimation}],
              },
            ]}
          />
          {/* <Text style={style.duractionTxt}>{duration} </Text> */}
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
              {/* <Text style={style.priceTxt}>{distancee.toFixed(1)} km</Text> */}
            </View>
          </View>
          <View style={style.acceBtnContaner}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={style.acceptBtn}
              onPress={() => {
                updateStatus(item);
              }}>
              <Text style={{fontSize: 15, color: 'white', fontWeight: '500'}}>
                Accept
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (item.OrderDone === true) {
      return (
        <>
          <View
            style={{
              backgroundColor: '#fff',
              padding: '4%',
              alignItems: 'center',
              justifyContent: 'center',
              width: width,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: '500',
              }}>
              Currently No Orders Found
            </Text>
          </View>
        </>
      );
    }
  };

  const showOrders = () => {
    const shuffledList = list.sort(() => 0.5 - Math.random());

    let list2 = [];
    if (shuffledList.length === 1) {
      list2 = shuffledList;
    } else {
      list2.push(shuffledList[0]);
    }
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
        }}>
        <FlatList
          data={list2}
          renderItem={renderOrders}
          keyExtractor={item => item.key}
        />
      </View>
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
    setEaringModal(!earningModal);
    setOrder(false);
    setToggle(false);
    setShowGngOrd(false);
    setDataList(false);
    setHideMap(false);
    setColor(false);
  };

  return (
    <View style={style.container}>
      {hideMap ? (
        <OrderDetail
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
            locationText={locationText}
          />

          {!toggle ? (
            <>
              <Pressable
                style={style.profileBtn}
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <FastImage
                  style={style.profileImg}
                  resizeMode="cover"
                  source={Images.profileImgHome}
                />
              </Pressable>
            </>
          ) : null}
          {!toggle ? (
            <>
              <Pressable
                style={[style.earnBtn, {borderWidth: 0}]}
                onPress={() => {
                  setEaringModal(!earningModal);
                }}>
                <FastImage
                  style={style.earnImg}
                  resizeMode="cover"
                  source={Images.money}
                />
              </Pressable>
            </>
          ) : null}

          {!toggle && earningModal ? (
            <Animatable.View
              duration={600}
              useNativeDriver={true}
              animation={'zoomIn'}
              style={style.earningView}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'green',
                  fontWeight: '700',
                  alignItems: 'center',
                }}>
                Rs.{' '}
                <Text
                  style={{
                    fontSize: 19,
                    color: 'white',
                    fontWeight: '700',
                  }}>
                  {Total.toFixed(1)}
                </Text>
              </Text>

              <Text
                style={{
                  fontSize: 19,
                  color: 'grey',
                  fontWeight: '700',
                }}>
                Total Earnings
              </Text>
            </Animatable.View>
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
                useNativeDriver={true}
                delay={800}
                animation="slideInUp"
                style={[style.txtItems, {color: color ? '#82168D' : 'black'}]}>
                You're Offline
              </Animatable.Text>
            </View>
          ) : null}

          {dataList === true ? (
            <Animated.View
              style={[
                style.botomContainerTwo,
                {
                  backgroundColor: color ? '#3372e2' : 'white',
                  justifyContent: 'center',
                },
              ]}>
              <Animatable.Text
                useNativeDriver={true}
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
              userLat={userLat}
              userLong={userLong}
              showGngOdr={showGngOdr}
            />
          ) : null}

          {order ? <>{showOrders()}</> : null}
          {order ? (
            <View>
              <Pressable
                style={style.backArrow}
                onPress={() => {
                  doHideMap();
                }}>
                <Ionicons name={'close'} size={28} color={'black'} />
              </Pressable>
            </View>
          ) : null}

          {showGngOdr ? <TopLocBar userLocTxt={userLocTxt} /> : null}
        </>
      )}
      {radarLoader ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LottieView
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}
            source={Images.radarLoader}
            autoPlay
            loop={true}
          />
        </View>
      ) : null}

      {aginOrder ? (
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            style.acceptBtn,
            {
              bottom: 15,
              position: 'absolute',
              width: '50%',
              alignSelf: 'center',
            },
          ]}
          onPress={() => {
            setTimeout(() => {
              setRadarLoader(false);
              setOrder(!order);
            }, 2000);
            setRadarLoader(true);
            setAgainOrder(!aginOrder);
          }}>
          <Text style={{fontSize: 15, color: 'white', fontWeight: '500'}}>
            Request Again
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default HomeScreen;
