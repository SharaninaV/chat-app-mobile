import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import {changeDefaultScreen} from '../redux/asyncStorage/actions';
import {Actions} from 'react-native-router-flux';
import {fetchDialogsRequest} from '../redux/queue/actions';

export const Queue = () => {
  const dialogs = useSelector((state) => state.dialogs.dialogs);
  const [queuePosition, setQueuePosition] = useState(0);
  const dispatch = useDispatch();
  const currentDialogKey = useSelector(
    (state) => state.enterChat.currentDialogKey
  );

  const handleNotifications = (event) => {
    alert('Вам придет оповещение, когда оператор Вам ответит.');
    OneSignal.sendTag('dialog', currentDialogKey);
    OneSignal.getTags((tags) => console.log(tags));
  };

  const waitTime = (3 * 60 + 40) * queuePosition;
  const waitHours = Math.floor(waitTime / 3600);
  const waitMinutes = Math.floor((waitTime - waitHours * 3600) / 60);
  const waitSeconds = waitTime - waitHours * 3600 - waitMinutes * 60;

  useEffect(() => {
    if (dialogs && dialogs.length > 0 && currentDialogKey) {
      const queuedDialogsKeys = dialogs
        .filter((dialog) => dialog.data.status === 'queued')
        .reverse()
        .map((dialog) => dialog.key);
      if (currentDialogKey) {
        setQueuePosition(queuedDialogsKeys.indexOf(currentDialogKey) + 1);
      }
      const currentDialogStatus = dialogs.filter(
        (dialog) => dialog.key === currentDialogKey
      )[0].data.status;
      if (currentDialogStatus) {
        if (currentDialogStatus === 'active') {
          dispatch(changeDefaultScreen('dialog'));
          Actions.dialog();
        }
      }
    } else {
      dispatch(fetchDialogsRequest());
    }
  }, [currentDialogKey, dialogs, dispatch]);

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
