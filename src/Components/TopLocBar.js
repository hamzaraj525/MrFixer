import React, {useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Images from '../Constraints/Images';

const TopLocBar = props => {
  return (
    <>
      <View style={[styles.topViewContain, {}]}>
        <FastImage
          resizeMode="contain"
          style={[styles.locImg]}
          source={Images.locationImg}
        />
        <Text numberOfLines={3} style={[styles.locTxtStyle, {}]}>
          {props.userLocTxt}
        </Text>
      </View>
    </>
  );
};
export default TopLocBar;
const styles = StyleSheet.create({
  topViewContain: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '6%',
    paddingHorizontal: '2%',
    position: 'absolute',
    top: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#3372e2',
    borderRadius: 8,
  },
  locImg: {
    width: 35,
    height: 35,
  },
  locTxtStyle: {
    color: 'white',
    fontSize: 16,
    width: '50%',
    left: '30%',
  },
});
