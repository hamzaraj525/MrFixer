import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  userTxt: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'black',
    fontWeight: '600',
    alignSelf: 'flex-start',

    fontSize: 30,
  },
  noMsgTxt: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'black',
    fontWeight: '500',
    fontSize: 21,
  },
  subViewNoMsg: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginTop: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  backBtn: {alignItems: 'center', justifyContent: 'center'},
  titleTxt: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'black',
    fontWeight: '500',
    fontSize: 21,
  },
});
