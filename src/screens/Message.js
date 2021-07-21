import React, {useEffect, useRef} from 'react';
import { Animated, StyleSheet, Text } from "react-native";

export const Message = ({style, msg}) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {toValue: 1, duration: 1000}).start();
  }, [animation]);

  const animatedStyle = msg.isNew ? {...style, opacity: animation} : style;

  return (
    <>
      {msg.writtenBy === 'operator' ? (
          <Animated.View style={animatedStyle}>
        <Text>Оператор:</Text>
      <Text style={styles.messageOperator__text}>{msg.content}</Text>
    </Animated.View>) : (
          <Animated.View style={animatedStyle}>
   <Text style={styles.messageClient__text}>Вы:</Text>
            <Text style={styles.messageClient__text}>{msg.content}</Text>
          </Animated.View>)}
    </>
  );
};

const styles = StyleSheet.create({
  messageOperator__text: {
    color: 'black'
  },
  messageClient__text: {
    color: 'white'
  }
})
