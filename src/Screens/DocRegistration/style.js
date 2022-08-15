import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subTxt: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 15,
  },
  subContainers: {
    paddingHorizontal: '9%',
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 52,
  },
  subImg: {
    width: 22,
    height: 22,
  },
  naemTxt: {
    paddingHorizontal: '5%',
    fontSize: 25,
    color: 'black',
    fontWeight: '700',
    marginTop: 30,
  },
  headerTxt: {
    paddingHorizontal: '9%',
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
    marginTop: 8,
  },
  headerSubTitle: {
    paddingHorizontal: '9%',
    fontSize: 15,
    color: 'grey',
    marginTop: 8,
  },
});
