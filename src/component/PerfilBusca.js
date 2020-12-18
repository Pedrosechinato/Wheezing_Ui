import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { STYLES_DEFAULT } from '../styles/';
import * as PATHS from '../util/paths';
import { Rating } from 'react-native-ratings';
import Avatar from './Avatar';

function PerfilBusca({ navigation, item, key }) {
  const goPage = (page, params) => {
    navigation.navigate(page, params);
  };

  const { apelido, username, cidade, uf, nota, img } = item;

  return (
    <TouchableOpacity
      style={styles.perfilSmall}
      key={key}
      onPress={() => goPage(PATHS.PATH_PERFIL, { perfil: item })}
    >
      <View style={styles.viewHeader}>
        <Avatar style={styles.avatar} img={img} />
        <View>
          <Text
            style={styles.perfilSmallTitle}
          >{`@${username} | ${apelido}`}</Text>
          <Text>{`${cidade} - ${uf}`}</Text>

          {!!nota && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Rating
                type='custom'
                readonly={true}
                startingValue={nota}
                fractions={1}
                imageSize={20}
                tintColor='#f5f5f5'
                ratingBackgroundColor='transparent'
                selectedColor='red'
                ratingColor={STYLES_DEFAULT.c2.color}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  perfilSmall: {
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: '#f5f5f5',
  },

  perfilSmallTitle: {
    color: STYLES_DEFAULT.c1.color,
  },

  viewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  avatar: {
    marginRight: 20,
  },
});

export default PerfilBusca;
