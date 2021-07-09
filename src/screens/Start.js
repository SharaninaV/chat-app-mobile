import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, Button, Text, ScrollView} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {useDispatch, useSelector} from 'react-redux';
import {fetchThemesRequest} from '../redux/start/actions';

export const Start = () => {
  const [name, setName] = useState();
  const dispatch = useDispatch();
  const [subthemes, setSubthemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState([]);
  const [selectedSubtheme, setSelectedSubtheme] = useState();
  const [themes, setThemes] = useState([]);
  const fetchedThemes = useSelector((state) => state.themes.themes);

  const handleSelectTheme = (value, index) => {
    setSelectedTheme(value);
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
    setSelectedSubtheme(value);
  };

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
        selectedValue={selectedTheme}
        onValueChange={handleSelectTheme}>
        {themes.map((theme) => (
          <Picker.Item label={theme.label} value={theme.value} />
        ))}
      </Picker>
      <Picker
        style={styles.form__picker}
        selectedValue={selectedSubtheme}
        onValueChange={handleSelectSubtheme}>
        {subthemes.map((subtheme) => (
          <Picker.Item label={subtheme.label} value={subtheme.value} />
        ))}
      </Picker>
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
    color: '#FFFFFF'
  },
  form__label: {},
  form__input: {},
  form__picker: {},
  form__btn: {}
});
