import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import * as PATHS from '../util/paths';
import { setStyle } from '../styles/';
import { MAP_HOME } from '../util/mapRouters';
import { getUser, putUser } from '../services/UserService';
import { getDadosUser } from '../services/StorageService';
import Icon from '../util/icons';
import { BorderlessButton } from 'react-native-gesture-handler';

function Home({ navigation }) {
  const [dadosUser, setDadosUser] = useState({});

  useFocusEffect(
    useCallback(() => {
      async function fethDados() {
        const dados = await getDadosUser();
        setDadosUser(dados);
      }
      fethDados();
    }, [])
  );

  const goPage = (page) => {
    navigation.navigate(page, { ...dadosUser });
  };

  return (
    <View>
      <ImageBackground
        style={styles.backImage}
        source={require('../images/teste.jpg')}
      >
        <View style={styles.logo}>
          <ImageBackground
            source={require('../images/logo.png')}
            style={styles.logoImage}
          />
        </View>
        <View></View>

        <View style={styles.listView}>
          <TouchableOpacity onPress={() => goPage(PATHS.PATH_ROTA_PROPOSTA)}>
            <Icon name={PATHS.PATH_PROPOSTA} color='black' size={40} />
            <Text style={styles.listText}> Propostas </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listView}>
          <TouchableOpacity onPress={() => goPage(PATHS.PATH_BUSCA)}>
            <Icon name={PATHS.PATH_BUSCA} color='black' size={40} />
            <Text style={styles.listText}> Busca </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listView}>
          <TouchableOpacity onPress={() => goPage(PATHS.PATH_PERFIL_EDITAR)}>
            <Icon name={PATHS.PATH_PERFIL_EDITAR} color='black' size={40} />
            <Text style={styles.listText}> Perfil </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listView}>
          <TouchableOpacity onPress={() => goPage(PATHS.PATH_AVALIAR_HOME)}>
            <Icon name={PATHS.PATH_AVALIAR} color='black' size={40} />
            <Text style={styles.listText}> Avaliar </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.listView}>
          <TouchableOpacity onPress={() => goPage(PATHS.PATH_AVATAR)}>
            <Icon name={PATHS.PATH_AVATAR} color='black' size={40} />
            <Text style={styles.listText}> Avatar </Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.listView}>
          <TouchableOpacity
            onPress={() => navigation.navigate(PATHS.PATH_EVENTOS)}
          >
            <Icon name={PATHS.PATH_EVENTOS} color='black' size={40} />
            <Text style={styles.listText}> Agenda/Eventos </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listView}>
          <TouchableOpacity
            onPress={() => navigation.navigate(PATHS.PATH_LOGIN)}
          >
            <Icon name={PATHS.PATH_LOGIN} color='black' size={40} />
            <Text style={styles.listText}> Sair </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const STYLES_DEFAULT = setStyle(wp);

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRightColor: '#fff',
    flexWrap: 'wrap',
  },
  buttonBusca: {
    color: '#fff',
    width: wp('45%'),
    fontSize: 31,
    backgroundColor: '#4682B4',
    margin: 10,
  },
  buttonPerfil: {
    color: '#fff',
    width: wp('45%'),
    fontSize: 30,
    backgroundColor: '#4682B4',
    margin: 10,
  },

  logo: {
    width: wp('90%'),
    height: 80,
    marginTop: 40,
    marginLeft: 20,
  },
  logoImage: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  welcomeText: {
    margin: 1,
    fontSize: 20,
    color: '#ffffff',
    letterSpacing: 10,
    textAlign: 'left',
  },
  subText: {
    fontSize: 15,
    color: '#5B5A5A',
    letterSpacing: 6,
    textAlign: 'left',
  },

  listView: {
    marginTop: 24,
    marginLeft: 15,
  },

  listText: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: '#00ffff'
  },
});

export default Home;
