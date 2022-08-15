import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import style from './style';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constraints from '../../Constraints/Constraints';
import database from '@react-native-firebase/database';
import {
  addUserid,
  updateUserName,
  updateUserMail,
} from './../../Redux/Action/actions';

function SignUpOtpp({navigation, props, route}) {
  const dispatch = useDispatch();
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loader, setLoader] = React.useState(false);
  const [placeMail, setPlaceMail] = React.useState(false);
  const [phonePlace, setPhonePlace] = React.useState(false);
  const {cartItems, userContact} = useSelector(
    reducers => reducers.cartReducer,
  );

  const {code, userKey} = route.params;

  const uploadUserToDataBase = () => {
    setLoader(true);
    const newReference = database()
      .ref('riders/' + userKey)
      .update({
        userName: Name,
        userMail: email,
      });

    newReference
      .then(() => {
        setLoader(false);
        dispatch(updateUserName(Name));
        dispatch(updateUserMail(email));
        navigation.replace('DocRegistration', {userKey: userKey});
        console.log('Home screen');
      })
      .catch(error => {
        Alert.alert('Something went wrong');
      });
  };

  const done = () => {
    if (Name.length > 0 && email.length > 0) {
      uploadUserToDataBase();
    } else {
      alert('Please fill all the fields');
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}>
        <Pressable
          style={style.backBtn}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name={'arrow-back-outline'} size={30} color={'black'} />
        </Pressable>
        <Text style={style.title}>{Constraints.PERSONAL_DETAILS_TITLE}</Text>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name={'share'} size={30} color={'white'} />
        </Pressable>
      </View>
      <View style={style.bottomLine} />
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
          {loader ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={style.sinupBtn}>{Constraints.DONE_BTN}</Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
export default SignUpOtpp;
