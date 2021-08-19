import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "react-native-router-flux";
import { finishDialogRequest } from "../redux/finishDialog/actions";
import { changeDefaultScreen } from "../redux/asyncStorage/actions";
import { enterChatReset } from "../redux/start/actions";

export const FinishDialog = () => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState("5");
  const currentDialogKey = useSelector(
    (state) => state.enterChat.currentDialogKey,
  );

  const handleFinishRating = (value) => {
    setRating(value);
  };

  const handleFinishDialog = (event) => {
    dispatch(finishDialogRequest(currentDialogKey, rating));
    alert("Спасибо!");
    dispatch(enterChatReset());
    dispatch(changeDefaultScreen("start"));
    Actions.start();
  };

  return (
    <ImageBackground source={{ uri: "https://i.pinimg.com/originals/d4/79/35/d479359444438e53a87e3fcd7a752b0e.png" }}
                     resizeMode="cover" style={styles.finish__backgroundImage}>
      <View style={styles.finish}>
        <Text style={styles.finish__text}>Оцените, пожалуйста, общение с оператором.</Text>
        <AirbnbRating
          count={5}
          reviews={["Ужасно", "Неплохо", "Хорошо", "Очень хорошо", "Отлично"]}
          defaultRating={5}
          size={50}
          onFinishRating={handleFinishRating}
        />
        <TouchableOpacity onPress={handleFinishDialog} style={styles.finish__button}>
          <Text style={styles.finish__button__text}>Оценить</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  finish: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00b9e4",
    marginVertical: 150,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  finish__backgroundImage: { flex: 1 },
  finish__text: {
    marginBottom: 20,
    color: "white",
    fontFamily: "Montserrat-Medium",
    fontSize: 17,
    textAlign: "center",
  },
  finish__button: {
    backgroundColor: "white",
    borderColor: "white",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  finish__button__text: {
    fontFamily: "Montserrat-Medium",
    textTransform: "uppercase",
    textAlign: "center",
    color: "#028dae",
  },
});
