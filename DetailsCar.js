import React, {useEffect, useState, useRef} from 'react';
import {
  LogBox,
  SafeAreaView,
  View,
  Image,
  Animated,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
  sharedElements,
} from 'react-native-shared-element';
const {width, height} = Dimensions.get('window');

function DetailsCar({route}) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const {item} = route.params;
  return (
    <View style={{flex: 1}}>
      <SharedElement
        id={'item.${item.id}.photo'}
        style={{width: 200, height: 200}}>
        <Image source={item.image} style={styles.posterImage} />
      </SharedElement>
    </View>
  );
}

DetailsCar.sharedElements = ({route}) => {
  const {item} = route.params;

  return [
    {
      id: 'item.${item.id}.photo',
      animation: 'move',
      resize: 'clip',
    },
  ];
};

export default DetailsCar;
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    flex: 1,
  },
});
