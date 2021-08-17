import React, {useEffect, useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';

import {
  Button,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { uploadPhotoRequest, uploadToStorageRequest } from "../redux/camera/actions";
import { Actions } from "react-native-router-flux";

export const Camera = ({initialProps}) => {
  const [
    {cameraRef, type, ratio, autoFocus, autoFocusPoint},
    {toggleFacing, touchToFocus, takePicture}
  ] = useCamera(initialProps);

  const [filePath, setFilePath] = useState('');

  const dispatch = useDispatch();

  const currentDialogKey = useSelector((state) => state.enterChat.currentDialogKey)

  const handleTakePicture = async () => {
    try {
      const options = {quality: 0.5}
      const data = await takePicture(options);
      setFilePath(data.uri);
      Actions.dialog();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const date = Date.now()
    if (filePath && filePath.length > 0 && currentDialogKey) {
      const message = {
        content: filePath,
        timestamp: date,
        writtenBy: 'client'
      }
      dispatch(uploadPhotoRequest(currentDialogKey, message, filePath));
    }
  }, [filePath, dispatch, currentDialogKey]);

  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={cameraRef}
        autoFocusPointOfInterest={autoFocusPoint.normalized}
        type={type}
        ratio={ratio}
        style={{flex: 1}}
        autoFocus={autoFocus}
      />

      <TouchableWithoutFeedback
        style={{
          flex: 1
        }}
        onPress={touchToFocus}>
        <View></View>
      </TouchableWithoutFeedback>

      <Button
        testID="button"
        onPress={toggleFacing}
        style={{width: '100%', height: 45}}
        title="Сменить камеру"
      />

      <Button onPress={handleTakePicture} title="Фото" />
    </View>
  );
};
