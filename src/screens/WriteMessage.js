import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';

export const WriteMessage = () => {
  const [message, setMessage] = useState();

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
