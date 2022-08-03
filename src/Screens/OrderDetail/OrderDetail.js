import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import {confirmOrder, addLontitude} from '../../Redux/Action/actions';
import LottieView from 'lottie-react-native';
import Images from '../../Constraints/Images';
import RateModal from '../../Components/Modal/RateModal';

const OrderDetail = props => {
  const [showRateModal, setShowRateModal] = useState(false);
  const dispatch = useDispatch();
  const {userId, userName, userMail, userContact, Status} = useSelector(
    reducers => reducers.cartReducer,
  );

  const updateStatusStarted = Item => {
    dispatch(confirmOrder('Work Started'));
    database()
      .ref('cartItems/' + Item)
      .update({
        Status: 'Work Started',
      })
      .then(() => console.log('Status Work stated.'));
  };

  const updateStatusWorkEnd = Item => {
    dispatch(confirmOrder('Work End'));
    database()
      .ref('cartItems/' + Item)
      .update({
        Status: 'Work End',
      })
      .then(() => console.log('Status work end.'));
  };

  const updateStatusWorkDone = Item => {
    dispatch(confirmOrder('Completed'));
    database()
      .ref('cartItems/' + Item)
      .update({
        Status: 'Completed',
      })
      .then(() => console.log('Status work Completed.'));
  };
  const hideRateModal = () => {
    setShowRateModal(false);
  };

  return (
    <View style={[styles.container]}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LottieView
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height / 3,
          }}
          source={
            props.Status === 'Confirmed'
              ? Images.workConfirmLottie
              : props.Status === 'Work Started'
              ? Images.workStartLottie
              : Images.workCompltdLottie
          }
          autoPlay
          loop={true}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (props.Status === 'Confirmed') {
            updateStatusStarted(props.Item);
          } else if (props.Status === 'Work Started') {
            updateStatusWorkEnd(props.Item);
          } else if (props.Status === 'Work End') {
            updateStatusWorkDone(props.Item);
            setShowRateModal(true);
          } else {
          }
        }}
        style={styles.loginBtn}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white',
          }}>
          {props.Status === 'Confirmed'
            ? 'Start Work'
            : props.Status === 'Work Started'
            ? 'End Work'
            : props.Status === 'Work End'
            ? 'Done'
            : 'Done'}
        </Text>
      </TouchableOpacity>
      <RateModal
        showRateModal={showRateModal}
        hideRateModal={hideRateModal}
        hideMap={props.hideMap}
        doHideMap={props.doHideMap}
        userNameTxt={props.userNameTxt}
        order={props.order}
      />
    </View>
  );
};
export default OrderDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});
