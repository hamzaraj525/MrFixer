import React, {useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  View,
  Text,
  Pressable,
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
  const [picFixer1, setPicFixer1] = useState('');
  const {Pic1, Pic2, Pic3, userName, userId} = useSelector(
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
            key: child.key,
            userId: child.val().userId,
            pic1Verified: child.val().pic1Verified,
            pic2Verified: child.val().pic2Verified,
            pic3Verified: child.val().pic3Verified,
            FixerPic1: child.val().FixerPic1,
            FixerPic2: child.val().FixerPic2,
            FixerPic3: child.val().FixerPic3,
          });
        });
        setData(li);
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
            {data.map((item, i) => {
              if (item.userId === userId) {
                return (
                  <View key={i}>
                    <Image
                      source={
                        index === 0 && item.pic1Verified === true
                          ? element.img2
                          : index === 1 && item.pic2Verified === true
                          ? element.img2
                          : index === 2 && item.pic3Verified === true
                          ? element.img2
                          : element.img
                      }
                      style={[style.subImg, {}]}
                    />
                  </View>
                );
              }
            })}
            <View
              style={{
                marginLeft: 15,
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <Text style={style.subTxt}>{element.title}</Text>

              {data.map((item, i) => {
                if (item.userId === userId) {
                  return (
                    <View key={index}>
                      <Text style={style.subText}>
                        {index === 0 && item.pic1Verified === true
                          ? 'Verified'
                          : index === 1 && item.pic2Verified === true
                          ? 'Verified'
                          : index === 2 && item.pic3Verified === true
                          ? 'Verified'
                          : 'in Review'}
                      </Text>
                    </View>
                  );
                }
              })}
            </View>
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

        {data.map((item, i) => {
          if (item.userId === userId) {
            return (
              <View key={item.key}>
                {item.FixerPic1 !== '' &&
                item.FixerPic2 !== '' &&
                item.FixerPic3 !== '' ? (
                  <Text style={style.headerSubTitle}>
                    You have completed the sign up process.
                  </Text>
                ) : (
                  <Text style={style.headerSubTitle}>
                    Here's what you need to do to setup your account
                  </Text>
                )}
              </View>
            );
          }
        })}

        {data.map((item, i) => {
          if (item.userId === userId) {
            return (
              <View key={item.key}>
                <Text style={style.subMitTxt}>
                  {item.FixerPic1 !== '' &&
                  item.FixerPic2 !== '' &&
                  item.FixerPic3 !== ''
                    ? 'Submitted'
                    : 'Please Submit All steps'}
                </Text>
              </View>
            );
          }
        })}

        {list()}

        {/* {data.map((item, i) => {
          if (item.userId === userId) {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                }}
                key={item.key}>
                {item.FixerPic1 !== '' &&
                item.FixerPic2 !== '' &&
                item.FixerPic3 !== '' ? (
                  <>
                    <Text style={style.subMitTxt}>
                      Your Documents are under review
                    </Text>
                    <Text style={style.subMitTxt}>
                      this may take up to 24 hours
                    </Text>
                  </>
                ) : null}
              </View>
            );
          }
        })} */}

        {data.map((item, i) => {
          if (item.userId === userId) {
            return (
              <>
                {item.pic1Verified === true &&
                item.pic2Verified === true &&
                item.pic3Verified === true ? (
                  <TouchableOpacity
                    key={item.key}
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
              </>
            );
          }
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
export default DocRegistration;
