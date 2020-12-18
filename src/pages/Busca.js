import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import BuscaInputs from '../component/BuscaInputs';
import PerfilBusca from '../component/PerfilBusca';

import { STYLES_DEFAULT } from '../styles/';

function Busca({
  route: {
    params: { typeUser },
  },
  navigation,
}) {
  const [results, setResults] = useState([]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.main2}>
        <BuscaInputs setResults={setResults} typeUser={typeUser} />

        <View style={styles.resultBusca}>
          {results.map((item) => (
            <PerfilBusca navigation={navigation} item={item} key={item._id} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  main2: {
    ...STYLES_DEFAULT.main2,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  resultBusca: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

export default Busca;
