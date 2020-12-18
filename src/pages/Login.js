import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  CheckBox,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import Alert from '../component/Alert';

import { STYLES_DEFAULT } from '../styles/';
import { login } from '../services/UserService';
import * as PATHS from '../util/paths';
import { mapInsGen } from '../util/mapInsGen';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [msg, setMsg] = useState('');
  const [saveDados, setSaveDados] = useState(false);
  const alert = [msg];

  useFocusEffect(
    useCallback(() => {
      dataUserFetch();
      mapInsGen();
      return () => {
        clean();
      };
    }, [])
  );

  async function dataUserFetch() {
    try {
      const dataUser = await AsyncStorage.getItem('@user');
      const dadosUser = dataUser ? JSON.parse(dataUser) : {};

      if (dadosUser.email) {
        setEmail(dadosUser.email);
        setSenha(dadosUser.senha);
        setSaveDados(true);
      }
    } catch (error) {
      console.error('Erro ao recuperar dados');
    }
  }

  function goPage(page) {
    navigation.navigate(page);
  }

  function clean() {
    setEmail('');
    setSenha('');
    setMsg('');
    setSaveDados(false);
  }

  async function saveStorage(saveUser) {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(saveUser));
    } catch (error) {
      setMsg('Erro ao salvar dados no sistema!');
    }
  }

  async function authUser() {
    try {
      const { data, status } = await login({ email, senha });
      if (data && status === 200) {
        const { _id, typeUser, username, apelido } = data;
        let saveUser = { _id, typeUser, username, apelido };
        if (saveDados) {
          saveUser = { ...saveUser, email, senha };
        }
        await saveStorage(saveUser);
        goPage(PATHS.PATH_HOME);
      } else {
        setMsg('Usuário ou Senha não confere!');
      }
    } catch (error) {
      setMsg('Erro! Tente novamente mais tarde!');
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.logo}>
            <ImageBackground
              source={require('../images/logo.png')}
              style={styles.logoImage}
            />
          </View>

          <TextInput
            style={{ ...styles.textInput, flexDirection: 'row' }}
            placeholder='E-mail'
            keyboardType='email-address'
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            style={styles.textInput}
            placeholder='Senha'
            value={senha}
            secureTextEntry={true}
            onChangeText={(text) => setSenha(text)}
          />

          <View style={styles.checkBox}>
            <CheckBox
              value={saveDados}
              onValueChange={() => setSaveDados(!saveDados)}
            />
            <Text
              style={styles.checkText}
              onPress={() => setSaveDados(!saveDados)}
            >
              Relembre-me
            </Text>
          </View>

          <Alert show={alert.some((elem) => !!elem)} texts={alert} />

          <View style={styles.buttonContainer}>
            <TouchableHighlight
              underlayColor='#5C73F2'
              onPress={() => goPage(PATHS.PATH_CADASTRO)}
              style={{ ...styles.button, backgroundColor: styles.c2.color }}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor='#5C73F2'
              onPress={authUser}
              style={{ ...styles.button, backgroundColor: styles.c1.color }}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  box: {
    flex: 1,
  },

  logo: {
    height: 80,
  },

  logoImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  textInput: {
    ...STYLES_DEFAULT.textInput,
    flex: 0,
  },

  button: {
    ...STYLES_DEFAULT.button,
    flex: 0.45,
  },
});

export default Login;
