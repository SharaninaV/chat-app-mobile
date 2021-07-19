import React from 'react';
import {Button, View, StyleSheet} from 'react-native';
import {changeDefaultScreen} from '../redux/asyncStorage/actions';
import {Actions} from 'react-native-router-flux';
import {useDispatch} from 'react-redux';
import {enterChatReset} from '../redux/start/actions';
import {ViewMessages} from './ViewMessages';
import {WriteMessage} from './WriteMessage';

export const Dialog = () => {
  const dispatch = useDispatch();

  const handleFinishDialog = (event) => {
    dispatch(enterChatReset());
    dispatch(changeDefaultScreen('start'));
    Actions.start();
  };

  return (
    <View style={{flex: 1}}>
      <ViewMessages />
      <WriteMessage />
      <Button
        title="Изображение"
        onPress={() => {
          Actions.camera();
        }}
      />
      <Button title="Завершить диалог" onPress={handleFinishDialog} />
    </View>
  );
};
