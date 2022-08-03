import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  txtItems: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  priceTxt: {
    color: 'black',
    fontSize: 14,
    fontWeight: '700',
  },
  kmTxt: {
    color: 'grey',
    fontSize: 13,
    fontWeight: '500',
  },
  profileImg: {
    position: 'absolute',
    top: 10,
    left: '6%',
    borderWidth: 3,
    borderColor: 'white',
    width: 52,
    height: 52,
    borderRadius: 52 / 2,
    elevation: 9,
  },
  locImg: {
    width: 35,
    height: 35,
  },
  txtItems: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 18,
  },
  locTxtStyle: {
    color: 'white',
    fontSize: 16,
    width: '50%',
    left: '30%',
  },
  onlineBtn: {
    borderWidth: 6,
    borderColor: 'white',
    elevation: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: '6%',
    position: 'absolute',
    backgroundColor: '#82168D',
    bottom: '10%',
    alignSelf: 'center',
  },
  botomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  botomContainerTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '4%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },

  topViewContain: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '3%',
    position: 'absolute',
    top: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#82168D',
    borderRadius: 8,
  },

  square: {
    width: 150,
    height: 150,
    backgroundColor: '#28b5b5',
  },
  goBtnTxt: {color: 'white', alignSelf: 'center', fontSize: 22},
  acceBtn: {
    borderRadius: 25,
    backgroundColor: '#FB5B64',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    marginTop: 8,
    width: '90%',
  },
  arrivBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '2.7%',
    paddingHorizontal: '5%',
    backgroundColor: '#8216DD',
  },
});
