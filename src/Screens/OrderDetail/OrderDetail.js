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
  const {userId, Time, Status} = useSelector(reducers => reducers.cartReducer);
  const time = moment().format('hh:mm a');

  const updateStatusStarted = Item => {
    setLoader(true);
    dispatch(addTimeOfOrder(time));
    dispatch(confirmOrder('Work Started'));
    database()
      .ref('cartItems/' + Item)
      .update({
        Status: 'Work Started',
      })
      .then(() => {
        console.log('Status Work stated.');
        setLoader(false);
      });
  };

  const updateStatusWorkEnd = Item => {
    setLoader(true);
    dispatch(addTimeOfOrder(time));
    dispatch(confirmOrder('Work End'));
    database()
      .ref('cartItems/' + Item)
      .update({
        Status: 'Work End',
      })
      .then(() => {
        setLoader(false);
        console.log('Status work end.');
      });
  };

  const updateStatusWorkDone = Item => {
    setLoader(true);
    dispatch(addTimeOfOrder(time));
    dispatch(confirmOrder('Completed'));
    database()
      .ref('cartItems/' + Item)
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
            {props.Status === 'Confirmed'
              ? 'Start Work'
              : props.Status === 'Work Started'
              ? 'End Work'
              : props.Status === 'Work End'
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
