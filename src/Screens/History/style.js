import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  cartItemsContainer: {
    marginBottom: 5,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 15,
  },
  map: {
    width: '100%',
    height: height / 5,
  },
});
