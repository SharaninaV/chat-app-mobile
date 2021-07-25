import React, {useEffect, useRef, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import {changeDefaultScreen} from '../redux/asyncStorage/actions';
import {Actions} from 'react-native-router-flux';
import {
  fetchDialogsRequest,
  fetchDialogStatusRequest
} from '../redux/queue/actions';

export const Queue = () => {
  const dispatch = useDispatch();

  const dialogs = useSelector((state) => state.dialogs.dialogs);
  const currentDialogKey = useSelector(
    (state) => state.enterChat.currentDialogKey
  );
  const dialogStatus = useSelector((state) => state.dialogStatus.status);

  const [queuePosition, setQueuePosition] = useState(0);
  const [needStatusRequest, setNeedStatusRequest] = useState(true);

  const handleNotifications = (event) => {
    alert('Вам придет оповещение, когда оператор Вам ответит.');
    OneSignal.sendTag('dialog', currentDialogKey);
    OneSignal.getTags((tags) => console.log(tags));
  };

  const fetchDialogStatus = () => {
    dispatch(fetchDialogStatusRequest(currentDialogKey));
    const interval = setInterval(() => {
      if (!needStatusRequest) {
        clearInterval(interval);
        return;
      }
      dispatch(fetchDialogStatusRequest(currentDialogKey));
    }, 5000);
  };

  const waitTime = (3 * 60 + 40) * queuePosition;
  const waitHours = Math.floor(waitTime / 3600);
  const waitMinutes = Math.floor((waitTime - waitHours * 3600) / 60);
  const waitSeconds = waitTime - waitHours * 3600 - waitMinutes * 60;

  useEffect(() => {
    if (
      dialogs &&
      dialogs.length &&
      currentDialogKey &&
      currentDialogKey.length
    ) {
      const queuedDialogsKeys = dialogs
        .filter((dialog) => dialog.data.status === 'queued')
        .reverse()
        .map((dialog) => dialog.key);
      setQueuePosition(queuedDialogsKeys.indexOf(currentDialogKey) + 1);
    } else {
      dispatch(fetchDialogsRequest());
    }
  }, [currentDialogKey, dialogs, dispatch]);

  useEffect(() => {
    fetchDialogStatus();
  }, []);

  useEffect(() => {
    if (dialogStatus && dialogStatus === 'active') {
      setNeedStatusRequest(false);
      dispatch(changeDefaultScreen('dialog'));
      Actions.dialog();
    }
  }, [dialogStatus]);

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
