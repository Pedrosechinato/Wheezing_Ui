import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import {
  widthPercentageToDP as wp,
  listenOrientationChange as loc,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import { Rating } from 'react-native-ratings';

import { STYLES_DEFAULT } from '../styles';

function Avaliacao({ _id, starts }) {
  const [nota, setNota] = useState(0);
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    loc(this);
    return () => {
      rol();
    };
  }, []);

  return (
    <View style={styles.avaliar}>
      <Text>Avaliar</Text>
      <Rating
        startingValue={nota}
        showRating
        onFinishRating={setNota}
        fractions='0'
        style={{ paddingVertical: 10 }}
      />

      <View style={styles.textInput}>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid='transparent'
          placeholder='Comentário'
          placeholderTextColor='grey'
          numberOfLines={10}
          multiline={true}
          maxLength={120}
          onChange={(text) => setDescricao(text)}
        />
      </View>
      <View style={styles.button}>
        <Button
          style={styles.buttonText}
          title='Avaliar'
          color={styles.c2.color}
          onPress={() => console.log('AVALIAR', { nota, descricao })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  avaliar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
});

export default Avaliacao;
