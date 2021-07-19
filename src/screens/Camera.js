import React, {useEffect, useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';

import {
  Button,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import {useDispatch} from 'react-redux';
import {uploadToStorageRequest} from '../redux/camera/actions';

export const Camera = ({initialProps}) => {
  const [
    {cameraRef, type, ratio, autoFocus, autoFocusPoint},
    {toggleFacing, touchToFocus, takePicture}
  ] = useCamera(initialProps);

  const [filePath, setFilePath] = useState('');

  const dispatch = useDispatch();

  const handleTakePicture = async () => {
    try {
      const data = await takePicture();
      setFilePath(data.uri);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (filePath && filePath.length > 0) {
      dispatch(uploadToStorageRequest(filePath));
    }
  }, [filePath, dispatch]);

  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={cameraRef}
        autoFocusPointOfInterest={autoFocusPoint.normalized}
        type={type}
        ratio={ratio}
        style={{flex: 1}}
        autoFocus={autoFocus}
        //onTextRecognized={textRecognized}
        //onFacesDetected={facesDetected}
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

      {/*{!isRecording && (*/}
      {/*  <TouchableOpacity*/}
      {/*    onPress={async () => {*/}
      {/*      try {*/}
      {/*        setIsRecording(true);*/}
      {/*        const data = await recordVideo();*/}
      {/*        console.warn(data);*/}
      {/*      } catch (error) {*/}
      {/*        console.warn(error);*/}
      {/*      } finally {*/}
      {/*        setIsRecording(false);*/}
      {/*      }*/}
      {/*    }}*/}
      {/*    style={{width: '100%', height: 45}}*/}
      {/*  />*/}
      {/*)}*/}
      <Button onPress={handleTakePicture} title="Фото" />
    </View>
  );
};
