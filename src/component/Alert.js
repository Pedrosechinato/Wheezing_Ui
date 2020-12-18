import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lighten } from 'polished';

import { STYLES_DEFAULT } from '../styles';

function Alert({ show, texts }) {
  return (
    show && (
      <View style={styles.containerAlert}>
        {texts.map(
          (text) =>
            !!text &&
            text.length > 0 && (
              <Text style={styles.textAlert} key={text}>
                {text}
              </Text>
            )
        )}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  containerAlert: {
    borderWidth: 2,
    marginRight: 4,
    marginVertical: 10,
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: lighten(0.2, STYLES_DEFAULT.c4.color),
    borderColor: STYLES_DEFAULT.c4.color,
  },
  textAlert: { color: 'black' },
});

export default Alert;
