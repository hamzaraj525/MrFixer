import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Alert,
  Pressable,
  SafeAreaView,
} from 'react-native';
import style from './style';
import FastImage from 'react-native-fast-image';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../Redux/Action/actions';

function ProfileScreen({navigation, props, route}) {
  const dispatch = useDispatch();
  const {userId, userName, userMail, userContact, userlocation, lat, long} =
    useSelector(reducers => reducers.cartReducer);

  const profileList = [
    {
      name: 'Account',
      icon: require('./../../../assets/Images/user.png'),
    },
    {
      name: 'About Us',
      icon: require('./../../../assets/Images/information.png'),
    },
    {
      name: 'Address',
      icon: require('./../../../assets/Images/location.png'),
    },

    {
      name: 'Terms & Conditions',
      icon: require('./../../../assets/Images/term.png'),
    },
    {
      name: 'Privacy Policy',
      icon: require('./../../../assets/Images/padlock.png'),
    },
  ];

  const list = () => {
    return profileList.map((element, index) => {
      return (
        <View
          style={{
            alignSelf: 'center',
            marginBottom: 22,
            width: Dimensions.get('window').width - 50,
          }}
          key={index}>
          <Pressable
            onPress={() => {
              if (element.name == 'About Us') {
                navigation.navigate('About');
              } else if (element.name == 'Terms & Conditions') {
                navigation.navigate('TermsCondition');
              } else if (element.name == 'Privacy Policy') {
                navigation.navigate('Privacy');
              } else if (element.name == 'Account') {
                navigation.navigate('ProfileEditt');
              } else if (element.name == 'Address') {
                navigation.navigate('Location');
              }
            }}
            style={{
              borderRadius: 15,
              paddingVertical: '3%',
              paddingHorizontal: '8%',
              backgroundColor: '#ecf5fb',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: 41,
                height: 41,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FastImage
                resizeMode="cover"
                priority={FastImage.priority.normal}
                style={{
                  width: 26,
                  height: 26,
                }}
                source={element.icon}
              />
            </View>
            <View
              style={{
                borderRadius: 12,
                marginLeft: '12%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '77%',
                height: 33,
              }}>
              <Text style={{fontWeight: '500', fontFamily: 'RobotoSlab-Bold'}}>
                {element.name}
              </Text>
              <Ionicons
                style={{}}
                name={'arrow-forward-outline'}
                size={30}
                color={'black'}
              />
            </View>
          </Pressable>
        </View>
      );
    });
  };

  const showAlert = () =>
    Alert.alert('Confirmation', 'Are you sure you want to sign out ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          try {
            auth()
              .signOut()
              .then(() => {
                dispatch(
                  logoutUser(
                    userId,
                    userName,
                    userMail,
                    userContact,
                    userlocation,
                    lat,
                    long,
                  ),
                );
              })
              .then(() => {
                console.log('User signed out!');
                navigation.replace('OtpStack');
              })
              .catch(error => {
                alert('No user is signed in' + error);
              });
          } catch (error) {
            alert(error);
          }
        },
      },
    ]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <ScrollView
        style={{
          padding: '2%',
          borderRadius: 33,
          borderWidth: 0.2,
          borderColor: 'black',
        }}>
        <Pressable
          style={{marginTop: '2%', marginLeft: '2%'}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons
            style={{}}
            name={'arrow-back-outline'}
            size={30}
            color={'black'}
          />
        </Pressable>
        <Text
          style={{
            fontFamily: 'RobotoSlab-Bold',
            marginLeft: '2%',
            marginTop: '7%',
            color: 'black',
            width: '55%',
            fontWeight: '600',
            fontSize: 29,
            marginBottom: 3,
          }}>
          My
        </Text>

        <Text
          style={{
            marginLeft: '2%',
            fontWeight: '600',
            color: 'black',
            width: '55%',
            fontSize: 27,
            marginBottom: '10%',
            fontFamily: 'RobotoSlab-Bold',
          }}>
          Profile 😃
        </Text>

        <View
          style={{
            marginBottom: '6%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Pressable
            style={{
              alignItems: 'center',
              height: 55,
              width: 55,
              borderRadius: 55 / 2,
              justifyContent: 'center',
              borderWidth: 0.9,
              borderColor: 'grey',
            }}
            onPress={() => {
              shareApp();
            }}>
            <FontAwesome5
              style={{}}
              name={'share-alt'}
              size={25}
              color={'black'}
            />
          </Pressable>

          <Pressable
            style={{
              alignItems: 'center',
              width: 115,
              height: 115,
              borderRadius: 115 / 2,
              justifyContent: 'center',
              borderWidth: 0.5,
              borderColor: 'grey',
            }}
            onPress={() => {
              navigation.navigate('ProfileEditt');
            }}>
            <FastImage
              resizeMode="cover"
              priority={FastImage.priority.normal}
              style={{
                borderRadius: 100 / 2,
                width: 100,
                height: 100,
              }}
              source={require('../../../assets/Images/h.jpeg')}
            />
          </Pressable>
          <Pressable
            style={{
              alignItems: 'center',
              height: 55,
              width: 55,
              borderRadius: 55 / 2,
              justifyContent: 'center',
              borderWidth: 0.9,
              borderColor: 'grey',
            }}
            onPress={() => {
              showAlert();
            }}>
            <Ionicons style={{}} name={'log-out'} size={30} color={'black'} />
          </Pressable>
        </View>

        <Text
          style={{
            fontFamily: 'RobotoSlab-Bold',
            alignSelf: 'center',
            fontWeight: '600',
            color: 'black',
            fontSize: 24,
            marginBottom: '8%',
          }}>
          {userName}
        </Text>
        {list()}
      </ScrollView>
    </SafeAreaView>
  );
}
export default ProfileScreen;
