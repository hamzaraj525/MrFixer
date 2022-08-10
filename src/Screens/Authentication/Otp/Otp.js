import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StatusBar,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import style from './style';
import auth from '@react-native-firebase/auth';
import Images from '../../../Constraints/Images';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constraints from '../../../Constraints/Constraints';

const Otp = ({navigation}) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [loader, setLoader] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [phonePlace, setPhonePlace] = React.useState(false);

  const signInWithPhoneNumber = async () => {
    try {
      if (code !== '') {
        setLoader(true);
        const confirmation = await auth().signInWithPhoneNumber(code);
        // setConfirm(confirmation);
        console.log(confirmation);
        setLoader(false);

        if (confirmation._auth._authResult) {
          navigation.replace('Verify', {
            confirmation: confirmation,
            code: code,
          });
          setCode('');
        } else {
          alert('Failed');
        }
      } else {
        alert('Please enter valid phone number');
      }
    } catch (error) {
      if (error.code === 'auth/network-request-failed') {
        alert('Network Error');
      } else {
        alert(error);
      }
    }
  };

  return (
    <View style={style.container}>
      <StatusBar
        barStyle={'dark-content'}
        hidden={true}
        backgroundColor="#0E0A30"
      />

      <ScrollView bounces={false} contentContainerStyle={{flex: 1}}>
        <View style={style.subView}>
          <View style={style.imgContainer}>
            <Image style={style.icon} source={Images.logo} />
          </View>

          <Text style={style.signUpTxt}>{Constraints.MOBILE_NUMBER}</Text>
          <Text
            style={[
              style.txtAlready,
              {marginRight: 0, marginTop: '3%', fontSize: 13},
            ]}>
            {Constraints.MOBILE_NUMBER_Detail}
          </Text>
        </View>
        <View style={style.subViewTwo}>
          <View style={[style.passwordContainer, {marginTop: '10%'}]}>
            <Feather name="phone" size={20} color={'black'} />
            <TextInput
              keyboardType="phone-pad"
              style={style.TiName}
              value={code}
              onChangeText={text => {
                setCode(text);
              }}
              onFocus={() => {
                setPhonePlace(true);
              }}
              placeholder={phonePlace ? 'Enter your number' : '+92**********'}
              placeholderTextColor={phonePlace ? 'black' : 'grey'}
            />
          </View>

          <Pressable
            disabled={loader ? true : false}
            onPress={() => {
              signInWithPhoneNumber();
            }}
            style={style.loginBtn}>
            {loader ? (
              <ActivityIndicator style={{}} size="small" color="white" />
            ) : (
              <>
                <Text style={style.sinupBtn}>{Constraints.NEXT_BTN}</Text>
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
};
export default Otp;
