import React, {useEffect, useRef} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';

export const Message = ({style, msg}) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {toValue: 1, duration: 1000}).start();
  }, [animation]);

  const animatedStyle = msg.isNew ? {...style, opacity: animation} : style;

  return (
    <View style={styles.message}>
      {msg.writtenBy === 'operator' ? (
        <Animated.View style={animatedStyle}>
          <Text style={styles.message__operator__writtenBy}>Оператор:</Text>
          <Text style={styles.message__operator__text}>{msg.content}</Text>
          <Text style={styles.message__operator__date}>
            ({moment(msg.timestamp).calendar()})
          </Text>
        </Animated.View>
      ) : (
        <Animated.View style={animatedStyle}>
          <Text style={styles.message__client__writtenBy}>Вы:</Text>
          {msg.content.startsWith('data:image') ? (
            <Image
              source={{uri: msg.content, height: 200, resizeMethod: 'resize'}}
            />
          ) : (
            <Text style={styles.message__client__text}>{msg.content}</Text>
          )}
          <Text style={styles.message__client__date}>
            ({moment(msg.timestamp).calendar()})
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  message: {},
  message__operator__writtenBy: {
    color: 'white',
    fontFamily: 'Montserrat-Bold'
  },
  message__operator__text: {
    color: 'white',
    fontFamily: 'Montserrat-Medium'
  },
  message__operator__date: {
    color: 'white',
    fontFamily: 'Montserrat-Medium'
  },
  message__client__writtenBy: {
    color: 'white',
    fontFamily: 'Montserrat-Bold'
  },
  message__client__text: {
    color: 'white',
    fontFamily: 'Montserrat-Medium'
  },
  message__client__date: {
    color: 'white',
    fontFamily: 'Montserrat-Medium'
  }
});
