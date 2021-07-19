import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';
import {finishDialogRequest} from '../redux/finishDialog/actions';
import {changeDefaultScreen} from '../redux/asyncStorage/actions';
import {Actions} from 'react-native-router-flux';
import {enterChatReset} from '../redux/start/actions';

export const FinishDialog = () => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState('0');
  const currentDialogKey = useSelector(
    (state) => state.enterChat.currentDialogKey
  );

  const handleFinishRating = (value) => {
    setRating(value);
  };

  const handleFinishDialog = (event) => {
    dispatch(finishDialogRequest(currentDialogKey, rating));
    alert('Спасибо!');
    dispatch(enterChatReset());
    dispatch(changeDefaultScreen('start'));
    Actions.start();
  };

  return (
    <View>
      <Text>Оцените, пожалуйста, общение с оператором.</Text>
      <AirbnbRating
        count={5}
        reviews={['Ужасно', 'Неплохо', 'Хорошо', 'Очень хорошо', 'Отлично']}
        defaultRating={5}
        size={50}
        onFinishRating={handleFinishRating}
      />
      <Button title="Оценить" onPress={handleFinishDialog} />
    </View>
  );
};
