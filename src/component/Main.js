import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { View, StyleSheet, ScrollView } from 'react-native';
import { setStyle } from '../styles/';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { getDadosUser } from '../services/StorageService';

import { NavigationContainer } from '@react-navigation/native';

import * as PATHS from '../util/paths';

import MenuBar from '../component/MenuBar';
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';
import Proposta from '../pages/Proposta';
import Menu from '../pages/Menu';
import EditarPerfil from '../pages/EditarPerfil';
import Busca from '../pages/Busca';
import Fail from '../pages/Fail';
import UpdateAvatar from '../pages/UpdateAvatar';
import RealizarProposta from '../pages/NovaProposta';
import RotaPropostas from '../pages/TabNavigator';

function Main({ route, navigation }) {
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

  const goPage = (page, params) => {
    navigation.navigate(page, params);
  }; 

  return <Home route={route} navigation={navigation} />;

  // const mapCompent = (nameActive) => {
  //   switch (nameActive) {
  //     case PATHS.PATH_HOME:
  //       return <Home route={route} navigation={navigation} />;
  //     case PATHS.PATH_PERFIL:
  //       return (
  //         <Perfil
  //           route={route}
  //           navigation={navigation}
  //           userId={dadosUser._id}
  //         />
  //       );
  //     case PATHS.PATH_BUSCA:
  //       return (
  //         <Busca
  //           route={route}
  //           navigation={navigation}
  //           typeUser={dadosUser.typeUser}
  //         />
  //       );
  //     case PATHS.PATH_PERFIL_EDITAR:
  //       return <EditarPerfil route={route} navigation={navigation} />;
  //     case PATHS.PATH_PROPOSTA:
  //       return <Proposta route={route} navigation={navigation} />;       
  //     case PATHS.PATH_MENU:
  //       return <Menu route={route} navigation={navigation} />;
  //     case PATHS.PATH_AVATAR:
  //       return <UpdateAvatar route={route} navigation={navigation} />
  //     case PATHS.PATH_REALIZAR_PROPOSTA:
  //       return <RealizarProposta route={route} navigation={navigation} /> 
        
  //     default:
  //       return <Fail />;
  //   }
  // };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.main2}>{mapCompent(route.name)}</View>
      <MenuBar active={route.name} navigation={navigation} />
    </ScrollView>
  );
}

const STYLES_DEFAULT = setStyle(wp);

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,
});

export default Main;
