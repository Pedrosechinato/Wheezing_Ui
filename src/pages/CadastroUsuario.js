import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';

import { STYLES_DEFAULT } from '../styles/';
import { USER_MUSICO, USER_ESTABELECIMENTO } from '../util/typesUser';
import * as PATHS from '../util/paths';

function CadastroUsuario({ navigation }) {
  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            underlayColor='#5C73F2'
            onPress={() =>
              goPage(PATHS.PATH_CADASTRO_DADOS, { typeUser: USER_MUSICO })
            }
            style={{ ...styles.button, backgroundColor: styles.c2.color }}
          >
            <Text style={styles.buttonText}>Musico</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor='#5C73F2'
            onPress={() =>
              goPage(PATHS.PATH_CADASTRO_DADOS, {
                typeUser: USER_ESTABELECIMENTO,
              })
            }
            style={{ ...styles.button, backgroundColor: styles.c2.color }}
          >
            <Text style={styles.buttonText}>Estabelecimento</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  main: {
    ...STYLES_DEFAULT.main,
    flex: 1,
  },

  container: {
    ...STYLES_DEFAULT.container,
    flex: 1,
  },

  buttonContainer: {
    ...STYLES_DEFAULT.buttonContainer,
    flex: 1,
  },

  button: {
    ...STYLES_DEFAULT.button,
    paddingVertical: 60,
    flex: 0.48,
  },
});

export default CadastroUsuario;
