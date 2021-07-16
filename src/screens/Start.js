import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, Button, Text, ScrollView} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {useDispatch, useSelector} from 'react-redux';
import {enterChatRequest, fetchThemesRequest} from '../redux/start/actions';
import {Actions} from 'react-native-router-flux';
import {fetchDialogsRequest} from '../redux/queue/actions';
import {changeDefaultScreen} from '../redux/asyncStorage/actions';

export const Start = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [subthemes, setSubthemes] = useState([]);
  const [selectedThemeKey, setSelectedThemeKey] = useState([]);
  const [selectedSubthemeKey, setSelectedSubthemeKey] = useState();
  const [themes, setThemes] = useState([]);
  const fetchedThemes = useSelector((state) => state.themes.themes);
  const screen = useSelector((state) => state.asyncStorage.screen);

  const handleSelectTheme = (value, index) => {
    setSelectedThemeKey(value);
    let arr = [];
    const subthemesTitles = fetchedThemes.filter(
      (theme) => theme.key === value
    )[0].data.subthemes;
    for (let i = 0; i < subthemesTitles.length; i++) {
      arr.push({value: i, label: subthemesTitles[i]});
    }
    setSubthemes(arr);
  };

  const handleSelectSubtheme = (value, index) => {
    setSelectedSubthemeKey(value);
  };

  const handleEnterChat = (event) => {
    const selectedThemeTitle = fetchedThemes.filter(
      (theme) => theme.key === selectedThemeKey
    )[0].data.title;
    const selectedSubthemeTitle = fetchedThemes.filter(
      (theme) => theme.key === selectedThemeKey
    )[0].data.subthemes[selectedSubthemeKey];
    dispatch(enterChatRequest(name, selectedThemeTitle, selectedSubthemeTitle));
    dispatch(fetchDialogsRequest());
    dispatch(changeDefaultScreen('queue'));
    setTimeout(Actions.queue(), 500);
  };

  useEffect(() => {
    if (screen) {
      switch (screen) {
        case 'queue':
          return Actions.queue();
        case 'dialog':
          return Actions.dialog();
        default:
          return;
      }
    }
  }, [screen]);

  useEffect(() => {
    let buffer = [];
    if (fetchedThemes) {
      fetchedThemes.forEach((theme) => {
        buffer.push({value: theme.key, label: theme.data.title});
      });
    }
    setThemes(buffer);
  }, [fetchedThemes]);

  useEffect(() => {
    dispatch(fetchThemesRequest());
  }, [dispatch]);

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.form__label}>Имя:</Text>
      <TextInput
        style={styles.form__input}
        placeholder="Введите имя..."
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Picker
        style={styles.form__picker}
        selectedValue={selectedThemeKey}
        onValueChange={handleSelectTheme}>
        {themes.map((theme) => (
          <Picker.Item label={theme.label} value={theme.value} />
        ))}
      </Picker>
      <Picker
        style={styles.form__picker}
        selectedValue={selectedSubthemeKey}
        onValueChange={handleSelectSubtheme}>
        {subthemes.map((subtheme) => (
          <Picker.Item label={subtheme.label} value={subtheme.value} />
        ))}
      </Picker>
      <Button
        style={styles.form__btn}
        title="Войти в чат"
        onPress={handleEnterChat}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 40,
    color: '#FFFFFF'
  },
  form__label: {},
  form__input: {},
  form__picker: {},
  form__btn: {}
});
