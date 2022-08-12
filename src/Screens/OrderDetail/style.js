import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  image: {
    width: 70,
    height: 70,
  },
  map: {
    height: 380,
    width: Dimensions.get('window').width - 50,
    borderRadius: 10,
  },
  loginBtn: {
    width: '70%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FB5B64',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
  },
  header: {
    marginTop: 10,
    height: height / 7,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  headerTxt: {
    color: 'black',
    fontSize: 22,
    fontWeight: '700',
  },
  headerTxtOne: {
    color: 'grey',
    fontWeight: '700',
    fontSize: 16,
  },
  headerTxtTwo: {
    color: 'black',
    fontWeight: '700',
    fontSize: 17,
  },
});
