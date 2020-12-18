import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { STYLES_DEFAULT } from '../styles/';

function Example({ route, navigation }) {
  useFocusEffect(
    useCallback(() => {
      console.log('ENTROU NO EXEMPLO!');
      return () => {
        console.log('SAIU DO EXEMPLO!');
      };
    }, [])
  );

  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  return (
    <View>
      <Text>Example!!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,
});

export default Example;
