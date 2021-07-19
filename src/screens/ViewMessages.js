import React, {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {usePubNub} from 'pubnub-react';
import {Message} from './Message';
import {fetchDialogsRequest} from '../redux/queue/actions';

export const ViewMessages = () => {
  const pubnub = usePubNub();
  const dispatch = useDispatch();

  const scrollViewRef = useRef();

  const [messages, setMessages] = useState([]);

  const dialogs = useSelector((state) => state.dialogs.dialogs);
  const currentDialogKey = useSelector(
    (state) => state.enterChat.currentDialogKey
  );

  const isTypingChannel = currentDialogKey + 'is-typing';
  const currentChannel = currentDialogKey + 'Chat';

  useEffect(() => {
    if (pubnub && currentDialogKey) {
      pubnub.setUUID(currentDialogKey);
      const listener = {
        message: (envelope) => {
          setMessages((msgs) => [
            ...msgs,
            {
              writtenBy: envelope.message.writtenBy,
              content: envelope.message.content,
              timestamp: envelope.message.timestamp,
              isNew: true
            }
          ]);
        }
      };

      pubnub.addListener(listener);
      pubnub.subscribe({channels: [isTypingChannel, currentChannel]});

      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribeAll();
      };
    }
  }, [currentChannel, currentDialogKey, isTypingChannel, pubnub]);

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
  }, [dialogs, currentDialogKey, dispatch]);

  return (
    <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current.scrollToEnd({animated: true})
      }>
      {messages &&
        messages.map((msg) =>
          msg.writtenBy === 'operator' ? (
            <Message style={styles.messageOperator} msg={msg} />
          ) : (
            <Message style={styles.messageClient} msg={msg} />
          )
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  messageClient: {
    flex: 1,
    padding: 20,
    color: 'white',
    backgroundColor: 'cyan',
    marginTop: 20,
    marginLeft: 100,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 10
  },
  messageOperator: {
    flex: 1,
    padding: 20,
    color: 'white',
    backgroundColor: 'black',
    marginTop: 20,
    marginRight: 100,
    marginLeft: 20,
    marginBottom: 20,
    borderRadius: 10
  }
});
