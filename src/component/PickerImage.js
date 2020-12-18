import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import Avatar from './Avatar';

function PickerImage({ onPicker, img }) {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    setAvatar(img);
  }, [img]);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status !== 'granted') {
          alert('Nós precisamos dessa permissão.');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.4,
    });

    if (!result.cancelled) {
      const { base64 } = result;

      setAvatar(`data:image/jpg;base64,${base64}`);
      onPicker(`data:image/jpg;base64,${base64}`);
    }
  };

  return (
    <View style={styles.box}>
      <Avatar img={avatar} />
      <Button title='Adicionar Imagem' onPress={pickImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default PickerImage;
