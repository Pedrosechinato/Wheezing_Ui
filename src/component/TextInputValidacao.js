import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { setStyle } from '../styles';

import {
  widthPercentageToDP as wp,
  listenOrientationChange as loc,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';

function TextInputValidacao({
  style,
  name,
  placeholder,
  value,
  onChangeText,
  validacao,
  mensagem,
}) {
  useEffect(() => {
    loc(this);
    return () => {
      rol();
    };
  }, []);

  return (
    <View style={styles.inputValidacao}>
      <TextInput
        style={style}
        name={name}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      {!validacao && <Text style={styles.textValidacao}>{mensagem}</Text>}
    </View>
  );
}

const STYLES_DEFAULT = setStyle(wp);

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  inputValidacao: {},
  textValidacao: {},
});

export default TextInputValidacao;
