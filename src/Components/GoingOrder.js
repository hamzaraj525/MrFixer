import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Linking,
  Animated,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {addTimeOfOrder} from '../Redux/Action/actions';
const GoingOrder = props => {
  const dispatch = useDispatch();
  const time = moment().format('hh:mm a');
  return (
    <>
      <View
        style={{
          position: 'absolute',
          bottom: Dimensions.get('window').height / 7.8,
          right: 20,
        }}>
        <TouchableOpacity
          style={{
            elevation: 2,
            padding: 9,
            borderRadius: 30,
            backgroundColor: '#3372e2',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: 145,
          }}
          activeOpacity={0.8}
          onPress={() => {
            Linking.openURL(
              'https://www.google.com/maps/dir/?api=1&destination=' +
                props.userLat +
                ',' +
                props.userLong +
                '&travelmode=driving',
            );
          }}>
          <MaterialCommunityIcons name="navigation" size={28} color="white" />
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '400',
            }}>
            NAVIGATE
          </Text>
        </TouchableOpacity>
      </View>

      <Animatable.View
        useNativeDriver={true}
        delay={800}
        animation="slideInUp"
        style={[
          styles.botomContainerTwo,
          {
            backgroundColor: props.color ? '#82168D' : 'white',
            justifyContent: 'center',
          },
        ]}>
        <View
          style={{
            width: '90%',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Animatable.View
            useNativeDriver={true}
            animation="slideInUp"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ecf5fb',
              borderRadius: 46 / 2,
              width: 46,
              height: 46,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                Linking.openURL(`tel:${props.userPhone}`);
              }}>
              <MaterialIcons name="call" size={25} color="black" />
            </TouchableOpacity>
          </Animatable.View>

          <Animatable.Text
            useNativeDriver={true}
            animation="slideInUp"
            style={[styles.txtItems, {color: 'black', fontSize: 16}]}>
            Going For Order
          </Animatable.Text>
          <Animatable.View
            useNativeDriver={true}
            style={[
              styles.arrivBtn,
              {
                paddingVertical: props.loader ? '2.9%' : '2.7%',
                paddingHorizontal: props.loader ? '9.6%' : '5%',
              },
            ]}
            animation="slideInUp">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                dispatch(addTimeOfOrder(time));
                props.hideMapScreen();
              }}>
              {props.loader === false ? (
                <Text style={[styles.txtItems, {color: 'white'}]}>Arrived</Text>
              ) : (
                <ActivityIndicator size={'small'} color={'white'} />
              )}
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </Animatable.View>
    </>
  );
};
export default GoingOrder;
const styles = StyleSheet.create({
  botomContainerTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '4%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  txtItems: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  arrivBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '2.7%',
    paddingHorizontal: '5%',
    backgroundColor: '#3372e2',
  },
});
