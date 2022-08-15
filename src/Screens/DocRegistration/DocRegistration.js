import React, {useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import style from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RegDocData from '../../DataStore/RegDocData';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';

const DocRegistration = ({route, navigation}) => {
  const [data, setData] = useState([]);
  const [pic1Txt, setPic1Txt] = useState(false);
  const [pic2Txt, setPic2Txt] = useState(false);
  const [pic3Txt, setPic3Txt] = useState(false);
  const [picFixer1, setPicFixer1] = useState('');
  const [picFixer2, setPicFixer2] = useState('');
  const [picFixer3, setPicFixer3] = useState('');
  const {Pic1, Pic2, Pic3, userName} = useSelector(
    reducers => reducers.cartReducer,
  );
  const {userKey} = route.params;

  useEffect(() => {
    database()
      .ref('/riders')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          li.push({
            pic1Verified: child.val().pic1Verified,
            pic2Verified: child.val().pic2Verified,
            pic3Verified: child.val().pic3Verified,
            FixerPic1: child.val().FixerPic1,
            FixerPic2: child.val().FixerPic2,
            FixerPic3: child.val().FixerPic3,
          });
        });
        setData(li);
        setPic1Txt(li[0].pic1Verified);
        setPic2Txt(li[0].pic2Verified);
        setPic3Txt(li[0].pic3Verified);
        setPicFixer1(li[0].FixerPic1);
        setPicFixer2(li[0].FixerPic2);
        setPicFixer3(li[0].FixerPic3);
      });
  }, []);

  const list = () => {
    return RegDocData.map((element, index) => {
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
            <Image
              source={
                index === 0 && pic1Txt === true
                  ? element.img2
                  : index === 1 && pic2Txt === true
                  ? element.img2
                  : index === 2 && pic3Txt === true
                  ? element.img2
                  : element.img
              }
              style={style.subImg}
            />

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
          Here's what you need to do to setup your account
        </Text>

        {picFixer1 !== '' && picFixer2 !== '' && picFixer3 !== '' ? (
          <Text style={style.subMitTxt}>Submitted</Text>
        ) : (
          <Text style={style.subMitTxt}> Please Submit All steps</Text>
        )}

        {list()}
        {pic1Txt === true && pic2Txt === true && pic3Txt === true ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate('AccReady');
            }}
            style={[style.loginBtn, {backgroundColor: '#3372e2'}]}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Finish
            </Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};
export default DocRegistration;
