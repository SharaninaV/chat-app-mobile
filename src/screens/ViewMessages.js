import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {usePubNub} from 'pubnub-react';
import {Message} from './Message';
import {fetchCurrentDialogRequest} from '../redux/dialog/actions';
import { currentDialogKeySelector } from "../redux/start/selectors";
import { currentDialogSelector } from "../redux/dialog/selectors";

export const ViewMessages = () => {
  const pubnub = usePubNub();

  const dispatch = useDispatch();

  const scrollViewRef = useRef();

  const [messages, setMessages] = useState([]);

  const currentDialog = useSelector(currentDialogSelector);
  const currentDialogKey = useSelector(currentDialogKeySelector);

  const currentChannel = currentDialogKey + 'Chat';

  useEffect(() => {
    if (pubnub && currentDialogKey && currentDialogKey.length) {
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
      pubnub.subscribe({channels: [currentChannel]});

      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribeAll();
      };
    }
  }, [currentChannel, currentDialogKey, pubnub]);

  useEffect(() => {
    if (currentDialog && Object.keys(currentDialog).length) {
      setMessages(Object.values(currentDialog.messages));
    }
  }, [currentDialog]);

  useEffect(() => {
    if (currentDialogKey && currentDialogKey.length) {
      dispatch(fetchCurrentDialogRequest(currentDialogKey));
    }
  }, [dispatch, currentDialogKey]);

  return (
    <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current.scrollToEnd({animated: true})
      }
      style={styles.messages}>
      {messages &&
        messages.map((msg) =>
          msg.writtenBy === 'operator' ? (
            <Message style={styles.messages__operator} msg={msg} />
          ) : (
            <Message style={styles.messages__client} msg={msg} />
          )
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  messages: {},
  messages__client: {
    flex: 1,
    padding: 20,
    backgroundColor: '#028dae',
    marginVertical: 20,
    marginLeft: 100,
    marginRight: 20,
    borderRadius: 10
  },
  messages__operator: {
    flex: 1,
    padding: 20,
    backgroundColor: '#00b9e4',
    marginVertical: 20,
    marginRight: 100,
    marginLeft: 20,
    borderRadius: 10
  }
});
