import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const ProgressBar = ({props}) => {
  const {Status} = useSelector(reducers => reducers.cartReducer);
  return (
    <>
      {Status === 'Confirmed' ? (
        <View style={style.progress}>
          <View style={style.bar} />
          <View style={style.barGrey} />
          <View style={style.barGrey} />
          <View style={style.barGrey} />
        </View>
      ) : Status === 'Work Started' ? (
        <View style={style.progress}>
          <View style={style.bar} />
          <View style={style.bar} />
          <View style={style.barGrey} />
          <View style={style.barGrey} />
        </View>
      ) : Status === 'Work End' ? (
        <View style={style.progress}>
          <View style={style.bar} />
          <View style={style.bar} />
          <View style={style.bar} />
          <View style={style.barGrey} />
        </View>
      ) : Status === 'Completed' ? (
        <View style={style.progress}>
          <View style={style.bar} />
          <View style={style.bar} />
          <View style={style.bar} />
          <View style={style.bar} />
        </View>
      ) : null}
    </>
  );
};
export default ProgressBar;
const style = StyleSheet.create({
  progress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bar: {
    flex: 1,
    height: 6,
    marginHorizontal: 5,
    backgroundColor: 'red',
  },
  barGrey: {
    flex: 1,
    height: 6,
    marginHorizontal: 5,
    backgroundColor: '#EEEEEE',
  },
});
