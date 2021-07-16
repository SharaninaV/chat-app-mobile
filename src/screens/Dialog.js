import React, {useEffect} from 'react';
import {Button, View} from 'react-native';
import {Messages} from './Messages';
import {WriteMessage} from './WriteMessage';
import {changeDefaultScreen} from '../redux/asyncStorage/actions';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';

export const Dialog = () => {
  const dispatch = useDispatch;
  const screen = useSelector((state) => state.asyncStorage.screen);

  const handleFinishDialog = (event) => {
    dispatch(changeDefaultScreen('start'));
    Actions.start();
  };

  useEffect(() => {
    console.log(screen);
  }, [screen]);

  return (
    <View>
      <Messages />
      <WriteMessage />
      <Button title="Завершить диалог" onPress={handleFinishDialog} />
    </View>
  );
};
