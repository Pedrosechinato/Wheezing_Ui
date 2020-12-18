import AsyncStorage from '@react-native-community/async-storage';
import { getGeneros, getIntru } from '../services/BuscaService';

async function mapInsGen() {
  try {
    const { data: ins } = await getIntru();
    const { data: gen } = await getGeneros();

    await AsyncStorage.setItem('@ins', JSON.stringify(ins));
    await AsyncStorage.setItem('@gen', JSON.stringify(gen));

    return { ins, gen };
  } catch (error) {
    console.log(error);
  }
}

async function mapIns() {
  try {
    const { data: ins } = await getIntru();
    await AsyncStorage.setItem('@ins', JSON.stringify(ins));
    return { ins, gen };
  } catch (error) {
    console.log(error);
  }
}

async function mapGen() {
  try {
    const { data: gen } = await getGeneros();
    await AsyncStorage.setItem('@gen', JSON.stringify(gen));
    return { gen };
  } catch (error) {
    console.log(error);
  }
}

export { mapInsGen, mapIns, mapGen };
