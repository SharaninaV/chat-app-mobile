import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDialogsRequest} from '../redux/queue/actions';

export const Queue = () => {
  const dialogs = useSelector((state) => state.dialogs.dialogs);
  const [queuePosition, setQueuePosition] = useState(0);

  const handleNotifications = (event) => {
    alert('click');
  };

  const waitTime = (3 * 60 + 40) * queuePosition;
  const waitHours = Math.floor(waitTime / 3600);
  const waitMinutes = Math.floor((waitTime - waitHours * 3600) / 60);
  const waitSeconds = waitTime - waitHours * 3600 - waitMinutes * 60;

  useEffect(() => {
    if (dialogs) {
      setQueuePosition(
        dialogs.filter((dialog) => dialog.data.status === 'queued').length
      );
    }
  }, [dialogs]);

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
