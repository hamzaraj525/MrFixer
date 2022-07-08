import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: 400,
    height: 400,
    // ...StyleSheet.absoluteFillObject,
  },
  txtItems: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  priceTxt: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
  },
  kmTxt: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '500',
  },
});
