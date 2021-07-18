import React, {useEffect, useState} from 'react';
import {Button, ScrollView, Text, TextInput, View} from 'react-native';
import {changeDefaultScreen} from '../redux/asyncStorage/actions';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {usePubNub} from 'pubnub-react';
import {fetchDialogsRequest} from '../redux/queue/actions';
import {enterChatReset} from '../redux/start/actions';

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

  const handleSendMessage = (event) => {};

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
          setTimeout(() => setIsTyping(false), 500);
        }
      };
      const isTypingChannel = currentDialogKey + 'is-typing';
      const currentChannel = currentDialogKey + 'Chat';
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
        onChangeText={(text) => setMessage({text})}
        value={message}
        placeholder="Введите сообщение..."
      />
      <Button title="Отправить" onPress={handleSendMessage} />
      <Button title="Завершить диалог" onPress={handleFinishDialog} />
    </View>
  );
};
