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
const {width, height} = Dimensions.get('window');
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from 'react-native-shared-element';

function AnimatedFlaList({navigation}) {
  const [color, setColor] = useState(false);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [list, setList] = useState([
    {
      id: 1,
      title: 'John Wick',
      image: require('./assets/Images/as.jpg'),
      desc: "John Wick is a neo-noir action film directed by Dominic Chien, and written by Chris Morgan. It stars Keanu Reeves as John Wick, and Ian McShane as the ex-hitman's wife, May.",
    },
    {
      id: 2,
      title: 'John Wick',
      image: require('./assets/Images/as.jpg'),
      desc: "John Wick is a neo-noir action film directed by Dominic Chien, and written by Chris Morgan. It stars Keanu Reeves as John Wick, and Ian McShane as the ex-hitman's wife, May.",
    },
    {
      id: 3,
      title: 'John Wick',
      image: require('./assets/Images/as.jpg'),
      desc: "John Wick is a neo-noir action film directed by Dominic Chien, and written by Chris Morgan. It stars Keanu Reeves as John Wick, and Ian McShane as the ex-hitman's wife, May.",
    },
    {
      id: 4,
      title: 'John Wick',
      image: require('./assets/Images/as.jpg'),
      desc: "John Wick is a neo-noir action film directed by Dominic Chien, and written by Chris Morgan. It stars Keanu Reeves as John Wick, and Ian McShane as the ex-hitman's wife, May.",
    },
    {
      id: 5,
      title: 'John Wick',
      image: require('./assets/Images/as.jpg'),
      desc: "John Wick is a neo-noir action film directed by Dominic Chien, and written by Chris Morgan. It stars Keanu Reeves as John Wick, and Ian McShane as the ex-hitman's wife, May.",
    },
    {
      id: 6,
      title: 'John Wick',
      image: require('./assets/Images/as.jpg'),
      desc: "John Wick is a neo-noir action film directed by Dominic Chien, and written by Chris Morgan. It stars Keanu Reeves as John Wick, and Ian McShane as the ex-hitman's wife, May.",
    },
    {
      id: 7,
      title: 'John Wick',
      image: require('./assets/Images/as.jpg'),
      desc: "John Wick is a neo-noir action film directed by Dominic Chien, and written by Chris Morgan. It stars Keanu Reeves as John Wick, and Ian McShane as the ex-hitman's wife, May.",
    },
  ]);
  return (
    <View style={{flex: 1}}>
      <Animated.FlatList
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        snapToInterval={width * 0.72}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={list}
        bounces={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 2) * width * 0.72,

            (index - 2) * width * 0.72,
            index * width * 0.72,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -80, 0],
          });
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DetailsCar', {
                  item: item,
                });
              }}
              activeOpacity={0.8}
              style={{
                width: width * 0.72,
                padding: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 100,
              }}>
              <Animated.View
                style={{
                  padding: 20,
                  alignItems: 'center',
                  backgroundColor: 'black',
                  borderRadius: 33,
                  transform: [{translateY}],
                }}>
                <SharedElement id={'item.${item.id}.photo'}>
                  <Image source={item.image} style={styles.posterImage} />
                </SharedElement>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default AnimatedFlaList;
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
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 200 / 2,
  },
});
