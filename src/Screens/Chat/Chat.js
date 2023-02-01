import style from './style';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import Constraints from './../../Constraints/Constraints';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState, useCallback, useEffect} from 'react';
import {Text, Pressable, View, Platform, SafeAreaView} from 'react-native';
import {GiftedChat, InputToolbar, Bubble} from 'react-native-gifted-chat';

function Chat({navigation, props}) {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const {userId, userName, mrFixUserId, userPic} = useSelector(
    reducers => reducers.cartReducer,
  );

  useEffect(() => {
    const unsubscribe = database()
      .ref('Chats/' + mrFixUserId + '/messsages')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          li.push({
            _id: child.val()._id,
            text: child.val().text,
            user: child.val().user,
          });
        });
        setMessages(li.reverse());
        console.log(messages);
      });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  const onSend = useCallback(msgArray => {
    const message = msgArray[0];
    const myMsg = {
      ...message,
      createdAt: new Date(),
    };
    setMessages(prevMessages => GiftedChat.append(prevMessages, myMsg));
    database()
      .ref('Chats/' + mrFixUserId + '/messsages')
      .push(myMsg);
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}>
        <Pressable
          style={style.backBtn}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name={'arrow-back-outline'} size={30} color={'black'} />
        </Pressable>
        <Text style={style.userTxt}>{Constraints.CHAT}</Text>
        <Pressable style={style.backBtn} onPress={() => {}}>
          <Ionicons name={'share'} size={30} color={'#F5EFEE'} />
        </Pressable>
      </View>

      {messages ? (
        <GiftedChat
          showUserAvatar
          isAnimated
          inverted={true}
          messages={messages}
          onSend={text => onSend(text)}
          user={{
            _id: userId,
            name: userName,
            userPic: userPic,
          }}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  right: {
                    color: 'black',
                  },
                  left: {
                    color: 'black',
                  },
                }}
                wrapperStyle={{
                  right: {backgroundColor: 'white'},
                  left: {backgroundColor: '#fc9384'},
                }}
                timeTextStyle={{
                  right: {color: 'black'},
                  left: {color: 'black'},
                }}
              />
            );
          }}
          renderInputToolbar={props => {
            return (
              <InputToolbar
                {...props}
                containerStyle={{
                  marginBottom: Platform.OS === 'android' ? 10 : 0,
                  borderTopWidth: 0,
                  borderRadius: 20,
                  backgroundColor: 'white',
                  left: 20,
                  right: 20,
                }}
              />
            );
          }}
          placeholder="Type a message..."
          placeholderTextColor="grey"
          minInputToolbarHeight={48}
        />
      ) : (
        <View style={style.subViewNoMsg}>
          <Text style={style.noMsgTxt}>{Constraints.NO_NEW_MESSAGES}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
export default Chat;
