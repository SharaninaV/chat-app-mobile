import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
} from 'react-native';
import SelectInput from '@tele2/react-native-select-input';

export const Start = () => {
  const [name, setName] = useState();

  const themes = [
    {
      value: 'first-option',
      label: 'This is the first option',
    },
    {
      value: 'second-option',
      label: 'This is the second option',
    },
    {
      value: 'third-option',
      label: 'This is the third option',
    },
  ];

  const subthemes = [
    {
      value: 'first-option',
      label: 'This is the first option',
    },
    {
      value: 'second-option',
      label: 'This is the second option',
    },
    {
      value: 'third-option',
      label: 'This is the third option',
    },
  ];

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.form__label}>Имя:</Text>
      <TextInput
        style={styles.form__input}
        placeholder="Введите имя..."
        onChangeText={text => setName(text)}
        value={name}
      />
      <SelectInput
        style={styles.form__select}
        label="Выберите тему обращения:"
        placeholder="Темы"
        options={themes}
        //onChange={handleChangeTheme}
      />
      <SelectInput
        style={styles.form__select}
        label="Выберите подтему обращения:"
        placeholder="Подтемы"
        options={subthemes}
        //onChange={handleChangeSubtheme}
      />
      <Button
        style={styles.form__btn}
        title="Войти в чат"
        //onPress={handleEnterDialog}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 40,
    color: '#FFFFFF',
  },
  form__label: {},
  form__input: {},
  form__select: {},
  form__btn: {},
});
