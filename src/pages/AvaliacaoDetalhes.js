import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { Rating } from 'react-native-ratings';
import { updateNota } from '../services/AvaliacaoService';
import * as PATHS from '../util/paths';

import { STYLES_DEFAULT } from '../styles/';

function AvaliacaoDetalhes({ route, navigation }) {
  const [pontualidade, setPontualidade] = useState(0);
  const [publico, setPublico] = useState(0);
  const [animacao, setAnimacao] = useState(0);

  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  const { dados } = route.params;

  const {
    nota1,
    nota2,
    nota3,
    descricao

  } = dados;

  const nota1Number = Number(nota1);
  // setPontualidade(nota1Number);
  const nota2Number = Number(nota2);
  // setPublico(nota2Number);
  const nota3Number = Number(nota3);
  // setAnimacao(nota3Number);
  


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
      <Text style={styles.textTitle}>Avaliação</Text>
      <View style={styles.avaliar}>
        <Text style={styles.textCategoria}>Pontualidade</Text>
        <Rating
          // startingValue={pontualidade}
          showRating
          onFinishRating={setPontualidade}
          fractions={0}
          style={{ paddingVertical: 10 }}
          imageSize = {30}
          startingValue = {nota1Number}
        />
      </View>

      <View style={styles.avaliar}>
        <Text style={styles.textCategoria}>Engajamento com Público</Text>
        <Rating
          // startingValue={publico}
          showRating
          onFinishRating={setPublico}
          fractions={0}
          style={{ paddingVertical: 10 }}
          imageSize = {30}
          startingValue = {nota2Number}
        />
      </View>

      <View style={styles.avaliar}>
        <Text style={styles.textCategoria}>Animação</Text>
        <Rating
          // startingValue={animacao}
          showRating
          onFinishRating={setAnimacao}
          fractions={0}
          style={{ paddingVertical: 10 }}
          imageSize = {30}
          startingValue = {nota3Number}
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
              defaultValue= {descricao}
              editable = {false}
      />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  textInput: {
    ...STYLES_DEFAULT.textInput,
    flex: 0,
  },

  textTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#35AAFF',
    marginBottom: 10,
    marginTop: 15,
  },

  textCategoria: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  avaliar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 20,
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

  avaliarButton: {
    backgroundColor: '#35AAFF',
    width: 200,
    height: 48,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 56,
    marginTop: 12,
  },

  avaliarButtonText: {
    color: '#FFF',
    fontSize: 20,
    justifyContent: 'center',
  },
});

export default AvaliacaoDetalhes;
