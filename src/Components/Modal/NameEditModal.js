import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import Constraints from './../../Constraints/Constraints';
import {updateUserName} from '../../Redux/Action/actions';

const NameEditModal = props => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const {userName} = useSelector(reducers => reducers.cartReducer);
  const scaleValue = useRef(new Animated.Value(0)).current;

  const animateModal = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const updateName = () => {
    if (userName.length > 0) {
      props.hideNameModal();
      dispatch(updateUserName(userName));
      animateModal();

      database()
        .ref('riders/' + props.nameEdit)
        .update({
          userName: userName,
        })
        .then(() => console.log('name updated.'));
    } else {
      alert('Please Enter Name');
    }
  };

  console.log(props.nameEdit);
  console.log(props.idEdit);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        props.hideNameModal();
      }}
      visible={props.showNameModal}>
      <SafeAreaView style={styles.container}>
        <Animated.View style={styles.containerr}>
          <View style={styles.whiteContainer}>
            <View style={styles.passwordContainer}>
              <TextInput
                autoFocus={true}
                style={styles.TiName}
                value={userName}
                onChangeText={text => {
                  dispatch(updateUserName(text));
                }}
                placeholder="Enter your name"
                placeholderTextColor={'grey'}
              />
            </View>
            <Pressable
              style={styles.loginBtn}
              onPress={() => {
                updateName();
              }}>
              <Text style={styles.okBtnTxt}>{Constraints.OK}</Text>
            </Pressable>
          </View>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};
export default NameEditModal;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  whiteContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  passwordContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    backgroundColor: '#F6F3F5',
    borderRadius: 25,
    padding: 12,
    width: '80%',
    height: 45,
    alignItems: 'center',
    alignSelf: 'center',
  },
  TiName: {
    fontFamily: 'RobotoSlab-Bold',
    width: '90%',
    height: 50,
    marginLeft: 6,
  },
  loginBtn: {
    width: '30%',
    marginTop: '5%',
    height: '18%',
    backgroundColor: 'red',
    borderRadius: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  containerr: {
    width: '75%',
    height: '30%',
    backgroundColor: '#ffffff',
    borderRadius: 33,
  },

  okBtnTxt: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 17,
    fontWeight: '800',
    color: 'white',
  },
});
