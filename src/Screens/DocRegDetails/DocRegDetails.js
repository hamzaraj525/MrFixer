import React, {useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Pressable,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import style from './style';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {
  addFixerPic1,
  addFixerPic2,
  addFixerPic3,
} from '../../Redux/Action/actions';
import database from '@react-native-firebase/database';
import CompleteModal from './../../Components/Modal/CompleteModal';
const {width, height} = Dimensions.get('window');

const DocRegDetails = ({route}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showCompleteModal, setCompleteModal] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const {Item, userKey} = route.params;
  const {Pic1, Pic2, Pic3, userName} = useSelector(
    reducers => reducers.cartReducer,
  );

  const uploadUserToDataBase = url => {
    if (Item.title == 'CNIC Front Side') {
      database()
        .ref('riders/' + userKey)
        .update({
          FixerPic1: url,
        })
        .then(() => {
          setImage(null);
          setCompleteModal(true);
          console.log('pic1 updated.');
        });
    } else if (Item.title == 'CNIC Back Side') {
      database()
        .ref('riders/' + userKey)
        .update({
          FixerPic2: url,
        })
        .then(() => {
          setImage(null);
          setCompleteModal(true);
          console.log('pic2 updated.');
        });
    } else if (Item.title == 'Fixer Photo') {
      database()
        .ref('riders/' + userKey)
        .update({
          FixerPic3: url,
        })
        .then(() => {
          setImage(null);
          setCompleteModal(true);
          console.log('pic3 updated.');
        });
    }
  };
  const closeModal = () => {
    setCompleteModal(false);
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      compressImageQuality: 0.7,
    })
      .then(image => {
        console.log('image is here-----' + image.sourceURL);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    setUploading(true);
    setTransferred(0);
    const storageRef = storage().ref(`FixerRegPhotos/${filename}`);
    const task = storageRef.putFile(uploadUri);
    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      console.log('url-----' + url);
      setImage(url);
      if (Item.title == 'CNIC Front Side') {
        dispatch(addFixerPic1(url));
      } else if (Item.title == 'CNIC Back Side') {
        dispatch(addFixerPic2(url));
      } else if (Item.title == 'Fixer Photo') {
        dispatch(addFixerPic3(url));
      }
      uploadUserToDataBase(url);
      return url;
      console.log('url here' + url);
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <SafeAreaView style={[style.container, {}]}>
      <StatusBar
        barStyle={'dark-content'}
        hidden={true}
        backgroundColor="#0E0A30"
      />
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        {Item.title === 'CNIC Front Side' ? (
          <>
            <Text style={style.naemTxt}>We need a Photo of your Id Card</Text>
            <Text style={style.subTitle}>Front Side</Text>
            <Text style={style.headerTxt}>
              A valid National ID Card Can be obtained from your nearest NADRA
              office. You need one of original NIC OR your old original ID card
            </Text>
          </>
        ) : Item.title === 'CNIC Back Side' ? (
          <>
            <Text style={style.naemTxt}>We need a Photo of your Id Card</Text>
            <Text style={style.subTitle}>Back Side</Text>
            <Text style={style.headerTxt}>
              A valid National ID Card Can be obtained from your nearest NADRA
              office. You need one of original NIC OR your old original ID card
            </Text>
          </>
        ) : Item.title === 'Fixer Photo' ? (
          <>
            <Text style={style.naemTxt}>We need a profile photo</Text>
            <Text style={style.headerTxt}>
              Must be a forward-facing, centered photo including the driver’s
              full face and top of shoulders, with no sunglasses Must be a photo
              only of the driver with no other subject in the frame, well-lit,
              and in focus.
            </Text>
          </>
        ) : null}

        <View
          style={[
            style.picBtn,
            {
              borderRadius: Item.title == 'Fixer Photo' ? 250 / 2 : 10,
              width: Item.title == 'Fixer Photo' ? 250 : width * 0.8,
              height: Item.title == 'Fixer Photo' ? 250 : height * 0.3,
            },
          ]}>
          {image === null ? (
            <MaterialCommunityIcons name="camera" size={50} color={'grey'} />
          ) : (
            <Image
              source={{uri: image}}
              style={[
                style.realImg,
                {
                  borderRadius: Item.title == 'Fixer Photo' ? 250 / 2 : 10,
                  width: Item.title == 'Fixer Photo' ? 250 : width * 0.8,
                  height: Item.title == 'Fixer Photo' ? 250 : height * 0.3,
                },
              ]}
            />
          )}
        </View>

        <TouchableOpacity
          disabled={uploading ? true : false}
          activeOpacity={0.9}
          onPress={() => {
            if (image !== null) {
              uploadImage();
            } else {
              takePhotoFromCamera();
            }
          }}
          style={[
            style.loginBtn,
            {backgroundColor: uploading ? 'grey' : 'black'},
          ]}>
          {uploading || loader ? (
            <ActivityIndicator style={{}} size="large" color="white" />
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
              }}>
              {image === null ? 'Take photo' : 'Done'}
            </Text>
          )}
        </TouchableOpacity>
        <CompleteModal
          showCompleteModal={showCompleteModal}
          closeModal={closeModal}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default DocRegDetails;
