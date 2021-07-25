import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {sendMessageRequest} from '../redux/dialog/actions';
import {useDispatch, useSelector} from 'react-redux';
import {usePubNub} from 'pubnub-react';
import Icon from 'react-native-vector-icons/FontAwesome';

export const WriteMessage = () => {
  const dispatch = useDispatch();
  const pubnub = usePubNub();

  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const currentDialogKey = useSelector(
    (state) => state.enterChat.currentDialogKey
  );

  const isTypingChannel = currentDialogKey + 'is-typing';
  const currentChannel = currentDialogKey + 'Chat';

  const handleSendMessage = (event) => {
    if (message.length > 0) {
      const sentMessage = {
        content: message,
        timestamp: Date.now(),
        writtenBy: 'client'
      };
      dispatch(sendMessageRequest(currentDialogKey, sentMessage));
      pubnub.publish({channel: currentChannel, message: sentMessage});
      setMessage('');
    }
  };

  const handleChangeText = (text) => {
    setMessage(text);
    const inputHasText = text.length > 0;
    pubnub.signal({
      channel: isTypingChannel,
      message: inputHasText ? '2' : '0'
    });
  };

  useEffect(() => {
    if (pubnub && currentDialogKey && currentDialogKey.length) {
      pubnub.subscribe({channels: [isTypingChannel]});
      pubnub.setUUID(currentDialogKey);
      const listener = {
        signal: (s) => {
          setIsTyping(s.message === '1');
          setTimeout(() => setIsTyping(false), 5000);
        }
      };

      pubnub.addListener(listener);

      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribeAll();
      };
    }
  }, [currentDialogKey, isTypingChannel, pubnub]);

  return (
    <View>
      {isTyping && <Text>Оператор печатает...</Text>}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <View style={{flex: 4}}>
          <TextInput
            multiline={true}
            numberOfLines={3}
            onChangeText={handleChangeText}
            value={message}
            placeholder="Сообщение..."
          />
        </View>
        <View style={{flex: 1}}>
          <Icon
            name="paper-plane"
            size={35}
            color="dodgerblue"
            onPress={handleSendMessage}
          />
        </View>
      </View>
    </View>
  );
};
