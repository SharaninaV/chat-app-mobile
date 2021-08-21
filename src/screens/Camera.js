import React from 'react';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {saveFilePath} from '../redux/camera/actions';

export const Camera = ({initialProps}) => {
  const [
    {cameraRef, type, ratio, autoFocus, autoFocusPoint},
    {toggleFacing, takePicture}
  ] = useCamera(initialProps);

  const dispatch = useDispatch();

  const handleTakePicture = async () => {
    try {
      const options = {quality: 0.1};
      const data = await takePicture(options);
      dispatch(saveFilePath(data.uri));
      Actions.preview();
    } catch (error) {
      return error;
    }
  };

  const handleGoBack = (event) => {
    Actions.dialog();
  };

  return (
    <View style={styles.camera}>
      <RNCamera
        ref={cameraRef}
        autoFocusPointOfInterest={autoFocusPoint.normalized}
        type={type}
        ratio={ratio}
        style={styles.camera__view}
        autoFocus={autoFocus}
      />
      <View style={styles.camera__view__buttons}>
        <TouchableOpacity
          testID="button"
          onPress={toggleFacing}
          style={styles.camera__view__buttons__item}>
          <Text style={styles.camera__view__buttons__item__text}>
            Сменить камеру
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleTakePicture}
          style={styles.camera__view__buttons__item}>
          <Text style={styles.camera__view__buttons__item__text}>Фото</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.camera__view__buttons__item}
          onPress={handleGoBack}>
          <Text style={styles.camera__view__buttons__item__text}>Назад</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {flex: 1},
  camera__view: {flex: 1},
  camera__view__buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  camera__view__buttons__item: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'white',
    alignItems: 'center',
    padding: 10,
    height: 70
  },
  camera__view__buttons__item__text: {
    fontFamily: 'Montserrat-Medium',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#028dae'
  }
});
