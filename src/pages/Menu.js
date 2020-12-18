import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, ImageBackground } from 'react-native';

import { MAP_MENU } from '../util/mapRouters';

import { setStyle } from '../styles/';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

function Menu({ route, navigation }) {
  return (
    <View>
      <ImageBackground style={styles.backImage} source={require('../images/guitarrista.jpg')}>
      <View style={styles.logo}>
          <ImageBackground
            source={require('../images/logo.png')}
            style={styles.logoImage}
          />
      </View>
      <View>
            <Text style={styles.welcomeText}>Menu</Text> 
            
      </View>
      {MAP_MENU.map((ITEM) => (
        <TouchableHighlight
          key={`MENU_${ITEM.title}`}
          onPress={() => navigation.navigate(ITEM.route)}
        >
          <View style={styles.buttonHome}>
            <Text style={styles.buttonText}>{ITEM.title}</Text>
          </View>
        </TouchableHighlight>
      ))}
       </ImageBackground>
    </View>
  );
}

const STYLES_DEFAULT = setStyle(wp);

const styles = StyleSheet.create({
  ...STYLES_DEFAULT,

  buttonHome: {
    margin: 8,
    alignItems: 'center',
    backgroundColor: '#4682B4',
    padding: 10,
  },
  buttonText: {
    color: "#fff"
  },

  logo: {
    width: wp('90%'),
    height: 70,
  },
  logoImage: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  backImage: {
    width: wp('97%'),
    height: '102%',
    resizeMode: 'cover',
    marginTop: 1,
    borderRadius: 30,
    borderColor:  '#5B5A5A',
  },
  welcomeText: {
    margin: 1,
    fontSize: 20,
    color: '#ffffff',
    letterSpacing: 2,
    textAlign: 'left',
  },
  subText:{
    fontSize: 15,
    color: '#5B5A5A',
    letterSpacing: 6,
    textAlign: 'left',
  },
});

export default Menu;
