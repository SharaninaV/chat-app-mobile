import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RNFS from 'react-native-fs';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {resetFilePath, uploadPhotoRequest} from '../redux/camera/actions';

export const PhotoPreview = () => {
  const dispatch = useDispatch();

  const filePath = useSelector((state) => state.filePath.filePath);
  const currentDialogKey = useSelector(
    (state) => state.enterChat.currentDialogKey
  );

  const data = async () => {
    return RNFS.readFile(filePath, 'base64').then((data) => ({data}));
  };

  const handleCancel = (event) => {
    dispatch(resetFilePath());
    Actions.camera();
  };

  const handleSendPhoto = (event) => {
    const date = Date.now();
    if (filePath && filePath.length > 0 && currentDialogKey) {
      const message = {
        content: 'data:image/jpg;base64,' + data,
        timestamp: date,
        writtenBy: 'client'
      };
      dispatch(uploadPhotoRequest(currentDialogKey, message, filePath));
      Actions.dialog();
    }
  };

  return (
    <View style={styles.photoPreview}>
      <ImageBackground
        source={{uri: filePath, height: '85%'}}
        resizeMode="cover"
        style={styles.photoPreview__backgroundImage}>
        <View style={styles.photoPreview__buttons}>
          <TouchableOpacity
            onPress={handleCancel}
            style={styles.photoPreview__buttons__item}>
            <Text style={styles.photoPreview__buttons__item__text}>Отмена</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSendPhoto}
            style={styles.photoPreview__buttons__item}>
            <Text style={styles.photoPreview__buttons__item__text}>
              Отправить
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  photoPreview: {
    flex: 1
  },
  photoPreview__backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  photoPreview__buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoPreview__buttons__item: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'white',
    alignItems: 'center',
    padding: 10,
    height: 50
  },
  photoPreview__buttons__item__text: {
    fontFamily: 'Montserrat-Medium',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#028dae'
  }
});
