import React, {useEffect, useRef} from 'react';
import {Animated, Text} from 'react-native';

export const Message = ({style, msg}) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {toValue: 1, duration: 1000}).start();
  }, [animation]);

  const animatedStyle = msg.isNew ? {...style, opacity: animation} : style;

  return (
    <Animated.View style={animatedStyle}>
      {msg.writtenBy === 'operator' ? <Text>Оператор:</Text> : <Text>Вы:</Text>}
      <Text>{msg.content}</Text>
    </Animated.View>
  );
};
