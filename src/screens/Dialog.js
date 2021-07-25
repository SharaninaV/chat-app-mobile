import React, { useEffect, useState } from "react";
import {Button, View, StyleSheet, Text} from 'react-native';
import {changeDefaultScreen} from '../redux/asyncStorage/actions';
import {Actions} from 'react-native-router-flux';
import { useDispatch, useSelector } from "react-redux";
import {ViewMessages} from './ViewMessages';
import {WriteMessage} from './WriteMessage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { uploadPhotoRequest } from "../redux/camera/actions";
import { fetchCurrentDialogRequest } from "../redux/dialog/actions";

export const Dialog = () => {

  const dispatch = useDispatch();

  const [needRefresh, setNeedRefresh] = useState(false)
  const currentDialogKey = useSelector((state) => state.enterChat.currentDialogKey)

  const handleFinishDialog = (event) => {
    dispatch(changeDefaultScreen('finish'));
    Actions.finish();
  };

  const handlePickImage = event => {
    launchImageLibrary({}, (response) => {
      if (response.error || response.didCancel) {
        return;
      }
      const message = {
        timestamp: Date.now(),
        writtenBy: 'client'
      }
      if(currentDialogKey && currentDialogKey.length) {
        dispatch(uploadPhotoRequest(currentDialogKey, message, response.assets[0].uri))
        setNeedRefresh(!needRefresh)
      }
    })
  }

  useEffect(() => {
    if(currentDialogKey && currentDialogKey.length) {
      dispatch(fetchCurrentDialogRequest(currentDialogKey))
    }
  }, [needRefresh])

  return (
    <View style={{flex: 1}}>
      <ViewMessages />
      <WriteMessage />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <View style={{flex: 1}}>
          <Icon.Button
            name="camera"
            backgroundColor="#2dc6d6"
            size={21}
            onPress={() => Actions.camera()}>
            <Text style={{fontFamily: 'Bold', fontSize: 16, color: '#f6f5f7'}}>
              Фото
            </Text>
          </Icon.Button>
        </View>
        <View style={{flex: 1}}>
          <Icon.Button
            name="photo"
            backgroundColor="#2dc6d6"
            size={21}
            onPress={handlePickImage}>
            <Text style={{fontFamily: 'Bold', fontSize: 16, color: '#f6f5f7'}}>
              Изображение
            </Text>
          </Icon.Button>
        </View>
      </View>
      <Button title="Завершить диалог" onPress={handleFinishDialog} />
    </View>
  );
};
