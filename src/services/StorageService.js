import AsyncStorage from '@react-native-community/async-storage';
import { mapIns, mapGen } from '../util/mapInsGen';

async function getDadosUser() {
  try {
    const dataUser = await AsyncStorage.getItem('@user');
    const dadosUser = dataUser ? JSON.parse(dataUser) : {};
    delete dadosUser.senha;
    return dadosUser._id ? { ...dadosUser } : {};
  } catch (error) {
    console.error(error);
    return {};
  }
}

async function getInsGen() {
  try {
    let instrumentos = [];
    let generos = [];

    const localDataIns = await AsyncStorage.getItem('@ins');
    const itemsIns = localDataIns ? JSON.parse(localDataIns) : [];
    if (itemsIns.length > 0) {
      instrumentos = itemsIns;
    } else {
      const { ins } = await mapIns();
      instrumentos = ins;
    }

    const localDataGen = await AsyncStorage.getItem('@gen');
    const itemsGen = localDataGen ? JSON.parse(localDataGen) : [];
    if (itemsGen.length > 0) {
      generos = itemsGen;
    } else {
      const { gen } = await mapGen();
      generos = gen;
    }

    return { instrumentos, generos };
  } catch (error) {
    console.error('Erro ao recuperar dados');
    return {};
  }
}

export { getDadosUser, getInsGen };
