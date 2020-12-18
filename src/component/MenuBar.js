import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { setStyle } from '../styles/';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { MAP_MENU_BAR } from '../util/mapRouters';
import Icon from '../util/icons';

function MenuBar({ active, navigation }) {
  return (
    <View style={styles.menuBar}>
      {MAP_MENU_BAR.map((ITEM) => {
        return (
          <TouchableHighlight
            key={`MENU_BAR_${ITEM.title}`}
            onPress={() => navigation.navigate(ITEM.route)}
            style={styles.buttonBar}
          >
            <View>
              <Icon name={ITEM.route} color='black' size={40} />
            </View>
          </TouchableHighlight>
        );
      })}
    </View>
  );
}

const STYLES_DEFAULT = setStyle(wp);

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  menuBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  buttonBar: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#c7ecee',
    margin: 2,
  },
});

export default MenuBar;
