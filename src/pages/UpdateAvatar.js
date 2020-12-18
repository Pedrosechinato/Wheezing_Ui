import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";
import api from '../api/api';
import * as PATHS from '../util/paths';

export default function UpdateAvatar() {
  const [avatar, setAvatar] = useState();
  const [dadosStorage, setDadosStorage] = useState('');

  async function getDadosUser() {
    const dataUser = await AsyncStorage.getItem('@user');
    const dadosUser = dataUser ? JSON.parse(dataUser) : {};
    setDadosStorage(dadosUser);

    if (!dadosUser._id) return false; // COLOCAR MSG DE ERRO

    const { _id } = dadosUser;
    setDadosStorage(_id);

    return _id;
}

  async function imagePickerCall() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        alert("Nós precisamos dessa permissão.");
        return;
      }
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //allowsEditing: true,
      //aspect: [4, 3],
      quality: 1
    });

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }
    setAvatar(data);
  }

  async function uploadImage() {
    const data = new FormData();
    const {uri} = avatar
    const id = await getDadosUser();
    data.append("file", {
        type: 'image/jpeg',
        name: `${id}.jpg`,
        uri,
      });

      api.post("/posts", data).then(response =>{
        return;
      }); 
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: avatar
            ? avatar.uri
            : "https://mltmpgeox6sf.i.optimole.com/w:761/h:720/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png"
        }}
        style={styles.avatar}
      />
      <TouchableOpacity style={styles.button} onPress={imagePickerCall}>
        <Text style={styles.buttonText}>Escolher imagem</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}>Enviar imagem</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 3,
    backgroundColor: "#4682B4",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  buttonText: {
    color: "#fff"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
});