import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StatusBar,
  Pressable,
} from 'react-native';
import database from '@react-native-firebase/database';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import style from './style.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {addUserid} from '../../../Redux/Action/actions';

function Verify({navigation, props, route}) {
  const [verifyCode, setVerify] = useState('');
  const [timeer, setTimer] = useState(30);
  const [verifyPlace, setVerifyPlace] = useState(false);

  const dispatch = useDispatch();
  const {userId, userlocation, lat, long} = useSelector(
    reducers => reducers.cartReducer,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev > 0) {
          return prev - 1;
        } else {
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const uploadUserToDataBase = results => {
    const newReference = database().ref('/riders').push();
    const idd = Math.floor(Math.random() * 1999 + 20000);
    newReference
      .set({
        key: newReference.key,
        userId: results.user._user.uid,
        userName: results.user._user.displayName,
        userMail: results.user._user.email,
        userPhone: results.user._user.phoneNumber,
      })
      .then(() => {
        dispatch(
          addUserid(
            results.user._user.uid,
            results.user._user.displayName,
            results.user._user.email,
            results.user._user.phoneNumber,
          ),
        );
      })
      .then(() => {
        console.log('User Done');
      })
      .catch(error => {
        Alert.alert('Something went wrong');
      });
  };

  const verifyUser = async () => {
    const {confirmation, code, Email, name} = route.params;
    try {
      if (verifyCode !== '' && verifyCode.length === 6) {
        const results = await confirmation.confirm(verifyCode);
        results.user._user.displayName = name;
        results.user._user.email = Email;

        uploadUserToDataBase(results);
        console.log(results);
        navigation.replace('Location');
      } else {
        alert('Please enter valid OTP code.');
      }
    } catch (error) {
      alert('Invalid code.');
    }
  };

  return (
    <View style={style.container}>
      <StatusBar hidden={true} />

      <ScrollView bounces={false} contentContainerStyle={{flex: 1}}>
        <View
          style={{
            flex: 1.4,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'gold',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 95 / 2,
              width: 95,
              height: 95,
              backgroundColor: '#EAC36D',
              marginBottom: '3%',
            }}>
            <Image
              style={{width: 50, tintColor: 'black', height: 50}}
              source={require('./../.././../../assets/Images/otp.png')}
            />
          </View>

          <Text style={style.signUpTxt}>OTP</Text>
          <Text
            style={[
              style.txtAlready,
              {marginRight: 0, marginTop: '3%', fontSize: 13},
            ]}>
            Please enter the OTP send to your Mobile number
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            borderTopStartRadius: 70,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <OTPInputView
            style={{
              width: '85%',
              marginTop: '20%',
              height: 51,
            }}
            pinCount={6}
            code={verifyCode}
            onCodeChanged={code => {
              setVerify(code);
            }}
            codeInputFieldStyle={style.underlineStyleBase}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />
          <View style={style.alreadytxtContainer}>
            <Text style={style.txtAlready}>Didn't receive code?</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setTimer(30);
              }}>
              <Text style={style.logintXT}>Resend ({timeer + 's'})</Text>
            </TouchableOpacity>
          </View>
          <Pressable
            onPress={() => {
              verifyUser();
            }}
            style={style.loginBtn}>
            <Text style={style.sinupBtn}>Submit</Text>

            <Ionicons
              style={{marginLeft: '3%'}}
              name={'arrow-forward'}
              size={25}
              color={'white'}
            />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
export default Verify;
