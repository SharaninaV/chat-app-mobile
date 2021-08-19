import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RNFS from "react-native-fs";
import { Button, Image, ImageBackground, StyleSheet, View } from "react-native";
import { resetFilePath, uploadPhotoRequest } from "../redux/camera/actions";
import { Actions } from "react-native-router-flux";

export const PhotoPreview = () => {

  const dispatch = useDispatch();

  const filePath = useSelector((state) => state.filePath.filePath);
  const currentDialogKey = useSelector((state) => state.enterChat.currentDialogKey);

  const data = async () => {
    return RNFS.readFile(filePath, "base64").then((data) => ({ data }));
  };

  const handleCancel = (event) => {
    dispatch(resetFilePath());
    Actions.camera();
  };

  const handleSendPhoto = (event) => {
    const date = Date.now();
    console.log(filePath, currentDialogKey);
    if (filePath && filePath.length > 0 && currentDialogKey) {
      const message = {
        content: "data:image/jpg;base64," + data,
        timestamp: date,
        writtenBy: "client",
      };
      console.log(message.date);
      dispatch(uploadPhotoRequest(currentDialogKey, message, filePath));
      Actions.dialog();
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: filePath, height: "85%" }} resizeMode="cover" style={styles.backgroundImage}>
        <View>
          <Button title="Отмена" onPress={handleCancel} />
          <Button title="Отправить" onPress={handleSendPhoto} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
