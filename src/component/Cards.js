import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { lighten } from 'polished';

import { STYLES_DEFAULT } from '../styles';

function Cards({ itens, title, type, style }) {
  let styleType = {};
  if (type === '2') styleType = styles.card2;

  return (
    <View style={styles.card}>
      {title && <Text style={styles.cardTitle}>{title}</Text>}
      <View style={{ ...styles.containerCard, ...style }}>
        {itens &&
          itens.map((item, index) => (
            <Text
              style={{ ...styles.cardItem, ...styleType }}
              key={`card-${item.name}-${index}`}
            >
              {item.name}
            </Text>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  containerCard: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },

  cardItem: {
    backgroundColor: lighten(0.6, STYLES_DEFAULT.c2.color),
    borderWidth: 2,
    marginRight: 4,
    marginVertical: 4,
    padding: 4,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderColor: STYLES_DEFAULT.c3.color,
    color: STYLES_DEFAULT.c3.color,
  },

  card2: {
    backgroundColor: lighten(0.7, STYLES_DEFAULT.c3.color),
  },

  cardTitle: {},
});

export default Cards;
