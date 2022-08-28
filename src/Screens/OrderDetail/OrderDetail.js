import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import {
  confirmOrder,
  addLontitude,
  addTimeOfOrder,
} from '../../Redux/Action/actions';
import LottieView from 'lottie-react-native';
import Images from '../../Constraints/Images';
import RateModal from '../../Components/Modal/RateModal';
import style from './style';
import moment from 'moment';
import ProgressBar from '../../Components/ProgressBar';

const OrderDetail = props => {
  const [showRateModal, setShowRateModal] = useState(false);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const {userId, Time, Status, orderKey, orderUid} = useSelector(
    reducers => reducers.cartReducer,
  );
  const time = moment().format('hh:mm a');

  const updateStatusStarted = () => {
    setLoader(true);
    dispatch(addTimeOfOrder(time));
    dispatch(confirmOrder('Work Started'));
    database()
      .ref('cartItems/' + orderKey)
      .update({
        Status: 'Work Started',
      })
      .then(() => {
        console.log('Status Work stated.');
        setLoader(false);
      });
  };

  const updateStatusWorkEnd = () => {
    setLoader(true);
    dispatch(addTimeOfOrder(time));
    dispatch(confirmOrder('Work End'));
    database()
      .ref('cartItems/' + orderKey)
      .update({
        Status: 'Work End',
      })
      .then(() => {
        setLoader(false);
        console.log('Status work end.');
      });
  };

  const updateStatusWorkDone = () => {
    setLoader(true);
    dispatch(addTimeOfOrder(time));
    dispatch(confirmOrder('Completed'));
    database()
      .ref('cartItems/' + orderKey)
      .update({
        Status: 'Completed',
      })
      .then(() => {
        setLoader(false);
        console.log('Status work Completed.');
      });
  };
  const hideRateModal = () => {
    setShowRateModal(false);
  };

  return (
    <View style={[style.container]}>
      <View style={style.header}>
        {Status === 'Confirmed' ? (
          <Text style={style.headerTxt}>You accepted the order...</Text>
        ) : Status === 'Work Started' ? (
          <Text style={style.headerTxt}>You have started the work</Text>
        ) : Status === 'Work End' ? (
          <Text style={style.headerTxt}>The work is ended by you</Text>
        ) : Status === 'Completed' ? (
          <Text style={style.headerTxt}>Your work is completed</Text>
        ) : (
          <Text style={style.headerTxt}>Your work is completed</Text>
        )}

        <Text style={style.headerTxtOne}>
          Arrived at{' '}
          <Text style={style.headerTxtTwo}>
            {Time} {'\n'}
          </Text>
        </Text>
        <ProgressBar />
      </View>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <LottieView
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height / 3,
          }}
          source={
            Status === 'Confirmed'
              ? Images.workConfirmLottie
              : Status === 'Work Started'
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
          if (Status === 'Confirmed') {
            updateStatusStarted();
          } else if (Status === 'Work Started') {
            updateStatusWorkEnd();
          } else if (Status === 'Work End') {
            updateStatusWorkDone();
            setShowRateModal(true);
          } else {
          }
        }}
        style={style.loginBtn}>
        {loader ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'white',
            }}>
            {Status === 'Confirmed'
              ? 'Start Work'
              : Status === 'Work Started'
              ? 'End Work'
              : Status === 'Work End'
              ? 'Done'
              : 'Done'}
          </Text>
        )}
      </TouchableOpacity>
      <RateModal
        showRateModal={showRateModal}
        hideRateModal={hideRateModal}
        hideMap={props.hideMap}
        doHideMap={props.doHideMap}
        order={props.order}
      />
    </View>
  );
};
export default OrderDetail;
