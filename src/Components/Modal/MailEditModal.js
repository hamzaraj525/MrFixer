import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  Animated,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import {updateUserMail} from '../../Redux/Action/actions';

const MailEditModal = props => {
  const [mail, setMail] = useState('');
  const dispatch = useDispatch();

  const scaleValue = useRef(new Animated.Value(0)).current;

  const animateModal = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const updaterMail = () => {
    if (mail.length > 0) {
      props.hideMailModal();

      database()
        .ref('riders/' + props.mailEdit)
        .update({
          userMail: mail,
        })
        .then(() => {
          dispatch(updateUserMail(mail));
          console.log('mail updated.');
        });
      animateModal();
    } else {
      alert('Please Enter Mail');
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        props.hideMailModal();
      }}
      visible={props.showMailModal}>
      <SafeAreaView style={styles.container}>
        <Animated.View style={styles.containerr}>
          <View style={styles.whiteContainer}>
            <View style={styles.passwordContainer}>
              <TextInput
                autoFocus={true}
                style={styles.TiName}
                value={mail}
                onChangeText={text => setMail(text)}
                placeholder="Enter your Email"
                placeholderTextColor={'grey'}
              />
            </View>
            <Pressable
              style={styles.loginBtn}
              onPress={() => {
                updaterMail();
              }}>
              <Text style={styles.okBtnTxt}>{Constraints.OK}</Text>
            </Pressable>
          </View>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};
export default MailEditModal;
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
