import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#F6F3F5',
    borderRadius: 25,
    padding: 12,
    width: '80%',
    height: 45,
    alignItems: 'center',
    alignSelf: 'center',
  },
  sinupBtn: {fontSize: 16, fontFamily: 'RobotoSlab-Bold', color: 'white'},

  loginBtn: {
    alignSelf: 'center',
    width: '40%',
    flexDirection: 'row',
    backgroundColor: '#DA2328',
    borderRadius: 25,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  TiName: {
    fontFamily: 'RobotoSlab-Bold',
    width: '90%',
    height: 45,
    marginLeft: 6,
  },
  container: {flex: 1, backgroundColor: 'white'},
  header: {
    marginTop: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  backBtn: {alignItems: 'center', justifyContent: 'center'},
  title: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'black',
    fontWeight: '500',
    fontSize: 21,
  },
  bottomLine: {
    alignSelf: 'center',
    width: '40%',
    height: 0.9,
    marginTop: -1,
    backgroundColor: 'black',
  },
});
