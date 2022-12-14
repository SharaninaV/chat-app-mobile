import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";
import { ViewMessages } from "./ViewMessages";
import { WriteMessage } from "./WriteMessage";
import { uploadPhotoRequest } from "../redux/camera/actions";
import { fetchCurrentDialogRequest } from "../redux/dialog/actions";
import { changeDefaultScreen } from "../redux/asyncStorage/actions";

export const Dialog = () => {

  const dispatch = useDispatch();

  const [needRefresh, setNeedRefresh] = useState(false);
  const currentDialogKey = useSelector((state) => state.enterChat.currentDialogKey);

  const handleFinishDialog = (event) => {
    dispatch(changeDefaultScreen("finish"));
    Actions.finish();
  };

  const handlePickImage = event => {
    launchImageLibrary({}, (response) => {
      if (response.error || response.didCancel) {
        return;
      }
      const message = {
        timestamp: Date.now(),
        writtenBy: "client",
      };
      if (currentDialogKey && currentDialogKey.length) {
        dispatch(uploadPhotoRequest(currentDialogKey, message, response.assets[0].uri));
        setNeedRefresh(!needRefresh);
      }
    });
  };

  useEffect(() => {
    if (currentDialogKey && currentDialogKey.length) {
      dispatch(fetchCurrentDialogRequest(currentDialogKey));
    }
  }, [needRefresh]);

  return (
    <View style={styles.dialog}>
      <ImageBackground source={{ uri: "https://i.pinimg.com/originals/d4/79/35/d479359444438e53a87e3fcd7a752b0e.png" }}
                       resizeMode="cover" style={styles.dialog__backgroundImage}>
        <ViewMessages />
        <WriteMessage />
      </ImageBackground>
      <View
        style={styles.dialog__buttons}>
        <View style={styles.dialog__buttons__item}>
          <Icon.Button
            name="camera"
            backgroundColor="#00b9e4"
            size={21}
            onPress={() => Actions.camera()}>
            <Text style={styles.dialog__buttons__item__text}>
              ????????
            </Text>
          </Icon.Button>
        </View>
        <View style={styles.dialog__buttons__item}>
          <Icon.Button
            name="photo"
            backgroundColor="#00b9e4"
            size={21}
            onPress={handlePickImage}>
            <Text style={styles.dialog__buttons__item__text}>
              ??????????????????????
            </Text>
          </Icon.Button>
        </View>
      </View>
      <TouchableOpacity
        style={styles.dialog__buttons__finish}
        onPress={handleFinishDialog}
      >
        <Text style={styles.dialog__buttons__finish__text}>?????????????????? ????????????</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dialog: {
    flex: 1,
  },
  dialog__backgroundImage: {
    flex: 1,
  },
  dialog__buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dialog__buttons__item: {
    flex: 1,
  },
  dialog__buttons__finish: {
    backgroundColor: "white",
    borderColor: "white",
    alignItems: "center",
    padding: 10,
  },
  dialog__buttons__finish__text: {
    fontFamily: "Montserrat-Medium",
    textTransform: "uppercase",
    textAlign: "center",
    color: "#028dae",
  },
  dialog__buttons__item__text: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    color: "#f6f5f7",
  },
});
