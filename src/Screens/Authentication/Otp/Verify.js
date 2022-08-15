import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import style from './style.js';
import Images from '../../../Constraints/Images.js';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import {addUserid} from './../../../Redux/Action/actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constraints from '../../../Constraints/Constraints.js';
import OTPInputView from '@twotalltotems/react-native-otp-input';

function Verify({navigation, props, route}) {
  const {confirmation, code, Email, name} = route.params;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [timeer, setTimer] = useState(30);
  const [verifyCode, setVerify] = useState('');
  const [verifyPlace, setVerifyPlace] = useState(false);

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
    let rootRef = database().ref();
    const newReference = database().ref('/riders').push();

    rootRef
      .child('riders')
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          setLoader(false);
          newReference
            .set({
              key: newReference.key,
              userId: results.user._user.uid,
              userPhone: results.user._user.phoneNumber,
            })
            .then(() => {
              console.log('-------exists');
              dispatch(
                addUserid(
                  results.user._user.uid,
                  results.user._user.phoneNumber,
                ),
              );
              navigation.replace('Home');
            });
        } else {
          newReference
            .set({
              key: newReference.key,
              userId: results.user._user.uid,
              userPhone: results.user._user.phoneNumber,
              FixerPic1: '',
              FixerPic2: '',
              FixerPic3: '',
              pic1Verified: false,
              pic2Verified: false,
              pic3Verified: false,
            })
            .then(() => {
              dispatch(
                addUserid(
                  results.user._user.uid,
                  results.user._user.phoneNumber,
                ),
              );
            })
            .then(() => {
              setLoader(false);
              navigation.replace('SignUpOtpp', {
                results: results,
                code: code,
                userKey: newReference.key,
              });
            })
            .catch(error => {
              alert('Something went wrong' + error);
            });
        }
      });
  };

  const verifyUser = async () => {
    setLoader(true);
    try {
      if (verifyCode !== '' && verifyCode.length === 6) {
        const results = await confirmation.confirm(verifyCode);
        uploadUserToDataBase(results);
      } else {
        alert('Please enter valid OTP code.');
      }
    } catch (error) {
      alert('Invalid code.' + error);
    }
  };

  return (
    <View style={style.container}>
      <StatusBar hidden={true} />

      <ScrollView bounces={false} contentContainerStyle={{flex: 1}}>
        <View style={style.subView}>
          <View style={style.imgContainer}>
            <Image
              style={{width: 50, tintColor: 'black', height: 50}}
              source={Images.logoOtp}
            />
          </View>

          <Text style={style.signUpTxt}>{Constraints.OTP}</Text>
          <Text
            style={[
              style.txtAlready,
              {marginRight: 0, marginTop: '3%', fontSize: 13},
            ]}>
            {Constraints.ENTER_OTP}
          </Text>
        </View>
        <View style={style.subViewTwo}>
          <OTPInputView
            style={style.otpStyle}
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
            <Text style={style.txtAlready}>{Constraints.DID_RECEIVE_CODE}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setTimer(30);
              }}>
              <Text style={style.logintXT}>
                {Constraints.RESEND} ({timeer + 's'})
              </Text>
            </TouchableOpacity>
          </View>
          <Pressable
            onPress={() => {
              verifyUser();
            }}
            style={style.loginBtn}>
            {loader ? (
              <ActivityIndicator style={{}} size="small" color="white" />
            ) : (
              <>
                <Text style={style.sinupBtn}>{Constraints.SUBMIT_BTN}</Text>

                <Ionicons
                  style={{marginLeft: '3%'}}
                  name={'arrow-forward'}
                  size={25}
                  color={'white'}
                />
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

export default Verify;
