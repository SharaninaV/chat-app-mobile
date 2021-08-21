import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import {Actions} from 'react-native-router-flux';
import {changeDefaultScreen} from '../redux/asyncStorage/actions';
import {
  fetchDialogsRequest,
  fetchDialogStatusRequest
} from '../redux/queue/actions';
import { backgroundImg } from "../const";
import { currentDialogKeySelector } from "../redux/start/selectors";
import { dialogsSelector, dialogStatusSelector } from "../redux/queue/selectors";

export const Queue = () => {
  const dispatch = useDispatch();

  const dialogs = useSelector(dialogsSelector);
  const currentDialogKey = useSelector(currentDialogKeySelector);
  const dialogStatus = useSelector(dialogStatusSelector);

  const [queuePosition, setQueuePosition] = useState(0);
  const [needStatusRequest, setNeedStatusRequest] = useState(true);

  const handleNotifications = (event) => {
    alert('Вам придет оповещение, когда оператор Вам ответит.');
    OneSignal.sendTag('dialog', currentDialogKey);
    OneSignal.getTags((tags) => tags);
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
    if (dialogStatus === 'active') {
      setNeedStatusRequest(false);
      dispatch(changeDefaultScreen('dialog'));
      Actions.dialog();
    }
  }, [dialogStatus]);

  return (
    <ImageBackground
      source={{
        uri: backgroundImg
      }}
      resizeMode="cover"
      style={styles.queue__backgroundImage}>
      <View style={styles.queue}>
        <Text style={styles.queue__text}>
          Вы в очереди на {queuePosition} месте.
        </Text>
        <Text style={styles.queue__text}>
          Вам ответят приблизительно через {waitHours} часов {waitMinutes} минут{' '}
          {waitSeconds} секунд.
        </Text>
        <TouchableOpacity
          onPress={handleNotifications}
          style={styles.queue__btn}>
          <Text style={styles.queue__btn__text}>
            Напомнить, когда придет очередь
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  queue: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00b9e4',
    marginTop: 200,
    marginBottom: 200,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10
  },
  queue__backgroundImage: {
    flex: 1
  },
  queue__text: {
    marginBottom: 20,
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    fontSize: 17,
    textAlign: 'center'
  },
  queue__btn: {
    backgroundColor: 'white',
    borderColor: 'white',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 20
  },
  queue__btn__text: {
    fontFamily: 'Montserrat-Medium',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#028dae'
  }
});
