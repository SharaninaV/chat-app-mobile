import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useDispatch} from 'react-redux';
import {changeDefaultScreen} from '../redux/asyncStorage/actions';

export const WriteMessage = () => {
  const [message, setMessage] = useState();
  const dispatch = useDispatch;

  const handleSendMessage = (event) => {};

  return (
    <View>
      <TextInput
        multiline={true}
        numberOfLines={3}
        onChangeText={(text) => setMessage({text})}
        value={message}
      />
      <Button title="Отправить" onPress={handleSendMessage} />
    </View>
  );
};
