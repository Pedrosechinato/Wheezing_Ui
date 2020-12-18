import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { setStyle } from '../styles/';

function Example({ route, navigation }) {
  // MINHA CONTA

  // username: String,
  // email: String,
  // documento: String,
  // senha: String,
  // APAGAR CONTA

  useFocusEffect(
    useCallback(() => {
      console.log('ENTROU NO EXEMPLO!');
      return () => {
        console.log('SAIU DO EXEMPLO!');
      };
    }, [])
  );

  return (
    <View>
      <Text>Example!!!</Text>
    </View>
  );
}

const STYLES_DEFAULT = setStyle(wp);

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,
});

export default Example;
