import React from 'react';
import {View} from 'react-native';
import {Messages} from './Messages';
import {WriteMessage} from './WriteMessage';

export const Dialog = () => {
  return (
    <View>
      <Messages />
      <WriteMessage />
    </View>
  );
};
