import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, Text, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-community/picker";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import { enterChatRequest, fetchThemesRequest } from "../redux/start/actions";
import { fetchDialogsRequest } from "../redux/queue/actions";
import { changeDefaultScreen } from "../redux/asyncStorage/actions";

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
      (theme) => theme.key === value,
    )[0].data.subthemes;
    for (let i = 0; i < subthemesTitles.length; i++) {
      arr.push({ value: i, label: subthemesTitles[i] });
    }
    setSubthemes(arr);
  };

  const handleSelectSubtheme = (value, index) => {
    setSelectedSubthemeKey(value);
  };

  const handleEnterChat = (event) => {
    const selectedThemeTitle = fetchedThemes.filter(
      (theme) => theme.key === selectedThemeKey,
    )[0].data.title;
    const selectedSubthemeTitle = fetchedThemes.filter(
      (theme) => theme.key === selectedThemeKey,
    )[0].data.subthemes[selectedSubthemeKey];
    dispatch(enterChatRequest(name, selectedThemeTitle, selectedSubthemeTitle));
    dispatch(fetchDialogsRequest());
    dispatch(changeDefaultScreen("queue"));
    Actions.queue();
  };

  useEffect(() => {
    if (screen) {
      switch (screen) {
        case "queue":
          return Actions.queue();
        case "dialog":
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
        buffer.push({ value: theme.key, label: theme.data.title });
      });
    }
    setThemes(buffer);
  }, [fetchedThemes]);

  useEffect(() => {
    dispatch(fetchThemesRequest());
  }, [dispatch]);

  return (
    <ImageBackground source={{ uri: "https://i.pinimg.com/originals/d4/79/35/d479359444438e53a87e3fcd7a752b0e.png" }}
                     resizeMode="cover" style={styles.form__backgroundImage}>
      <ScrollView style={styles.form}>
        <Text style={styles.form__title}>ChatApp</Text>
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
            <Picker.Item
              style={styles.form__picker__item}
              label={theme.label}
              value={theme.value} />
          ))}
        </Picker>
        <Picker
          style={styles.form__picker}
          selectedValue={selectedSubthemeKey}
          onValueChange={handleSelectSubtheme}>
          {subthemes.map((subtheme) => (
            <Picker.Item
              style={styles.form__picker__item}
              label={subtheme.label}
              value={subtheme.value} />
          ))}
        </Picker>
        <TouchableOpacity
          style={styles.form__btn}
          onPress={handleEnterChat}
        >
          <Text style={styles.form__btn__text}>Войти в чат</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 40,
  },
  form__title: {
    fontFamily: "Merienda_Regular",
    fontSize: 25,
    textAlign: "center",
  },
  form__backgroundImage: {
    flex: 1,
  },
  form__label: {
    fontFamily: "Montserrat-Medium",
    fontSize: 20,
  },
  form__input: {
    fontFamily: "Montserrat-Medium",
  },
  form__picker: {},
  form__picker__item: {},
  form__btn: {
    backgroundColor: "#00b9e4",
    padding: 10,
    marginTop: 30,
  },
  form__btn__text: {
    color: "white",
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
  },
});
