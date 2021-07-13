import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import {getDeviceStateRequest} from '../redux/deviceState/actions';

export const Queue = () => {
  const dialogs = useSelector((state) => state.dialogs.dialogs);
  const [queuePosition, setQueuePosition] = useState(0);
  const dispatch = useDispatch();
  const deviceState = useSelector((state) => state.deviceState.deviceState);
  const currentDialogKey = useSelector(
    (state) => state.enterChat.currentDialogKey
  );

  const handleNotifications = (event) => {
    const userId = deviceState.userId;
    const notificationObj = {
      contents: {ru: 'Вам ответил оператор!'},
      include_player_ids: [userId]
    };

    const jsonString = JSON.stringify(notificationObj);

    OneSignal.postNotification(
      jsonString,
      (success) => {
        alert('Вам придет уведомление, когда начнется диалог.');
      },
      (error) => {
        alert('Произошла какая-то ошибка.');
      }
    );
  };

  useEffect(() => {
    dispatch(getDeviceStateRequest());
  }, [dispatch]);

  const waitTime = (3 * 60 + 40) * queuePosition;
  const waitHours = Math.floor(waitTime / 3600);
  const waitMinutes = Math.floor((waitTime - waitHours * 3600) / 60);
  const waitSeconds = waitTime - waitHours * 3600 - waitMinutes * 60;

  useEffect(() => {
    if (dialogs) {
      const queuedDialogsKeys = dialogs
        .filter((dialog) => dialog.data.status === 'queued')
        .reverse()
        .map((dialog) => dialog.key);
      if (currentDialogKey) {
        console.log(queuedDialogsKeys);
        console.log(queuedDialogsKeys.indexOf(currentDialogKey));
        setQueuePosition(queuedDialogsKeys.indexOf(currentDialogKey) + 1);
      }
    }
  }, [currentDialogKey, dialogs]);

  useEffect(() => {
    console.log(currentDialogKey);
  }, [currentDialogKey]);

  return (
    <View>
      <Text>Вы в очереди на {queuePosition} месте.</Text>
      <Text>
        Вам ответят приблизительно через {waitHours} часов {waitMinutes} минут{' '}
        {waitSeconds} секунд.
      </Text>
      <Button
        title="Напомнить, когда придет очередь"
        onPress={handleNotifications}
      />
    </View>
  );
};
