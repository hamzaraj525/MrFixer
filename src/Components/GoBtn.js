import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const GoBtn = props => {
  return (
    <>
      <Animated.View
        style={[
          styles.onlineBtn,
          {transform: [{translateY: props.verticalVal}]},
        ]}>
        <TouchableOpacity
          disabled={props.loader ? true : false}
          activeOpacity={0.8}
          onPress={() => {
            props.goOnline();
          }}>
          {props.loader ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text style={styles.goBtnTxt}>GO</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};
export default GoBtn;
const styles = StyleSheet.create({
  goBtnTxt: {color: 'white', alignSelf: 'center', fontSize: 22},
  onlineBtn: {
    borderWidth: 6,
    borderColor: 'white',
    elevation: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: '6%',
    position: 'absolute',
    backgroundColor: '#3372e2',
    bottom: '10%',
    alignSelf: 'center',
  },
});
