import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, CheckBox } from 'react-native';

import { STYLES_DEFAULT } from '../styles';

import { isItemBy_id, toogleListBy_id } from '../util/toogleList';

function CheckInsGen({ onChangeItems, items, selecteds = [], name, style }) {
  const [itemsList, setItems] = useState([]);
  const [itemsSelects, setItemsSelects] = useState([]);

  useEffect(() => {
    setItems(items);
  }, [items]);

  useEffect(() => {
    setItemsSelects(selecteds);
  }, [selecteds]);

  function onClickItem(newListSelect) {
    setItemsSelects(newListSelect);
    onChangeItems(newListSelect);
  }

  const isLoaging = itemsList.length > 0;

  if (!isLoaging)
    return (
      <Text style={{ textAlign: 'center', paddingVertical: 50 }}>
        Carregando...
      </Text>
    );

  return (
    <View style={{ ...styles.containerChecks, ...style }}>
      {isLoaging &&
        itemsList.map((item) => (
          <View style={styles.checkBox} key={`${name}${item._id}`}>
            <CheckBox
              value={isItemBy_id(itemsSelects, item)}
              onValueChange={() =>
                onClickItem(toogleListBy_id(itemsSelects, item))
              }
            />
            <Text
              style={styles.checkText}
              onPress={() => onClickItem(toogleListBy_id(itemsSelects, item))}
            >
              {item.name}
            </Text>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,
  containerChecks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexGrow: 1,
    marginRight: 10,
  },
  button: {
    flex: 1,
    marginTop: 60,
  },
});

export default CheckInsGen;
