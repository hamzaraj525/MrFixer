import React, {useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import style from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RegDocData from '../../DataStore/RegDocData';
import {useDispatch, useSelector} from 'react-redux';
const DocRegistration = ({route, navigation}) => {
  const [data, setData] = useState([]);
  const {Pic1, Pic2, Pic3, userName} = useSelector(
    reducers => reducers.cartReducer,
  );
  const {userKey} = route.params;

  useEffect(() => {}, []);

  const list = () => {
    return RegDocData.map(element => {
      return (
        <Pressable
          key={element.key}
          onPress={() => {
            navigation.navigate('DocRegDetails', {
              Item: element,
              userKey: userKey,
            });
          }}
          style={style.subContainers}>
          <View
            style={{
              width: '50%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={element.img} style={style.subImg} />
            <Text style={style.subTxt}>{element.title}</Text>
          </View>
          <MaterialIcons
            name={'keyboard-arrow-right'}
            size={27}
            color={'black'}
          />
        </Pressable>
      );
    });
  };

  return (
    <SafeAreaView style={[style.container, {}]}>
      <StatusBar
        barStyle={'dark-content'}
        hidden={true}
        backgroundColor="#0E0A30"
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
        }}>
        <Text style={style.naemTxt}>Welcome,{userName}</Text>
        <Text style={style.headerTxt}>Required Steps</Text>
        <Text style={style.headerSubTitle}>
          Here's you need to do to setup your account
        </Text>

        {list()}
      </ScrollView>
    </SafeAreaView>
  );
};
export default DocRegistration;
