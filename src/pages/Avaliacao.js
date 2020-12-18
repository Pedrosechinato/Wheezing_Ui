import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { updateNota } from '../services/AvaliacaoService';
import * as PATHS from '../util/paths';

import { STYLES_DEFAULT } from '../styles/';

function Avaliacao({ route, navigation }) {
  const [pontualidade, setPontualidade] = useState(0);
  const [publico, setPublico] = useState(0);
  const [animacao, setAnimacao] = useState(0);
  const [descricao, setDescricao] = useState('');

  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  async function handleAvaliar() {
    const { dados } = route.params;
    const notas = {
      nota1: pontualidade,
      nota2: publico,
      nota3: animacao,
      descricao,
    };
    updateNota(dados, notas);
    goPage(PATHS.PATH_AVALIAR_HOME, { dados: notas });
  }

  function clicarAvaliar() {
    Alert.alert(
      'Avaliar Musico',
      'Você está gostaria de enviar sua avaliação?',
      [
        { text: 'Não', onPress: () => {}, style: 'cancel' },
        { text: 'Sim', onPress: () => handleAvaliar() },
      ]
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16,
      }}
    >
      <Text style={styles.textTitle}>Avaliar Eventos</Text>
      <View style={styles.avaliar}>
        <Text style={styles.textCategoria}>Pontualidade</Text>

        <Rating
          type='custom'
          showRating
          onFinishRating={setPontualidade}
          fractions={0}
          imageSize={30}
          tintColor='#f5f5f5'
          ratingBackgroundColor='#ccc'
          ratingColor={STYLES_DEFAULT.c2.color}
        />
      </View>

      <View style={styles.avaliar}>
        <Text style={styles.textCategoria}>Engajamento com Público</Text>

        <Rating
          type='custom'
          showRating
          onFinishRating={setPublico}
          fractions={0}
          imageSize={30}
          tintColor='#f5f5f5'
          ratingBackgroundColor='#ccc'
          ratingColor={STYLES_DEFAULT.c2.color}
        />
      </View>

      <View style={styles.avaliar}>
        <Text style={styles.textCategoria}>Animação</Text>

        <Rating
          type='custom'
          showRating
          onFinishRating={setAnimacao}
          fractions={0}
          imageSize={30}
          tintColor='#f5f5f5'
          ratingBackgroundColor='#ccc'
          ratingColor={STYLES_DEFAULT.c2.color}
        />
      </View>

      <View style={styles.avaliar}>
        <Text style={styles.textCategoria}>Comentário</Text>
        <TextInput
          name='descricao'
          style={styles.textInput}
          placeholder='Comentário'
          onChangeText={(text) => setDescricao(text)}
          multiline={true}
          numberOfLines={4}
        />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TouchableHighlight
          underlayColor='#5C73F2'
          onPress={() => clicarAvaliar()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Avaliar</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  container: {
    marginTop: 20,
    backgroundColor: '#f5f5f5',
  },

  textInput: {
    ...STYLES_DEFAULT.textInput,
    backgroundColor: '#fff',
    flex: 0,
  },

  textTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#35AAFF',
    marginTop: 15,
  },

  textCategoria: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  avaliar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },

  containerAvaliar: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },

  textArea: {
    height: 100,
    justifyContent: 'flex-start',
  },

  button: {
    ...STYLES_DEFAULT.button,
    backgroundColor: STYLES_DEFAULT.c1.color,
    flexGrow: 1,
    flex: 1,
  },

  titleText: {
    marginBottom: 30,
    fontSize: 20,
    color: '#5B5A5A',
    letterSpacing: 2,
    textAlign: 'left',
  },
});

export default Avaliacao;
