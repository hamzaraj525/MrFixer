import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';

import style from './style';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {connect, useDispatch, useSelector} from 'react-redux';
import {addUserid, logoutUser} from '../../Redux/Action/actions';

function SignUpOtpp({navigation, props, route}) {
  const [phonePlace, setPhonePlace] = React.useState(false);
  const [placeMail, setPlaceMail] = React.useState(false);
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const {confirmation, code} = route.params;
  const dispatch = useDispatch();
  const {
    cartItems,
    userId,
    userName,
    userMail,
    userContact,
    userlocation,
    lat,
    long,
  } = useSelector(reducers => reducers.cartReducer);

  const done = () => {
    if (Name.length > 0 && email.length > 0) {
      navigation.navigate('Verify', {
        confirmation: confirmation,
        code: code,
        name: Name,
        Email: email,
      });
    } else {
      alert('Please fill all the fields');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          marginTop: '4%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
        }}>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
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
            color: 'black',
            fontWeight: '500',
            fontSize: 21,
          }}>
          Personal Details
        </Text>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {}}>
          <Ionicons style={{}} name={'share'} size={30} color={'white'} />
        </Pressable>
      </View>
      <View
        style={{
          alignSelf: 'center',
          width: '40%',
          height: 0.9,
          marginTop: -1,
          backgroundColor: 'black',
        }}
      />
      <ScrollView
        contentContainerStyle={{paddingBottom: '6%'}}
        style={{paddingHorizontal: '5%'}}>
        <View style={[style.passwordContainer, {marginTop: '10%'}]}>
          <TextInput
            style={style.TiName}
            value={Name}
            onChangeText={text => {
              setName(text);
            }}
            onFocus={() => {
              setPhonePlace(true);
            }}
            placeholder={phonePlace ? 'Hamza' : 'Enter your Name'}
            placeholderTextColor={phonePlace ? 'black' : 'grey'}
          />
        </View>
        <View style={[style.passwordContainer, {marginTop: '10%'}]}>
          <TextInput
            style={style.TiName}
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
            onFocus={() => {
              setPlaceMail(true);
            }}
            placeholder={placeMail ? 'abc12@gmail.com' : 'Enter your Email'}
            placeholderTextColor={placeMail ? 'black' : 'grey'}
          />
        </View>
        <View
          style={[
            style.passwordContainer,
            {alignItems: 'center', flexDirection: 'column', marginTop: '10%'},
          ]}>
          <Text style={[style.TiName, {}]}>{code}</Text>
        </View>
        <Pressable
          onPress={() => {
            done();
          }}
          style={style.loginBtn}>
          <Text style={style.sinupBtn}>Done</Text>

          {/* <Ionicons
            style={{marginLeft: '3%'}}
            name={'arrow-forward'}
            size={25}
            color={'white'}
          /> */}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
export default SignUpOtpp;
