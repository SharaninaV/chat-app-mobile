import React, {useEffect, useState} from 'react';
import {Button, ScrollView, Text, TextInput, View} from 'react-native';
import {changeDefaultScreen} from '../redux/asyncStorage/actions';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {usePubNub} from 'pubnub-react';
import {fetchDialogsRequest} from '../redux/queue/actions';
import {enterChatReset} from '../redux/start/actions';
import {sendMessageRequest} from '../redux/dialog/actions';

export const Dialog = () => {
  const pubnub = usePubNub();

  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const dialogs = useSelector((state) => state.dialogs.dialogs);
  const currentDialogKey = useSelector(
    (state) => state.enterChat.currentDialogKey
  );

  const isTypingChannel = currentDialogKey + 'is-typing';
  const currentChannel = currentDialogKey + 'Chat';

  const handleChangeText = (text) => {
    setMessage(text);
    const inputHasText = text.length > 0;
    pubnub.signal({
      channel: isTypingChannel,
      message: inputHasText ? '2' : '0'
    });
  };

  const handleSendMessage = (event) => {
    if (message.length > 0) {
      const sentMessage = {
        content: message,
        timestamp: Date.now(),
        writtenBy: 'client'
      };
      console.log(currentDialogKey);
      dispatch(sendMessageRequest(currentDialogKey, sentMessage));
      pubnub.publish({channel: currentChannel, message: sentMessage});
      setMessage('');
    }
  };

  const handleFinishDialog = (event) => {
    dispatch(enterChatReset());
    dispatch(changeDefaultScreen('start'));
    Actions.start();
  };

  useEffect(() => {
    if (pubnub && currentDialogKey) {
      pubnub.setUUID(currentDialogKey);
      const listener = {
        message: (envelope) => {
          setMessages((msgs) => [
            ...msgs,
            {
              id: envelope.message.id,
              author: envelope.publisher,
              content: envelope.message.content,
              timetoken: envelope.timetoken
            }
          ]);
        },
        signal: (s) => {
          setIsTyping(s.message === '1');
          let timeoutCache = 0;
          clearTimeout(timeoutCache);
          setTimeout(() => setIsTyping(false), 5000);
          if (s.message === '0' || s.publisher === currentDialogKey) {
            setIsTyping(false);
          }
        }
      };

      pubnub.addListener(listener);
      pubnub.subscribe({channels: [isTypingChannel, currentChannel]});

      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribeAll();
      };
    }
  }, [currentDialogKey, pubnub]);

  useEffect(() => {
    if (dialogs && dialogs.length > 0 && currentDialogKey) {
      const currentDialog = dialogs.filter(
        (dialog) => dialog.key === currentDialogKey
      );
      if (currentDialog) {
        setMessages(Object.values(currentDialog[0].data.messages));
      }
    } else {
      dispatch(fetchDialogsRequest());
    }
  }, [currentDialogKey, dialogs, dispatch]);

  return (
    <View>
      <ScrollView>
        {messages && messages.map((msg) => <Text>{msg.content}</Text>)}
      </ScrollView>
      {isTyping && <Text>Оператор печатает...</Text>}
      <TextInput
        multiline={true}
        numberOfLines={3}
        onChangeText={handleChangeText}
        value={message}
        placeholder="Введите сообщение..."
      />
      <Button title="Отправить" onPress={handleSendMessage} />
      <Button title="Завершить диалог" onPress={handleFinishDialog} />
    </View>
  );
};
