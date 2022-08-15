import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Platform,
  StatusBar,
  Modal,
  Animated,
} from 'react-native';
import LottieView from 'lottie-react-native';

function CompleteModal({navigation, showCompleteModal, closeModal}) {
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        hidden={true}
        backgroundColor="#0E0A30"
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={showCompleteModal}>
        <SafeAreaView
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#000000aa',
          }}>
          <Animated.View style={styles.containerr}>
            <View
              style={{
                flex: 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1A1E21',
              }}>
              <LottieView
                style={{width: 140, height: 140}}
                source={require('./../../../assets/Animations/done.json')}
                autoPlay
                loop={false}
              />
            </View>
            <View
              style={{
                flex: 3,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              <Pressable style={{}} onPress={() => {}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: '400',
                    fontSize: 17,
                  }}>
                  Thanks for submission
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.loginBtn,
                  {
                    marginTop: '5%',
                    backgroundColor: 'black',
                  },
                ]}
                onPress={() => {
                  closeModal();
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '700',
                    color: 'white',
                  }}>
                  Go to next step
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </>
  );
}
export default CompleteModal;
const styles = StyleSheet.create({
  containerr: {
    width: '75%',
    height: '50%',
    backgroundColor: '#ffffff',
    borderRadius: 33,
  },
  loginBtn: {
    width: '60%',
    height: 40,
    backgroundColor: 'orange',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
