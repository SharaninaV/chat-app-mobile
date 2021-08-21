import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {usePubNub} from 'pubnub-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {sendMessageRequest} from '../redux/dialog/actions';

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
    <View style={styles.writingMessage}>
      {isTyping && (
        <Text style={styles.writingMessage__indicator}>
          Оператор печатает...
        </Text>
      )}
      <View style={styles.writingMessage__row}>
        <View style={styles.writingMessage__write}>
          <TextInput
            multiline
            numberOfLines={3}
            onChangeText={handleChangeText}
            value={message}
            placeholder="Сообщение..."
            style={styles.writingMessage__write__input}
          />
        </View>
        <View style={styles.writingMessage__send}>
          <Icon
            name="paper-plane"
            size={35}
            color="#028dae"
            onPress={handleSendMessage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  writingMessage: {},
  writingMessage__indicator: {
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
    marginVertical: 20,
    marginHorizontal: 20
  },
  writingMessage__row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20
  },
  writingMessage__write: {flex: 4},
  writingMessage__write__input: {
    fontFamily: 'Montserrat-Medium'
  },
  writingMessage__send: {flex: 1}
});
